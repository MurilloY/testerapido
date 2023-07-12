export interface Profile {
    pro_id: string;
    pro_name: string;
    pan_id: number;
    pan_name: string;
    cli_heal_id: string;
    cli_heal_name: string;
}

export interface ReturnProfiles {
    message: string;
    profile: Profile[];
    refreshToken: string;
}