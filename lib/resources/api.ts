import axios from 'axios'

const DEFAULT_PATH = 'https://api.bloodbath.io/rest/'
const TIMEOUT = 1000

const baseURL = DEFAULT_PATH

export const instance = (apiKey: string) => {
  return axios.create({
    baseURL: baseURL,
    timeout: TIMEOUT,
    headers: {'authorization': `Bearer ${apiKey}`}
  })
}
