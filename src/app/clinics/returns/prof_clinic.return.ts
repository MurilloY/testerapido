export interface UserAddress {
    ua_id: string;
    user_id: string;
    ua_cep: string;
    ua_uf: string;
    ua_city: string;
    ua_district: string;
    ua_name_street: string;
    ua_house_number: string;
}

export interface Specialty {
    pe_id: string;
    prof_id: string;
    spe_id: string;
    spe_name: string;
    cat_id: string;
    cat_name: string;
    rt_id: string;
    rt_name: string;
    rt_number: string;
}

export interface Professional {
    prof_id: string;
    prof_status: number;
    user_id: string;
    user_name: string;
    user_email: string;
    user_phone: string;
    user_cpf: string;
    user_gender: string;
    user_photo: string;
    user_rg: string;
    birth_data: string;
    user_address: UserAddress;
    specialties: Specialty[];
}

export interface Day {
    pa_id: string;
    who_user: string;
    start_time: string;
    end_time: string;
    app_type: number;
    time: number;
    gap: number;
    days: number[];
}

export interface ProfClinic {
    pc_id: string;
    clinic_id: string;
    pc_status: string;
    professional: Professional;
    days: Day[];
}


export interface ReturnProfClinic {
    message: string;
    prof_clinic: ProfClinic;
    refreshToken: string;
}