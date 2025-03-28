import Banner from "../Banner/Banner";
import BistroChefService from "../BistroChefService/BistroChefService";
import CallUs from "../CallUs/CallUs";
import Category from "../Category/Category";
import PopularMenu from "../PopularMenu/PopularMenu";
import Recommendation from "../Recommendation/Recommendation";
import Testimonials from "../Testimonials/Testimonials";
import FeaturedItem from "./FeaturedItem/FeaturedItem";

const Home = () => {
    return (
        <div className="mb-5">
            {/* <h2>Home page</h2> */}
            <Banner></Banner>
            <Category></Category>
            <BistroChefService></BistroChefService>
            <PopularMenu></PopularMenu>
            <CallUs></CallUs>
            <Recommendation></Recommendation>
            <FeaturedItem></FeaturedItem>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;