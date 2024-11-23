import axios from 'axios'

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://5.34.201.164:3000/api', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data?.user?.token) {
      localStorage.setItem('token', response.data.user.token)
      localStorage.setItem('username', response.data.user.username)
    }
    return response
  },
  (error) => {
    return Promise.reject(error.response?.data || error.message)
  },
)

export default axiosInstance
