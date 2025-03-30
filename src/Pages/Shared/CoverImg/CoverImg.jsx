import { Parallax, Background } from "react-parallax";

const CoverImg = ({heading,subHeading,coverImg,height="h-[500px]",uppercase=false}) => {
  return (
    <Parallax
      blur={{ min: -50, max: 50 }}
      bgImage={coverImg}
      bgImageAlt="the dog"
      strength={-200}
    >
      <div
        className={`hero ${height} bg-cover`}
        style={{
          backgroundImage: `url:${coverImg}`,
        }}
      >
        <div className="hero-overlay w-4/5 h-2/5 bg-opacity-70"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md mt-5">
            <h1 className="mb-5 text-5xl font-bold uppercase">{heading}</h1>
            <p className={`mb-5 ${uppercase?"uppercase":"lowercase"}`}>
              {subHeading}
            </p>
            
          </div>
        </div>
      </div>
    </Parallax>
  );
};

export default CoverImg;
