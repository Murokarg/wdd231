document.addEventListener("DOMContentLoaded", () => {
  // Obtener datos del plan desde localStorage
  const mealPlanData = JSON.parse(localStorage.getItem("mealPlanData"));

  if (!mealPlanData) {
    window.location.href = "meal-plan.html";
    return;
  }

  const { recipes, targetCalories, goal } = mealPlanData;

  // Mostrar resumen
  const goalNames = {
    "weight-loss": "Weight Loss",
    "muscle-gain": "Muscle Gain",
    "diabetes-control": "Diabetes Control",
    "general-health": "General Health",
  };

  document.getElementById("plan-summary").innerHTML = `
                <div class="summary-card">
                    <h3>Plan Summary</h3>
                    <p><strong>Goal:</strong> ${goalNames[goal]}</p>
                    <p><strong>Target Calories:</strong> ${targetCalories} kcal/day</p>
                    <p><strong>Number of Recipes:</strong> ${recipes.length}</p>
                </div>
            `;

  // Mostrar recetas
  const recipesList = document.getElementById("recipes-list");

  recipes.forEach((recipe, index) => {
    const recipeCard = document.createElement("div");
    recipeCard.className = "recipe-card";

    // Extraer información nutricional
    let calories = "N/A";
    let protein = "N/A";

    if (recipe.nutrition && recipe.nutrition.nutrients) {
      const cals = recipe.nutrition.nutrients.find(
        (n) => n.name === "Calories",
      );
      const prot = recipe.nutrition.nutrients.find((n) => n.name === "Protein");

      if (cals) calories = Math.round(cals.amount);
      if (prot) protein = Math.round(prot.amount);
    }

    recipeCard.innerHTML = `
                    <h3>Day ${index + 1}: ${recipe.title}</h3>
                    <div class="recipe-image">
                        <img src="${recipe.image}" alt="${recipe.title}">
                    </div>
                    <div class="recipe-info">
                        <p><strong>Calories:</strong> ${calories} kcal</p>
                        <p><strong>Protein:</strong> ${protein}g</p>
                        <p><strong>Ready in:</strong> ${recipe.readyInMinutes} minutes</p>
                    </div>
                    <a href="${recipe.sourceUrl}" target="_blank" class="recipe-link">View Full Recipe</a>
                `;

    recipesList.appendChild(recipeCard);
  });
});
