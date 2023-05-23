import { Component } from '@angular/core';
import { ServicesService } from '../servicios/services.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent {

  dataEducation:any;

  constructor( private data:ServicesService){}

  ngOnInit():void{
    this.data.obtenerDatos().subscribe(sources =>{
      this.dataEducation = sources[0].educacion;
      let aux;
      for(aux of this.dataEducation){
        let fechaIni='';
        let fechaFin='';
        for(let i=0; i<10; i++){
          fechaIni += aux.fecha_inicio_estudio[i];
          fechaFin += aux.fecha_fin_estudio[i];
        }
        aux.fecha_inicio_estudio = fechaIni;
        aux.fecha_fin_estudio = fechaFin;
      }
    })
  }
}
