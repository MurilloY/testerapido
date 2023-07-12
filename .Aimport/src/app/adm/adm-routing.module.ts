import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AdmsComponent } from './components/adms/adms.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ClinicDetailsComponent } from './components/clinics-adm/clinic-details/clinic-details.component';
import { ClinicUsersComponent } from './components/clinics-adm/clinic-details/clinic-users/clinic-users.component';
import { ClinicsAdmComponent } from './components/clinics-adm/clinics-adm.component';
import { HomeAdmComponent } from './components/home-adm/home-adm.component';
import { LeadsHistoryComponent } from './components/leads/leads-history/leads-history.component';
import { LeadsComponent } from './components/leads/leads.component';
import { LoginAdmComponent } from './components/login-adm/login-adm.component';
import { NavAdmComponent } from './components/nav-adm/nav-adm.component';
import { ProfessionalsAdmComponent } from './components/professionals-adm/professionals-adm.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { RegisterTypeComponent } from './components/register-type/register-type.component';
import { SpecialtiesComponent } from './components/specialties/specialties.component';
import { WhatsappComponent } from './components/whatsapp/whatsapp.component';

const routes: Routes = [

  {
    path: "login",
    component: LoginAdmComponent
  },
  {
    path: "",
    component: NavAdmComponent,
    children:[
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path:"home",
        component: HomeAdmComponent,
      },
      {
        path:"clinics",
        component: ClinicsAdmComponent,
      },
      {
        path:"professionals",
        component: ProfessionalsAdmComponent,
      },
      {
        path:"categories",
        component: CategoriesComponent,
      },
      {
        path:"specialties",
        component: SpecialtiesComponent,
      },
      {
        path:"register_type",
        component: RegisterTypeComponent,
      },
      {
        path:"adms",
        component: AdmsComponent,
      },
      {
        path:"questions",
        component: QuestionsComponent,
      },
      {
        path:"leads",
        component: LeadsComponent,
      },
      {
        path:"leads/:lead_id/history",
        component: LeadsHistoryComponent,
      },
      {
        path:"clinics/:clinic_id",
        component: ClinicDetailsComponent,
      },
      {
        path:"clinics/:clinic_id/users",
        component: ClinicUsersComponent,
      },
      {
        path:"whatsapp",
        component: WhatsappComponent,
      },
    ],
    canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmRoutingModule { }
