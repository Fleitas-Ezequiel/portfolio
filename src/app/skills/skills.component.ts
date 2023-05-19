import { Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {

  skills = [
    {habilidad:"html", url:"../../assets/images/skills/html-logo.png"},
    {habilidad:"css", url:"../../assets/images/skills/css-logo.png"},
    {habilidad:"javascript", url:"../../assets/images/skills/javascript-logo.png"},
    {habilidad:"Angular", url:"../../assets/images/skills/angular-logo.png"},
    {habilidad:"Spring Boot", url:"../../assets/images/skills/springboot-logo.png"}
  ]


}
