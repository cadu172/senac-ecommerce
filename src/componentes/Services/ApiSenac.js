import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/'
});

export default api;

/**
 * Como consumir dados da API com React
 * https://celke.com.br/artigo/como-consumir-dados-da-api-com-react
 * 
 */