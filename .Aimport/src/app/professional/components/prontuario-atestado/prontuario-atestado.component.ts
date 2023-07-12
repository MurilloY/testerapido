import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalAtestadoComponent } from './modal-atestado/modal-atestado.component';
import { ProfessionalService } from '../../services/professional.service';
import { Certificate } from '../../returns/certificates_return';
import { ActivatedRoute } from '@angular/router';
import { VisualizarAtestadoComponent } from './visualizar-atestado/visualizar-atestado.component';
import { ModalDataService } from '../../services/modal-data.service';

@Component({
  selector: 'app-prontuario-atestado',
  templateUrl: './prontuario-atestado.component.html',
  styleUrls: ['./prontuario-atestado.component.scss']
})
export class ProntuarioAtestadoComponent implements OnInit {

  progress: number = 0;
  collection: any = [];
  p: number = 1;
  totalItens: number = 3;
  showMenu: boolean = false;

  user: any;
  user_id: any;

  app_id: string;

  pc_id: string;

  certificates: Certificate[]
  sortedData: Certificate[] = [];

  certificate_vencido = 0

  constructor(private dialog: MatDialog, private professionalService: ProfessionalService, private route: ActivatedRoute, private modalDataService: ModalDataService) { }

  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem("UserProfObject")!);
    document.body.classList.add('body-etapas');
    this.route.params.subscribe(params => {
      console.log(params)
      this.pc_id = params['pc_id'];
      this.app_id = params['app_id'];
      this.getPacientClinic();
      

      this.modalDataService.dadosEnviados.subscribe(dados => {

        if (dados == 'atestado') {
          this.getPacientClinic();
        }
      });


    });


    // for (let i = 1; i <= 40; i++) {
    //   this.collection.push({
    //     txt: `Medicamentos ${i}`,
    //     data: `01/01/2023`,
    //     profissional: `Dra. Cláudia Batista`
    //   });
    // }
  }

  isExpired(certValidity: string): boolean {
    const certDate = new Date(
      +certValidity.split('-')[0],
      +certValidity.split('-')[1] - 1,
      +certValidity.split('-')[2].substr(0, 2)
    );
    const currentDate = new Date();
    return certDate < currentDate;
  }

  openAlertDialog3() {
    const dialogRef3 = this.dialog.open(ModalAtestadoComponent, {
      data: {
        pc_id: this.pc_id,
        app_id: this.app_id
      }
    });

    dialogRef3.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        this.getCertificates()

      }

    });
  }

  getAtestadoNumber(idx: number): number {
    return (this.p - 1) * this.totalItens + idx + 1;
  }

  getCertificates() {
    this.professionalService.getCertificates(this.app_id).subscribe(
      data => {
        this.certificates = data.certificate
        this.sortedData = data.certificate
        this.certificate_vencido = Object.values(data.certificate).filter(item => item.expired === true).length;
      },
      err => {

      }
    );
  }

  getPacientClinic() {
    this.professionalService.getPacientClinic(this.pc_id).subscribe(
      data => {
        this.user_id = data.patient_clinic.user_id

        this.getCertificates()
      },
      err => {

      }
    );
  }
  

  openAlertDialog() {
    const dialogRef = this.dialog.open(ModalAtestadoComponent, {
      data: {
        message: 'HelloWorld',
        buttonText: {
          cancel: 'Done'
        }
      },
    });
  }

  openAlertDialog2(atestado: any) {

    console.log(atestado)

    const dialogRef1 = this.dialog.open(VisualizarAtestadoComponent, {
      panelClass: 'my-full-screen-dialog',
      disableClose: false,
      data: {
        cert_id: atestado['cert_id'],

      }
    });

    dialogRef1.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        this.modalDataService.dadosEnviados.emit('atestado');

      }

    });
  }
}

