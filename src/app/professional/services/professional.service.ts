import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, map } from "rxjs";
import { environment } from "src/environments/environment";
import { ReturnProfAppointment } from "../returns/appointments_prof.return";
import { ReturnAuthProfessional } from "../returns/auth_professional.return";
import { ReturnDashes } from "../returns/dashes_return";
import { ReturnDashProfessional } from "../returns/dash_professional.return";
import { ReturnProfessionalPacientVerify } from "../returns/professional_pacient_verify.return";
import { ReturnAnamnese } from "../returns/anamnese_return";
import { ReturnPacientClinic } from "../returns/pacient_clinic_return";
import { ReturnPrescription } from "../returns/prescription_return";
import { ReturnAnexos } from "../returns/anexos_return";
import { ReturnAnamneseByAnamId } from "../returns/anamnese_anam_id";
import { RetunAppointment } from "../returns/appointment_return";
import { ReturnPrescriptionById } from "../returns/prescriptions_preid";
import { ReturnCertificate } from "../returns/certificate.return";
import { ReturnCertificates } from "../returns/certificates_return";
import { Appointment } from "../returns/appointment_one_return";
import { ReturnPacientsByProf } from "../returns/pacients_by_prof";
import { ReturnCancelQuestions } from "../returns/cancel_questions";
import { ReturnAppointmentById } from "../returns/appointment_by_id";
import { ReturnClincByUserId } from "../returns/clinic_by_user";
import { ReturnAppointmentsByPacientAndProf } from "../returns/appointments_by_pc_prof";
import { of } from 'rxjs';
import { ReturnProfessional } from "../returns/professional_return";
import { ReturnNotification } from "../returns/notification.return";
import { ReturnMessages } from "../returns/messages_chat.return";

@Injectable({
    providedIn: 'root'
})
export class ProfessionalService {

    constructor(private http: HttpClient, private router: Router) { }

    private _jsonURL = 'assets/json/estados-cidades.json';
    private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


    public getJSON(): Observable<any> {

        return this.http.get(this._jsonURL);

    }

    logout(): Observable<any> {
        this.loggedIn.next(false);
        localStorage.removeItem('UserProfObject');
        localStorage.removeItem('profToken');
        this.router.navigate([`/profissional/login`]);
        return of(true); // emite um valor true quando o logout é realizado com sucesso
    }

    updateCodeRequest(data:any): Observable<any> {
        let headerOptions = new HttpHeaders({ 'No-Auth':'True', 'Token-Type': 'PROFESSIONAL' });
        return this.http.post<any>(`${environment.api}/coderequest`, data, {headers: headerOptions });
      }
    
      updateValidateCode(email:string, code:string): Observable<any> {
        let headerOptions = new HttpHeaders({ 'No-Auth':'True', 'Token-Type': 'PROFESSIONAL' });
        return this.http.get<any>(`${environment.api}/coderequest/email/${email}/code/${code}`, {headers: headerOptions });
      }
    
      updateReplacePassword(data:any): Observable<any> {
        let headerOptions = new HttpHeaders({ 'No-Auth':'False', 'Token-Type': 'PROFESSIONAL' });
        return this.http.put<any>(`${environment.api}/user/change_password_code`, data, {headers: headerOptions });
    
      }

    convertToB64(path: string): Observable<any> {
        return this.http.get(path, { responseType: 'blob' })

    }

    updateUser(user_id: string): Observable<any> {
        let headerOptions = new HttpHeaders({ 'No-Auth': 'False', 'Token-Type': 'PROFESSIONAL' });
        return this.http.put<any>(`${environment.api}/users/edit/${user_id}`, { headers: headerOptions });

    }

    updateInfoUser(user_id: string, data: any): Observable<any> {
        let headerOptions = new HttpHeaders({ 'No-Auth': 'False', 'Token-Type': 'PROFESSIONAL' });              //em uso
        return this.http.put<any>(`${environment.api}/user/edit/user_id/${user_id}`, data, { headers: headerOptions });

    }

    postAuthProfessional(data: any): Observable<ReturnAuthProfessional> {
        let headerOptions = new HttpHeaders({ 'No-Auth': 'True' });
        return this.http.post<any>(`${environment.api}/professional/auth`, data, { headers: headerOptions });
    }

    selectClinicByUser(user_id: string, subdomain: string): Observable<ReturnClincByUserId> {
        let headerOptions = new HttpHeaders({ 'No-Auth': 'False', 'Token-Type': 'PROFESSIONAL' });
        return this.http.get<any>(`${environment.api}/clinic/user/${user_id}/subdomain/${subdomain}`, { headers: headerOptions });
    }

    getAppointmentsByProfId(prof_id: string, days:number): Observable<ReturnProfAppointment> {
        let headerOptions = new HttpHeaders({ 'No-Auth': 'False', 'Token-Type': 'PROFESSIONAL' });
        return this.http.get<any>(`${environment.api}/appointments/prof/${prof_id}/days/${days}`, { headers: headerOptions });
    }

    getCancelQuestions(cq_type: string): Observable<ReturnCancelQuestions> {
        let headerOptions = new HttpHeaders({ 'NO-Auth': 'False', 'Token-Type': 'PROFESSIONAL' });
        return this.http.get<any>(`${environment.api}/cancellationquestions/${cq_type}`, { headers: headerOptions });

    }

    updateCanceled(app_id: string, data: any): Observable<any> {
        let headerOptions = new HttpHeaders({ 'No-Auth': 'False', 'Token-Type': 'PROFESSIONAL' });
        return this.http.put<any>(`${environment.api}/appointments/canceled/${app_id}`, data, { headers: headerOptions });

    }

    updateUserPassword(user_id: string, data: any): Observable<any> {
        let headerOptions = new HttpHeaders({ 'No-Auth': 'False', 'Token-Type': 'PROFESSIONAL' });
        return this.http.put<any>(`${environment.api}/user/editpassword/${user_id}`, data, { headers: headerOptions });

    }

    getAppointmentInfo(app_id: string): Observable<ReturnAppointmentById> {
        let headerOptions = new HttpHeaders({ 'NO-Auth': 'False', 'Token-Type': 'PROFESSIONAL' });
        return this.http.get<any>(`${environment.api}/appointment/${app_id}`, { headers: headerOptions });

    }

    getDashesProfessional(prof_id: string): Observable<ReturnDashProfessional> {
        let headerOptions = new HttpHeaders({ 'No-Auth': 'False', 'Token-Type': 'PROFESSIONAL' });
        return this.http.get<any>(`${environment.api}/professional/dashappointmentsbyprof/${prof_id}`, { headers: headerOptions });
    }

    getNotification(user_id: string): Observable<ReturnNotification> {
        let headerOptions = new HttpHeaders({ 'NO-Auth': 'False', 'Token-Type': 'PROFESSIONAL' });
        return this.http.get<any>(`${environment.api}/notification/${user_id}`, { headers: headerOptions });

    }

    getMessages(app_id: string): Observable<ReturnMessages> {
        let headerOptions = new HttpHeaders({ 'No-Auth': 'False', 'Token-Type': 'PROFESSIONAL' });
        return this.http.get<any>(`${environment.api}/appointment/messages/app_id/${app_id}`, { headers: headerOptions });
    }

    showImage(user_id: string): Observable<string> {
        const headerOptions = new HttpHeaders({ 'No-Auth': 'False', 'Token-Type': 'PROFESSIONAL' });
        return this.http.get(`${environment.api}/user/photo/${user_id}`, { headers: headerOptions, responseType: 'blob' })
            .pipe(
                map(blob => URL.createObjectURL(blob))
            );
    }

    getProfessionalPacientVerify(prof_id: string, pc_id: string): Observable<ReturnProfessionalPacientVerify> {
        let headerOptions = new HttpHeaders({ 'No-Auth': 'False', 'Token-Type': 'PROFESSIONAL' });
        return this.http.get<any>(`${environment.api}/professional/${prof_id}/pacientverify/${pc_id}`, { headers: headerOptions });
    }

    getAppointment(app_id: string): Observable<RetunAppointment> {
        let headerOptions = new HttpHeaders({ 'No-Auth': 'False', 'Token-Type': 'PROFESSIONAL' });
        return this.http.get<any>(`${environment.api}/appointment/professional/app_id/${app_id}`, { headers: headerOptions });
    }

    getProfessional(prof_id: string): Observable<ReturnProfessional> {
        let headerOptions = new HttpHeaders({ 'No-Auth': 'False', 'Token-Type': 'PROFESSIONAL' });
        return this.http.get<any>(`${environment.api}/professional/${prof_id}`, { headers: headerOptions });
    }

    getAppointmentByProfAndPac(prof_id: string, user_id: string): Observable<ReturnAppointmentsByPacientAndProf> {
        let headerOptions = new HttpHeaders({ 'No-Auth': 'False', 'Token-Type': 'PROFESSIONAL' });
        return this.http.get<any>(`${environment.api}/appointments/prof/${prof_id}/pacient/${user_id}`, { headers: headerOptions });
    }

    getPacientsByProf(prof_id: string): Observable<ReturnPacientsByProf> {
        let headerOptions = new HttpHeaders({ 'No-Auth': 'False', 'Token-Type': 'PROFESSIONAL' });
        return this.http.get<any>(`${environment.api}/pacientclinic/professional/prof_id/${prof_id}`, { headers: headerOptions });
    }

    getAnamneseVerify(app_id: string): Observable<ReturnAnamnese> {
        let headerOptions = new HttpHeaders({ 'No-Auth': 'False', 'Token-Type': 'PROFESSIONAL' });
        return this.http.get<any>(`${environment.api}/anamnesis/verify/${app_id}`, { headers: headerOptions });
    }

    getAnamnese(anam_id: string): Observable<ReturnAnamneseByAnamId> {
        let headerOptions = new HttpHeaders({ 'No-Auth': 'False', 'Token-Type': 'PROFESSIONAL' });
        return this.http.get<any>(`${environment.api}/anamnesis/${anam_id}`, { headers: headerOptions });
    }

    getPacientClinic(pc_id: string): Observable<ReturnPacientClinic> {
        let headerOptions = new HttpHeaders({ 'No-Auth': 'False', 'Token-Type': 'PROFESSIONAL' });
        return this.http.get<any>(`${environment.api}/pacientclinic/pc_id/${pc_id}`, { headers: headerOptions });
    }

    insertPrescription(data: any): Observable<any> {
        let headerOptions = new HttpHeaders({ 'No-Auth': 'False', 'Token-Type': 'PROFESSIONAL' });
        return this.http.post<any>(`${environment.api}/prescriptions/insert`, data, { headers: headerOptions });

    }

    getPrescription(app_id: string): Observable<ReturnPrescription> {
        let headerOptions = new HttpHeaders({ 'No-Auth': 'False', 'Token-Type': 'PROFESSIONAL' });
        return this.http.get<any>(`${environment.api}/prescriptions/app/${app_id}`, { headers: headerOptions });
    }

    getPrescriptionById(pre_id: string): Observable<ReturnPrescriptionById> {
        let headerOptions = new HttpHeaders({ 'No-Auth': 'False', 'Token-Type': 'PROFESSIONAL' });
        return this.http.get<any>(`${environment.api}/prescriptions/${pre_id}`, { headers: headerOptions });
    }

    getCertificates(app_id: string): Observable<ReturnCertificates> {
        let headerOptions = new HttpHeaders({ 'No-Auth': 'False', 'Token-Type': 'PROFESSIONAL' });
        return this.http.get<any>(`${environment.api}/certificate/verify/app_id/${app_id}`, { headers: headerOptions });
    }

    insertCertificate(data: any): Observable<any> {
        let headerOptions = new HttpHeaders({ 'No-Auth': 'False', 'Token-Type': 'PROFESSIONAL' });
        return this.http.post<any>(`${environment.api}/certificate/insert`, data, { headers: headerOptions });

    }

    insertAnamnese(data: any): Observable<any> {
        let headerOptions = new HttpHeaders({ 'No-Auth': 'False', 'Token-Type': 'PROFESSIONAL' });
        return this.http.post<any>(`${environment.api}/anamnesis/insert`, data, { headers: headerOptions });

    }

    selectAppointmentsDays(clinic_id: string, days: number): Observable<Appointment> {
        let headerOptions = new HttpHeaders({ 'No-Auth': 'False', 'Token-Type': 'CLINIC' });
        return this.http.get<any>(`${environment.api}/appointments/clinic/${clinic_id}/days/${days}`, { headers: headerOptions });
    }

    insertAnexo(data: any): Observable<any> {
        let headerOptions = new HttpHeaders({ 'No-Auth': 'False', 'Token-Type': 'PROFESSIONAL' });
        return this.http.post<any>(`${environment.api}/anexos/insert`, data, { headers: headerOptions });

    }

    getAnexosVerify(app_id: string): Observable<ReturnAnexos> {
        let headerOptions = new HttpHeaders({ 'No-Auth': 'False', 'Token-Type': 'PROFESSIONAL' });
        return this.http.get<any>(`${environment.api}/anexos/verify/app_id/${app_id}`, { headers: headerOptions });
    }

    downloadAnexo(ane_id: string): Observable<any> {
        let headerOptions = new HttpHeaders({ 'No-Auth': 'False', 'Token-Type': 'PROFESSIONAL' });
        return this.http.get(`${environment.api}/anexo/download/${ane_id}`, { responseType: 'blob', headers: headerOptions });
    }

    getCertificateById(cert_id: string): Observable<ReturnCertificate> {
        let headerOptions = new HttpHeaders({ 'No-Auth': 'False', 'Token-Type': 'PROFESSIONAL' });
        return this.http.get<any>(`${environment.api}/certificate/${cert_id}`, { headers: headerOptions });
    }

}