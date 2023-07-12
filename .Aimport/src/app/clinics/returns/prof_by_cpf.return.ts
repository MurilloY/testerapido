export interface Address {
    ua_id: string;
    ua_cep: string;
    ua_uf: string;
    ua_city: string;
    ua_district: string;
    ua_name_street: string;
    ua_house_number: string;
}

export interface User {
    user_id: string;
    user_name: string;
    user_email: string;
    user_password: string;
    user_phone: string;
    user_cpf: string;
    user_rg: string;
    user_status: number;
    user_date: string;
    user_gender: string;
    user_photo: string;
    birth_data: string;
    address: Address;
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
    specialties: Specialty[];
}

export interface ReturnProfessionalCpf {
    message: string;
    user: User;
    professional?: Professional;
    refreshToken: string;
}