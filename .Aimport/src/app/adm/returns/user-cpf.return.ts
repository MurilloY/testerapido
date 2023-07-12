export interface User {
    user_id: string;
    user_name: string;
    user_email: string;
    user_password: string;
    user_phone: string;
    user_cpf: string;
    user_rg: string;
    user_date: string;
    user_status: number;
    user_gender: string;
    user_photo: string;
    birth_data: string;
}

export interface ReturnUserCpf {
    message: string;
    user: User;
    refreshToken: string;
}
