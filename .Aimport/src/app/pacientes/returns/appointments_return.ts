export interface Appointment2 {
    app_id: string;
    date: string;
    start_time: string;
    end_time: string;
    status_id: number;
    status_name: string;
    app_type_id: number;
    app_type_name: string;
    tp_name: string;
}

export interface Professional {
    prof_id: string;
    prof_name: string;
    clinic_id: number;
    clinic_name: string;
    clinic_town: string;
    clinic_state: string;
    clinic_address: string;
    clinic_number: string;
    clinic_phone: string;
    lat_long: string;
}

export interface Pacient {
    pc_id: string;
    pc_name: string;
    pc_email: string;
    pc_phone: string;
}

export interface Appointment {
    appointment: Appointment2;
    professional: Professional;
    pacient: Pacient;
}

export interface ReturnAppointment {
    message: string;
    appointment: Appointment;
    refreshToken: string;
}