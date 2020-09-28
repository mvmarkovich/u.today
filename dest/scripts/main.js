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
  $headerBtnSearch.on("click", toggleHeaderSearch);
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
  }

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

  setTimeout(function() {
    $("#subscribe-form").addClass("modal--open");

    $("body").css("overflow", "hidden");

    setTimeout(function () {
      $("#subscribe-form").addClass("modal--fadeIn");}, 50);
  }, 30000);

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

  $(".price-index__header .btn").on("click", function() {
    $(".price-index__aside").toggleClass("price-index__aside--close");
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

  /*
  var sidebar = new StickySidebar('.aside-menu-block', {
    containerSelector: '.main-aside-container',
    innerWrapperSelector: '.sidebar__inner',
    topSpacing: 16,
    bottomSpacing: 16,
    minWidth: 784
  });
   */

  //
  // Slider (Slick)
  //

  $('.press-releases__slider').slick({
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    variableWidth: true,
    arrows: true,
    dots: false,
    responsive: [
      {
        breakpoint: 826,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  });

  $('.upcoming__slider').slick({
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    variableWidth: true,
    arrows: true,
    dots: false,
    responsive: [
      {
        breakpoint: 826,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  });


  function modalTimeout() {
    var i = 3;
    var timerId = setTimeout(function go() {
      $('.timeout__item').html(i);
      if (i <= 3) setTimeout(go, 1000);
      i--;
    }, 0);
  }

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
  // Button load more in News main
  //

  $(".news__item").hide();

  $(".news__item:hidden").slice(0, 5).show();

  $('.news .btn--show').on('click', function(){
    $(".news__item:hidden").slice(0, 5).show();

    if($(".news__item:hidden").length < 1){
      $('.news .btn--show').hide();
      $('.news .btn--show-all').css("display", "inline-flex");
    }
  });

  //
  // Copy URL Share block
  //

  var $temp = $("<input>");
  var $url = $(location).attr('href');

  $('.social__link--copy').on('click', function() {
    $("body").append($temp);
    $temp.val($url).select();
    document.execCommand("copy");
    $temp.remove();
  });

  $('.article__content').bind('copy cut drag drop', function (e) {
    e.preventDefault();
  });

})(jQuery);