export interface Appointment {
    app_id: string;
    prof_id: string;
    prof_name: string;
    prof_photo: string;
    pc_id: string;
    pc_name: string;
    pacient_photo: string;
    date: string;
    start_time: string;
    end_time: string;
    status: number;
    status_name: string;
    tp_name: string;
    situation: string;
    class: string;
    ap_id: string;
}

export interface ReturnAppointments {
    message: string;
    appointments: Appointment[];
    refreshToken: string;
}