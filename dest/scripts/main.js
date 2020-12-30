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
    $(".header__lang").addClass("visibility-hidden");
    $headerSearch.fadeToggle(180);
  }

  function closeHeaderSearch(e) {
    e.preventDefault();
    $headerSearch.fadeToggle(180);

    setTimeout(function () {
      $headerNav.toggleClass("header--hide");
      $(".header__panel").toggleClass("header--hide");
      $(".header__lang").toggleClass("visibility-hidden");
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

!function(){var e=document.querySelector(".aside-menu-block"),t=null,o=null,s=0,d=16,i=16;function n(){var n=e.getBoundingClientRect(),l=document.querySelector(".main-news-block").getBoundingClientRect().bottom;if(n.bottom<l){if(null==t){for(var a=getComputedStyle(e,""),p="",c=0;c<a.length;c++)0!=a[c].indexOf("overflow")&&0!=a[c].indexOf("padding")&&0!=a[c].indexOf("border")&&0!=a[c].indexOf("outline")&&0!=a[c].indexOf("box-shadow")&&0!=a[c].indexOf("background")||(p+=a[c]+": "+a.getPropertyValue(a[c])+"; ");(t=document.createElement("div")).className="aside-stop",t.style.cssText=p+" box-sizing: border-box; width: "+e.offsetWidth+"px;",e.insertBefore(t,e.firstChild);var r=e.childNodes.length;for(c=1;c<r;c++)t.appendChild(e.childNodes[1]);e.style.height=t.getBoundingClientRect().height+"px",e.style.padding="0",e.style.border="0"}var h=t.getBoundingClientRect(),u=n.top+h.height,m=document.documentElement.clientHeight,g=Math.round(u-l),x=Math.round(u-m);h.height>m?(n.top<o?x+i>g?h.bottom-m+i<=0?(t.className="aside-fixed",t.style.top=m-h.height-i+"px",s=i+n.top+h.height-m):(t.className="aside-stop",t.style.top=-s+"px"):(t.className="aside-stop",t.style.top=-g+"px",s=g):n.top-d<0?h.top-d>=0?(t.className="aside-fixed",t.style.top=d+"px",s=n.top-d):(t.className="aside-stop",t.style.top=-s+"px"):(t.className="",t.style.top="",s=0),o=n.top):n.top-d<=0?n.top-d<=g?(t.className="aside-stop",t.style.top=-g+"px"):(t.className="aside-fixed",t.style.top=d+"px"):(t.className="",t.style.top=""),window.addEventListener("resize",function(){e.children[0].style.width=getComputedStyle(e,"").width},!1)}}window.addEventListener("scroll",n,!1),document.body.addEventListener("scroll",n,!1)}();