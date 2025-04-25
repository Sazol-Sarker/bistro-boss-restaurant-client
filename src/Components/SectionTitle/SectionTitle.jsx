
const SectionTitle = ({subHeading,heading,color="text-black"}) => {
    
    return (
        <div className="w-3/4 md:w-1/3 mx-auto my-2 py-4  text-center ">
            <p className="text-md italic text-[#D99904]  pb-2">---{subHeading}---</p>
            <h3 className={`text-xl md:text-2xl uppercase border-y-2 py-4 ${color} `}>{heading}</h3>
        </div>
    );
};

export default SectionTitle;