import { Component } from '@angular/core';
import { ServicesService } from '../servicios/services.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  proyectos:any;

  constructor( private datosProy:ServicesService ){}

  ngOnInit():void{
    this.datosProy.obtenerDatos().subscribe(req => {
      this.proyectos = req[0].proyectos;
    })
  }
}
