import { Component } from '@angular/core';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Juegos';
message = ''

constructor(private socketService: SocketService){

}
ngOnInit(){   
  this.socketService.getNewMessage().subscribe((message: string) => {
    console.log(message);
    this.message = message;
  })
}
}