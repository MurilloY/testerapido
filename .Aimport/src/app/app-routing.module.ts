import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  

  {
    path: 'clinica',
    loadChildren: () => import('./clinics/clinics.module').then(mod => mod.ClinicsModule)
  },
  {
    path: 'adm',
    loadChildren: () => import('./adm/adm.module').then(mod => mod.AdmModule)
  },
  {
    path: 'agendamento',
    loadChildren: () => import('./appointment/appointment.module').then(mod => mod.AppointmentModule)
  },
  {
    path: '',
    loadChildren: () => import('./site/site.module').then(mod => mod.SiteModule)
  },
  {
    path: 'profissional',
    loadChildren: () => import('./professional/professional.module').then(mod => mod.ProfessionalModule)
  },
  {
    path: 'paciente',
    loadChildren: () => import('./pacientes/pacientes.module').then(mod => mod.PacientesModule )
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }