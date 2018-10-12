/**
 * 系统资源
 */
var Pg0001 = {
	className : 'Pg0001',
	/**
	 * 一些常规属性集合
	 */
	attr : {
		rememberMeKey : 'AppBase.user.login.rememberMeKey',
		usernameKey : 'AppBase.user.login.usernameKey',
		passwordKey : 'AppBase.user.login.passwordKey'
	},
	toWindowTop : function() {
		if (window != top) {
			top.location.href = location.href;
		}
	},
	/** 编辑Panel */
	formLogin : function() {
		return $('#formLogin');
	},
	/** 编辑转查看按钮 */
	inputUsername : function() {
		return $('#inputUsername');
	},
	/** 查看转编辑按钮 */
	inputPassword : function() {
		return $('#inputPassword');
	},
	/** 保存编辑表单 */
	inputRememberMe : function() {
		return $('#inputRememberMe');
	},
	/** 隐藏编辑Panel */
	btnSubmitFormLogin : function() {
		return $('#btnSubmitFormLogin');
	},
	/** 查找分页地址 */
	urlAppLogin : function() {
		return '/web/check_app_login_form';
	},
	/** ID查找地址 */
	urlIndexHtml : function() {
		return '/index.html';
	},
	/** ID查找地址 */
	getLocalStorage : function(lvKey) {
		return window.localStorage.getItem(lvKey);
	},
	setLocalStorage : function(lvKey, lvValue) {
		window.localStorage.setItem(lvKey, lvValue);
	}
}

$(document).ready(function() {
	Pg0001.inputUsername().focus();
	// 设值rememberMe
	if (Pg0001.getLocalStorage(Pg0001.attr.rememberMeKey) == 'checked') {
		Pg0001.inputRememberMe().attr('checked', true);
		Pg0001.inputUsername().val(Pg0001.getLocalStorage(Pg0001.attr.usernameKey));
		// TODO 存在安全问题
		Pg0001.inputPassword().val(Pg0001.getLocalStorage(Pg0001.attr.passwordKey));
	}
	// 改变账号清空密码
	Pg0001.inputUsername().bind('input propertychange', function() {
		Pg0001.inputPassword().val('');
	});

	// 点击登陆按钮
	Pg0001.btnSubmitFormLogin().click(function() {
		doLoginAjax();
	});
	// 使用回车键登陆
	Pg0001.inputUsername().keydown(function(e) {
		if (e.keyCode === 13) {
			doLoginAjax();
		}
	});
	Pg0001.inputPassword().keydown(function(e) {
		if (e.keyCode === 13) {
			doLoginAjax();
		}
	});
	Pg0001.inputRememberMe().keydown(function(e) {
		if (e.keyCode === 13) {
			doLoginAjax();
		}
	});
});

/**
 * 登录提交
 */
function doLoginAjax() {
	AppBase.ajax.submitForm(Pg0001.urlAppLogin(), Pg0001.formLogin(), function(json) {
		if (Pg0001.inputRememberMe().is(':checked')) {
			Pg0001.setLocalStorage(Pg0001.attr.rememberMeKey, 'checked');
			Pg0001.setLocalStorage(Pg0001.attr.usernameKey, Pg0001.inputUsername().val());
			Pg0001.setLocalStorage(Pg0001.attr.passwordKey, Pg0001.inputPassword().val());
		} else {
			Pg0001.setLocalStorage(Pg0001.attr.rememberMeKey, '');
			Pg0001.setLocalStorage(Pg0001.attr.usernameKey, '');
			Pg0001.setLocalStorage(Pg0001.attr.passwordKey, '');
		}
		AppBase.base.setToken(json.token);
		AppBase.base.gotoIndexPage();
	});
}
