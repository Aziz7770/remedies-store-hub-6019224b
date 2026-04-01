import { useParams, useNavigate } from "react-router-dom";
import {
  ShoppingCart, Star, CheckCircle, CreditCard, Shield, Truck,
  Clock, Award, Phone, ArrowRight, MessageCircle, Users, Flame, Gift
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { products, testimonials } from "@/data/products";
import { toast } from "sonner";
import { useState, useEffect } from "react";

const ProductLanding = () => {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const product = products.find((p) => p.slug === slug);

  // Fake urgency counter
  const [viewers] = useState(Math.floor(Math.random() * 30) + 15);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">পেজটি পাওয়া যায়নি</p>
          <Button className="mt-4" onClick={() => navigate("/products")}>সকল ঔষধ দেখুন</Button>
        </div>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleOrder = () => {
    addToCart(product);
    toast.success("অর্ডার প্রস্তুত! আপনার তথ্য দিন।");
    navigate("/checkout");
  };

  const relatedTestimonials = testimonials.filter(
    (t) => t.product === product.name || t.product === product.nameEn
  );
  const displayTestimonials = relatedTestimonials.length > 0 ? relatedTestimonials : testimonials.slice(0, 3);

  const whatsappNumber = "8801XXXXXXXXX";
  const whatsappMessage = encodeURIComponent(`আমি ${product.name} সম্পর্কে জানতে চাই।`);

  return (
    <div className="min-h-screen bg-background">
      {/* STICKY TOP BAR */}
      <div className="sticky top-0 z-50 border-b border-border bg-primary py-2 text-center">
        <p className="text-xs font-semibold text-primary-foreground">
          🔥 সীমিত সময়ের অফার — {discount > 0 ? `${discount}% ছাড়ে` : "বিশেষ মূল্যে"} পান! 💰 Cash on Delivery
        </p>
      </div>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-10 md:py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        <div className="container relative grid items-center gap-8 md:grid-cols-2">
          {/* Left — Text */}
          <div className="order-2 md:order-1">
            {discount > 0 && (
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-offer px-4 py-1.5 text-sm font-bold text-offer-foreground">
                <Gift className="h-4 w-4" /> {discount}% ছাড় — সীমিত সময়!
              </div>
            )}

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl">
              {product.name}
            </h1>
            <p className="mt-1 text-sm font-medium text-muted-foreground">{product.nameEn}</p>

            {/* Rating */}
            <div className="mt-3 flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-gold text-gold" : "text-border"}`} />
                ))}
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                {product.rating}/5 — {product.reviews}+ সন্তুষ্ট গ্রাহক
              </span>
            </div>

            {/* Problem Box */}
            <div className="mt-6 rounded-2xl border-2 border-destructive/30 bg-destructive/5 p-5">
              <h3 className="flex items-center gap-2 text-sm font-bold text-destructive">
                😟 আপনি কি এই সমস্যায় ভুগছেন?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground">{product.problem}</p>
            </div>

            {/* Solution Box */}
            <div className="mt-4 rounded-2xl border-2 border-primary/30 bg-primary/5 p-5">
              <h3 className="flex items-center gap-2 text-sm font-bold text-primary">
                ✅ সমাধান পেয়ে গেছেন!
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground">{product.solution}</p>
            </div>
          </div>

          {/* Right — Image */}
          <div className="order-1 flex justify-center md:order-2">
            <div className="relative w-full max-w-md">
              <img
                src={product.image}
                alt={product.name}
                className="w-full rounded-3xl shadow-2xl ring-4 ring-primary/10"
                loading="eager"
              />
              {discount > 0 && (
                <div className="absolute -left-3 -top-3 flex h-16 w-16 items-center justify-center rounded-full bg-offer shadow-lg">
                  <span className="text-center text-xs font-extrabold leading-tight text-offer-foreground">
                    {discount}%<br />ছাড়
                  </span>
                </div>
              )}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-card px-5 py-2 shadow-lg ring-1 ring-border">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="font-bold text-foreground">{viewers} জন</span>
                  <span className="text-muted-foreground">এখন দেখছেন</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICE + CTA SECTION */}
      <section className="border-y border-border bg-secondary py-8">
        <div className="container text-center">
          <div className="flex items-baseline justify-center gap-3">
            <span className="text-5xl font-extrabold text-primary">৳{product.price}</span>
            {product.originalPrice && (
              <span className="text-2xl text-muted-foreground line-through">৳{product.originalPrice}</span>
            )}
          </div>
          {discount > 0 && (
            <p className="mt-1 text-sm font-semibold text-offer">আপনি সাশ্রয় করছেন ৳{product.originalPrice! - product.price}!</p>
          )}
          <Button
            size="lg"
            className="mt-5 h-16 w-full max-w-md gap-3 bg-offer text-lg font-extrabold text-offer-foreground shadow-xl transition-all hover:bg-offer/90 hover:shadow-2xl hover:scale-[1.02]"
            onClick={handleOrder}
          >
            <CreditCard className="h-6 w-6" /> এখনই অর্ডার করুন
          </Button>
          <p className="mt-3 flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Truck className="h-3.5 w-3.5" /> ফ্রি ডেলিভারি</span>
            <span className="flex items-center gap-1"><Shield className="h-3.5 w-3.5" /> ১০০% আসল</span>
            <span>💵 Cash on Delivery</span>
          </p>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-12">
        <div className="container">
          <h2 className="text-center text-2xl font-extrabold text-foreground md:text-3xl">
            {product.name} এর উপকারিতা
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-sm text-muted-foreground">
            কেন হাজার হাজার গ্রাহক এই ঔষধটি বেছে নিচ্ছেন
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {product.benefits.map((b, i) => (
              <div key={i} className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-md">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW TO USE */}
      <section className="bg-secondary py-12">
        <div className="container max-w-2xl">
          <h2 className="text-center text-2xl font-extrabold text-foreground">ব্যবহারের নিয়ম</h2>
          <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground leading-relaxed">{product.usage}</p>
                <p className="mt-3 text-xs text-muted-foreground">📋 উপাদান: {product.ingredients}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS / SOCIAL PROOF */}
      <section className="py-12">
        <div className="container">
          <h2 className="text-center text-2xl font-extrabold text-foreground">
            গ্রাহকদের বাস্তব অভিজ্ঞতা
          </h2>
          <div className="mt-2 flex items-center justify-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-gold text-gold" />
              ))}
            </div>
            <span className="text-sm font-medium text-muted-foreground">{product.reviews}+ রিভিউ</span>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {displayTestimonials.map((t) => (
              <div key={t.id} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="mt-3 text-sm italic leading-relaxed text-foreground">"{t.text}"</p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">{t.name}</p>
                    <p className="text-[10px] text-muted-foreground">📍 {t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="bg-secondary py-10">
        <div className="container grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { icon: Shield, title: "১০০% আসল ঔষধ", sub: "নকল হলে টাকা ফেরত" },
            { icon: Truck, title: "সারাদেশে ডেলিভারি", sub: "২-৫ কর্মদিবসে" },
            { icon: Award, title: "বিশেষজ্ঞ পরামর্শ", sub: "ফ্রি ডাক্তার কনসাল্টেশন" },
            { icon: MessageCircle, title: "২৪/৭ সাপোর্ট", sub: "WhatsApp / কল" },
          ].map((b) => (
            <div key={b.title} className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <b.icon className="h-7 w-7 text-primary" />
              </div>
              <p className="mt-3 text-sm font-bold text-foreground">{b.title}</p>
              <p className="text-xs text-muted-foreground">{b.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12">
        <div className="container max-w-2xl">
          <h2 className="text-center text-2xl font-extrabold text-foreground">সচরাচর জিজ্ঞাসা</h2>
          <div className="mt-6 space-y-3">
            {[
              { q: "এই ঔষধ কি নিরাপদ?", a: "হ্যাঁ, সম্পূর্ণ প্রাকৃতিক ও পার্শ্বপ্রতিক্রিয়ামুক্ত হোমিওপ্যাথিক ঔষধ।" },
              { q: "কত দিনে ফলাফল পাবো?", a: "সাধারণত ২-৪ সপ্তাহের মধ্যে উন্নতি দেখা যায়। তবে সম্পূর্ণ ফলাফলের জন্য ২-৩ মাস ব্যবহার করুন।" },
              { q: "ডেলিভারি কিভাবে হবে?", a: "সারাদেশে কুরিয়ারে ২-৫ কর্মদিবসে পৌঁছে যাবে। Cash on Delivery — আগে পণ্য দেখুন, তারপর পেমেন্ট করুন।" },
              { q: "ডাক্তারের পরামর্শ কি ফ্রি?", a: "হ্যাঁ! অর্ডার করলে বিশেষজ্ঞ ডাক্তারের ফ্রি পরামর্শ পাবেন।" },
            ].map((f, i) => (
              <details key={i} className="group rounded-2xl border border-border bg-card">
                <summary className="cursor-pointer p-4 text-sm font-semibold text-foreground">
                  {f.q}
                </summary>
                <p className="px-4 pb-4 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-gradient-to-br from-primary to-primary/80 py-14">
        <div className="container text-center">
          <Flame className="mx-auto h-10 w-10 text-offer animate-pulse" />
          <h2 className="mt-4 text-3xl font-extrabold text-primary-foreground md:text-4xl">
            আর দেরি নয়!<br />এখনই অর্ডার করুন
          </h2>
          <div className="mt-4 flex items-baseline justify-center gap-3">
            <span className="text-5xl font-extrabold text-primary-foreground">৳{product.price}</span>
            {product.originalPrice && (
              <span className="text-2xl text-primary-foreground/50 line-through">৳{product.originalPrice}</span>
            )}
          </div>

          <Button
            size="lg"
            className="mt-6 h-16 w-full max-w-md gap-3 bg-offer text-lg font-extrabold text-offer-foreground shadow-2xl transition-all hover:bg-offer/90 hover:scale-[1.02]"
            onClick={handleOrder}
          >
            <ShoppingCart className="h-6 w-6" /> এখনই অর্ডার করুন <ArrowRight className="h-5 w-5" />
          </Button>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-primary-foreground/80">
            <span>💵 Cash on Delivery</span>
            <span>🚚 সারাদেশে ডেলিভারি</span>
            <span>🔒 ১০০% নিরাপদ</span>
          </div>

          <div className="mt-6">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105"
            >
              <MessageCircle className="h-5 w-5" /> WhatsApp এ জিজ্ঞাসা করুন
            </a>
          </div>
        </div>
      </section>

      {/* MINI FOOTER */}
      <footer className="border-t border-border bg-card py-6 text-center text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} HomeoCare — বিশ্বস্ত হোমিওপ্যাথিক চিকিৎসা</p>
        <div className="mt-2 flex justify-center gap-4">
          <a href="/privacy" className="hover:text-primary">প্রাইভেসি পলিসি</a>
          <a href="/terms" className="hover:text-primary">শর্তাবলী</a>
          <a href="/return-policy" className="hover:text-primary">রিটার্ন পলিসি</a>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
        aria-label="WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
      </a>

      {/* STICKY BOTTOM CTA (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] md:hidden">
        <div className="flex items-center gap-3">
          <div>
            <span className="text-xl font-extrabold text-primary">৳{product.price}</span>
            {product.originalPrice && (
              <span className="ml-1 text-sm text-muted-foreground line-through">৳{product.originalPrice}</span>
            )}
          </div>
          <Button
            className="flex-1 gap-2 bg-offer font-bold text-offer-foreground hover:bg-offer/90"
            onClick={handleOrder}
          >
            <CreditCard className="h-4 w-4" /> এখনই অর্ডার করুন
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductLanding;
