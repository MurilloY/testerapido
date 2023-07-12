export interface ReturnAnamneseByAnamId {
    message: string
    anamnesis: Anamnesi
    refreshToken: string
  }
  
  export interface Anamnesi {
    anam_id: string
    therapy: number
    therapy_desc: string
    practice_exercises: number
    medical_follow_up: number
    symptoms: string
    family_history: number
    use_medication: number
    use_medication_desc: string
    use_drugs: number
    user_id: string
    clinic_id: string
    who: string
    date: string
    app_id: string
    clinic_name: string
  }
  