import { Component } from '@angular/core';
import { ServicesService } from '../servicios/services.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {

  skills:any;

  constructor( private service:ServicesService ){}

  ngOnInit(){
    this.service.obtenerDatos().subscribe(req => {
      this.skills = req[0].skills;
    })
  }


}
