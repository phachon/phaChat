/**
 * 表单提交类
 * Copyright (c) 2016 phachon@163.com
 */
var Form = {

	failedBox : '#failedBox',

	inPopup : false,

	ajaxSubmit: function (element, inPopup) {
		
		if(inPopup) {
			Form.inPopup = true;
		}

		//成功弹出信息
		function success(text, data) {
			var timer = 2000;
			swal({
				'title' : '操作成功',
				'text' : "<h4>"+text+"</h4>",
				'html' : true,
				'type' : 'success',
				'showConfirmButton' : false,
				'timer' : timer,
				'location' : null
			});
		}

		//错误弹出信息
		function error(text, data) {
			var timer = 2000;
			swal({
				'title' : '操作失败',
				'text' : "<h4>"+text+"</h4>",
				'html' : true,
				'type' : 'error',
				'showConfirmButton' : false,
				'timer' : timer
			});
		}

		//警告弹出信息
		function warning(text, data) {
			var timer = 2000;
			swal({
				'title' : '警告',
				'text' : "<h4>"+text+"</h4>",
				'html' : true,
				'type' : 'warning',
				'showConfirmButton' : false,
				'timer' : timer
			});
		}

		//弹出信息
		function response(result) {
			if(result.code == 0) {
				error(result.message, result.data);
			}
			if(result.code == 1) {
				success(result.message, result.data);
			}
			if(result.code == 2) {
				error(result.message, result.data);
			}
			//如果设置了跳转
			if(result.redirect) {
				setTimeout(function() {
					if(Form.inPopup) {
						parent.location.href = result.redirect;
					} else {
						location.href = result.redirect;
					}
				}, 3000);
				//重新刷新
				setTimeout(function() {
					if(Form.inPopup) {
						parent.location.reload();
					} else {
						location.reload();
					}
				}, 3000);
			}
		}

		var options = {
			dataType: 'json',
			success: response
		};

		$(element).ajaxSubmit(options);

		return false;
	}
}