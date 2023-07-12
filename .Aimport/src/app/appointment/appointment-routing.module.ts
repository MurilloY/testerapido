import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentAlertComponent } from './components/appointment-alert/appointment-alert.component';
import { ConfirmAppointmentComponent } from './components/confirm-appointment/confirm-appointment.component';
import { DoctorChatComponent } from './components/doctor-chat/doctor-chat.component';
import { TwilioTestComponent } from './components/twilio-test/twilio-test.component';
import { DoctorChatAnamneseComponent } from './components/doctor-chat/doctor-chat-anamnese/doctor-chat-anamnese.component';
import { SendMessageComponent } from './components/doctor-chat/send-message/send-message.component';
import { DoctorChatAtestadoComponent } from './components/doctor-chat/doctor-chat-atestado/doctor-chat-atestado.component';
import { DoctorChatAnexosComponent } from './components/doctor-chat/doctor-chat-anexos/doctor-chat-anexos.component';
import { DoctorChatReceituarioComponent } from './components/doctor-chat/doctor-chat-receituario/doctor-chat-receituario.component';

const routes: Routes = [

  { path: 'confirm/:app_id', component: ConfirmAppointmentComponent },
  { 
    path: 'sala/:url', 
    component: DoctorChatComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'mensagens'
      },
      {path: 'mensagens', component: SendMessageComponent},
      {path: 'anamnese', component: DoctorChatAnamneseComponent},
      {path: 'receituario', component: DoctorChatReceituarioComponent},
      {path: 'atestado', component: DoctorChatAtestadoComponent},
      {path: 'anexos', component: DoctorChatAnexosComponent},
    ]
  },

  { path: 'sala/verify/:url', component: AppointmentAlertComponent },
  { path: 'twilio/:url', component: TwilioTestComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }
