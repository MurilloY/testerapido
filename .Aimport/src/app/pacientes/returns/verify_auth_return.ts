export interface ReturnVerifyAuth {
    message: string
    user: User
    refreshToken: string
  }
  
  export interface User {
    user_id: string
    user_name: string
  }
  