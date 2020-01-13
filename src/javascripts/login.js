;
!function($){
    $.ajax({
        url:'index1.html',
        dataType:'html'
    }).done((data)=>{
       let value = $(data).find('.header-main');
        $('#header').html(value);
    })
}(jQuery);