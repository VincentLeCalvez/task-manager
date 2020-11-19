import axios from 'axios'

const url = 'http://localhost:8080/'

export const search = (collection: string, params = {}) => {
  return axios.get(url + collection, { params })
}

export const searchOne = (collection: string, id: string | string[]) => {
  return axios.get(url + collection + '/' + id)
}

export const removeOne = (collection: string, id: string) => {
  return axios.delete(url + collection + '/' + id)
}

export const updateOne = (collection: string, id: string, params: {}) => {
  return axios.put(url + collection + '/' + id, params)
}

export const post = (collection: string, params: {}) => {
  return axios.post(url + collection, params)
}
