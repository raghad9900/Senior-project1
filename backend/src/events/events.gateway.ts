import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';

@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<any>> {
    this.server.emit('events', data);
    return from([data]).pipe(map((item) => ({ event: 'events', data: item })));
  }

  @SubscribeMessage('screenCustomer')
  screenCustomer(@MessageBody() data: any): Observable<WsResponse<any>> {
    this.server.emit('screenCustomer', data);
    return from([data]).pipe(
      map((item) => ({ event: 'screenCustomer', data: item })),
    );
  }

  @SubscribeMessage('screenCustomerPayment')
  screenCustomerPayment(@MessageBody() data: any): Observable<WsResponse<any>> {
    this.server.emit('screenCustomerPayment', data);
    return from([data]).pipe(
      map((item) => ({ event: 'screenCustomerPayment', data: item })),
    );
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }
}
