
export interface Dashes {
    user_profile: number;
    patient_clinic: number;
    prof_clinic: number;
}

export interface ReturnDashClinic {
    message: string;
    dashes: Dashes;
    refreshToken: string;
}
