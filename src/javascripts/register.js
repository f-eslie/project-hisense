import {
    storage
} from "./localstorage";

class Register {
    constructor() {
        this.form1 = $('.register-form1');
        this.wrapboxs = $('.register-form1 .control-group');
        this.inputs = $('.register-form1 input');
        this.phonelock = true;
        this.codelock = true;
    }
    init() {
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
                if ($(this).val() !== '') {
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
                    parEle.find('.note-icon').show().find('span').html('手机号不可为空');

                    _this.phonelock = false;
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


            // 判断下一步是否可点击
            _this.nextStep()
        })

        // 页面刷新，验证码刷新
        this.rushCode();

        // 点击验证码刷新
        this.clickCode();

        // 下一步是否可点击
        this.nextStep();

        // 切换至下一步
        this.clickNext();

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

    // 点击下一步
    nextStep() {
        if (this.inputs.eq(0).val() === '') {
            // this.inputs.eq(0).parent('.control-group').find('.note-icon').show().find('span').html('手机号不可为空');

            this.phonelock = false;
        }
        if (this.inputs.eq(1).val() === '') {
            this.codelock = false;
            // this.inputs.eq(1).parent('.control-group').find('.note-icon').show().find('span').html('验证码不可为空');
        }
        console.log(this.phonelock,this.codelock);
        if (this.phonelock && this.codelock) {
            $('.submit-btn').css({
                'cursor':'pointer',
                'background':'#00aaa79c',
                'color':'#fff'
            })
            return true;
        } else {
            $('.submit-btn').css({
                'cursor':'default',
                'background':'#999',
                'color':'#ccc'
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
}

export {
    Register
}