export interface ReturnProfClinicCat {
    message: string
    professionales: Professionale[]
    refreshToken: string
}

export interface Professionale {
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
    notify_prof_whatsapp: boolean
    notify_prof_email: boolean
    clinic: Clinic
    availability: number
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

export interface Clinic {
    clinic_id: string
    clinic_name: string
    clinic_city: string
    clinic_state: string
    clinic_address: string
    clinic_cnpj: string
    clinic_number: string
    clinic_neighborhood: string
    clinic_phone: string
    clinic_site: string
    clinic_email: string
    clinic_status: number
    clinic_logo: string
    subdomain: string
    lat_long: string
    clinic_logo_dir: string
}


