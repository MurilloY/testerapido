import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentRoutingModule } from './appointment-routing.module';
import { ConfirmAppointmentComponent } from './components/confirm-appointment/confirm-appointment.component';
import { HeaderAppointmentComponent } from './components/header-appointment/header-appointment.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { DoctorChatComponent } from './components/doctor-chat/doctor-chat.component';
import { TwilioTestComponent } from './components/twilio-test/twilio-test.component';
import { TwilioService } from './services/twilio.service';
import { DoctorChatOffComponent } from './components/doctor-chat/doctor-chat-off/doctor-chat-off.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SendMessageComponent } from './components/doctor-chat/send-message/send-message.component';
import { AppointmentAlertComponent } from './components/appointment-alert/appointment-alert.component';
import { DoctorChatAnamneseComponent } from './components/doctor-chat/doctor-chat-anamnese/doctor-chat-anamnese.component';
import { DoctorChatAtestadoComponent } from './components/doctor-chat/doctor-chat-atestado/doctor-chat-atestado.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { DoctorChatAnexosComponent } from './components/doctor-chat/doctor-chat-anexos/doctor-chat-anexos.component';
import { DoctorChatReceituarioComponent } from './components/doctor-chat/doctor-chat-receituario/doctor-chat-receituario.component';
import { VisualizarAtestadoComponent } from './components/doctor-chat/doctor-chat-atestado/visualizar-atestado/visualizar-atestado.component';
import { AddChatAnexosComponent } from './components/doctor-chat/doctor-chat-anexos/add-chat-anexos/add-chat-anexos.component';
import { AddChatPhotoComponent } from './components/doctor-chat/doctor-chat-anexos/add-chat-photo/add-chat-photo.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ImageCropperModule } from 'ngx-image-cropper';
import { WebcamModule } from 'ngx-webcam';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AddChatAnamneseComponent } from './components/doctor-chat/doctor-chat-anamnese/add-chat-anamnese/add-chat-anamnese.component';
import { MatRadioModule } from '@angular/material/radio';
import { AddAtestadoComponent } from './components/doctor-chat/doctor-chat-atestado/add-atestado/add-atestado.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AddReceituarioComponent } from './components/doctor-chat/doctor-chat-receituario/add-receituario/add-receituario.component';
import { VisualizarReceituarioComponent } from './components/doctor-chat/doctor-chat-receituario/visualizar-receituario/visualizar-receituario.component';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    ConfirmAppointmentComponent,
    HeaderAppointmentComponent,
    DoctorChatComponent,
    TwilioTestComponent,
    DoctorChatOffComponent,
    SendMessageComponent,
    AppointmentAlertComponent,
    DoctorChatAnamneseComponent,
    DoctorChatAtestadoComponent,
    DoctorChatAnexosComponent,
    DoctorChatReceituarioComponent,
    VisualizarAtestadoComponent,
    AddChatAnexosComponent,
    AddChatPhotoComponent,
    AddChatAnamneseComponent,
    AddAtestadoComponent,
    AddReceituarioComponent,
    VisualizarReceituarioComponent,
  ],
  imports: [
    CommonModule,
    AppointmentRoutingModule,

    ImageCropperModule,
    WebcamModule,

     //Material
     MatFormFieldModule,
     MatInputModule,
     MatButtonModule,
     ReactiveFormsModule,
     FormsModule,
     MatMenuModule,
     MatIconModule,
     MatDialogModule,
     MatPaginatorModule,
     NgxPaginationModule,
     MatProgressSpinnerModule,
     MatToolbarModule,
     MatRadioModule,
     MatDatepickerModule,
     MatNativeDateModule,
     MatTooltipModule




     
  ],
  providers: [TwilioService],
})
export class AppointmentModule { }
