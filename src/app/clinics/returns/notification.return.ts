export interface Notification2 {
  not_id: string;
  user_id: string;
  not_description: string;
  not_reading: number;
  not_time: string;
  not_status: number;
}

export interface ReturnNotification {
  message: string;
  notification: Notification2[];
  refreshToken: string;
}
