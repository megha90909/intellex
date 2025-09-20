document.addEventListener('DOMContentLoaded', () => {
    // Hide all sections initially except the first one
    const sections = document.querySelectorAll('.survey-section');
    sections.forEach(section => {
        if (!section.classList.contains('active')) {
            section.style.display = 'none';
        }
    });
});

function nextSection(currentId, nextId) {
    const currentSection = document.getElementById(currentId);
    const nextSection = document.getElementById(nextId);

     if (currentSection) {
    currentSection.style.display = 'none';
    currentSection.classList.remove('active');
     }
    if (nextSection) {
    nextSection.style.display = 'block';
    nextSection.classList.add('active');
}
}
function submitForm() {
    // Collect all data from the forms
    const personalData = {
        age: document.getElementById('personal-info').querySelector('input[placeholder="Age"]').value,
        gender: document.getElementById('personal-info').querySelector('input[placeholder="male/female"]').value,
        height: document.getElementById('personal-info').querySelector('input[placeholder="height (cm)"]').value,
        weight: document.getElementById('personal-info').querySelector('input[placeholder="weight (kg)"]').value
    };
    const healthData = {
        allergies: document.querySelector('#health-info input[placeholder="Any allergies"]').value,
        medicalHistory: document.querySelector('#health-info textarea').value,
        conditions: document.querySelector('#health-info input[placeholder="blood pressure/diabetes (yes/no)"]').value,
        exercise: document.querySelector('#health-info input[placeholder="do you exercise? (yes or no)"]').value
    };
    const dietaryData = {
        diet: document.querySelector('#dietary-info input[placeholder="Do you follow a specific diet? (e.g., vegetarian, vegan, keto)"]').value,
        foodAllergies: document.querySelector('#dietary-info input[placeholder="Do you have any food allergies?"]').value,
        snacking: document.querySelector('#dietary-info input[placeholder="Do you snack between meals?"]').value,
        restaurants: document.querySelector('#dietary-info input[placeholder="Do you frequently eat at restaurants?"]').value,
        spicy: document.querySelector('#dietary-info input[placeholder="Do you prefer spicy foods?"]').value,
        sweet: document.querySelector('#dietary-info input[placeholder="Do you prefer sweet foods?"]').value,
        meat: document.querySelector('#dietary-info input[placeholder="Do you have a preference for certain types of meat?"]').value
    };

    const goalData = {
        medicalConditions: document.querySelector('#goals textarea[placeholder="do you have any existing medical conditions? explain in detail"]').value,
        goals: document.querySelector('#goals textarea[placeholder="what are your future goals please explain in detail"]').value
    };

    // ... collect data from other sections

    const allData = {
        personalData,
        // ... other data
    };

    // Here, you would send this data to a backend server.
    // The backend would use an AI model (like a Flask/Python server with a machine learning model)
    // to process this data and generate a diet plan.
    console.log('Form data submitted:', allData);

    // Simulate a successful submission
    alert('Thank you! Your personalized diet plan is being generated.');
    // Redirect to a results page or show the plan on the same page.
}

function handleSignup(event) {
    // Prevents the form from submitting and reloading the page
    event.preventDefault();

    // In a real application, you would add code here to:
    // 1. Validate the form inputs (e.g., check for valid email format)
    // 2. Send the user data to your backend for account creation
    // 3. Handle success or error responses from the server

    // For now, we'll just simulate a successful signup and redirect.
    // Redirect the user to the survey page
    window.location.href = 'survey.html';
}

// This function sends data to the Flask backend server
async function displayDietPlan(userData) {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/generate-plan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Failed to get a response from the AI server.');
        }

        const dietPlan = await response.json();

        console.log("Received AI-generated diet plan:", dietPlan);

        // Call a function to display the plan on the page
        displayDietPlan(dietPlan);

    } catch (error) {
        console.error("Error connecting to backend:", error);
        alert("Sorry, there was an error generating your plan. Please try again later.");
    }
}

// Function to display the diet plan on the page
function displayDietPlan(plan) {
    const planDisplayDiv = document.getElementById('plan-display');
   
     // Clear any previous content
    planDisplayDiv.innerHTML = '';

    // Create and append HTML for the plan
    const breakfast = document.createElement('p');
    breakfast.innerHTML = `<strong>Breakfast:</strong> ${plan.breakfast}`;
    planDisplayDiv.appendChild(breakfast);

    const lunch = document.createElement('p');
    lunch.innerHTML = `<strong>Lunch:</strong> ${plan.lunch}`;
    planDisplayDiv.appendChild(lunch);
    
    // ... add more elements for dinner and snacks
}


// Ensure your submitForm function calls this sendToAI function
function submitForm() {
    // ... (rest of your form data collection code) ...
    const allData = {
        // ... (all the collected data) ...
    };

    console.log("Collected user data:", allData);

    // Call the function to send data to the backend
    sendToAI(allData);
}