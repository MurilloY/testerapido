import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Notification2 } from '../../returns/notification.return';
import { ClinicService } from '../../services/clinic.service';

@Component({
  selector: 'app-central-notificacao',
  templateUrl: './central-notificacao.component.html',
  styleUrls: ['./central-notificacao.component.scss']
})
export class CentralNotificacaoComponent implements OnInit {
  user?:any;
  notifications: Notification2[] = []

  progress: number = 0;
  collection: any = [];
	p: number = 1;
  totalItens: number = 4;
  sortedData: any;

  constructor(private clinicService: ClinicService,
    public dialogRef: MatDialogRef<CentralNotificacaoComponent>) {
    this.user = JSON.parse(localStorage.getItem("UserClinicObject")!);


  }

  ngOnInit(): void {
    this.getNotification();
    // document.body.classList.add('body-etapas')
  }

  getNotification() {
    this.clinicService.getNotification(this.user?.user_id).subscribe(
      data => {
        console.log(data);
        this.notifications = data.notification;


      },
      err => {

      }
    );
  }

  onDismiss(): void {

    this.dialogRef.close(false);
  }


}
