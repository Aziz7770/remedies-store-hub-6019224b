import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Lock, Plus, Pencil, Trash2, Package, RefreshCw, X, Save, Upload, ArrowLeft } from "lucide-react";
import { useProducts, type Product, type Category } from "@/hooks/useProducts";
import { Link } from "react-router-dom";

const ADMIN_PASSWORD = "bismillah2025";

const emptyForm = {
  product_id: "",
  slug: "",
  name: "",
  name_en: "",
  price: 0,
  original_price: 0,
  image_url: "",
  category: "general",
  description: "",
  problem: "",
  solution: "",
  benefits: [] as string[],
  usage_info: "",
  ingredients: "",
  rating: 4.5,
  reviews_count: 0,
  in_stock: true,
  featured: false,
};

const AdminProducts = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const { products, categories, loading, refetch } = useProducts();
  const [editing, setEditing] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [benefitInput, setBenefitInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [filterCategory, setFilterCategory] = useState("all");

  useEffect(() => {
    if (sessionStorage.getItem("admin_auth") === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_auth", "true");
    } else {
      toast.error("পাসওয়ার্ড ভুল হয়েছে!");
    }
  };

  const startAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setBenefitInput("");
    setIsAdding(true);
  };

  const startEdit = (p: Product) => {
    setIsAdding(false);
    setEditing(p);
    setForm({
      product_id: p.product_id,
      slug: p.slug,
      name: p.name,
      name_en: p.name_en,
      price: Number(p.price),
      original_price: p.original_price ? Number(p.original_price) : 0,
      image_url: p.image_url,
      category: p.category,
      description: p.description,
      problem: p.problem,
      solution: p.solution,
      benefits: p.benefits,
      usage_info: p.usage_info,
      ingredients: p.ingredients,
      rating: Number(p.rating),
      reviews_count: p.reviews_count,
      in_stock: p.in_stock,
      featured: p.featured,
    });
    setBenefitInput("");
  };

  const cancelForm = () => {
    setEditing(null);
    setIsAdding(false);
    setForm(emptyForm);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from("product-images").upload(fileName, file);
    if (error) {
      toast.error("ছবি আপলোড করতে সমস্যা হয়েছে");
      console.error(error);
    } else {
      const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(fileName);
      setForm((f) => ({ ...f, image_url: urlData.publicUrl }));
      toast.success("ছবি আপলোড হয়েছে!");
    }
    setUploading(false);
  };

  const addBenefit = () => {
    if (benefitInput.trim()) {
      setForm((f) => ({ ...f, benefits: [...f.benefits, benefitInput.trim()] }));
      setBenefitInput("");
    }
  };

  const removeBenefit = (idx: number) => {
    setForm((f) => ({ ...f, benefits: f.benefits.filter((_, i) => i !== idx) }));
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\u0980-\u09FF]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") + "-offer";
  };

  const handleSave = async () => {
    if (!form.name || !form.product_id) {
      toast.error("নাম ও Product ID দিন");
      return;
    }

    const payload = {
      product_id: form.product_id,
      slug: form.slug || generateSlug(form.product_id),
      name: form.name,
      name_en: form.name_en,
      price: form.price,
      original_price: form.original_price || null,
      image_url: form.image_url,
      category: form.category,
      description: form.description,
      problem: form.problem,
      solution: form.solution,
      benefits: form.benefits,
      usage_info: form.usage_info,
      ingredients: form.ingredients,
      rating: form.rating,
      reviews_count: form.reviews_count,
      in_stock: form.in_stock,
      featured: form.featured,
      updated_at: new Date().toISOString(),
    };

    if (editing) {
      const { error } = await supabase
        .from("products")
        .update(payload)
        .eq("id", editing.id);
      if (error) {
        toast.error("আপডেট করতে সমস্যা হয়েছে");
        console.error(error);
      } else {
        toast.success("প্রোডাক্ট আপডেট হয়েছে!");
        cancelForm();
        refetch();
      }
    } else {
      const { error } = await supabase.from("products").insert(payload);
      if (error) {
        toast.error("যোগ করতে সমস্যা হয়েছে: " + error.message);
        console.error(error);
      } else {
        toast.success("নতুন প্রোডাক্ট যোগ হয়েছে!");
        cancelForm();
        refetch();
      }
    }
  };

  const handleDelete = async (p: Product) => {
    if (!confirm(`"${p.name}" মুছে ফেলতে চান?`)) return;
    const { error } = await supabase.from("products").delete().eq("id", p.id);
    if (error) {
      toast.error("মুছতে সমস্যা হয়েছে");
    } else {
      toast.success("প্রোডাক্ট মুছে ফেলা হয়েছে!");
      refetch();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container py-20 flex flex-col items-center gap-4">
        <Lock className="h-12 w-12 text-muted-foreground" />
        <h2 className="text-xl font-bold text-foreground">অ্যাডমিন লগইন</h2>
        <input
          type="password"
          placeholder="পাসওয়ার্ড দিন"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          className="border border-border rounded-lg px-4 py-2 w-64 text-center bg-card text-foreground"
        />
        <Button onClick={handleLogin}>প্রবেশ করুন</Button>
      </div>
    );
  }

  const filtered = filterCategory === "all" ? products : products.filter((p) => p.category === filterCategory);

  return (
    <div className="container py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Package className="h-6 w-6 text-primary" />
          প্রোডাক্ট ম্যানেজমেন্ট
        </h1>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={refetch}><RefreshCw className="h-3 w-3 mr-1" /> রিফ্রেশ</Button>
          <Button size="sm" asChild variant="outline"><Link to="/admin/orders"><ArrowLeft className="h-3 w-3 mr-1" /> অর্ডার</Link></Button>
          <Button size="sm" onClick={startAdd}><Plus className="h-3 w-3 mr-1" /> নতুন প্রোডাক্ট</Button>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
        <button
          onClick={() => setFilterCategory("all")}
          className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium border transition-colors ${filterCategory === "all" ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:bg-accent"}`}
        >
          সব ({products.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilterCategory(cat.id)}
            className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium border transition-colors ${filterCategory === cat.id ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:bg-accent"}`}
          >
            {cat.icon} {cat.name} ({products.filter((p) => p.category === cat.id).length})
          </button>
        ))}
      </div>

      {/* Add/Edit Form */}
      {(isAdding || editing) && (
        <div className="mb-6 rounded-xl border border-border bg-card p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-foreground">{editing ? "প্রোডাক্ট সম্পাদনা" : "নতুন প্রোডাক্ট যোগ"}</h2>
            <Button size="sm" variant="ghost" onClick={cancelForm}><X className="h-4 w-4" /></Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted-foreground">Product ID (ইউনিক)</label>
              <Input value={form.product_id} onChange={(e) => setForm((f) => ({ ...f, product_id: e.target.value }))} disabled={!!editing} placeholder="arnica-montana-30" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Slug</label>
              <Input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} placeholder="auto-generated" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">নাম (বাংলা)</label>
              <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">নাম (English)</label>
              <Input value={form.name_en} onChange={(e) => setForm((f) => ({ ...f, name_en: e.target.value }))} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">দাম (৳)</label>
              <Input type="number" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">আসল দাম (৳)</label>
              <Input type="number" value={form.original_price} onChange={(e) => setForm((f) => ({ ...f, original_price: Number(e.target.value) }))} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">ক্যাটাগরি</label>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">রেটিং</label>
              <Input type="number" step="0.1" value={form.rating} onChange={(e) => setForm((f) => ({ ...f, rating: Number(e.target.value) }))} />
            </div>
          </div>

          {/* Image upload */}
          <div>
            <label className="text-xs text-muted-foreground">ছবি</label>
            <div className="flex gap-3 items-center mt-1">
              {form.image_url && (
                <img src={form.image_url} alt="" className="h-16 w-16 rounded-lg object-cover border" />
              )}
              <label className="cursor-pointer inline-flex items-center gap-1 rounded-lg border border-dashed border-border px-4 py-2 text-sm hover:bg-accent">
                <Upload className="h-4 w-4" /> {uploading ? "আপলোড হচ্ছে..." : "ছবি আপলোড"}
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
              </label>
              <span className="text-xs text-muted-foreground">অথবা</span>
              <Input
                placeholder="ছবির URL দিন"
                value={form.image_url}
                onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))}
                className="flex-1"
              />
            </div>
          </div>

          {/* Text fields */}
          <div>
            <label className="text-xs text-muted-foreground">বিবরণ</label>
            <textarea className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm min-h-[60px]" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted-foreground">সমস্যা</label>
              <textarea className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm min-h-[60px]" value={form.problem} onChange={(e) => setForm((f) => ({ ...f, problem: e.target.value }))} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">সমাধান</label>
              <textarea className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm min-h-[60px]" value={form.solution} onChange={(e) => setForm((f) => ({ ...f, solution: e.target.value }))} />
            </div>
          </div>

          {/* Benefits */}
          <div>
            <label className="text-xs text-muted-foreground">উপকারিতা</label>
            <div className="flex gap-2 mt-1">
              <Input value={benefitInput} onChange={(e) => setBenefitInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addBenefit())} placeholder="উপকারিতা লিখুন" />
              <Button size="sm" type="button" onClick={addBenefit}>যোগ</Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {form.benefits.map((b, i) => (
                <span key={i} className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                  {b} <button onClick={() => removeBenefit(i)}><X className="h-3 w-3" /></button>
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted-foreground">ব্যবহারের নিয়ম</label>
              <textarea className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm min-h-[60px]" value={form.usage_info} onChange={(e) => setForm((f) => ({ ...f, usage_info: e.target.value }))} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">উপাদান</label>
              <textarea className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm min-h-[60px]" value={form.ingredients} onChange={(e) => setForm((f) => ({ ...f, ingredients: e.target.value }))} />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.in_stock} onChange={(e) => setForm((f) => ({ ...f, in_stock: e.target.checked }))} /> স্টকে আছে
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))} /> ফিচার্ড
            </label>
          </div>

          <Button onClick={handleSave} className="w-full gap-2">
            <Save className="h-4 w-4" /> {editing ? "আপডেট করুন" : "সেভ করুন"}
          </Button>
        </div>
      )}

      {/* Products list */}
      {loading ? (
        <div className="py-20 text-center">
          <RefreshCw className="mx-auto h-10 w-10 animate-spin text-primary" />
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((p) => (
            <div key={p.id} className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
              {p.image_url && (
                <img src={p.image_url} alt="" className="h-12 w-12 rounded-lg object-cover shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.name_en} • {categories.find((c) => c.id === p.category)?.name || p.category}</p>
                <p className="text-xs font-bold text-primary">৳{Number(p.price)} {p.original_price ? <span className="line-through text-muted-foreground ml-1">৳{Number(p.original_price)}</span> : null}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button size="sm" variant="outline" onClick={() => startEdit(p)}><Pencil className="h-3 w-3" /></Button>
                <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50" onClick={() => handleDelete(p)}><Trash2 className="h-3 w-3" /></Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-center text-xs text-muted-foreground mt-4 pb-4">
        মোট {filtered.length}টি প্রোডাক্ট
      </p>
    </div>
  );
};

export default AdminProducts;
