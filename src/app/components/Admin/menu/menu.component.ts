import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(private router: Router) {}

  // Método para navegar a la página de creación de propuestas
  createProposal(){
    this.router.navigate(['/create-proposal']);
  }
}
