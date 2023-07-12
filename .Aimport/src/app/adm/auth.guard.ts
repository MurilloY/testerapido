import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {


    constructor(private router : Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;  


        return this.verifyLogin(url);
    }

    verifyLogin(url: string) : boolean{

        
        if(!this.isLoggedIn()){
            this.router.navigate(['adm/login']);
            return false;
        }
        else{
            return true;
        }

    
    }
    public isLoggedIn(): boolean{
        let status = false;

        if( localStorage.getItem('admToken') != null &&  localStorage.getItem('admToken') != undefined &&  localStorage.getItem('admToken') != 'undefined'){

          status = true;

        }
        else{

          status = false;
        }
        return status;
    }
}