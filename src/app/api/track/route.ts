import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query')?.trim();

    if (!query) {
      return NextResponse.json(
        { success: false, error: 'Please provide an Order Reference (e.g. NT-123456) or Phone number.' },
        { status: 400 }
      );
    }

    if (isSupabaseConfigured && supabase) {
      // Search by order_number or customer_phone
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*)
        `)
        .or(`order_number.ilike.%${query}%,customer_phone.ilike.%${query}%`)
        .order('created_at', { ascending: false });

      if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      }

      if (!data || data.length === 0) {
        return NextResponse.json({
          success: false,
          error: `No orders found matching "${query}". Please double check your order reference or phone number.`,
        });
      }

      return NextResponse.json({ success: true, orders: data });
    }

    return NextResponse.json({
      success: true,
      orders: [
        {
          order_number: query.toUpperCase(),
          customer_name: 'Customer (Demo)',
          customer_phone: '0300 1234567',
          city: 'Lahore',
          shipping_address: 'DHA Phase 5, Lahore, Pakistan',
          order_status: 'dispatched',
          courier_name: 'TCS Express',
          tracking_number: 'TCS-784920194',
          total_amount: 5499,
          payment_method: 'cod',
          created_at: new Date().toISOString(),
        },
      ],
      note: 'Demo mode. Connect Supabase to fetch live orders from database.',
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
