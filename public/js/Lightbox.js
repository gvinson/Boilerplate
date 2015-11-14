var Lightbox = {
	
	close : $('.lightbox #close'),

	init : function() {
		$('.lightbox-link').on('click', this.openLightbox); 
		$(".lightbox #close").on('click', this.closeLightbox);
	},

	openLightbox : function(e) {
		e.preventDefault();
		var box = $(this).attr('data-id');
		$('.lightbox').addClass('show');
		$('#' + box).addClass('show');
	},

	closeLightbox : function(e) {
		e.preventDefault();
		$(".lightbox, .lightbox-wrapper").removeClass('show');
	}
};

$(document).on('ready', function() {
	Lightbox.init();
});