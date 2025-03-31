import "./FoodCard.css";
const FoodCard = ({ item }) => {
  const { name, recipe, image, price } = item;
  return (
    <div className="card card-compact bg-base-100 border-2 border-gray-800 w-80 md:w-96 shadow-xl">
      <figure>
        <img src={image} alt={name} className="w-full" />
      </figure>
      <p className="bg-[#111827] text-white right-0 absolute mr-4 mt-4 px-4 py-2 rounded-sm">
        ${price}
      </p>
      <div className="card-body">
        <h2 className="card-title flex justify-center ">{name}</h2>

        <p>{recipe}</p>
        {/* <div className="card-actions justify-center">
          <button className="btn btn-primary uppercase">add to cart</button>
        </div> */}
        <button className="btn w-1/2 mx-auto mt-5 text-[#BB8506] hover:bg-[#1F2937] border-b-2 border-0 border-[#BB8506]">
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
