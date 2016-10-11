/**
 * 登录
 * Copyright (c) 2016 phachon@163.com
 */
var Login = {

	ajaxSubmit : function(element) {

		var username = $('input[name="username"]').val();
		var password = $('input[name="password"]').val();
		if(username == '' || password == '') {
			return false;
		}

		function success(message, data) {
			$("#failedMessage").hide();
			$("#failedMessage span").html('');
			$('#successModal').modal('show')
		}
		function failed(errors) {
			$("#failedMessage").show();
			$("#failedMessage span").html(errors);
		}

		function response(result) {

			if(result.code == 0) {
				failed(result.message, result.data);
			}
			if(result.code == 1) {
				success(result.message, result.data);
			}
		}

		var options = {
			dataType: 'json',
			success: response
		};

		$(element).ajaxSubmit(options);
	}
}