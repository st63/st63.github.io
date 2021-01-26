$(function(){

$('.input-range-bar').on('input change', function(){
	$('.input-range-box').val($('.input-range-bar').val());
});

$('.input-range-box').on('keyup change', function(){
    $('.input-range-bar').val($('.input-range-box').val());
});

$('input[type="range"]').change(function () {
    let vibor = $(this).val();
    if (vibor < 500000) {
        $(".vivod").text('99%');
    } else if (vibor < 800000) {
        $(".vivod").text('50%');
    } else {
        $(".vivod").text('10%');
    };
  });


/*$('input[type="range"]').change(function () {
    var val = ($(this).val() - $(this).attr('min')) / ($(this).attr('max') - $(this).attr('min'));
    
    $(this).css('background-image',
                '-webkit-gradient(linear, left top, right top, '
                + 'color-stop(' + val + ', #94A14E), '
                + 'color-stop(' + val + ', #C5C5C5)'
                + ')'
                );
});*/

});

