export interface Clinic {
    clinic_id: string;
    clinic_name: string;
    clinic_city: string;
    clinic_state: string;
    clinic_address: string;
    clinic_cnpj: string;
    clinic_number: string;
    clinic_neighborhood: string;
    clinic_phone: string;
    clinic_site: string;
    clinic_email: string;
    clinic_status: number;
    clinic_logo: string;
    subdomain: string;
    lat_long: string;
    clinic_cep: string;
}

export interface ReturnClinics {
    message: string;
    clinics: Clinic[];
    refreshToken: string;
}
