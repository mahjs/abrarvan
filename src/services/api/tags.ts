import axiosInstance from './axiosInstance'

export const getAllTags = async () => {
  const { data } = await axiosInstance.get<{ tags: string[] }>('/tags')

  return data
}
