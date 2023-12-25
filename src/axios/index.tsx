import axios, { AxiosInstance } from 'axios'

export const instance: AxiosInstance = axios.create({
    baseURL: 'https://moyeota.shop/api/',
})
