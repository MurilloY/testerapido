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

export interface ReturnUserCpf {
    message: string;
    user: User;
    refreshToken: string;
}