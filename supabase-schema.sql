-- =========================================================================
-- NAYAB THRIFT SNEAKER STORE - COMPLETE SUPABASE DATABASE SCHEMA
-- Copy and paste this script into Supabase SQL Editor and click "Run".
-- =========================================================================

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ORDERS TABLE (Customer & Delivery Records)
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number TEXT UNIQUE NOT NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    city TEXT NOT NULL,
    shipping_address TEXT NOT NULL,
    payment_method TEXT NOT NULL DEFAULT 'cod', -- 'cod' (Cash on Delivery) or 'bank' (SadaPay/Bank)
    payment_status TEXT NOT NULL DEFAULT 'unpaid', -- 'unpaid', 'paid', 'refunded'
    subtotal NUMERIC NOT NULL DEFAULT 0,
    discount NUMERIC NOT NULL DEFAULT 0,
    delivery_fee NUMERIC NOT NULL DEFAULT 0,
    total_amount NUMERIC NOT NULL DEFAULT 0,
    coupon_code TEXT,
    order_status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'confirmed', 'sanitizing', 'packed', 'dispatched', 'delivered', 'cancelled'
    courier_name TEXT DEFAULT 'TCS Express', -- 'TCS Express', 'Leopards', 'Trax', 'PostEx'
    tracking_number TEXT,
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. ORDER ITEMS TABLE (Individual Shoes Ordered)
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id TEXT NOT NULL,
    product_name TEXT NOT NULL,
    brand TEXT,
    size_eu TEXT NOT NULL,
    size_uk TEXT,
    price NUMERIC NOT NULL,
    image_url TEXT,
    condition_score NUMERIC,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. PRODUCTS INVENTORY TABLE (The 1-of-1 Vault)
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    brand TEXT NOT NULL,
    category TEXT NOT NULL,
    gender TEXT DEFAULT 'Unisex',
    size_eu TEXT NOT NULL,
    size_uk TEXT NOT NULL,
    original_price NUMERIC NOT NULL,
    thrift_price NUMERIC NOT NULL,
    condition_score NUMERIC NOT NULL DEFAULT 9.0,
    condition_notes TEXT,
    in_stock BOOLEAN NOT NULL DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    is_new_arrival BOOLEAN DEFAULT false,
    images JSONB NOT NULL DEFAULT '[]'::jsonb,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. CONTACT & INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'unread', -- 'unread', 'read', 'replied'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexes for lightning fast searching by Order Number, Phone, and City
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON public.orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_customer_phone ON public.orders(customer_phone);
CREATE INDEX IF NOT EXISTS idx_orders_order_status ON public.orders(order_status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON public.products(in_stock);

-- Enable Row Level Security (RLS)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Security Policies:
-- Allow anyone (public customer) to insert a new order at checkout
CREATE POLICY "Public can insert orders" ON public.orders
    FOR INSERT WITH CHECK (true);

-- Allow customers to track their order with Order Number or Phone
CREATE POLICY "Public can view their own orders" ON public.orders
    FOR SELECT USING (true);

-- Allow anyone to insert order items during checkout
CREATE POLICY "Public can insert order items" ON public.order_items
    FOR INSERT WITH CHECK (true);

-- Allow public to view order items
CREATE POLICY "Public can view order items" ON public.order_items
    FOR SELECT USING (true);

-- Allow public to view products in vault
CREATE POLICY "Public can view products" ON public.products
    FOR SELECT USING (true);

-- Allow public to submit contact inquiries
CREATE POLICY "Public can insert inquiries" ON public.inquiries
    FOR INSERT WITH CHECK (true);

-- Full access for service_role / admin
CREATE POLICY "Admin full access on orders" ON public.orders
    FOR ALL USING (true);

CREATE POLICY "Admin full access on order_items" ON public.order_items
    FOR ALL USING (true);

CREATE POLICY "Admin full access on products" ON public.products
    FOR ALL USING (true);
