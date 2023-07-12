import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicsRoutingModule } from './clinics-routing.module';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { LoginComponent } from './components/login/login.component';
import { RecuperarSenhaComponent } from './components/recuperar-senha/recuperar-senha.component';
import { AreaClinicaComponent } from './components/area-clinica/area-clinica.component';
import { HeaderComponent } from './templates/header/header.component';
import { FooterComponent } from './templates/footer/footer.component';
import { NovaConsultaComponent } from './components/consultas/nova-consulta/nova-consulta.component';
import { HeaderNovaConsultaComponent } from './components/consultas/nova-consulta/header-nova-consulta/header-nova-consulta.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ModalConfirmacaoComponent } from './components/consultas/nova-consulta/modal-confirmacao/modal-confirmacao.component';
import { CentralNotificacaoComponent } from './components/central-notificacao/central-notificacao.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CancelarConsultaComponent } from './components/cancelar-consulta/cancelar-consulta.component';
import { ModalCancelamentoComponent } from './components/cancelar-consulta/modal-cancelamento/modal-cancelamento.component';
import { ConsultasComponent } from './components/consultas/consultas.component';
import { MatSortModule } from '@angular/material/sort';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { ProfissionaisSaudeComponent } from './components/profissionais-saude/profissionais-saude.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IdentifiquePacienteComponent } from './components/identifique-paciente/identifique-paciente.component';
import { InformacoesPacienteComponent } from './components/informacoes-paciente/informacoes-paciente.component';
import { DoctorChatComponent } from './components/doctor-chat/doctor-chat.component';
import { ClinicAuthGuard } from './clinic.auth.guard';
import { NavClientComponent } from './components/nav-client/nav-client.component';
import { NgxMaskModule } from 'ngx-mask';
import { AddPacientComponent } from './components/pacientes/add-pacient/add-pacient.component';
import { ConfirmdialogComponent } from './components/confirmdialog/confirmdialog.component';
import { HeaderProfessionalComponent } from './components/profissionais-saude/add-professional/header-professional/header-professional.component';
import { AddProfessionalComponent } from './components/profissionais-saude/add-professional/add-professional.component';
import { SecurePipe } from './pipes/secure.pipe';
import { ErrorSigninComponent } from './components/error-signin/error-signin.component';
import { EditarPagamentoComponent } from './components/consultas/editar-pagamento/editar-pagamento.component';
import { EditarConsultaComponent } from './components/consultas/editar-consulta/editar-consulta.component';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { HealthinsuranceComponent } from './components/healthinsurance/healthinsurance.component';
import { AddInsuranceComponent } from './components/healthinsurance/add-insurance/add-insurance.component';
import { ClinicNotFoundComponent } from './components/login/clinic-not-found/clinic-not-found.component';
import { AddOrSendlinkComponent } from './components/profissionais-saude/add-or-sendlink/add-or-sendlink.component';
import { InvitationScreenComponent } from './components/profissionais-saude/invitation-screen/invitation-screen.component';

@NgModule({
  declarations: [
    CadastroComponent,
    LoginComponent,
    RecuperarSenhaComponent,
    AreaClinicaComponent,
    HeaderComponent,
    FooterComponent,
    NovaConsultaComponent,
    HeaderNovaConsultaComponent,
    ModalConfirmacaoComponent,
    CentralNotificacaoComponent,
    CancelarConsultaComponent,
    ModalCancelamentoComponent,
    ConsultasComponent,
    PacientesComponent,
    ProfissionaisSaudeComponent,
    IdentifiquePacienteComponent,
    InformacoesPacienteComponent,
    DoctorChatComponent,
    NavClientComponent,
    AddPacientComponent,
    ConfirmdialogComponent,
    HeaderProfessionalComponent,
    AddProfessionalComponent,
    SecurePipe,
    ErrorSigninComponent,
    EditarPagamentoComponent,
    EditarConsultaComponent,
    HealthinsuranceComponent,
    AddInsuranceComponent,
    ClinicNotFoundComponent,
    AddOrSendlinkComponent,
    InvitationScreenComponent
  ],
  imports: [
    CommonModule,
    ClinicsRoutingModule,
    NgxMaskModule.forChild(),
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
    MatProgressBarModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    NgxPaginationModule,
    MatSortModule,
    MatButtonToggleModule,
    FlexLayoutModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    ClinicAuthGuard,
    SecurePipe
  ]
})
export class ClinicsModule { }
