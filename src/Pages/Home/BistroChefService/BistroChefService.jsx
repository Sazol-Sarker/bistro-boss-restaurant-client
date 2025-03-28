import chefServiceImage from "../../../assets/home/chef-service.jpg";

const BistroChefService = () => {
  return (
    <div className="my-10">
    {/* need to study styling  */}
      {/* <div
        className="my-10 relative"
        style={{
          backgroundImage: `url(${chefServiceImage}`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "400px",
        }}
      >
        <div className="bg-white absolute">
          <h2 className="text-3xl uppercase">Bistro Boss</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
            veritatis totam harum! Assumenda debitis sed mollitia atque porro
            expedita laboriosam temporibus, facilis ad dolorem. Velit,
            blanditiis quaerat. Beatae provident voluptatibus sit ex pariatur
            eius quo, voluptates praesentium sint voluptas repellendus fuga
            quaerat hic suscipit accusantium architecto, deserunt culpa iure
            dicta!
          </p>
        </div>
      </div> */}

      {/* *********working fine */}
      <div
        className="my-10 w-5/8 mx-auto relative h-[400px] flex items-center justify-center"
        style={{
          backgroundImage: `url(${chefServiceImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute w-3/4 mx-auto bg-white p-6 text-center  shadow-lg rounded-md">
          <h2 className="text-3xl uppercase mb-3">Bistro Boss</h2>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
            veritatis totam harum! Assumenda debitis sed mollitia atque porro
            expedita laboriosam temporibus, facilis ad dolorem. Velit,
            blanditiis quaerat. Beatae provident voluptatibus sit ex pariatur
            eius quo, voluptates praesentium sint voluptas repellendus fuga
            quaerat hic suscipit accusantium architecto, deserunt culpa iure
            dicta!
          </p>
        </div>
      </div>
    </div>
  );
};

export default BistroChefService;
