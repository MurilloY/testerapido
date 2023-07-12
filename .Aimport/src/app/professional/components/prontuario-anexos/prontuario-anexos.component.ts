import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalAnexoComponent } from './modal-anexo/modal-anexo.component';
import { ProfessionalService } from '../../services/professional.service';
import { ActivatedRoute } from '@angular/router';
import { Anexo } from '../../returns/anexos_return';
import { ModalDataService } from '../../services/modal-data.service';



@Component({
  selector: 'app-prontuario-anexos',
  templateUrl: './prontuario-anexos.component.html',
  styleUrls: ['./prontuario-anexos.component.scss']
})
export class ProntuarioAnexosComponent implements OnInit {

  progress: number = 0;
  collection: any = [];
	p: number = 1;
  totalItens: number = 3;
  showMenu: boolean = false;

  user: any;
  user_id: any;

  pc_id: string;
  app_id:string;

  anexo: Anexo[]
  sortedData: Anexo[] = [];

  constructor(
    private dialog: MatDialog, 
    private professionalService: ProfessionalService, 
    private modalDataService: ModalDataService, 
    private route: ActivatedRoute) { }

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

    if (dados == 'anexos') {
      this.getPacientClinic();
    }
  });

  }

  getAnexos() {
    this.professionalService.getAnexosVerify(this.app_id).subscribe(
      data => {
        console.log(data)
        this.anexo = data.anexos
        this.sortedData = data.anexos
      },
      err => {

      }
    );
  }

  openAlertDialog2() {
    const dialogRef4 = this.dialog.open(ModalAnexoComponent, {
      data: {
        pc_id: this.pc_id,
        app_id: this.app_id,
        file: null
      }
    });

    dialogRef4.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        this.getAnexos()

      }

    });
  }

  getPacientClinic() {
    this.professionalService.getPacientClinic(this.pc_id).subscribe(
      data => {
        this.user_id = data.patient_clinic.user_id

        this.getAnexos()
      },
      err => {

      }
    );
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

  downloadFile(dados: any) {

    this.professionalService.downloadAnexo(dados['ane_id']).subscribe(
      data => {
        console.log(data)

        let fullName = `${dados['ane_name']}.${dados['cdn_url'].split('.')[1]}`

        let url = window.URL.createObjectURL(data);
        let a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download = fullName;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();

      },
      err => {

      }
    );
  }


  onFileSelected(event:any) {

    let file = event.target.files[0];

    const dialogRef = this.dialog.open(ModalAnexoComponent,{
      data: {
        pc_id: this.pc_id,
        app_id: this.app_id,
        file: file
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult) {

        this.modalDataService.dadosEnviados.emit('anexos');

      }

    });

    // if (this.file) {

    //   reader.readAsDataURL(this.file);

    //   // When file uploads set it to file formcontrol
    //   reader.onload = () => {

    //     this.imageBase64 = reader.result;

    //   }

    //   this.fileName = this.file.name;

    //   this.formAnexo.controls['ane_name'].setValue(this.fileName.split('.')[0]);

    //   // const formData = new FormData();

    //   // formData.append("thumbnail", file);

    //   // const upload$ = this.http.post("/api/thumbnail-upload", formData);

    //   // upload$.subscribe();
    // }
  }
  
}

