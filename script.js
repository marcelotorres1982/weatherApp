function consultarTemperatura(event) {
    event.preventDefault();
    const city = document.getElementById("city").value;

    if (!city) {
        const temperaturaDiv = document.getElementById("weather-info");
        temperaturaDiv.innerHTML = "Por favor, digite o nome da cidade.";
        const msg = new SpeechSynthesisUtterance("Por favor, digite o nome da cidade.");
        window.speechSynthesis.speak(msg);
        return;
    }

    const api_key = "4c32827255df476c9b975fd1966af90e";
    const weather_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    fetch(weather_url)
        .then(response => response.json())
        .then(data => {
            const temperature_kelvin = data.main.temp;
            const temperature_celsius = temperature_kelvin - 273.15;
            const temperaturaDiv = document.getElementById("weather-info");

            // Adicione o código para definir o ícone de clima dependendo da condição meteorológica
            if (data.weather[0].main.toLowerCase() == "sunny") {
                document.getElementById("weather-icon").className = "wi wi-day-sunny";
            } else if (data.weather[0].main.toLowerCase() == "rainy") {
                document.getElementById("weather-icon").className = "wi wi-day-rain";
            } else if (data.weather[0].main.toLowerCase() == "cloudy") {
                document.getElementById("weather-icon").className = "wi wi-cloudy";
            } // adicione mais condições para outras condições meteorológicas

            temperaturaDiv.innerHTML = `A temperatura em ${city} é de ${temperature_celsius.toFixed(0)}°C`;
            const msg = new SpeechSynthesisUtterance(`A temperatura em ${city} é de ${temperature_celsius.toFixed(0)} graus Celsius`);
            window.speechSynthesis.speak(msg);
        })
        .catch(() => {
            const temperaturaDiv = document.getElementById("weather-info");
            temperaturaDiv.innerHTML = "Ocorreu um erro ao obter as informações meteorológicas.";
            const msg = new SpeechSynthesisUtterance("Ocorreu um erro ao obter as informações meteorológicas.");
            window.speechSynthesis.speak(msg);
        });

}
``
