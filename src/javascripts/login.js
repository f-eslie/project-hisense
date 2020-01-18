

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
                'font-size':'12px'
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
                    'font-size':'16px'
                }, 500);
            }

             // 2.下方提示文字隐藏
             $(this).next('.input-tip').hide();

            // 3。用户名验证
            if ($(this).hasClass('phone-input')) {
                // ajax请求
                $.ajax({
                    url: 'http://10.31.152.29/project-hisense/php/getpsw.php',
                    type: 'post',
                    dataType: 'json',
                    data: {
                        phone: _this.inputs.eq(0).val()
                    }
                }).done((data) => {
                    this.data = data;
                    console.log(data,9999999999);
                    if ($(this).val() !== '') {
                        if (data !== 0) {
                            console.log('999999999')
                            // 手机号未注册
                            if (/^1[3|5|7]\d{9}$/g.test($(this).val())) {
                                // 错误提示隐藏
                                parEle.find('.input-error').hide();

                                _this.phonelock = true;
                                parEle.find('.input-error').show().find('span').html('✔').css('color', 'rgba(0, 128, 0, 0.623)');
                            } else {
                                // 错误提示显示
                                parEle.find('.input-error').show().find('span').html('请输入正确的手机号或用户名');

                                _this.phonelock = false;
                            }
                        } else {
                            console.log(3333333)
                            // 错误提示显示
                            parEle.find('.input-error').show().find('span').html('该用户不存在');

                            _this.phonelock = false;
                        }
                    } else {
                        // 错误提示显示
                        parEle.find('.input-error').show().find('span').html('手机号/用户名不可为空');

                        _this.phonelock = false;
                    }
                })
            }

            // 4.密码验证
            if ($(this).hasClass('psw-input')) {
                if ($(this).val() !== '') {
                    if ($(this).val() === this.data.psw) {
                        // 错误提示隐藏
                        parEle.find('.input-error').hide();

                        _this.codelock = true;
                        parEle.find('.input-error').show().find('span').html('✔').css('color', 'rgba(0, 128, 0, 0.623)');
                    } else {
                        // 错误提示显示
                        parEle.find('.input-error').show().find('span').html('密码错误');

                        _this.pswlock = false;
                    }
                } else {
                    // 错误提示显示
                    parEle.find('.input-error').show().find('span').html('密码不能为空');

                    _this.codelock = false;
                }
            }
        })

        // 注册
        this.clickLogin();
    }

    //点击注册
    clickLogin() {
        $('.tab-content').on('click', () => {
            if (this.inputs.eq(0).val() === '') {

                this.phonelock = false;
            }
            if (this.inputs.eq(1).val() === '') {
                this.pswlock = false;
            }
            if (!this.pswlock1 || !this.pswlock2) {
                return false;
            } 
        })
    }


}

export {
    Login
}