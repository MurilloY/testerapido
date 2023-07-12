export interface AppointmentsPayments {
    ap_id: string;
    apt_id: string;
    times?: any;
    ap_valor: string;
    date: string;
}

export interface ReturnAppointmentsPayments {
    message: string;
    appointments: AppointmentsPayments;
}