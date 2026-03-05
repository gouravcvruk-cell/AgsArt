import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, setAuthToken } from "../api";

function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/auth/admin/login", { email, password });
      localStorage.setItem("auraart_admin_token", data.token);
      setAuthToken(data.token);
      navigate("/admin");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-14 md:px-8">
      <h1 className="font-heading text-5xl text-roseGold">Admin Login</h1>
      <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-2xl border border-roseGold/20 bg-white p-6">
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Admin Email"
          className="w-full rounded-lg border border-roseGold/30 px-3 py-3"
        />
        <input
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full rounded-lg border border-roseGold/30 px-3 py-3"
        />
        <button
          disabled={loading}
          className="w-full rounded-full border border-champagne bg-softBlack px-4 py-3 text-cream transition hover:bg-roseGold"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}

export default AdminLoginPage;
