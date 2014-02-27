$(function(){
	$('.post-text').on('click', 'a', function(e){
		e.stopPropagation();
	});

	$(".cancel").on('click', function(e){
		if($(".modal-content").attr("style") != undefined){$(".modal-content").removeAttr("style")};
		
})
})