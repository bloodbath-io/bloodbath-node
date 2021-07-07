![workflow](https://github.com/bloodbath-io/bloodbath-node/actions/workflows/main.yml/badge.svg)

# Bloodbath Node Library

The Bloodbath Node library provides convenient access to the Bloodbath API from applications written in the Javascript language.

## Installation

Install the package with:

```ruby
npm install bloodbath --save
# or
yarn add bloodbath
```

## Usage

### Configuration
The library needs to be configured with your account's API key which is available in your [Bloodbath Dashboard](https://app.bloodbath.io/). Set it to its value:

```javascript
const bloodbath = require('bloodbath')('NTI6PASMD9BQhYtRh...');

bloodbath.scheduleEvent({
  ...
})
  .then(event => console.log(event.id))
  .catch(error => console.error(error))
```

Or using ES modules and async/await:

```javascript
import Bloodbath from 'bloodbath';
const bloodbath = new Bloodbath('NTI6PASMD9BQhYtRh...');

(async () => {
  const event = await bloodbath.scheduleEvent({
    ...
  });

  console.log(event.id);
})();
```

#### Events
```javascript
// schedule an event
Bloodbath.scheduleEvent({
  scheduledFor: Date.now() + 1000 * 60,
  headers: {},
  method: :post,
  body: "some body content",
  endpoint: 'https://api.acme.com/path'
})

// list events
Bloodbath.listEvents()

// find an event
Bloodbath.findEvent('b7ccff...')

// cancel an event
Bloodbath.cancelEvent('b7ccff...')
```

For more documentation about how to use Bloodbath, don't hesitate to check [Bloodbath Docs](https://docs.bloodbath.io/).

## Development

Run all tests:

```
  $ npm install
  $ npm test
```

If you do not have yarn installed, you can get it with `npm install --global yarn`.