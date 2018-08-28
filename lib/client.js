'use strict'
var io = require('socket.io-client')

var Channel = require('./channel')

var arrayWrap = require('./utils').arrayWrap

var errorEv = '_error'

module.exports = Client

/**
 *
 * @param url
 * @param [opts]
 * @constructor
 */
function Client(url, opts) {
  this.socket = io(url, opts)
  this.manager = new Channel.Manager([])
}

Client.prototype.subscribe = function (channels) {
  var self = this

  this.connected(function () {
    self.emit('subscribe', {
      channels
    })
  })
  if (typeof channels === 'string') {
    var chan = new Channel(channels, this)
    this.manager.push(chan)
    return chan
  }
  arrayWrap(channels).forEach(function (channel) {
    self.manager.push(new Channel(channel, self))
  })
  return this.manager
}

Client.prototype.unsubscribe = function (channels) {
  var self = this

  this.connected(function () {
    self.emit('unsubscribe', {
      channels
    })
  })

  return this.manager
}

Client.prototype.connected = function (cb) {
  if (this.socket.connected) {
    if (cb === undefined) {
      return new Promise(resolve => {
        resolve()
      })
    } else  {
      return cb()
    }
  }

  if (cb === undefined) {
    return new Promise(resolve => {
      this.on('connect', resolve)
    })
  }

  this.on('connect', cb)
}

Client.prototype.broadcast = function (channel, ev, payload) {
  if (typeof channel === 'string') {
    return this.select(channel, true).broadcast(ev, payload)
  }
  if (channel instanceof Array) {
    channel.forEach(ch => this.select(ch, true).broadcast(ev, payload))
  }
}


Client.prototype.select = function (channel, create) {
  create = create || true

  if (create && typeof channel === 'string' && !this.manager.has(channel)) {
    return new Channel(channel, this)
  }

  return this.manager.select(channel)
}

Client.prototype.on = function (ev, cb) {
  return this.socket.on(ev, cb)
}

Client.prototype.emit = function (ev, payload) {
  return this.socket.emit(ev, payload)
}

Client.prototype.onError = function (cb) {
  if (cb === undefined) {
    return new Promise(resolve => {
      this.connected(() => {
        this.on(errorEv, resolve)
      })
    })
  }
  return this.connected(() => this.on(errorEv, cb))
}

Client.prototype.main = function () {
  return this.select('*')
}
