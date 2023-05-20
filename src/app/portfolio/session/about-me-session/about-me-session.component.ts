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
  mostrarPresentacion:Boolean = false;
  mostrarDescripcion:Boolean = false;
  mostrarEdicionFoto:Boolean = true;
  datosAGuardar:any;
  route = '/guardar/persona';

  constructor(
    private datosAbout:ServicesService
  ){}

  ngOnInit():void{
    this.datosAbout.obtenerDatos().subscribe(data =>{
      this.datos = data[0];
    });
  }

  editarDescripcion(event:Event){
    
    if(event.isTrusted)
    {
      this.mostrarDescripcion = !this.mostrarDescripcion;
    }
  }

  guardarDescripcion(event:Event){
    console.log((<HTMLInputElement>event.target).value);
    if((<HTMLInputElement>event.target).value == undefined){
      this.estado = 'error';
    }
    const datos = 
    {
      descripcion : (<HTMLInputElement>event.target).value
    }
    
    this.datosAGuardar = datos;
  }

  editarNombre(event:Event){
    
    if(event.isTrusted)
    {
      this.mostrarPresentacion = !this.mostrarPresentacion;
    }
  }

  actualizarDatos(){
    const datos = 
    {
      nombre : this.myName.nativeElement.value,
      apellido: this.mySurname.nativeElement.value
    }

    console.log(datos);
    
    this.datosAGuardar = datos;
  }

  guardarNombreYApellido(event:Event){
    console.log( this.myName.nativeElement.value, this.mySurname.nativeElement.value);
    const datos = 
    {
      nombre : this.myName.nativeElement.value,
      apellido: this.mySurname.nativeElement.value
    }

    console.log(datos);
    
    this.datosAGuardar = datos;
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
  }

}
