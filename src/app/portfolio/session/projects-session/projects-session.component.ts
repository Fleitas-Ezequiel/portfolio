import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServicesService } from 'src/app/servicios/services.service';

@Component({
  selector: 'app-projects-session',
  templateUrl: './projects-session.component.html',
  styleUrls: ['./projects-session.component.css']
})
export class ProjectsSessionComponent {

  @ViewChild('myName') myName:ElementRef;
  @ViewChild('myDescription') myDescription:ElementRef;
  @ViewChild('myDateInit') myDateInit:ElementRef;
  @ViewChild('myDateFinish') myDateFinish:ElementRef;
  @ViewChild('myImage') myImage:ElementRef;
  proyectos:any;
  estadoBoton:String = 'agregar';
  route:string = '';
  form:FormGroup;
  datosAGuardar:any;
  editar:number = -1;

  constructor( private datosProy:ServicesService, private formBuild:FormBuilder, private authService:ServicesService ){
    this.form = this.formBuild.group(
      {
        id : [''],
        nombre : [''],
        descripcion : [''],
        fecha_inicio : [''],
        fecha_fin : ['']
      }
    )
  }

  get Nombre(){
    return this.form.get('nombre');
  }
  get Descripcion(){
    return this.form.get('descripcion');
  }
  get FechaInicio(){
    return this.form.get('fecha_inicio');
  }
  get FechaFin(){
    return this.form.get('fecha_fin');
  }
  
  ngOnInit():void{
    this.datosProy.obtenerDatos().subscribe(req => {
      this.proyectos = req[0].proyectos;
    })
  }

  agregarProyecto(){
    this.estadoBoton = (this.estadoBoton=="agregar")? this.estadoBoton+= " cancelar" : this.estadoBoton="agregar";
  }

  guardarProyecto(event:Event){
    event.preventDefault;
    this.route = "/guardar/proyecto";
    this.authService.guardarDatos(this.route,this.form.value).subscribe(req => {
      location.reload();
    })
  }

  editarProyecto(event:Event, i:number){
    if(this.editar == i){
      this.editar = -1;
    }else{
      this.editar = i;
    }
  }

  actualizarProyecto(event:Event, pryecto:any){
    this.actualizarData(pryecto);
  }

  deleteProyecto(event:Event, proyecto:any){
    if(event.isTrusted){
      event.preventDefault;
      this.route = "/eliminar/proyecto/"+ proyecto.id;
      this.authService.eliminarDatos(this.route).subscribe(req => {
        console.log(req);
      })
    }
  }

  enviarDatos(proyecto:any){
    this.route = '/actualizar/proyecto';
    this.actualizarData(proyecto);
  }

  actualizarData(proyecto:any){
    const data = 
    {
      id: proyecto.id,
      nombre: this.myName.nativeElement.value,
      descripcion: this.myDescription.nativeElement.value,
      img: this.myImage.nativeElement.value
    }
    this.datosAGuardar = data;
  }

}
