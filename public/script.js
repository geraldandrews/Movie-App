const searchButton = document.querySelector("button");

document.addEventListener('DOMContentLoaded', function () {
    fetchmovies();
});

function fetchmovies() {

    // MoviesGrid element
    const movieSection = document.getElementById('movie-section');

    // Display loading message
    movieSection.innerHTML = '<p>Loading Movies...</p>'

    const randomSearchTerms = ['action', 'comedy', 'drama', 'adventure'];
    const randomTerm = randomSearchTerms[Math.floor(Math.random() * randomSearchTerms.length)];

    // Fetch movie data from OMDB API with a default search term (e.g., 'popular')
    fetch(`/api?&s=${randomTerm}`)
    .then(response => response.json())
    .then(data => {
        if (data.Search && data.Search.length > 0) {
            moviestoshow(data.Search);
        } else {
            movieSection.innerHTML = '<p>No random movies found!</p>';
        }
    })
    .catch(error => {
        console.error('Error fetching random movies:', error);
        movieSection.innerHTML = '<p>Error fetching movies. Please try again later.</p>';
    });
}

searchButton.addEventListener("click", () => {
    searchMovies();
});

function searchMovies() { 
    const searchInput = document.getElementById('searchInput').value;

    // MoviesGrid element
    const movieSection = document.getElementById('movie-section');

    // Search result validation
    if (searchInput.trim() !== '') {

        // Display loading message
        movieSection.innerHTML = '<p>Loading Movies...</p>'; 

        // Fetch movie data from OMDB API
         fetch(`/api?&s=${searchInput}`)
        .then(response => response.json()) 
        .then(data => {
            if (data.Search && data.Search.length > 0) {
                moviestoshow(data.Search); 
            } else {
                movieSection.innerHTML = '<p>No movies found with the given name</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            movieSection.innerHTML = '<p>Error fetching movies. Please try again later.</p>';
        }); 
    } else {
        alert('Enter a movie title then search!');
    }
}

function moviestoshow(movies) {
    const movieSection = document.getElementById('movie-section');

    // Clear previous results
    movieSection.innerHTML = ''; 

    // Display each movie in the results
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        movieCard.innerHTML = `<img src="${movie.Poster}" alt="${movie.Title}"><h2>${movie.Title}</h2><p>${movie.Year}</p>`;
        movieSection.appendChild(movieCard); 
    });
}


