export interface Professional2 {
    pc_id: string;
    prof_id: string;
    prof_name: string;
    prof_birth_data: string;
    prof_photo: string;
    prof_email: string;
    prof_phone: string;
    prof_cpf: string;
    user_id: string;
}

export interface Specialty {
    spe_id: string;
    spe_name: string;
    cat_id: string;
    cat_name: string;
    rt_id: string;
    rt_number: string;
    rt_name: string;
}

export interface Appointment {
    presencial: boolean;
    online: boolean;
}

export interface Professional {
    professional: Professional2;
    specialties: Specialty[];
    appointment: Appointment;
}

export interface ReturnProfessional {
    message: string;
    professionals: Professional[];
    refreshToken: string;
}