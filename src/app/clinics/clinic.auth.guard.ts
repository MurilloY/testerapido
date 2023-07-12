import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class ClinicAuthGuard implements CanActivate {

    clinic_subdomain: string;


    constructor(private router : Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        let url: string = state.url;  
        console.log(url)
        let split = url.split("/");
        this.clinic_subdomain = split[2];

        


        return this.verifyLogin();
    }

    verifyLogin() : boolean{

        

    
        
        if(!this.isLoggedIn()){
            this.router.navigate([`/clinica/${this.clinic_subdomain}/login`]);
            return false;
        }
        else{
            return true;
        }

        
    }
    public isLoggedIn(): boolean{
        let status = false;


        if( localStorage.getItem('clinicToken') != null &&  localStorage.getItem('clinicToken') != undefined &&  localStorage.getItem('clinicToken') != 'undefined' &&  localStorage.getItem('clinicToken') != 'null'){

          status = true;

        }
        else{

          status = false;
        }


        return status;
    }
}