import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http:HttpClient, private autenticacionServicio:AuthService ) { }

  // direccion:String = 'https://springboot-api-production-c063.up.railway.app/api';
  direccion:String = 'http://localhost:8080/api'; // Direccion de testing

  obtenerDatos():Observable<any>{
    
    return this.http.get(this.direccion+'/ver/datos');
  }

  guardarDatos( dir:string, datos:any ):Observable<any>{
    const token = this.autenticacionServicio.UsuarioAutenticado;
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })
    return this.http.post( this.direccion.concat(dir) , datos, { headers:header });
  }

  actualizarDatos(dir:string, datos:any):Observable<any>{
    const token = this.autenticacionServicio.UsuarioAutenticado;
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })
    return this.http.put( this.direccion.concat(dir) + dir, datos, { headers:header });
  }

  eliminarDatos(dir:string):Observable<any>{
    const token = this.autenticacionServicio.UsuarioAutenticado;
    const header = new HttpHeaders({
      'Content-Type' : 'application/json',
      Authorization : `Bearer ${token}`
    })
    return this.http.delete(this.direccion.concat(dir), { headers:header });
  }
}
