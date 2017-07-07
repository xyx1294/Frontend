jQuery(document).ready(function($){
	var $form_modal = $('.cd-user-modal'),
		$form_login = $form_modal.find('#cd-login'),
		$form_signup = $form_modal.find('#cd-signup'),
		$form_forgot_password = $form_modal.find('#cd-reset-password'),
		$form_modal_tab = $('.cd-switcher'),
		$tab_login = $form_modal_tab.children('li').eq(0).children('a'),
		$tab_signup = $form_modal_tab.children('li').eq(1).children('a'),
		//$forgot_password_link = $form_login.find('.cd-form-bottom-message a'),
		//$back_to_login_link = $form_forgot_password.find('.cd-form-bottom-message a'),
		$main_nav = $('.login');

    //open modal 打开模式
	$main_nav.on('click', function(event){
	    if (!$.cookie("username") || $.cookie("username") == "null") {
	        if ($(event.target).is($main_nav)) {
	            // on mobile open the submenu
	            $(this).children('ul').toggleClass('is-visible');
	        } else {
	            // on mobile close submenu
	            $main_nav.children('ul').removeClass('is-visible');
	            //show modal layer
	            $form_modal.addClass('is-visible');
	            //show the selected form
	            ($(event.target).is('.cd-signup')) ? signup_selected() : login_selected();
	        }
	    }
	});

	//close modal
	$('.cd-user-modal').on('click', function(event){
		if( $(event.target).is($form_modal) || $(event.target).is('.cd-close-form') ) {
			$form_modal.removeClass('is-visible');
		}	
	});
	//close modal when clicking the esc keyboard button 按下ESC关闭窗口
	$(document).keyup(function(event){
    	if(event.which=='27'){
    		$form_modal.removeClass('is-visible');
	    }
    });

    //switch from a tab to another 从标签切换到另一个
	$form_modal_tab.on('click', function(event) {
		event.preventDefault();
		( $(event.target).is( $tab_login ) ) ? login_selected() : signup_selected();
	});

	//hide or show password
	$('.hide-password').on('click', function(){
		var $this= $(this),
			$password_field = $this.prev('input');
		
		( 'password' == $password_field.attr('type') ) ? $password_field.attr('type', 'text') : $password_field.attr('type', 'password');
		( 'Hide' == $this.text() ) ? $this.text('Show') : $this.text('Hide');
		//focus and move cursor to the end of input field
		$password_field.putCursorAtEnd();
	});

	//show forgot-password form 显示忘记密码界面
	//$forgot_password_link.on('click', function(event){
	//	event.preventDefault();
	//	forgot_password_selected();
	//});

	//back to login from the forgot-password form 回到登录界面
	//$back_to_login_link.on('click', function(event){
	//	event.preventDefault();
	//	login_selected();
	//});

	function login_selected(){
		$form_login.addClass('is-selected');
		$form_signup.removeClass('is-selected');
		$form_forgot_password.removeClass('is-selected');
		$tab_login.addClass('selected');
		$tab_signup.removeClass('selected');
	}

	function signup_selected(){
		$form_login.removeClass('is-selected');
		$form_signup.addClass('is-selected');
		$form_forgot_password.removeClass('is-selected');
		$tab_login.removeClass('selected');
		$tab_signup.addClass('selected');
	}

	function forgot_password_selected(){
		$form_login.removeClass('is-selected');
		$form_signup.removeClass('is-selected');
		$form_forgot_password.addClass('is-selected');
	}

    //REMOVE THIS - it's just to show error messages  删除错误消息(登录注册)
	$form_login.find('input[type="submit"]').on('click', function(event){
	    event.preventDefault();
	        $.ajax({
	            url: "Handler.ashx",
	            type: "POST",
	            data: { cmd: "userlogin", email: $("#signin-email").val(), "password": $("#signin-password").val() },
	            success: function (data) {
	                if (data != "error") {
	                    var json = eval(data);
	                    $.cookie("username", json[0]["username"], { expires: 1, path: '/' });
	                    layer.closeAll();
	                    $form_modal.removeClass('is-visible');
	                    $(".login").addClass("animated hinge");
	                    setTimeout(function () { $(".login").removeClass("animated hinge").html('<a href="user_index.aspx" target="_blank">' + json[0]["username"] + '</a>').addClass("animated bounceInDown").unbind("click").append('<a href="user_index.aspx"><img src="' + json[0]["touxiang"] + '" style="height:50px;width:50px;border-radius:100%;" /></a><p style="width:100%;text-align:center;color:#F97F05;display:none;cursor:pointer;">注销</p>'); zhuxiao(); }, 2000);
	                    layer.msg('欢迎回来,' + json[0]["username"] + "！");
	                }
	                else {
	                    layer.alert("帐号或密码错误！");
	                }
	            },
	            error:function(){
	                layer.alert("未知错误");
	            }
	        }
	              );
		//$form_login.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
	});
    //绑定注销
	function zhuxiao() {
	    $(".login p").click(function () {
	        $.post("Handler.ashx", { cmd: "clearuser" }, function (data) {
	            username = "";
	            $.cookie("username", null, { expires: 1, path: '/' });
	            history.go(0);
	        });
	    });
	    $(".login img").hover(function () {
	        $(".login p").slideDown();
	    }, function () {
	        setTimeout(function () { $(".login p").slideUp(); }, 3000);
	    });
	};
	$form_signup.find('input[type="submit"]').on('click', function (event) {
	    event.preventDefault();
	    if ($("#signup-username").val() =="" || $("#signup-email").val()=="" || $("#signup-password").val()=="")
	    {
	        layer.alert("请输入完整的注册信息");
	        return;
	    }
	    $.ajax({
	        url: "Handler.ashx",
	        type: "POST",
	        data: { cmd: "userreg", username: $("#signup-username").val(), email: $("#signup-email").val(), "password":$("#signup-password").val()},
	        success: function (data) {
	            if (data != "") {
	                layer.closeAll();
	                layer.alert("欢迎你，" + data + "已注册成功！");
	            }
	            else {
	                layer.alert("注册错误！");
	            }
	        },
	        error: function () {
	            layer.alert("未知错误！");
	        }
	    }
      );
		//$form_signup.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
	});


	//IE9 placeholder fallback
	//credits http://www.hagenburger.net/BLOG/HTML5-Input-Placeholder-Fix-With-jQuery.html
	if(!Modernizr.input.placeholder){
		$('[placeholder]').focus(function() {
			var input = $(this);
			if (input.val() == input.attr('placeholder')) {
				input.val('');
		  	}
		}).blur(function() {
		 	var input = $(this);
		  	if (input.val() == '' || input.val() == input.attr('placeholder')) {
				input.val(input.attr('placeholder'));
		  	}
		}).blur();
		$('[placeholder]').parents('form').submit(function() {
		  	$(this).find('[placeholder]').each(function() {
				var input = $(this);
				if (input.val() == input.attr('placeholder')) {
			 		input.val('');
				}
		  	})
		});
	}

});


//credits http://css-tricks.com/snippets/jquery/move-cursor-to-end-of-textarea-or-input/
jQuery.fn.putCursorAtEnd = function() {
	return this.each(function() {
    	// If this function exists...
    	if (this.setSelectionRange) {
      		// ... then use it (Doesn't work in IE)
      		// Double the length because Opera is inconsistent about whether a carriage return is one character or two. Sigh.
      		var len = $(this).val().length * 2;
      		this.setSelectionRange(len, len);
    	} else {
    		// ... otherwise replace the contents with itself
    		// (Doesn't work in Google Chrome)
      		$(this).val($(this).val());
    	}
	});
};