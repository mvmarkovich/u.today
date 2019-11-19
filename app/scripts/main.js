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
  // Slider TOP-STORY on MAIN page
  //
  $('.slider_top-story').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    fade: true,
    adaptiveHeight: true
  });

  //
  // Slider NEWS-CATEGORIES on MAIN page
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
  // Slider NEWS-CATEGORIES on MAIN page
  //
  $('.medium_categories-story_list').slick({
    infinite: false,
    swipeToSlide: true,
    arrows: true,
    variableWidth: true,
    dots: false,
    prevArrow: $('.medium_categories__prev-button'),
    nextArrow: $('.medium_categories__next-button'),
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

  $(".modal__entrance-form").submit(function(e) {
    e.preventDefault();
  });

  $(function () {
    var target = $('[data-field="target"]');
    $(document).on('input', '[data-field="item"]', function () {
      var item = $(this);
      target.html(item.val().length);
    });
  });

  $(".modal .register").on("click", function () {
    $('#log_in').removeClass("modal--open modal--fadeIn");
  });

  $(".modal .sign_in").on("click", function () {
    $('#register').removeClass("modal--open modal--fadeIn");
  });

  //
  // Header Profile
  //

  $('.user--login').click(function () {
    $(this).toggleClass('user--login--open');
    return false;
  });

  $(document).on('mouseup', function (e){
    var bookingform = $(".user--login__modal");
    if (!bookingform.is(e.target) && !$(e.target).is('.user--login'))
    {
      $('.user--login--open').removeClass("user--login--open");
    }
  });

  //
  // Button show more
  //

  $(".btn--show").on("click", function () {
    $(this).parent().addClass("content--open");
    $(this).addClass("btn--show--open");
  });

  //
  // Article Celsius Widget (Calculator)
  //

  const $select_crypto = $(".select_crypto"),
      $cels__widget_year = $(".interest_per_year"),
      $cels__widget_week = $(".interest_per_week"),
      $cels__widget_input = $(".cels__widget-input");

  function interest_rate() {
    $('.interest_rate').text($('.select_crypto option:selected').data('rate'));
  }

  function interest_year() {
    $amount_year = Math.abs($('.select_crypto option:selected').data('cost')) * Math.abs($('.select_crypto option:selected').data('rate'));
    $amount_year_percent = $amount_year / 100;
    $amount_year_res = $cels__widget_input.val() * $amount_year_percent;
    $cels__widget_year.text($amount_year_res.toFixed(1));
  }

  function interest_week() {
    $amount_week_res = $amount_year_res / 52;
    $cels__widget_week.text($amount_week_res.toFixed(2));
  }

  $(window).on("load", interest_rate);
  $(window).on("load", interest_year);
  $(window).on("load", interest_week);
  $select_crypto.on("change", interest_rate);
  $select_crypto.on("change", interest_year);
  $select_crypto.on("change", interest_week);
  $cels__widget_input.on("keyup keydown keypress", interest_rate);
  $cels__widget_input.on("keyup keydown keypress", interest_year);
  $cels__widget_input.on("keyup keydown keypress", interest_week);


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
