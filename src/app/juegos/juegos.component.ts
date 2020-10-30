import { Component, OnInit } from '@angular/core';
import { AlertService } from '../alert/alert.service';
import { Juego } from './juego';
import { JuegoService } from './juego.service';
@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css'],
})
export class JuegosComponent implements OnInit {
  showId: boolean = true;

  juegos: Juego[];

  constructor(
    private juegoService: JuegoService,
    private alertService: AlertService
  ) {}

  switchId(): void {
    this.showId = !this.showId;
  }

  ngOnInit(): void {
    this.refreshJuegos();
  }  delete(juego: Juego): void {
    if(confirm(`¿Está seguro que desea eliminar el juego "${juego.titulo}"?`)) {
      this.juegoService.delete(juego.idJuego).subscribe(
        response => {
          this.alertService.success(`Se ha boorado correctamente el juego "${juego.titulo}" con ID: ${juego.idJuego}`, {autoClose: true});
          this.refreshJuegos();
        }
      );
    }
  }  private refreshJuegos(): void {
    this.juegoService.getJuegos().subscribe(
      juegos => this.juegos = juegos
    );
  }
}
