var Response = {

	/**
	 * Create response tag depending
	 * on the form that is being submitted
	 * @param  target - the form being submitted
	 * @param  submitBtn
	 * @param response elem
	 */
	createTag : function(submitBtn) {
		submitBtn
			.val('WAIT')
			.attr('disabled', 'disabled')
			.addClass('disabled');
	},

	/**
	 * Show success message
	 * @param  submitBtn
	 */
	showSuccess : function(submitBtn) {
		submitBtn
			.val('SENT')
			.removeAttr('disabled')
			.removeClass('disabled')
			.addClass('success');
		setTimeout(function() {
			submitBtn
				.val('SEND')
				.removeClass('success');
		}, 2500);
	},

	/**
	 * Show error message
	 * @param  submitBtn
	 */
	showError : function(submitBtn) {
		submitBtn
			.val('SEND')
			.removeAttr('disabled')
			.removeClass('disabled');
	}
};



var Forms = {

	init : function() {
		$('form.ajax input[type="submit"]').on('click', this.validate);
		$('form.ajax').on('submit', this.submitForm);
	},


	validate : function(e) {
		e.preventDefault();
		var form = $(e.target).closest($('form'));

		if (form.checkValidity())
		{
			form.submit();
		}
	},


	submitForm : function(e) {
		e.preventDefault();

		var submitBtn = $(this).find('input[type=submit]');
		var response = $("<span />").addClass("response");

		Response.createTag(submitBtn);
	
		$.ajax({
			url : $(this).attr('action'),
			type : $(this).attr('method'),
			dataType : 'json',
			data : $(this).serialize(),
		})
		.done( function(data) 
		{
			var form = submitBtn.closest('form');

			if (data.success) 
			{
				Response.showSuccess(submitBtn);
				setTimeout(function() {
					$(".schedule-visit-holder.show").removeClass('show');
				}, 1500);
			} 
			else 
			{
				Response.showError(submitBtn);
			}
		});

		return false;
	},


};

$(document).ready(function() {
	if (typeof $.webshim !== "undefined") {
		$.webshim.setOptions("forms", {
			lazyCustomMessages: false,
			replaceValidationUI: true,
			customDatalist: "auto",
			list: {
				"filter": "^"
			}
		});
		$.webshim.polyfill('forms');
	}

	Forms.init();
});