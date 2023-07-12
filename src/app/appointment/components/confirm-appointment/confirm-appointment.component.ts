import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Appointment } from '../../returns/appointment.return';
import { AppointmentService } from '../../services/appointment.service';


@Component({
  selector: 'app-confirm-appointment',
  templateUrl: './confirm-appointment.component.html',
  styleUrls: ['./confirm-appointment.component.scss']
})
export class ConfirmAppointmentComponent implements OnInit {

  appointment?: Appointment;
  app_id:string;

  constructor(private route: ActivatedRoute, private appointmentService: AppointmentService) { }

  ngOnInit(): void {

    this.route.paramMap
      .subscribe(params => {
        this.app_id = params.get('app_id')!;

        this.getAppoitmentById() 
      }
    );
  }

  getAppoitmentById() {

    this.appointmentService.getAppointmentById(this.app_id).subscribe(
      data => {   

        this.appointment = data.appointment;

      },
      err => {

      }
    );

  }

  howToGet(lat_lng:string) {
    window.open(`http://www.google.com/maps/place/${lat_lng}`);

  }

  confirmAppointment(){

    this.appointmentService.updateAppointmentById(this.app_id).subscribe(
      data => {

      this.getAppoitmentById();

      },
      err => {

      }
    );
  }

  cancelAppointment(){

    this.appointmentService.updateAppointmentById2(this.app_id).subscribe(
      data => {

      this.getAppoitmentById();

      },
      err => {

      }
    );
  }

  cancelAlert(){

    this.cancelAppointment();

      Swal.fire({
        heightAuto: false,
        title: 'Cancelar agendamento',
        text: "Tem certeza que deseja cancelar este agendamento?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#01AEEF',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Não',
        confirmButtonText: 'Sim'
        
      })
  }

}
