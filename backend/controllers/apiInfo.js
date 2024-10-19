const axios = require('axios')

exports.WeatherInfo = async (req, res) => {
    const { lat, lon } = req.body;
    const apiKey = '07300678e4af1a8b636a0cf26202de6f';

    try {
        const response = await axios.get(
            `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKey}`
        );
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }

}