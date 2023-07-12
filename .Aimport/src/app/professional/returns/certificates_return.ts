export interface ReturnCertificates {
    message: string
    certificate: Certificate[]
    refreshToken: string
  }
  
  export interface Certificate {
    cert_id: string
    cert_date: string
    cert_validity: string
    cert_modality: number
    cert_desc: string
    cert_reason: string
    clinic_id: string
    clinic_name: string
    user_id: string
    prof_id: string
    app_id: string
    expired: boolean
  }
  