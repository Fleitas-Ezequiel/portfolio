import { Component } from '@angular/core';
import { ServicesService } from '../../../servicios/services.service';

@Component({
  selector: 'app-education-session',
  templateUrl: './education-session.component.html',
  styleUrls: ['./education-session.component.css']
})
export class EducationSessionComponent {
  dataEducation:any;

  constructor( private data:ServicesService){}

  ngOnInit():void{
    this.data.obtenerDatos().subscribe(sources =>{
      this.dataEducation = sources[0].educacion;
    })
  }
}
