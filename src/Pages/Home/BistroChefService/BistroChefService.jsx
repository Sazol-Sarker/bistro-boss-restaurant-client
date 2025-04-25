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
        className="my-10 bg-fixed bg-cover w-5/8 mx-auto relative h-[400px] flex items-center justify-center"
        style={{
          backgroundImage: `url(${chefServiceImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute w-3/4 mx-auto bg-white p-6 text-center  shadow-lg rounded-md">
          <h2 className="text-xl md:text-2xl lg:text-3xl uppercase mb-3">
            Bistro Boss
          </h2>
          <p className="text-gray-700 italic">
            <b className="text-green-800">Welcome to Bistro Boss</b>, where exceptional flavors meet a cozy,
            inviting atmosphere. <br /> At Bistro Boss, we believe that every meal should be an
            experience, not just a meal. <br /> Visit us today and indulge in our
            exquisite offerings that are sure to delight your taste buds!

            {/* \ Our menu is a fusion of mouth-watering dishes,
            carefully crafted by expert chefs using only the finest ingredients.
            Whether you're craving a delicious salad, a hearty main course, or a
            tempting dessert, we have something to satisfy every palate. Enjoy a
            memorable dining experience with our welcoming service and charming
            ambiance.  */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BistroChefService;
