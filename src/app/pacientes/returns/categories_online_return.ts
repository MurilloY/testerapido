export interface ReturnCategoriesOnline {
    message: string
    categories: Categories[]
    refreshToken: string
  }
  
  export interface Categories {
    category_id: string
    category_name: string
    category_status: number
  }
  