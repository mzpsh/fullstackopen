import axios from "axios";

const baseUrl = 'http://localhost:3001/countries';

const find = (query) => axios.get(`${baseUrl}?name.common_like=${query}`).then(resppons => resppons.data);

export default {
    find
}