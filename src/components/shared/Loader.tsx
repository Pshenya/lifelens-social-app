import Lottie from 'lottie-react';
import lottie_loader from '../../../public/assets/animations/lottie_loader.json'

type LoaderProps = {
    lottie?: boolean;
}

const Loader = ({ lottie = true }: LoaderProps ) => {
    if (lottie) {
        return (
            <div className='flex-center w-full h-[100vh] md:h-full'>
                <Lottie
                    animationData={lottie_loader}
                    loop={true}
                    className='size-[150px]'
                />
            </div>
        )
    }

    return (
        <div className='flex-center w-full h-[100vh] md:h-full'>
            <img
                src="/assets/icons/loader.svg"
                alt="loader"
                width={24}
                height={24}
            />
        </div>
    )
}

export default Loader;
