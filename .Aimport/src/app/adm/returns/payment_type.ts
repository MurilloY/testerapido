export interface Status {
    apt_id: string;
    apt_name: string;
}

export interface ReturnPaymentTypes {
    message: string;
    Status: Status[];
    refreshToken: string;
}