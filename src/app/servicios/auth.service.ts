import { Injectable } from '@angular/core';

//Llamada a la API
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

//Libreria 'rxjs' de javascript para programacion reactiva, son observables
import { BehaviorSubject, Observable } from 'rxjs';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url="springboot-api-production-c063.up.railway.app/";
  currentUserSubject: BehaviorSubject<any>;

  //inyectamos el servicio de http client
  constructor( private http:HttpClient ) {
    console.log('El servicio de autenticacion esta corriendo');
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
  }

  IniciarSesion(credenciales:any):Observable<any>{
    return this.http.post(this.url + 'login', credenciales,{observe:'response'}).pipe(map((response:HttpResponse<any>) =>{
      const body = response.body;
      const headers = response.headers;

      const bearerToken = headers.get('Authorization')!;
      const token = bearerToken.replace('Bearer ', '');

      localStorage.setItem('currentUser', JSON.stringify(token));
      this.currentUserSubject.next(token);
      return token;
    }))
  }

  get UsuarioAutenticado()
  {
    return this.currentUserSubject.value;
  }
  
  CerrarSesion(){
    localStorage.removeItem('currentUser');
    console.log(localStorage.getItem.toString);
  }

  
}
