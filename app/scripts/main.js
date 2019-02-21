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
    $("body").css("padding-right", getScrollBarWidth() + "px");

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
      $("body").css("overflow", "auto");
      $("body, .share-and-up").css("padding-right", "0");
      $(".share-and-up").css("transform", "translateX(0)");
    }, 200);
  }

  $("[data-modal]").on("click", openModal);
  $(".modal").on("click", closeModal);
  $("[data-close-modal]").on("click", closeModal);

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
    var $articleInContainer = $(".main-block > .article:first-child");
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

      var articlePrev = $("main > .article:nth-last-child(2)")[0];
      var articleRect = article.getBoundingClientRect();
      var articlePrevRect = articlePrev.getBoundingClientRect();

      $articleContainer.height(articleRect.height)

      if (articlePrevRect.height + articlePrevRect.top - viewHeight * 0.35 < 0) {
        $(article).addClass("article--full-show")

        var articleDetach = $(article).detach();
        articlePrev.after(articleDetach[0]);
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