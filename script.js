document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const searchResults = document.getElementById('searchResults');

    searchBtn.addEventListener('click', () => {
        const foodName = searchInput.value.trim();
        if (foodName === '') {
            alert('Enter a food name to search');
            return;
        }

        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.meals) {
                    displayResults(data.meals);
                } else {
                    alert('No food found');
                    clearResults();
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    });

    function displayResults(meals) {
        clearResults();
        meals.forEach((meal) => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');
            recipeCard.innerHTML = `
                <h2>${meal.strMeal}</h2>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <a href="${meal.strYoutube}" target="_blank" rel="noopener noreferrer">Watch Video</a>
            `;
            searchResults.appendChild(recipeCard);
        });
    }

    function clearResults() {
        searchResults.innerHTML = '';
    }
});
