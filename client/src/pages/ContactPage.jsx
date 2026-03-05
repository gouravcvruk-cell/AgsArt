import { useState } from "react";

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:px-8">
      <h1 className="font-heading text-5xl text-roseGold">Contact AuraArt</h1>
      <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-2xl border border-roseGold/20 bg-white p-6">
        <input
          name="name"
          required
          value={form.name}
          onChange={onChange}
          placeholder="Name"
          className="w-full rounded-lg border border-roseGold/30 px-3 py-3"
        />
        <input
          name="email"
          type="email"
          required
          value={form.email}
          onChange={onChange}
          placeholder="Email"
          className="w-full rounded-lg border border-roseGold/30 px-3 py-3"
        />
        <textarea
          name="message"
          required
          value={form.message}
          onChange={onChange}
          placeholder="Message"
          rows="5"
          className="w-full rounded-lg border border-roseGold/30 px-3 py-3"
        />
        <div className="flex flex-wrap gap-3">
          <button className="rounded-full border border-champagne bg-softBlack px-6 py-3 text-cream transition hover:bg-roseGold">
            Send Message
          </button>
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-green-600 bg-green-600 px-6 py-3 text-white"
          >
            Chat on WhatsApp
          </a>
        </div>
        {submitted && <p className="text-sm text-roseGold">Thanks, we will get back to you shortly.</p>}
      </form>
    </div>
  );
}

export default ContactPage;
