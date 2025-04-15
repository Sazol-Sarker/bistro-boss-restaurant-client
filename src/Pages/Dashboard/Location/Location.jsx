import { FaMapLocation, FaPhone, FaStopwatch } from "react-icons/fa6";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { FaMap, FaTimesCircle } from "react-icons/fa";

const Location = () => {
  return (
    <div className=" w-10/12 mx-auto">
      <SectionTitle
        heading={"OUR LOCATION"}
        subHeading={"Visit Us"}
      ></SectionTitle>

      <div className="flex gap-x-2 items-center justify-center max-h-screen mb-10">
        {/* left */}
        <div className="flex-1 flex flex-col items-center  h-52 ">
          <div className="bg-[#D1A054] text-white py-5 w-full flex flex-col items-center">
            <FaPhone  className="text-xl"></FaPhone>
          </div>
          <div className="flex flex-col items-center mt-5 bg-[#uppercase font-semibold]">
            <h2 className="uppercase font-semibold text-[20px]">Phone</h2>
            <p>(+880) 156972265949</p>
          </div>
        </div>
        {/* middle */}
        <div className="flex-1 flex flex-col items-center  h-52 ">
          <div className="bg-[#D1A054] text-white py-5 w-full flex flex-col items-center">
            <FaMapLocation className="text-xl"></FaMapLocation>
          </div>
          <div className="flex flex-col items-center mt-5 bg-[#uppercase font-semibold]">
            <h2 className="uppercase font-semibold text-[20px]">ADDRESS</h2>
            <p>Road No.2, Gulshan, Dhaka</p>
          </div>
        </div>
        {/* right */}
        <div className="flex-1 flex flex-col items-center  h-52">
          <div className="bg-[#D1A054] text-white py-5 w-full flex flex-col items-center">
            <FaStopwatch  className="text-xl"></FaStopwatch>
          </div>
          <div className="flex flex-col items-center mt-5 bg-[#uppercase font-semibold]">
            <h2 className="uppercase font-semibold text-[20px]">Working Hours</h2>
            <p>Mon - Fri: 08:00 - 22:00</p>
            <p>Sat - Sun: 10:00 - 23:00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
