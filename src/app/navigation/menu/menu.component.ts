import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/servicios/services.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  estilosMenu:String = "redes__sociales-lista";
  estado:String = "contenedor-items";
  social:any;
  width: any;
  menucheck:Boolean = false;
  
  constructor(
    private router: Router,
    private dataContact:ServicesService
  ){}

  ngOnInit():void{
    this.dataContact.obtenerDatos().subscribe(req => {
      this.social = req[0].contacto;
    })
  }

  signIn():void{
    this.router.navigate(["/iniciar-sesion"]);
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
    // Tu lógica para el cambio de tamaño de la ventana aquí
    this.width = window.innerWidth;
    if(this.width > 760){
      this.cerrarMenu();
    }
  }

}
