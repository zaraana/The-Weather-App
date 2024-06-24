const apiKey = "5df48503bb9108a7a6f2da0b76fbce00";
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=`;

export async function getForecastData(city) {
    const response = await fetch(`${forecastUrl}${city}&appid=${apiKey}`);
    const data = await response.json();
    return data;
}

export async function getCityImage(city) {
    const unsplashApiKey = 'TEepGyjVwZPJEgQIc9cPEGwPe-SXv8C2M26WktO6mBI'; 
    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${city}&client_id=${unsplashApiKey}`);
        if (!response.ok) {
            throw new Error('Failed to fetch image');
        }
        const data = await response.json();
        return data.results.length > 0 ? data.results[0].urls.regular : 'default-image-url.jpg';
    } catch (error) {
        console.error(error);
        return 'default-image-url.jpg';
    }
}

export async function getCityDescription(city) {
    const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${city}`);
    const data = await response.json();
    return data.extract || 'No description available';
}
