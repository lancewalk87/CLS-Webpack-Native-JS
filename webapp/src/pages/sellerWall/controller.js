// SellerWall : Controller
function sellerWallControler(backendService, sessionService, navService, hostID) {
	// Relevent Variables
	var userToken = sessionService.getSession().token;
	var userId = sessionService.getSession().user.id;

	/* Main Seller Methods */
	function postContent(settings) {	// Create Seller Post
		var streamURL = 'rtmp://66.71.253.202:1935/emmalous/stream='+userId;;
		var imgUrl = 'imgSrc/pathToImg/';
		if (settings[2]!=='liveStream') {
			streamURL=null;
		}
		return streamURL;
		var postData = [userId, settings[0], settings[1], imgUrl, settings[2], streamURL];
		console.log('sellerWall.controller.createStream('+postData+')');
		// return backendService.postContent(userToken, postData).then(function(returnInfo) {
		// 		return returnInfo;
		// });
	}

	function createNewGroup(groupData) {
		var saleGroupData = [Name, Description, Sales, Rating, Photos];
		console.log('sellerWall.controller.createNewGroup('+groupData+')');
	}

	function modifyGroup(groupData) {

		console.log('sellerWall.controller.modifyGroup('+groupData+')');
	}

	function addGroupAdmin(ids) {

		console.log('sellerWall.controller.addGroupAdmin('+ids+')');
	}

	function removeGroupAdmin(ids) {

		console.log('sellerWall.controller.removeGroupAdmin('+ids+')');
	}
	/* End Main Seller Methods */

	/* General User Methods */
	function pullFeedData() {
		return backendService.getPostIds(userToken, userId).then(function(postIds) {

		});
		console.log('sellerWall.controller.pullFeedData('+userToken+', '+userId+')');
	}

	function findSeller(query) {

	}

	function joinStream(id) {	// Join Stream
		console.log('joinStream');
			return 'rtsp://66.71.253.202:1935/emmalous/myStream';
	}

	function logout() {	// Logout User
    sessionService.saveSession({token: null, user: null});
 		navService.loadPage('landingPage');
 		console.log("sellerWall.controller.js: logout()");
 	}
	/* End General User Methods */

 	return {
		// Main Seller Methods
 		postContent: postContent,
		createNewGroup: createNewGroup,
		modifyGroup: modifyGroup,
		addGroupAdmin: addGroupAdmin,
		removeGroupAdmin: removeGroupAdmin,
		// General User Methods
		pullFeedData: pullFeedData,
		findSeller: findSeller,
		joinStream: joinStream,
 		logout: logout
 	 };

}
module.exports = sellerWallControler;
