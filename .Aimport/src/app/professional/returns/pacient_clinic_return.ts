export interface ReturnPacientClinic {
    message: string
    patient_clinic: PatientClinic
    refreshToken: string
  }
  
  export interface PatientClinic {
    pc_id: string
    user_id: string
    user_name: string
    user_email: string
    user_phone: string
    user_cpf: string
    user_rg: string
    user_photo: string
    clinic_id: string
    pc_status: number
    of_age: number
    has_companion: number
    companion: any
    gender: string
    birth_data: string
    ua_city: any
    ua_district: any
    ua_name_street: any
    ua_house_number: any
    ua_uf: any
    ua_cep: any
    ins_id: string
  }
  