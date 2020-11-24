(function ($) {

  //
  // Header and mobile menu
  //

  const $header = $(".header"),
      $headerBurger = $(".header__burger"),
      $mobileMenuCover = $(".mobile-menu-cover"),
      $headerBtnSearch = $(".header__btn-search"),
      $headerSearch = $(".header__search"),
      $headerSearchBtnClose = $(".header__search-close"),
      $headerSearchInput = $(".header__search-input"),
      $headerNav = $(".header__nav"),
      $headerNavLinksList = $(".header__nav-item--arrow");

  function toggleMobileMenu() {
    $header.toggleClass("header--mobile-menu");
    $headerBurger.toggleClass("btn--cross");
    hideMobileSubMenu();
    $("body").toggleClass("overflow-hidden");
    $mobileMenuCover.fadeToggle(280);
  }

  function openHeaderSearch(e) {
    e.preventDefault();
    $headerNav.addClass("header--hide");
    $(".header__panel").addClass("header--hide");
    $headerSearch.fadeToggle(180);
  }

  function closeHeaderSearch(e) {
    e.preventDefault();
    $headerSearch.fadeToggle(180);

    setTimeout(function () {
      $headerNav.toggleClass("header--hide");
      $(".header__panel").toggleClass("header--hide");
    }, 180);
  }

  function showMobileSubMenu() {
    $(".header__nav-child-list", this).addClass("show");
  }

  function hideMobileSubMenu() {
    $(".header__nav-child-list").removeClass("show");
  }

  $headerNavLinksList.on("click", showMobileSubMenu);
  $headerBurger.on("click", toggleMobileMenu);
  $mobileMenuCover.on("click", toggleMobileMenu);
  $headerBtnSearch.on("click", openHeaderSearch);
  $headerSearchBtnClose.on("click", closeHeaderSearch);

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

  $("[data-modal]").on("click", openModal);
  $(".modal").on("click", closeModal);
  $("[data-close-modal]").on("click", closeModal);
  $("[data-back-modal]").on("click", backModal);

  $(".modal > *").on("click", function () {
    event.stopPropagation();
  });

  $('.memories .btn--show').on('click', function() {
    $(this).parent().addClass("content--open")
  });

  $('.btn--show-more').on('click', function() {
    $(this).css("display", "none");
    $(this).siblings().css("max-height", "100%")
  });

  //
  // Button load more in News main
  //

  $(".news__item").hide();

  $(".news__item:hidden").slice(0, 5).show();

  $('.news .btn--show').on('click', function(){
    $('.news .btn--show').hide();
    $('.news__loading').show();

    if($(".news__item:hidden").length >=6){
      setTimeout(function () {
        $(".news__item:hidden").slice(0, 5).show();
        $('.news .btn--show').show();
        $('.news__loading').hide();
      }, 300);
    }

    if($(".news__item:hidden").length <= 5){
      $(".news__item").show();
      $('.news .btn--show').hide();
      $('.news__loading').hide();
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

})(jQuery);