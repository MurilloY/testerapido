export interface Clinic {
    clinic_name: string;
    clinic_logo: string;
    clinic_subdomain: string;
    clinic_id: string;
}

export interface ReturnClinicName {
    message: string;
    clinic: Clinic;
}
