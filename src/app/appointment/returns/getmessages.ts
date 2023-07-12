export interface Message {
    prof_id: string;
    pc_id: string;
    app_id: string;
    message: string;
    moment: string;
    participant: number;
}

export interface ReturnGetMessages {
    message: string;
    messages: Message[];
    refreshToken: string;
}