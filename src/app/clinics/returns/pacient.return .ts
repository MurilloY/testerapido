export interface Address {
    ua_id: number;
    ua_cep: string;
    ua_uf: string;
    ua_city: string;
    ua_district: string;
    ua_name_street: string;
    ua_house_number: string;
}

export interface Companion {
    user_id: string;
    user_name: string;
    user_email: string;
    user_phone: string;
    user_cpf: string;
    user_rg: string;
    user_date: string;
    user_status: number;
    user_gender: string;
    user_photo: string;
    birth_data: string;
    address: Address;
}

export interface PatientClinic {
    ins_id?: string;
    pc_id: string;
    user_id: string;
    user_name: string;
    user_email: string;
    user_phone: string;
    user_cpf: string;
    user_rg: string;
    user_photo: string;
    clinic_id: string;
    pc_status: number;
    of_age: number;
    has_companion: number;
    companion?: Companion;  
    gender: string;
    birth_data: string;
    ua_city: string;
    ua_district: string;
    ua_name_street: string;
    ua_house_number: string;
    ua_uf: string;
    ua_cep: string;
}

export interface ReturnPacient {
    message: string;
    patient_clinic: PatientClinic;
    refreshToken: string;
}
