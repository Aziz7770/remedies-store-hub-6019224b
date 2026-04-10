import { useParams } from "react-router-dom";
import { products } from "@/data/products";
import ProductLanding from "@/pages/ProductLanding";
import NotFound from "@/pages/NotFound";

const SlugRouter = () => {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);

  if (product) {
    return <ProductLanding />;
  }

  return <NotFound />;
};

export default SlugRouter;
