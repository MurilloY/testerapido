export interface LeadHistory {
    lead_history_id: string;
    lead_id: string;
    lead_name: string;
    lead_email: string;
    lead_cellphone: string;
    lead_city: string;
    lead_state: string;
    adm_id: string;
    adm_name: string;
    message: string;
    moment: string;
}

export interface ReturnLeadsHistoriesId {
    message: string;
    lead_history: LeadHistory[];
    refreshToken: string;
}