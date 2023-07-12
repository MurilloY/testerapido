import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Notification2 } from '../../returns/notification.return';
import { ClinicService } from '../../services/clinic.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Clinic } from '../../returns/clinic_name.return';

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
  clinic_subdomain: string;
  clinic?: Clinic;

  constructor(private clinicService: ClinicService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CentralNotificacaoComponent>) {

      this.clinic = data['clinic']
    this.user = JSON.parse(localStorage.getItem("UserClinicObject")!);


  }

  ngOnInit(): void {

    this.getNotification();

  }

  getNotification() {
    this.clinicService.getNotification(this.user?.user_id).subscribe(
      data => {
        console.log(data);
        this.notifications = data.notification.sort((a, b) => {
          return new Date(b.not_time).getTime() - new Date(a.not_time).getTime();
        });


      },
      err => {

      }
    );
  }

  onDismiss(): void {

    this.dialogRef.close(false);
  }


}
