# Io-client

![npm](https://img.shields.io/npm/v/nerio-io-client.svg)

A websocket client base on [socket.io-client](https://github.com/socketio/socket.io-client), working with [io-server](https://github.com/CaoJiayuan/io-server)

## install
```npm i nerio-io-client -S```

## Usage

### initialize instance

```ecmascript 6
import Client from 'nerio-io-client'

const client = new Client(url, [socketIoOptions, autoCreate])
```

### subscribe channel 

```ecmascript 6
client.subscribe('message')
client.subscribe(['message', 'client-1'])
```

### select channel and broadcast
```ecmascript 6
let channel = client.select('message')
// let channel = client.select(['message', 'client-1'])
channel.broadcast('event-1', {
    payload: 'foo'
})

channel.broadcast({ // default event is: message
    payload: 'foo'
})

```
