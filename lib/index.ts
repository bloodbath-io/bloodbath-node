import { instance } from './resources/api'
import { serializeParams } from './helpers/formats'

class Bloodbath {
  apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  scheduleEvent(params: object) {
    return this.filterResponse(
      instance(this.apiKey).post('/events', serializeParams(params))
    )
  }

  listEvents() {
    return this.filterResponse(
      instance(this.apiKey).get('/events')
    )
  }

  findEvent(id: string) {
    return this.filterResponse(
      instance(this.apiKey).get(`/events/${id}`)
    )
  }

  async cancelEvent(id: string) {
    return this.filterResponse(
      instance(this.apiKey).delete(`/events/${id}`)
    )
  }

  filterResponse(apiCall: Promise<any>) {
    return new Promise((resolve, reject) => {
      apiCall.then((response: { data: object }) => {
        resolve(response.data)
      }).catch((error: { response: any }) => {
        reject(error.response.data)
      })
    })
  }
}

const BloodbathExport = (apiKey: string) => {
  const self: any = this
  if (!(self instanceof Bloodbath)) return new Bloodbath(apiKey)
  return Bloodbath
}

module.exports = BloodbathExport
module.exports.Bloodbath = BloodbathExport
module.exports.default = BloodbathExport