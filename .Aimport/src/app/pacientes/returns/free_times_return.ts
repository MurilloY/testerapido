export interface FreeTime {
    start_time: string;
    end_time: string;
}

export interface ReturnFreeTime {
    message: string;
    free_time: FreeTime[];
    refreshToken: string;
}