import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPacienteComponent } from './components/login-paciente/login-paciente.component';
import { PacienteEsqueciSenhaComponent } from './components/paciente-esqueci-senha/paciente-esqueci-senha.component';
import { ErrorSigninComponent } from '../clinics/components/error-signin/error-signin.component';
import { PacienteNavComponent } from './components/paciente-nav/paciente-nav.component';

const routes: Routes = [

  { path: "login", component: LoginPacienteComponent },
  { path: "esqueci-senha", component: PacienteEsqueciSenhaComponent },
  { path: "esqueci-senha/code", component: PacienteEsqueciSenhaComponent },
  { path: 'esqueci-senha/crie-senha', component: PacienteEsqueciSenhaComponent },
  { path: 'esqueci-senha/sucesso', component: PacienteEsqueciSenhaComponent },
  { path: 'error-signin', component: ErrorSigninComponent},
  { 
    path: "agendamentos",
    component: PacienteNavComponent
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientesRoutingModule { }
