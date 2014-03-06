$(function(){
	$('.post-text').on('click', 'a', function(e){
		e.stopPropagation();
	});

	$('#showqr').on('click', function(){
			if($('#qrcode img')[0]) return;
         	var skey = document.getElementById('skey').innerText;
         	new QRCode(document.getElementById("qrcode"), skey);
        });

	function dhtIndicatorBg(){
		var bgcolor = '';
			  if(twisterDhtNodes <= 10){bgcolor = '#770900'
		}else if(twisterDhtNodes <= 20){bgcolor = '#773400'
		}else if(twisterDhtNodes <= 30){bgcolor = '#774c00'
		}else if(twisterDhtNodes <= 40){bgcolor = '#776400'
		}else if(twisterDhtNodes <= 50){bgcolor = '#707500'
		}else if(twisterDhtNodes <= 60){bgcolor = '#3f6900'
		}else if(twisterDhtNodes <= 70){bgcolor = '#005f15'
		}else if(twisterDhtNodes >= 71){bgcolor = '#009922'
		}
		$('.userMenu-dhtindicator').animate({'background-color': bgcolor });
	};
	setTimeout(dhtIndicatorBg, 300);
	setTimeout(function() {setInterval(dhtIndicatorBg, 2000)}, 400);
})

function modalDMIntr() {
	$(".cancel").on('click', function(event){
		if(!$(event.target).hasClass("cancel")) return;
		if($(".modal-content").attr("style") != undefined){$(".modal-content").removeAttr("style")};
		$('.modal-back').css('display', 'none');
	});
	$('.modal-back').on('click', function(){
		if($('.modal-content .direct-messages-list')[0]) return;
		directMessagesPopup();
		$(".modal-content").removeAttr("style");
	});
};
//sound notifications

function soundNotifOptions() {
	if(!localStorage['sndDM']) localStorage['sndDM'] = false;
	if(!localStorage['sndMention']) localStorage['sndMention'] = false;
	$('#notifyForm select').each(function(){
		this.value = localStorage[this.id];
	});

	var player = $('#player');
	player[0].pause();
	$('#player').empty();


	$('form#notifyForm').on('change','select',function(){
		localStorage.setItem(this.id, this.value);

		if(this.value == false) {player[0].pause(); return;}
		if (player[0].canPlayType('audio/mpeg;')) {
		    player.attr('type', 'audio/mpeg');
		    player.attr('src', 'sound/'+this.value+'.mp3');
			} else {
		    player.attr('type', 'audio/ogg');
		    player.attr('src', 'sound/'+this.value+'.ogg');
		}
		
	player[0].play();
	});
}

function volumeControl () {
	var playerVol = $('#playerVol');
	playerVol[0].value = localStorage[playerVol[0].id] ? localStorage[playerVol[0].id] : 100;
	$('.volValue').text((localStorage[playerVol[0].id] * 100).toFixed());
	
	playerVol.on('change',function(){
		localStorage.setItem(this.id, this.value);
		$('#player')[0].volume = (this.value);
		$('.volValue').text((this.value * 100).toFixed());
	});
}

function DMsNotif() {
	if(localStorage['sndDM'] == "false") return;
	var player = $('#player');
	$('#player').empty();

	if (player[0].canPlayType('audio/mpeg;')) {
		    player.attr('type', 'audio/mpeg');
		    player.attr('src', 'sound/'+localStorage['sndDM']+'.mp3');
			} else {
		    player.attr('type', 'audio/ogg');
		    player.attr('src', 'sound/'+localStorage['sndDM']+'.ogg');
		}
	player[0].volume = localStorage['playerVol'];
	player[0].play();
}

function mensNotif() {
	if(localStorage['sndMention'] == "false") return;
	var player = $('#player');
	$('#playerSec').empty();

	if (player[0].canPlayType('audio/mpeg;')) {
		    player.attr('type', 'audio/mpeg');
		    player.attr('src', 'sound/'+localStorage['sndMention']+'.mp3');
			} else {
		    player.attr('type', 'audio/ogg');
		    player.attr('src', 'sound/'+localStorage['sndMention']+'.ogg');
		}
	player[0].volume = localStorage['playerVol'];
	player[0].play();
};

function keysSend() {
	if(!localStorage['keysSend']) localStorage['keysSend'] = 1;
	$('#keysOpt select')[0].value = localStorage['keysSend'];
	
	$('#keysOpt select').on('change', function(){
		localStorage[this.id] = this.value;
	
	})
}

function autocompleteAndEmoji() {
	var storFollArr = JSON.parse(localStorage[localStorage.defaultScreenName]), suggests = [];
	
	for(var i = 0; i < storFollArr.followingUsers.length; i++){
		if(storFollArr.followingUsers[i] == localStorage.defaultScreenName) continue;
		suggests.push(storFollArr.followingUsers[i]);
	}
	suggests.reverse();
	$('textarea').textcomplete([
    { // html
        mentions: suggests,
        match: /\B@(\w*)$/,
        search: function (term, callback) {
            callback($.map(this.mentions, function (mention) {
                return mention.indexOf(term) === 0 ? mention : null;
            }));
        },
        index: 1,
        replace: function (mention) {
            return '@' + mention + ' ';
        }
    }
])
	$('textarea').textcomplete([
    { // emoji strategy
        match: /\B:([\-+\w]*)$/,
        search: function (term, callback) {
            callback($.map(emojies, function (emoji) {
                return emoji.indexOf(term) === 0 ? emoji : null;
            }));
        },
        template: function (value) {
            return '<img src="../img/emoji/' + value + '.png"></img>' + value;
        },
        replace: function (value) {
            return ':' + value + ': ';
        },
        index: 1,
        maxCount: 5
    }
]);
}


function replaceEmoji() {
		var exp = /\B:[A-Za-z0-9_+-]+:\B/gi;
	$('.post-text').each(function(){
		var string = $(this).html();
		$(this).html(string.replace(exp, function(match){
			var clearMatch = match.replace(/:/gi,'');
			if(emojies.indexOf(clearMatch) < 0) return match;
			return '<img src="../img/emoji/'+clearMatch+'.png"></img>'
		}));
	})
}
function InitOptions () {
	soundNotifOptions();
	volumeControl();
	keysSend();
}
function homeIntInit () {
	modalDMIntr ();
	setTimeout(autocompleteAndEmoji, 800);
	setTimeout(replaceEmoji, 800)
}