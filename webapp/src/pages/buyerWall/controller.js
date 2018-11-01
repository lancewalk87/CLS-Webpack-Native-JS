// BuyerWall : Controller
function buyerWallController(backendService, sessionService, navService, pageRouter) {
	// Page Variables:
	var userData; var userToken;
	var userId;
	var wallData; var connectionData;
	var followingData;
	var postBlocks;

	// MAIN PAGE FUNCTIONS
	function init_Page() { // Initialize Page Backend
		getUserInfo();
		userToken = sessionService.getSession().token;
		followingData = getFollowing(userToken);
		userId = sessionService.getSession().user.id;
		console.log("init_Page()");
	}

	// Main Content Methods:
	function getUserInfo() {
		userData = [	// User Information
			sessionService.getSession().user.firstName,
			sessionService.getSession().user.lastName,
			sessionService.getSession().user.role,
			sessionService.getSession().user.posts,
			sessionService.getSession().user.following,
			sessionService.getSession().user.followers,
			sessionService.getSession().user.email,
			sessionService.getSession().user.passsword
		];

		console.log('getUserInfo() userData: '+userData);
			return userData;
	}

	function getFollowing(token) {	// following
		return backendService.getFollowing(userToken).then(function(data) {
			console.log('getFollowing() following: '+data);
				return data;
		}).then(function() {
			console.log('getFollowing('+token+')');
		});
	}

	function getFollowers() { // followers
		return getUserInfo(userToken).then(function(data){
			followers = userData[5];
			if (followers>0){
				// return listed followers
			}

			console.log('getFollowers() followers: '+data);
				return data;
		}).then(function() {
			console.log('getFollowers('+userToken+')');
		});
	}

	function listUsers(searchQuery) { // list registered users
		return backendService.getUsers(userToken).then(function(users){

			console.log('listUsers(searchQuery) users: '+users);
				return users;
		});
	}

	function addConnection(query) { // add user connection
		return backendService.addConnection(userToken, query).then(function(returnState) {

			console.log('addConnection(query) returnStatus: '+returnState);
				return returnState;
		});
	}

	function getPosts(searchQuery) { // return posts
		console.log('getPosts('+searchQuery+')');
		return backendService.getPosts(userToken);
	}

	// User Post Mehtods
	function joinStream(id) {	// Join Stream
		console.log('joinStream');
		return 'rtsp://66.71.253.202:1935/emmalous/myStream';
	}

 	function refreshFeed() { // Update Feed
 		var feedContent = backendService.getPosts(sessionService.getSession().user.token);

 		console.log('refreshFeed()');
 	}

 	function removeContent(id) { //

 		console.log('removeContent('+id+')');
 	}

 	// Navigation Methods:
 	function initPanel() {
 		mainView.openPanel('left');

 		console.log('initPanel()');
 	}

 	function logout() {	// Logout User
        sessionService.saveSession({token: null, user: null});
 		navService.loadPage('landingPage');

 		console.log('logout()');
 	}
 	// END MAIN PAGE FUNCTIONS

 	return {
 		init_Page: init_Page,
 		joinStream: joinStream,
 		refreshFeed: refreshFeed,
 		initPanel : initPanel,
 		getUserInfo: getUserInfo,
 		getFollowing: getFollowing,
 		getFollowers: getFollowers,
 		getPosts: getPosts,
 		listUsers: listUsers,
 		addConnection: addConnection,
 		logout: logout,
 		userToken: userToken
 	};
}
module.exports = buyerWallController;
