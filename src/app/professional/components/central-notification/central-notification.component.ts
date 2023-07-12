import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CentralNotificacaoComponent } from 'src/app/clinics/components/central-notificacao/central-notificacao.component';
import { Notification2 } from 'src/app/clinics/returns/notification.return';
import { ProfessionalService } from '../../services/professional.service';

@Component({
  selector: 'app-central-notification',
  templateUrl: './central-notification.component.html',
  styleUrls: ['./central-notification.component.scss']
})
export class CentralNotificationComponent implements OnInit {

  user?:any;
  notifications: Notification2[] = []

  progress: number = 0;
  collection: any = [];
	p: number = 1;
  totalItens: number = 6;
  sortedData: any;

  constructor(private professionalService: ProfessionalService,
    public dialogRef: MatDialogRef<CentralNotificacaoComponent>) {
    this.user = JSON.parse(localStorage.getItem("UserProfObject")!);


  }

  ngOnInit(): void {
    this.getNotification();
  }

  getNotification() {
    this.professionalService.getNotification(this.user?.user_id).subscribe(
      data => {
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

