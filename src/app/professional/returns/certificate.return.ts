export interface ReturnCertificate {
  message: string
  certificate: Certificate
  refreshToken: string
}

export interface Certificate {
  cert_id: string
  cert_date: string
  expired: boolean
  cert_desc: string
  cert_reason: string
  paciente: Paciente
  professional: Professional
  clinic: Clinic
  appointment: Appointment
}

export interface Paciente {
  user_id: string
  pc_name: string
  pc_email: string
  pc_phone: string
  pc_cpf: string
}

export interface Professional {
  prof_id: string
  prof_name: string
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

