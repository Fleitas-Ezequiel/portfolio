import { Component } from '@angular/core';
import { ServicesService } from 'src/app/servicios/services.service';

@Component({
  selector: 'app-job-session',
  templateUrl: './job-session.component.html',
  styleUrls: ['./job-session.component.css']
})
export class JobSessionComponent {
  trabajos:any;

  constructor( private datosTrabajo:ServicesService){}

  ngOnInit():void{
    this.datosTrabajo.obtenerDatos().subscribe(req =>{
      this.trabajos = req[0].experiencia;
    })
  }
}
