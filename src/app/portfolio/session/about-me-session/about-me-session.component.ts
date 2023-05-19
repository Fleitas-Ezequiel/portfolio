import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../../servicios/services.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-about-me-session',
  templateUrl: './about-me-session.component.html',
  styleUrls: ['./about-me-session.component.css']
})
export class AboutMeSessionComponent implements OnInit{
  datos:any;
  mostrarPresentacion:Boolean = false;
  mostrarDescripcion:Boolean = false;
  datosAGuardar:any;
  route = '/guardar/persona';

  constructor(
    private datosAbout:ServicesService,
    private form:FormBuilder,
    private service: ServicesService
  ){}

  ngOnInit():void{
    this.datosAbout.obtenerDatos().subscribe(data =>{
      this.datos = data[0];
    });
  }

  edit(event:Event){
    // console.log('3');
    if(event.isTrusted){
      // console.log('4');
      this.mostrarDescripcion = !this.mostrarDescripcion;
    }
  }

  guardar(event:Event){
    console.log((<HTMLInputElement>event.target).value);

    const datos = 
    {
      descripcion : (<HTMLInputElement>event.target).value
    }
    
    this.datosAGuardar = datos;
  }

}
