export interface RetunAppointment {
    message: string
    appointment: Appointment
  }
  
  export interface Appointment {
    appointment: Appointment2
    professional: Professional
    pacient: Pacient
  }
  
  export interface Appointment2 {
    app_id: string
    date: string
    start_time: string
    end_time: string
    status_id: number
    status_name: string
    app_type_id: number
    app_type_name: string
    tp_name: string
  }
  
  export interface Professional {
    prof_id: string
    prof_name: string
    clinic_id: number
    clinic_name: string
    clinic_town: string
    clinic_state: string
    clinic_address: string
    clinic_number: string
    clinic_phone: string
    lat_long: string
    clinic_cnpj: string
    clinic_cep: string
    cat_name: string
    rt_number: string
    url_prof: string
    user_id_professional: string

  }
  
  export interface Pacient {
    pc_id: string
    pc_name: string
    pc_email: string
    pc_phone: string
    pc_cpf: string
    user_photo: string
    birth_data: string
    user_address: UserAddress
    url_pacient: string
    user_id_pacient: string

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
  