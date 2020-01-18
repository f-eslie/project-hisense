

class Register {
    constructor() {
        this.form1 = $('.register-form1');
        this.wrapboxs = $('.register-form .control-group');
        this.inputs = $('.register-form input');
        this.phonelock = true;
        this.codelock = true;
        this.pswlock1 = true;
        this.pswlock2 = true;
    }
    init() {
        // 刷新页面
        // location.reload();
        let _this = this;
        this.inputs.on('focus', function () {
            // 0.父元素
            let parEle = $(this).parent('.control-group')
            // 1.提示文字上移
            $(this).prev('.input-info').animate({
                'top': '-20px',
            }, 50, 'swing', () => {
                $(this).prev('.input-info').css('font-size', '12px')
            });

            // 2.下方提示文字显示
            $(this).next('.input-tip').show();

            // 3.获得焦点错误信息隐藏
            parEle.find('.note-icon').hide();
        })

        // input框失去焦点
        this.inputs.on('blur', function () {
            // 0.父元素
            let parEle = $(this).parent('.control-group')

            // 1.如果input框内没有文字，提示文字复原
            if ($(this).val() === '') {
                $(this).prev('.input-info').animate({
                    'top': '0px',
                }, 50, 'swing', () => {
                    $(this).prev('.input-info').css('font-size', '16px')
                });
            }

            // 2.下方提示文字隐藏
            $(this).next('.input-tip').hide();

            // 3。手机号码验证
            if ($(this).hasClass('phone-input')) {
                // ajax请求
                $.ajax({
                    url: 'http://10.31.152.29/project-hisense/php/savepsw.php',
                    type: 'post',
                    dataType: 'json',
                    data: {
                        phone: _this.inputs.eq(0).val()
                    }
                }).done((data) => {
                    if ($(this).val() !== '') {
                        if (data === 0) {
                            // 手机号未注册
                            if (/^1[3|5|7]\d{9}$/g.test($(this).val())) {
                                // 错误提示隐藏
                                parEle.find('.note-icon').hide();

                                _this.phonelock = true;
                                parEle.find('.note-icon').show().find('span').html('✔').css('color', 'rgba(0, 128, 0, 0.623)');
                            } else {
                                // 错误提示显示
                                parEle.find('.note-icon').show().find('span').html('手机号码格式不正确');

                                _this.phonelock = false;
                            }
                        } else {
                            // 错误提示显示
                            parEle.find('.note-icon').show().find('span').html('该手机号已注册');

                            _this.phonelock = false;
                        }
                    } else {
                        // 错误提示显示
                        parEle.find('.note-icon').show().find('span').html('手机号不可为空');

                        _this.phonelock = false;
                    }
                })
            }

            // 4.验证码验证
            if ($(this).hasClass('code-input')) {
                if ($(this).val() !== '') {
                    if ($(this).val() === $(this).next('.get-code').html()) {
                        // 错误提示隐藏
                        parEle.find('.note-icon').hide();

                        _this.codelock = true;
                        parEle.find('.note-icon').show().find('span').html('✔').css('color', 'rgba(0, 128, 0, 0.623)');
                    } else {
                        // 错误提示显示
                        parEle.find('.note-icon').show().find('span').html('验证码不正确');

                        _this.codelock = false;
                    }
                } else {
                    // 错误提示显示
                    parEle.find('.note-icon').show().find('span').html('验证码不可为空');

                    _this.codelock = false;
                }
            }

            // 4.验证码验证
            if ($(this).hasClass('code-input')) {

                if ($(this).val() !== '') {
                    if ($(this).val() === $(this).next('.get-code').html()) {
                        // 错误提示隐藏
                        parEle.find('.note-icon').hide();

                        _this.codelock = true;
                        parEle.find('.note-icon').show().find('span').html('✔').css('color', 'rgba(0, 128, 0, 0.623)');
                    } else {
                        // 错误提示显示
                        parEle.find('.note-icon').show().find('span').html('验证码不正确');

                        _this.codelock = false;
                    }
                } else {
                    // 错误提示显示
                    parEle.find('.note-icon').show().find('span').html('验证码不可为空');

                    _this.codelock = false;
                }
            }

            // 第一次密码输入后判断
            if ($(this).hasClass('first-psw')) {
                console.log(_this.pswlock1, 33333333)
                // 父元素
                let parEle = $(this).parent('.control-group')

                if (/\S/.test($(this).val())) {
                    // 非空
                    if (_this.pswlock1 === true) {
                        parEle.find('.note-icon').show().find('span').html('请输入二次确认密码');
                    } else {

                        // 密码不符合规则
                        if ($(this).val().length < 6) {
                            // 错误提示显示
                            parEle.find('.note-icon').show().find('span').html('密码长度小于6位');
                        } else if ($(this).val().length > 20) {
                            // 错误提示显示
                            parEle.find('.note-icon').show().find('span').html('密码长度大于20位');
                        } else {
                            // 错误提示显示
                            parEle.find('.note-icon').show().find('span').html('密码不符合规则');
                        }
                    }
                } else {
                    // 空
                    parEle.find('.note-icon').show().find('span').html('密码不可为空');

                    _this.pswlock1 = false;
                }
            }

            // 第二次密码输入后判断
            if ($(this).hasClass('second-psw')) {
                // 父元素
                let parEle = $(this).parent('.control-group')

                if (/\S/.test($(this).val())) {
                    // 非空
                    if ($(this).val() === _this.inputs.eq(3).val()) {
                        // 两次密码一致
                        parEle.find('.note-icon').show().find('span').html('✔').css('color', 'rgba(0, 128, 0, 0.623)');
                        $('.psw-group').find('.note-icon span').html('✔').css('color', 'rgba(0, 128, 0, 0.623)');
                        _this.pswlock2 = true;
                    } else {
                        // 两次密码不一致
                        parEle.find('.note-icon').show().find('span').html('两次密码不一致');
                        _this.pswlock2 = false
                    }
                } else {
                    // 空
                    parEle.find('.note-icon').show().find('span').html('第二次密码不可为空');

                    _this.pswlock2 = false;
                }
            }

            // 判断下一步是否可点击
            _this.nextStep()

            // 注册是否可点击
            _this.btnSubmit();

        })

        // 5.密码输入框内容改变时，密码提示
        this.inputs.eq(2).on('input', function () {
            // 父元素
            let parEle = $(this).parent('.control-group')
            if (!($(this).val().length > 20)) {
                if ($(this).val().length >= 6) {
                    let reg = /^(\w|\@|\#|\$\%\&\?){6,20}$/;
                    if (reg.test($(this).val())) {
                        let count = 0;
                        // 判断密码等级
                        if (/[0-9]/g.test($(this).val())) {
                            count++;
                        }
                        if (/[a-z]/g.test($(this).val())) {
                            count++;
                        }
                        if (/[A-Z]/g.test($(this).val())) {
                            count++;
                        }
                        if (/[\.|\@|\#|\$|\%|\&|\?|\_]/g.test($(this).val())) {
                            count++;
                        }
                        // 
                        switch (count) {
                            case 1:
                                parEle.find('.psw-jibies').eq(0).css('background', 'rgba(255, 0, 0, 0.551)').siblings().css({
                                    background: '#ddd'
                                });
                                _this.pswlock1 = false;
                                // 
                                break;
                            case 2:
                            case 3:
                                parEle.find('.psw-jibies').eq(1).css('background', 'rgba(255, 255, 0, 0.533)').siblings().css({
                                    background: '#ddd'
                                });
                                _this.pswlock1 = true;
                                break;
                            case 4:
                                parEle.find('.psw-jibies').eq(2).css('background', 'rgba(0, 128, 0, 0.551)').siblings().css({
                                    background: '#ddd'
                                });
                                _this.pswlock1 = true;
                                break;
                        }
                        // 错误提示
                        parEle.find('.note-icon').hide();

                        // 输入提示隐藏
                        $(this).next('.input-tip').show();
                    } else {
                        // 密码不符合规则
                        parEle.find('.psw-jibies').css({
                            background: '#ddd'
                        });
                        // 输入提示隐藏
                        $(this).next('.input-tip').hide();

                        // 错误提示
                        parEle.find('.note-icon').show().find('span').html('密码不符合规则');
                        _this.pswlock1 = false;
                    }
                } else {
                    // 错误提示
                    parEle.find('.note-icon').hide()
                    parEle.find('.psw-jibies').css({
                        background: '#ddd'
                    });
                    // 输入提示隐藏
                    $(this).next('.input-tip').show();
                    _this.pswlock1 = false;
                }
            } else {
                // 错误提示
                parEle.find('.note-icon').show().find('span').html('密码长度大于20位');
                parEle.find('.psw-jibies').css({
                    background: '#ddd'
                });
                // 输入提示隐藏
                $(this).next('.input-tip').hide();
                _this.pswlock1 = false;
            }
        })

        // 6.密码输入框失去焦点

        // 页面刷新，验证码刷新
        this.rushCode();

        // 点击验证码刷新
        this.clickCode();

        // 下一步是否可点击
        this.nextStep();
        // 注册是否可点击
        this.btnSubmit();
        // 切换至下一步
        this.clickNext();
        // 注册
        this.clickSubmit();

    }


    // 随机验证码
    getCode() {
        let codeArr = [];
        for (let i = 0; i < 10; i++) {
            codeArr.push(i);
        }
        for (let i = 65; i <= 90; i++) {
            codeArr.push(String.fromCharCode(i));
            codeArr.push(String.fromCharCode(i).toLowerCase());
        }
        return codeArr;
    }

    // 点击验证码刷新
    clickCode() {
        $('.get-code').on('click', () => {
            this.rushCode();
        })
    }

    // 
    rushCode() {
        let codeArr = this.getCode();
        let code = '';
        for (let i = 0; i < 4; i++) {
            code += codeArr[parseInt(Math.random() * codeArr.length)];
        }
        $('.get-code').html(code)
    }

    // 下一步是否可以点击
    nextStep() {
        if (this.inputs.eq(0).val() === '') {

            this.phonelock = false;
        }
        if (this.inputs.eq(1).val() === '') {
            this.codelock = false;
        }
        if (this.phonelock && this.codelock) {
            $('.submit-btn1').css({
                'cursor': 'pointer',
                'background': '#00aaa79c',
                'color': '#fff'
            })
            return true;
        } else {
            $('.submit-btn1').css({
                'cursor': 'default',
                'background': '#999',
                'color': '#ccc'
            })
            return false;
        }
    }

    // 注册是否可以点击
    btnSubmit() {
        if (this.inputs.eq(2).val() === '') {

            this.pswlock1 = false;
        }
        if (this.inputs.eq(3).val() === '') {
            this.pswlock2 = false;
        }
        if (this.pswlock1 && this.pswlock2) {
            $('.submit-btn2').css({
                'cursor': 'pointer',
                'background': '#00aaa79c',
                'color': '#fff'
            })
            return true;
        } else {
            $('.submit-btn2').css({
                'cursor': 'default',
                'background': '#999',
                'color': '#ccc'
            })
            return false;
        }
    }

    //点击下一步
    clickNext() {
        $('.submit-btn').on('click', () => {
            let flag = this.nextStep();
            if (flag) {
                $('.register-form').eq(0).hide().siblings().show();
            }
        })
    }

    //点击注册
    clickSubmit() {
        $('.submit-btn2').on('click', () => {
            let f = this.btnSubmit();
            if (f) {
                // 发送ajax请求
                $.ajax({
                    type: 'post',
                    url: 'http://10.31.152.29/project-hisense/php/savepsw.php',
                    data: {
                        submit:'1',
                        username: this.inputs.eq(0).val(),
                        psw: this.inputs.eq(2).val()
                    }
                }).done(()=>{
                    location='http://localhost/project-hisense/dist/login.html';
                    this.inputs.val('');
                })
            }
        })
    }


}

export {
    Register
}