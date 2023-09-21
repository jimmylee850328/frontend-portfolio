"use strict";
export const ajaxTimeout = 180000;

// 安內測試機
const web_url = location.href.match('http(s?)://(.*?)/')[0]; // 'http://172.16.7.22:6680/'

// local test
const developAjaxURL = "http://127.0.0.1:23456/";
export const ajaxURL = web_url.includes('localhost') || web_url.includes('127.0.0.1') ? developAjaxURL : web_url;