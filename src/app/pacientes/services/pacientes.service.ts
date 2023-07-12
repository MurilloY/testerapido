import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReturnPacientAuth } from '../returns/pacient_auth_return';
import { ReturnCategories } from '../returns/categories_return';
import { ReturnClinicsCities } from '../returns/pacient_clinics_cities_return';
import { ReturnCategoriesOnline } from '../returns/categories_online_return';
import { ReturnProfessionalsByCity } from '../returns/professionalsbycity_return';
import { ReturnProfClinicCat } from '../returns/prof_clinic_by_cat_return';
import { ReturnFreeTime } from '../returns/professional_free_time_return';
import { ReturnAppointment } from '../returns/appointments_return';
import { PacientClinicCPF } from '../returns/pacientclinic_cpf_return';
import { ReturnHolders } from '../returns/holders_return';
import { ReturnVerifyAuth } from '../returns/verify_auth_return';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  constructor(private http: HttpClient, private router: Router) { }
  private _jsonURL = 'assets/json/estados-cidades.json';
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  public getJSON(): Observable<any> {

    return this.http.get(this._jsonURL);
  }


  logout(): Observable<any> {
    this.loggedIn.next(false);
    localStorage.removeItem('UserPacientObject');
    localStorage.removeItem('pacienteToken');
    this.router.navigate([`/paciente/login`]);
    return of(true); // emite um valor true quando o logout é realizado com sucesso
  }

  postAuthPacient(data: any): Observable<ReturnPacientAuth> {
    let headerOptions = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post<any>(`${environment.api}/pacient/auth`, data, { headers: headerOptions });
  }

  postVerifyAuthPacient(data: any): Observable<ReturnVerifyAuth> {
    let headerOptions = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post<any>(`${environment.api}/pacient/auth/verify/choice`, data, { headers: headerOptions });
  }

  updateCodeRequest(data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'True', 'Token-Type': 'PACIENTE' });
    return this.http.post<any>(`${environment.api}/coderequest`, data, {headers: headerOptions });
  }

  updateValidateCode(email:string, code:string): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'True', 'Token-Type': 'PACIENTE' });
    return this.http.get<any>(`${environment.api}/coderequest/email/${email}/code/${code}`, {headers: headerOptions });
  }

  updateReplacePassword(data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'PACIENTE' });
    return this.http.put<any>(`${environment.api}/user/change_password_code`, data, {headers: headerOptions });

  }

  getCategoriesByClinic(clinic_town:string): Observable<ReturnCategories> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'PACIENTE' });
    return this.http.get<any>(`${environment.api}/paciente/categories/${clinic_town}`, {headers: headerOptions });
  }

  getClinicCities(): Observable<ReturnClinicsCities> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'PACIENTE' });
    return this.http.get<any>(`${environment.api}/pacient/clinics/cities`, {headers: headerOptions });
  }

  getPacientClinic(clinic_id:string, user_cpf:string): Observable<PacientClinicCPF> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'PACIENTE' });
    return this.http.get<any>(`${environment.api}/pacientclinic/${clinic_id}/cpf/${user_cpf}`, {headers: headerOptions });
  }

  getCategoriesByClinicOnline(): Observable<ReturnCategoriesOnline> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'PACIENTE' });
    return this.http.get<any>(`${environment.api}/categories`, {headers: headerOptions });
  }

  getProfessionalsByCity(clinic_town:string, cat_id:string): Observable<ReturnProfessionalsByCity> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'PACIENTE' });
    return this.http.get<any>(`${environment.api}/paciente/professionals/city/${clinic_town}/category/${cat_id}`, {headers: headerOptions });
  }

  getProfessionalByCategory(cat_id:string, clinic_town:string, weekday_id:string): Observable<ReturnProfClinicCat> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'PACIENTE' });
    return this.http.get<any>(`${environment.api}/paciente/professionals/category/${cat_id}/city/${clinic_town}/day/${weekday_id}`, {headers: headerOptions });
  }

  getProfessionalFreeTime(clinic_id:string, prof_id:string, day:string, type: number): Observable<ReturnFreeTime> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'PACIENTE' });
    return this.http.get<any>(`${environment.api}/profclinic/${clinic_id}/prof/${prof_id}/day/${day}/type/${type}`, {headers: headerOptions });
  }

  insertAppointment(data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'PACIENTE' });
    return this.http.post<any>(`${environment.api}/appointments/insert`, data, {headers: headerOptions });

  }

  getAppointmentById(app_id:string): Observable<ReturnAppointment> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'PACIENTE' });
    return this.http.get<any>(`${environment.api}/appointment/${app_id}`, {headers: headerOptions });
  }

  getHolders(companion_id:string, clinic_id:string): Observable<ReturnHolders> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'PACIENTE' });
    return this.http.get<any>(`${environment.api}/pacient/holders/${companion_id}/clinic/${clinic_id}`, {headers: headerOptions });
  }
}
