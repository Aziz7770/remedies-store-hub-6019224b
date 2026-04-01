import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, Star, CheckCircle, CreditCard, Shield, Truck, Clock, Award, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { products, testimonials } from "@/data/products";
import { toast } from "sonner";

const ProductLanding = () => {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
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
    navigate("/checkout");
  };

  const relatedTestimonials = testimonials.filter(
    (t) => t.product === product.name || t.product === product.nameEn
  );
  const displayTestimonials = relatedTestimonials.length > 0 ? relatedTestimonials : testimonials.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* HERO — Problem + Solution */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/5 py-12 md:py-20">
        <div className="container grid items-center gap-8 md:grid-cols-2">
          <div>
            {discount > 0 && (
              <span className="mb-4 inline-block rounded-full bg-offer px-4 py-1.5 text-sm font-bold text-offer-foreground animate-pulse">
                🔥 {discount}% ছাড় — সীমিত সময়!
              </span>
            )}
            <h1 className="text-3xl font-extrabold leading-tight text-foreground md:text-4xl lg:text-5xl">
              {product.name}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">{product.nameEn}</p>

            {/* Problem */}
            <div className="mt-6 rounded-xl border border-destructive/20 bg-destructive/5 p-4">
              <p className="text-sm font-medium text-foreground leading-relaxed">
                😟 {product.problem}
              </p>
            </div>

            {/* Solution */}
            <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-4">
              <p className="text-sm font-medium text-foreground leading-relaxed">
                ✅ {product.solution}
              </p>
            </div>

            {/* Price */}
            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-4xl font-extrabold text-primary">৳{product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">৳{product.originalPrice}</span>
              )}
            </div>

            {/* CTA */}
            <Button
              size="lg"
              className="mt-6 h-14 w-full gap-2 bg-offer text-lg font-bold text-offer-foreground shadow-lg hover:bg-offer/90 md:w-auto md:px-12"
              onClick={handleOrder}
            >
              <CreditCard className="h-5 w-5" /> এখনই অর্ডার করুন
            </Button>
            <p className="mt-2 text-xs text-muted-foreground">💵 Cash on Delivery — আগে দেখুন, তারপর পেমেন্ট করুন</p>
          </div>

          <div className="flex justify-center">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-w-sm rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-3 -right-3 rounded-full bg-offer px-4 py-2 text-sm font-bold text-offer-foreground shadow-lg">
                ৳{product.price} মাত্র
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-secondary py-12">
        <div className="container">
          <h2 className="text-center text-2xl font-bold text-foreground md:text-3xl">
            কেন {product.name} ব্যবহার করবেন?
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {product.benefits.map((b, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-border bg-card p-5 shadow-sm">
                <CheckCircle className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                <p className="text-sm font-medium text-foreground">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW TO USE */}
      <section className="py-12">
        <div className="container max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-foreground">ব্যবহারের নিয়ম</h2>
          <div className="mt-6 rounded-xl border border-border bg-card p-6">
            <p className="text-foreground leading-relaxed">{product.usage}</p>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">উপাদান: {product.ingredients}</p>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-secondary py-12">
        <div className="container">
          <h2 className="text-center text-2xl font-bold text-foreground">
            গ্রাহকদের মতামত
          </h2>
          <div className="mt-2 flex justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-gold text-gold" />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">{product.rating}/5 ({product.reviews}+ রিভিউ)</span>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {displayTestimonials.map((t) => (
              <div key={t.id} className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="mt-3 text-sm text-foreground leading-relaxed">"{t.text}"</p>
                <p className="mt-3 text-xs font-semibold text-muted-foreground">— {t.name}, {t.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="py-10">
        <div className="container grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { icon: Shield, title: "১০০% আসল ঔষধ", sub: "নকল হলে টাকা ফেরত" },
            { icon: Truck, title: "দ্রুত ডেলিভারি", sub: "সারাদেশে ২-৫ দিনে" },
            { icon: Clock, title: "২৪/৭ সাপোর্ট", sub: "যেকোনো সময় কল করুন" },
            { icon: Award, title: "বিশেষজ্ঞ পরামর্শ", sub: "ফ্রি ডাক্তার কনসাল্টেশন" },
          ].map((b) => (
            <div key={b.title} className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <b.icon className="h-7 w-7 text-primary" />
              </div>
              <p className="mt-2 text-sm font-bold text-foreground">{b.title}</p>
              <p className="text-xs text-muted-foreground">{b.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-primary py-12">
        <div className="container text-center">
          <h2 className="text-2xl font-bold text-primary-foreground md:text-3xl">
            আর দেরি কেন? এখনই অর্ডার করুন!
          </h2>
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="text-4xl font-extrabold text-primary-foreground">৳{product.price}</span>
            {product.originalPrice && (
              <span className="text-xl text-primary-foreground/60 line-through">৳{product.originalPrice}</span>
            )}
          </div>
          <Button
            size="lg"
            className="mt-6 h-14 gap-2 bg-offer px-12 text-lg font-bold text-offer-foreground shadow-xl hover:bg-offer/90"
            onClick={handleOrder}
          >
            <ShoppingCart className="h-5 w-5" /> এখনই অর্ডার করুন <ArrowRight className="h-5 w-5" />
          </Button>
          <p className="mt-3 text-sm text-primary-foreground/80">💵 Cash on Delivery | 🚚 সারাদেশে ডেলিভারি | 🔒 ১০০% নিরাপদ</p>

          <div className="mt-6">
            <a
              href="https://wa.me/8801XXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary-foreground underline hover:no-underline"
            >
              <Phone className="h-4 w-4" /> প্রশ্ন আছে? WhatsApp এ জিজ্ঞাসা করুন
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductLanding;
