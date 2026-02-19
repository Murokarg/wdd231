// ------------------------------
// 1. TESTIMONIALS CAROUSEL
// ------------------------------

// Array of testimonials (replace with real testimonials in production)
const testimonials = [
    {
        text: "NutriSync completely transformed my meal prep routine! I've lost 15 pounds in 3 months following the personalized plans. The recipes are delicious and easy to prepare.",
        author: "Sarah J., 34"
    },
    {
        text: "As someone with diabetes, finding suitable meal plans was always a challenge. NutriSync's diabetes-friendly options have helped me maintain stable blood sugar levels while enjoying great food.",
        author: "Michael R., 52"
    },
    {
        text: "I was struggling to gain muscle mass until I found NutriSync. The protein-rich meal plans and calorie tracking helped me gain 10 pounds of lean muscle in just 2 months!",
        author: "David T., 28"
    },
    {
        text: "The personalized approach is what sets NutriSync apart. Unlike generic meal plans, this actually considers my age, weight, and goals. I've never felt better!",
        author: "Emma L., 41"
    },
    {
        text: "As a busy mom, meal prep seemed impossible. NutriSync's weekly plans save me hours in the kitchen while ensuring my family eats healthy. My kids even love the recipes!",
        author: "Jennifer K., 37"
    }
];

let currentTestimonialIndex = 0;
const testimonialTextElement = document.querySelector('.testimonial-container p');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

// Function to show current testimonial
function showTestimonial(index) {
    if (!testimonialTextElement) return;
    
    const testimonial = testimonials[index];
    testimonialTextElement.textContent = `"${testimonial.text}" — ${testimonial.author}`;
}

// Function for previous testimonial
function prevTestimonial() {
    currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonialIndex);
}

// Function for next testimonial
function nextTestimonial() {
    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
    showTestimonial(currentTestimonialIndex);
}

// Event listeners for carousel buttons
if (prevBtn) {
    prevBtn.addEventListener('click', prevTestimonial);
}

if (nextBtn) {
    nextBtn.addEventListener('click', nextTestimonial);
}

// Change testimonial automatically every 8 seconds
setInterval(nextTestimonial, 8000);

// Show first testimonial on load
document.addEventListener('DOMContentLoaded', () => {
    if (testimonialTextElement) {
        showTestimonial(currentTestimonialIndex);
    }
});

// ------------------------------
// 2. SPOONACULAR API INTEGRATION
// ------------------------------

// Your Spoonacular API Key (REPLACE THIS WITH YOUR OWN KEY!)
// Get your free key here: https://spoonacular.com/food-api/console
const SPOONACULAR_API_KEY = 'efd22470bdc249e89eb0b66f1e1636a0 ';
const SPOONACULAR_BASE_URL = 'https://api.spoonacular.com';

// Function to calculate caloric needs (Mifflin-St Jeor formula)
function calculateCalories(age, weight, gender, goal) {
    // Simplified formula for TDEE calculation (Total Daily Energy Expenditure)
    // Based on weight, age, gender and activity level (we assume light activity)
    
    let bmr;
    
    if (gender === 'male') {
        // Men: BMR = (10 × weight) + (6.25 × height) - (5 × age) + 5
        // We assume average height of 175cm for simplification
        bmr = (10 * weight) + (6.25 * 175) - (5 * age) + 5;
    } else {
        // Women: BMR = (10 × weight) + (6.25 × height) - (5 × age) - 161
        // We assume average height of 162cm for simplification
        bmr = (10 * weight) + (6.25 * 162) - (5 * age) - 161;
    }
    
    // Activity factor (1.375 = light activity)
    const tdee = bmr * 1.375;
    
    // Adjust according to goal
    let targetCalories;
    
    switch(goal) {
        case 'weight-loss':
            targetCalories = tdee - 500; // 500 calorie deficit
            break;
        case 'muscle-gain':
            targetCalories = tdee + 300; // 300 calorie surplus
            break;
        case 'diabetes-control':
            targetCalories = tdee - 200; // Moderate deficit
            break;
        case 'general-health':
            targetCalories = tdee;
            break;
        default:
            targetCalories = tdee;
    }
    
    return Math.round(targetCalories);
}

// Function to get recipes from Spoonacular API
async function getMealPlanFromAPI(age, weight, gender, goal) {
    try {
        // Calculate target calories
        const targetCalories = calculateCalories(age, weight, gender, goal);
        
        // Determine diet according to goal
        let dietType = '';
        let minProtein = 20;
        
        switch(goal) {
            case 'weight-loss':
                dietType = 'lowCarbs';
                minProtein = 30;
                break;
            case 'muscle-gain':
                dietType = '';
                minProtein = 40;
                break;
            case 'diabetes-control':
                dietType = 'lowGlycemic';
                minProtein = 25;
                break;
            case 'general-health':
                dietType = '';
                minProtein = 20;
                break;
        }
        
        // Build search parameters
        const params = new URLSearchParams({
            apiKey: SPOONACULAR_API_KEY,
            number: 7, // 7 recipes (one per day)
            addRecipeInformation: 'true',
            addRecipeNutrition: 'true'
        });
        
        // Add filters according to goal
        if (dietType) {
            params.append('diet', dietType);
        }
        
        // Caloric range (±200 calories from target)
        const minCalories = Math.max(200, targetCalories - 200);
        const maxCalories = targetCalories + 200;
        
        params.append('minCalories', minCalories);
        params.append('maxCalories', maxCalories);
        params.append('minProtein', minProtein);
        
        // Make API call
        const response = await fetch(`${SPOONACULAR_BASE_URL}/recipes/complexSearch?query=${params}&apiKey=${SPOONACULAR_API_KEY}`);
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        
        const data = await response.json();
        
        return {
            recipes: data.results,
            targetCalories: targetCalories,
            goal: goal
        };
        
    } catch (error) {
        console.error('Error fetching meal plan:', error);
        throw error;
    }
}

// Function to display the meal plan
function displayMealPlan(mealPlanData) {
    // Redirect to a results page (meal-plan-results.html) and pass the meal plan data
    // For now, we save in localStorage and redirect
    localStorage.setItem('mealPlanData', JSON.stringify(mealPlanData));
    window.location.href = 'meal-plan-results.html';
}

// ------------------------------
// 3. FORM HANDLING
// ------------------------------

// Main form (index.html)
const userForm = document.getElementById('user-form');

if (userForm) {
    userForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form values
        const age = parseInt(document.getElementById('age').value);
        const weight = parseInt(document.getElementById('weight').value);
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const goal = document.getElementById('goal').value;
        
        // Basic validation
        if (age < 18 || age > 100) {
            alert('Please enter a valid age (18-100)');
            return;
        }
        
        if (weight < 30 || weight > 200) {
            alert('Please enter a valid weight (30-200 kg)');
            return;
        }
        
        // Show loading message
        const submitBtn = userForm.querySelector('.cta-button');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Generating Plan...';
        submitBtn.disabled = true;
        
        try {
            // Get meal plan
            const mealPlan = await getMealPlanFromAPI(age, weight, gender, goal);
            
            // Show result
            displayMealPlan(mealPlan);
            
        } catch (error) {
            console.error('Error generating meal plan:', error);
            alert('Sorry, there was an error generating your meal plan. Please try again.');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Contact form
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get values
        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const message = document.getElementById('contact-message').value;
        
        // For now, just show in console (in production, send to server)
        console.log('Contact Form Submission:', { name, email, message });
        
        // Show success message
        alert(`Thank you ${name}! We'll get back to you at ${email} soon.`);
        
        // Reset form
        contactForm.reset();
    });
}

// Form from meal-plan.html
const planForm = document.getElementById('plan-form');

if (planForm) {
    planForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get values
        const age = parseInt(document.getElementById('age').value);
        const weight = parseInt(document.getElementById('weight').value);
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const goal = document.getElementById('goal').value;
        
        // Validation
        if (age < 18 || age > 100) {
            alert('Please enter a valid age (18-100)');
            return;
        }
        
        if (weight < 30 || weight > 200) {
            alert('Please enter a valid weight (30-200 kg)');
            return;
        }
        
        // Show loading message
        const submitBtn = planForm.querySelector('.plan-button');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Generating...';
        submitBtn.disabled = true;
        
        try {
            // Get meal plan from API
            const mealPlan = await getMealPlanFromAPI(age, weight, gender, goal);
            
            // Show result
            displayMealPlan(mealPlan);
            
        } catch (error) {
            console.error('Error generating meal plan:', error);
            alert('Sorry, there was an error. Please try again.');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// ------------------------------
// 4. ADDITIONAL UTILITIES
// ------------------------------

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
