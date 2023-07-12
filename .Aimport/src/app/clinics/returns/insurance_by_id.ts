export interface Insurance {
    ins_id: string;
    ins_name: string;
    ins_city: string;
    ins_state: string;
    ins_status: number;
    clinic_id: string;
}

export interface ReturnInsuranceId {
    message: string;
    insurance: Insurance;
    refreshToken: string;
}