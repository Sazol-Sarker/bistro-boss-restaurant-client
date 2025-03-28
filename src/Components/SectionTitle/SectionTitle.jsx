
const SectionTitle = ({subHeading,heading}) => {
    return (
        <div className="my-2 py-4 mx-auto text-center md:w-2/6">
            <p className="text-lg italic text-[#D99904]  pb-2">---{subHeading}---</p>
            <h3 className="text-2xl uppercase border-y-2 py-4">{heading}</h3>
        </div>
    );
};

export default SectionTitle;