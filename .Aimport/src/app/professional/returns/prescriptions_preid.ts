export interface ReturnPrescriptionById {
    message: string
    prescriptions: Prescriptions
    refreshToken: string
  }
  
  export interface Prescriptions {
    pre_id: string
    pre_date: string
    pre_desc: string
    paciente: Paciente
    professional: Professional
    clinic: Clinic
    appointment: Appointment
  }
  
  export interface Paciente {
    pc_id: string
    pc_name: string
    pc_email: string
    pc_phone: string
    pc_cpf: string
  }
  
  export interface Professional {
    prof_id: string
    prof_name: string
    prof_cpf: string
    rt_number: string
    cat_name: string
  }
  
  export interface Clinic {
    clinic_id: string
    clinic_name: string
    clinic_town: string
    clinic_state: string
    clinic_address: string
    clinic_number: string
    clinic_phone: string
    clinic_cnpj: string
    clinic_cep: string
  }
  
  export interface Appointment {
    app_id: string
    date: string
    start_time: string
    end_time: string
    app_type: number
    app_type_name: string
  }
  