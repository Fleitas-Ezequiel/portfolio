import { Injectable } from '@angular/core';
import { HttpHandler, HttpEvent, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor( private authenticationuser: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentUser = this.authenticationuser.UsuarioAutenticado;
    if(currentUser){
      const cloned = req.clone({
        headers:
          req.headers.set('Authorization', `Bearer ${currentUser}`)
          // Authorization: `Bearer ${currentUser.accesToken}`
        
      });
      return next.handle(cloned);
    }
    console.log('Interceptor esta corriendo ' + JSON.stringify(currentUser));
    return next.handle(req);
  }
}
