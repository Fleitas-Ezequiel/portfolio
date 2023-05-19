import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  form:FormGroup;
  estado:String = "password";

  // FormBuilder es un servicio, por lo tanto debemos inyectarlo en el construcor
  constructor( private formBuilder:FormBuilder, private authenticationService:AuthService, private ruta:Router){
    this.form = this.formBuilder.group(
      {
        email:['',[Validators.required, Validators.email]],
        password:['',[Validators.required, Validators.minLength(8)]]
      }
    )
  }

  ngOnInit(): void {}

  get Email(){
    return this.form.get('email');
  }

  get Password(){
    return this.form.get('password');
  }

  onSend(event:Event){
    event.preventDefault;
    this.authenticationService.IniciarSesion(this.form.value).subscribe(data =>{
      console.log("Data: "+JSON.stringify(data));
      this.ruta.navigate(['/account']);
    })
  }

  cancel():void{
    this.ruta.navigate(['/home']);
  }

  ver():void{
    this.estado = (this.estado == 'password')? this.estado = 'text': this.estado = 'password';
  }
}
