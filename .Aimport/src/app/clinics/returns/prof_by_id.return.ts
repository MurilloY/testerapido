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
    specialties: Specialty[];
}

export interface ReturnProfessionalID {
    message: string;
    professional: Professional;
    refreshToken: string;
}