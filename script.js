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

        let weatherIconClass = "wi wi-day-sunny";  // Classe padrão para condição "sunny"
        
        // Atribuir a classe de ícone baseado na condição meteorológica
        switch (data.weather[0].main.toLowerCase()) {
            case "sunny":
                weatherIconClass = "wi wi-day-sunny";
                break;
            case "rainy":
                weatherIconClass = "wi wi-day-rain";
                break;
            case "cloudy":
                weatherIconClass = "wi wi-cloudy";
                break;
            // Adicione mais casos conforme necessário para outras condições meteorológicas
            default:
                // Caso padrão, usar ícone padrão ou tratar como preferir
                weatherIconClass = "wi wi-day-sunny";
        }

        // Definir a classe de ícone no elemento HTML
        document.getElementById("weather-icon").className = weatherIconClass;

        // Atualizar o conteúdo da temperatura
        temperaturaDiv.innerHTML = `A temperatura em ${data.name} é de ${temperature_celsius.toFixed(0)}°C`;

        // Reproduzir a temperatura em voz
        const msg = new SpeechSynthesisUtterance(`A temperatura em ${data.name} é de ${temperature_celsius.toFixed(0)} graus Celsius`);
        window.speechSynthesis.speak(msg);
    })
    .catch(error => {
        console.error('Erro ao obter dados meteorológicos:', error);
    });
}