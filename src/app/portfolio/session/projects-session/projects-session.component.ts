import { Component } from '@angular/core';
import { ServicesService } from 'src/app/servicios/services.service';

@Component({
  selector: 'app-projects-session',
  templateUrl: './projects-session.component.html',
  styleUrls: ['./projects-session.component.css']
})
export class ProjectsSessionComponent {

  proyectos:any;

  constructor( private datosProy:ServicesService ){}

  ngOnInit():void{
    this.datosProy.obtenerDatos().subscribe(req => {
      this.proyectos = req[0].proyectos;
    })
  }
}
