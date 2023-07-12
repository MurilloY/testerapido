export interface Dashes {
    appointments_scheduled: number;
    appointments_unconfirmed: number;
    professionales_available: number;
    new_patients: number;
    appointments_performed: number;

}

export interface ReturnDashes {
    message: string;
    dashes: Dashes;
    refreshToken: string;
}