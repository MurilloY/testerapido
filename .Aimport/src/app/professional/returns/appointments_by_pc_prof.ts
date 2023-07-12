export interface ReturnAppointmentsByPacientAndProf {
    message: string
    appointments: Appointment[]
    refreshToken: string
  }
  
  export interface Appointment {
    prof_id: string
    prof_name: string
    clinic_id: string
    clinic_name: string
    clinic_town: string
    clinic_state: string
    clinic_address: string
    clinic_number: string
    clinic_phone: string
    clinic_lat_long: string
    url_doctor: string
    pacient: Pacient
    appointment: Appointment2
  }
  
  export interface Pacient {
    user_id: string
    pc_id: string
    pc_name: string
    pc_email: string
    pc_phone: string
    pc_photo: string
    birth_data: string
    url_pacient: string
  }
  
  export interface Appointment2 {
    app_id: string
    date: string
    start_time: string
    end_time: string
    status_id: number
    status_name: string
    app_type_id: number
    app_type_name: string
    tp_name: string
  }
  