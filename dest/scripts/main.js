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

  $('.something--close').on('click', function() {
    $(this).parent().remove();
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

  $('.article__content img').ezPlus({
    scrollZoom: false
  });

  window.internalTags = ''.split(", ").map((e => e.slice(5))),
    window.getTheme = () => localStorage.getItem("THEME") || "system",
    window.setTheme = (e=getTheme()) => {
        localStorage.setItem("THEME", e);
        const t = window.internalTags.includes("theme-default"),
            a = "system" === e,
            n = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
            o = [...document.documentElement.classList].find((e => e.startsWith("theme"))),
            r = t ? "light" : a ? n : e;
        document.documentElement.classList.replace(o, "theme-".concat(r))
  }

  (() => {
    const e = {
        system: document.querySelectorAll(".theme__switch--system"),
        light: document.querySelectorAll(".theme__switch--light"),
        dark: document.querySelectorAll(".theme__switch--dark")
    };
    function t(t) {
        e[t].forEach((e => {
            e.classList.replace("is-hidden", "is-visible")
        }))
    }
    function n(n, o) {
        !function(t) {
            e[t].forEach((e => {
                e.classList.replace("is-visible", "is-hidden")
            }))
        }(n),
        window.setTheme(o),
        t(o)
    }
    window.internalTags.includes("theme-default") ? t("light") : (e.system.forEach((e => {
        e.addEventListener("click", (() => n("system", "light")))
    })), e.light.forEach((e => {
        e.addEventListener("click", (() => n("light", "dark")))
    })), e.dark.forEach((e => {
        e.addEventListener("click", (() => n("dark", "system")))
    })), t(window.getTheme()))
})();

  (function(){
    var a = document.querySelector('.aside-menu-block'), b = null, K = null, Z = 0, P = 16, N = 16;
    window.addEventListener('scroll', Ascroll, false);
    document.body.addEventListener('scroll', Ascroll, false);
    function Ascroll() {
      var Ra = a.getBoundingClientRect(),
          R1bottom = document.querySelector('.main-aside-container').getBoundingClientRect().bottom;
      if (Ra.bottom < R1bottom) {
        if (b == null) {
          var Sa = getComputedStyle(a, ''), s = '';
          b = document.createElement('div');
          b.className = "aside-stop";
          b.style.cssText = s + ' box-sizing: border-box; width: ' + a.offsetWidth + 'px;';
          a.insertBefore(b, a.firstChild);
          var l = a.childNodes.length;
          for (var i = 1; i < l; i++) {
            b.appendChild(a.childNodes[1]);
          }
          $(window).scroll(function(){  
            a.style.height = b.getBoundingClientRect().height + 'px';
          })
          a.style.padding = '0';
          a.style.border = '0';
        }
        var Rb = b.getBoundingClientRect(),
            Rh = Ra.top + Rb.height,
            W = document.documentElement.clientHeight,
            R1 = Math.round(Rh - R1bottom),
            R2 = Math.round(Rh - W);
        if (Rb.height > W) {
          if (Ra.top < K) {  // скролл вниз
            if (R2 + N > R1) {  // не дойти до низа
              if (Rb.bottom - W + N <= 0) {  // подцепиться
                b.className = 'aside-fixed';
                b.style.top = W - Rb.height - N + 'px';
                Z = N + Ra.top + Rb.height - W;
              } else {
                b.className = 'aside-stop';
                b.style.top = - Z + 'px';
              }
            } else {
              b.className = 'aside-stop';
              b.style.top = - R1 +'px';
              Z = R1;
            }
          } else {  // скролл вверх
            if (Ra.top - P < 0) {  // не дойти до верха
              if (Rb.top - P >= 0) {  // подцепиться
                b.className = 'aside-fixed';
                b.style.top = P + 'px';
                Z = Ra.top - P;
              } else {
                b.className = 'aside-stop';
                b.style.top = - Z + 'px';
              }
            } else {
              b.className = '';
              b.style.top = '';
              Z = 0;
            }
          }
          K = Ra.top;
        }

        window.addEventListener('resize', function() {
          a.children[0].style.width = getComputedStyle(a, '').width
        }, false);
      }
    }
  })()

})(jQuery);