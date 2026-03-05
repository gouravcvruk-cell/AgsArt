import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function CartPage() {
  const { items, total, updateQty, removeItem } = useCart();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <h1 className="font-heading text-4xl text-roseGold">Your Cart</h1>
      {!items.length ? (
        <div className="mt-8 rounded-2xl border border-roseGold/20 bg-white p-8">
          <p>Your cart is empty.</p>
          <Link to="/shop" className="mt-4 inline-block text-roseGold underline">
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 md:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            {items.map((item) => (
              <article
                key={`${item.productId}-${item.selectedSize}`}
                className="flex gap-4 rounded-2xl border border-roseGold/20 bg-white p-4"
              >
                <img src={item.image} alt={item.name} className="h-24 w-24 rounded-lg object-cover" />
                <div className="flex-1">
                  <h2 className="font-heading text-2xl">{item.name}</h2>
                  {item.selectedSize && <p className="text-sm text-softBlack/70">Size: {item.selectedSize}</p>}
                  <p className="text-roseGold">INR {item.price}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => updateQty(item.productId, item.selectedSize, item.quantity - 1)}
                      className="rounded border px-2"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.productId, item.selectedSize, item.quantity + 1)}
                      className="rounded border px-2"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.productId, item.selectedSize)}
                      className="ml-4 text-sm text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="h-fit rounded-2xl border border-roseGold/20 bg-white p-5">
            <h2 className="font-heading text-3xl">Summary</h2>
            <p className="mt-4 text-sm">Subtotal</p>
            <p className="text-2xl text-roseGold">INR {total}</p>
            <Link
              to="/checkout"
              className="mt-6 block rounded-full border border-champagne bg-softBlack px-4 py-3 text-center text-cream transition hover:bg-roseGold"
            >
              Proceed to Checkout
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}

export default CartPage;
