function bottomRender(){
    $.ajax({
        url:'index.html',
        dataType:'html'
    }).done((data)=>{
       let value2=$(data).find('.footre-main');
        $('#footer').html(value2);
    })
}
export {
    bottomRender
}