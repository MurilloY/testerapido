import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {


  private socket;    

  constructor(private http: HttpClient) { 
    this.socket = io(environment.socketUrl, {
      "timeout": 10001, 
      "transports": ["websocket"]
      }
    );
  }

  public sendMessage(room:any ,message:any) {

    this.socket.emit('message', room, message);
  }

  public sendProgress(message:any) {

    this.socket.emit('video', message);
  }

  public joinRoom(data:any) {
    this.socket.emit('join', { room: data['room'], username: data['username']});
  }


  public getMessages2 = (room:string) => {
    return new Observable((observer) => {
        this.socket.on(room, (message) => {
            observer.next(message);
        });
    });
  }


  public getMessages = () => {
    return Observable.create((observer:any) => {
        this.socket.on('broadcast', (message) => {
          console.log(message)

            observer.next(message);
        });
    });
  }

  getMessagesDB(class_id:any, class_type:any):Observable<any>{

    let headerOptions =  new HttpHeaders({'No-Auth': "false"});
    return this.http.get(environment.api + "/class/" + class_id + "/"+class_type+"/chat", {headers: headerOptions})
  }

}