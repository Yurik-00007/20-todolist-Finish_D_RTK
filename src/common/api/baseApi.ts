import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': 'aa9190f9-bbc9-4ecd-87a2-1860f96fde78',
  },
})
