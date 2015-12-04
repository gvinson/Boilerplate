/**
 * The lightbox functionality in this code requires a few things 
 * to be in the dom.
 * 
 * - Element with class of lightbox
 * - Elements with lightbox-link class to trigger opening a lightbox
 * 		- This element requires a data-id to denote what lightbox
 * 	 	- we want to open. 
 * - Element within the .lightbox element with class of close
 * - Element that holds lightbox content with class of lightbox-wrapper
 */

var Lightbox = {
	
	close : $('.lightbox .close'),
	links : $('.lightbox-link'),
	box : $('.lightbox'),
	wrapper : $('.lightbox-wrapper'),

	init : function() {
		Lightbox.links.on('click', this.openLightbox); 
		Lightbox.close.on('click', this.closeLightbox);
	},

	openLightbox : function(e) {
		e.preventDefault(); 
		var box = $(this).attr('data-id');
		Lightbox.box.addClass('show');
		$('#' + box).addClass('show');
	},

	closeLightbox : function(e) {
		e.preventDefault();
		Lightbox.box.removeClass('show');
		Lightbox.wrapper.removeClass('show');
	}
};

$(document).on('ready', function() {
	Lightbox.init();
});