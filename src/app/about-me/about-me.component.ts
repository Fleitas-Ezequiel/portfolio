import { Component } from '@angular/core';
import { ServicesService } from '../servicios/services.service';
import { HttpRequest, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent {

  datos:any;
  descripcion:String = "aca si me olvide gg";

  constructor(
    private datosAbout:ServicesService
  ){}

  ngOnInit():void{
    this.datosAbout.obtenerDatos().subscribe(data =>{
      this.datos = data[0];
    });
  }
}
