import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { catchError } from 'rxjs/operators';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let url: String = this.router.routerState.snapshot.url;

    if (req.headers.get('No-Auth') == "True") {

      return next.handle(req.clone());
    }




    if (req.headers.get('Token-Type') == 'CLINIC' && url.includes('clinica')) {


      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + localStorage.getItem('clinicToken')
        }
      });

    }

    if (req.headers.get('Token-Type') == 'ADM' && url.includes('adm')) {


      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + localStorage.getItem('admToken')
        }
      });

    }

    if (req.headers.get('Token-Type') == 'PACIENTE' && url.includes('paciente')) {


      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + localStorage.getItem('pacienteToken')
        }
      });

    }

    if (req.headers.get('Token-Type') == 'PROFESSIONAL' && url.includes('profissional')) {


      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + localStorage.getItem('profToken')
        }
      });

    }else {
      // console.log("AQUI" , req.headers.get('Token-Type'))
    }



    return next.handle(req).pipe(
      catchError(err => {

        if (err instanceof HttpErrorResponse && err.status === 0) {

          console.log('Check Your Internet Connection And Try again Later');
        }
        else if (err instanceof HttpErrorResponse && err.status === 401) {


          if (url.includes('clinica')) {

            localStorage.removeItem('UserClinicObject');
            localStorage.removeItem('clinicToken');
            localStorage.removeItem('clinic_id');

            let url = this.router.url;
            let split = url.split("/");
            let clinic_subdomain = split[2];

            this.router.navigate([`/clinica/${clinic_subdomain}/login`]);

          }


          if (url.includes('adm')) {

            localStorage.removeItem('UserAdmObject');
            localStorage.removeItem('admToken');

            this.router.navigate(['/adm/login']);

          }



        }

        return throwError(err);
      })
    );
  }
}