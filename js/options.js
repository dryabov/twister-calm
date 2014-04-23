var TwisterOptions = function()
{
	this.getOption = function(optionName, defaultValue) {
		var keyName = 'options:' + optionName;
		if ($.localStorage.isSet(keyName)) {
			return $.localStorage.get(keyName);
		}else{
			return defaultValue;
		}
	};

	this.setOption = function(optionName, value) {
		var keyName = 'options:' + optionName;
		$.localStorage.set(keyName, value);
	};

	this.soundNotifOptions = function() {

		$('.sndOpt').each(function(){
			this.value = $.Options.getOption(this.id, 'false');
		});

		var player = $('#player');
		player[0].pause();
		$('#player').empty();


		$('.sndOpt').on('change',function(){
			$.Options.setOption(this.id, this.value);

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

	this.volumeControl = function() {
		var playerVol = $('#playerVol');

		playerVol[0].value = $.Options.getOption(playerVol[0].id, 1)
		
		$('.volValue').text((playerVol[0].value * 100).toFixed());
		
		playerVol.on('change',function(){
			$.Options.setOption(this.id, this.value)
			$('#player')[0].volume = (this.value);
			$('.volValue').text((this.value * 100).toFixed());
		});
	}

	this.DMsNotif = function() {
		if($.Options.getOption('sndDM', 'false') === "false") return;
		var player = $('#player');
		$('#player').empty();

		if (player[0].canPlayType('audio/mpeg;')) {
			    player.attr('type', 'audio/mpeg');
			    player.attr('src', 'sound/'+localStorage['sndDM']+'.mp3');
				} else {
			    player.attr('type', 'audio/ogg');
			    player.attr('src', 'sound/'+localStorage['sndDM']+'.ogg');
			}
		player[0].volume = $.Options.getOption('playerVol', 1);
		player[0].play();
	}

	this.mensNotif = function() {
		if($.Options.getOption('sndMention', 'false' === 'false')) return;

		var player = $('#player');
		$('#playerSec').empty();

		if (player[0].canPlayType('audio/mpeg;')) {
			    player.attr('type', 'audio/mpeg');
			    player.attr('src', 'sound/'+localStorage['sndMention']+'.mp3');
				} else {
			    player.attr('type', 'audio/ogg');
			    player.attr('src', 'sound/'+localStorage['sndMention']+'.ogg');
			}
		player[0].volume = $.Options.getOption('playerVol', 1);
		player[0].play();
	};
	
	this.keysSend = function() {
		
		$('#keysSend')[0].value = $.Options.getOption('keysSend', 2)
		
		$('#keysSend').on('change', function(){
			$.Options.setOption(this.id, this.value);
	
		})
	}

	this.locLang = function() {
		$('#locLang').val($.Options.getOption('locLang', 'auto'))
		$('#locLang').on('change', function(){
			$.Options.setOption(this.id, this.value);
			location.reload();
		})
	}

	this.showPreviewOpt = function() {
		
		$('.previewOpt').each(function() {
			this.value = $.Options.getOption(this.id, 'enable');
		})

		$('.gifCheckBox').prop('checked', $.Options.getOption('imagesPreviewGif', 'true'))
		
		if($.Options.getOption('imagesPreview', 'enable') === 'disable'){
			$('input[type="checkbox"]').prop('disabled', 'true')
		}
		
		$('.previewOpt').on('change', function(){
			$.Options.setOption(this.id, this.value)
			if (this.id === 'imagesPreview'){
				switch(this.value){
					case 'enable': $('.gifCheckBox').prop('disabled', false); break;
					case 'disable': $('.gifCheckBox').prop('disabled', true); break;
				}
			}
		})
		
		$('input[type="checkbox"]').on('click', function(){
			$.Options.setOption(this.name, this.checked)
		})

    this.splitPostsOpt = function (){
        $('#splitPosts').val($.Options.getOption('splitPosts', 'disable'))

        if ($.Options.getOption('splitPosts', 'disable') === 'enable'){
            $("#splitPostWarning").css('display', 'inline')
        }else{
            $("#splitPostWarning").css('display', 'none')
        }

        $('#splitPosts').on('change', function (){
            $.Options.setOption(this.id, this.value);

            if (this.value === 'enable'){
                $("#splitPostWarning").css('display', 'inline');
            }else{
                $("#splitPostWarning").css('display', 'none');
            }
        });
    }
}

	this.initOptions = function() {
		this.soundNotifOptions();
		this.volumeControl();
		this.keysSend();
		this.locLang();
		this.showPreviewOpt();
		this.splitPostsOpt();
	}

}

jQuery.Options = new TwisterOptions;