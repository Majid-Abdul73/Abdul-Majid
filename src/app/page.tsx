import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Services from "@/components/home/Services";
import Blog from "@/components/home/Blog";
import FeaturedCourses from "@/components/home/freaturedCourses"

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <FeaturedCourses />
      <Blog />
    </>
  );
}
