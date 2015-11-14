var MobileMenu = {

	// make reference for all nav elements you
	// want in the mobile nav
	nav: $('.main-nav').clone(),
	hamburger: $("#hamburger"),
	mobileNav: $("#mobile-nav"),
	mobileNavWrapper: $('#mobile-nav-wrapper'),
	showing: false,

	init : function() {
		// List all functions wanted to execute first
		MobileMenu.injectNav();
	},

	injectNav : function() {
		// Prepend your nav elements to the mobile-nav-wrapper
		MobileMenu.mobileNavWrapper.prepend(MobileMenu.nav);
		MobileMenu.setEventListeners();
	},

	setEventListeners : function() {
		MobileMenu.hamburger.on('click touchstart', this.showMenu);
	},

	showMenu : function(e) {
		e.preventDefault();
		if (!MobileMenu.showing) {
			MobileMenu.hamburger.addClass('open');
			MobileMenu.mobileNav.addClass('open');
			MobileMenu.showing = true;
		}
		else {
			MobileMenu.hamburger.removeClass('open');
			MobileMenu.mobileNav.removeClass('open');
			setTimeout(function() {
				//MobileMenu.mobileNav.empty();
				MobileMenu.showing = false;
			}, 255);
		}
	},
};

$(document).on('ready', function() {
	MobileMenu.init();
});