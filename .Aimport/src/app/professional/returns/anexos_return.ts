export interface ReturnAnexos {
    message: string
    anexos: Anexo[]
    refreshToken: string
  }
  
  export interface Anexo {
    ane_id: string
    ane_name: string
    ane_date: string
    clinic_id: string
    clinic_name: string
    who: string
    user_id: string
    cdn_url: string
    cdn_mime_type: string
    app_id: string
    expired: boolean
  }
  