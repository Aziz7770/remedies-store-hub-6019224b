import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";

const OWNER_WHATSAPP = "8801767678562";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const orderItemsRef = useRef(items);

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
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;
    const note = formData.get("note") as string;

    // Build WhatsApp message with order details
    const currentItems = orderItemsRef.current;
    const currentTotal = currentItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const currentDelivery = currentTotal >= 500 ? 0 : 60;

    let message = `🛒 *নতুন অর্ডার!*\n\n`;
    message += `👤 *নাম:* ${name}\n`;
    message += `📞 *ফোন:* ${phone}\n`;
    message += `📍 *ঠিকানা:* ${address}\n`;
    if (note) message += `📝 *নোট:* ${note}\n`;
    message += `\n📦 *পণ্যসমূহ:*\n`;
    currentItems.forEach((item) => {
      message += `• ${item.product.name} × ${item.quantity} = ৳${item.product.price * item.quantity}\n`;
    });
    message += `\n💰 *সাবটোটাল:* ৳${currentTotal}\n`;
    message += `🚚 *ডেলিভারি:* ${currentDelivery === 0 ? "ফ্রি" : `৳${currentDelivery}`}\n`;
    message += `✅ *মোট:* ৳${currentTotal + currentDelivery}\n`;
    message += `💳 *পেমেন্ট:* ক্যাশ অন ডেলিভারি`;

    const whatsappUrl = `https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    setSubmitted(true);
    clearCart();
    toast.success("অর্ডার সফলভাবে সম্পন্ন হয়েছে!");
  };

  // Keep items ref updated
  useEffect(() => {
    if (items.length > 0) {
      orderItemsRef.current = items;
    }
  }, [items]);

  if (submitted) {
    return (
      <div className="container py-20 text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-primary" />
        <h2 className="mt-4 text-2xl font-bold text-foreground">অর্ডার সফল!</h2>
        <p className="mt-2 text-sm text-muted-foreground">আপনার অর্ডার সফলভাবে গৃহীত হয়েছে। শীঘ্রই আপনার সাথে যোগাযোগ করা হবে।</p>
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
              <div><Label htmlFor="name">আপনার নাম *</Label><Input id="name" name="name" required placeholder="পূর্ণ নাম" /></div>
              <div><Label htmlFor="phone">মোবাইল নম্বর *</Label><Input id="phone" name="phone" required placeholder="০১XXXXXXXXX" type="tel" /></div>
            </div>
            <div><Label htmlFor="address">সম্পূর্ণ ঠিকানা *</Label><Textarea id="address" name="address" required placeholder="বাসা/ফ্ল্যাট নং, রোড, এলাকা, থানা, জেলা" /></div>
            <div><Label htmlFor="note">বিশেষ নোট (ঐচ্ছিক)</Label><Input id="note" name="note" placeholder="যেকোনো বিশেষ নির্দেশনা" /></div>
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
