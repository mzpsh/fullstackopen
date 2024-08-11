import axios from "axios";
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

const fetch = (lat, lon) => axios.get(`${baseUrl}?lat=${lat}&lon=${lon}&appId=${import.meta.env.VITE_OPENWEATHER_API_KEY}`).then(response => response.data);

export default { fetch };