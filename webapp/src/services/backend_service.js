// APPLICATION BACKEND SERVER CONTROLS
function BackendService(baseUrl, http) {
  /* Initial User Methods */
  function login(email, password) { // login user
    return http.post(baseUrl + '/auth', {email: email, password: password}).then(function(resp) {
      console.log('backendService.login('+email+', '+password+')');
      if(!resp.data.token){ throw resp; }
        return resp.data.token;
    }).catch(function(err) { throw err.data; });
  }

  function logout(email) {
    return http.post(baseUrl + '/auth/logout', {email: email}).then(function(resp) {
      console.log('backendService.logout('+email+')');
      if(!resp.data.token){ throw resp; }
        return resp.data.token;
    }).catch(function(err) { throw err.data; });
  }

  function passwordReset(email) {
    return http.post('/register/passwordReset', {email: email}).then(function(resp) {
      console.log('backendService.passwordReset('+email+')');
      // return http.post('/auth/reset', {})
    }).catch(function(err) { throw err.data; });
  }

  function registerUser(userData) { // register new user
    return http.post(baseUrl + '/register', userData).then(function(resp) {
      console.log('backendService.registerUser('+userData+')');
      if (!resp.data.token) { throw resp; }
      return resp.data.token;
    }).catch(function(err) { throw err.data; });
  }

  function getCurrentUserInfo(token) { // get logged user info
    return http.get(baseUrl + '/users/me', '', {headers: {'x-user-token': token}}).then(function(resp) {
      console.log('backendService.getCurrentUserInfo('+resp.data+')');
        return resp.data;
    });
  }
  /* End Inital User Methods */

  /* User Post Methods */
  function postContent(token, postData) { // post wall content
    return http.post(baseUrl + '/posts/newPost', postData, {headers: {'x-user-token': token}}).then(function(resp) {
      console.log('backendService.postContent('+token+', '+postData+')');
        return resp.data;
    });
  }

  function updatePost(token, postId, alterColumn, alterData) { // update existing post

  }

  function deletePost(token, postId) {

  }

  function getPostIds(token, userId) { // Pull post Ids

    console.log('');
  }

  function getPostData(userId, postId) {  // Pull Post Data
    // var pseduoReturn = [1, 'Selling Clothing', 'Selling Random Clothing Items, Join to see great deals!', 'src', true, 'rtsp://66.71.253.202:1935/emmalous/myStream'];
    //   return pseduoReturn;
      return http.get(baseUrl + '/users/posts/all', '', {headers: {'x-user-token': token}}).then(function(resp) {
          console.log(resp.data);
          return resp.data;
      });
  }
  /* End User Post Methods */

  /* User Connection Methods */
  function getUsers(token) {
    return http.get(baseUrl + '/users/all', '', {headers: {'x-user-token': token}})
      .then(function(resp){ return resp.data });
  }

  function addConnection(token, data) { // Add New Connection
    return http.post(baseUrl + '/connections/addConnection', data, {headers: {'x-user-token' : token}})
      .then(function(resp){ return resp.data });
  }

  function getConnections(token, userId) { // Return User Following
    return http.get(baseUrl + '/connections/getConnections', '', {headers: {'x-user-token': token}})
      .then(function(resp) {
        return resp.data;
      });
  }

  function getFollowers() { // Return User Followers

  }

  function createSaleGroup(token, groupData) {
    // [groupData0 = groupOwnerId]
    return http.post(baseUrl + '/groups/newGroup', postData, {headers: {'x-user-token': token}}).then(function(resp) {
      console.log('backendService.createSaleGroup('+token+', '+groupData+')');
        return resp.data;
    });
  }

  function editSaleGroup(token, editGroupData) {

  }

  function joinSaleGroup(token, userId) {

  }

  function deleteSaleGroup(token, groupId) {

  }

  function findSaleGroups(token, indexKey) {

  }

  function addGroupAdmin(token, groupId, userId) {

  }

  function removeGroupAdmin(token, groupId, userId) {

  }
  /* End User Connections Methods */

  /* Sale Block Methods */
  function createSaleBlock(token, blockData) {

  }

  function editSaleBlock(token, editBlockData) {

  }

  function getAllSaleBlocks(token) {
    return 'nil';
  }

  function getBlockData(token, blockId) {

  }

  function deleteSaleBlock(token, blockId) {

  }
  /* End Sale Block Methods */

  return {
    // Initial User Methods
    login: login,
    registerUser: registerUser,
    getCurrentUserInfo: getCurrentUserInfo,
    // User Post Methods
    postContent: postContent,
    updatePost: updatePost,
    deletePost: deletePost,
    getPostIds: getPostIds,
    getPostData: getPostData,
    // User Connection Methods
    getUsers: getUsers,
    addConnection: addConnection,
    getConnections: getConnections,
    createSaleGroup: createSaleGroup,
    editSaleGroup: editSaleGroup,
    joinSaleGroup: joinSaleGroup,
    deleteSaleGroup: deleteSaleGroup,
    findSaleGroups: findSaleGroups,
    addGroupAdmin: addGroupAdmin,
    removeGroupAdmin: removeGroupAdmin,
    // Sale Block Methods
    createSaleBlock: createSaleBlock,
    editSaleBlock: editSaleBlock,
    getAllSaleBlocks: getAllSaleBlocks,
    getBlockData: getBlockData,
    deleteSaleBlock: deleteSaleBlock
  };
}
// END APPLICATION BACKEND SERVER CONTROLS
module.exports = BackendService;
