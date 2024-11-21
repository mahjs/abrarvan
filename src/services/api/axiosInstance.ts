import axios from 'axios'

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://5.34.201.164:3000/api', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token')
    if (token) {
      // Attach the token to the Authorization header
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    // Handle request error
    return Promise.reject(error)
  },
)

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Check if the response contains a token (e.g., after login or register)
    if (response.data?.user?.token) {
      // Store the token in localStorage
      localStorage.setItem('token', response.data.user.token)
    }
    return response
  },
  (error) => {
    // Handle response errors
    return Promise.reject(error.response?.data || error.message)
  },
)

export default axiosInstance
