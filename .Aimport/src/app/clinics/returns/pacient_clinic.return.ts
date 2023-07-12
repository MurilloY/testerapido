export interface Pacient2 {
    user_id: string;
    pacient_name: string;
    pacient_birth_data: string;
    pacient_phone: string;
    pacient_id: string;
}

export interface Appointment {
    prof_id: string;
    prof_name: string;
    cat_id: string;
    cat_name: string;
    date: string;
    start_time: string;
    tp_id: string;
    tp_name: string;
    class: string;
}

export interface Pacient {
    pacient: Pacient2;
    appointment?: Appointment;
}

export interface ReturnPacients {
    message: string;
    pacients: Pacient[];
    refreshToken: string;
}