import axios from 'axios'

const DEFAULT_PATH = 'https://api.bloodbath.io/rest/'
const TIMEOUT = 1000

const path = DEFAULT_PATH

export const instance = (apiKey: string) => {
  return axios.create({
    baseURL: path,
    timeout: TIMEOUT,
    headers: {'authorization': `Bearer ${apiKey}`}
  })
}
