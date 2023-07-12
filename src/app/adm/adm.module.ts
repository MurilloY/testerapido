import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmRoutingModule } from './adm-routing.module';
import { NavAdmComponent } from './components/nav-adm/nav-adm.component';
import { LoginAdmComponent } from './components/login-adm/login-adm.component';
import { HomeAdmComponent } from './components/home-adm/home-adm.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ClinicsAdmComponent } from './components/clinics-adm/clinics-adm.component';
import { AddClinicComponent } from './components/clinics-adm/add-clinic/add-clinic.component';
import { NgxMaskModule } from 'ngx-mask';
import { AuthGuard } from './auth.guard';
import { ProfessionalsAdmComponent } from './components/professionals-adm/professionals-adm.component';
import { AddProfessionalComponent } from './components/professionals-adm/add-professional/add-professional.component';
import { AddCategoryComponent } from './components/categories/add-category/add-category.component';
import { SpecialtiesComponent } from './components/specialties/specialties.component';
import { AddSpecialityComponent } from './components/specialties/add-speciality/add-speciality.component';
import { RegisterTypeComponent } from './components/register-type/register-type.component';
import { AddRegisterTypeComponent } from './components/register-type/add-register-type/add-register-type.component';
import { AdmsComponent } from './components/adms/adms.component';
import { AddAdmComponent } from './components/adms/add-adm/add-adm.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ClinicUsersComponent } from './components/clinics-adm/clinic-details/clinic-users/clinic-users.component';
import { AddUserProfileComponent } from './components/clinics-adm/clinic-details/clinic-users/add-user-profile/add-user-profile.component';
import { ClinicUsersProfileComponent } from './components/clinics-adm/clinic-details/clinic-users-profile/clinic-users-profile.component';
import { AddProfileComponent } from './components/clinics-adm/clinic-details/clinic-users-profile/add-profile/add-profile.component';
import { ClinicDetailsComponent } from './components/clinics-adm/clinic-details/clinic-details.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { AddQuestionsComponent } from './components/questions/add-questions/add-questions.component';
import { LeadsComponent } from './components/leads/leads.component';
import { AddLeadsComponent } from './components/leads/add-leads/add-leads.component';
import { LeadsHistoryComponent } from './components/leads/leads-history/leads-history.component';
import { AddLeadHistoryComponent } from './components/leads/leads-history/add-lead-history/add-lead-history.component';
import { ProfessionalsClinicComponent } from './components/clinics-adm/clinic-details/professionals-clinic/professionals-clinic.component';
import { AddProfessionalClinicComponent } from './components/clinics-adm/clinic-details/professionals-clinic/add-professional-clinic/add-professional-clinic.component';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { WhatsappComponent } from './components/whatsapp/whatsapp.component';
import { SecurePipe } from './pipes/secure.pipe';


@NgModule({
  declarations: [
    NavAdmComponent,
    LoginAdmComponent,
    HomeAdmComponent,
    CategoriesComponent,
    ConfirmDialogComponent,
    ClinicsAdmComponent,
    AddClinicComponent,
    ProfessionalsAdmComponent,
    AddProfessionalComponent,
    AddCategoryComponent,
    SpecialtiesComponent,
    AddSpecialityComponent,
    RegisterTypeComponent,
    AddRegisterTypeComponent,
    AdmsComponent,
    AddAdmComponent,
    ClinicUsersComponent,
    AddUserProfileComponent,
    ClinicUsersProfileComponent,
    AddProfileComponent,
    ClinicDetailsComponent,
    QuestionsComponent,
    AddQuestionsComponent,
    LeadsComponent,
    AddLeadsComponent,
    LeadsHistoryComponent,
    AddLeadHistoryComponent,
    ProfessionalsClinicComponent,
    AddProfessionalClinicComponent,
    WhatsappComponent,
    SecurePipe,

  ],
  imports: [
    CommonModule,
    AdmRoutingModule,
    FlexLayoutModule,
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
    MatDatepickerModule, 
    MatNativeDateModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    AuthGuard,
  ]
})
export class AdmModule { }
