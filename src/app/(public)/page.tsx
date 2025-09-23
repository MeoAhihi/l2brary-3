import ActivitySection from "@/components/guest/activity.section";
import { FeaturesSection } from "@/components/guest/features.section";
import HeroSection from "@/components/guest/hero.section";

export default function Home() {
  return (
    <div className="flex w-full flex-col">
      <HeroSection />
      <FeaturesSection />
      <ActivitySection />
    </div>
  );
}
