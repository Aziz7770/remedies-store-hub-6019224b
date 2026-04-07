import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { useProducts, toOldProduct } from "@/hooks/useProducts";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const activeCategory = searchParams.get("category") || "all";
  const { products, categories, loading } = useProducts();

  const filtered = useMemo(() => {
    let result = products;
    if (activeCategory !== "all") result = result.filter((p) => p.category === activeCategory);
    if (search) result = result.filter((p) => p.name.includes(search) || p.name_en.toLowerCase().includes(search.toLowerCase()));
    return result;
  }, [activeCategory, search, products]);

  if (loading) {
    return (
      <div className="container py-20 text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="mt-4 text-sm text-muted-foreground">লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold text-foreground">সকল ঔষধ</h1>
      <p className="mt-1 text-sm text-muted-foreground">আপনার প্রয়োজনীয় হোমিওপ্যাথিক ঔষধ খুঁজুন</p>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="ঔষধ খুঁজুন..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button variant={activeCategory === "all" ? "default" : "outline"} size="sm" onClick={() => setSearchParams({})}>
          সব
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant={activeCategory === cat.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSearchParams({ category: cat.id })}
          >
            {cat.icon} {cat.name}
          </Button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filtered.map((p) => (
          <ProductCard key={p.product_id} product={toOldProduct(p)} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-lg text-muted-foreground">কোনো ঔষধ পাওয়া যায়নি</p>
        </div>
      )}
    </div>
  );
};

export default Products;
