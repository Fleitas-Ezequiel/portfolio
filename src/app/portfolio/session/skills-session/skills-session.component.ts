import { Component } from '@angular/core';
import { ServicesService } from 'src/app/servicios/services.service';

@Component({
  selector: 'app-skills-session',
  templateUrl: './skills-session.component.html',
  styleUrls: ['./skills-session.component.css']
})
export class SkillsSessionComponent {

  skills:any;

  constructor( private datosSkills:ServicesService ){}

  ngOnInit():void{
    this.datosSkills.obtenerDatos().subscribe(req =>{
      this.skills = req[0].skills;
    })
  }
}
