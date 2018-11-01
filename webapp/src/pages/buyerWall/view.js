//BuyerWall View
function buyerWallView(Dom7, controller) { // Load Page (Init)
  function load(page) {
    // MAIN PAGE FUNCTIONS : Page fully loaded:

    // Page Objects
        // User Wall Page
    var wallTitle = document.getElementById("wallHeaderTitle");
    var userImg = document.getElementById("userImg");
    var followerTag = document.getElementById("followerTag");
    var postTag = document.getElementById("postTag");
    var rFeedList = document.getElementById("rFeedList");
    var cFeedList = document.getElementById("cFeedList");

        // Connections Page
    var profileName = document.getElementById("profile-name");
    var profileRole = document.getElementById("profile-role");
    var postNumber = document.getElementById("postNumber");
    var followingNumber = document.getElementById("followingNumber");
    var followersNumber = document.getElementById("followersNumber");
    var connectionSearch = document.getElementById("connection-search");
    var connectTable = document.getElementById("connectTable");
    var userTitle = document.getElementById("user_title");
    var userTable = document.getElementById("userList");

        // Account Variables
    var userToken;
    var accountName;
    var followingByEmail;
        // Initial Page Actions
    controller.init_Page();

    // Main Page Functions
    page.on('page:init', function (e) {
        var userData = controller.getUserInfo();
        console.log("buyerWall.view.js: initUser(): "+userData);
            accountName = userData[0]+' '+userData[1];
            var accountRole = userData[2];
            var accountPosts = userData[3];
            var accountFollowing = userData[4];
            var accountFollowers = userData[5];
            var postNumber = userData[6];
        wallTitle.innerHTML = 'Your Shopter';
        profileName.innerHTML = accountName;
        profileRole.innerHTML = 'User Role: '+userData[2];
        postNumber.innerHTML = accountPosts;
        // followingNumber.text = accountFollowing;
        // followersNumber.text = accountFollowers;
        // followingNumber.innerHTML = accountFollowing;
        // followersNumber.innerHTML = accountFollowers;
        followingByEmail = controller.getFollowing();
        connectionSearch.style.display = 'none';
    });

    function populateConnectionFeed() { // Populate Following List
        controller.getFollowing(userToken).then(function(users){
            for (var i=0; i<followedUsers.length;i++) {
                // Table Data
                var connectionName = followedUsers[i].firstName+"\ "+followedUsers[i].lastName;
                var connectionRole = "Role: "+followedUsers[i].role;
                var connectionID = followedUsers[i].followId;
                // Table elements
                var connectHREF = "<a href=\"#"+"\""+"id=\"wall-btn"+"\""+"class=\""+"button "+connectionID+"\">"+"Add Connection"+"</a>";
                var roleTag = "<div id=\"roleTag"+ "\">"+connectionRole+"</div>";
                // Img/Name/Role/ConnectionBTN
                var userColumn = "<li value=\"" + "\">" + connectHREF + "</li>";
                // Table Styling
                followingList.innerHTML += userColumn;
            }
            console.log("view.js: populateConnectionFeed(): "+users);
        });
        update(page);
    }

    function populateFeed(wallType) { // Populate Wall Feed
        var postData = controller.getPosts();

        var feedContainer = document.createElement("form");

        var feedImg = document.createElement("img");
        var feedTitle = document.createElement("h1");
        var feedDescription = document.createElement("p");
        var feedAuthor = document.createElement("p");
        var feedDate = document.createElement("p");
        var joinBtn = document.createElement("button");
        // Feed Data
        if (wallType==='self') {
            wallHeader.innerHTML = 'Your Wall';
            document.getElementById("tempBlock").style.display = 'none';
        } else {
            // wallHeader.innerHTML = accountName+"\'s Wall";
            document.getElementById("tempBlock").style.display = 'block';
            wallHeader.innerHTML = "Jane Seller's Wall";
        }
        feedTitle.innerHTML = "Clothing Sale!";
        feedDescription.innerHTML = "Selling LuLaRoe Clothing for great prices!";
        feedAuthor.innerHTML = "Jane Seller"; feedDate.innerHTML = "--/--/----";
        feedContainer.appendChild(feedTitle);
    }
    //End Main Page Functions

    // User Navigation
        // Refresh Feed Content
    var refreshContent = page.on('.pull-to-refresh-content');
    refreshContent.on('ptr:refresh', function (e) {
        page.find('.connectTab').remove();

        controller.refreshFeed(e);
    });

    function manualRefresh() {
    }
        // End Refresh Feed Content

        // Panel Content
    page.find('#open-left-panel').on('click', function(e) {
        controller.initPanel();
    });

    page.find('#logout-btn').on('click', function(e) {
        controller.logout();
    });
        // End Panel Content
    // End User Navigation Btns

    // User Wall Btns
        // User Wall Navigation Btns
    page.find('#signedUserWall').on('click', function(e) {
        populateFeed('self');
    });

    function followedUserClicked() { // Update Wall
        var userID = event.srcElement.id;
        // controller.getPosts(userID).then(function(userPostData) {

        // });
    }
        // End User Wall Navigation Btns

        // User Wall Functionality Btns
    page.find('#join-stream').on('click', function(e) {
        var streamURL = controller.joinStream();
        window.location = 'interface!CallStreamView!join!'+streamURL+'!';
    });

    page.find('#search-btn').on('click', function(e) {

    });
        // End User Wall Functionality Btns
    // End User Wall Btns

    // Connections Page Btns:
    page.find('#add-btn').on('click', function(e) { // List Connections
        // UI Preparations
     // connectionSearch.style.display = 'block';
        userTitle.innerHTML = ("Users");
        userTable.innerHTML = "";

        // List Registered Users
        controller.listUsers(userToken).then(function(registeredUsers) {
            for (var i=0; i<registeredUsers.length; i++) {
                // Table Data
                var connectionName = registeredUsers[i].firstName+"\ "+registeredUsers[i].lastName;
                var connectionRole = "Role: "+registeredUsers[i].role;
                var connectionID = registeredUsers[i].email;
                    // Table elements
                // var userImg = "<img src=\""+connectionInfo+"\>";
                var connectHREF = "<a href=\"#"+"\""+"id=\"connect-btn"+"\""+"class=\""+connectionID+"\">"+"Add Connection"+"<i class=\"f7-icons"+"\">"+"add_round"+"</i>"+"</a>";
                var roleTag = "<div id=\"roleTag"+ "\">"+connectionRole+"</div>";
                    // Img/Name/Role/ConnectionBTN
                var userColumn = "<li value=\"" + connectionName + "\">" + connectionName + " | " + connectionRole + connectHREF + "</li>";
                    // Table Styling
                userTable.innerHTML += userColumn;
            }
            update(page);
        });
    });

    page.find('#following-btn').on('click', function(e) {   // Following List
        userTitle.innerHTML = 'Currently Following:';
        userTable.innerHTML = "";

    });

    page.find('#follower-btn').on('click', function(e) {    // Follower List
        userTitle.innerHTML = 'Current Followers:';
        userTable = "";

    });

    // End Connections Page Btns
    page.find('#wall-btn').on('click', function(e) {
        var userID = this.getAttribute("class");
        console.log("buyerWall.view.js: update(): Upload Wall: "+userID);
        populateFeed(userID);

    });

    // END MAIN PAGE FUNCTIONS
  }

  function update(page) {   // Update Page
    // PAGE UPDATE METHODS
    page.find('#connect-btn').on('click', function(e) {
        var userID = this.getAttribute("class");
        return controller.addConnection(userID).then(function(connectionState){
            if (connectionState) {
                load(page);
            }
        }).then(function(connectionState){
        });
    });

    page.find('#wall-btn').on('click', function(e) {
        var userID = this.getAttribute("class");

    });
    // END PAGE UPDATE METHODS
  }

  return {
    load: load,
    update: update
  };
}
module.exports = buyerWallView;
