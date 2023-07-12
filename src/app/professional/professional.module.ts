import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ProfissionalPerfilComponent } from './components/profissional-perfil/profissional-perfil.component';
import { ProfessionalRoutingModule } from './professional-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { ProntuarioComponent } from './components/prontuario/prontuario.component';
import { EmitirReceitaComponent } from './components/prontuario/emitir-receita/emitir-receita.component';
import { ProntuarioAtestadoComponent } from './components/prontuario-atestado/prontuario-atestado.component';
import { ModalAtestadoComponent } from './components/prontuario-atestado/modal-atestado/modal-atestado.component';
import { ModalAnexoComponent } from './components/prontuario-anexos/modal-anexo/modal-anexo.component';
import { ProntuarioAnexosComponent } from './components/prontuario-anexos/prontuario-anexos.component';
import { CommonModule } from '@angular/common';
import { AnamneseComponent } from './components/anamnese/anamnese.component';
import { ModalAnamneseComponent } from './components/anamnese/modal-anamnese/modal-anamnese.component';
import { AgendamentosComponent } from './components/agendamentos/agendamentos.component';
import { HeaderAgendamentoComponent } from './components/header-agendamento/header-agendamento.component';
import { ProfessionalAuthGuard } from './auth.guard';
import { LoginProfissionalComponent } from './components/login-profissional/login-profissional.component';
import { NavProfessionalComponent } from './components/nav-professional/nav-professional.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { NgxMaskModule } from 'ngx-mask';
import { CentralNotificationComponent } from './components/central-notification/central-notification.component';
import { EsqueciSenhaComponent } from './components/esqueci-senha/esqueci-senha.component';
import { NavProfessionalPatientComponent } from './components/nav-professional-patient/nav-professional-patient.component';
import { SecurePipe } from './pipes/secure.pipe';
import {MatTooltipModule} from '@angular/material/tooltip';
import { VisualizarReceitaComponent } from './components/prontuario/emitir-receita/visualizar-receita/visualizar-receita.component';
import { AddPhotoComponent } from './components/prontuario-anexos/add-photo/add-photo.component'
import { ImageCropperModule } from 'ngx-image-cropper';
import { WebcamModule } from 'ngx-webcam';
import { VisualizarAtestadoComponent } from './components/prontuario-atestado/visualizar-atestado/visualizar-atestado.component';
import { ProfessionalsPatientsComponent } from './components/professionals-patients/professionals-patients.component';
import { CancelarAgendamentoComponent } from './components/agendamentos/cancelar-agendamento/cancelar-agendamento.component';
import { PatientsInfoComponent } from './components/professionals-patients/patients-info/patients-info.component';
import { EditarPasswordComponent } from './components/profissional-perfil/editar-password/editar-password.component';
import { ProntuarioMessagesComponent } from './components/prontuario-messages/prontuario-messages.component';





@NgModule({
  declarations: [
    ProfissionalPerfilComponent,
    ProntuarioComponent,
    EmitirReceitaComponent,
    ProntuarioAtestadoComponent,
    ModalAtestadoComponent,
    ProntuarioAnexosComponent,
    ModalAnexoComponent,
    AnamneseComponent,
    ModalAnamneseComponent,
    AgendamentosComponent,
    HeaderAgendamentoComponent,
    LoginProfissionalComponent,
    NavProfessionalComponent,
    CentralNotificationComponent,
    EsqueciSenhaComponent,
    NavProfessionalPatientComponent,
    SecurePipe,
    VisualizarReceitaComponent,
    AddPhotoComponent,
    VisualizarAtestadoComponent,
    ProfessionalsPatientsComponent,
    CancelarAgendamentoComponent,
    PatientsInfoComponent,
    EditarPasswordComponent,
    ProntuarioMessagesComponent
  ],
  imports: [
    CommonModule,
    ProfessionalRoutingModule,
    FlexLayoutModule,
    NgxMaskModule.forChild(),

    ImageCropperModule,
    WebcamModule,

    //Material
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatTabsModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDialogModule,
    MatBadgeModule,
    MatMenuModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSelectModule,
    MatStepperModule,
    MatCheckboxModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    NgxPaginationModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    ProfessionalAuthGuard,
    SecurePipe
  ]
})
export class ProfessionalModule { }