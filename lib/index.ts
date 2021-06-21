import { instance } from './resources/api'

class Bloodbath {
  apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async scheduleEvent(params: object) {
    return await instance(this.apiKey).post('/events', params)
  }

  async listEvents() {
    return await instance(this.apiKey).get('/events')
  }

  async findEvent(id: string) {
    return await instance(this.apiKey).get(`/events/${id}`)
  }

  async cancelEvent(id: string) {
    return instance(this.apiKey).delete(`/events/${id}`)
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