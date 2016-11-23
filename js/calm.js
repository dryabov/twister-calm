$(function(){
	$('.post-text, #descWrap').on('click', 'a', function(e){e.stopPropagation();});

	$('#showqr').on('click', function(){
		if($('#qrcode img')[0]) {
			$('#qrcode').empty();
			return;
		};
         var skey = document.getElementById('skey').innerText;
         new QRCode(document.getElementById("qrcode"), skey);
    });

    $('.tox-ctc').on('click', function(){
    	window.prompt('Press Ctrl/Cmd+C to copy then Enter to close', $(this).attr('data'))
    });
    $('.bitmessage-ctc').on('click', function(){
    	window.prompt('Press Ctrl/Cmd+C to copy then Enter to close', $(this).attr('data'))
    });
})

function dhtIndicator(){
	requestNetInfo(function () {
		var bgcolor = '';
		if(twisterDhtNodes == 0){bgcolor = '#000'
		}else if(twisterDhtNodes <= 20){bgcolor = '#770900'
		}else if(twisterDhtNodes <= 60){bgcolor = '#773400'
		}else if(twisterDhtNodes <= 90){bgcolor = '#774c00'
		}else if(twisterDhtNodes <= 120){bgcolor = '#776400'
		}else if(twisterDhtNodes <= 150){bgcolor = '#707500'
		}else if(twisterDhtNodes <= 180){bgcolor = '#3f6900'
		}else if(twisterDhtNodes <= 210){bgcolor = '#005f15'
		}else if(twisterDhtNodes >= 211){bgcolor = '#009922'
		}
		$(".userMenu-dhtindicator a").text(twisterDhtNodes);
		$('.userMenu-dhtindicator').animate({'background-color': bgcolor });
	});
};

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

function mensAutocomplete(t) {
	var suggests = [];

	for (var i = 0; i < followingUsers.length; i++){
		if(followingUsers[i] == localStorage.defaultScreenName) continue;
		suggests.unshift("@"+followingUsers[i]);
	}
	$(t).asuggest(suggests, {
		'minChunkSize': 2
	});
};

var mediaPreviewContainer = function () {
    var opt = $.Options.getOption('previewSize', 'short');
    $('.preview-container').css('height', opt === 'short' ? '100px' : '100%');
};

function homeIntInit () {
	modalDMIntr ();
	$('textarea').on('click', function() {mensAutocomplete(this)});
	mediaPreviewContainer();
	dhtIndicator();
	setInterval(dhtIndicator, 2000);
};
function followingIntInit() {
	modalDMIntr ();
	$('textarea').on('click', function() {mensAutocomplete(this)});
	mediaPreviewContainer();
};
