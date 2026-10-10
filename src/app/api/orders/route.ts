import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { OrderRecord, OrderItemRecord } from '@/types/database';

// In-memory / dev fallback store when Supabase keys are pending
let localDevOrders: OrderRecord[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customer_name,
      customer_phone,
      customer_email,
      city,
      shipping_address,
      payment_method,
      subtotal,
      discount = 0,
      delivery_fee = 0,
      total_amount,
      coupon_code,
      items = [],
    } = body;

    if (!customer_name || !customer_phone || !city || !shipping_address) {
      return NextResponse.json(
        { success: false, error: 'Missing required customer delivery details.' },
        { status: 400 }
      );
    }

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Cart is empty. No items to order.' },
        { status: 400 }
      );
    }

    // Generate distinctive 6-digit Order Reference (e.g. NT-849201)
    const order_number = 'NT-' + Math.floor(100000 + Math.random() * 900000);
    const now = new Date().toISOString();

    const newOrder: OrderRecord = {
      order_number,
      customer_name,
      customer_phone,
      customer_email: customer_email || null,
      city,
      shipping_address,
      payment_method: payment_method || 'cod',
      payment_status: 'unpaid',
      subtotal: Number(subtotal) || 0,
      discount: Number(discount) || 0,
      delivery_fee: Number(delivery_fee) || 0,
      total_amount: Number(total_amount) || 0,
      coupon_code: coupon_code || null,
      order_status: 'pending',
      courier_name: 'TCS Express',
      created_at: now,
      updated_at: now,
    };

    // 1. If Supabase is connected, attempt insert to PostgreSQL Database
    if (isSupabaseConfigured && supabase) {
      try {
        const { data: insertedOrder, error: orderError } = await supabase
          .from('orders')
          .insert([newOrder])
          .select()
          .single();

        if (!orderError && insertedOrder) {
          // Insert Order Items
          const orderItemsToInsert = items.map((item: any) => ({
            order_id: insertedOrder.id,
            product_id: String(item.product?.id || item.product_id || 'PROD-1'),
            product_name: item.product?.name || item.product_name,
            brand: item.product?.brand || item.brand || 'Original',
            size_eu: String(item.selectedSize || item.size_eu || '42'),
            size_uk: String(item.product?.sizeUK || item.size_uk || '8'),
            price: Number(item.product?.thriftPrice || item.price || 0),
            image_url: item.product?.images?.[0] || item.image_url || '',
            condition_score: item.product?.condition?.score || item.condition_score || 9.0,
          }));

          const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItemsToInsert);

          if (itemsError) {
            console.error('Supabase Order Items Error:', itemsError);
          }

          return NextResponse.json({
            success: true,
            order_number: insertedOrder.order_number,
            order: insertedOrder,
            storage: 'supabase',
          });
        } else if (orderError) {
          console.warn('Supabase insert warning, falling back:', orderError.message);
        }
      } catch (err: any) {
        console.warn('Supabase connection exception, falling back:', err.message);
      }
    }

    // 2. Dev Fallback: Store locally
    const devRecord: OrderRecord = {
      ...newOrder,
      id: 'local-' + Date.now(),
      items: items.map((item: any, idx: number) => ({
        id: `item-${Date.now()}-${idx}`,
        product_id: String(item.product?.id || item.product_id),
        product_name: item.product?.name || item.product_name,
        brand: item.product?.brand || item.brand,
        size_eu: String(item.selectedSize || item.size_eu),
        price: Number(item.product?.thriftPrice || item.price),
        image_url: item.product?.images?.[0] || item.image_url,
      })),
    };

    localDevOrders.unshift(devRecord);

    return NextResponse.json({
      success: true,
      order_number,
      order: devRecord,
      storage: 'local_fallback',
      note: 'Saved in dev mode. Connect Supabase keys in .env.local to persist in live PostgreSQL.',
    });
  } catch (error: any) {
    console.error('API Order Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Server error occurred.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    if (isSupabaseConfigured && supabase) {
      const { data: orders, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        orders: orders || [],
        storage: 'supabase',
      });
    }

    return NextResponse.json({
      success: true,
      orders: localDevOrders,
      storage: 'local_fallback',
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, order_status, tracking_number, courier_name, payment_status, admin_notes } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Order ID is required.' }, { status: 400 });
    }

    const updateFields: any = {
      updated_at: new Date().toISOString(),
    };

    if (order_status) updateFields.order_status = order_status;
    if (tracking_number !== undefined) updateFields.tracking_number = tracking_number;
    if (courier_name) updateFields.courier_name = courier_name;
    if (payment_status) updateFields.payment_status = payment_status;
    if (admin_notes !== undefined) updateFields.admin_notes = admin_notes;

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('orders')
        .update(updateFields)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      }

      return NextResponse.json({ success: true, order: data });
    }

    // Local dev mode fallback update
    localDevOrders = localDevOrders.map((o) => (o.id === id ? { ...o, ...updateFields } : o));

    return NextResponse.json({
      success: true,
      message: 'Updated order successfully',
      updated: updateFields,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
