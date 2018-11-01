// Global dependencies
require('framework7');
  // Plateform Select
if (PLATFORM === 'material') { require('./material.less');
} else { require('./ios.less'); }

require('es6-promise').polyfill();
// Intial Application Views
var landingPage = require('./pages/landingPage');
var loginPage = require('./pages/login');
var registerPage = require('./pages/register');
// Main Application Views
var buyerWall = require('./pages/buyerWall');
var sellerWall = require('./pages/sellerWall');
var liveStreamPage = require('./pages/liveStream');
var newPostPage = require('./pages/newPost');
var searchPage = require('./pages/search');

// Services
var httpService = require('./services/http_service');
var backendService = require('./services/backend_service');
var navigationService = require('./services/navigation_service');
var sessionService = require('./services/session_service');
var nativeExtensions = require('./services/native_extensions');
var chatService = require('./services/chat_service');

// Create the Framework7 App and needed Services
var f7App = new Framework7({ material: true, pushState: true, swipePanel: 'left'});
var http = httpService(Dom7);
var sessionSvc = sessionService();
var nativeExt = nativeExtensions(f7App.device);
var backend = backendService('http://199.58.187.114:3000', http);
var nativeExt = nativeExtensions(f7App.device);

// Initial Loading View
var mainView = f7App.addView('.view-main', { main: true });
var navService = navigationService(mainView.router);
var pageRouter = mainView.router;
var session = sessionSvc.getSession();

pageRouter.back({url: 'sellerWall.html', force: true});


// if (session.user===null) { // session = null
//     pageRouter.back({url: 'landingPage.html', force: true});
// } else {
//   var initViewType = session.user.role;
//   if (session.user.role==='Buyer') {
//     initViewType='buyerWall.html';
//   } else {
//     initViewType='sellerWall.html';
//   }
//   pageRouter.loadPage(initViewType);
// }

// Intial Application View Intializers
// f7App.onPageInit('landingPage', function(page) {
//   landingPage(backend, navService, sessionSvc).load(Dom7(page.container));
// });

f7App.onPageInit('login', function(page) {
  loginPage(backend, navService, sessionSvc).load(Dom7(page.container));
});

f7App.onPageInit('register', function(page) {
  registerPage(backend, navService, sessionSvc).load(Dom7(page.container));
});

// Main Applicaiton View Intializers
f7App.onPageInit('buyerWall', function(page) {
  buyerWall(Dom7, backend, sessionSvc, navService, pageRouter).load(Dom7(page.container));
});

f7App.onPageInit('sellerWall', function(page) {
  sellerWall(Dom7, backend, sessionSvc, navService, page.query.id).load(Dom7(page.container));
});

var liveStreamPageInst;

f7App.onPageInit('live_stream', function(page) {
  console.log('live_stream init');
  liveStreamPageInst = liveStreamPage(false, page.query.id, sessionSvc, nativeExt, chatSvc, navService, backend);
  liveStreamPageInst.load(Dom7(page.container));
});

f7App.onPageBack('live_stream', function(){
  liveStreamPageInst.cleanup();
});

var liveStreamBroadcastPageInst;
f7App.onPageInit('live_stream_broadcast', function(page){
  console.log('live_stream_broadcast init');
  liveStreamBroadcastPageInst = liveStreamPage(true, page.query.id, sessionSvc, nativeExt, chatSvc, navService, backend);
  liveStreamBroadcastPageInst.load(Dom7(page.container));
});

f7App.onPageBack('live_stream_broadcast', function(){
  liveStreamBroadcastPageInst.cleanup();
});

f7App.onPageInit('new_post', function(page){
  newPostPage(backend, sessionSvc, navService).load(Dom7(page.container));
});
