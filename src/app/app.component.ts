import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { WebSocketService } from './websocket.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Juegos';
  message = ''

  constructor(private socketService: WebSocketService){

  }
  
  ngOnInit(){   
  }
  
}
