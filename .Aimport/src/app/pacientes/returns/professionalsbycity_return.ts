export interface ReturnProfessionalsByCity {
    message: string
    professionals: Professional[]
    refreshToken: string
  }
  
  export interface Professional {
    prof_id: string
    user_id: string
    user_photo: string
    user_name: string
    cat_id: string
    cat_name: string
    spe_id: string
    spe_name: string
    rt_id: string
    rt_number: string
    clinic_town: string
    clinic_state: string
    clinic_address: string
    clinic_number: string
    clinic_name: string
  }
  