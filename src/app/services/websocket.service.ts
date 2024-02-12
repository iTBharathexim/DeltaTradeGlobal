import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import io from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  socket: any
  // readonly uri: any = "ws://localhost:3000"
  readonly uri: any = "wss://livetradeapp.bharathexim.com"

  constructor() {
    var connectionOptions: any = {
      "force new connection": true,
      "reconnectionAttempts": "Infinity", //avoid having user reconnect manually in order to prevent dead clients after a server restart
      "timeout": 100000000, //before connect_error and connect_timeout are emitted.
      transports: ['websocket'], 
      wsEngine: 'uws'
    };
    // this.socket = io(this.uri, connectionOptions);
  }

  listen(eventname: string) {
    return new Observable((sub: any) => {
      this.socket.on(eventname, (data) => {
        sub.next(data);
      })
    })
  }

  emit(eventname: any, data: any) {
    this.socket.emit(eventname, data);
  }
}
