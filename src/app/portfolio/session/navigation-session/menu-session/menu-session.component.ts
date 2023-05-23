import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { ServicesService } from 'src/app/servicios/services.service';

@Component({
  selector: 'app-menu-session',
  templateUrl: './menu-session.component.html',
  styleUrls: ['./menu-session.component.css']
})
export class MenuSessionComponent implements OnInit{

  estilosMenu:String = "redes__sociales-lista";
  estado:String = "contenedor-items";
  width: any;
  social:any;
  menucheck:Boolean = false;
  mostrar:boolean = false;
  form:FormGroup;
  ident:any;
  abrirConfig:Boolean = false;
  menuConfig:String = 'menuConfig';
  editar:number = -1;

  constructor(
    private router: Router,
    private dataContacto: ServicesService,
    private formBuilder:FormBuilder,
    private authenticationService:AuthService,
    private service:ServicesService
  ){

    this.form = this.formBuilder.group(
      {
        id: [this.ident],
        tipo_contacto:[''],
        valor_contacto:[''],
        img:['']
    })

  }
  get TipoContacto(){
    return this.form.get('tipo_contacto');
  }
  get ValorContacto(){
    return this.form.get('valor_contacto');
  }
  get Img(){
    return this.form.get('img');
  }

  ngOnInit():void{
    this.dataContacto.obtenerDatos().subscribe(req => {
      this.social = req[0].contacto;
      this.ident = req[0].id;
    })
  }

  signOut():void{
    this.authenticationService.CerrarSesion();
    this.router.navigate(["/home"]);
  }

  menuClick():void{
    this.estilosMenu = (this.estilosMenu === "redes__sociales-lista")?this.estilosMenu = "open" : this.estilosMenu = "redes__sociales-lista";
    this.estado = (this.estado === "contenedor-items")?this.estado = "desplegado" : this.estado = "contenedor-items";
  }

  cerrarMenu():void{
    this.estilosMenu = "redes__sociales-lista";
    this.estado = "contenedor-items";
    if(this.menucheck){this.menucheck = false;} 
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event:EventListener) {
    this.width = window.innerWidth;
    if(this.width > 760){
      this.cerrarMenu();
    }
  }

  agregar():void{
    this.mostrar = true;
  }

  cancelarSocial():void{
    this.mostrar = false;
  }

  onSend(event:Event){
    event.preventDefault;
    this.service.guardarDatos('/guardar/contacto',this.form.value).subscribe(resp => {
      console.log(resp);
    })
  }

  editarContacto(indice:number){
    if(this.editar == indice){
      this.editar = -1;
    }else{
      this.editar = indice;
    }
  }

}
