import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import featuredImg from "../../../../assets/home/featured.jpg";

const FeaturedItem = () => {
  return (
    <div style={{ backgroundImage: `url(${featuredImg})` ,opacity:0.8}} className="bg-fixed bg-slate-700">
      <SectionTitle
        subHeading={"Check it out"}
        heading={"FROM OUR MENU"}
        color={"text-white"}
      ></SectionTitle>

      <div className="flex flex-col md:flex-row gap-2 items-center justify-center py-20">
        <div>
          <img src={featuredImg} alt="featuredItem" className="w-96 h-96 ml-5 md:ml-20" />
        </div>

        <div className="w-1/2 text-white ml-16">
          <p>March 20, 2023</p>
          <h3>WHERE CAN I GET SOME?</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi porro
            aliquid exercitationem accusantium quia expedita vero, explicabo
            minima quidem, repellat sapiente hic blanditiis, atque dolores
            suscipit obcaecati. Fugiat, esse aut.
          </p>
          <button className="my-2 border-b-4 p-1 rounded-lg border-white">Read More</button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedItem;
