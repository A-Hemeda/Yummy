/// <reference types="../@types/jquery" />
// ? =============> Global ===============>
const search = document.getElementById("search");
const contact = document.getElementById("contact");
const categories = document.getElementById("categories");
const Filter = document.getElementById("Filter");
const area = document.getElementById("area");
const ingredients = document.getElementById("ingredients");
const btnSerch = document.getElementById("btnSerch");
const btnCategories = document.getElementById("btnCategories");
const btnContact = document.getElementById("btnContact");
const btnArea = document.getElementById("btnArea");
const btnIngredients = document.getElementById("btnIngredients");

// * =============> Events ===============>
$(".menuIcon").on("click", function () {
  $(this).toggleClass("fa-bars fa-xmark");
  $("#inner-box").animate({ width: "toggle" }, 500);

  if ($(".menuIcon").hasClass("fa-bars")) {
    $(".links ul ").addClass("animate__animated animate__fadeOutDownBig");
    $(".links ul li").each(function (index) {
      $(this)
        .removeClass("animate__fadeInUpBig")
        .css("animation-delay", index * 10 + "ms");
    });
  } else {
    $(".links ul ").removeClass("animate__fadeOutDownBig");
    $(".links ul li").each(function (index) {
      $(this)
        .addClass("animate__animated animate__fadeInUpBig")
        .css("animation-delay", index * 50 + "ms");
    });
  }
});

btnSerch.addEventListener("click", function () {
  search.classList.replace("d-none", "d-block");
  categories.classList.replace("d-block", "d-none");
  contact.classList.replace("d-block", "d-none");
  area.classList.replace("d-block", "d-none");

  document.getElementById("Filter").classList.replace("d-block", "d-none");
  document.getElementById("details").classList.replace("d-block", "d-none");
  document.getElementById("AreaFilter").classList.replace("d-block", "d-none");
  document.getElementById("ingredients").classList.replace("d-block", "d-none");
  document.getElementById("openMeals").classList.replace("d-block", "d-none");

  clearData();
  $(".menuIcon").toggleClass("fa-bars fa-xmark");
  $("#inner-box").animate({ width: "toggle" }, 500);

  console.log("search");
});

btnArea.addEventListener("click", function () {
  clearData();
  getArea();
  area.classList.replace("d-none", "d-block");
  search.classList.replace("d-block", "d-none");
  contact.classList.replace("d-block", "d-none");
  categories.classList.replace("d-block", "d-none");
  document.getElementById("Filter").classList.replace("d-block", "d-none");
  document.getElementById("details").classList.replace("d-block", "d-none");
  document.getElementById("AreaFilter").classList.replace("d-block", "d-none");
  document.getElementById("ingredients").classList.replace("d-block", "d-none");
  document.getElementById("openMeals").classList.replace("d-block", "d-none");

  $(".menuIcon").toggleClass("fa-bars fa-xmark");
  $("#inner-box").animate({ width: "toggle" }, 500);
  console.log("Area");
});

btnCategories.addEventListener("click", function () {
  clearData();
  getCategories();
  categories.classList.replace("d-none", "d-block");
  search.classList.replace("d-block", "d-none");
  contact.classList.replace("d-block", "d-none");
  area.classList.replace("d-block", "d-none");

  document.getElementById("Filter").classList.replace("d-block", "d-none");
  document.getElementById("details").classList.replace("d-block", "d-none");
  document.getElementById("AreaFilter").classList.replace("d-block", "d-none");
  document.getElementById("ingredients").classList.replace("d-block", "d-none");
  document.getElementById("openMeals").classList.replace("d-block", "d-none");

  $(".menuIcon").toggleClass("fa-bars fa-xmark");
  $("#inner-box").animate({ width: "toggle" }, 500);
  console.log("categories");
});

btnContact.addEventListener("click", function () {
  contact.classList.replace("d-none", "d-block");
  search.classList.replace("d-block", "d-none");
  categories.classList.replace("d-block", "d-none");
  area.classList.replace("d-block", "d-none");
  document.getElementById("Filter").classList.replace("d-block", "d-none");
  document.getElementById("details").classList.replace("d-block", "d-none");
  document.getElementById("AreaFilter").classList.replace("d-block", "d-none");
  document.getElementById("ingredients").classList.replace("d-block", "d-none");
  document.getElementById("openMeals").classList.replace("d-block", "d-none");

  clearData();
  $(".menuIcon").toggleClass("fa-bars fa-xmark");
  $("#inner-box").animate({ width: "toggle" }, 500);
  console.log("contact");
});

btnIngredients.addEventListener("click", function () {
  clearData();
  getIngredients();
  ingredients.classList.replace("d-none", "d-block");
  contact.classList.replace("d-block", "d-none");
  search.classList.replace("d-block", "d-none");
  categories.classList.replace("d-block", "d-none");
  area.classList.replace("d-block", "d-none");
  document.getElementById("Filter").classList.replace("d-block", "d-none");
  document.getElementById("details").classList.replace("d-block", "d-none");
  document.getElementById("AreaFilter").classList.replace("d-block", "d-none");
  document.getElementById("openMeals").classList.replace("d-block", "d-none");

  $(".menuIcon").toggleClass("fa-bars fa-xmark");
  $("#inner-box").animate({ width: "toggle" }, 500);
  console.log("ingredients");
});
