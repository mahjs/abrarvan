import axiosInstance from './axiosInstance'
import { type CurrentUser, type LoginReq, type RegisterReq } from './interfaces'

// Create a new user
export const registerUser = async (payload: RegisterReq) => {
  try {
    const response = await axiosInstance.post('/users', payload)
    return response.data // Return the API response
  } catch (error) {
    throw error
  }
}

export const loginUser = async (payload: LoginReq) => {
  const { data } = await axiosInstance.post<CurrentUser>('/users/login', payload)
  return data
}

export const getCurrentUser = async () => {
  const { data } = await axiosInstance.get<CurrentUser>('/user')

  return data
}
