let linkBG = $(".menu_link_background");
let contentBG = $(".menu_dropdown_background");
let backgrounds = ".menu_dropdown_background, .menu_link_background";

let menuLink = $(".menu_dp-link");
let contentWrapper = ".dp-dropdown__wrapper";
let ddContent = ".menu_dropdown_layout";

function desktopCode() {
  menuLink.on("mouseenter", function () {
    // check if you're coming from another link
    let previousLink = menuLink.filter(".active").removeClass("active");
    let currentLink = $(this).addClass("active");
    let childContent = $(this).find(".menu_dropdown_content");

    // make only current ddContent clickable
    $(contentWrapper).removeClass("active");
    $(this).find(contentWrapper).addClass("active");

    // set moving backgrounds to visible
    $(backgrounds).css("opacity", "1");

    //hide all dropdown content
    $(ddContent).css("opacity", "0");

    // play animations
    if (
      previousLink.length === 0 ||
      previousLink.index() === currentLink.index()
    ) {
      // instantly reveal everything
      linkBG.appendTo($(this));
      contentBG.appendTo(childContent);

      $(this).find(ddContent).animate({ opacity: 1 }, 200);
    } else if (previousLink.index() !== currentLink.index()) {
      // switching between two different links
      let state = Flip.getState(backgrounds);

      linkBG.appendTo($(this));
      contentBG.appendTo(childContent);

      Flip.from(state, {
        duration: 0.2,
        ease: "power1.inOut",
        onComplete: () => {
          $(this).find(ddContent).animate({ opacity: 1 }, 200);
        }
      });
    }
  });

  menuLink.on("mouseleave", function () {
    $(contentWrapper).removeClass("active");
    $(backgrounds).css("opacity", "0");
    $(ddContent).css("opacity", "0");
  });
}

function tabletCode() {
  //RESET
  menuLink.unbind();
  $(backgrounds).css("opacity", "0");
  $(ddContent).css("opacity", "1");

  //TABLET
  //SET CSS ON LOAD
  $(".nav-tablet__wrapper").css("max-height", "0px").css("height", "auto");
  $("#coverage-tablet").css("max-height", "1000px");
  $(".nav-tablet .hamburger-icon .open-icon").css("display", "block");
  $(".nav-tablet .hamburger-icon .close-icon").css("display", "none");
  $("#nav-coverage-title").find(".add-minus-vert").addClass("turn");
  var navTabletOpen = false;

  $(".nav-tablet .hamburger").on("click", function () {
    if (navTabletOpen === false) {
      $(".nav-tablet .hamburger-icon .open-icon").css("display", "none");
      $(".nav-tablet .hamburger-icon .close-icon").css("display", "block");
      $(".nav-tablet__content").css("display", "block");
      $(".theme-taupe .nav-tablet .hamburger").css(
        "background-color",
        "#FFFFFE"
      );
      $(".theme-blue .nav-tablet .hamburger").css(
        "background-color",
        "#21303E"
      );
      $(".theme-green .nav-tablet .hamburger").css(
        "background-color",
        "#076853"
      );
      navTabletOpen = true;
    } else if (navTabletOpen === true) {
      $(".nav-tablet .hamburger-icon .open-icon").css("display", "block");
      $(".nav-tablet .hamburger-icon .close-icon").css("display", "none");
      $(".nav-tablet__content").css("display", "none");
      $(".theme-taupe .nav-tablet .hamburger").css(
        "background-color",
        "inherit"
      );
      $(".theme-blue .nav-tablet .hamburger").css(
        "background-color",
        "inherit"
      );
      $(".theme-green .nav-tablet .hamburger").css(
        "background-color",
        "inherit"
      );
      navTabletOpen = false;
    }
  });

  $(
    "#nav-coverage-title, #nav-company-title, #nav-community-title, #nav-stage-title, #nav-vertical-title"
  ).on("click", function () {
    if ($(this).hasClass("open")) {
    } else {
      $(".turn").removeClass("turn");
      $(".nav-tablet__title").removeClass("open");
      $(this).addClass("open");
      $(".nav-tablet__wrapper").animate({ "max-height": 0 }, 300, "swing");
      $(".open")
        .siblings(".nav-tablet__wrapper")
        .animate({ "max-height": 1000 }, 300, "swing");
      $(".open").find(".add-minus-vert").addClass("turn");
    }
  });

  //MOBILE
  $(".nav-mobile .hamburger-icon .open-icon").css("display", "block");
  $(".nav-mobile .hamburger-icon .close-icon").css("display", "none");
  $("#nav-coverage-title-mobile").find(".add-minus-vert").addClass("turn");
  var navMobileOpen = false;

  $(".nav-mobile .hamburger").on("click", function () {
    if (navMobileOpen === false) {
      $(".nav-mobile .hamburger-icon .open-icon").css("display", "none");
      $(".nav-mobile .hamburger-icon .close-icon").css("display", "block");
      $(".nav-mobile__content").css("display", "block");
      $(".theme-taupe .nav-mobile .hamburger").css(
        "background-color",
        "#FFFFFE"
      );
      $(".theme-blue .nav-mobile .hamburger").css(
        "background-color",
        "#21303E"
      );
      $(".theme-green .nav-mobile .hamburger").css(
        "background-color",
        "#076853"
      );
      navMobileOpen = true;
    } else if (navMobileOpen === true) {
      $(".nav-mobile .hamburger-icon .open-icon").css("display", "block");
      $(".nav-mobile .hamburger-icon .close-icon").css("display", "none");
      $(".nav-mobile__content").css("display", "none");
      $(".theme-taupe .nav-mobile .hamburger").css(
        "background-color",
        "inherit"
      );
      $(".theme-blue .nav-mobile .hamburger").css(
        "background-color",
        "inherit"
      );
      $(".theme-green .nav-mobile .hamburger").css(
        "background-color",
        "inherit"
      );
      navMobileOpen = false;
    }
  });

  $(
    "#nav-coverage-title-mobile, #nav-company-title-mobile, #nav-community-title-mobile, #nav-stage-title-mobile, #nav-vertical-title-mobile"
  ).on("click", function () {
    if ($(this).hasClass("open")) {
    } else {
      $(".nav-mobile .is-current").removeClass("is-current");
      $(".turn").removeClass("turn");
      $(".nav-mobile__wrapper").animate({ "max-height": 0 }, 300, "swing");
      $(".nav-mobile__title").removeClass("open");
      $(this).addClass("open");
      $(".open")
        .siblings(".nav-mobile__wrapper")
        .animate({ "max-height": 1000 }, 300, "swing")
        .addClass(".is--current");
      $(".open").find(".add-minus-vert").addClass("turn");
    }
  });
}

function checkBreakpoint(x) {
  if (x.matches) {
    // desktop code here
    desktopCode();
  } else {
    // tablet code here
    tabletCode();
  }
}
const matchMediaDesktop = window.matchMedia("(min-width: 1280px)");
checkBreakpoint(matchMediaDesktop);
matchMediaDesktop.addListener(checkBreakpoint);
