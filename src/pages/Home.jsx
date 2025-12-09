// Home.jsx
import Categories from "../components/Categories";
import Hero from "../components/Hero";
import Menus from "../components/Menus";
import NewsLetter from "../components/NewsLetter";
import Testimonial from "../components/Testimonial";

const Home = () => {
  return (
    <main>
      <Hero />
      <Categories />
      <Menus />
      <NewsLetter />
      <Testimonial />
    </main>
  );
};

export default Home;
