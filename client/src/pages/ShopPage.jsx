import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../api";
import ProductCard from "../components/ProductCard";

function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  useEffect(() => {
    const fetchProducts = async () => {
      const params = {};
      if (category) params.category = category;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;

      setSearchParams(params);
      const { data } = await api.get("/products", { params });
      setProducts(data);
    };
    fetchProducts();
  }, [category, minPrice, maxPrice, setSearchParams]);

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[260px_1fr] md:px-8">
      <aside className="h-fit rounded-2xl border border-roseGold/20 bg-white p-5">
        <h2 className="font-heading text-3xl text-roseGold">Filters</h2>
        <div className="mt-5 space-y-2">
          <label className="text-sm">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border border-roseGold/30 px-3 py-2"
          >
            <option value="">All</option>
            <option value="resin-art">Resin Art</option>
            <option value="resin-jewellery">Resin Jewellery</option>
            <option value="artificial-gold">Artificial Gold Jewellery</option>
          </select>
        </div>
        <div className="mt-4 space-y-2">
          <label className="text-sm">Min Price (INR)</label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full rounded-lg border border-roseGold/30 px-3 py-2"
          />
        </div>
        <div className="mt-4 space-y-2">
          <label className="text-sm">Max Price (INR)</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full rounded-lg border border-roseGold/30 px-3 py-2"
          />
        </div>
      </aside>

      <section>
        <h1 className="font-heading text-4xl text-roseGold">Shop AuraArt</h1>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        {!products.length && <p className="mt-8 text-softBlack/70">No products found for this filter.</p>}
      </section>
    </div>
  );
}

export default ShopPage;
