import { useParams, Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Star, ArrowLeft, CheckCircle, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { products, productReviews } from "@/data/products";
import { toast } from "sonner";
import { useEffect } from "react";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <p className="text-lg text-muted-foreground">ঔষধটি পাওয়া যায়নি</p>
        <Button asChild className="mt-4"><Link to="/products">সকল ঔষধ দেখুন</Link></Button>
      </div>
    );
  }

  const handleAdd = () => {
    addToCart(product);
    toast.success(`${product.name} কার্টে যোগ হয়েছে!`);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;
  const reviews = productReviews[product.id] || [];

  return (
    <div className="container py-8">
      <Link to="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> সকল ঔষধ
      </Link>

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        {/* Image */}
        <div className="overflow-hidden rounded-2xl border border-border bg-secondary">
          <img src={product.image} alt={product.name} className="w-full object-cover aspect-square" />
        </div>

        {/* Info */}
        <div>
          {discount > 0 && (
            <span className="inline-block rounded-full bg-offer px-3 py-1 text-xs font-bold text-offer-foreground">
              {discount}% ছাড়
            </span>
          )}
          <h1 className="mt-2 text-2xl font-bold text-foreground md:text-3xl">{product.name}</h1>
          <p className="text-sm text-muted-foreground">{product.nameEn}</p>

          <div className="mt-2 flex items-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-gold text-gold" : "text-border"}`} />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({product.reviews} রিভিউ)</span>
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-primary">৳{product.price}</span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">৳{product.originalPrice}</span>
            )}
          </div>

          <p className="mt-4 text-sm text-foreground">{product.description}</p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="w-full gap-2 bg-offer text-offer-foreground hover:bg-offer/90" onClick={() => { addToCart(product); navigate("/checkout"); }}>
              <CreditCard className="h-4 w-4" /> এখনই অর্ডার করুন
            </Button>
            <Button size="lg" variant="outline" className="w-full gap-2" onClick={handleAdd}>
              <ShoppingCart className="h-4 w-4" /> কার্টে যোগ করুন
            </Button>
          </div>

          <div className="mt-6 flex gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><CheckCircle className="h-3.5 w-3.5 text-primary" /> ১০০% আসল</span>
            <span className="flex items-center gap-1"><CheckCircle className="h-3.5 w-3.5 text-primary" /> দ্রুত ডেলিভারি</span>
            <span className="flex items-center gap-1"><CheckCircle className="h-3.5 w-3.5 text-primary" /> Cash on Delivery</span>
          </div>
        </div>
      </div>

      {/* Details tabs */}
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-semibold text-foreground">উপকারিতা</h3>
          <ul className="mt-3 space-y-2">
            {product.benefits.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-foreground">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {b}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-semibold text-foreground">ব্যবহারের নিয়ম</h3>
          <p className="mt-3 text-sm text-foreground">{product.usage}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-semibold text-foreground">উপাদান</h3>
          <p className="mt-3 text-sm text-foreground">{product.ingredients}</p>
        </div>
      </div>

      {/* Reviews Section */}
      {reviews.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-bold text-foreground">কাস্টমার রিভিউ ({reviews.length})</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-5 shadow-card">
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className={`h-4 w-4 ${j < review.rating ? "fill-gold text-gold" : "text-border"}`} />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
                <p className="mt-3 text-sm text-foreground">"{review.text}"</p>
                <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
