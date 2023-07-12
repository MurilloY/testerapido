import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClinicAuthGuard } from './clinic.auth.guard';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { CentralNotificacaoComponent } from './components/central-notificacao/central-notificacao.component';
import { ConsultasComponent } from './components/consultas/consultas.component';
import { LoginComponent } from './components/login/login.component';
import { NavClientComponent } from './components/nav-client/nav-client.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { ProfissionaisSaudeComponent } from './components/profissionais-saude/profissionais-saude.component';
import { RecuperarSenhaComponent } from './components/recuperar-senha/recuperar-senha.component';
import { ErrorSigninComponent } from './components/error-signin/error-signin.component';
import { ClinicNotFoundComponent } from './components/login/clinic-not-found/clinic-not-found.component';
import { InvitationScreenComponent } from './components/profissionais-saude/invitation-screen/invitation-screen.component';


const routes: Routes = [
  { path: 'profissional/cadastro/:clinic_id', component: InvitationScreenComponent},
  { path: ':clinic_name/login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: ':clinic_name/recuperar-senha', component: RecuperarSenhaComponent },
  { path: ':clinic_name/recuperar-senha/code', component: RecuperarSenhaComponent },
  { path: ':clinic_name/recuperar-senha/crie-senha', component: RecuperarSenhaComponent },
  { path: ':clinic_name/recuperar-senha/sucesso', component: RecuperarSenhaComponent },
  { path: ':clinic_name/error-signin', component: ErrorSigninComponent},
  { path: 'clinica-not-found', component: ClinicNotFoundComponent},

  {
    path: ":clinic_name",
    component: NavClientComponent,
    canActivate: [ClinicAuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'consultas'
      },
      {
        path:"consultas",
        component: ConsultasComponent,
      },
      {
        path:"pacientes",
        component: PacientesComponent,
      },
      {
        path:"profissionais",
        component: ProfissionaisSaudeComponent,
      },
      {
        path:"notificacoes",
        component: CentralNotificacaoComponent,
      }
    ]
  },

  // {path: 'area-do-cliente', component: AreaClinicaComponent},

  // {path: 'central-notificacao', component: CentralNotificacaoComponent},

  // {path: 'cancelar-consulta', component: CancelarConsultaComponent},
  // {path: 'cancelar-consulta-motivo', component: CancelarConsultaComponent},

  // {path: 'consultas', component: ConsultasComponent},
  // {path: 'pacientes', component: PacientesComponent},
  // {path: 'profissionais-saude', component: ProfissionaisSaudeComponent},

  // {path: 'identifique-paciente', component: IdentifiquePacienteComponent},
  // {path: 'informacoes-paciente', component: InformacoesPacienteComponent},

  // {path: 'doctor-chat', component: DoctorChatComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClinicsRoutingModule { }
