import loaderBg from '../../assets/others/cupcake-dribbble.gif'
const LoaderImage = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <img src={loaderBg} alt="loaderBg" className='w-full' />
        </div>
    );
};

export default LoaderImage;