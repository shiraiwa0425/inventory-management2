export interface Admin {
  id: number
  username: string
  name: string
  created_at: Date
  updated_at: Date
}

export interface LoginFormData {
  username: string
  password: string
} 