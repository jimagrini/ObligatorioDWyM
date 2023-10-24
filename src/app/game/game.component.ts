import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Actividad, Voto } from '../activity.module';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  actividades: Actividad[] = []; 
  actividadActual: Actividad | null = null;
  votos: Voto[] = [];
  resultadoMostrado = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

  }

  empezarGame(): void {
    this.actividadActual = this.actividades[0]; 
    this.resultadoMostrado = false;
    this.votos = [];
    this.mostrarSiguienteActividad();
  }

  mostrarSiguienteActividad(): void {
    if (this.actividadActual) {

      setTimeout(() => {
        const voto: Voto = { actividadId: this.actividadActual!.id, voto: 0 };
        this.votos.push(voto);
        const siguienteIndex = this.actividades.indexOf(this.actividadActual!) + 1;
        if (siguienteIndex < this.actividades.length) {
          this.actividadActual = this.actividades[siguienteIndex];
          this.mostrarSiguienteActividad();
        } else {
          this.mostrarResultados();
        }
      }, 10000); 
    }
  }

  votar(voto: number): void {
    if (this.actividadActual) {
      const votoObj: Voto = { actividadId: this.actividadActual.id, voto };
      this.votos.push(votoObj);
      const siguiente = this.actividades.indexOf(this.actividadActual) + 1;
      if (siguiente < this.actividades.length) {
        this.actividadActual = this.actividades[siguiente];
        this.mostrarSiguienteActividad();
      } else {
        this.mostrarResultados();
      }
    }
  }

  mostrarResultados(): void {

    this.resultadoMostrado = true;
  }
}