export interface Speciality {
    speciality_id: string;
    speciality_name: string;
    speciality_status: number;
    category_id: string;
    category_name: string;
}

export interface ReturnSpecialities {
    message: string;
    specialities: Speciality[];
    refreshToken: string;
}