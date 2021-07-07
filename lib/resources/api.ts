// import axios from 'axios'
// axios.defaults.adapter = require('axios/lib/adapters/http')
const https = require('https')

const hostname = 'api.bloodbath.io'
const port = 443
const path = '/rest'

class httpAdapter {
  apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  get(endPath: string) {
    return this.processHttp(endPath, 'GET')
  }

  post(endPath: string, params: object) {
    return this.processHttp(endPath, 'POST', JSON.stringify(params))
  }

  delete(endPath: string) {
    return this.processHttp(endPath, 'DELETE')
  }

  processHttp(endPath: string, method: string, params: string | null = null) {
    return new Promise((resolve, reject) => {
      const options = this.options(endPath, method, params)
      const request = https.request(options, (response: any) => {
        let data = ''

        response.on('data', (chunk: any) => {
          data += chunk
        })

        response.on('end', () => {
          if (data) resolve(JSON.parse(data))
          else resolve(null)
        });
      })

      request.on('error', (error: object) => {
        console.log('error output process http')
        reject(error)
      })

      if (params) request.write(params)
      request.end()
    })
  }

  options(endPath: string, method: string, params: string | null) {
    let headers = {'authorization': `Bearer ${this.apiKey}`}
    if (params) {
      headers = Object.assign(headers, {
        'Content-Type': 'application/json',
      })
    }

    return {
      hostname,
      port,
      method,
      path: `${path}${endPath}`,
      headers
    }
  }
}

export const instance = (apiKey: string) => {
  return new httpAdapter(apiKey)
}
