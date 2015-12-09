/**
 * MobileMenu required elements:
 * - element with class of main-nav
 * - a hamburger element, a div with id of hamburger
 * - a mobile nav element that will cover screen
 * - mobile nav wrapper that holds elements inside nav (allows scrolling with css)
 */

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
		MobileMenu.hamburger.on('click touchend', this.showMenu);
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
				MobileMenu.showing = false;
			}, 255);
		}
	},
};

$(document).on('ready', MobileMenu.init());