$(function() {
	
});

function soundNotifOptions() {
	if(!localStorage['sndDM']) localStorage['sndDM'] = false;
	if(!localStorage['sndMention']) localStorage['sndMention'] = false;
	$('.sndOpt').each(function(){
		this.value = localStorage[this.id];
	});

	var player = $('#player');
	player[0].pause();
	$('#player').empty();


	$('.sndOpt').on('change',function(){
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
	if(!localStorage[playerVol[0].id]) localStorage[playerVol[0].id] = 1;
	playerVol[0].value = localStorage[playerVol[0].id];
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
	$('#keysSend')[0].value = localStorage['keysSend'];
	
	$('#keysSend').on('change', function(){
		localStorage[this.id] = this.value;
	
	})
}

function setLang() {

	$('#language').val(localStorage['locLang'] || 'auto')
	$('#language').on('change', function(){
		localStorage['locLang'] = $(this).val();
		location.reload();
	})
}

function setTheme() {
	if(!localStorage['theme']) localStorage['theme'] = 'calm';
	$('#theme').val(localStorage['theme']).on('change', function(){
		localStorage['theme'] = $(this).val();
		location.reload();
	});

}

function setShowPreviewOpt(){
	if(!localStorage['imagesPreview']) localStorage['imagesPreview'] = 'enable';
	if(!localStorage['imagesPreviewGif']) localStorage['imagesPreviewGif'] = 'true';
	if(!localStorage['youtubePreview']) localStorage['youtubePreview'] = 'enable';
	if(!localStorage['vimeoPreview']) localStorage['vimeoPreview'] = 'enable';
	
	$('.previewOpt').each(function() {
		this.value = localStorage[this.id];
	})

	$('.gifCheckBox').prop('checked', localStorage['imagesPreviewGif'] === 'true')
	
	if(localStorage['imagesPreview'] == 'disable'){
		$('input[type="checkbox"]').prop('disabled', localStorage['imagesPreviewGif'])
	}
	
	$('.previewOpt').on('change', function(){
		localStorage[this.id] = $(this).val();
		if (this.id === 'imagesPreview'){
			switch($(this).val()){
				case 'enable': $('.gifCheckBox').prop('disabled', false); break;
				case 'disable': $('.gifCheckBox').prop('disabled', true); break;
			}
		}
	})
	
	$('input[type="checkbox"]').on('click', function(){
		localStorage[$(this).attr('name')] = $(this).prop('checked')
	})
}

function InitOptions() {
	soundNotifOptions();
	volumeControl();
	keysSend();
	setLang();
	setTheme();
	setShowPreviewOpt();
}
function InitOptionsforHome() {
	setShowPreviewOpt();
}