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
		var opt = $.Options.getOption('sndDM', 'false');

		var player = $('#player');
		$('#player').empty();

	    player.attr('type', 'audio/mpeg');
	    player.attr('src', 'sound/'+opt+'.mp3');

		player[0].volume = $.Options.getOption('playerVol', 1);
		player[0].play();
	}

	this.mensNotif = function() {
		if($.Options.getOption('sndMention', 'false') === 'false') return;
		var opt = $.Options.getOption('sndMention', 'false');

		var player = $('#player');
		$('#playerSec').empty();

	    player.attr('type', 'audio/mpeg');
	    player.attr('src', 'sound/'+opt+'.mp3');

		player[0].volume = $.Options.getOption('playerVol', 1);
		player[0].play();
	};
	
	this.keysSend = function() {
		
		$('#keysSend').val($.Options.getOption('keysSend', 2));
		
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
		var $gifCheckBox = $('.gifCheckBox');
		$('.previewOpt').each(function() {
			this.value = $.Options.getOption(this.id, 'enable');
		})

		$gifCheckBox.prop('checked', $.Options.getOption('imagesPreviewGif', 'true'))
		
		if($.Options.getOption('imagesPreview', 'enable') === 'disable'){
			$gifCheckBox.prop('disabled', 'true')
		}
		
		$('.previewOpt').on('change', function(){
			$.Options.setOption(this.id, this.value)
			if (this.id === 'imagesPreview'){
				switch(this.value){
					case 'enable': $gifCheckBox.prop('disabled', false); break;
					case 'disable': $gifCheckBox.prop('disabled', true); break;
				}
			}
		});
		
		$gifCheckBox.on('click', function(){
			$.Options.setOption(this.name, this.checked)
		});
		$('input[name="previewSize"]').on('change', function () {
		    $.Options.setOption(this.name, this.value);
		});
		var query = 'input[value=\"'+$.Options.getOption('previewSize', 'short')+'\"]';
		$(query)[0].checked = true;
	}
	this.imgPreviwProxy = function () {
	    $('#imgPreviewProxy').val($.Options.getOption('imgPreviewProxy', 'disable'));
	    $('#imgPreviewProxy').on('change', function () {
	        $.Options.setOption(this.id, this.value);
	    })
	}
	this.showAlienReply = function () {
		$('#showAlienReply').val($.Options.getOption('showAlienReply', 'all'));
	    $('#showAlienReply').on('change', function () {
	        $.Options.setOption(this.id, this.value);
	    })
	}
	this.trendsFilter = function () {
	    var $all = $('[name="trendsFilterAll"]');
	    var $latin = $('[name="trendsFilterLat"]');
	    var $cyrillic = $('[name="trendsFilterCyr"]');
	    var $han = $('[name="trendsFilterHan"]');
	    var $custom = $('[name="trendsFilterCustom"]');

	    $('[name^="trendsFilter"]').each(function () {
	        $this = $(this);

	        if ($this.attr("type") === "checkbox") {
	        	$this.prop('checked', $.Options.getOption(this.name, false));
	        };
	        if ($this.attr("type") === "text") $this.val($.Options.getOption(this.name, ""));
	        if (this.name === 'trendsFilterAll' && $this.prop('checked') === true) {
				$latin.prop('disabled', true);
				$cyrillic.prop('disabled', true);
				$han.prop('disabled', true);
				$custom.prop('disabled', true);
			};
	    })

		$all.on('click', function () {
		    $.Options.setOption(this.name, this.checked);
		    $latin.prop('disabled', this.checked);
			$cyrillic.prop('disabled', this.checked);
			$han.prop('disabled', this.checked);
			$custom.prop('disabled', this.checked);
		});
		$latin.on('click', function () {
		    $.Options.setOption(this.name, this.checked);
		});
		$cyrillic.on('click', function () {
		    $.Options.setOption(this.name, this.checked);
		});
		$han.on('click', function () {
		    $.Options.setOption(this.name, this.checked);
		});
		$custom.on('keyup', function () {
		    $.Options.setOption(this.name, this.value);
		});
		$custom.on('blur', function () {
		    var oldArr = $.Options.getOption(this.name, '').split(',');
		    var newArr = [];
		    oldArr.forEach(function (element, index, array) {
		        var tempElem = $.trim(element);
		        tempElem = tempElem[0] === '#' ? tempElem.slice(1) : tempElem;
		        newArr.push(tempElem);
		    });
		    $.Options.setOption(this.name, newArr.join(','));
		    $custom.val(newArr.join(','));
		})

	}
	this.initOptions = function() {
		this.soundNotifOptions();
		this.volumeControl();
		this.keysSend();
		this.locLang();
		this.showPreviewOpt();
		this.imgPreviwProxy();
		this.showAlienReply();
		this.trendsFilter();
	}

}

jQuery.Options = new TwisterOptions;