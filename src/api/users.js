import httpClient from '../httpClient'

export default {
  getAllUsers (cb, errorCb) {
    httpClient.get('/users').then((res) => {
      cb(res.data)
    }, (error) => {
      errorCb(error)
      console.log(error)
    })
  }
}
