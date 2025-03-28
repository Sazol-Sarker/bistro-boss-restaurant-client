import Banner from "../Banner/Banner";
import Category from "../Category/Category";

const Home = () => {
    return (
        <div className="mb-5">
            {/* <h2>Home page</h2> */}
            <Banner></Banner>
            <Category></Category>
        </div>
    );
};

export default Home;