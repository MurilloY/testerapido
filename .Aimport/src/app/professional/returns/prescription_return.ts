export interface ReturnPrescription {
    message: string
    prescriptions: Prescription[]
    refreshToken: string
  }
  
  export interface Prescription {
    pre_id: string
    user_id: string
    prof_id: string
    pre_date: string
    pre_desc: string
    pre_modality: number
    clinic_id: string
    clinic_name: string
    app_id: string
    expired: boolean
  }
  