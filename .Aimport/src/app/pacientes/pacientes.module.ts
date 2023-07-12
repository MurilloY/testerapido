import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacientesRoutingModule } from './pacientes-routing.module';
import { LoginPacienteComponent } from './components/login-paciente/login-paciente.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PacienteEsqueciSenhaComponent } from './components/paciente-esqueci-senha/paciente-esqueci-senha.component';
import { PacienteNavComponent } from './components/paciente-nav/paciente-nav.component';
import { HeaderPrincipalComponent } from './components/header-principal/header-principal.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { PacienteAgendamentosComponent } from './components/paciente-agendamentos/paciente-agendamentos.component';
import { FooterComponent } from './templates/footer/footer.component';
import { PacienteAddConsultaComponent } from './components/paciente-agendamentos/paciente-add-consulta/paciente-add-consulta.component';
import { PacienteHeaderConsultaComponent } from './components/paciente-agendamentos/paciente-add-consulta/paciente-header-consulta/paciente-header-consulta.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { SecurePipe } from './pipes/secure.pipe';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    LoginPacienteComponent,
    PacienteEsqueciSenhaComponent,
    PacienteNavComponent,
    HeaderPrincipalComponent,
    PacienteAgendamentosComponent,
    FooterComponent,
    PacienteAddConsultaComponent,
    PacienteHeaderConsultaComponent,
    SecurePipe,
  ],
  imports: [
    CommonModule,
    PacientesRoutingModule,

    //MATERIAL
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule, 
    MatMenuModule,
    MatDialogModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonToggleModule,
    NgxMaskModule.forChild(),


  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    // ClinicAuthGuard,
    SecurePipe
  ]
})
export class PacientesModule { }
