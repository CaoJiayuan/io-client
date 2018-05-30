'use strict'

const socket = require('socket.io-client')

var Channel = require('./channel');

/**
 *
 * @param url
 * @param [opts]
 * @constructor
 */
function Client (url, opts) {
  this.io = socket(url, opts)
  this.on = this.io.on;
}

Client.prototype.subscribe = function (channels, then) {

}

Client.prototype.connected = function () {
  
}