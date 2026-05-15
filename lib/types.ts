export interface Category {
  id: string
  name: string
  description: string | null
  slug: string
  image_url: string | null
  created_at: string
}

export interface Product {
  id: string
  category_id: string | null
  name: string
  description: string | null
  price: number
  image_url: string | null
  calories: number | null
  protein: number | null
  carbs: number | null
  fat: number | null
  fiber: number | null
  sodium: number | null
  is_diabetic_friendly: boolean
  is_heart_healthy: boolean
  is_low_sodium: boolean
  is_high_protein: boolean
  ingredients: string[] | null
  allergens: string[] | null
  serving_size: string | null
  preparation_time: string | null
  is_active: boolean
  created_at: string
  updated_at: string
  category?: Category
}

export interface Kit {
  id: string
  name: string
  description: string | null
  slug: string
  price: number
  original_price: number | null
  image_url: string | null
  badge: string | null
  badge_color: string | null
  meals_per_week: number
  is_active: boolean
  created_at: string
}

export interface CartItem {
  id: string
  user_id: string
  product_id: string | null
  kit_id: string | null
  quantity: number
  created_at: string
  product?: Product
  kit?: Kit
}

export interface Profile {
  id: string
  full_name: string | null
  phone: string | null
  birth_date: string | null
  address: string | null
  city: string | null
  state: string | null
  zip_code: string | null
  dietary_restrictions: string[] | null
  health_conditions: string[] | null
  emergency_contact_name: string | null
  emergency_contact_phone: string | null
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  user_id: string | null
  status: string
  total: number
  delivery_address: string | null
  delivery_city: string | null
  delivery_state: string | null
  delivery_zip: string | null
  delivery_date: string | null
  delivery_time_slot: string | null
  payment_method: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string | null
  kit_id: string | null
  quantity: number
  unit_price: number
  product?: Product
  kit?: Kit
}
