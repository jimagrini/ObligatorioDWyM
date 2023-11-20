import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { WebSocketService } from './services/websocket.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Juegos para Todos';
  message = ''

  constructor(private socketService: WebSocketService){

  }
  
  ngOnInit(){   
  }
  
}
