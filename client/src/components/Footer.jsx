function Footer() {
  return (
    <footer className="mt-16 border-t border-roseGold/20 bg-softBlack text-cream">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-8">
        <h3 className="font-heading text-3xl text-champagne">AuraArt</h3>
        <p className="mt-2 max-w-xl text-sm text-cream/80">
          Handmade resin art and jewellery pieces curated with artistry, elegance, and timeless
          feminine charm.
        </p>
        <p className="mt-4 text-xs text-cream/60">© {new Date().getFullYear()} AuraArt Studio</p>
      </div>
    </footer>
  );
}

export default Footer;
