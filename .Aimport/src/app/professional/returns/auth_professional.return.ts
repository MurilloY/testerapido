export interface ReturnAuthProfessional {
    message: string
    professional: Professional
    token: string
  }
  
  export interface Professional {
    prof_id: string
    prof_status: number
    user_id: string
    user_name: string
    user_email: string
    user_phone: string
    user_cpf: string
    user_gender: string
    user_photo: string
    user_rg: string
    birth_data: string
    user_address: UserAddress
    specialties: Specialty[]
    notify_prof_whatsapp: number
    notify_prof_email: number
  }
  
  export interface UserAddress {
    ua_id: string
    user_id: string
    ua_cep: string
    ua_uf: string
    ua_city: string
    ua_district: string
    ua_name_street: string
    ua_house_number: string
  }
  
  export interface Specialty {
    pe_id: string
    prof_id: string
    spe_id: string
    spe_name: string
    cat_id: string
    cat_name: string
    rt_id: string
    rt_name: string
    rt_number: string
  }