$(function(){
	$('.post-text').on('click', 'a', function(e){
		e.stopPropagation();
	});
	$(".modal-blackout").on('click', function(){
		closeModal($(this));
		if($(".modal-content").attr("style") != undefined){$(".modal-content").removeAttr("style")}
	})
})