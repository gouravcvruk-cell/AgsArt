import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [activeImage, setActiveImage] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get(`/products/${id}`);
      setProduct(data);
      if (data.sizes?.length) {
        setSelectedSize(data.sizes[0]);
      }
      const relatedRes = await api.get("/products", { params: { category: data.category } });
      setRelated(relatedRes.data.filter((p) => p._id !== data._id).slice(0, 4));
    };
    load();
  }, [id]);

  const imageCount = useMemo(() => product?.images?.length || 0, [product]);

  const prevImage = () => {
    if (!imageCount) return;
    setActiveImage((prev) => (prev - 1 + imageCount) % imageCount);
  };

  const nextImage = () => {
    if (!imageCount) return;
    setActiveImage((prev) => (prev + 1) % imageCount);
  };

  const onTouchEnd = (clientX) => {
    const delta = clientX - touchStartX;
    if (Math.abs(delta) < 40) return;
    if (delta < 0) nextImage();
    else prevImage();
  };

  if (!product) {
    return <div className="mx-auto max-w-6xl px-4 py-16 md:px-8">Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <div
            className="relative overflow-hidden rounded-2xl border border-roseGold/20"
            onTouchStart={(e) => setTouchStartX(e.changedTouches[0].clientX)}
            onTouchEnd={(e) => onTouchEnd(e.changedTouches[0].clientX)}
          >
            <img
              src={product.images[activeImage]}
              alt={product.name}
              className="h-[420px] w-full object-cover"
            />
            {imageCount > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-softBlack/70 px-3 py-1 text-cream"
                >
                  ‹
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-softBlack/70 px-3 py-1 text-cream"
                >
                  ›
                </button>
              </>
            )}
          </div>
          <div className="flex gap-3">
            {product.images.map((img, idx) => (
              <img
                key={img}
                src={img}
                alt={`${product.name} ${idx + 1}`}
                onClick={() => setActiveImage(idx)}
                className={`h-20 w-20 cursor-pointer rounded-lg object-cover ${
                  idx === activeImage ? "ring-2 ring-roseGold" : ""
                }`}
              />
            ))}
          </div>
        </div>

        <div>
          <h1 className="font-heading text-5xl text-roseGold">{product.name}</h1>
          <p className="mt-4 text-2xl text-softBlack">INR {product.price}</p>
          <p className="mt-4 leading-relaxed text-softBlack/80">{product.description}</p>
          <p className="mt-4 text-sm">
            <span className="font-semibold">Material:</span> {product.material}
          </p>
          <p className="mt-1 text-sm">
            <span className="font-semibold">In stock:</span> {product.stock}
          </p>

          {product.sizes?.length > 0 && (
            <div className="mt-5">
              <p className="mb-2 text-sm font-semibold">Size</p>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-full border px-4 py-2 text-sm ${
                      selectedSize === size
                        ? "border-roseGold bg-roseGold text-cream"
                        : "border-roseGold/30 bg-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex gap-3">
            <button
              onClick={() => addToCart(product, selectedSize)}
              className="rounded-full border border-champagne bg-softBlack px-6 py-3 text-cream transition hover:bg-roseGold"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                addToCart(product, selectedSize);
                navigate("/checkout");
              }}
              className="rounded-full border border-roseGold bg-roseGold px-6 py-3 text-cream transition hover:bg-softBlack"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <section className="mt-14">
        <h2 className="mb-6 font-heading text-4xl text-roseGold">Related Products</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default ProductDetailPage;
