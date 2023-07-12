export interface Appointment {
    prof_id: number;
    cat_name: string;
    prof_photo: string;
    prof_name: string;
    pc_id: string;
    pc_photo: string;
    pc_name: string;
    pc_cpf: string;
    pc_rg: string;
    pc_birth_data: string;
    pc_email: string;
    pc_gender: string;
    app_date: string;
    start_time: string;
    end_time: string;
    status: number;
    app_type: number;
    clinic_id: string;
    tp_id: number;
    who: string;
    confirm_date?: any;
    ap_id?: any;
    app_id: string;
    user_id_prof: string;
    user_id_pacient: string;
}

export interface Room {
    token: string;
    room_id: string;
    participant: number;
}

export interface ReturnVerifyUrl {
    message: string;
    appointment: Appointment;
    room: Room;
    token: string
    
}