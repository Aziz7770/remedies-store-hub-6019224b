export interface Product {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  benefits: string[];
  usage: string;
  ingredients: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  featured?: boolean;
}

export const categories = [
  { id: "skin", name: "ত্বকের সমস্যা", icon: "✨", color: "bg-pink-50 text-pink-700" },
  { id: "hair", name: "চুলের সমস্যা", icon: "💇", color: "bg-purple-50 text-purple-700" },
  { id: "sexual", name: "যৌন স্বাস্থ্য", icon: "❤️", color: "bg-red-50 text-red-700" },
  { id: "general", name: "সাধারণ স্বাস্থ্য", icon: "🏥", color: "bg-blue-50 text-blue-700" },
  { id: "digestive", name: "পেটের সমস্যা", icon: "🫁", color: "bg-yellow-50 text-yellow-700" },
  { id: "respiratory", name: "শ্বাসকষ্ট", icon: "🌬️", color: "bg-teal-50 text-teal-700" },
];

export const products: Product[] = [
  {
    id: "arnica-montana-30",
    name: "আর্নিকা মন্টানা ৩০",
    nameEn: "Arnica Montana 30",
    price: 120,
    originalPrice: 180,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400",
    category: "general",
    description: "ব্যথা, আঘাত ও পেশী ব্যথায় অত্যন্ত কার্যকর হোমিওপ্যাথিক ঔষধ। শরীরে কোনো আঘাত বা ব্যথা হলে এটি দ্রুত উপশম দেয়।",
    benefits: ["ব্যথা ও আঘাতে দ্রুত উপশম", "পেশী ব্যথা কমায়", "ক্ষত নিরাময়ে সাহায্য করে", "কোনো পার্শ্বপ্রতিক্রিয়া নেই"],
    usage: "প্রাপ্তবয়স্কদের জন্য দিনে ৩ বার ৫ ড্রপ করে জিহ্বার নিচে রাখুন।",
    ingredients: "আর্নিকা মন্টানা Q, অ্যালকোহল বেস",
    rating: 4.8,
    reviews: 234,
    inStock: true,
    featured: true,
  },
  {
    id: "sulphur-200",
    name: "সালফার ২০০",
    nameEn: "Sulphur 200",
    price: 150,
    originalPrice: 220,
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400",
    category: "skin",
    description: "ত্বকের বিভিন্ন সমস্যা যেমন চুলকানি, একজিমা, দাদ ইত্যাদিতে অত্যন্ত কার্যকর।",
    benefits: ["চুলকানি দূর করে", "একজিমায় কার্যকর", "ত্বকের প্রদাহ কমায়", "দীর্ঘমেয়াদী ফলাফল"],
    usage: "সপ্তাহে ১ বার ৫ ড্রপ জিহ্বার নিচে রাখুন। ডাক্তারের পরামর্শ অনুযায়ী ব্যবহার করুন।",
    ingredients: "সালফার ২০০CH, সুক্রোজ পিলস",
    rating: 4.6,
    reviews: 189,
    inStock: true,
    featured: true,
  },
  {
    id: "nux-vomica-30",
    name: "নাক্স ভমিকা ৩০",
    nameEn: "Nux Vomica 30",
    price: 100,
    image: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=400",
    category: "digestive",
    description: "হজম সমস্যা, গ্যাস, অম্বল ও পেটের বিভিন্ন সমস্যায় অত্যন্ত কার্যকর।",
    benefits: ["গ্যাস ও অম্বল দূর করে", "হজম শক্তি বাড়ায়", "কোষ্ঠকাঠিন্য দূর করে", "লিভার সুস্থ রাখে"],
    usage: "দিনে ৩ বার ৫ ড্রপ করে জিহ্বার নিচে রাখুন।",
    ingredients: "নাক্স ভমিকা ৩০CH, অ্যালকোহল বেস",
    rating: 4.7,
    reviews: 312,
    inStock: true,
    featured: true,
  },
  {
    id: "thuja-200",
    name: "থুজা ২০০",
    nameEn: "Thuja 200",
    price: 130,
    originalPrice: 190,
    image: "https://images.unsplash.com/photo-1576602976047-174e57a47881?w=400",
    category: "skin",
    description: "আঁচিল, মোলাস্কাম ও ত্বকের বিভিন্ন গ্রোথ দূর করতে অত্যন্ত কার্যকর।",
    benefits: ["আঁচিল দূর করে", "ত্বকের গ্রোথ কমায়", "ভ্যাক্সিনেশন পরবর্তী সমস্যায় কার্যকর"],
    usage: "সপ্তাহে ১ বার ৫ ড্রপ। ডাক্তারের পরামর্শ অনুযায়ী।",
    ingredients: "থুজা অক্সিডেন্টালিস ২০০CH",
    rating: 4.5,
    reviews: 145,
    inStock: true,
  },
  {
    id: "lycopodium-200",
    name: "লাইকোপোডিয়াম ২০০",
    nameEn: "Lycopodium 200",
    price: 140,
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400",
    category: "sexual",
    description: "যৌন দুর্বলতা, শারীরিক দুর্বলতা ও হজম সমস্যায় কার্যকর।",
    benefits: ["যৌন শক্তি বাড়ায়", "শারীরিক দুর্বলতা দূর করে", "আত্মবিশ্বাস বাড়ায়"],
    usage: "সপ্তাহে ১ বার ডাক্তারের পরামর্শ অনুযায়ী।",
    ingredients: "লাইকোপোডিয়াম ক্ল্যাভাটাম ২০০CH",
    rating: 4.9,
    reviews: 456,
    inStock: true,
    featured: true,
  },
  {
    id: "phosphorus-30",
    name: "ফসফরাস ৩০",
    nameEn: "Phosphorus 30",
    price: 110,
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400",
    category: "respiratory",
    description: "কাশি, শ্বাসকষ্ট ও ফুসফুসের বিভিন্ন সমস্যায় কার্যকর।",
    benefits: ["দীর্ঘমেয়াদী কাশি দূর করে", "শ্বাসকষ্ট কমায়", "ফুসফুসকে শক্তিশালী করে"],
    usage: "দিনে ২ বার ৫ ড্রপ করে জিহ্বার নিচে রাখুন।",
    ingredients: "ফসফরাস ৩০CH, অ্যালকোহল বেস",
    rating: 4.6,
    reviews: 178,
    inStock: true,
  },
  {
    id: "jaborandi-q",
    name: "জাবোরান্ডি Q (মাদার টিংচার)",
    nameEn: "Jaborandi Q",
    price: 200,
    originalPrice: 280,
    image: "https://images.unsplash.com/photo-1585751119414-ef2636f8aede?w=400",
    category: "hair",
    description: "চুল পড়া রোধ ও নতুন চুল গজাতে অত্যন্ত কার্যকর হোমিওপ্যাথিক ঔষধ।",
    benefits: ["চুল পড়া রোধ করে", "নতুন চুল গজায়", "চুলের গোড়া মজবুত করে", "খুশকি দূর করে"],
    usage: "১০ ড্রপ পানিতে মিশিয়ে দিনে ২ বার খান। তেলে মিশিয়ে মাথায় ব্যবহার করতে পারেন।",
    ingredients: "জাবোরান্ডি Q, অ্যালকোহল বেস",
    rating: 4.8,
    reviews: 389,
    inStock: true,
    featured: true,
  },
  {
    id: "calc-phos-6x",
    name: "ক্যালক ফস ৬X",
    nameEn: "Calc Phos 6X",
    price: 90,
    image: "https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=400",
    category: "general",
    description: "হাড় ও দাঁতের স্বাস্থ্যের জন্য অত্যন্ত কার্যকর। শিশু ও বৃদ্ধদের জন্য বিশেষ উপযোগী।",
    benefits: ["হাড় মজবুত করে", "দাঁতের স্বাস্থ্য ভালো রাখে", "বৃদ্ধি ত্বরান্বিত করে"],
    usage: "দিনে ৩ বার ৪টি ট্যাবলেট জিহ্বার নিচে রাখুন।",
    ingredients: "ক্যালসিয়াম ফসফরিকাম ৬X",
    rating: 4.4,
    reviews: 123,
    inStock: true,
  },
];

export const testimonials = [
  {
    id: 1,
    name: "রহিমা বেগম",
    location: "ঢাকা",
    text: "আমার দীর্ঘদিনের চুলকানি সমস্যা সালফার ২০০ ব্যবহার করে সম্পূর্ণ সেরে গেছে। অত্যন্ত কৃতজ্ঞ!",
    rating: 5,
    product: "সালফার ২০০",
  },
  {
    id: 2,
    name: "করিম উদ্দিন",
    location: "চট্টগ্রাম",
    text: "জাবোরান্ডি ব্যবহার করে আমার চুল পড়া অনেক কমেছে। ৩ মাসে দারুণ ফলাফল পেয়েছি।",
    rating: 5,
    product: "জাবোরান্ডি Q",
  },
  {
    id: 3,
    name: "ফাতেমা খাতুন",
    location: "রাজশাহী",
    text: "গ্যাস ও অম্বল সমস্যায় নাক্স ভমিকা ম্যাজিকের মতো কাজ করেছে। ডাক্তারকে অনেক ধন্যবাদ।",
    rating: 4,
    product: "নাক্স ভমিকা ৩০",
  },
  {
    id: 4,
    name: "সালাম মিয়া",
    location: "সিলেট",
    text: "ছেলের হাড়ের সমস্যায় ক্যালক ফস দারুণ কাজ করেছে। এখন অনেক সুস্থ আলহামদুলিল্লাহ।",
    rating: 5,
    product: "ক্যালক ফস ৬X",
  },
];
