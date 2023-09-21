import axios from 'axios';
import { axiosConfig } from '../config/axiosConfig.js';

export async function get_products_ajax (count) {
    try {
        const response = await axios.post("/get_products/", { count: count }, axiosConfig);
        const result = typeof response.data === 'object' ? response.data : JSON.parse(response.data);
        
        return result.return_data;
        
    } catch (error) {
        console.error(error);
        return { "status": "failed", "data": null };
    }
}