import { useParams, useNavigate } from "react-router-dom";
import {
  ShoppingCart, Star, CheckCircle, Shield, Truck,
  Clock, Award, Phone, ArrowRight, MessageCircle, Users,
  Gift, XCircle, Stethoscope, BadgeCheck, HeartPulse,
  Sparkles, Package, ChevronDown, ChevronUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { products, testimonials } from "@/data/products";
import { toast } from "sonner";
import { useState } from "react";

const ProductLanding = () => {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const product = products.find((p) => p.slug === slug);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

  const problemPoints = product.problem.split("?").filter(Boolean).map(s => s.trim() + "?");
  
  const expertOpinion = {
    name: "ডা. মোহাম্মদ আবদুল্লাহ",
    title: "হোমিওপ্যাথিক বিশেষজ্ঞ, DHMS, ২০+ বছরের অভিজ্ঞতা",
    quote: `"${product.name} হোমিওপ্যাথিতে একটি অত্যন্ত কার্যকর ঔষধ। আমি আমার প্র্যাকটিসে দীর্ঘদিন ধরে এটি ব্যবহার করছি এবং রোগীরা চমৎকার ফলাফল পাচ্ছেন। সঠিক নিয়মে ব্যবহার করলে এটি নিশ্চিতভাবে উপকার দেবে।"`
  };

  const faqs = [
    { q: "এই ঔষধ কি নিরাপদ?", a: "হ্যাঁ, সম্পূর্ণ প্রাকৃতিক ও পার্শ্বপ্রতিক্রিয়ামুক্ত হোমিওপ্যাথিক ঔষধ।" },
    { q: "কত দিনে ফলাফল পাবো?", a: "সাধারণত ২-৪ সপ্তাহের মধ্যে উন্নতি দেখা যায়। সম্পূর্ণ ফলাফলের জন্য ২-৩ মাস ব্যবহার করুন।" },
    { q: "ডেলিভারি কিভাবে হবে?", a: "সারাদেশে কুরিয়ারে ২-৫ কর্মদিবসে পৌঁছে যাবে। Cash on Delivery — আগে পণ্য দেখুন, তারপর পেমেন্ট করুন।" },
    { q: "অন্য ঔষধের সাথে খাওয়া যাবে?", a: "হোমিওপ্যাথিক ঔষধ অন্য ঔষধের সাথে নিরাপদে খাওয়া যায়। তবে ডাক্তারের পরামর্শ নিন।" },
    { q: "ডাক্তারের পরামর্শ কি ফ্রি?", a: "হ্যাঁ! অর্ডার করলে বিশেষজ্ঞ ডাক্তারের ফ্রি পরামর্শ পাবেন।" },
  ];

  const benefitIcons = [HeartPulse, Shield, Sparkles, BadgeCheck];

  return (
    <div className="min-h-screen bg-background font-bengali">
      {/* ═══ STICKY TOP BAR ═══ */}
      <div className="sticky top-0 z-50 gradient-primary py-2.5 text-center shadow-md">
        <p className="text-xs font-semibold text-primary-foreground tracking-wide">
          🔥 সীমিত সময়ের অফার — {discount > 0 ? `${discount}% ছাড়ে` : "বিশেষ মূল্যে"} পান! &nbsp;💵 Cash on Delivery
        </p>
      </div>

      {/* ═══ HERO: PROBLEM HEADLINE + IMAGE + PRICE + CTA ═══ */}
      <section className="relative overflow-hidden pb-0 pt-8">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container relative max-w-lg mx-auto text-center px-5">
          {/* Category pill */}
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
            <Stethoscope className="h-3.5 w-3.5" /> হোমিওপ্যাথিক সমাধান
          </span>

          {/* Headline */}
          <h1 className="mt-4 text-2xl font-extrabold leading-snug text-foreground sm:text-3xl">
            {product.problem.split("?")[0]}?
          </h1>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            প্রাকৃতিক সমাধান আপনার হাতের কাছে
          </p>

          {/* Product Image */}
          <div className="relative mt-6 inline-block">
            <div className="relative mx-auto w-52 h-52 sm:w-60 sm:h-60">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full rounded-3xl object-cover shadow-xl ring-2 ring-primary/10"
                loading="eager"
              />
              {discount > 0 && (
                <div className="absolute -right-2 -top-2 flex h-14 w-14 items-center justify-center rounded-full gradient-offer shadow-lg">
                  <span className="text-center text-[11px] font-extrabold leading-tight text-offer-foreground">
                    {discount}%<br />ছাড়
                  </span>
                </div>
              )}
            </div>
            {/* Product name below image */}
            <h2 className="mt-3 text-lg font-bold text-foreground">{product.name}</h2>
            <p className="text-xs text-muted-foreground">{product.nameEn}</p>
          </div>

          {/* Rating */}
          <div className="mt-3 flex items-center justify-center gap-1.5">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-gold text-gold" : "text-border"}`} />
              ))}
            </div>
            <span className="text-xs font-medium text-muted-foreground">
              ({product.reviews}+ সন্তুষ্ট গ্রাহক)
            </span>
          </div>

          {/* Viewers count */}
          <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <Users className="h-3.5 w-3.5 text-primary" />
            <span className="font-semibold text-foreground">{viewers} জন</span> এখন দেখছেন
          </div>

          {/* Price */}
          <div className="mt-5 flex items-baseline justify-center gap-2">
            <span className="text-4xl font-extrabold text-primary">৳{product.price}</span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">৳{product.originalPrice}</span>
            )}
          </div>
          {discount > 0 && (
            <p className="mt-1 text-xs font-semibold text-offer">
              আপনি সাশ্রয় করছেন ৳{product.originalPrice! - product.price}!
            </p>
          )}

          {/* CTA */}
          <Button
            size="lg"
            className="mt-4 h-14 w-full gap-2.5 gradient-primary text-base font-extrabold text-primary-foreground shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
            onClick={handleOrder}
          >
            <ShoppingCart className="h-5 w-5" /> এখনই অর্ডার করুন
          </Button>
          <p className="mt-2.5 flex items-center justify-center gap-3 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1"><Truck className="h-3 w-3" /> ফ্রি ডেলিভারি</span>
            <span className="flex items-center gap-1"><Shield className="h-3 w-3" /> ১০০% আসল</span>
            <span>💵 Cash on Delivery</span>
          </p>
        </div>
      </section>

      {/* ═══ PROBLEM SECTION ═══ */}
      <section className="mt-10 py-8">
        <div className="container max-w-lg mx-auto px-5">
          <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-5">
            <h3 className="flex items-center gap-2 text-sm font-extrabold text-destructive">
              😟 আপনি কি এই সমস্যায় ভুগছেন?
            </h3>
            <div className="mt-4 space-y-3">
              {problemPoints.map((point, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                  <p className="text-sm text-foreground leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SOLUTION SECTION ═══ */}
      <section className="py-8">
        <div className="container max-w-lg mx-auto px-5">
          <div className="rounded-2xl gradient-primary p-6 text-primary-foreground shadow-lg">
            <h3 className="flex items-center gap-2 text-base font-extrabold">
              ✅ {product.name} — আপনার সমাধান
            </h3>
            <p className="mt-3 text-sm leading-relaxed opacity-90">{product.solution}</p>
            <div className="mt-4 rounded-xl bg-primary-foreground/10 p-3">
              <p className="text-xs leading-relaxed">
                <Clock className="mr-1 inline h-3.5 w-3.5" />
                <span className="font-bold">ব্যবহারের নিয়ম:</span> {product.usage}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TRUST BAR ═══ */}
      <section className="border-y border-border bg-secondary py-5">
        <div className="container max-w-lg mx-auto grid grid-cols-3 gap-3 px-5 text-center">
          {[
            { icon: Shield, label: "১০০% আসল" },
            { icon: Truck, label: "দ্রুত ডেলিভারি" },
            { icon: BadgeCheck, label: "মানি ব্যাক" },
          ].map((b) => (
            <div key={b.label} className="flex flex-col items-center gap-1.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                <b.icon className="h-4.5 w-4.5 text-primary" />
              </div>
              <p className="text-[11px] font-semibold text-foreground">{b.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ BENEFITS ═══ */}
      <section className="py-10">
        <div className="container max-w-lg mx-auto px-5">
          <h2 className="text-center text-xl font-extrabold text-foreground">
            🌿 কি কি উপকার পাবেন?
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {product.benefits.map((b, i) => {
              const Icon = benefitIcons[i % benefitIcons.length];
              return (
                <div key={i} className="rounded-2xl border border-border bg-card p-4 text-center shadow-sm transition-shadow hover:shadow-card">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <p className="mt-2.5 text-xs font-semibold leading-snug text-foreground">{b}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ EXPERT OPINION ═══ */}
      <section className="bg-secondary py-10">
        <div className="container max-w-lg mx-auto px-5">
          <h2 className="text-center text-xl font-extrabold text-foreground">
            🩺 বিশেষজ্ঞ ডাক্তারের মতামত
          </h2>
          <div className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full gradient-primary text-lg font-bold text-primary-foreground">
                ড
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">{expertOpinion.name}</p>
                <p className="text-[11px] text-muted-foreground">{expertOpinion.title}</p>
              </div>
            </div>
            <p className="mt-4 text-sm italic leading-relaxed text-foreground">{expertOpinion.quote}</p>
          </div>
        </div>
      </section>

      {/* ═══ CUSTOMER REVIEWS ═══ */}
      <section className="py-10">
        <div className="container max-w-lg mx-auto px-5">
          <h2 className="text-center text-xl font-extrabold text-foreground">
            ⭐ গ্রাহকদের বাস্তব অভিজ্ঞতা
          </h2>
          <div className="mt-2 flex items-center justify-center gap-1.5">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold text-gold" />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">{product.reviews}+ রিভিউ</span>
          </div>

          <div className="mt-6 space-y-3">
            {displayTestimonials.map((t) => (
              <div key={t.id} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {t.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-foreground">{t.name}</p>
                    <p className="text-[10px] text-muted-foreground">📍 {t.location}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-gold text-gold" />
                    ))}
                  </div>
                </div>
                <p className="mt-2.5 text-xs italic leading-relaxed text-foreground">"{t.text}"</p>
                {t.product && (
                  <span className="mt-2 inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold text-primary">
                    {t.product}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA BLOCK (Red/Offer themed) ═══ */}
      <section className="py-10">
        <div className="container max-w-lg mx-auto px-5">
          <div className="rounded-3xl gradient-offer p-6 text-center text-offer-foreground shadow-xl">
            <p className="text-xs font-bold uppercase tracking-widest opacity-80">সীমিত সময়ের অফার</p>
            {discount > 0 && (
              <p className="mt-2 text-4xl font-extrabold">{discount}% ছাড়!</p>
            )}
            <div className="mt-3 flex items-baseline justify-center gap-2">
              <span className="text-3xl font-extrabold">৳{product.price}</span>
              {product.originalPrice && (
                <span className="text-lg opacity-60 line-through">৳{product.originalPrice}</span>
              )}
            </div>
            <div className="mt-3 flex items-center justify-center gap-3 text-[11px] opacity-80">
              <span>✅ ফ্রি ডেলিভারি</span>
              <span>✅ ফ্রি পরামর্শ</span>
              <span>✅ ১০০% আসল</span>
            </div>
            <Button
              size="lg"
              className="mt-5 h-14 w-full gap-2.5 bg-primary-foreground text-base font-extrabold text-offer shadow-lg transition-all hover:bg-primary-foreground/90 active:scale-[0.98]"
              onClick={handleOrder}
            >
              <ShoppingCart className="h-5 w-5" /> এখনই অর্ডার করুন <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="bg-secondary py-10">
        <div className="container max-w-lg mx-auto px-5">
          <h2 className="text-center text-xl font-extrabold text-foreground">
            ❓ সচরাচর জিজ্ঞাসা
          </h2>
          <div className="mt-6 space-y-2.5">
            {faqs.map((f, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-card overflow-hidden shadow-sm"
              >
                <button
                  className="flex w-full items-center justify-between p-4 text-left text-sm font-semibold text-foreground"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {f.q}
                  {openFaq === i ? (
                    <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="border-t border-border px-4 pb-4 pt-3">
                    <p className="text-xs leading-relaxed text-muted-foreground">{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GUARANTEE ═══ */}
      <section className="py-10">
        <div className="container max-w-lg mx-auto px-5">
          <div className="rounded-2xl border-2 border-primary/20 bg-primary/5 p-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <Shield className="h-7 w-7 text-primary" />
            </div>
            <h3 className="mt-3 text-lg font-extrabold text-foreground">১০০% সন্তুষ্টি গ্যারান্টি</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              আমরা নিশ্চিত করি প্রতিটি ঔষধ ১০০% আসল ও কার্যকর। সন্তুষ্ট না হলে টাকা ফেরত পাবেন। আপনার বিশ্বাসই আমাদের সম্পদ।
            </p>
          </div>
        </div>
      </section>

      {/* ═══ MINI FOOTER ═══ */}
      <footer className="border-t border-border bg-card py-6 text-center">
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} HomeoCare — বিশ্বস্ত হোমিওপ্যাথিক চিকিৎসা</p>
        <div className="mt-2 flex justify-center gap-4 text-xs">
          <a href="/privacy" className="text-muted-foreground hover:text-primary">প্রাইভেসি পলিসি</a>
          <a href="/terms" className="text-muted-foreground hover:text-primary">শর্তাবলী</a>
          <a href="/return-policy" className="text-muted-foreground hover:text-primary">রিটার্ন পলিসি</a>
        </div>
      </footer>

      {/* ═══ FLOATING WHATSAPP ═══ */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-primary-foreground shadow-lg transition-transform hover:scale-110 md:bottom-6 md:right-6 md:h-14 md:w-14"
        aria-label="WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>

      {/* ═══ STICKY BOTTOM CTA (Mobile) ═══ */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] md:hidden">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-primary">৳{product.price}</span>
              {product.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">৳{product.originalPrice}</span>
              )}
            </div>
            <p className="text-[10px] text-muted-foreground">💵 Cash on Delivery</p>
          </div>
          <Button
            className="h-11 flex-1 gap-1.5 gradient-primary text-sm font-extrabold text-primary-foreground"
            onClick={handleOrder}
          >
            <ShoppingCart className="h-4 w-4" /> অর্ডার করুন
          </Button>
        </div>
      </div>

      {/* Bottom spacing for sticky bar */}
      <div className="h-16 md:hidden" />
    </div>
  );
};

export default ProductLanding;
