import { Component } from '@angular/core';
import { ServicesService } from '../../../servicios/services.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-education-session',
  templateUrl: './education-session.component.html',
  styleUrls: ['./education-session.component.css']
})
export class EducationSessionComponent {
  dataEducation:any;
  datosFinales:any;
  estadoBoton:String = 'agregar';
  editar:number = -1;
  datosAGuardar:any;
  route:string = '';
  form:FormGroup;
  fromUpdate:FormGroup;
  study:any;

  constructor( private data:ServicesService, private formBuilder:FormBuilder, private authentication:ServicesService){
    this.form = this.formBuilder.group(
      {
        institucion : [''],
        titulo : [''],
        fecha_inicio_estudio : [''],
        fecha_fin_estudio : [''],
        estado : [''],
        img : ['']
      }
    )
    this.fromUpdate = formBuilder.group(
      {
        id : [''],
        institucion : [''],
        titulo : [''],
        fecha_inicio_estudio : [''],
        fecha_fin_estudio : [''],
        estado : [''],
        img : ['']
      }
    )
  }

  //Primer formulario de creacion de nuevo estudio
  get Institucion(){
    return this.form.get('institucion');
  }
  get Titulo(){
    return this.form.get('titulo');
  }
  get Estado(){
    return this.form.get('estado');
  }
  get FechaInicio(){
    return this.form.get('fecha_inicio_estudio');
  }
  get FechaFin(){
    return this.form.get('fecha_fin_estudio');
  }
  get Img(){
    return this.form.get('img');
  }

  //Segundo formulario de actualizacion de un estudio existente
  get InstitucionUp(){
    return this.fromUpdate.get('institucion');
  }
  get TituloUp(){
    return this.fromUpdate.get('titulo');
  }
  get EstadoUp(){
    return this.fromUpdate.get('estado');
  }
  get FechaInicioUp(){
    return this.fromUpdate.get('fecha_inicio_estudio');
  }
  get FechaFinUp(){
    return this.fromUpdate.get('fecha_fin_estudio');
  }
  get ImgUp(){
    return this.fromUpdate.get('img');
  }
  
  setFormId(){
    for(let estuido of this.dataEducation){
      console.log(estuido);
    }
    return 
  }

  ngOnInit():void{
    this.data.obtenerDatos().subscribe(sources =>{
      this.dataEducation = sources[0].educacion;
      for(this.study of this.dataEducation){
        let fechaIni='';
        let fechaFin='';
        for(let i=0; i<10; i++){
          fechaIni += this.study.fecha_inicio_estudio[i];
          fechaFin += this.study.fecha_fin_estudio[i];
        }
        this.study.fecha_inicio_estudio = fechaIni;
        this.study.fecha_fin_estudio = fechaFin;
      }
    })
  }

  agregarEstudio(){
    this.estadoBoton = (this.estadoBoton == 'agregar')? this.estadoBoton += ' cancelar': this.estadoBoton = 'agregar';
  }

  editarEstudio(event:Event, indice:number){
    
    if(this.editar == indice){
      this.editar = -1;
    }else{
      this.editar = indice;
    }
    this.enviarDatos()
  }

  guardarEstudio(event:Event){
    event.preventDefault;
    this.route = "/guardar/education"
    this.authentication.guardarDatos(this.route,this.form.value).subscribe(req => {
      console.log(req);
    })
  }

  enviarDatos(){
    this.datosFinales = this.dataEducation[this.editar];
    this.datosAGuardar = this.fromUpdate.value;
    if(this.datosAGuardar.institucion == ''){
      this.datosAGuardar = this.datosFinales;
    }
    this.datosAGuardar.id = this.datosFinales.id
    console.log('linea 130',this.datosAGuardar);
  }

  actualizarEstudio(event:Event, estudio:any){
    this.route = "/actualizar/educacion";
    this.datosAGuardar = this.fromUpdate.value;
  }

  deleteStudy(event:Event){
    event.preventDefault;
    this.route = "/delete/education/"+ this.datosAGuardar.id;
    console.log(this.datosAGuardar.id);
    this.authentication.eliminarDatos(this.route).subscribe(req => {
      console.log(req);
    })
  }
}
