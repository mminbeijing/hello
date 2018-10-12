var AppBase = {
	name : 'AppBase',
	version : 'V1.0',
	attr : {
		webUrl : 'http://127.0.0.1:8080/testframe',
		webContextPath : 'testframe',
		serverUrl : 'http://127.0.0.1:8080/testframe',
		loginUrl : '/login.html',
		indexUrl : '/index.html'
	},
	base : {
		/**
		 * 跳转首页页面
		 */
		gotoIndexPage : function() {
			AppBase.base.loadPage(AppBase.attr.indexUrl);
		},
		/**
		 * 跳转登陆页面
		 */
		logout : function() {
			AppBase.base.loadPage(AppBase.attr.loginUrl);
		},
		/**
		 * 加载localUrl页面
		 */
		loadPage : function(localUrl) {
			window.location.href = AppBase.attr.webUrl + localUrl;
		},
		/**
		 * 重新加载当前页面
		 */
		reloadPage : function() {
			window.location.href = window.location.href;
		},
		/**
		 * 弹框加载localUrl页面
		 */
		openPage : function(localUrl) {
			window.open(AppBase.attr.webUrl + localUrl);
		},
		/**
		 * 根据给定的URL(url)来获取数据并填充到给定的选择器(selector)匹配的元素中
		 * 
		 * @param url
		 *            用于获取数据的URL
		 * @param selector
		 *            用于填充数据的元素的selector
		 * @param params
		 *            序列化之后的参数结果集
		 * @param callback
		 *            回调函数,和原生的jquery的使用方法一样
		 * @returns {void} 无返回值
		 */
		getBrowserParam : function(lvParamName) {
			var reg = new RegExp("(^|&)" + lvParamName + "=([^&]*)(&|$)");
			var result = window.location.search.substr(1).match(reg);
			if (result != null) {
				return decodeURI(result[2]);
			}
			return '';
		}
	},
	/**
	 * 对于jquery原生的ajax方法进行进一步封装,最主要的用意在于,这样可以使用统一的数据获取根URL:AppBase.attr.serverUrl
	 */
	ajax : {
		/**
		 * 初始化ajax请求header信息, 请求时携带token信息, 并说明需要的返回的数据类型为json
		 */
		initHeader : function() {
			$.ajaxSetup({
				async : false,
				headers : {
					// 'x-access-token' : AppBase.base.getToken(),
					'Accept' : 'application/json'
				}
			});
		},
		/**
		 * 包装了jquery的ajax的get方法，用于获取数据
		 * 
		 * @param url
		 *            用于提交请求的url地址,参考javadoc
		 * @param params
		 *            序列化之后的参数结果集
		 * @param callback
		 *            回调函数,和原生的jquery的使用方法一样
		 * @returns {void} 无返回值
		 */
		uploadAjax : function(lvUrl, lvFormObj, successCallback, errorCallback) {
			AppBase.ajax.initHeader();
			var formData = new FormData(lvFormObj[0]);
			$.ajax({
				url : AppBase.attr.serverUrl + lvUrl,
				type : 'POST',
				data : formData,
				async : false,
				cache : false,
				contentType : false,
				processData : false,
				success : function(result) {
					AppBase.ajax.ajaxCallback(result, successCallback,
							errorCallback);
				}
			});
		},
		/**
		 * 包装了jquery的ajax的get方法，用于获取数据
		 * 
		 * @param url
		 *            用于提交请求的url地址,参考javadoc
		 * @param params
		 *            序列化之后的参数结果集
		 * @param callback
		 *            回调函数,和原生的jquery的使用方法一样
		 * @returns {void} 无返回值
		 */
		get : function(localUrl, params, successCallback, errorCallback) {
			AppBase.ajax.initHeader();
			$.get(AppBase.attr.serverUrl + localUrl, params, function(result) {
				AppBase.ajax.ajaxCallback(result, successCallback,
						errorCallback);
			});
		},
		/**
		 * 包装了jquery的ajax的post方法，用于提交数据
		 * 
		 * @param url
		 *            用于提交请求的url地址,参考javadoc
		 * @param params
		 *            序列化之后的参数结果集
		 * @param successCallback
		 *            回调函数,和原生的jquery的使用方法一样
		 * @returns {void} 无返回值
		 */
		post : function(localUrl, params, successCallback, errorCallback) {
			AppBase.ajax.initHeader();
			$.post(AppBase.attr.serverUrl + localUrl, params, function(result) {
				AppBase.ajax.ajaxCallback(result, successCallback,
						errorCallback);
			});
		},
		/**
		 * 包装了jquery的ajax的post方法，用于提交数据
		 * 
		 * @param url
		 *            用于提交请求的url地址,参考javadoc
		 * @param params
		 *            序列化之后的参数结果集
		 * @param successCallback
		 *            回调函数,和原生的jquery的使用方法一样
		 * @returns {void} 无返回值
		 */
		postDelete : function(localUrl, params, successCallback, errorCallback) {
			if (!confirm('确定要删除吗？')) {
				return;
			}
			AppBase.ajax.initHeader();
			$.post(AppBase.attr.serverUrl + localUrl, params, function(result) {
				AppBase.ajax.ajaxCallback(result, successCallback,
						errorCallback);
			});
		},
		/**
		 * 包装了jquery的ajax的post方法，用于提交表单数据， 此处对表单进行了自动的序列化,
		 * 注意:首先需要获得表单jquery对象，然后再传入
		 * 
		 * @param url
		 *            用于提交请求的url地址,参考javadoc
		 * @param lvFormObj
		 *            需要提交的表单jquery对象
		 * @param successCallback
		 *            回调函数,和原生的jquery的使用方法一样
		 * @returns {void} 无返回值
		 */
		submitForm : function(localUrl, lvFormObj, successCallback,
				errorCallback) {
			if (!AppValidator.canSubmit(lvFormObj)) {
				return;
			}
			AppBase.ajax.initHeader();
			$.post(AppBase.attr.serverUrl + localUrl, lvFormObj.serialize(),
					function(result) {
						AppBase.ajax.ajaxCallback(result, successCallback,
								errorCallback);
					});
		},
		/**
		 * 包装了jquery的ajax的post方法，用于提交数据
		 * 
		 * @param url
		 *            用于提交请求的url地址,参考javadoc
		 * @param params
		 *            序列化之后的参数结果集
		 * @param successCallback
		 *            回调函数,和原生的jquery的使用方法一样
		 * @returns {void} 无返回值
		 */
		download : function(localUrl, params) {
			// var lvUrl = AppBase.attr.serverUrl + localUrl +
			// "?x-access-token=" + AppBase.base.getToken();
			if (params) {
				for ( var index in params) {
					lvUrl += "&" + index + "=" + params[index];
				}
			}
			window.open(lvUrl);
		},
		/**
		 * 用户在执行回调前进行异常捕获的回调函数
		 * 
		 * @param result
		 * @param successCallback
		 */
		ajaxCallback : function(result, successCallback, errorCallback) {
			// 检查登陆
			if (!AppBase.base.checkLogin(result)) {
				return;
			}
			// 成功
			if (result.success) {
				if (successCallback) {
					successCallback(result);
				}
				return;
			}
			// 失败，如果有错误回调函数，调用者处理错误信息的显示
			if (errorCallback) {
				errorCallback(result);
				return;
			}
			// 失败，如果没有错误回调函数，并且有错误信息，显示错误信息
			if (result.msg && result.msg.length > 0) {
				AppMsg.msg.error(result.msg);
			} else if (!result.success && result.message) {
				AppMsg.msg.error(result.message);
			}
		}
	}
};
