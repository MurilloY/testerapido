import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReturnAppointment } from '../returns/appointment.return';
import { ReturnGetMessages } from '../returns/getmessages';
import { ReturnVerifyUrl } from '../returns/verifyurl.return';
import { ReturnAnamnese } from '../returns/anamnese_return';
import { ReturnCertificates } from '../returns/certificates_return';
import { ReturnAnexos } from '../returns/anexos_return';
import { ReturnCertificate } from '../returns/certificate.return';
import { RetunAppointment } from '../returns/appointment_atestado_return';
import { ReturnAnamneseByAnamId } from '../returns/anamnese_anam_id';
import { ReturnPacientClinic } from '../returns/pacient_clinic_return';
import { ReturnPrescription } from '../returns/prescription_return';
import { ReturnPrescriptionById } from '../returns/prescription_preid';



@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient, private router: Router) { }

  private _jsonURL = 'assets/json/estados-cidades.json';
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  public getJSON(): Observable<any> {

    return this.http.get(this._jsonURL);

  }




  getAppointmentById(app_id: string): Observable<ReturnAppointment> {
    let headerOptions = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.get<any>(`${environment.api}/appointment/${app_id}`, { headers: headerOptions });
  }

  getVerifyUrl(url: string): Observable<ReturnVerifyUrl> {
    let headerOptions = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.get<any>(`${environment.api}/appointment/verify/url/${url}`, { headers: headerOptions });
  }

  insertPrescription(data: any, token: string): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth': 'False', 'Authorization': `Bearer ${token}` });
    return this.http.post<any>(`${environment.api}/prescriptions/insert`, data, { headers: headerOptions });

}

getPrescriptionById(pre_id: string, token:string): Observable<ReturnPrescriptionById> {
  let headerOptions = new HttpHeaders({ 'No-Auth': 'False', 'Authorization': `Bearer ${token}` });
  return this.http.get<any>(`${environment.api}/prescriptions/${pre_id}`, { headers: headerOptions });
}

  getVerifyUrlProcess(url: string): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.get<any>(`${environment.api}/appointment/process/url/${url}`, { headers: headerOptions });
  }

  getCertificates(app_id: string, token: string): Observable<ReturnCertificates> {
    let headerOptions = new HttpHeaders({ 'No-Auth': 'True', 'Authorization': `Bearer ${token}` });
    return this.http.get<any>(`${environment.api}/certificate/verify/sala/app_id/${app_id}`, { headers: headerOptions });
}

  downloadAnexo(ane_id: string, token:string): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth': 'False', 'Authorization': `Bearer ${token}` });
    return this.http.get(`${environment.api}/anexo/download/${ane_id}`, { responseType: 'blob', headers: headerOptions });
  }

  getAnexosVerify(app_id: string, token: string): Observable<ReturnAnexos> {
    let headerOptions = new HttpHeaders({ 'No-Auth': 'False', 'Authorization': `Bearer ${token}` });
    return this.http.get<any>(`${environment.api}/anexos/verify/sala/app_id/${app_id}`, { headers: headerOptions });
  }

  getPacientClinic(pc_id: string, token: string): Observable<ReturnPacientClinic> {
        let headerOptions = new HttpHeaders({ 'No-Auth': 'False', 'Authorization': `Bearer ${token}` });
        return this.http.get<any>(`${environment.api}/pacientclinic/pc_id/${pc_id}`, { headers: headerOptions });
    }

getCertificateById(cert_id: string, token: string): Observable<ReturnCertificate> {
  let headerOptions = new HttpHeaders({ 'No-Auth': 'True', 'Authorization': `Bearer ${token}` });
  return this.http.get<any>(`${environment.api}/certificate/${cert_id}`, { headers: headerOptions });
}

getAppointment(app_id: string, token: string): Observable<RetunAppointment> {
  let headerOptions = new HttpHeaders({ 'No-Auth': 'True', 'Authorization': `Bearer ${token}` });
  return this.http.get<any>(`${environment.api}/appointment/professional/app_id/${app_id}`, { headers: headerOptions });
}

  showImage(user_id: string, token: string): Observable<string> {
    const headerOptions = new HttpHeaders({ 'No-Auth': 'True', 'Authorization': `Bearer ${token}` });
    return this.http.get(`${environment.api}/user/photo/${user_id}`, { headers: headerOptions, responseType: 'blob' })
      .pipe(
        map(blob => URL.createObjectURL(blob))
      );
  }

  getAnamneseVerify(app_id: string, token:string): Observable<ReturnAnamnese> {
    let headerOptions = new HttpHeaders({ 'No-Auth': 'False', 'Authorization': `Bearer ${token}` });
    return this.http.get<any>(`${environment.api}/anamnesis/verify/sala/${app_id}`, { headers: headerOptions });
  }

  getChatMessages(app_id: string): Observable<ReturnGetMessages> {
    let headerOptions = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.get<any>(`${environment.api}/appointment/messages/app_id/${app_id}`, { headers: headerOptions });
  }

  updateAppointmentById(app_id: string): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.put<any>(`${environment.api}/appointment/update/confirmdate/${app_id}`, { headers: headerOptions });
  }

  updateAppointmentById2(app_id: string): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.put<any>(`${environment.api}/appointment/update/canceldate/${app_id}`, { headers: headerOptions });
  }


  insertAnexo(data: any, token: string): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth': 'False', 'Authorization': `Bearer ${token}` });
    return this.http.post<any>(`${environment.api}/anexos/insert`, data, { headers: headerOptions });

  }

  getPrescription(app_id: string, token: string): Observable<ReturnPrescription> {
    let headerOptions = new HttpHeaders({ 'No-Auth': 'False', 'Authorization': `Bearer ${token}` });
    return this.http.get<any>(`${environment.api}/prescriptions/sala/app/${app_id}`, { headers: headerOptions });
}

  insertCertificate(data: any, token:string): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth': 'False', 'Authorization': `Bearer ${token}` });
    return this.http.post<any>(`${environment.api}/certificate/insert`, data, { headers: headerOptions });

}

  insertAnamnese(data: any, token: string): Observable<any> {
    let headerOptions = new HttpHeaders({ 'No-Auth': 'False', 'Authorization': `Bearer ${token}` });
    return this.http.post<any>(`${environment.api}/anamnesis/insert`, data, { headers: headerOptions });

  }

  getAnamnese(anam_id: string, token:string): Observable<ReturnAnamneseByAnamId> {
    let headerOptions = new HttpHeaders({ 'No-Auth': 'True', 'Authorization': `Bearer ${token}` });
    return this.http.get<any>(`${environment.api}/anamnesis/${anam_id}`, { headers: headerOptions });
}



}
