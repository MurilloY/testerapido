import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginProfissionalComponent } from './components/login-profissional/login-profissional.component';
import { NavProfessionalComponent } from './components/nav-professional/nav-professional.component';
import { ErrorSigninComponent } from '../clinics/components/error-signin/error-signin.component';
import { ProfessionalAuthGuard } from './auth.guard';
import { AgendamentosComponent } from './components/agendamentos/agendamentos.component';
import { AnamneseComponent } from './components/anamnese/anamnese.component';
import { EsqueciSenhaComponent } from './components/esqueci-senha/esqueci-senha.component';
import { ProfissionalPerfilComponent } from './components/profissional-perfil/profissional-perfil.component';
import { ProntuarioAnexosComponent } from './components/prontuario-anexos/prontuario-anexos.component';
import { ProntuarioAtestadoComponent } from './components/prontuario-atestado/prontuario-atestado.component';
import { ProntuarioComponent } from './components/prontuario/prontuario.component';
import { NavProfessionalPatientComponent } from './components/nav-professional-patient/nav-professional-patient.component';
import { ProfessionalsPatientsComponent } from './components/professionals-patients/professionals-patients.component';
import { PatientsInfoComponent } from './components/professionals-patients/patients-info/patients-info.component';
import { ProntuarioMessagesComponent } from './components/prontuario-messages/prontuario-messages.component';


const routes: Routes = [

  
  { path: "login", component: LoginProfissionalComponent },
  { path: 'esqueci-senha', component: EsqueciSenhaComponent },
  { path: 'esqueci-senha/code', component: EsqueciSenhaComponent },
  { path: 'esqueci-senha/crie-senha', component: EsqueciSenhaComponent },
  { path: 'esqueci-senha/sucesso', component: EsqueciSenhaComponent },
  { path: 'error-signin', component: ErrorSigninComponent},
  { 
    path: "agendamento", 
    component: NavProfessionalPatientComponent,
    children:[
      {
        path: ':app_id',
        pathMatch: 'full',
        redirectTo: ':app_id/anamnese'
      },
      {path: ':app_id/paciente/:pc_id/anamnese', component: AnamneseComponent},
      {path: ':app_id/paciente/:pc_id/receituario', component: ProntuarioComponent},
      {path: ':app_id/paciente/:pc_id/atestado', component: ProntuarioAtestadoComponent},
      {path: ':app_id/paciente/:pc_id/anexos', component: ProntuarioAnexosComponent},
      {path: ':app_id/paciente/:pc_id/mensagens', component: ProntuarioMessagesComponent},
    ],
    canActivate: [ProfessionalAuthGuard]
  },
  {
    path: "",
    component: NavProfessionalComponent,
    children:[
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'agendamentos'
      },
      {path: 'agendamentos', component: AgendamentosComponent},
      {path: 'pacientes', component: ProfessionalsPatientsComponent},
      {path: 'perfil-profissional', component: ProfissionalPerfilComponent},
    ],
    canActivate: [ProfessionalAuthGuard]
  },
  {path: 'paciente/:pc_id/agendamentos', component: PatientsInfoComponent, canActivate: [ProfessionalAuthGuard]},

];

  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfessionalRoutingModule { }
