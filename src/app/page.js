import BannerSection from "@/components/Banner";
import ContactUs from "@/components/ContactUs";
import FAQSectionAlt from "@/components/FAQSection";
import FeaturesSection from "@/components/FeaturdSection";
import Testimonials from "@/components/Testimonials";
import WhyDonateSection from "@/components/WhyDonateSection";

export default function Home() {
  return (
    <div>
      <BannerSection />
      <FeaturesSection />
      <WhyDonateSection/>
      <Testimonials/>
      <FAQSectionAlt/>
      <ContactUs />
    </div>
  );
}
