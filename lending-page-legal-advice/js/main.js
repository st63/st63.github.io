$(function(){

$('.slider__inner, .news__slider-inner').slick({
    nextArrow: '<button type="button" class="slick-btn slick-next"></button>',
    prevArrow: '<button type="button" class="slick-btn slick-prev"></button>',
    infinite: false //Чтобы слайды не скролились вечно, пролистали до конца, дальше нельзя
});

$('select').styler();

$('.header__btn-menu').on('click', function(){
    $('.menu ul').slideToggle();
});


});