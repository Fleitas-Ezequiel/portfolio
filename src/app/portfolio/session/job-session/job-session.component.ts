import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import { ServicesService } from 'src/app/servicios/services.service';

@Component({
  selector: 'app-job-session',
  templateUrl: './job-session.component.html',
  styleUrls: ['./job-session.component.css']
})
export class JobSessionComponent {
  @ViewChild('actualizarEmpresa') myactualizarEmpresa:ElementRef;
  @ViewChild('actualizarPuesto') myactualizarPuesto:ElementRef;
  @ViewChild('actualizarFechaInicio') myactualizarFechaInicio:ElementRef;
  @ViewChild('actualizarFechaFin') myactualizarFechaFin:ElementRef;
  @ViewChild('actualizarDescripcion') myactualizarDescripcion:ElementRef;
  @ViewChild('actualizarImagen') myactualizarImagen:ElementRef;
  trabajos:any;
  estadoBoton:String = 'agregar';
  form:FormGroup;
  formUpdate:FormGroup;
  route:string = '';
  datosFinales:any;
  datosAGuardar:any;
  editar:number = -1;
  job:any;

  constructor( private datosTrabajo:ServicesService, private formBuilder:FormBuilder, private authService:ServicesService){
    this.form = this.formBuilder.group(
      {
        empresa : [''],
        puesto : [''],
        descripcion : [''],
        fecha_inicio : [''],
        fecha_fin : [''],
        img : ['']
      }
    )

    this.formUpdate = this.formBuilder.group(
      {
        id : [''],
        empresa : [''],
        puesto : [''],
        descripcion : [''],
        fecha_inicio : [''],
        fecha_fin : [''],
        img : ['']
      }
    )
  }
  //Primer formulario de creacion de nueva experiencia
  get Institucion(){
    return this.form.get('empresa');
  }
  get Titulo(){
    return this.form.get('puesto');
  }
  get Estado(){
    return this.form.get('descripcion');
  }
  get FechaInicio(){
    return this.form.get('fecha_inicio');
  }
  get FechaFin(){
    return this.form.get('fecha_fin');
  }
  get Img(){
    return this.form.get('foto');
  }

  ngOnInit():void{
    this.datosTrabajo.obtenerDatos().subscribe(req =>{
      this.trabajos = req[0].experiencia;
      for(this.job of this.trabajos){
        let fechaIni='';
        let fechaFin='';
        for(let i=0; i<10; i++){
          fechaIni += this.job.fecha_inicio[i];
          fechaFin += this.job.fecha_fin[i];
        }
        this.job.fecha_inicio = fechaIni;
        this.job.fecha_fin = fechaFin;
        
      }
      
    })
  }

  agregarExperiencia(){
    this.estadoBoton = (this.estadoBoton=="agregar")? this.estadoBoton+= " cancelar" : this.estadoBoton="agregar";
  }

  guardarExperiencia(event:Event){
    event.preventDefault;
    this.route = "/guardar/trabajo";
    this.authService.guardarDatos(this.route,this.form.value).subscribe(req => {
      location.reload();
      console.log(req);
    })
  }

  editarTrabajo(event:Event, indice:number){
    if(this.editar == indice){
      this.editar = -1;
    }else{
      this.editar = indice;
      this.job = this.trabajos[indice];
      this.enviarDatos();
    }
  }

  actualizarTrabajo(event:Event, dato:any){
    this.enviarDatos();
  }

  deleteJob(event:Event){
    event.preventDefault;
    this.route = "/delete/exp/"+ this.datosFinales.id;
    console.log(this.datosFinales.id);
    this.authService.eliminarDatos(this.route).subscribe(req => {
      console.log(req);
    })
  }

  enviarDatos(){
    this.route = "/actualizar/trabajo";
    this.datosFinales = this.trabajos[this.editar];
    const datos =
    {
      id : this.datosFinales.id,
      empresa : this.myactualizarEmpresa.nativeElement.value,
      puesto : this.myactualizarPuesto.nativeElement.value,
      fecha_inicio : this.myactualizarFechaInicio.nativeElement.value,
      fecha_fin : this.myactualizarFechaFin.nativeElement.value,
      descripcion : this.myactualizarDescripcion.nativeElement.value,
      img : this.myactualizarImagen.nativeElement.value
    }
    this.datosAGuardar = datos;
  }
}
