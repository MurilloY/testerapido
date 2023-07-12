export interface UserProfile {
    up_id: string;
    user_id: string;
    user_name: string;
    user_email: string;
    user_phone: string;
    user_cpf: string;
    user_rg: string;
    user_status: number;
    user_date: string;
    user_gender: string;
    pro_id: string;
    pro_name: string;
    pan_id: number;
    clinic_id: string;
    health_id?: string;
    user_photo?: string;
    up_status?: number;
}

export interface ReturnUsersProfile {
    message: string;
    UserProfiles: UserProfile[];
    refreshToken: string;
}