import { Shield, Award, Heart, Users } from "lucide-react";

const About = () => (
  <div className="container py-8">
    <h1 className="text-2xl font-bold text-foreground md:text-3xl">আমাদের সম্পর্কে</h1>
    <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
      হোমিওকেয়ার বাংলাদেশের সেরা হোমিওপ্যাথিক ঔষধের অনলাইন শপ। আমরা ১০০% আসল ও কার্যকর হোমিওপ্যাথিক ঔষধ সরাসরি আপনার ঘরে পৌঁছে দিই।
      আমাদের অভিজ্ঞ ডাক্তারগণ আপনার সমস্যা অনুযায়ী সঠিক ঔষধ নির্বাচন করে দেন।
    </p>

    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {[
        { icon: Shield, title: "১০০% আসল ঔষধ", desc: "আমরা শুধুমাত্র প্রমাণিত ও আসল হোমিওপ্যাথিক ঔষধ বিক্রি করি।" },
        { icon: Award, title: "১০+ বছরের অভিজ্ঞতা", desc: "হোমিওপ্যাথিক চিকিৎসায় আমাদের এক দশকের বেশি অভিজ্ঞতা।" },
        { icon: Heart, title: "গ্রাহক সন্তুষ্টি", desc: "হাজারো সন্তুষ্ট গ্রাহক আমাদের সেবায় খুশি।" },
        { icon: Users, title: "বিশেষজ্ঞ টিম", desc: "BHMS ও DHMS ডিগ্রিধারী অভিজ্ঞ ডাক্তারদের টিম।" },
      ].map((item) => (
        <div key={item.title} className="rounded-xl border border-border bg-card p-6 text-center shadow-card">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <item.icon className="h-6 w-6 text-primary" />
          </div>
          <h3 className="mt-4 font-semibold text-foreground">{item.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
        </div>
      ))}
    </div>

    <div className="mt-12 rounded-2xl gradient-primary p-8 text-center">
      <h2 className="text-xl font-bold text-primary-foreground md:text-2xl">আমাদের লক্ষ্য</h2>
      <p className="mt-3 mx-auto max-w-xl text-sm text-primary-foreground/80">
        প্রতিটি মানুষের কাছে সাশ্রয়ী মূল্যে আসল ও কার্যকর হোমিওপ্যাথিক চিকিৎসা পৌঁছে দেওয়া। পার্শ্বপ্রতিক্রিয়াহীন প্রাকৃতিক চিকিৎসায় সুস্থ বাংলাদেশ গড়ে তোলা।
      </p>
    </div>
  </div>
);

export default About;
