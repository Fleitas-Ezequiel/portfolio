import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServicesService } from 'src/app/servicios/services.service';

@Component({
  selector: 'app-skills-session',
  templateUrl: './skills-session.component.html',
  styleUrls: ['./skills-session.component.css']
})
export class SkillsSessionComponent {

  @ViewChild('actualizarNombre') myName: ElementRef;
  @ViewChild('actualizarImagen') myImage: ElementRef;
  @ViewChild('actualizarDescripcion') myDescription: ElementRef;
  skills:any;
  estadoBoton:String = 'agregar';
  route:string = '';
  form:FormGroup;
  datosAGuardar:any;
  editar:number = -1;

  constructor( private datosSkills:ServicesService, private authService:ServicesService,private formBuilder:FormBuilder ){
    this.form = this.formBuilder.group(
    {
      nombre : [''],
      descripcion : [''],
      img : ['']
    })
  }

  get Nombre(){
    return this.form.get('nombre');
  }
  get Descripcion(){
    return this.form.get('descripcion');
  }
  get Img(){
    return this.form.get('img');
  }

  ngOnInit():void{
    this.datosSkills.obtenerDatos().subscribe(req =>{
      this.skills = req[0].skills;
    })
  }

  agregarSkill(){
    this.estadoBoton = (this.estadoBoton=="agregar")? this.estadoBoton+= " cancelar" : this.estadoBoton="agregar";
  }

  guardarSkill(event:Event){
    event.preventDefault;
    this.route = "/guardar/skill";
    this.authService.guardarDatos(this.route,this.form.value).subscribe(req => {
      location.reload();
    })
  }

  editarSkill(event:Event, i:number){
    if(this.editar == i){
      this.editar = -1;
    }else{
      this.editar = i;
    }
  }

  actualizarSkill(event:Event, skill:any){
    this.actualizarData(skill);
  }

  actualizarData(skill:any){
    const data = 
    {
      id: skill.id,
      nombre: this.myName.nativeElement.value,
      descripcion: this.myDescription.nativeElement.value,
      img: this.myImage.nativeElement.value
    }
    this.datosAGuardar = data;
  }

  enviarDatos(skill:any){
    this.route = '/actualizar/skill';
    this.actualizarData(skill);
  }

  deleteSkill(event:Event, skill:any){
    if(event.isTrusted){
      event.preventDefault;
      this.route = "/eliminar/skill/"+ skill.id;
      this.authService.eliminarDatos(this.route).subscribe(req => {
        console.log(req);
      })
    }
  }
}
