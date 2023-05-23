import { Component } from '@angular/core';
import { ServicesService } from '../servicios/services.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent {
  
  trabajos:any;

  constructor(
    private service:ServicesService
  ){}

  ngOnInit(){
    this.service.obtenerDatos().subscribe(req => {
      this.trabajos = req[0].experiencia;
      let job
      for(job of this.trabajos){
        let fechaIni='';
        let fechaFin='';
        for(let i=0; i<10; i++){
          fechaIni += job.fecha_inicio[i];
          fechaFin += job.fecha_fin[i];
        }
        job.fecha_inicio = fechaIni;
        job.fecha_fin = fechaFin;
      }
    })
  }
}
