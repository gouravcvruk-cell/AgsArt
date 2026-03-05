import { Link, useParams } from "react-router-dom";

function ConfirmationPage() {
  const { orderId } = useParams();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <div className="rounded-2xl border border-roseGold/30 bg-white p-8 text-center">
        <h1 className="font-heading text-5xl text-roseGold">Thank You</h1>
        <p className="mt-4 text-softBlack/80">Your order has been placed successfully.</p>
        <p className="mt-3 text-sm">
          <span className="font-semibold">Order ID:</span> {orderId}
        </p>
        <p className="mt-2 text-sm">
          Estimated delivery: 5-7 business days across India.
        </p>
        <Link
          to="/shop"
          className="mt-8 inline-block rounded-full border border-champagne bg-softBlack px-6 py-3 text-cream transition hover:bg-roseGold"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default ConfirmationPage;
