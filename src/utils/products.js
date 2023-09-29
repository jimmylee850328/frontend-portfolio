import axios from 'axios';
import { axiosConfig } from '../config/axiosConfig.js';

export async function get_products_ajax (count) {
    try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/photos/${count}/`);
        const result = typeof response.data === 'object' ? response.data : JSON.parse(response.data);
        
        return result;
        
    } catch (error) {
        console.error(error);
        return null;
    }
}