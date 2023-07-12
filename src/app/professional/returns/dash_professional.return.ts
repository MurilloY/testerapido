export interface ReturnDashProfessional {
    message: string
    dashes: Dashes
    refreshToken: string
  }
  
  export interface Dashes {
    appointments_scheduled: number
    professionales_performed: number
    new_patients: number
  }