import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import ProductCard from "../components/ProductCard";

const categories = [
  {
    title: "Resin Art",
    slug: "resin-art",
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Resin Jewellery",
    slug: "resin-jewellery",
    image:
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Artificial Gold Jewellery",
    slug: "artificial-gold",
    image:
      "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?auto=format&fit=crop&w=900&q=80"
  }
];

function HomePage() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get("/products");
      setFeatured(data.slice(0, 4));
    };
    load();
  }, []);

  return (
    <div>
      <section
        className="hero-parallax flex min-h-[88vh] items-center bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(26,26,26,0.35), rgba(26,26,26,0.55)), url('https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=1600&q=80')"
        }}
      >
        <div className="mx-auto max-w-6xl px-4 text-cream md:px-8">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-champagne">AuraArt Studio</p>
          <h1 className="font-heading text-5xl leading-tight md:text-7xl">
            Wear the Art, Feel the Magic
          </h1>
          <p className="mt-5 max-w-xl text-sm text-cream/90 md:text-base">
            Handmade resin art and jewellery designed for women who love delicate luxury and
            statement elegance.
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-block rounded-full border border-champagne bg-champagne px-8 py-3 text-sm font-semibold text-softBlack transition hover:bg-transparent hover:text-champagne"
          >
            Explore Collection
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 md:px-8">
        <h2 className="mb-8 font-heading text-4xl text-roseGold">Featured Categories</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/shop?category=${cat.slug}`}
              className="fade-in overflow-hidden rounded-2xl border border-roseGold/20 bg-white"
            >
              <img src={cat.image} alt={cat.title} className="h-64 w-full object-cover" />
              <div className="p-4">
                <h3 className="font-heading text-2xl">{cat.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 md:px-8">
        <h2 className="mb-8 font-heading text-4xl text-roseGold">Featured Products</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 md:px-8">
        <h2 className="mb-8 font-heading text-4xl text-roseGold">Studio Gallery</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?auto=format&fit=crop&w=600&q=80"
          ].map((image) => (
            <img
              key={image}
              src={image}
              alt="AuraArt creation"
              className="h-52 w-full rounded-xl object-cover"
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 pt-6 md:px-8">
        <div className="rounded-2xl border border-roseGold/30 bg-white p-8">
          <h2 className="font-heading text-4xl text-roseGold">About AuraArt</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-softBlack/85">
            We pour, cure, polish, and package each piece in our studio with handcrafted precision.
            Every order is made to carry the beauty of wearable art into your everyday style.
          </p>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
