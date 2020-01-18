import {
    User
} from './user.js';


function topRender(){
    $.ajax({
        url:'index.html',
        dataType:'html'
    }).done((data)=>{
       let value1 = $(data).find('.header-main');
    //    let value2=$(data).find('.footre-main');
        $('#header').html(value1);
        // $('#footer').html(value2);
        new User().init();
    })
}
export {
    topRender
}