var Lightbox = {
	init : function() {
		$('.lightbox-link').on('click', this.openLightbox); 
		$(".lightbox #close img, .lightbox #close").on('click', this.closeLightbox);
	},

	openLightbox : function(e) {
		e.preventDefault();
		$('.lightbox').addClass('show');
	},

	closeLightbox : function(e) {
		e.preventDefault();
		$(".lightbox").removeClass('show');
	}
};

$(document).on('ready', function() {
	Lightbox.init();
});