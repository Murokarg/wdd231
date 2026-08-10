document.addEventListener("DOMContentLoaded", () => {
  const mealPlanData = JSON.parse(localStorage.getItem("mealPlanData"));

  if (!mealPlanData) {
    window.location.href = "meal-plan.html";
    return;
  }

  const { planData, recipes, targetCalories, goal, days } = mealPlanData;

  const goalNames = {
    "weight-loss": "Weight Loss",
    "muscle-gain": "Muscle Gain",
    "diabetes-control": "Diabetes Control",
    "general-health": "General Health",
  };

  // Show plan summary
  document.getElementById("plan-summary").innerHTML = `
    <div class="summary-card">
      <h3>Your Weekly Meal Plan</h3>
      <p><strong>Goal:</strong> ${goalNames[goal]}</p>
      <p><strong>Target Calories:</strong> ${targetCalories} kcal/day</p>
      <p><strong>Total meals:</strong> ${recipes.length}</p>
    </div>
  `;

  const recipesList = document.getElementById("recipes-list");

  // Group recipes by day
  const recipesByDay = {};
  recipes.forEach(recipe => {
    if (!recipesByDay[recipe.day]) {
      recipesByDay[recipe.day] = [];
    }
    recipesByDay[recipe.day].push(recipe);
  });

  // Display each day with it's recipes
  days.forEach(day => {
    const dayRecipes = recipesByDay[day] || [];
    if (dayRecipes.length === 0) return;

    // Get the daily nutrients (from the first element since all of them have the same)
    const dayNutrients = dayRecipes[0].dayNutrients || {};

    // Creates daily container
    const dayContainer = document.createElement('div');
    dayContainer.className = 'day-container';
    dayContainer.style.marginBottom = '30px';
    dayContainer.style.borderBottom = '2px solid #eee';
    dayContainer.style.paddingBottom = '20px';

    // Title of the day with nutrients
    const dayTitle = document.createElement('h2');
    dayTitle.textContent = day.charAt(0).toUpperCase() + day.slice(1);
    dayTitle.style.color = '#2c3e50';

    const dayNutrientsHTML = `
      <div style="background: #f8f9fa; padding: 10px; border-radius: 8px; margin-bottom: 15px;">
        <p><strong>Daily totals:</strong> 
          ${dayNutrients.calories ? Math.round(dayNutrients.calories) : 'N/A'} kcal | 
          Protein: ${dayNutrients.protein ? Math.round(dayNutrients.protein) : 'N/A'}g | 
          Fat: ${dayNutrients.fat ? Math.round(dayNutrients.fat) : 'N/A'}g | 
          Carbs: ${dayNutrients.carbohydrates ? Math.round(dayNutrients.carbohydrates) : 'N/A'}g
        </p>
      </div>
    `;

    dayContainer.appendChild(dayTitle);
    dayContainer.innerHTML += dayNutrientsHTML;

    // Display each meal of the day 
    dayRecipes.forEach((meal, index) => {
      const mealCard = document.createElement('div');
      mealCard.className = 'recipe-card';
      mealCard.style.marginBottom = '15px';
      mealCard.style.padding = '15px';
      mealCard.style.border = '1px solid #ddd';
      mealCard.style.borderRadius = '8px';
      mealCard.style.backgroundColor = '#fff';

      // Extracts the meal nutrients (if any)
      let calories = "N/A";
      let protein = "N/A";
      if (meal.nutrition && meal.nutrition.length > 0) {
        const cals = meal.nutrition.find(n => n.name === "Calories");
        const prot = meal.nutrition.find(n => n.name === "Protein");
        if (cals) calories = Math.round(cals.amount);
        if (prot) protein = Math.round(prot.amount);
      }

      // Label the type of meal (breakfast, lunch, dinner)
      const mealTypes = ['Breakfast', 'Lunch', 'Dinner'];
      const mealType = meal.mealType || mealTypes[index] || `Meal ${index + 1}`;

      mealCard.innerHTML = `
        <div style="display: flex; align-items: center; gap: 15px; flex-wrap: wrap;">
          <div style="flex: 1; min-width: 200px;">
            <h3 style="margin: 0 0 5px 0;">${meal.title}</h3>
            <p style="margin: 0; color: #666; font-size: 0.9rem;">${mealType}</p>
            <div style="margin-top: 8px;">
              <p><strong>Calories:</strong> ${calories} kcal</p>
              <p><strong>Protein:</strong> ${protein}g</p>
              <p><strong>Ready in:</strong> ${meal.readyInMinutes || 'N/A'} minutes</p>
            </div>
            <a href="${meal.sourceUrl}" target="_blank" style="display: inline-block; margin-top: 10px; color: #3498db; text-decoration: none;">View Full Recipe →</a>
          </div>
          <div style="flex: 0 0 150px;">
            <img src="https://img.spoonacular.com/recipes/${meal.image}" alt="${meal.title}" style="width: 100%; border-radius: 8px;">
          </div>
        </div>
      `;

      dayContainer.appendChild(mealCard);
    });

    recipesList.appendChild(dayContainer);
  });

  // If ther isn't any days, display alternative message
  if (recipes.length === 0) {
    recipesList.innerHTML = `
      <p style="text-align: center; font-size: 1.2rem;">No meals found in your plan. Please try again.</p>
    `;
  }
});

