//SellerWall View
function sellerWallView(Dom7, controller) {
  function load(page) {
    // MAIN PAGE FUNCTIONS

    // Page Objects
    var nativeScoket;
        // User Wall Page
    var streamForm = document.getElementById("stream-form");
    var postBlock = document.getElementById("postBlock");
    var createStream = document.getElementById("create-stream");
    var cancelStream = document.getElementById("cancel-stream");
    var beginStream = document.getElementById("begin-stream");
    var settingsErrors = document.getElementById("settings-errors");
    var toolButton1 = document.getElementById("toolButton1");
    var toolButton2 = document.getElementById("toolButton2");

    var title = document.getElementById("title");
    var description = document.getElementById("description");

    defaultUI();
    function defaultUI() {
        streamForm.style.display = 'none';
        createStream.style.display = 'block';
        postBlock.style.display = 'block';
        cancelStream.style.display = 'none';
        beginStream.style.display = 'none';
        settingsErrors.style.display = 'none';
        toolButton1.innerHTML = 'Current Feed';
        toolButton2.innerHTML = 'Recent Feed';
        title.value = '';
        document.getElementById("title").style.borderColor = '#42c5f4';
        description.value = '';
        document.getElementById("description").style.borderColor = '#42c5f4';
    }

    function executeFromView() {
        window.alert('executeFromView');
    }

    page.find('#create-stream').on('click', function(e) {
        streamForm.style.display = 'block';
        createStream.style.display = 'none';
        cancelStream.style.display = 'block';
        beginStream.style.display = 'block';
        postBlock.style.display = 'none';
        toolButton1.innerHTML = 'Create Stream';
        toolButton2.innerHTML = 'Create Video';
    });


    page.find('#cancel-stream').on('click', function(e) {
        defaultUI();
    });

    page.find('#begin-stream').on('click', function(e) {
        var fields = [
          name = 'title',
          desc = 'description',
          type = 'type'
        ];
        var settings = [
            title = page.find('#'+fields[0]).val(),
            description = page.find('#'+fields[1]).val(),
            contentType = page.find('#'+fields[2]).val()
        ];
          var nilObject = [];
        function checkSettings() {
            for (var i=0;i<settings.length;i++) { // Index Fields
                if (settings[i]==='') { // value == nil
                    nilObject.push(fields[i]);
                 } else {
                    document.getElementById(fields[i]).style.borderColor = '#42c5f4';
                 }

                 if (i===settings.length-1) {
                    if (nilObject.length===0) { return true;
                    } else { return false; }
                }
            }
        }
        var settingsCheck = checkSettings();

        var pageError;
        if (settingsCheck) { // Create Stream
            defaultUI();
            var streamURL = controller.postContent(settings);
            window.location = 'interface!CallStreamView!host!'+streamURL+'!';
        } else {
            for (var i=0;i<nilObject.length;i++) {
                document.getElementById(nilObject[i]).style.borderColor = 'red';
                pageError = '<li>Missing Fields</li>';
            }
        }
        page.find('registration-errors').html(pageError);
    });

    page.find('#join-stream').on('click', function(e) {
        var streamURL = controller.joinStream();
        window.location = 'interface!CallStreamView!join!'+streamURL+'!';
        console.log('page.find(\'#join-stream\').on(\'click\', function(e) withURL: '+streamURL);
    });

    page.find('#logout-btn').on('click', function(e) {
        console.log("buyerWall.view.js: User Logout");
        controller.logout();
    });

/* UIDevice Orientation NS_ENUM
    typedef NS_ENUM(NSInteger, UIDeviceOrientation) {
        UIDeviceOrientationUnknown, [0]
        UIDeviceOrientationPortrait,            // Device oriented vertically, home button on the bottom [1]
        UIDeviceOrientationPortraitUpsideDown,  // Device oriented vertically, home button on the top [2]
        UIDeviceOrientationLandscapeLeft,       // Device oriented horizontally, home button on the right [3]
        UIDeviceOrientationLandscapeRight,      // Device oriented horizontally, home button on the left [4]
        UIDeviceOrientationFaceUp,              // Device oriented flat, face up [5]
        UIDeviceOrientationFaceDown             // Device oriented flat, face down [6]
    } __TVOS_PROHIBITED;

    String Format: window.reorientation.%ld
*/
    // END MAIN PAGE FUNCTIONS
  }
  return { load: load };
}
module.exports = sellerWallView;
