// Global dependencies
require('framework7');
if (PLATFORM === 'material') { require('./material.less');
} else { require('./ios.less'); }
require('es6-promise').polyfill();
// Chat Dependancies:
var sessionService = require('./services/session_service');
var sessionSvc = sessionService();
var backendService = require('./services/backend_service');
var userInfo = [
  sessionSvc.getSession().user.id,
  sessionSvc.getSession().token,
  sessionSvc.getSession().user.role,
  sessionSvc.getSession().user.firstName,
  sessionSvc.getSession().user.lastName
];
var userName = userInfo[3]+' '+userInfo[4];
defaultUI(1); // defaultUI(userRole);
var chatService = require('./services/chat_service');
var chatSvc = chatService('ws://199.58.187.114:3000/chat');
chatSvc.connect(userInfo[0], userInfo[1]);

// UI Elements
var MainChatView = document.getElementById('chat-messages-view');
var CustomChatView = document.getElementById('custom-chat-view');

// User Information
// var userName = sessionSvc.getSession().user.firstName;

/*** Methods ***/

/* Socket Connection Methods */
chatSvc.onConnect(function(state) { console.log('chatSvc.onConnect(function('+state+'))'); });
chatSvc.onClose(function(close) { console.log('chatSvc.onClose(function('+'close'+'))'); });
  // Main Chat Socket
chatSvc.onMessage(function(msg) {	// onMessage: received msg
  var textFloat = 'style=\'font-family: "Times New Roman", Times, serif; font-size: 12pt;\'';
  var message = msg;
  if (msg.includes(userName)) {
    textFloat = 'style=\'font-family: "Times New Roman", Times, serif; font-size: 12pt; color: blue;\'';
    message = msg.replace(userName, 'You');
  }
  var chatMessagesView = document.getElementById('chat-messages-view').innerHTML += ('<p '+textFloat+'>'+message+'</p>');
  chatMessagesView.scrollTop = chatMessagesView[0].scrollHeight;

  console.log('chatSvc.onMessage(function('+msg+', '+userId+'))');
});

  // Custom Chat Socket
chatSvc.onCustomChat(function(blockData) { // on: newCustomSaleBlock

  console.log('chatSvc.onCustomChat(function('+blockData+'))');
});

  // Celebration Socket
chatSvc.onCelebration(function(data) { // onCelebration: receive coordinates
  window.locaiton = 'interface!celebration!'+data+'!_!';
  console.log('chatSvc.onReceiveCelebration(function('+data+')');
});

  // StreamHost Changes
chatSvc.onStreamHostChange(function(data) {
  window.location = 'interface!hostChange!'+'!_!'+data+'!';

  console.log('chatSvc.onStreamHostChange(function('+data+')');

});
/* End Socket Connetion Methods */

/* Interface Callers */
  // Msg Callers : dataTypes = ['msg', 'customSale', 'celebration', 'hostChange'];
var chatBox = document.getElementById('chat-box');
document.getElementById('chat-send-btn').onclick = function(e) {	// User: Add Comment
  e.preventDefault();

  if (chatBox.value != ''&&filterPassed(chatBox.value)) {
      var data = 'msg='+userName+': '+chatBox.value;
      chatSvc.send(data); chatBox.value = '';
      console.log('document.getElementById(\'chat-send-btn\').onclick, transmitMsg: '+data);
  }
}

var exclusion = ["4r5e", "5h1t", "5hit", "a55", "anal", "anus", "ar5e", "arrse", "arse", "ass", "ass-fucker", "asses", "assfucker", "assfukka", "asshole", "assholes", "asswhole", "a_s_s", "b!tch",
"b00bs", "b17ch", "b1tch", "ballbag", "balls", "ballsack", "bastard", "beastial", "beastiality", "bellend", "bestial", "bestiality", "bi+ch", "biatch", "bitch", "bitcher", "bitchers", "bitches", "bitchin", "bitching",
"bloody", "blow job", "blowjob", "blowjobs", "boiolas", "bollock", "bollok", "boner", "boob", "boobs", "booobs", "boooobs", "booooobs", "booooooobs", "breasts", "buceta", "bugger", "bum", "bunny fucker", "butt",
"butthole", "buttmuch", "buttplug", "c0ck", "c0cksucker", "carpet muncher", "cawk", "chink", "cipa", "cl1t", "clit", "clitoris", "clits", "cnut", "cock", "cock-sucker", "cockface", "cockhead", "cockmunch", "cockmuncher",
"cocks", "cocksuck", "cocksucked", "cocksucker", "cocksucking", "cocksucks", "cocksuka", "cocksukka", "cok", "cokmuncher", "coksucka", "coon", "cox", "crap", "cum", "cummer", "cumming", "cums", "cumshot", "cunilingus",
"cunillingus", "cunnilingus", "cunt", "cuntlick", "cuntlicker", "cuntlicking", "cunts", "cyalis", "cyberfuc", "cyberfuck", "cyberfucked", "cyberfucker", "cyberfuckers", "cyberfucking", "d1ck", "damn", "dick", "dickhead", "dildo", "dildos",
"dink", "dinks", "dirsa", "dlck", "dog-fucker", "doggin", "dogging", "donkeyribber", "doosh", "duche", "dyke", "ejaculate", "ejaculated", "ejaculates", "ejaculating", "ejaculatings", "ejaculation", "ejakulate", "f u c k", "f u c k e r",
"f4nny", "fag", "fagging", "faggitt", "faggot", "faggs", "fagot", "fagots", "fags", "fanny", "fannyflaps", "fannyfucker", "fanyy", "fatass", "fcuk", "fcuker", "fcuking", "feck", "fecker", "felching",
"fellate", "fellatio", "fingerfuck", "fingerfucked", "fingerfucker", "fingerfuckers", "fingerfucking", "fingerfucks", "fistfuck", "fistfucked", "fistfucker", "fistfuckers", "fistfucking", "fistfuckings", "fistfucks", "flange", "fook", "fooker", "fuck", "fucka",
"fucked", "fucker", "fuckers", "fuckhead", "fuckheads", "fuckin", "fucking", "fuckings", "fuckingshitmotherfucker", "fuckme", "fucks", "fuckwhit", "fuckwit", "fudge packer", "fudgepacker", "fuk", "fuker", "fukker", "fukkin", "fuks",
"fukwhit", "fukwit", "fux", "fux0r", "f_u_c_k", "gangbang", "gangbanged", "gangbangs", "gaylord", "gaysex", "goatse", "God", "god-dam", "god-damned", "goddamn", "goddamned", "hardcoresex", "hell", "heshe", "hoar",
"hoare", "hoer", "homo", "hore", "horniest", "horny", "hotsex", "jack-off", "jackoff", "jap", "jerk-off", "jism", "jiz", "jizm", "jizz", "kawk", "knob", "knobead", "knobed", "knobend",
"knobhead", "knobjocky", "knobjokey", "kock", "kondum", "kondums", "kum", "kummer", "kumming", "kums", "kunilingus", "l3i+ch", "l3itch", "labia", "lust", "lusting", "m0f0", "m0fo", "m45terbate", "ma5terb8",
"ma5terbate", "masochist", "master-bate", "masterb8", "masterbat*", "masterbat3", "masterbate", "masterbation", "masterbations", "masturbate", "mo-fo", "mof0", "mofo", "mothafuck", "mothafucka", "mothafuckas", "mothafuckaz", "mothafucked", "mothafucker", "mothafuckers",
"mothafuckin", "mothafucking", "mothafuckings", "mothafucks", "mother fucker", "motherfuck", "motherfucked", "motherfucker", "motherfuckers", "motherfuckin", "motherfucking", "motherfuckings", "motherfuckka", "motherfucks", "muff", "mutha", "muthafecker", "muthafuckker", "muther", "mutherfucker",
"n1gga", "n1gger", "nazi", "nigg3r", "nigg4h", "nigga", "niggah", "niggas", "niggaz", "nigger", "niggers", "nob", "nob jokey", "nobhead", "nobjocky", "nobjokey", "numbnuts", "nutsack", "orgasim", "orgasims",
"orgasm", "orgasms", "p0rn", "pawn", "pecker", "penis", "penisfucker", "phonesex", "phuck", "phuk", "phuked", "phuking", "phukked", "phukking", "phuks", "phuq", "pigfucker", "pimpis", "piss", "pissed",
"pisser", "pissers", "pisses", "pissflaps", "pissin", "pissing", "pissoff", "poop", "porn", "porno", "pornography", "pornos", "prick", "pricks", "pron", "pube", "pusse", "pussi", "pussies", "pussy",
"pussys", "rectum", "retard", "rimjaw", "rimming", "s hit", "s.o.b.", "sadist", "schlong", "screwing", "scroat", "scrote", "scrotum", "semen", "sex", "sh!+", "sh!t", "sh1t", "shag", "shagger",
"shaggin", "shagging", "shemale", "shi+", "shit", "shitdick", "shite", "shited", "shitey", "shitfuck", "shitfull", "shithead", "shiting", "shitings", "shits", "shitted", "shitter", "shitters", "shitting", "shittings",
"shitty", "skank", "slut", "sluts", "smegma", "smut", "snatch", "son-of-a-bitch", "spac", "spunk", "s_h_i_t", "t1tt1e5", "t1tties", "teets", "teez", "testical", "testicle", "tit", "titfuck", "tits",
"titt", "tittie5", "tittiefucker", "titties", "tittyfuck", "tittywank", "titwank", "tosser", "turd", "tw4t", "twat", "twathead", "twatty", "twunt", "twunter", "v14gra", "v1gra", "vagina", "viagra", "vulva",
"w00se", "wang", "wank", "wanker", "wanky", "whoar", "whore", "willies", "willy", "xrated", "xxx"];
function filterPassed(msg) { // Chat Filteration
  for (var i=0; i<exclusion.length; i++) {
    if (msg.includes(exclusion[i])) {
        chatBox.value='';
        console.log('filterFailed('+msg+')');
          return false; // Do NOT post msg
    }
  }
  console.log('filterPassed('+msg+')');
    return true;
}

  // Custom Chat Callers
document.getElementById('customChat-create').onclick = function(e) {	// Seller: Create Custom Sale
	e.preventDefault();
	var xPos = [MainChatView.offsetLeft, CustomChatView.offsetLeft]; customChatSelection(xPos, 'init');
			console.log('document.getElementById(\'customChat-create\').onclick, pos: '+xPos+')');
}

document.getElementById('customChat-cancel').onclick = function(e) {
	e.preventDefault();
	var xPos = [MainChatView.offsetLeft, CustomChatView.offsetLeft]; customChatSelection(xPos, 'cancel');
	console.log('document.getElementById(\'customChat-cancel\').onClick');
}

document.getElementById('customChat-post').onClick = function(e) { // Seller: Publish Sale Block
	e.preventDefault();
	var title = document.getElementById('blockTitle').innerHTML;
	var price = document.getElementById('blockPrice').innerHTML;
	var amount = document.getElementById('blockCap').innerHTML;

  var data = 'customSale'+chatBox.value;
  chatSvc.send(data);

	var blockData = [title, price, amount];

	console.log('document.getElementById(\'customChat-post\').onClick withData: '+blockData);
}
/* End Interface Callers */

/* View Controller Methods */
  // UI Methods
function defaultUI(userRole) {	// chatView Defaults
	var chatMessageControl = document.getElementById('chat-messages-control'); chatMessageControl.style.display = 'block';
	var customChatControl = document.getElementById('custom-chat-control'); customChatControl.style.display = 'none';

	if (userRole==='Buyer') {
		var customChatBtn = document.getElementById('customChat-create');
		customChatBtn.style.display = 'none';
		var chatSendBtn = document.getElementById('chat-send-btn');
		chatSendBtn.style.width = '100%';
	}

	console.log('defaultUI('+userRole+')');
}

  // Custom Chat Methods
var isMainView = true;
function customChatSelection(viewPositions, senderBtn) { // Toggle: MainChatView<->CustomChatView
	var MainChatView = document.getElementById('chat-messages-view');
	var CustomChatView = document.getElementById('custom-chat-view');
	var chatMessageControl = document.getElementById('chat-messages-control');
	var customChatControl = document.getElementById('custom-chat-control');

	if (senderBtn==='init') {
		MainChatView.style.display = 'none';
		CustomChatView.style.display = 'block';

		chatMessageControl.style.display = 'none';
		customChatControl.style.display = 'block';
	} else {
		MainChatView.style.display = 'block';
		CustomChatView.style.display = 'none';

		chatMessageControl.style.display = 'block';
		customChatControl.style.display = 'none';
	}
}

function getSaleBlocks(token, id) {
	return backendService.getAllSaleBlocks(token, id).then(function(blockData) {
		console.log('getSaleBlocks('+token+', '+id+')');
			return blockData;
	});
}

function postSaleBlock(blockData, id) {

}

function claimSaleBlock(token, id, blockData) {

}
/* End View Controller Methods */

/* native->webapp interface methods */
window.hostChange = function(data) { // streamHost Change
  var transmit = 'hostChange'+data;
  chatSvc.send(transmit);

  console.log('Chat_Index.js: window.hostChange = function('+transmit+')');
}

window.initCelebration = function(data) { // intialize celebration
  var transmit = 'celebration'+data;
    chatSvc.send(transmit);

  console.log('Chat_Index.js: window.initCelebration = function('+transmit+')');
}

window.terminateConnection = function() {
  console.log('Chat_Index.js: window.terminateConnection = function()');
}
/* End native->webapp interface methods */
