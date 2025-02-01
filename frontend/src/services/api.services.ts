import axios from 'axios'

import retrieveLocalStorage from '../hepler/retrieveLocalStorage'

const axiosInstance = axios.create({
  baseURL: 'http://owu.linkpc.net/carsAPI/v2',
  headers: {},
})
axiosInstance.interceptors.request.use((request) => {
  if (localStorage.getItem('tokenPair') && request.url !== '/auth/refresh') {
    request.headers.set(
      'Authorization',
      'Bearer ' + retrieveLocalStorage<ITokenObtainPair>('tokenPair').access,
    )
  }
  return request
})

const authService = {
  authentication: async (authData: IAuthUserData): Promise<boolean> => {
    const response = await axiosInstance.post<ITokenObtainPair>(
      '/auth',
      authData,
    )
    localStorage.setItem('tokenPair', JSON.stringify(response.data))

    return !!(response?.data?.access && response?.data?.refresh)
  },
  refresh: async (refreshToken: string) => {
    const response = await axiosInstance.post<ITokenObtainPair>(
      '/auth/refresh',
      { refresh: refreshToken },
    )
    localStorage.setItem('tokenPair', JSON.stringify(response.data))
  },
}

export { authService }
