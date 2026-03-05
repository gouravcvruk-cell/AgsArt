import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="fade-in shimmer-hover overflow-hidden rounded-2xl border border-roseGold/20 bg-white shadow-luxe">
      <Link to={`/product/${product._id}`}>
        <img src={product.images?.[0]} alt={product.name} className="h-64 w-full object-cover" />
      </Link>
      <div className="space-y-3 p-4">
        <h3 className="font-heading text-2xl text-softBlack">{product.name}</h3>
        <p className="text-roseGold">INR {product.price}</p>
        <button
          onClick={() => addToCart(product)}
          className="w-full rounded-full border border-champagne bg-softBlack px-4 py-2 text-sm text-cream transition hover:bg-roseGold"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
