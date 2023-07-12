export interface PatientClinic {
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
}

export interface ReturnPatientsClinic {
    message: string;
    patients_clinic: PatientClinic[];
    refreshToken: string;
}