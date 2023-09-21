import Qs from 'qs';
import { ajaxURL, ajaxTimeout } from './config.js';

export var axiosConfig = {
    url: '/user',

    method: 'post', // default

    baseURL: ajaxURL,

    transformRequest: [
        function (data, headers) {
            data = Qs.stringify(data);
            return data;
        }
    ],

    transformResponse: [
        function (data) {
            return data;
        }
    ],

    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },

    paramsSerializer: {
        serialize: function (params) {
            return Qs.stringify(params, {
                arrayFormat: 'brackets' 
            });
        }
    },

    timeout: ajaxTimeout,

    withCredentials: false, // default

    responseType: 'json', // default

    xsrfCookieName: 'XSRF-TOKEN', // default

    xsrfHeaderName: 'X-XSRF-TOKEN', // default

    onUploadProgress: function (progressEvent) {
    },

    onDownloadProgress: function (progressEvent) {
    },

    maxContentLength: 2000,

    validateStatus: function (status) {
        return status >= 200 && status < 300; // default
    },
};