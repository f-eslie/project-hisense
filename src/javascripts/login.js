class Login {
    constructor() {
        this.form1 = $('.input-group');
        this.inputs = $('.input-group input');
        this.phonelock = true;
        this.pswlock = true;
    }
    init() {
        let _this = this;
        this.inputs.on('focus', function () {
            // 0.父元素
            let parEle = $(this).parent('.input-group')
            // 1.提示文字上移
            $(this).prev('.input-info').animate({
                'top': '-20px',
                'font-size': '12px'
            }, 500);

            // 2.下方提示文字显示
            $(this).next('.input-tip').show();

            // 3.获得焦点错误信息隐藏
            parEle.find('.input-error').hide();
        })

        // input框失去焦点
        this.inputs.on('blur', function () {
            // 0.父元素
            let parEle = $(this).parent('.input-group')

            // 1.如果input框内没有文字，提示文字复原
            if ($(this).val() === '') {
                $(this).prev('.input-info').animate({
                    'top': '0px',
                    'font-size': '16px'
                }, 500);
            }

            // 2.下方提示文字隐藏
            $(this).next('.input-tip').hide();

            // 3。用户名验证
            if ($(this).hasClass('phone-input')) {
                if (!(_this.data)) {
                    // ajax请求
                    $.ajax({
                        url: 'http://10.31.152.29/project-hisense/php/getpsw.php',
                        type: 'post',
                        dataType: 'json',
                        data: {
                            phone: _this.inputs.eq(0).val()
                        }
                    }).done((data) => {
                        _this.data = data;
                        _this.userName(parEle);
                    })
                }else{
                    _this.userName(parEle);
                }
            }

            // 4.密码验证
            if ($(this).hasClass('psw-input')) {
                if ($(this).val() !== '') {
                    if ($(this).val() === _this.psw) {
                        // 错误提示隐藏
                        parEle.find('.input-error').hide();

                        _this.pswlock = true;
                        parEle.find('.input-error').show().find('span').html('✔').css('color', 'rgba(0, 128, 0, 0.623)');
                    } else {
                        // 错误提示显示
                        parEle.find('.input-error').show().find('span').html('密码错误').css('color', '#F26522');

                        _this.pswlock = false;
                    }
                } else {
                    // 错误提示显示
                    parEle.find('.input-error').show().find('span').html('密码不能为空').css('color', '#F26522');

                    _this.pswlock = false;
                }
            }
        })

        // 注册
        this.clickLogin();
    }

    //立即登录
    clickLogin() {
        $('.login-btn').on('click', () => {
            if (this.inputs.eq(0).val() === '') {

                this.phonelock = false;
            }
            if (this.inputs.eq(1).val() === '') {
                this.pswlock = false;
            }
            if (this.pswlock && this.phonelock) {
                this.inputs.val('');
                this.saveUserName()
                location = 'http://localhost/project-hisense/dist/index.html';
            }
        })
    }

    // 将用户信息存储到本地存储
    saveUserName() {
        if (this.username) {
            localStorage.setItem('userName', this.username)
        }
    }
    // 判断用户名是否存在
    hasUsername(username) {
        this.flag = false;
        $.each(this.data, (index, value) => {
            if (value.phone == username) {
                this.flag = true;
                this.psw = value.psw
            }
        })
    }


    // 判断用户名正则
    userName(parEle) {
        if (this.inputs.eq(0).val() !== '') {
            if (/^1[3|5|7]\d{9}$/g.test(this.inputs.eq(0).val())) {
                this.hasUsername(this.inputs.eq(0).val());
                if (this.flag) {
                    this.username = this.inputs.eq(0).val();
                    // 错误提示隐藏
                    parEle.find('.input-tip').hide();

                    this.phonelock = true;
                    parEle.find('.input-error').show().find('span').html('✔').css('color', 'rgba(0, 128, 0, 0.623)');


                } else {
                    console.log(3333333)
                    // 错误提示显示
                    parEle.find('.input-error').show().find('span').html('该用户不存在').css('color', '#F26522');

                    this.phonelock = false;

                }

            } else {
                // 错误提示显示
                parEle.find('.input-error').show().find('span').html('请输入正确的手机号或用户名').css('color', '#F26522');

                this.phonelock = false;
            }
        } else {
            // 错误提示显示
            parEle.find('.input-error').show().find('span').html('手机号/用户名不可为空').css('color', '#F26522');

            this.phonelock = false;
        }
    }
}

export {
    Login
}