import featuredImg from "../../../assets/home/featured.jpg";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const FeaturedItem = () => {
  return (
    <div
      style={{ backgroundImage: `url(${featuredImg})`, opacity: 0.9 }}
      className="bg-fixed bg-slate-700/60  bg-cover"
    >
      <SectionTitle
        subHeading={"Check it out"}
        heading={"FROM OUR MENU"}
        color={"text-white"}
      ></SectionTitle>

      {/* bg-slate-500/40 */}
      <div className="bg-slate-700/60 flex flex-col  md:flex-row gap-2 items-center justify-center py-20">
        <div>
          <img
            src={featuredImg}
            alt="featuredItem"
            className="w-96 h-96  md:ml-20"
          />
        </div>

        <div className="w-1/2  text-white ml-16 md:ml-24">
          <p>March 20, 2023</p>
          <h3>WHERE CAN I GET SOME?</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi porro
            aliquid exercitationem accusantium quia expedita vero, explicabo
            minima quidem, repellat sapiente hic blanditiis, atque dolores
            suscipit obcaecati. Fugiat, esse aut.
          </p>
          <button className="my-2 border-b-4 p-1 rounded-lg border-white">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedItem;
