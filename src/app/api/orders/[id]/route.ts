import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { order_status, tracking_number, courier_name, payment_status, admin_notes } = body;

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

    return NextResponse.json({
      success: true,
      message: 'Updated in local dev mode',
      updated: updateFields,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
