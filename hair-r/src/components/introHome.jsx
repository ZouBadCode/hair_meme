import React from 'react';
const IntroHome = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-4xl font-bold">What CAN</h1>
                <h2 className="area">$HAIR</h2>
                <p>DO?</p>
            </div>
            <div className="flex flex-row items-center mt-12 rounded-lg hover:bg-opacity-50 hover:bg-black transition-all duration-500">
                <div className="m-8">
                <video autoPlay loop muted className="w-32 h-32 rounded-lg shadow-lg">
                        <source src="/assets/SPIN.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="m-8">
                    <p className='text-slate-800'>GET SOME<br /> <i className="text-purple-500 bold">FANCY</i></p>
                    <p className='text-slate-800'>HAIR FOR YOUR CHARMING HEAD</p>
                </div>
            </div>
            <div className="flex flex-row items-center mt-12 rounded-lg hover:bg-opacity-50 hover:bg-slate-300 transition-all duration-500">
                <div className="m-8">
                    <p className='text-slate-800'>Participate in our token economy (Coming soon) which foster with $HAIR!</p>
                </div>
            </div>
        </div>
    );
};

export default IntroHome;
