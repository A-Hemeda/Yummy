/// <reference types="../@types/jquery" />
const loader = document.querySelector(".loading");
// ! =============> Functions ===============>

async function getCategories() {
  loader.classList.remove("d-none");
  const api = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  const response = await api.json();
  const categories = response.categories;
  displayCategories(categories);
  loader.classList.add("d-none");
}

function displayCategories(categoriesData) {
  let categoriesBox = ``;
  for (let i = 0; i < categoriesData.length; i++) {
    // Truncate the description to 20 words
    const truncatedDescription = truncateText(
      categoriesData[i].strCategoryDescription,
      20
    );

    categoriesBox += `
      <div class="col-lg-3 col-md-6 col-12">
        <figure class="position-relative overflow-hidden rounded-3 border-0 " onclick="showCategoriesFilter('${categoriesData[i].strCategory}')">
          <img src="${categoriesData[i].strCategoryThumb}" alt="yummy" class="img-fluid">
          <figcaption class="caption position-absolute justify-content-center text-center">
            <h3>${categoriesData[i].strCategory}</h3>
            <p>${truncatedDescription}</p>
          </figcaption>
        </figure>
      </div>
    `;
  }
  document.getElementById("categoriesBox").innerHTML = categoriesBox;
}

// Function to truncate text to a specified number of words
function truncateText(text, maxWords) {
  const words = text.split(" ");
  const truncatedWords = words.slice(0, maxWords);
  return truncatedWords.join(" ");
}

async function getCategoriesFilter(categoryName) {
  loader.classList.remove("d-none");
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
  );
  const response = await api.json();

  categories.classList.replace("d-block", "d-none");
  document.getElementById("Filter").classList.replace("d-none", "d-block");
  document.getElementById("area").classList.replace("d-block", "d-none");
  document.getElementById("ingredients").classList.replace("d-block", "d-none");
  
  displayCategoriesFilter(response.meals.slice(0, 20)); // Display only the first 20 meals
  loader.classList.add("d-none");

  console.log(response);
}

// Display categoriesFilter
function displayCategoriesFilter(categoriesData) {
  let categoriesFilterHTML = ""; // Use a variable to store the HTML

  for (let i = 0; i < categoriesData.length; i++) {
    categoriesFilterHTML += `
      <div class="col-lg-3 col-md-6 col-12">
        <figure class="position-relative overflow-hidden rounded-3 border-0 " onclick="showDetailsMeal('${categoriesData[i].idMeal}')">
          <img src="${categoriesData[i].strMealThumb}" alt="yummy" class="img-fluid">
          <figcaption class="caption position-absolute justify-content-center text-center">
            <h3>${categoriesData[i].strMeal}</h3>
          </figcaption>
        </figure>
      </div>
    `;
  }

  const container = document.getElementById("categoriesFilter");
  container.innerHTML = categoriesFilterHTML;
}

function showCategoriesFilter(categoryName) {
  console.log("Category Name:", categoryName);
  getCategoriesFilter(categoryName);
}

async function getDetailsMeal(idMeal) {
  loader.classList.remove("d-none");

  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
  );
  const response = await api.json();
  displayDetailsMeal(response.meals);

  categories.classList.replace("d-block", "d-none");
  document.getElementById("openMeals").classList.replace("d-block", "d-none");
  document.getElementById("search").classList.replace("d-block", "d-none");
  document.getElementById("AreaFilter").classList.replace("d-block", "d-none");
  document.getElementById("ingredients").classList.replace("d-block", "d-none");
  document.getElementById("area").classList.replace("d-block", "d-none");
  document.getElementById("Filter").classList.replace("d-block", "d-none");
  document.getElementById("details").classList.replace("d-none", "d-block");
  document.getElementById("mealName").value = "";
  document.getElementById("mealFirst").value="";
  document.getElementById("mealFilter").innerHTML = "";
  loader.classList.add("d-none");

  console.log(response);
}

function displayDetailsMeal(DetailsMealData) {
  let DetailsMealDataHTML = ""; // Use a variable to store the HTML

  for (let i = 0; i < DetailsMealData.length; i++) {
    const tags = DetailsMealData[i].strTags
      ? DetailsMealData[i].strTags.split(",")
      : [];
    const ingredients = getIngredientsList(DetailsMealData[i]);

    DetailsMealDataHTML += `
      <div class="col-md-4 col-12">
        <figure>
          <img src="${
            DetailsMealData[i].strMealThumb
          }" alt="meal" class="rounded-2">
        </figure>
        <h2 class=" text-white">${DetailsMealData[i].strMeal}</h2>
      </div>
      <div class="col-md-8 col-12 text-white">
        <figcaption>
          <h2>Instructions</h2>
          <p>${DetailsMealData[i].strInstructions}</p>
          <ul class="list-unstyled fs-3 fw-bold">
            <li>Area : ${DetailsMealData[i].strArea}</li>
            <li>Category : ${DetailsMealData[i].strCategory}</li>
            <li>
              Recipes :
              <div class="d-flex flex-wrap">
                ${ingredients
                  .map(
                    (ingredient) => `
                  <span style="color: #055160; background-color: #cff4fc" class="me-3 rounded-2 p-2 my-2 fs-6 fw-normal">${ingredient}</span>
                `
                  )
                  .join(" ")}
              </div>
            </li>
            <li>
              Tags :
              <div class="d-flex flex-wrap">
                ${tags
                  .map(
                    (tag) => `
                  <span style="color: #842029; background-color:#F8D7DA" class="me-3 rounded-2 p-1 my-2 fs-6 fw-normal">${tag.trim()}</span>
                `
                  )
                  .join(" ")}
              </div>
            </li>
            <li>
              <button type="button" class="btn btn-success">
                <a href="${
                  DetailsMealData[i].strSource
                }" target="_blank">Success</a>
              </button>
              <button type="button" class="btn btn-danger">
                <a href="${
                  DetailsMealData[i].strYoutube
                }" target="_blank">YouTube</a>
              </button>
            </li>
          </ul>
        </figcaption>
      </div>
    `;
  }

  const container = document.getElementById("detailsMeal");
  container.innerHTML = DetailsMealDataHTML;
}

// Function to get the list of ingredients
function getIngredientsList(mealData) {
  
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = mealData[`strIngredient${i}`];
    const measure = mealData[`strMeasure${i}`];

    if (ingredient && measure) {
      ingredients.push(`${measure} ${ingredient}`);
    } else if (ingredient) {
      ingredients.push(ingredient);
    }
  }
  return ingredients;
}

function showDetailsMeal(idMeal) {
  console.log("Meal id:", idMeal);
  getDetailsMeal(idMeal);
}

// ? =============> Area ==============>
async function getArea() {
  loader.classList.remove("d-none");
  try {
    const api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    );
    const response = await api.json();
    displayArea(response.meals);
    console.log(response);
  } catch (error) {
    console.error("Error fetching area list:", error);
  }
  loader.classList.add("d-none");

}

function displayArea(AreaData) {
  let AreaHTML = "";
  for (let i = 0; i < AreaData.length; i++) {
    AreaHTML += `
      <div class="col-md-3 col-12 area">
        <div class="rounded-2 text-center cursor-pointer text-white" onclick="showMealDetails('${AreaData[i].strArea}')">
          <i class="fa-solid fa-house-laptop fa-4x "></i>
          <h3>${AreaData[i].strArea}</h3>
        </div>
      </div>
    `;
  }

  const container = document.getElementById("areaBox");
  container.innerHTML = AreaHTML;
}

async function getMealsByArea(strArea) {
  loader.classList.remove("d-none");

  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${strArea}`
  );
  const response = await api.json();

  const area = response.meals;
  displayMealsByArea(area);

  categories.classList.replace("d-block", "d-none");
  document.getElementById("AreaFilter").classList.replace("d-none", "d-block");
  document.getElementById("area").classList.replace("d-block", "d-none");
  document.getElementById("Filter").classList.replace("d-block", "d-none");
  loader.classList.add("d-none");

  console.log(area);
}
function displayMealsByArea(mealsData) {
  let mealsHTML = "";

  for (let i = 0; i < mealsData.length; i++) {
    mealsHTML += `
      <div class="col-lg-3 col-md-6 col-12">
        <figure class="position-relative overflow-hidden cursor-pointer rounded-3 border-0" onclick="showDetailsMeal('${mealsData[i].idMeal}')">
          <img src="${mealsData[i].strMealThumb}" alt="yummy" class="img-fluid">
          <figcaption class="caption position-absolute justify-content-center text-center">
            <h3>${mealsData[i].strMeal}</h3>
          </figcaption>
        </figure>
      </div>
    `;
  }

  const container = document.getElementById("AreaMealsFilter");
  container.innerHTML = mealsHTML;
}

function showMealDetails(strArea) {
  loader.classList.remove("d-none");
  console.log("Meal Area:", strArea);
  getMealsByArea(strArea);
  loader.classList.remove("d-none");

}

// ?===========> ingredients =============>
async function getIngredients() {
  loader.classList.remove("d-none");
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  const response = await api.json();

  const area = response.meals;
  displayIngredients(response.meals.slice(0, 20));
  loader.classList.add("d-none");

  // console.log(area);
}

function displayIngredients(ingredientsData) {
  let ingredientsHTML = "";

  for (let i = 0; i < ingredientsData.length; i++) {
    // Truncate the description to 20 words
    const truncatedDescription = truncateText(
      ingredientsData[i].strDescription,
      20
    );

    ingredientsHTML += `
    <div class="col-lg-3 col-md-6 col-12 text-white ingredients" onclick="showIngredientsFilter('${ingredientsData[i].strIngredient}')">
    <div class="rounded-2 text-center cursor-pointer">
      <i class="fa-solid fa-drumstick-bite fa-4x"></i>
      <h3>${ingredientsData[i].strIngredient}</h3>
      <p>${truncatedDescription}</p>
    </div>
  </div>
    `;
  }

  const container = document.getElementById("ingredientsDetailsMeal");
  container.innerHTML = ingredientsHTML;
}

async function getIngredientsFilter(ingredientsName) {
  loader.classList.remove("d-none");

  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientsName}`
  );
  const response = await api.json();
  displayIngredientsFilter(response.meals.slice(0, 20)); // Display only the first 20 meals

  categories.classList.replace("d-block", "d-none");
  document.getElementById("Filter").classList.replace("d-none", "d-block");
  document.getElementById("area").classList.replace("d-block", "d-none");
  document.getElementById("ingredients").classList.replace("d-block", "d-none");
  loader.classList.add("d-none");

  console.log(response);
}

// Display ingredientsFilter
function displayIngredientsFilter(ingredientsData) {
  let ingredientsFilterHTML = ""; // Use a variable to store the HTML

  for (let i = 0; i < ingredientsData.length; i++) {
    ingredientsFilterHTML += `
      <div class="col-lg-3 col-md-6 col-12">
        <figure class="position-relative overflow-hidden rounded-3 border-0 " onclick="showDetailsMeal('${ingredientsData[i].idMeal}')">
          <img src="${ingredientsData[i].strMealThumb}" alt="yummy" class="img-fluid">
          <figcaption class="caption position-absolute justify-content-center text-center">
            <h3>${ingredientsData[i].strMeal}</h3>
          </figcaption>
        </figure>
      </div>
    `;
  }

  const container = document.getElementById("categoriesFilter");
  container.innerHTML = ingredientsFilterHTML;
}

function showIngredientsFilter(ingredientsName) {
  console.log("Ingredient Name:", ingredientsName);
  loader.classList.remove("d-none");
  getIngredientsFilter(ingredientsName);
  loader.classList.add("d-none");

}

// ? ===========> Search ==============>

async function getMealName(mealName) {
  loader.classList.remove("d-none");

  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
  );
  const response = await api.json();

  const meals = response.meals;
  displayMealsByName(meals);
  loader.classList.add("d-none");

  // Clear the input field after displaying meals
  console.log(meals);
}

function displayMealsByName(mealData) {
  let mealHTML = "";

  if (mealData) {
    for (let i = 0; i < mealData.length; i++) {
      mealHTML += `
        <div class="col-lg-3 col-md-6 col-12">
          <figure class="position-relative overflow-hidden cursor-pointer rounded-3 border-0" onclick="showDetailsMeal('${mealData[i].idMeal}')">
            <img src="${mealData[i].strMealThumb}" alt="yummy" class="img-fluid">
            <figcaption class="caption position-absolute justify-content-center text-center">
              <h3>${mealData[i].strMeal}</h3>
            </figcaption>
          </figure>
        </div>
      `;
    }
  } else {
    mealHTML = "<p>No meals found for the given search term.</p>";
  }

  const container = document.getElementById("mealFilter");
  container.innerHTML = mealHTML;
}

document.getElementById("mealName").addEventListener("keyup", function (e) {
  getMealName(e.target.value);
});

// Search by FirstLetter
async function getMealFirstLetter(mealFirstLetter) {
  loader.classList.remove("d-none");

  try {
    // If no letter is entered, default to the letter "L"
    const letter = mealFirstLetter || 'a';

    const api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
    );
    const response = await api.json();

    const meals = response.meals;
    displayMealsByFirstLetter(meals);
    loader.classList.add("d-none");

    // console.log(meals);
  } catch (error) {
    console.error("Error fetching meals:", error);
  }
}

function displayMealsByFirstLetter(mealFirstLetterData) {
  let mealHTML = "";

  if (mealFirstLetterData) {
    for (let i = 0; i < mealFirstLetterData.length; i++) {
      mealHTML += `
        <div class="col-lg-3 col-md-6 col-12">
          <figure class="position-relative overflow-hidden cursor-pointer rounded-3 border-0" onclick="showDetailsMeal('${mealFirstLetterData[i].idMeal}')">
            <img src="${mealFirstLetterData[i].strMealThumb}" alt="yummy" class="img-fluid">
            <figcaption class="caption position-absolute justify-content-center text-center">
              <h3>${mealFirstLetterData[i].strMeal}</h3>
            </figcaption>
          </figure>
        </div>
      `;
    }
  } else {
    mealHTML = "<p>No meals found for the given search term.</p>";
  }

  const container = document.getElementById("mealFilter");
  container.innerHTML = mealHTML;
}

document.getElementById("mealFirst").addEventListener("input", function (e) {
  const input = e.target;
  const maxLength = 1;

  if (input.value.length > maxLength) {
    input.value = input.value.slice(0, maxLength);
  }
  getMealFirstLetter(e.target.value)
});

// ? ============>  first open website ==========>

async function getMeal() {
  loader.classList.remove("d-none");

  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=`
  );
  const response = await api.json();

  const meals = response.meals;
  displayMeals(meals);
  loader.classList.add("d-none");

  // console.log(meals);
}

function displayMeals(mealData) {
  let mealHTML = "";

    for (let i = 0; i < mealData.length; i++) {
      mealHTML += `
        <div class="col-lg-3 col-md-6 col-12">
          <figure class="position-relative overflow-hidden cursor-pointer rounded-3 border-0" onclick="showDetailsMeal('${mealData[i].idMeal}')">
            <img src="${mealData[i].strMealThumb}" alt="yummy" class="img-fluid">
            <figcaption class="caption position-absolute justify-content-center text-center">
              <h3>${mealData[i].strMeal}</h3>
            </figcaption>
          </figure>
        </div>
      `;
    }
  const container = document.getElementById("OpenMealFilter");
  container.innerHTML = mealHTML;
}

getMeal();