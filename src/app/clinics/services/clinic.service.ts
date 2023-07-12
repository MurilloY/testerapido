import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ReturnCategories } from 'src/app/adm/returns/categories.retunr';
import { environment } from 'src/environments/environment';
import { ReturnAuthClinic } from '../returns/auth_clinic.return';
import { ReturnClinicName } from '../returns/clinic_name.return';
import { ReturnClincByUserId } from '../returns/clinic_by_user.return';
import { ReturnAppointments } from '../returns/appointments.return';
import { ReturnDashes } from '../returns/dashes.return';
import { ReturnProfClinicCat } from '../returns/prof_clinic_cat.return';
import { ReturnFreeTime } from '../returns/free_time.return';
import { ReturnUserCpf } from '../returns/user-cpf.return';
import { ReturnPacients } from '../returns/pacient_clinic.return';
import { ReturnNotification } from '../returns/notification.return';
import { ReturnProfessional } from '../returns/professionals_clinic.return';
import { ReturnInsertAppointment } from '../returns/insert_appointment.return';
import { ReturnAppointment } from '../returns/appointment.return';
import { ReturnSpecialities } from '../returns/specialities.return';
import { ReturnRegisterTypes } from '../returns/register_types.return';
import { ReturnProfessionalCpf } from '../returns/prof_by_cpf.return';
import { ReturnPaymentTypes } from 'src/app/adm/returns/payment_type';
import { ReturnAppointmentsPayments } from 'src/app/adm/returns/payment';
import { ReturnProfessionalID } from '../returns/prof_by_id.return';
import { ReturnPacient } from '../returns/pacient.return ';
import { ReturnProfByProfId } from '../returns/prof_by_profid.return';
import { ReturnInsuranceClinic } from '../returns/insurance_by_clinic';
import { ReturnProfClinic } from '../returns/prof_clinic.return';
import { ReturnInsuranceId } from '../returns/insurance_by_id';
import { ReturnCanceledAppointment } from '../returns/canceled_appointment.return';
import { ReturnAppointmentById } from '../returns/appointment_by_appid';
import { ReturnCancelQuestions } from '../returns/cancel_questions';
import { ReturnClinic } from '../returns/clinicbyid.return';
import { ReturnClinicUrlVerify } from '../returns/invite_url_verify.return';



@Injectable({
  providedIn: 'root'
})
export class ClinicService {

  constructor(private http: HttpClient, private router: Router) { }

  private _jsonURL = 'assets/json/estados-cidades.json';
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  public getJSON(): Observable<any> {

    return this.http.get(this._jsonURL);

  }

  logout(subdomain:string): void {
    this.loggedIn.next(false);

    localStorage.removeItem('UserClinicObject');
    localStorage.removeItem('clinicToken');
    localStorage.removeItem('clinic_id');

    this.router.navigate([`/clinica/${subdomain}/login`]);
  }


  selectAppointmentsDays(clinic_id:string, days:number): Observable<ReturnAppointments> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.get<any>(`${environment.api}/appointments/clinic/${clinic_id}/days/${days}`, {headers: headerOptions });
  }


  signIn(data:any): Observable<ReturnAuthClinic> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'True', 'Token-Type': 'CLINIC' });
    return this.http.post<any>(`${environment.api}/clinic/auth`, data, {headers: headerOptions });

  }

  updateClinic(clinic_id:string, data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.put<any>(`${environment.api}/clinic/edit/${clinic_id}`, data, {headers: headerOptions });

  }


  insertLastClinic(data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.post<any>(`${environment.api}/lastuserclinic`, data, {headers: headerOptions });

  }



  insertUserProfessionalClinic(data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.post<any>(`${environment.api}/profclinic`, data, {headers: headerOptions });

  }

  updateProfessional(prof_id: string, data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.put<any>(`${environment.api}/professional/edit/${prof_id}`, data, {headers: headerOptions });

  }

  insertUserProfessional(data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.post<any>(`${environment.api}/user/professional`, data, {headers: headerOptions });

  }

  insertProfessional(data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.post<any>(`${environment.api}/professional`, data, {headers: headerOptions });

  }

  selectClinic(clinic_name:string): Observable<ReturnClinicName> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'True', 'Token-Type': 'CLINIC' });
    return this.http.get<any>(`${environment.api}/clinic/subdomain2/${clinic_name}`, {headers: headerOptions });
  }

  verifyLinkProfessional(invitation_url:string): Observable<ReturnClinicUrlVerify> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'True', 'Token-Type': 'CLINIC' });
    return this.http.get<any>(`${environment.api}/sendlinkprofessional/verify/${invitation_url}`, {headers: headerOptions });
  }


  selectClinicByUser(user_id:string, subdomain:string): Observable<ReturnClincByUserId> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.get<any>(`${environment.api}/clinic/user/${user_id}/subdomain/${subdomain}`, {headers: headerOptions });
  }

  getInsurancesByClinic(clinic_id:string): Observable<ReturnInsuranceClinic> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.get<any>(`${environment.api}/insurances/${clinic_id}`, {headers: headerOptions });
  }

  getInsuranceById(ins_id:string): Observable<ReturnInsuranceId> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.get<any>(`${environment.api}/insurance/${ins_id}`, {headers: headerOptions });
  }

  insertInsurance(data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.post<any>(`${environment.api}/insurance`, data, {headers: headerOptions });

  }

  sendLinkProfessional(data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.post<any>(`${environment.api}/sendlinkprofessional`, data, {headers: headerOptions });
  }

  updateInsurance(ins_id:string, data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.put<any>(`${environment.api}/insurance/edit/${ins_id}`, data, {headers: headerOptions });

  }


  insertUser(data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.post<any>(`${environment.api}/user`, data, {headers: headerOptions });

  }

  insertPacientClinic(data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.post<any>(`${environment.api}/pacientclinic/insert`, data, {headers: headerOptions });

  }



  updatetUserProfile(up_id: string, data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.put<any>(`${environment.api}/userprofile/edit/${up_id}`, data, {headers: headerOptions });

  }

  insertUserProfile(data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.post<any>(`${environment.api}/userprofile`, data, {headers: headerOptions });

  }


  updateProfile(profile_id:string, data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.put<any>(`${environment.api}/profile/edit/${profile_id}`, data, {headers: headerOptions });

  }

  insertProfile(data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.post<any>(`${environment.api}/profile`, data, {headers: headerOptions });

  }


  updateCodeRequest(data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'True', 'Token-Type': 'CLINIC' });
    return this.http.post<any>(`${environment.api}/coderequest`, data, {headers: headerOptions });
  }

  updateValidateCode(email:string, code:string): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'True', 'Token-Type': 'CLINIC' });
    return this.http.get<any>(`${environment.api}/coderequest/email/${email}/code/${code}`, {headers: headerOptions });
  }

  updateReplacePassword(data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.put<any>(`${environment.api}/user/change_password_code`, data, {headers: headerOptions });

  }


  getCategoriesByClinic(clinic_id:string): Observable<ReturnCategories> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.get<any>(`${environment.api}/category/clinic/${clinic_id}`, {headers: headerOptions });
  }

  getDashes(clinic_id:string): Observable<ReturnDashes> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.get<any>(`${environment.api}/dashappointments/clinic/${clinic_id}`, {headers: headerOptions });
  }

  getProfessionalByCategory(clinic_id:string, cat_id:string, day:string, type: number): Observable<ReturnProfClinicCat> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.get<any>(`${environment.api}/profclinic/${clinic_id}/cat/${cat_id}/day/${day}/type/${type}`, {headers: headerOptions });
  }

  getProfessionalFreeTime(clinic_id:string, prof_id:string, day:string, type: number): Observable<ReturnFreeTime> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.get<any>(`${environment.api}/profclinic/${clinic_id}/prof/${prof_id}/day/${day}/type/${type}`, {headers: headerOptions });
  }

  getUserCPF(cpf:string): Observable<ReturnUserCpf> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.get<any>(`${environment.api}/usercpf/${cpf}`, {headers: headerOptions });

  }

  getUserorPacientclinicCPF(clinic_id:string, cpf:string): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.get<any>(`${environment.api}/pacientclinic/${clinic_id}/cpf/${cpf}`, {headers: headerOptions });
  }

  getUserCPFVerify(clinic_id:string, cpf:string): Observable<ReturnUserCpf> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.get<any>(`${environment.api}/pacientclinic/verify/${clinic_id}/cpf/${cpf}`, {headers: headerOptions });

  }

  selectPacientLastappointments(clinic_id:string): Observable<ReturnPacients> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.get<any>(`${environment.api}/pacientclinic/clinic/${clinic_id}`, {headers: headerOptions });

  }

  canceledAppointment(app_id:string, data:any): Observable<ReturnCanceledAppointment> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.put<any>(`${environment.api}/appointments/canceled/${app_id}`, data, {headers: headerOptions });

  }


  getNotification(user_id:string): Observable<ReturnNotification> {
    let headerOptions = new HttpHeaders({ 'NO-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.get<any>(`${environment.api}/notification/${user_id}`, {headers: headerOptions });

  }
  
  getAppointmentInfo(app_id:string): Observable<ReturnAppointmentById> {
    let headerOptions = new HttpHeaders({ 'NO-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.get<any>(`${environment.api}/appointment/${app_id}`, {headers: headerOptions });

  }

  getCancelQuestions(cq_type: string): Observable<ReturnCancelQuestions> {
    let headerOptions = new HttpHeaders({ 'NO-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.get<any>(`${environment.api}/cancellationquestions/${cq_type}`, {headers: headerOptions });

  }
  
  selectProfessionalsClinic(clinic_id:string): Observable<ReturnProfessional> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.get<any>(`${environment.api}/profclinic/apptype/clinic/${clinic_id}`, {headers: headerOptions });
    
  }

  insertPacient(data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.post<any>(`${environment.api}/pacientclinic/verify`, data, {headers: headerOptions });

  }

  insertAppointment(data:any): Observable<ReturnInsertAppointment> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.post<any>(`${environment.api}/appointments/insert/form`, data, {headers: headerOptions });

  }

  getAppointmentById(app_id:string): Observable<ReturnAppointment> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.get<any>(`${environment.api}/appointment/${app_id}`, {headers: headerOptions });
  }

  getSpecialitiesByCategory(cat_id: string): Observable<ReturnSpecialities> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.get<any>(`${environment.api}/specialitycat/${cat_id}`, {headers: headerOptions });
    
  }

  getRegisterTypes(): Observable<ReturnRegisterTypes> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.get<any>(`${environment.api}/registers`, {headers: headerOptions });
    
  }

  getCategories(): Observable<ReturnCategories> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.get<any>(`${environment.api}/categories`, {headers: headerOptions });
    
  }

  insertProfessionalVerify(data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.post<any>(`${environment.api}/profclinic/verify`, data, {headers: headerOptions });
    
  }

  getClinic(clinic_id: string): Observable<ReturnClinic> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.get<any>(`${environment.api}/clinic/${clinic_id}`, {headers: headerOptions });
    
  }

  deleteProfessional(pc_id: string): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.delete<any>(`${environment.api}/profclinic/delete/professional/${pc_id}`, {headers: headerOptions });

  }

  deletePacient(pc_id: string): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.delete<any>(`${environment.api}/pacientclinic/delete/${pc_id}`, {headers: headerOptions });

  }

  getProfCPFVerify(clinic_id:string, cpf:string): Observable<ReturnProfessionalCpf> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.get<any>(`${environment.api}/profclinic/${clinic_id}/cpf/${cpf}`, {headers: headerOptions });

  }

  convertToB64(path:string): Observable<any> {
    return this.http.get(path, { responseType: 'blob' })

  }

  selectedProfessionalByProfId(prof_id:string): Observable<ReturnProfByProfId> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.get<any>(`${environment.api}/profclinic/prof_id/${prof_id}`, {headers: headerOptions });

  }

  getProfClincByPcId(pc_id:string): Observable<ReturnProfClinic> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.get<any>(`${environment.api}/profclinic/${pc_id}`, {headers: headerOptions });

  }

  getPaymentTypes(): Observable<ReturnPaymentTypes> {
    let headerOptions = new HttpHeaders({ 'NO-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.get<any>(`${environment.api}/appointmentspayments`, {headers: headerOptions });

  }

  getPaymentbyId(ap_id:string): Observable<ReturnAppointmentsPayments> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.get<any>(`${environment.api}/appointmentpayments/${ap_id}`, {headers: headerOptions });

  }

  insertPayment(data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.post<any>(`${environment.api}/appointmentpayment/insert`, data, {headers: headerOptions });

  }

  updatePayment(ap_id:string, data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.put<any>(`${environment.api}/appointmentpayments/update/${ap_id}`, data, {headers: headerOptions });

  }

  updateLinkProfessional(invitation_url:string): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.put<any>(`${environment.api}/sendlinkprofessional/update/${invitation_url}`, {headers: headerOptions });

  }

  updateCanceled(app_id: string, data:any): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.put<any>(`${environment.api}/appointments/canceled/${app_id}`, data, {headers: headerOptions });

  }

  getProfbyID(prof_id:string): Observable<ReturnProfessionalID> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.get<any>(`${environment.api}/professional/${prof_id}`, {headers: headerOptions });

  }

  getPacientClinicByClinic(pc_id:string, clinic_id:string): Observable<ReturnPacient> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' }); 
    return this.http.get<any>(`${environment.api}/pacientclinic/pc_id/${pc_id}/clinic/${clinic_id}`, {headers: headerOptions });
  }

  getPacientClinic(pc_id:string): Observable<ReturnPacient> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' }); 
    return this.http.get<any>(`${environment.api}/pacientclinic/pc_id/${pc_id}`, {headers: headerOptions });
  }

  getUserPhoto(user_id:string): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'CLINIC' });
    return this.http.get<any>(`${environment.api}/user/photo/${user_id}`, {headers: headerOptions });
  }



}
