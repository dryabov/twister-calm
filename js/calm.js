$(function(){
	$('.post-text, #descWrap').on('click', 'a', function(e){e.stopPropagation();});
	$('#showqr').on('click', function(){
		if($('#qrcode img')[0]) return;
         var skey = document.getElementById('skey').innerText;
         new QRCode(document.getElementById("qrcode"), skey);
    });
    $('.tox-ctc').on('click', function(){
    	window.prompt('Press Ctrl/Cmd+C to copy then Enter to close', $(this).attr('data'))
    })
    $('.bitmessage-ctc').on('click', function(){
    	window.prompt('Press Ctrl/Cmd+C to copy then Enter to close', $(this).attr('data'))
    })

})

function dhtIndicatorBg(){
	var bgcolor = '';
		  if(twisterDhtNodes <= 20){bgcolor = '#770900'
	}else if(twisterDhtNodes <= 60){bgcolor = '#773400'
	}else if(twisterDhtNodes <= 90){bgcolor = '#774c00'
	}else if(twisterDhtNodes <= 120){bgcolor = '#776400'
	}else if(twisterDhtNodes <= 150){bgcolor = '#707500'
	}else if(twisterDhtNodes <= 180){bgcolor = '#3f6900'
	}else if(twisterDhtNodes <= 210){bgcolor = '#005f15'
	}else if(twisterDhtNodes >= 250){bgcolor = '#009922'
	}
	$('.userMenu-dhtindicator').animate({'background-color': bgcolor });
};
setTimeout(dhtIndicatorBg, 300);
setTimeout(function() {setInterval(dhtIndicatorBg, 2000)}, 400);

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
}

function changeStyle() {
	var style, profile, menu;
	if(localStorage['theme'] == 'original')
	{
		style = 'css/orange/style.css';
		profile = 'css/orange/profile.css';
		menu = '.original_menu';
		$(".userMenu-dhtindicator").hide();
	}else 
	{
		style = 'css/style.css';
		profile = 'css/profile.css';
		menu = '.calm_menu';
	}
	$('#stylecss').attr('href', style);
	$('#profilecss').attr('href', profile);
	setTimeout(function(){$(menu).removeAttr('style')}, 0);
}
function getJSONToLocalStorage (t) {
	var ytRegExp = /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?/i;
	var vimeoRegExp = /http:\/\/(www\.)?vimeo.com\/(\d+)(\/)?/i;

	if (ytRegExp.test(t.value)){
		var ytid = t.value.match(ytRegExp) ? RegExp.$1 : false;
		var ytDataStorage = localStorage['ytData'] ? JSON.parse(localStorage['ytData']) : {};
		$.ajax({
            url: "http://gdata.youtube.com/feeds/api/videos/"+ytid+"?v=2&alt=jsonc",
            dataType: 'jsonp',
            success: function(data) {
                ytDataStorage[ytid] = {
                    title: data.data.title,
                    description: data.data.description.substring(0, 400),
                    thumbnail: data.data.thumbnail.hqDefault,
                    link: 'http://youtu.be/'+ytid
                };
                localStorage['ytData'] = JSON.stringify(ytDataStorage);
            }
        });
	}else if(vimeoRegExp.test(t.value)) {
		var vimid = t.value.match(vimeoRegExp) ? RegExp.$2 : false;
		var vimDataStorage = localStorage['vimData'] ? JSON.parse(localStorage['vimData']) : {};

		$.ajax({
            url: "http://vimeo.com/api/v2/video/"+vimid+".json",
            dataType: 'json',
            success: function(data) {
            	console.log(data);
                vimDataStorage[vimid] = {
                    title: data[0].title,
                    description: data[0].description.substring(0, 400),
                    thumbnail: data[0].thumbnail_large,
                    link: data[0].url,
                    time: Date.now()
                };
                localStorage['vimData'] = JSON.stringify(vimDataStorage);
            }
        });
	}
	
}

function homeIntInit () {
	modalDMIntr ();
	$('textarea').on('click', function() {mensAutocomplete(this)});
	$('textarea').on('keyup', function() {
		getJSONToLocalStorage(this)
	})
}