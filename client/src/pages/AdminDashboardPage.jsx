import { useEffect, useState } from "react";
import { api, setAuthToken } from "../api";

const initialForm = {
  name: "",
  description: "",
  price: "",
  category: "resin-art",
  material: "",
  stock: "",
  sizes: ""
};

function AdminDashboardPage() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [images, setImages] = useState([]);
  const [editingId, setEditingId] = useState("");

  const loadAll = async () => {
    const [productsRes, ordersRes] = await Promise.all([api.get("/products"), api.get("/orders")]);
    setProducts(productsRes.data);
    setOrders(ordersRes.data);
  };

  useEffect(() => {
    const token = localStorage.getItem("auraart_admin_token");
    if (token) {
      setAuthToken(token);
      loadAll();
    }
  }, []);

  const onChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const uploadImages = async () => {
    const urls = [];
    for (const file of images) {
      const data = new FormData();
      data.append("image", file);
      const res = await api.post("/upload/image", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      urls.push(res.data.url);
    }
    return urls;
  };

  const onSave = async (e) => {
    e.preventDefault();
    try {
      const uploadedImages = images.length ? await uploadImages() : [];
      const payload = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock || 0),
        sizes: form.sizes
          ? form.sizes
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : [],
        images: uploadedImages.length
          ? uploadedImages
          : editingId
            ? products.find((p) => p._id === editingId)?.images || []
            : []
      };

      if (!payload.images.length) {
        alert("Please upload at least one image");
        return;
      }

      if (editingId) {
        await api.put(`/products/${editingId}`, payload);
      } else {
        await api.post("/products", payload);
      }

      setForm(initialForm);
      setImages([]);
      setEditingId("");
      await loadAll();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to save product");
    }
  };

  const onEdit = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name,
      description: product.description,
      price: String(product.price),
      category: product.category,
      material: product.material,
      stock: String(product.stock),
      sizes: (product.sizes || []).join(", ")
    });
    setImages([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await api.delete(`/products/${id}`);
    await loadAll();
  };

  const onLogout = () => {
    localStorage.removeItem("auraart_admin_token");
    setAuthToken(null);
    window.location.href = "/admin/login";
  };

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 md:px-8">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-5xl text-roseGold">Admin Panel</h1>
        <button onClick={onLogout} className="rounded-full border px-5 py-2 text-sm">
          Logout
        </button>
      </div>

      <section className="rounded-2xl border border-roseGold/20 bg-white p-6">
        <h2 className="font-heading text-3xl">{editingId ? "Edit Product" : "Add Product"}</h2>
        <form onSubmit={onSave} className="mt-5 grid gap-3 md:grid-cols-2">
          <input
            required
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Product Name"
            className="rounded-lg border border-roseGold/30 px-3 py-2"
          />
          <input
            required
            type="number"
            name="price"
            value={form.price}
            onChange={onChange}
            placeholder="Price"
            className="rounded-lg border border-roseGold/30 px-3 py-2"
          />
          <select
            name="category"
            value={form.category}
            onChange={onChange}
            className="rounded-lg border border-roseGold/30 px-3 py-2"
          >
            <option value="resin-art">Resin Art</option>
            <option value="resin-jewellery">Resin Jewellery</option>
            <option value="artificial-gold">Artificial Gold Jewellery</option>
          </select>
          <input
            name="material"
            value={form.material}
            onChange={onChange}
            placeholder="Material"
            className="rounded-lg border border-roseGold/30 px-3 py-2"
          />
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={onChange}
            placeholder="Stock"
            className="rounded-lg border border-roseGold/30 px-3 py-2"
          />
          <input
            name="sizes"
            value={form.sizes}
            onChange={onChange}
            placeholder="Sizes (comma separated)"
            className="rounded-lg border border-roseGold/30 px-3 py-2"
          />
          <textarea
            required
            name="description"
            value={form.description}
            onChange={onChange}
            placeholder="Description"
            rows="3"
            className="md:col-span-2 rounded-lg border border-roseGold/30 px-3 py-2"
          />
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImages(Array.from(e.target.files || []))}
            className="md:col-span-2"
          />
          <button className="rounded-full border border-champagne bg-softBlack px-5 py-3 text-cream transition hover:bg-roseGold md:col-span-2">
            {editingId ? "Update Product" : "Create Product"}
          </button>
        </form>
      </section>

      <section className="rounded-2xl border border-roseGold/20 bg-white p-6">
        <h2 className="font-heading text-3xl">Products</h2>
        <div className="mt-4 space-y-3">
          {products.map((product) => (
            <article
              key={product._id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-roseGold/20 p-3"
            >
              <div className="flex items-center gap-3">
                <img src={product.images[0]} alt={product.name} className="h-16 w-16 rounded-lg object-cover" />
                <div>
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-sm text-softBlack/70">
                    {product.category} | INR {product.price}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => onEdit(product)} className="rounded border px-3 py-1 text-sm">
                  Edit
                </button>
                <button
                  onClick={() => onDelete(product._id)}
                  className="rounded border border-red-600 px-3 py-1 text-sm text-red-600"
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-roseGold/20 bg-white p-6">
        <h2 className="font-heading text-3xl">Orders</h2>
        <div className="mt-4 space-y-3">
          {orders.map((order) => (
            <article key={order._id} className="rounded-xl border border-roseGold/20 p-4">
              <p className="text-sm">
                <span className="font-semibold">Order ID:</span> {order._id}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Customer:</span> {order.customerName} ({order.phone})
              </p>
              <p className="text-sm">
                <span className="font-semibold">Amount:</span> INR {order.totalAmount}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Status:</span> {order.status}
              </p>
            </article>
          ))}
          {!orders.length && <p className="text-sm text-softBlack/70">No orders yet.</p>}
        </div>
      </section>
    </div>
  );
}

export default AdminDashboardPage;
