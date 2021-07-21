# Io-client

![npm](https://img.shields.io/npm/v/nerio-io-client.svg) [![](https://data.jsdelivr.com/v1/package/npm/nerio-io-client/badge)](https://www.jsdelivr.com/package/npm/nerio-io-client)

A websocket client base on [socket.io-client](https://github.com/socketio/socket.io-client), working with [io-server](https://github.com/CaoJiayuan/io-server)

## install
```npm i nerio-io-client -S```
## CDN

```<script src="https://cdn.jsdelivr.net/npm/nerio-io-client/dist/messenger.js"></script>```

## Usage

### initialize instance

```ecmascript 6
import Client from 'nerio-io-client'

const client = new Client(url, [socketIoOptions, autoCreate])
// const client = new Messenger(url, [socketIoOptions, autoCreate]) // using cdn
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
