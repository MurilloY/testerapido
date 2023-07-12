import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmitirReceitaComponent } from './emitir-receita/emitir-receita.component';
import { ProfessionalService } from '../../services/professional.service';
import { ActivatedRoute } from '@angular/router';
import { Prescription } from '../../returns/prescription_return';
import { ModalDataService } from '../../services/modal-data.service';
import { VisualizarReceitaComponent } from './emitir-receita/visualizar-receita/visualizar-receita.component';

@Component({
  selector: 'app-prontuario',
  templateUrl: './prontuario.component.html',
  styleUrls: ['./prontuario.component.scss']
})
export class ProntuarioComponent implements OnInit {

  user: any;
  pc_id: string;
  user_id: any;
  app_id: string

  prescription: Prescription[];
  sortedData: Prescription[] = [];


  progress: number = 0;
  collection: any = [];
  p: number = 1;
  totalItens: number = 3;
  showMenu: boolean = false;

  receita_vencida = 0

  constructor(private dialog: MatDialog, private professionalService: ProfessionalService, private route: ActivatedRoute, private modalDataService: ModalDataService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("UserProfObject")!);
    document.body.classList.add('body-etapas');

    this.route.params.subscribe(params => {
      this.pc_id = params['pc_id'];
      this.app_id = params['app_id'];
      this.getPacientClinic()

      for (let i = 1; i <= 40; i++) {
        this.collection.push({
          txt: `Medicamentos ${i}`,
          data: `01/01/2023`,
          profissional: `Dra. Cláudia Batista`
        });
      }
    })
    this.modalDataService.dadosEnviados.subscribe(dados => {

      console.log(dados)

      if (dados == 'prontuario') {
        this.getPacientClinic();
      }
    });
  }

  openAlertDialog3() {
    const dialogRef2 = this.dialog.open(EmitirReceitaComponent, {
      data: {
        app_id: this.app_id,
        pc_id: this.pc_id,
      }

    });

    dialogRef2.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        this.getPrescription()

      }

    });
  }

  isExpired(pre_date: string): boolean {
    const certDate = new Date(
      +pre_date.split('-')[0],
      +pre_date.split('-')[1] - 1,
      +pre_date.split('-')[2].substr(0, 2)
    );
    const currentDate = new Date();
    const daysDifference = (currentDate.getTime() - certDate.getTime()) / (1000 * 60 * 60 * 24);
    return daysDifference > 30;
  }

  getPrescriptionNumber(idx: number): number {
    return (this.p - 1) * this.totalItens + idx + 1;
  }

  getPrescription() {
    this.professionalService.getPrescription(this.app_id).subscribe(
      data => {
        console.log('aqui', data)
        this.prescription = data.prescriptions
        this.sortedData = data.prescriptions
        this.receita_vencida = Object.values(data.prescriptions).filter(item => item.expired === true).length;
      },
      err => {

      }
    );
  }

  getPacientClinic() {
    this.professionalService.getPacientClinic(this.pc_id).subscribe(
      data => {
        this.user_id = data.patient_clinic.user_id

        this.getPrescription()

      },
      err => {

      }
    );
  }

  openAlertDialog() {

    const dialogRef1 = this.dialog.open(EmitirReceitaComponent, {
      data: {
        pc_id: this.pc_id,
      }
    });

    // const dialogRef = this.dialog.open(EmitirReceitaComponent, {
    //   data: {
    //     message: 'HelloWorld',
    //     buttonText: {
    //       cancel: 'Done'
    //     }
    //   },
    // });

    dialogRef1.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        this.modalDataService.dadosEnviados.emit('prontuario');

      }

    });
  }

  openAlertDialog2(receita: any) {

    const dialogRef1 = this.dialog.open(VisualizarReceitaComponent, {
      panelClass: 'my-full-screen-dialog',
      disableClose: false,
      data: {
        pc_id: this.pc_id,
        pre_id: receita['pre_id']

      }
    });

    dialogRef1.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        this.modalDataService.dadosEnviados.emit('anamnese');

      }

    });
  }

}
