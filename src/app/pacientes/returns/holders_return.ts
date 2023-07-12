export interface ReturnHolders {
    message: string
    holders: Holder[]
    refreshToken: string
  }
  
  export interface Holder {
    pc_id: string
    user_id: string
    user_name: string
    user_email: string
    user_phone: string
    user_cpf: string
    user_rg: string
    user_gender: string
    user_photo: string
    user_birth_data: string
    photo_mime_type?: string
  }
  