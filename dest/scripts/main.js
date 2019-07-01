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

      var articlePrev = $(".main-block > .article:last").get(0);
      var articleRect = article.getBoundingClientRect();
      var articlePrevRect = articlePrev.getBoundingClientRect();

      $articleContainer.height(articleRect.height)

      if (articlePrevRect.height + articlePrevRect.top - viewHeight * 0.35 < 0) {
        $(article).addClass("article--full-show")

        var articleDetach = $(article).detach();
        $(".main-block > .article:last").after(articleDetach[0]);
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

  $(".index-price .price-index__header .btn").on("click", function() {
    $(".index-price .price-index__aside").toggleClass("active");
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

  $('#register .modal__square .btn--cross-back').click(function() {
    $('.modal__square:visible').hide().prev('.modal__square').show();
  });

  $('.accept-cookies').on('click', function() {
    $(".cookies").detach();
    var date = new Date();
    days = 1;
    date.setTime(+date + (days * 86400000));
    document.cookie = "accept=1; expires=" + date.toGMTString();
  });

  /* aside in price-index */
  $('.aside_dropdown > .caption').on('click', function() {
    $(this).parent().toggleClass('open');
  });

  $('.aside_dropdown > .aside_dropdown__list > .aside_dropdown__item').on('click', function() {
    $('.aside_dropdown > .aside_dropdown__list > .aside_dropdown__item').removeClass('selected');
    $(this).addClass('selected').parent().parent().removeClass('open').children('.caption').text( $(this).children().children('.tabs__btn, .daily_value').text());
  });

  $(document).on('keyup', function(evt) {
    if ( (evt.keyCode || evt.which) === 27 ) {
      $('.aside_dropdown').removeClass('open');
    }
  });

  $(document).on('click', function(evt) {
    if ( $(evt.target).closest(".aside_dropdown > .caption").length === 0 ) {
      $('.aside_dropdown').addClass('open');
    }
  });

  $(window).on('load resize', function() {
    if ($(window).width() <= '784'){
      $(document).on('click', function(evt) {
        if ( $(evt.target).closest(".aside_dropdown > .caption").length === 0 ) {
          $('.aside_dropdown').removeClass('open');
        }
      });
      return this;
    }
    else   {

    }
  });

  $(window).on('load resize', function() {
    if ($(window).width() >= '887'){
      $(window).scroll(function() {
        if ($(this).scrollTop() > 450) {
          $('.main-page .share-and-up').addClass('show');
        } else{
          $('.main-page .share-and-up').removeClass('show');
        }
      });
      return this;
    }
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
    fade: true
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


  $('.modal__entrance-form').change(function() {
    $(this).validationEngine('attach', {addFailureCssClassToField: "invalid", addSuccessCssClassToField: "valid", promptPosition : "centerRight", scroll: false});
    if ($(this).validationEngine('validate') == true && $(this).find(".checkbox").is(':checked')) {
      $(this).children(".btn_step").prop('disabled', false);
    } else {
      $(this).children(".btn_step").prop('disabled', 'disabled');
    }
  });

  $('.modal__log_in-form').change(function() {
    $(this).validationEngine('attach', {addFailureCssClassToField: "invalid", addSuccessCssClassToField: "valid", promptPosition : "centerRight", scroll: false});
    if ($(this).validationEngine('validate') == true) {
      $(this).children(".btn_step").prop('disabled', false);
    } else {
      $(this).children(".btn_step").prop('disabled', 'disabled');
    }
  });

  $(".modal__entrance-form").submit(function(e) {
    e.preventDefault();
  });

  var entrance_checkbox = 0;
  $(".modal .modal__entrance .checkbox__block_item").each(function(){
    entrance_checkbox++;
    $(this).children(".checkbox").attr("id","entrance-checkbox-" + entrance_checkbox);
    $(this).children("label").attr("for","entrance-checkbox-" + entrance_checkbox);
  });

  var entrance_form = 0;
  $(".modal .modal__entrance form").each(function(){
    entrance_form++;
    $(this).attr("id","entrance_form-" + entrance_form);
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

