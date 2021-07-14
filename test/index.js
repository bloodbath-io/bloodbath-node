'use strict'
var expect = require('chai').expect
var nock = require('nock')

const Bloodbath = require('../../bloodbath-node')

describe('Bloodbath', () => {
  // nock.disableNetConnect()
  const validApiKey = 'zStM_aXwrs1Arp43IYPbRLvH2dy9OkiLWSYOrshRQKjtpfjjzaxREFVfiVWKRK4aDs7qUfOSUjnE1Ix9zQZhMw=='
  const instance = Bloodbath(validApiKey)

  it('should scheduleEvent', async () => {

    nock('https://api.bloodbath.io').post('/rest/events').reply(201, { data: {
        body: 'test',
        dispatchedAt: null,
        endpoint: 'http://api.random.com/v1',
        enqueuedAt: null,
        headers: '{"hello": "very-true|"}',
        id: '13e4dd55-6e89-471d-8c6f-ae2d5ba6e12a',
        lockedAt: null,
        method: 'post',
        origin: 'rest_api',
        scheduledFor: '2022-06-25T22:27:23Z'
      }
    })

    const response = await instance.scheduleEvent({
      "headers": "{\"hello\": \"very-true|\"}",
      "endpoint": "http://api.random.com/v1",
      "scheduledFor": Date.now() + 1000*60, // "2022-06-26 00:27:23+0200",
      "method": "post",
      "body": "test"
    })

    console.log(response)

    expect(response).to.contain.keys('id', 'scheduledFor', 'headers', 'body', 'method')

    nock.cleanAll()
  })

  it('should findEvent', async () => {
    const id = '07def466-edc9-4c5e-bfa4-ce2c26c9ec64'

    nock('https://api.bloodbath.io').get(`/rest/events/${id}`).reply(200, { data: {
        body: 'test',
        dispatchedAt: null,
        endpoint: 'http://api.random.com/v1',
        enqueuedAt: null,
        headers: '{"hello": "very-true|"}',
        id: '13e4dd55-6e89-471d-8c6f-ae2d5ba6e12a',
        lockedAt: null,
        method: 'post',
        origin: 'rest_api',
        scheduledFor: '2022-06-25T22:27:23Z'
      }
    })

    const response = await instance.findEvent(id)

    expect(response).to.contain.keys('id', 'scheduledFor', 'headers', 'body', 'method')

    nock.cleanAll()
  })

  it('should cancelEvent', async () => {
    const id = '832199ee-675e-44a8-a974-f7b7e1067ea8'

    nock('https://api.bloodbath.io').delete(`/rest/events/${id}`).reply(200, { data: null })

    const response = await instance.cancelEvent(id)
    console.log(response)

    expect(response).to.eq(null)

    nock.cleanAll()
  })

  it('should listEvent', async () => {
    nock('https://api.bloodbath.io').get(`/rest/events`).reply(200, { data: [{
        body: 'test',
        dispatchedAt: null,
        endpoint: 'http://api.random.com/v1',
        enqueuedAt: null,
        headers: '{"hello": "very-true|"}',
        id: '13e4dd55-6e89-471d-8c6f-ae2d5ba6e12a',
        lockedAt: null,
        method: 'post',
        origin: 'rest_api',
        scheduledFor: '2022-06-25T22:27:23Z'
      },
      {
        body: 'test',
        dispatchedAt: null,
        endpoint: 'http://api.random.com/v1',
        enqueuedAt: null,
        headers: '{"hello": "very-true|"}',
        id: '13e4dd55-6e89-471d-8c6f-ae2d5ba6e12a',
        lockedAt: null,
        method: 'post',
        origin: 'rest_api',
        scheduledFor: '2022-06-25T22:27:23Z'
      }]
    })
    const response = await instance.listEvents()
    console.log(response)

    expect(response).to.have.length.above(1)

    nock.cleanAll()
  })
})