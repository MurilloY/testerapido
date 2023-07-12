export interface ReturnClinicUrlVerify {
    message: string
    clinic: Clinicurl
    token: string
  }
  
  export interface Clinicurl {
    clinic_id: string
    clinic_name: string
    clinic_town: string
    clinic_state: string
    clinic_address: string
    clinic_cnpj: string
    clinic_number: string
    clinic_neighborhood: string
    clinic_phone: string
    clinic_email: string
    clinic_logo: string
    subdomain: string
    clinic_cep: string
  }
  