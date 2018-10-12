var AppReady = {
	className : 'AppReady',
}

/**
 * 预处理JavaScript,为页面添加menu,header,footer等
 */
$(document).ready(function() {
	$.get(AppBase.attr.webUrl + '/pages/common/app-header.html', function(data) {
		$('#app-header-container-id').html(data);
		$('.navbar-minimalize').click(function() {
			$("body").toggleClass("mini-navbar");
			SmoothlyMenu();
		})
	});
	$.get(AppBase.attr.webUrl + '/pages/common/app-footer.html', function(data) {
		$('#app-footer-container-id').html(data);
	});
	$.get(AppBase.attr.webUrl + '/pages/common/app-menu.html', function(data) {
		$('#app-menu-container-id').html(data);
		$(".cls-page-reload").click(function() {
			var loadUrl = $(this).attr("data-load-uri");
			if (!loadUrl) {
				return;
			}
			AppBase.base.loadPage(loadUrl);
		});
		// 当前浏览器的URL，无参数
		var currUrl = window.location.pathname;
		if (AppBase.attr.webContextPath.length > 0) {
			currUrl = currUrl.substring(AppBase.attr.webContextPath.length + 1);
		}
		// 获取浏览器的URL的参数
		var pgCode = AppBase.base.getBrowserParam('pgCode');
		// 如果存在，说明该URL为子URL，需要显示高亮到父URL上
		if (pgCode && pgCode.length > 0) {
			currUrl = AppConfig.config.getPgUrl(pgCode);
		}
		var lvPath = $("#app-side-menu").find('a[data-load-uri="' + currUrl + '"]').parent().attr('data-app-menu-path');
		if (lvPath) {
			while (lvPath.length >= 4) {
				$('li[data-app-menu-path="' + lvPath + '"]').addClass('active');
				lvPath = lvPath.substring(0, lvPath.length - 2);
			}
		}
		$('#app-side-menu').metisMenu();
	});

	// Collapse ibox function
	$('.collapse-link').click(function() {
		var ibox = $(this).closest('div.ibox');
		var button = $(this).find('i');
		var content = ibox.find('div.ibox-content');
		content.slideToggle(200);
		button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
		ibox.toggleClass('').toggleClass('border-bottom');
		setTimeout(function() {
			ibox.resize();
			ibox.find('[id^=map-]').resize();
		}, 50);
	});

	// Small todo handler
	$('.check-link').click(function() {
		var button = $(this).find('i');
		var label = $(this).next('span');
		button.toggleClass('fa-check-square').toggleClass('fa-square-o');
		label.toggleClass('todo-completed');
		return false;
	});

	// Move modal to body
	// Fix Bootstrap backdrop issu with animation.css
	$('.modal').appendTo("body")

	fix_height();

	$(window).bind("load resize", function() {
		if ($(this).width() < 769) {
			$('body').addClass('body-small')
		} else {
			$('body').removeClass('body-small')
		}
	})

	$(window).bind("load resize click scroll", function() {
		if (!$("body").hasClass('body-small')) {
			fix_height();
		}
	})

});

// For demo purpose - animation css script
function animationHover(element, animation) {
	element = $(element);
	element.hover(function() {
		element.addClass('animated ' + animation);
	}, function() {
		// wait for animation to finish before removing classes
		window.setTimeout(function() {
			element.removeClass('animated ' + animation);
		}, 2000);
	});
}

function fix_height() {
	var heightWithoutNavbar = $("body > #wrapper").height() - 61;
	$(".sidebard-panel").css("min-height", heightWithoutNavbar + "px");
	var windowWidth = $(window).height();
	$("#page-wrapper").css("min-height", windowWidth + 'px');
}
function SmoothlyMenu() {
	if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
		// Hide menu in order to smoothly turn on when maximize menu
		$('#side-menu').hide();
		// For smoothly turn on menu
		setTimeout(function() {
			$('#side-menu').fadeIn(500);
		}, 100);
	} else if ($('body').hasClass('fixed-sidebar')) {
		$('#side-menu').hide();
		setTimeout(function() {
			$('#side-menu').fadeIn(500);
		}, 300);
	} else {
		// Remove all inline style from jquery fadeIn function to reset menu
		// state
		$('#side-menu').removeAttr('style');
	}
}

// Dragable panels
function WinMove() {
	var element = "[class*=col]";
	var handle = ".ibox-title";
	var connect = "[class*=col]";
	$(element).sortable({
		handle : handle,
		connectWith : connect,
		tolerance : 'pointer',
		forcePlaceholderSize : true,
		opacity : 0.8
	}).disableSelection();
};
