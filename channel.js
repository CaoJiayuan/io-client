
module.exports = Channel

module.exports.Manager = Manager

var arrayWrap = require('./utils').arrayWrap

function Channel(name, client) {
  this.name = name
  this.client = client
}

Channel.prototype.broadcast = function (ev, payload) {
  if (payload === undefined) {
    payload = ev
    ev = 'message'
  }


  this.client.emit('broadcast', {
    channels: this.name + '::' + ev,
    payload
  })
}

Channel.prototype.on = function (ev, cb) {

  if (cb === undefined) {
    return new Promise(resolve => {
      this.client.on(this.name + '::' + ev, function (payload) {
        resolve(payload);
      })
    })
  }

  this.client.on(this.name + '::' + ev, cb)
}


function Manager(channels) {
  channels = channels || []
  this.channels = channels
}

Manager.prototype.broadcast = function (ev, payload) {
  this.channels.forEach(function (channel) {
    channel.broadcast(ev, payload)
  })
}
Manager.prototype.on = function (ev, cb) {
  this.channels.forEach(function (channel) {
    channel.on(ev, cb)
  })
}

Manager.prototype.push = function (channel) {
  this.channels.push(channel)
}

Manager.prototype.select = function (channels) {
  const chs = this.channels.filter(channel => arrayWrap(channels).indexOf(channel.name) > -1)
  return new Manager(chs)
}

Manager.prototype.has = function (channel) {
  return this.channels.filter(ch => ch.name === channel).length > 0
}
