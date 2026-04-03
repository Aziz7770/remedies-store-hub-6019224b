export interface Product {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  problem: string;
  solution: string;
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
  { id: "gynecomastia", name: "Gynecomastia", icon: "🧑‍⚕️", color: "bg-orange-50 text-orange-700" },
  { id: "varicocele", name: "ভেরিকোসিল", icon: "🔬", color: "bg-indigo-50 text-indigo-700" },
];

export const products: Product[] = [
  {
    id: "arnica-montana-30",
    slug: "arnica-montana-30-offer",
    name: "আর্নিকা মন্টানা ৩০",
    nameEn: "Arnica Montana 30",
    price: 120,
    originalPrice: 140,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400",
    category: "general",
    description: "ব্যথা, আঘাত ও পেশী ব্যথায় অত্যন্ত কার্যকর হোমিওপ্যাথিক ঔষধ। শরীরে কোনো আঘাত বা ব্যথা হলে এটি দ্রুত উপশম দেয়।",
    problem: "শরীরে ব্যথা, আঘাত বা পেশী টানে আপনি কি প্রতিদিন কষ্ট পাচ্ছেন? পেইনকিলার খেয়ে খেয়ে পেটের সমস্যা হচ্ছে? এই যন্ত্রণা থেকে স্থায়ী মুক্তি চান?",
    solution: "আর্নিকা মন্টানা ৩০ — প্রাকৃতিক ও পার্শ্বপ্রতিক্রিয়ামুক্ত হোমিওপ্যাথিক সমাধান যা ব্যথা ও আঘাতে দ্রুত উপশম দেয়, কোনো ক্ষতি ছাড়াই।",
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
    slug: "sulphur-200-offer",
    name: "সালফার ২০০",
    nameEn: "Sulphur 200",
    price: 150,
    originalPrice: 175,
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400",
    category: "skin",
    description: "ত্বকের বিভিন্ন সমস্যা যেমন চুলকানি, একজিমা, দাদ ইত্যাদিতে অত্যন্ত কার্যকর।",
    problem: "চুলকানি, একজিমা বা দাদে ভুগছেন? ক্রিম, মলম ব্যবহার করেও সমস্যা বারবার ফিরে আসছে? ত্বকের এই সমস্যা আপনার দৈনন্দিন জীবনকে কষ্টকর করে তুলছে?",
    solution: "সালফার ২০০ — হোমিওপ্যাথির সবচেয়ে শক্তিশালী ত্বকের ঔষধ যা ভেতর থেকে সমস্যার মূল কারণ দূর করে, স্থায়ীভাবে।",
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
    slug: "nux-vomica-30-offer",
    name: "নাক্স ভমিকা ৩০",
    nameEn: "Nux Vomica 30",
    price: 100,
    image: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=400",
    category: "digestive",
    description: "হজম সমস্যা, গ্যাস, অম্বল ও পেটের বিভিন্ন সমস্যায় অত্যন্ত কার্যকর।",
    problem: "গ্যাস, অম্বল বা হজমের সমস্যায় প্রতিদিন কষ্ট পাচ্ছেন? খাবার খেলেই পেট ফুলে যায়? অ্যান্টাসিড খেয়ে সাময়িক সমাধান করছেন কিন্তু সমস্যা ফিরে আসছে?",
    solution: "নাক্স ভমিকা ৩০ — পেটের সমস্যার প্রাকৃতিক সমাধান। এটি হজম শক্তি বাড়ায় এবং গ্যাস ও অম্বল স্থায়ীভাবে দূর করে।",
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
    slug: "thuja-200-offer",
    name: "থুজা ২০০",
    nameEn: "Thuja 200",
    price: 130,
    image: "https://images.unsplash.com/photo-1576602976047-174e57a47881?w=400",
    category: "skin",
    description: "আঁচিল, মোলাস্কাম ও ত্বকের বিভিন্ন গ্রোথ দূর করতে অত্যন্ত কার্যকর।",
    problem: "আঁচিল বা ত্বকে অবাঞ্ছিত গ্রোথ আপনাকে বিব্রত করছে? অনেক চিকিৎসা করেও সমাধান পাচ্ছেন না? বারবার আঁচিল ফিরে আসছে?",
    solution: "থুজা ২০০ — হোমিওপ্যাথির প্রমাণিত ঔষধ যা আঁচিল ও ত্বকের গ্রোথ ভেতর থেকে দূর করে, আর ফিরে আসে না।",
    benefits: ["আঁচিল দূর করে", "ত্বকের গ্রোথ কমায়", "ভ্যাক্সিনেশন পরবর্তী সমস্যায় কার্যকর"],
    usage: "সপ্তাহে ১ বার ৫ ড্রপ। ডাক্তারের পরামর্শ অনুযায়ী।",
    ingredients: "থুজা অক্সিডেন্টালিস ২০০CH",
    rating: 4.5,
    reviews: 145,
    inStock: true,
  },
  {
    id: "lycopodium-200",
    slug: "lycopodium-200-offer",
    name: "লাইকোপোডিয়াম ২০০",
    nameEn: "Lycopodium 200",
    price: 140,
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400",
    category: "sexual",
    description: "যৌন দুর্বলতা, শারীরিক দুর্বলতা ও হজম সমস্যায় কার্যকর।",
    problem: "শারীরিক দুর্বলতা ও আত্মবিশ্বাসের অভাবে জীবন কঠিন হয়ে যাচ্ছে? এই সমস্যা নিয়ে কারো সাথে কথা বলতেও লজ্জা পাচ্ছেন?",
    solution: "লাইকোপোডিয়াম ২০০ — গোপনীয়ভাবে অর্ডার করুন। প্রাকৃতিক উপায়ে শারীরিক শক্তি ও আত্মবিশ্বাস ফিরে পান।",
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
    slug: "phosphorus-30-offer",
    name: "ফসফরাস ৩০",
    nameEn: "Phosphorus 30",
    price: 110,
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400",
    category: "respiratory",
    description: "কাশি, শ্বাসকষ্ট ও ফুসফুসের বিভিন্ন সমস্যায় কার্যকর।",
    problem: "দীর্ঘদিন ধরে কাশি বা শ্বাসকষ্টে ভুগছেন? সিরাপ বা ইনহেলার ব্যবহার করেও স্থায়ী সমাধান পাচ্ছেন না?",
    solution: "ফসফরাস ৩০ — ফুসফুসকে শক্তিশালী করে এবং দীর্ঘমেয়াদী কাশি ও শ্বাসকষ্ট থেকে প্রাকৃতিক উপায়ে মুক্তি দেয়।",
    benefits: ["দীর্ঘমেয়াদী কাশি দূর করে", "শ্বাসকষ্ট কমায়", "ফুসফুসকে শক্তিশালী করে"],
    usage: "দিনে ২ বার ৫ ড্রপ করে জিহ্বার নিচে রাখুন।",
    ingredients: "ফসফরাস ৩০CH, অ্যালকোহল বেস",
    rating: 4.6,
    reviews: 178,
    inStock: true,
  },
  {
    id: "jaborandi-q",
    slug: "jaborandi-q-offer",
    name: "জাবোরান্ডি Q (মাদার টিংচার)",
    nameEn: "Jaborandi Q",
    price: 200,
    image: "https://images.unsplash.com/photo-1585751119414-ef2636f8aede?w=400",
    category: "hair",
    description: "চুল পড়া রোধ ও নতুন চুল গজাতে অত্যন্ত কার্যকর হোমিওপ্যাথিক ঔষধ।",
    problem: "চুল পড়ে যাচ্ছে দ্রুত? মাথায় ফাঁকা জায়গা দেখা যাচ্ছে? শ্যাম্পু, তেল, সিরাম — কিছুতেই কাজ হচ্ছে না?",
    solution: "জাবোরান্ডি Q — চুল পড়া রোধের সবচেয়ে কার্যকর হোমিওপ্যাথিক সমাধান। ভেতর ও বাইরে দুইভাবে কাজ করে নতুন চুল গজায়।",
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
    slug: "calc-phos-6x-offer",
    name: "ক্যালক ফস ৬X",
    nameEn: "Calc Phos 6X",
    price: 90,
    image: "https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=400",
    category: "general",
    description: "হাড় ও দাঁতের স্বাস্থ্যের জন্য অত্যন্ত কার্যকর। শিশু ও বৃদ্ধদের জন্য বিশেষ উপযোগী।",
    problem: "হাড়ে ব্যথা, দাঁত দুর্বল বা শিশুর বৃদ্ধি ধীর? ক্যালসিয়াম ট্যাবলেট খেয়েও কাজ হচ্ছে না? শরীর ক্যালসিয়াম শোষণ করতে পারছে না?",
    solution: "ক্যালক ফস ৬X — শরীরের ক্যালসিয়াম শোষণ ক্ষমতা বাড়ায় এবং হাড় ও দাঁতকে প্রাকৃতিকভাবে মজবুত করে।",
    benefits: ["হাড় মজবুত করে", "দাঁতের স্বাস্থ্য ভালো রাখে", "বৃদ্ধি ত্বরান্বিত করে"],
    usage: "দিনে ৩ বার ৪টি ট্যাবলেট জিহ্বার নিচে রাখুন।",
    ingredients: "ক্যালসিয়াম ফসফরিকাম ৬X",
    rating: 4.4,
    reviews: 123,
    inStock: true,
  },
];

export const productReviews: Record<string, { name: string; location: string; text: string; rating: number; date: string }[]> = {
  "arnica-montana-30": [
    { name: "আব্দুল করিম", location: "ঢাকা", text: "পেশী ব্যথায় অনেক ভালো কাজ করেছে। ২ সপ্তাহে অনেক উন্নতি পেয়েছি।", rating: 5, date: "১৫ মার্চ ২০২৬" },
    { name: "নাসরিন আক্তার", location: "চট্টগ্রাম", text: "হাতে আঘাত পেয়েছিলাম, আর্নিকা খেয়ে ব্যথা দ্রুত কমে গেছে।", rating: 5, date: "১০ মার্চ ২০২৬" },
    { name: "জহিরুল ইসলাম", location: "রাজশাহী", text: "দারুণ ঔষধ! এখন নিয়মিত ব্যবহার করি।", rating: 4, date: "০৫ মার্চ ২০২৬" },
  ],
  "sulphur-200": [
    { name: "রহিমা বেগম", location: "ঢাকা", text: "দীর্ঘদিনের চুলকানি সমস্যা সম্পূর্ণ সেরে গেছে। অত্যন্ত কৃতজ্ঞ!", rating: 5, date: "১২ মার্চ ২০২৬" },
    { name: "মোস্তফা কামাল", location: "খুলনা", text: "ত্বকের র‍্যাশ ১ মাসে অনেক কমেছে। ডাক্তারকে ধন্যবাদ।", rating: 5, date: "০৮ মার্চ ২০২৬" },
    { name: "শামীমা আক্তার", location: "সিলেট", text: "একজিমায় ভালো কাজ করেছে। ধৈর্য ধরে ব্যবহার করতে হয়।", rating: 4, date: "০১ মার্চ ২০২৬" },
  ],
  "nux-vomica-30": [
    { name: "ফাতেমা খাতুন", location: "রাজশাহী", text: "গ্যাস ও অম্বল সমস্যায় ম্যাজিকের মতো কাজ করেছে!", rating: 5, date: "১৪ মার্চ ২০২৬" },
    { name: "আনোয়ার হোসেন", location: "বরিশাল", text: "পেটের সমস্যা অনেক কমেছে। খুবই সন্তুষ্ট।", rating: 5, date: "০৯ মার্চ ২০২৬" },
    { name: "রুবিনা ইয়াসমিন", location: "ঢাকা", text: "কোষ্ঠকাঠিন্য সমস্যায় দারুণ কাজ করেছে।", rating: 4, date: "০৩ মার্চ ২০২৬" },
  ],
  "thuja-200": [
    { name: "হাসান মাহমুদ", location: "চট্টগ্রাম", text: "আঁচিল ২ মাসে পুরোপুরি চলে গেছে। অবিশ্বাস্য!", rating: 5, date: "১১ মার্চ ২০২৬" },
    { name: "সুমাইয়া বেগম", location: "ঢাকা", text: "মেয়ের আঁচিলে ব্যবহার করেছি, খুব ভালো ফলাফল।", rating: 5, date: "০৬ মার্চ ২০২৬" },
    { name: "রফিকুল ইসলাম", location: "রংপুর", text: "ধৈর্য ধরে ব্যবহার করলে কাজ হয়। আমি সন্তুষ্ট।", rating: 4, date: "২৮ ফেব্রু ২০২৬" },
  ],
  "phosphorus-30": [
    { name: "কামরুল হাসান", location: "সিলেট", text: "দীর্ঘদিনের কাশি অনেক কমেছে।", rating: 5, date: "১৩ মার্চ ২০২৬" },
    { name: "নাজমা আক্তার", location: "ঢাকা", text: "শ্বাসকষ্টে উপশম পেয়েছি।", rating: 4, date: "০৭ মার্চ ২০২৬" },
  ],
  "jaborandi-q": [
    { name: "করিম উদ্দিন", location: "চট্টগ্রাম", text: "৩ মাসে চুল পড়া অনেক কমেছে। দারুণ ফলাফল!", rating: 5, date: "১৫ মার্চ ২০২৬" },
    { name: "তানিয়া আক্তার", location: "ঢাকা", text: "নতুন চুল গজাতে শুরু করেছে। খুব খুশি!", rating: 5, date: "১০ মার্চ ২০২৬" },
    { name: "সাইফুল ইসলাম", location: "রাজশাহী", text: "চুলের গোড়া মজবুত হয়েছে। নিয়মিত ব্যবহার করছি।", rating: 4, date: "০৪ মার্চ ২০২৬" },
    { name: "মারুফা বেগম", location: "খুলনা", text: "খুশকি সমস্যা পুরোপুরি সেরে গেছে!", rating: 5, date: "০১ মার্চ ২০২৬" },
  ],
  "calc-phos-6x": [
    { name: "সালাম মিয়া", location: "সিলেট", text: "ছেলের হাড়ের সমস্যায় দারুণ কাজ করেছে।", rating: 5, date: "১২ মার্চ ২০২৬" },
    { name: "আয়েশা সিদ্দিকা", location: "ঢাকা", text: "বাচ্চার দাঁত উঠতে সাহায্য করেছে।", rating: 5, date: "০৫ মার্চ ২০২৬" },
    { name: "জাকির হোসেন", location: "বরিশাল", text: "হাড়ের ব্যথা কমেছে। ভালো ঔষধ।", rating: 4, date: "২৫ ফেব্রু ২০২৬" },
  ],
};

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
