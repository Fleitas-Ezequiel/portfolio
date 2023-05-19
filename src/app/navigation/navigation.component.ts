import { Component } from '@angular/core';
import { ServicesService } from '../servicios/services.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  
  constructor(private obtenerDatos:ServicesService){}

  ngOnInit(): void{
    this.obtenerDatos.obtenerDatos().subscribe( dataTest =>{
      console.log(dataTest[0]);
    });
  }
}
