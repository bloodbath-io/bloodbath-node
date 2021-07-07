'use strict'
var expect = require('chai').expect
var nock = require('nock')

const Bloodbath = require('../../bloodbath-node')

describe('Bloodbath', () => {
  const validApiKey = 'zStM_aXwrs1Arp43IYPbRLvH2dy9OkiLWSYOrshRQKjtpfjjzaxREFVfiVWKRK4aDs7qUfOSUjnE1Ix9zQZhMw=='
  const instance = Bloodbath(validApiKey)

  // nock.disableNetConnect()
  // nock('http://zombo.com').get('/').reply(200, 'Ok')
  // console.log('yo http answer')
  // const yo = http.get('http://zombo.com/') // respond body "Ok"
  // console.log(yo.response)
  // console.log('responded')
  // nock('https://api.bloodbath.io').post('/rest/event').reply(201, { data: { body: "test" }})
  // https://www.chaijs.com/plugins/chai-nock/

  it('should scheduleEvent', async () => {

    const response = await instance.scheduleEvent({
      "headers": "{\"hello\": \"very-true|\"}",
      "endpoint": "http://api.random.com/v1",
      "scheduledFor": "2022-06-26 00:27:23+0200",
      "method": "post",
      "body": "test"
    })

    expect(response.data).to.contain.keys('id', 'scheduledFor', 'headers', 'body', 'method')

    // const nockCalls = nock.recorder.play()
    // console.log(nockCalls)
  })

  it('should findEvent', async () => {
    const response = await instance.findEvent('07def466-edc9-4c5e-bfa4-ce2c26c9ec64')

    expect(response.data).to.contain.keys('id', 'scheduledFor', 'headers', 'body', 'method')
  })

  it('should listEvent', async () => {
    const response = await instance.listEvents()

    expect(response.data).to.have.length.above(1)
  })
})