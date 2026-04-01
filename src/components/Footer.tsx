import { Link } from "react-router-dom";
import { Leaf, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-card">
    <div className="container py-12">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full gradient-primary">
              <Leaf className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">হোমিওকেয়ার</span>
          </div>
          <p className="text-sm text-muted-foreground">
            বাংলাদেশের সেরা হোমিওপ্যাথিক ঔষধের অনলাইন শপ। ১০০% আসল ও কার্যকর ঔষধ।
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="mb-4 text-sm font-semibold text-foreground">দ্রুত লিংক</h3>
          <div className="flex flex-col gap-2">
            {[
              { to: "/products", label: "সকল ঔষধ" },
              { to: "/consultation", label: "ডাক্তার পরামর্শ" },
              { to: "/about", label: "আমাদের সম্পর্কে" },
              { to: "/contact", label: "যোগাযোগ" },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="text-sm text-muted-foreground hover:text-primary">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Policies */}
        <div>
          <h3 className="mb-4 text-sm font-semibold text-foreground">নীতিমালা</h3>
          <div className="flex flex-col gap-2">
            {[
              { to: "/privacy", label: "গোপনীয়তা নীতি" },
              { to: "/terms", label: "শর্তাবলী" },
              { to: "/return-policy", label: "রিটার্ন পলিসি" },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="text-sm text-muted-foreground hover:text-primary">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-4 text-sm font-semibold text-foreground">যোগাযোগ</h3>
          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> ০১৭XX-XXXXXX</span>
            <span className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> info@homeocare.com</span>
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> ঢাকা, বাংলাদেশ</span>
          </div>
        </div>
      </div>
    </div>
    <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
      © ২০২৬ হোমিওকেয়ার। সর্বস্বত্ব সংরক্ষিত।
    </div>
  </footer>
);

export default Footer;
