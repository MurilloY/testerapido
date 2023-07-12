export interface RegisterType {
    rt_id: string;
    rt_name: string;
    rt_desc: string;
}

export interface ReturnRegisterTypes {
    message: string;
    register_types: RegisterType[];
    refreshToken: string;
}