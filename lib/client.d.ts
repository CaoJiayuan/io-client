import Socket from 'socket.io-client'

declare interface Client {
  socket: Socket,
  subscribe: (channels: string | string[]) => Manager,
  unsubscribe: (channels: string | string[]) => Manager,
  connected: (cb?: Function) => Promise | void,
  onError: (cb?: Function) => Promise | void,
  broadcast: (channel: string | string[], ev : string | any, payload ?: any) => void,
  on: (ev: string, cb : Function) => void,
  emit: (ev: string,  payload : any) => void,
  select: (channel: string | string[], create : boolean = true) => Channel | Manager,
  main: () => Channel,
}

declare interface Channel {
  name: string,
  client: Client,
  broadcast:  (ev : string | any, payload ?: any) => Channel,
  on: (ev: string, cb : Function) => Channel,
}

declare interface Manager {
  channels: Channel[],
  broadcast:  (ev : string | any, payload ?: any) => Manager,
  on: (ev: string, cb : Function) => Manager,
  push: (channel : Channel) => Manager,
  select: (channel: string | string[]) => Manager,
  has: (channel: string ) => boolean,
}
