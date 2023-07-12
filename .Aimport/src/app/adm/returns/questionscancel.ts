export interface CancellationQuestion {
    cq_id: string;
    cq_name: string;
    cq_type: number;
    cq_status: number;
    ct_id: number;
    ct_name: string;
}

export interface ReturnAllQuestionsCancel {
    message: string;
    cancellation_question: CancellationQuestion[];
    refreshToken: string;
}