export interface ReturnClinicsCities {
    message: string
    cities: City[]
    refreshToken: string
  }
  
  export interface City {
    clinic_town: string
    clinic_state: string
  }
  