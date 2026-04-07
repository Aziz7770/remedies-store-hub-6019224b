import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Product {
  id: string;
  product_id: string;
  slug: string;
  name: string;
  name_en: string;
  price: number;
  original_price?: number | null;
  image_url: string;
  category: string;
  description: string;
  problem: string;
  solution: string;
  benefits: string[];
  usage_info: string;
  ingredients: string;
  rating: number;
  reviews_count: number;
  in_stock: boolean;
  featured: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  sort_order: number;
}

export interface ProductReview {
  id: string;
  product_id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  review_date: string;
}

// Convert DB row to Product
function mapProduct(row: any): Product {
  return {
    ...row,
    benefits: Array.isArray(row.benefits) ? row.benefits : JSON.parse(row.benefits || "[]"),
  };
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    const [prodRes, catRes] = await Promise.all([
      supabase.from("products").select("*").order("created_at", { ascending: true }),
      supabase.from("categories").select("*").order("sort_order", { ascending: true }),
    ]);
    if (prodRes.data) setProducts(prodRes.data.map(mapProduct));
    if (catRes.data) setCategories(catRes.data as Category[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, categories, loading, refetch: fetchProducts };
}

export function useProductReviews(productId: string) {
  const [reviews, setReviews] = useState<ProductReview[]>([]);

  useEffect(() => {
    if (!productId) return;
    supabase
      .from("product_reviews")
      .select("*")
      .eq("product_id", productId)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setReviews(data as ProductReview[]);
      });
  }, [productId]);

  return reviews;
}

// For backwards compatibility - maps to old Product interface shape
export function toOldProduct(p: Product) {
  return {
    id: p.product_id,
    slug: p.slug,
    name: p.name,
    nameEn: p.name_en,
    price: Number(p.price),
    originalPrice: p.original_price ? Number(p.original_price) : undefined,
    image: p.image_url,
    category: p.category,
    description: p.description,
    problem: p.problem,
    solution: p.solution,
    benefits: p.benefits,
    usage: p.usage_info,
    ingredients: p.ingredients,
    rating: Number(p.rating),
    reviews: p.reviews_count,
    inStock: p.in_stock,
    featured: p.featured,
  };
}
