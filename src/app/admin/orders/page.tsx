'use client';

import React, { useState, useEffect } from 'react';
import {
  Package,
  Truck,
  Phone,
  MapPin,
  CheckCircle2,
  Clock,
  Filter,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Search,
} from 'lucide-react';
import { OrderRecord, OrderStatus } from '@/types/database';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const formatPKR = (amount: number) => 'Rs. ' + amount.toLocaleString('en-PK');

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders || []);
      }
    } catch (err) {
      console.error('Error fetching admin orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_status: newStatus }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, order_status: newStatus } : o))
        );
      }
    } catch (err) {
      console.error('Error updating status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleTrackingUpdate = async (orderId: string, trackingNumber: string) => {
    try {
      await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tracking_number: trackingNumber }),
      });
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, tracking_number: trackingNumber } : o))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = statusFilter === 'all' || o.order_status === statusFilter;
    const matchesSearch =
      !searchQuery.trim() ||
      o.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer_phone.includes(searchQuery) ||
      o.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="bg-[#F1EDE5] min-h-screen py-10 sm:py-16 border-b border-[#DCD4C5]">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-[#FF4C00] mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>VAULT WAREHOUSE & DISPATCH</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#010101] uppercase tracking-tight">
              DELIVERY & ORDERS MANAGER
            </h1>
          </div>

          <button
            onClick={fetchOrders}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#FAF8F5] border border-[#DCD4C5] text-xs font-black uppercase text-[#010101] hover:bg-white transition shadow-sm"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Orders</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 sm:p-6 rounded-3xl bg-[#FAF8F5] border border-[#DCD4C5] luxury-shadow mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {['all', 'pending', 'confirmed', 'dispatched', 'delivered', 'cancelled'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition ${
                  statusFilter === st
                    ? 'bg-[#010101] text-white shadow-md'
                    : 'bg-[#EBE6DC] text-neutral-700 hover:bg-[#E2DDD0] border border-[#DCD4C5]'
                }`}
              >
                {st} ({st === 'all' ? orders.length : orders.filter((o) => o.order_status === st).length})
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search phone, city, order #..."
              className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#EBE6DC] border border-[#DCD4C5] text-xs font-bold text-[#010101] placeholder-neutral-500 focus:outline-none focus:border-[#010101]"
            />
          </div>
        </div>

        {/* Orders Table / Cards */}
        {loading && orders.length === 0 ? (
          <div className="p-12 text-center text-neutral-500">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2 text-[#FF4C00]" />
            <p className="text-xs font-bold uppercase">Loading delivery records...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-12 rounded-3xl bg-[#FAF8F5] border border-[#DCD4C5] text-center space-y-3">
            <Package className="w-12 h-12 text-neutral-400 mx-auto" />
            <h3 className="font-black text-lg text-[#010101] uppercase">No orders found</h3>
            <p className="text-xs text-neutral-500">Orders placed on checkout will automatically appear here in real-time.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order.order_number}
                className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#DCD4C5] luxury-shadow flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:border-[#010101] transition"
              >
                {/* 1. Order Info & Customer */}
                <div className="space-y-2 lg:w-1/3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-base text-[#010101] bg-[#EBE6DC] px-2.5 py-1 rounded-lg border border-[#DCD4C5]">
                      {order.order_number}
                    </span>
                    <span className="text-xs text-neutral-500 font-medium">
                      {order.created_at ? new Date(order.created_at).toLocaleString('en-PK', { dateStyle: 'short', timeStyle: 'short' }) : 'Recent'}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-sm text-[#010101]">{order.customer_name}</h4>
                    <p className="text-xs text-neutral-600 font-medium flex items-center gap-1.5 pt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#FF4C00] shrink-0" />
                      <span>{order.city} • {order.shipping_address}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href={`https://wa.me/${order.customer_phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Assalam o Alaikum ${order.customer_name}! This is Nayab Thrift regarding your order ${order.order_number}.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#25D366] text-white text-[11px] font-bold shadow-xs hover:bg-[#1EBE5D] transition"
                    >
                      <Phone className="w-3 h-3" />
                      <span>{order.customer_phone}</span>
                    </a>
                  </div>
                </div>

                {/* 2. Amount & Payment */}
                <div className="lg:w-1/4 space-y-1 text-xs">
                  <span className="text-[10px] font-bold uppercase text-neutral-400">Payment & Items</span>
                  <div className="font-black text-base text-[#010101]">
                    {formatPKR(order.total_amount)}
                  </div>
                  <div className="text-neutral-600 font-medium">
                    Method: <strong className="uppercase text-[#FF4C00]">{order.payment_method}</strong>
                  </div>
                  {order.items && (
                    <div className="text-[11px] text-neutral-500 font-medium line-clamp-1">
                      {order.items.map((it) => `${it.product_name} (EU ${it.size_eu})`).join(', ')}
                    </div>
                  )}
                </div>

                {/* 3. Courier & Tracking */}
                <div className="lg:w-1/4 space-y-1.5">
                  <label className="text-[10px] font-bold uppercase text-neutral-400 block">
                    TCS / Leopards Tracking #
                  </label>
                  <input
                    type="text"
                    defaultValue={order.tracking_number || ''}
                    placeholder="Enter Tracking ID..."
                    onBlur={(e) => handleTrackingUpdate(order.id || '', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#EBE6DC] border border-[#DCD4C5] text-xs font-mono font-bold text-[#010101] focus:outline-none focus:border-[#010101]"
                  />
                </div>

                {/* 4. Status Dropdown */}
                <div className="lg:w-1/6 space-y-1.5 text-right">
                  <label className="text-[10px] font-bold uppercase text-neutral-400 block text-left lg:text-right">
                    Delivery Status
                  </label>
                  <select
                    value={order.order_status}
                    disabled={updatingId === order.id}
                    onChange={(e) => handleStatusChange(order.id || '', e.target.value as OrderStatus)}
                    className="w-full p-2.5 rounded-xl bg-[#010101] text-white text-xs font-black uppercase tracking-wider focus:outline-none cursor-pointer"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="sanitizing">Sanitizing</option>
                    <option value="packed">Packed</option>
                    <option value="dispatched">Dispatched</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
