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
    })
  }
}
