/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = 'fe1e67f24c62d172a3cfd7a4be286895';
const applyid = ',us&appid=';
// Create a new date instance dynamically with JS
let date = new Date();
let newDate = date.getMonth() + 1 + '.' + date.getDate() + '.' + date.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    const zipcode = document.getElementById('zip').value;
    const feeling = document.getElementById('feelings').value;

    getWeatherData(baseUrl, zipcode, apiKey)
        .then(function(data) {
            console.log(data);
            postData('/add', {
                date: newDate,
                feeling: feeling,
                temp: data.main.temp
            })
            updateUI();
        })
}

const getWeatherData = async(baseUrl, zipcode, apiKey) => {
    const res = await fetch(baseUrl + zipcode + ',us&appid=' + apiKey);
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("we got error", error);
    };
};
const updateUI = async() => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('content').innerHTML = document.getElementById('feelings').value;
        document.getElementById('temp').innerHTML = allData.temp;
    } catch (error) {
        console.log("error", error);
    }
}
async function postData(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });
}
