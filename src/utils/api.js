import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://opendata.resas-portal.go.jp',
  headers: {
    'X-API-KEY	': process.env.REACT_APP_API_KEY,
  },
  responseType: 'json',
})
export default instance
