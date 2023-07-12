export interface User {
    user_id: string;
    user_name: string;
    user_email: string;
    user_phone: string;
    user_cpf: string;
    user_gender: string;
    user_photo: string;
    up_status: number;
    last_clinic_id?: string;
}

export interface ReturnAuthClinic {
    message: string;
    user: User;
    token: string;
}