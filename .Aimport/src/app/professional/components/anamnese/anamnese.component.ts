import { Component, OnInit } from '@angular/core';
import { Anamnesi } from '../../returns/anamnese_return';
import { ProfessionalService } from '../../services/professional.service';
import { ActivatedRoute } from '@angular/router';
import { PatientClinic } from '../../returns/pacient_clinic_return';
import { ModalDataService } from '../../services/modal-data.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalAnamneseComponent } from './modal-anamnese/modal-anamnese.component';


@Component({
  selector: 'app-anamnese',
  templateUrl: './anamnese.component.html',
  styleUrls: ['./anamnese.component.scss']
})
export class AnamneseComponent implements OnInit {

  progress: number = 0;
  collection: any = [];
  p: number = 1;
  totalItens: number = 3;
  showMenu: boolean = false;
  user_id: any;
  anamnese: Anamnesi[];
  patient_clinic?: PatientClinic;
  user: any;
  pc_id: string;
  app_id: string
  sortedData: Anamnesi[] = [];
  nameButton = "Nova anamnese";


  defaultImageUrl = 'assets/images/user.png';


  constructor(private professionalService: ProfessionalService, private route: ActivatedRoute, private modalDataService: ModalDataService, private dialog: MatDialog) { }

  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem("UserProfObject")!);
    document.body.classList.add('body-etapas');

    this.route.params.subscribe(params => {
      console.log(params)
      this.pc_id = params['pc_id'];
      this.app_id = params['app_id'];

      this.getPacientClinic()


    });


    this.modalDataService.dadosEnviados.subscribe(dados => {

      console.log(dados)

      if (dados == 'anamnese') {
        this.getPacientClinic();
      }
    });

  }

  getAnamneseNumber(idx: number): number {
    return (this.p - 1) * this.totalItens + idx + 1;
  }

  getAnamneses() {
    this.professionalService.getAnamneseVerify(this.app_id).subscribe(
      data => {
        this.anamnese = data.anamnesis
        this.sortedData = data.anamnesis
      },
      err => {

      }
    );
  }

  openAlertDialog2() {
    const dialogRef1 = this.dialog.open(ModalAnamneseComponent, {
      data: {
        pc_id: this.pc_id,
        app_id: this.app_id,
        anam_id: null
      }
    })
    dialogRef1.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        this.getAnamneses()

      }

    });
  }

  openAlertDialog(anamnese: any) {

    const dialogRef1 = this.dialog.open(ModalAnamneseComponent, {
      data: {
        pc_id: this.pc_id,
        anam_id: anamnese['anam_id']
      }
    });

    dialogRef1.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        this.modalDataService.dadosEnviados.emit('anamnese');

      }

    });
  }


  getPacientClinic() {
    this.professionalService.getPacientClinic(this.pc_id).subscribe(
      data => {
        this.user_id = data.patient_clinic.user_id
        this.patient_clinic = data.patient_clinic

        this.getAnamneses()
      },
      err => {

      }
    );
  }

}
