import { Parallax, Background } from "react-parallax";

const CoverImg = ({
  heading,
  subHeading,
  coverImg,
  height = "h-[500px] ",
  uppercase = false,
}) => {
  return (
    <Parallax
      blur={{ min: -30, max: 30 }}
      bgImage={coverImg}
      bgImageAlt="the dog"
      strength={-200}
    >
      <div
        // ${height}
        className={`hero w-full h-[500px] md:h-[600px] lg:h-[700px] bg-cover bg-center`}
        style={{
          backgroundImage: `url:${coverImg}`,
        }}
      >
        <div className="hero-overlay w-full flex items-center justify-center bg-black bg-opacity-70">
          <div className="hero-content w-full flex items-center justify-center text-neutral-content text-center">
            <div className=" mt-2 md:mt-5 w-full">
              <h1 className="mb-5 text-2xl md:text-3xl lg:text-4xl font-bold uppercase">
                {heading}
              </h1>
              <p
                className={`mb-5 text-md md:text-lg lg:text-xl ${
                  uppercase ? "uppercase" : "lowercase"
                }`}
              >
                {subHeading}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Parallax>
  );
};

export default CoverImg;
