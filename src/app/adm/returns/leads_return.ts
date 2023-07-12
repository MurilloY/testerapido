export interface Lead {
    lead_id: string;
    lead_name: string;
    lead_email: string;
    lead_cellphone: string;
    lead_city: string;
    lead_state: string;
    lead_status: string;
    status_name: string,
    lead_moment: string;
}

export interface ReturnLeads {
    message: string;
    leads: Lead[];
    refreshToken: string;
}