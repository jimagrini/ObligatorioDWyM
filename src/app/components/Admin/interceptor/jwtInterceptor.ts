import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SecurityService } from './securityService';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(
        private securityService: SecurityService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Obtener el token JWT del servicio de seguridad
        const token = this.securityService.GetToken();
        
        // Si hay un token, agregarlo a las cabeceras de la solicitud
        if (token) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        // Continuar con la solicitud modificada
        return next.handle(req);
    }
}
