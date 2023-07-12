export interface ReturnPacientAuth {
    message: string
    user: User
    token: string
  }
  
  export interface User {
    user_id: string
    user_name: string
    user_email: string
    user_phone: string
    user_cpf: string
    user_rg: string
    user_date: string
    user_status: number
    user_gender: string
    user_photo: string
    birth_data: string
    photo_mime_type: string
  }
  