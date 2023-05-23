import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ServicesService } from '../../../servicios/services.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { getHtmlTagDefinition } from '@angular/compiler';

@Component({
  selector: 'app-about-me-session',
  templateUrl: './about-me-session.component.html',
  styleUrls: ['./about-me-session.component.css']
})
export class AboutMeSessionComponent implements OnInit{
  datos:any;
  estado:String = 'normal';
  @ViewChild('name') myName: ElementRef;
  @ViewChild('surname') mySurname: ElementRef;
  @ViewChild('photo') myPhoto: ElementRef;
  @ViewChild('valor') myDescription: ElementRef;
  mostrarPresentacion:Boolean = false;
  mostrarDescripcion:Boolean = false;
  mostrarEdicionFoto:Boolean = true;
  datosAGuardar:any;
  route = '';

  constructor(
    private datosAbout:ServicesService
  ){}

  ngOnInit():void{
    this.datosAbout.obtenerDatos().subscribe(data =>{
      this.datos = data[0];
      this.datosAGuardar = this.datos;
    });
  }

  editarDescripcion(event:Event){
    if(event.isTrusted)
    {
      this.mostrarDescripcion = !this.mostrarDescripcion;
    }
  }

  guardarDescripcion(event:Event){
    this.route = '/actualizar/persona';
    this.datosAGuardar.descripcion = this.myDescription.nativeElement.value;
  }

  editarNombre(event:Event){
    if(event.isTrusted)
    {
      this.mostrarPresentacion = !this.mostrarPresentacion;
      this.actualizarDatos();
    }
  }

  actualizarDatos(){
    this.datosAGuardar.nombre = this.myName.nativeElement.value;
    this.datosAGuardar.apellido = this.mySurname.nativeElement.value;
    this.route = '/actualizar/persona';
  }

  guardarNombreYApellido(event:Event){
    this.actualizarDatos();
  }

  editarFoto(event:Event){
    if(event.isTrusted)
    {
      this.mostrarEdicionFoto = !this.mostrarEdicionFoto;
    }
  }

  guardarFoto(event:Event){
    const datos = 
    {
      foto : (<HTMLInputElement>event.target).value
    }
    this.datosAGuardar = datos;
    this.actualizarDatos();
  }

}
