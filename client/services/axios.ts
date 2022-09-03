import axios from 'axios'
const axiosInstance = axios.create({
    baseURL: process.env.API_ENDPOINT
  })
  axiosInstance.interceptors.request.use((config:any) => {
    const jwtToken = window.localStorage.getItem('jwtToken')
    if (jwtToken) {
      config.headers['x-access-token'] = `${jwtToken}`
    }
  
    return config
  })
  export default axiosInstance