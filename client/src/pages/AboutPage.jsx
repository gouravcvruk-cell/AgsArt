function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <h1 className="font-heading text-5xl text-roseGold">The Artist Story</h1>
      <p className="mt-5 max-w-3xl leading-relaxed text-softBlack/80">
        AuraArt started as a passion project to transform resin pours and jewellery casting into
        wearable storytelling. Every design is made in small batches and finished by hand for a
        boutique-quality result.
      </p>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        {[
          "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=700&q=80",
          "https://images.unsplash.com/photo-1459908676235-d5f02a50184b?auto=format&fit=crop&w=700&q=80",
          "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=700&q=80"
        ].map((image) => (
          <img key={image} src={image} alt="AuraArt process" className="h-72 w-full rounded-2xl object-cover" />
        ))}
      </section>
    </div>
  );
}

export default AboutPage;
