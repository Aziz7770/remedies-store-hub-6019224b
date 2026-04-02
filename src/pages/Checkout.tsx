import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const deliveryCharge = totalPrice >= 500 ? 0 : 60;

  useEffect(() => {
    if (submitted) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [submitted]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    clearCart();
    toast.success("অর্ডার সফলভাবে সম্পন্ন হয়েছে!");
  };

  if (submitted) {
    return (
      <div className="container py-20 text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-primary" />
        <h2 className="mt-4 text-2xl font-bold text-foreground">অর্ডার সফল!</h2>
        <p className="mt-2 text-sm text-muted-foreground">আপনার অর্ডার সফলভাবে গৃহীত হয়েছে। শীঘ্রই আমরা আপনার সাথে যোগাযোগ করব।</p>
        <Button onClick={() => navigate("/")} className="mt-6">হোমপেজে যান</Button>
      </div>
    );
  }

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold text-foreground">চেকআউট</h1>
      <div className="mt-6 grid gap-8 lg:grid-cols-3">
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-4">
          <div className="rounded-xl border border-border bg-card p-6 space-y-4">
            <h3 className="font-semibold text-foreground">ডেলিভারি তথ্য</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><Label htmlFor="name">আপনার নাম *</Label><Input id="name" required placeholder="পূর্ণ নাম" /></div>
              <div><Label htmlFor="phone">মোবাইল নম্বর *</Label><Input id="phone" required placeholder="০১XXXXXXXXX" type="tel" /></div>
            </div>
            <div><Label htmlFor="address">সম্পূর্ণ ঠিকানা *</Label><Textarea id="address" required placeholder="বাসা/ফ্ল্যাট নং, রোড, এলাকা, থানা, জেলা" /></div>
            <div><Label htmlFor="note">বিশেষ নোট (ঐচ্ছিক)</Label><Input id="note" placeholder="যেকোনো বিশেষ নির্দেশনা" /></div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold text-foreground">পেমেন্ট পদ্ধতি</h3>
            <div className="mt-3 flex items-center gap-3 rounded-lg border-2 border-primary bg-primary/5 p-4">
              <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary">
                <div className="h-2.5 w-2.5 rounded-full bg-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">ক্যাশ অন ডেলিভারি</p>
                <p className="text-xs text-muted-foreground">পণ্য হাতে পেয়ে টাকা দিন</p>
              </div>
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full">অর্ডার কনফার্ম করুন</Button>
        </form>

        {/* Order summary */}
        <div className="rounded-xl border border-border bg-card p-6 h-fit">
          <h3 className="font-semibold text-foreground">আপনার অর্ডার</h3>
          <div className="mt-4 space-y-3">
            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <span className="text-foreground">{item.product.name} × {item.quantity}</span>
                <span className="text-foreground">৳{item.product.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-border pt-3 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">সাবটোটাল</span><span>৳{totalPrice}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">ডেলিভারি</span><span>{deliveryCharge === 0 ? "ফ্রি" : `৳${deliveryCharge}`}</span></div>
            <div className="flex justify-between font-bold text-base border-t border-border pt-2">
              <span>মোট</span><span className="text-primary">৳{totalPrice + deliveryCharge}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
