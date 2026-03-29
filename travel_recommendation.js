// Animation for navbar when scrolling

const searchGroup = document.getElementById('searchGroup');
const navBar = document.getElementsByTagName('nav')[0];

window.addEventListener('scroll', () => {
    if (window.scrollY > 100){
        searchGroup.classList.add('hidden');
        navBar.classList.add('scrolled');
    } else {
        searchGroup.classList.remove('hidden');
        navBar.classList.remove('scrolled');
    }
});

// Form submit

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
})

// Fetch api data

const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');
const resultsFound = document.getElementById('resultsFound');
const emptyResults = document.getElementById('emptyResults');
const searchResults = document.getElementById('searchResults');

function createLocationCard(item){
    const locationDiv = document.createElement('div');
    locationDiv.classList.add('location');

    const image = document.createElement('img');
    image.classList.add('locationImage');
    image.src = `./images/${item.imageUrl}`;
    image.alt = 'Location image';

    const locationName = document.createElement('p');
    locationName.innerText = item.name;
    locationName.classList.add('locationName');

    const locationDescription = document.createElement('p');
    locationDescription.innerText = item.description;
    locationDescription.classList.add('locationDescription');

    locationDiv.appendChild(image);
    locationDiv.appendChild(locationName);
    locationDiv.appendChild(locationDescription);    

    return locationDiv;
}

function searchDestination(){

    let searchText = document.getElementById('searchInput').value.trim();
    const apiUrl = './travel_recommendation_api.json';

    // Initialize values
    emptyResults.style.display = 'none';
    resultsFound.innerHTML = '';

    // Topic validation
    switch (searchText.toLowerCase()) {
        case 'country':
            searchText = 'countries';
            break;
        case 'temple':
            searchText = 'temples';
            break;
        case 'beach':
            searchText = 'beaches';
            break;
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {

            let result = [];
            let countries = data['countries'];

            // Filter data
            if (searchText) {
                let topic = data[searchText.toLowerCase()];

                // Display by topic
                if(topic){
                    result = topic;
                    if (searchText === 'countries') {
                        // Create elements
                        result.forEach(country => {
                            country.cities.forEach(city => {
                                resultsFound.appendChild(createLocationCard(city));
                            });
                        });
                    } else {
                        result.forEach(location => {
                            resultsFound.appendChild(createLocationCard(location));
                        });
                    }
                
                // Display by Country or City
                } else {
                    countries.forEach(country => {
                        if (country.name.toLowerCase().includes(searchText.toLowerCase())) {

                            result = country;
                            
                            country.cities.forEach(city => {
                                resultsFound.appendChild(createLocationCard(city));
                            });

                        } else {
                            country.cities.forEach(city => {
                                if (city.name.toLowerCase().includes(searchText.toLowerCase())){
                                    result = city;
                                    resultsFound.appendChild(createLocationCard(city));                                    
                                }
                            });
                        }
                    });
                }
            }
            // scroll after results
            searchResults.scrollIntoView({ behavior: 'smooth' });

            // Validate when no data found
            if (result.length === 0) {
                emptyResults.style.display = 'flex';
                console.log('No data found');
            }            
        })
        .catch(error => {
            console.error('Failed to load data:', error);
            emptyResults.style.display = 'flex';
        })
}

// Clear function

function clearResults(){
    resultsFound.innerHTML = '';
    emptyResults.style.display = 'flex';
    document.getElementById('searchInput').value = '';
    searchResults.scrollIntoView({ behavior: 'smooth' });
}

searchBtn.addEventListener('click', searchDestination);
clearBtn.addEventListener('click', clearResults);
