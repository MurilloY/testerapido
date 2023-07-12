export interface ReturnPacientVerify {
    message: string
    pacient: Pacient
    refreshToken: string
  }
  
  export interface Pacient {
    user_name: string
    user_email: string
    user_phone: string
    user_cpf: string
    user_rg: string
    user_gender: string
    user_photo: string
    birth_data: string
  }
  