export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'sanitizing'
  | 'packed'
  | 'dispatched'
  | 'delivered'
  | 'cancelled';

export type PaymentMethod = 'cod' | 'bank';
export type PaymentStatus = 'unpaid' | 'paid' | 'refunded';

export interface OrderRecord {
  id?: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  city: string;
  shipping_address: string;
  payment_method: PaymentMethod;
  payment_status?: PaymentStatus;
  subtotal: number;
  discount: number;
  delivery_fee: number;
  total_amount: number;
  coupon_code?: string;
  order_status: OrderStatus;
  courier_name?: string;
  tracking_number?: string;
  admin_notes?: string;
  created_at?: string;
  updated_at?: string;
  items?: OrderItemRecord[];
}

export interface OrderItemRecord {
  id?: string;
  order_id?: string;
  product_id: string;
  product_name: string;
  brand?: string;
  size_eu: string;
  size_uk?: string;
  price: number;
  image_url?: string;
  condition_score?: number;
  created_at?: string;
}
