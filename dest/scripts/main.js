(function ($) {

  //
  // Header and mobile menu
  //

  const $header = $(".header"),
      $headerContainer = $(".header__container"),
      $headerBurger = $(".header__burger"),
      $mobileMenuCover = $(".mobile-menu-cover"),
      $headerBtnSearch = $(".header__btn-search"),
      $headerSearch = $(".header__search"),
      $headerSearchBtnClose = $(".header__search-close"),
      $headerSearchInput = $(".header__search-input"),
      $headerNavList = $(".header__nav-list"),
      $headerNavLinksList = $(".header__nav-item--arrow"),
      $headerMobileMenuBack = $(".mobile-menu-back");

  var firstHeaderLoad = true;

  function toggleMobileMenu() {
    $header.toggleClass("header--mobile-menu");
    $headerBurger.toggleClass("btn--cross");
    hideMobileSubMenu();
    $("body").toggleClass("overflow-hidden");
    $mobileMenuCover.fadeToggle(280);
  }

  function toggleHeaderSearch(e) {
    e.preventDefault();
    $headerNavList.toggleClass("visibility-hidden");
    $headerSearch.fadeToggle(180);
    $headerSearchInput.focus();
  }

  function showMobileSubMenu() {
    $headerMobileMenuBack.addClass("show");
    $(".header__nav-child-list", this).addClass("show");
  }

  function hideMobileSubMenu() {
    $headerMobileMenuBack.removeClass("show");
    $(".header__nav-child-list").removeClass("show");
  }

  function stickyHeader(e) {
    let distanceToTop = $header[0].getBoundingClientRect().top;
    let isScrollDown = this.oldScroll > this.scrollY;
    let isMobileMenuOpen = $header.hasClass("header--mobile-menu");

    if (distanceToTop <= 0) {
      if (isScrollDown || firstHeaderLoad) {
        firstHeaderLoad = false;
        $headerContainer.addClass("header__container--sticky");
      }
    } else {
      $headerContainer.removeClass("header__container--sticky");
    }

    if (isScrollDown) {
      $headerContainer.addClass("header__container--sticky-show");
    } else {
      if (!isMobileMenuOpen) {
        $headerContainer.removeClass("header__container--sticky-show");
      }
    }

    this.oldScroll = this.scrollY;
  }

  stickyHeader();

  $headerMobileMenuBack.on("click", hideMobileSubMenu);
  $headerNavLinksList.on("click", showMobileSubMenu);
  $headerBurger.on("click", toggleMobileMenu);
  $mobileMenuCover.on("click", toggleMobileMenu);
  $headerBtnSearch.on("click", toggleHeaderSearch)
  $headerSearchBtnClose.on("click", toggleHeaderSearch);
  $(window).on("scroll", stickyHeader);

  //
  // Accordion
  //

  $(".accordion__title").on("click", function () {
    $(this).parent().toggleClass("accordion--open");
  });

  //
  // Modals
  //

  function getScrollBarWidth() {
    var $outer = $('<div>').css({
          visibility: 'hidden',
          width: 100,
          overflow: 'scroll'
        }).appendTo('body'),
        widthWithScroll = $('<div>').css({
          width: '100%'
        }).appendTo($outer).outerWidth();
    $outer.remove();
    return 100 - widthWithScroll;
  };

  function openModal() {
    var modalId = $(this).data("modal");
    $("#" + modalId).addClass("modal--open");

    $("body").css("overflow", "hidden");

    if (window.innerWidth >= 1152) {
      $(".share-and-up").css("transform", "translateX(-" + (getScrollBarWidth() / 2) + "px)");
    }

    setTimeout(function () {
      $("#" + modalId).addClass("modal--fadeIn");
    }, 50);
  }

  function closeModal() {
    var $openModal = $(".modal--open");
    $openModal.removeClass("modal--fadeIn");

    setTimeout(function () {
      $openModal.removeClass("modal--open");
      $("body").css("overflow", "");
      $("body, .share-and-up").css("padding-right", "0");
      $(".share-and-up").css("transform", "translateX(0)");
    }, 200);
  }

  function backModal() {
    $('.modal__square:visible').hide().prev('.modal__square').show();
  }

  $("[data-modal]").on("click", openModal);
  $(".modal").on("click", closeModal);
  $("[data-close-modal]").on("click", closeModal);
  $("[data-back-modal]").on("click", backModal);

  $(".modal > *").on("click", function () {
    event.stopPropagation();
  });

  $(".modal .register").on("click", function () {
    $('#log_in').removeClass("modal--open modal--fadeIn");
  });

  $(".modal .sign_in").on("click", function () {
    $('#register').removeClass("modal--open modal--fadeIn");
  });

  var currencyValue = $(".currencies__currency span");

  $("[data-set-currency]").on("click", setCurrency);

  function setCurrency() {
    var currency = $(this).data("set-currency");

    switch (currency) {
      case "usd":
        console.log("set usd")
        break;

      case "eur":
        console.log("set eur")
        break;

      case "rub":
        console.log("set rub")
        break;
    }

    currencyValue.text(currency);
  }

  //
  // Tabs
  //

  $("[data-active-tab]").on("click", function () {
    var idTab = $(this).data("active-tab");

    $("[data-active-tab]").removeClass("tabs__item--active");
    $(this).addClass("tabs__item--active");

    $("[data-tab]").removeClass("active");
    $("[data-tab=" + idTab + "]").addClass("active");
  });

  //
  // Article infinite scroll
  //

  var $articles = $(".article");

  if ($articles.length) {
    var viewHeight = $(window).height();
    var $articleContainer = $(".article-infinite-scroll");
    var $articleInContainer = $(".main-news-block > .article:first-child");
    var stop = false;

    function articleInfiniteScroll() {
      if (stop) return;
      $(".article--scroll-show").width($articleInContainer.width());

      var article = $(".article-infinite-scroll .article:first")[0];

      if (article === undefined) {
        stop = true;
        $("main").addClass("scroll-end");
        $articleContainer.remove();
        return;
      }

      var articlePrev = $(".main-news-block > .article:last").get(0);
      var articleRect = article.getBoundingClientRect();
      var articlePrevRect = articlePrev.getBoundingClientRect();

      $articleContainer.height(articleRect.height)

      if (articlePrevRect.height + articlePrevRect.top - viewHeight * 0.35 < 0) {
        $(article).addClass("article--full-show")

        var articleDetach = $(article).detach();
        $(".main-news-block > .article:last").after(articleDetach[0]);
      }

      if (articleRect.top - viewHeight * 1.35 < 0) {
        $(article).addClass("article--scroll-show")
      }
    }

    $(window).on("load", function () {
      articleInfiniteScroll();
      $(".article--scroll-show").width($articleInContainer.width())
      setTimeout(articleInfiniteScroll, 100);
      setTimeout(articleInfiniteScroll, 1000);
      $(window).on("scroll", articleInfiniteScroll);
      $(window).on("resize", articleInfiniteScroll);
    });
  }

  $(window).on('resize scroll', function() {
      if ($(window).width() <= 888) {
        $('.share-and-up').css('margin-bottom', $('.something--footer').height());
      }
  });

  $(".btn--close-something").on("click", function() {
    $(".something--footer").addClass('hide');
    $('.share-and-up').css('margin-bottom', '0');
  });

  $(".price-index__header .btn").on("click", function() {
    $(".price-index__aside").toggleClass("price-index__aside--close");
  });

  $(".subscribe__close").on("click", function() {
    $(".subscribe").addClass("hide");
  });

  $(document).mouseup(function (e){
    $('.active-lang').removeClass("active-lang");
  });

  $(".header__lang").on("click", function () {
    $(this).toggleClass("active-lang");
  });

  $('#register .modal__square .btn--wide').click(function() {
    $('.modal__square:visible').hide().next('.modal__square').show();
  });

  $('.accept-cookies').on('click', function() {
    $(".cookies").detach();
    var date = new Date();
    days = 365;
    date.setTime(+date + (days * 86400000));
    document.cookie = "accept=1; expires=" + date.toGMTString();
  });

  $(document).on('keyup', function(evt) {
    if ( (evt.keyCode || evt.which) === 27 ) {
      $('.aside_dropdown').removeClass('open');
    }
  });

  var sidebar = new StickySidebar('.aside-menu-block', {
    containerSelector: '.main-aside-container',
    innerWrapperSelector: '.sidebar__inner',
    topSpacing: 16,
    bottomSpacing: 16,
    minWidth: 784
  });

  //
  // Slider topStory on MAIN page
  //
  $('.slider_top-story').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    fade: true
  });

  //
  // Slider newsCategories on MAIN page
  //
  $('.new_categories .news-categories__list').slick({
    infinite: false,
    swipeToSlide: true,
    arrows: true,
    variableWidth: true,
    dots: false,
    responsive: [
      {
        breakpoint: 961,
        settings: {
          arrows: false
        }
      }
    ]
  });

  //
  // Slider newsCategories on MAIN page
  //
  $('.medium_categories-story_list').slick({
    infinite: false,
    swipeToSlide: true,
    arrows: true,
    variableWidth: true,
    dots: false,
    prevArrow: $('.medium_categories-story .slider__nav-prev'),
    nextArrow: $('.medium_categories-story .slider__nav-next'),
  });

  //
  // Slider pressReleases on MAIN page
  //
  $('.press-releases__slider').slick({
    infinite: true,
    slidesToScroll: 1,
    dots: false,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          arrows: false
        }
      }
    ]
  });

  //
  // Long Slider pressReleases on MAIN page
  //
  $('.press-releases__slider-long').slick({
    infinite: false,
    slidesToScroll: 1,
    dots: false,
    variableWidth: true,
    prevArrow: $('.press-releases .slider__nav-prev'),
    nextArrow: $('.press-releases .slider__nav-next')
  });

  function modalTimeout() {
    var i = 3;
    var timerId = setTimeout(function go() {
      $('.timeout__item').html(i);
      if (i <= 3) setTimeout(go, 1000);
      i--;
    }, 0);
  }

  $(".rating-button").bind('click',function() {
    $(".rating-button").removeClass("voted");
    $(this).addClass("voted");
  });

  //
  // Form Validation
  //
  $('#form-log_in').each(function() {
    $(this).validationEngine('attach', {
      addFailureCssClassToField: "invalid",
      addSuccessCssClassToField: "valid",
      promptPosition : "centerRight",
      scroll: false,
      onValidationComplete: function(form, status){
        if (status == true){

          return true;
        }
      }
    });
  });

  $('#generate-brainkey').each(function() {
    $(this).validationEngine('attach', {
      addFailureCssClassToField: "invalid",
      addSuccessCssClassToField: "valid",
      promptPosition : "centerRight",
      scroll: false,
      onValidationComplete: function(form, status){
        if (status == true && $('#generate-brainkey').find(".input__checkbox").is(':checked')){
          $('.modal__square:visible').hide().next('.modal__square').show();
          return true;
        } else{

        }
      }
    });
  });

  $('#recorded-brainkey').each(function() {
      $(this).change(function() {
          if ($('#recorded-brainkey').find(".input__checkbox").is(':checked')) {
              $(this).children(".btn_step").prop('disabled', false);
              $(this).children(".btn_step").on('click', function(){
                modalTimeout();
                window.setTimeout('location.reload()', 3000); //Reloads after three seconds
              });
          } else {
              $(this).children(".btn_step").prop('disabled', 'disabled');
          }
      });
  });

  $(".modal__entrance-form, .comment-form").submit(function(e) {
    e.preventDefault();
  });

  $(function () {
    var target = $('[data-field="target"]');
    $(document).on('input', '[data-field="item"]', function () {
      var item = $(this);
      target.html(item.val().length);
    });
  });

  //
  // Header Profile
  //

  $('.user--login').click(function () {
    $('.user--login__modal').toggleClass('user--login__modal-open');
    return false;
  });

  $(document).on('mouseup', function (e){
    var bookingform = $(".user--login__modal");
    if (!bookingform.is(e.target) && !$(e.target).is('.user--login__modal'))
    {
      $('.user--login__modal-open').removeClass("user--login__modal-open");
    }
  });

  //
  // Button show more
  //

  $(".main-news-block").on("click", ".btn--show", function () {
        $(this).parent().addClass("content--open");
        $(this).addClass("btn--show--open");
    });

  if($(".about-author p").text().length > 135){
    $('.about-author .btn').show();
  } else {
    $('.about-author .btn').hide();
  }

  //
  // Button load more in News main
  //

  $(".news__item").hide();

  $(".news__item:hidden").slice(0, 5).show();

  if($(".news__item").length < 6){
    $('.news .btn--block').hide();
  }

  $('.news .btn').on('click', function(){
    $(".news__item:hidden").slice(0, 5).show();

    if($(".news__item:hidden").length < 1){
      $('.news .btn--block').hide();
    }
  });

  //
  // Article Celsius Widget (Calculator)
  //

  const $cels_widget = $(".cels__widget");

  $(window).on("load", document, function(){
    $cels_widget.find('.interest_rate').text($cels_widget.find('.select_crypto option:selected').data('rate'));

    $amount_year = Math.abs($cels_widget.find('.select_crypto option:selected').data('cost')) * Math.abs($cels_widget.find('.select_crypto option:selected').data('rate'));
    $amount_year_percent = $amount_year / 100;
    $amount_year_res = $cels_widget.find(".cels__widget-input").val() * $amount_year_percent;
    $cels_widget.find(".interest_per_year").text($amount_year_res.toFixed(1));

    $amount_week_res = $amount_year_res / 52;
    $cels_widget.find(".interest_per_week").text($amount_week_res.toFixed(2));
  });

  $(".main-news-block").on("change", ".cels__widget", function(){
    $(this).find('.interest_rate').text($(this).find('.select_crypto option:selected').data('rate'));

    $amount_year = Math.abs($(this).find('.select_crypto option:selected').data('cost')) * Math.abs($(this).find('.select_crypto option:selected').data('rate'));
    $amount_year_percent = $amount_year / 100;
    $amount_year_res = $(this).find(".cels__widget-input").val() * $amount_year_percent;
    $(this).find(".interest_per_year").text($amount_year_res.toFixed(1));

    $amount_week_res = $amount_year_res / 52;
    $(this).find(".interest_per_week").text($amount_week_res.toFixed(2));
  });

  $(".main-news-block").on("keyup keydown keypress", ".cels__widget-input", function(){
    $amount_year = Math.abs($(this).parents('.cels__widget').find('.select_crypto option:selected').data('cost')) * Math.abs($(this).parents('.cels__widget').find('.select_crypto option:selected').data('rate'));
    $amount_year_percent = $amount_year / 100;
    $amount_year_res = $(this).parents('.cels__widget').find(".cels__widget-input").val() * $amount_year_percent;
    $(this).parents('.cels__widget').find(".interest_per_year").text($amount_year_res.toFixed(1));

    $amount_week_res = $amount_year_res / 52;
    $(this).parents('.cels__widget').find(".interest_per_week").text($amount_week_res.toFixed(2));
  });

})(jQuery);


//
// Share
//

function share(tg, tw, fb) {
  let shareBox = document.getElementById("share-post");
  let bodyRect = document.body.getBoundingClientRect();
  let elemRect = event.target.getBoundingClientRect();

  let tgLink = document.getElementById("share-post-link-tg");
  let twLink = document.getElementById("share-post-link-tw");
  let fbLink = document.getElementById("share-post-link-fb");

  tgLink.setAttribute("href", tg);
  twLink.setAttribute("href", tw);
  fbLink.setAttribute("href", fb);

  let offset = {
    top: elemRect.top - bodyRect.top,
    left: elemRect.left - bodyRect.left
  }

  shareBox.style.top = offset.top + "px";
  shareBox.style.left = offset.left + 34 + "px";
}

function shareHide() {
  let shareBox = document.getElementById("share-post");
  shareBox.style.top = "-9999px";
}

//
// Show more buttons
//

function showMore(elem) {
  event.target.classList.toggle("btn--arrow-up-before");
  document.querySelector(elem).classList.toggle(elem.slice(1) + "--open");
}

function tabsSub() {
  event.target.parentNode.classList.toggle("tabs__item--sub-open");
}

function validate(subscribe__form,subscribe__email) {
  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  var address = document.forms[subscribe__form].elements[subscribe__email].value;
  if(reg.test(address) == false) {
    $(".subscribe").addClass("invalid-form");
    return false;
  }
}
