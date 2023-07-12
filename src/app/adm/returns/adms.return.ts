export interface Adm {
    adm_id: string;
    adm_status: number;
    user_id: string;
    user_name: string;
    user_email: string;
    user_phone: string;
    user_cpf: string;
    user_gender: string;
}

export interface ReturnAdms {
    message: string;
    adms: Adm[];
    refreshToken: string;
}