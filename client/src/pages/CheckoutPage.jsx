import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { useCart } from "../context/CartContext";

const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

function CheckoutPage() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: ""
  });
  const [loading, setLoading] = useState(false);
  const paymentMode = (import.meta.env.VITE_PAYMENT_MODE || "direct").toLowerCase();

  const itemPayload = useMemo(
    () => items.map((item) => ({ productId: item.productId, quantity: item.quantity })),
    [items]
  );

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onPay = async (e) => {
    e.preventDefault();
    if (!items.length) return;

    setLoading(true);
    try {
      if (paymentMode === "razorpay") {
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
          throw new Error("Razorpay SDK failed to load");
        }

        const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
        if (!razorpayKey) {
          throw new Error("VITE_RAZORPAY_KEY_ID is missing in client .env");
        }

        const { data: order } = await api.post("/orders/create-razorpay-order", {
          items: itemPayload
        });

        const options = {
          key: razorpayKey,
          amount: order.amount,
          currency: "INR",
          name: "RiddhiArt",
          description: "RiddhiArt Order Payment",
          order_id: order.id,
          handler: async (response) => {
            const { data } = await api.post("/orders/verify-payment", {
              ...response,
              ...form,
              items: itemPayload
            });
            clearCart();
            navigate(`/order-confirmation/${data.orderId}`);
          },
          prefill: {
            name: form.customerName,
            email: form.email,
            contact: form.phone
          },
          theme: {
            color: "#B76E79"
          }
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } else {
        const { data } = await api.post("/orders/create-direct-order", {
          ...form,
          items: itemPayload
        });
        clearCart();
        navigate(`/order-confirmation/${data.orderId}`);
      }
    } catch (error) {
      alert(error.response?.data?.message || error.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <h1 className="font-heading text-4xl text-roseGold">Checkout</h1>
      <div className="mt-8 grid gap-8 md:grid-cols-[1fr_320px]">
        <form onSubmit={onPay} className="space-y-4 rounded-2xl border border-roseGold/20 bg-white p-6">
          <input
            required
            name="customerName"
            value={form.customerName}
            onChange={onChange}
            placeholder="Full Name"
            className="w-full rounded-lg border border-roseGold/30 px-3 py-3"
          />
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="Email"
            className="w-full rounded-lg border border-roseGold/30 px-3 py-3"
          />
          <input
            required
            name="phone"
            value={form.phone}
            onChange={onChange}
            placeholder="Phone"
            className="w-full rounded-lg border border-roseGold/30 px-3 py-3"
          />
          <textarea
            required
            name="address"
            value={form.address}
            onChange={onChange}
            placeholder="Shipping Address"
            rows="4"
            className="w-full rounded-lg border border-roseGold/30 px-3 py-3"
          />
          <button
            disabled={loading || !items.length}
            className="w-full rounded-full border border-champagne bg-softBlack px-4 py-3 text-cream transition hover:bg-roseGold disabled:opacity-50"
          >
            {loading ? "Processing..." : paymentMode === "razorpay" ? "Pay with Razorpay" : "Place Order"}
          </button>
        </form>

        <aside className="h-fit rounded-2xl border border-roseGold/20 bg-white p-5">
          <h2 className="font-heading text-3xl">Order Summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            {items.map((item) => (
              <p key={`${item.productId}-${item.selectedSize}`}>
                {item.name} x {item.quantity}
              </p>
            ))}
          </div>
          <p className="mt-4 text-sm">Total</p>
          <p className="text-2xl text-roseGold">INR {total}</p>
        </aside>
      </div>
    </div>
  );
}

export default CheckoutPage;
