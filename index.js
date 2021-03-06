const userInput = document.querySelector('.search-box');
userInput.addEventListener('keypress', function (event) {
    console.log(event);

    if (event.code === 'Enter') {
        fetchWeatherData(userInput.value);
    }

});

const fetchWeatherData = (city) => {
    const apiKey = '7e3f21edee540e6110af347b55eb1ab2';
    const url = `https://api.openweathermap.org/data/2.5/find?q=${city}&appId=${apiKey}&units=metric`;
    console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            showWeather(data);
        })
        .catch(error => alert(error.message));

    const showWeather = (data) => {
        document.querySelector('.city').textContent = data.list[0].name;
        document.querySelector('.temp').textContent = data.list[0].main.temp;
        document.querySelector('.weather').textContent = data.list[0].weather[0].main;
        document.querySelector('.hi-low').textContent = `${data.list[0].main.temp_min} °C/${data.list[0].main.temp_max} °C`;
        document.querySelector('.date').textContent = getFormattedDtate(data.list[0].dt);

    }

    const getFormattedDtate = (dt) => {
        // dt is a timestamp (number of seconds since 1970) - we need to pass in milliseconds to Date constructor
        const date = new Date(dt * 1000);

        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];

        const days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ]

        // EXERCISE: use getMonth(), getFullYear(), getDay(), getDate() along with the above arrys to construct and return the date in required format
        const formattedDate = `${days[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
        return formattedDate;
    }

}