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

function searchDestination(){

    let searchText = document.getElementById('searchInput').value.trim();
    const apiUrl = './travel_recommendation_api.json';

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

                if(topic){
                    result = topic;
                    console.log(result);
                } else {
                    countries.forEach(country => {
                        if (country.name.toLowerCase().includes(searchText.toLowerCase())) {
                            result = country;
                            console.log(result);
                        } else {
                            country.cities.forEach(city => {
                                if (city.name.toLowerCase().includes(searchText.toLowerCase())){
                                    result = city;
                                    console.log(result);
                                }
                            })
                        }
                    });
                }
            }

            // Validate when no data found
            if (result.length === 0) {
                console.log('No data found');
            }            
        })
}

searchBtn.addEventListener('click', searchDestination);