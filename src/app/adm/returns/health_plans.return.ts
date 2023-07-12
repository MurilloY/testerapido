export interface HealthPlan {
    health_plan_id: string;
    health_plan_name: string;
    health_plan_city: string;
    health_plan_state: string;
    health_plan_address: string;
    health_plan_cnpj: string;
    health_plan_number: string;
    health_plan_neighborhood: string;
    health_plan_phone: string;
    health_plan_site: string;
    health_plan_email: string;
    health_plan_status: number;
}

export interface ReturnHealthPlans {
    message: string;
    health_plan: HealthPlan[];
    refreshToken: string;
}