function topRender(){
    $.ajax({
        url:'index1.html',
        dataType:'html'
    }).done((data)=>{
       let value1 = $(data).find('.header-main');
    //    let value2=$(data).find('.footre-main');
        $('#header').html(value1);
        // $('#footer').html(value2);
    })
}
export {
    topRender
}