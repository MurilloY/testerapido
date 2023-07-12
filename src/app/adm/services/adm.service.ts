import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReturnAdms } from '../returns/adms.return';
import { ReturnCategories } from '../returns/categories.retunr';
import { ReturnClinic } from '../returns/clinic.return';
import { ReturnClinics } from '../returns/clinics.return';
import { ReturnDashClinic } from '../returns/dash_clinic.return';
import { ReturnHealthPlans } from '../returns/health_plans.return';
import { ReturnLeadsHistoriesId } from '../returns/leads_histories';
import { ReturnLeads } from '../returns/leads_return';
import { ReturnAdmLogin } from '../returns/login_adm.return';
import { ReturnMenus } from '../returns/menus.return';
import { ReturnPatientsClinic } from '../returns/patients.return';
import { ReturnProfessionals } from '../returns/professionals.return';
import { ReturnProfessinalsClinic } from '../returns/professional_clinic.return';
import { ReturnProfiles } from '../returns/profiles.return';
import { ReturnAllQuestionsCancel } from '../returns/questionscancel';
import { ReturnRegisterTypes } from '../returns/register_types.return';
import { ReturnSpecialities } from '../returns/specialities.return';
import { ReturnUserCpf } from '../returns/user-cpf.return';
import { ReturnUserType } from '../returns/user-type.return';
import { ReturnUsersProfile } from '../returns/users_profile.return';
import { ReturnClinicinfo } from '../returns/clinicbyid_return';

@Injectable({
  providedIn: 'root'
})
export class AdmService {

  constructor(private http: HttpClient, private router: Router) { }

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  logout(): void {
    this.loggedIn.next(false);

    localStorage.removeItem('UserAdmObject');
    localStorage.removeItem('admToken');

  
    this.router.navigate(['/adm/login']);
  } 

  private _jsonURL = 'assets/json/estados-cidades.json';

  public getJSON(): Observable<any> {

    return this.http.get(this._jsonURL);
  
  }

  signIn(data:any): Observable<ReturnAdmLogin> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'True', 'Token-Type': 'ADM' });
    return this.http.post<any>(`${environment.api}/adm/auth`, data, {headers: headerOptions });
    
  }

  convertToB64(path: string): Observable<any> {
    return this.http.get(path, { responseType: 'blob' })

}

  // Clinics
  getAllClinics(): Observable<ReturnClinics> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.get<any>(`${environment.api}/clinics`, {headers: headerOptions });
    
  }

  insertClinic(data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.post<any>(`${environment.api}/clinic`, data, {headers: headerOptions });
    
  }

  updateClinic(clinic_id:string, data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.put<any>(`${environment.api}/clinic/edit/${clinic_id}`, data, {headers: headerOptions });
    
  }

  getClinic(clinic_id: string): Observable<ReturnClinic> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.get<any>(`${environment.api}/clinic/${clinic_id}`, {headers: headerOptions });
    
  }

  clinicByid(clinic_id: string): Observable<ReturnClinicinfo> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.get<any>(`${environment.api}/clinic/${clinic_id}`, {headers: headerOptions });
    
  }

  getDashClinic(clinic_id: string): Observable<ReturnDashClinic> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.get<any>(`${environment.api}/dashclinic/${clinic_id}`, {headers: headerOptions });
    
  }

  // Health_Plans
  getAllHealthPlans(): Observable<ReturnHealthPlans> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.get<any>(`${environment.api}/health_plans`, {headers: headerOptions });
    
  }

  insertHealthPlan(data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.post<any>(`${environment.api}/health_plan`, data, {headers: headerOptions });
    
  }

  updateHealthPlan(clinic_id:string, data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.put<any>(`${environment.api}/health_plan/edit/${clinic_id}`, data, {headers: headerOptions });
    
  }

  updateStatusUserProfile(up_id:string, data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.put<any>(`${environment.api}/profile/update/status/${up_id}`, data, {headers: headerOptions });
    
  }

  getAllProfessionals(): Observable<ReturnProfessionals> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.get<any>(`${environment.api}/professionals`, {headers: headerOptions });
    
  }

  getProfessionalsByClinic(clinic_id: string): Observable<ReturnProfessinalsClinic> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.get<any>(`${environment.api}/profclinicies/${clinic_id}`, {headers: headerOptions });
    
  }


  getCategories(): Observable<ReturnCategories> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.get<any>(`${environment.api}/categories`, {headers: headerOptions });
    
  }

  updateCategory(category_id:string, data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.put<any>(`${environment.api}/category/edit/${category_id}`, data, {headers: headerOptions });
    
  }

  insertCategory(data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.post<any>(`${environment.api}/category`, data, {headers: headerOptions });
    
  }


  getRegisterTypes(): Observable<ReturnRegisterTypes> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.get<any>(`${environment.api}/registers`, {headers: headerOptions });
    
  }

  updateRegister(reg_id:string, data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.put<any>(`${environment.api}/register/edit/${reg_id}`, data, {headers: headerOptions });
    
  }

  insertRegister(data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.post<any>(`${environment.api}/register`, data, {headers: headerOptions });
    
  }


  getSpecialities(): Observable<ReturnSpecialities> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.get<any>(`${environment.api}/specialities`, {headers: headerOptions });
    
  }

  updateSpeciality(spe_id:string, data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.put<any>(`${environment.api}/speciality/edit/${spe_id}`, data, {headers: headerOptions });
    
  }

  insertSpeciality(data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.post<any>(`${environment.api}/speciality`, data, {headers: headerOptions });
    
  }

  getSpecialitiesByCategory(cat_id: string): Observable<ReturnSpecialities> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.get<any>(`${environment.api}/specialitycat/${cat_id}`, {headers: headerOptions });
    
  }


  getAdms(): Observable<ReturnAdms> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.get<any>(`${environment.api}/adms`, {headers: headerOptions });
    
  }

  getUserType(cpf:string): Observable<ReturnUserType> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.get<any>(`${environment.api}/usertype/cpf/${cpf}`, {headers: headerOptions });
    
  }

  getUserCPF(cpf:string): Observable<ReturnUserCpf> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.get<any>(`${environment.api}/usercpf/${cpf}`, {headers: headerOptions });
    
  }

  insertUser(data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.post<any>(`${environment.api}/user`, data, {headers: headerOptions });
    
  }

  insertUserAdm(data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.post<any>(`${environment.api}/adm`, data, {headers: headerOptions });
    
  }

  updateADM(adm_id:string, data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.put<any>(`${environment.api}/adms/edit/${adm_id}`, data, {headers: headerOptions });
    
  }

  deleteAdm(adm_id:string): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.delete<any>(`${environment.api}/adm/delete/${adm_id}`, {headers: headerOptions });
    
  }

  insertUserProfessional(data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.post<any>(`${environment.api}/user/professional`, data, {headers: headerOptions });
    
  }

  insertProfessional(data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.post<any>(`${environment.api}/professional`, data, {headers: headerOptions });
    
  }

  insertUserProfessionalClinic(data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.post<any>(`${environment.api}/profclinic`, data, {headers: headerOptions });
    
  }

  getUsersProfile(pan_id:string, id:string): Observable<ReturnUsersProfile> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.get<any>(`${environment.api}/userprofile/${pan_id}/${id}`, {headers: headerOptions });
    
  }

  getProfiles(pan_id:string, id:string): Observable<ReturnProfiles> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.get<any>(`${environment.api}/profiles/${pan_id}/${id}`, {headers: headerOptions });
    
  }

  getMenus(pan_id:string): Observable<ReturnMenus> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.get<any>(`${environment.api}/menus/${pan_id}`, {headers: headerOptions });
    
  }

  getMenusProfileSelected(profile_id:string, pan_id:string): Observable<ReturnMenus> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.get<any>(`${environment.api}/menus/selected/${profile_id}/${pan_id}`, {headers: headerOptions });
    
  }

  insertProfile(data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.post<any>(`${environment.api}/profile`, data, {headers: headerOptions });
    
  }

  updateProfile(profile_id:string, data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.put<any>(`${environment.api}/profile/edit/${profile_id}`, data, {headers: headerOptions });
    
  }

  insertUserProfile(data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.post<any>(`${environment.api}/userprofile`, data, {headers: headerOptions });
    
  }

  updatetUserProfile(up_id: string, data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.put<any>(`${environment.api}/userprofile/edit/${up_id}`, data, {headers: headerOptions });
    
  }

  insertPacientClinic(data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.post<any>(`${environment.api}/pacientclinic/insert`, data, {headers: headerOptions });
    
  }

  getPatientsOfClinic(clinic_id:string): Observable<ReturnPatientsClinic> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.get<any>(`${environment.api}/pacientclinic/${clinic_id}`, {headers: headerOptions });
    
  }

  updateProfessional(prof_id: string, data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.put<any>(`${environment.api}/professional/edit/${prof_id}`, data, {headers: headerOptions });
    
  }

  updateUserProf(user_id: string, prof_id: string, data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.put<any>(`${environment.api}/user/edituserprof/${user_id}/prof_id/${prof_id}`, data, {headers: headerOptions });
    
  }

  insertQuestionsCancel(data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.post<any>(`${environment.api}/cancellationquestions/insert`, data, {headers: headerOptions });
    
  }

  deleteQuestionCancel(cq_id:string): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.delete<any>(`${environment.api}/cancellationquestions/delete/${cq_id}`, {headers: headerOptions });
    
  }

  getQuestionsCancel(): Observable<ReturnAllQuestionsCancel> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.get<any>(`${environment.api}/cancellationquestions`, {headers: headerOptions });
    
  }

  insertLead(data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.post<any>(`${environment.api}/leads/insert`, data, {headers: headerOptions });
    
  }

  updateLead(leas_id: string, data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.put<any>(`${environment.api}/leads/update/${leas_id}`, data, {headers: headerOptions });
    
  }

  getLeads(): Observable<ReturnLeads> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.get<any>(`${environment.api}/leads`, {headers: headerOptions });
    
  }

  insertLeadHistory(data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.post<any>(`${environment.api}/leadshistory/insert`, data, {headers: headerOptions });
    
  }

  getLeadsHistoriesId(lead_id: string): Observable<ReturnLeadsHistoriesId> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.get<any>(`${environment.api}/leadshistorys/${lead_id}`, {headers: headerOptions });
    
  }

  updateQuestionCancel(cq_id: string, data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.put<any>(`${environment.api}/cancellationquestions/update/${cq_id}`, data, {headers: headerOptions });
    
  }

  deleteWhatsapp(): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.delete<any>(environment.api + `/i9care/disconnect/whatsapp`, {headers: headerOptions });
    
  }

  getWhatsapp(): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'ADM' });
    return this.http.get<any>(environment.api + `/i9care/whatsapp`, {headers: headerOptions });
    
  }


}
