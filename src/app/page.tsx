import Customers from "@/components/customers";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import OurChef from "@/components/our-chef";
import SpecialDish from "@/components/special-dish";
import Subscribe from "@/components/subscribe";

export default function Home() {
  return (
    <div className="grid gap-y-10 px-2 mb-10">
      <Hero />
      <SpecialDish />
      <OurChef />
      <div className="bg-gray-200 grid">
        <Customers />
        <Subscribe />
      </div>
      <Footer />
    </div>
  );
}
