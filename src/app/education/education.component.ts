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
      console.log(this.dataEducation);
    })
  }
}
