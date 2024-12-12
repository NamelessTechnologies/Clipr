// import { useEffect, useState } from "react";

function LoadingSpinner () {
    // const [spinnerImgPath,setSpinnerImgPath] = useState("https://clipr-bucket.s3.us-east-1.amazonaws.com/herta-kurukuru.gif");
    // console.log(spinnerImgPath);
    // setSpinnerImgPath(spinnerImgPath);
    // const basePool = [
    //     'https://clipr-bucket.s3.us-east-1.amazonaws.com/herta-kurukuru.gif',
    //     'https://clipr-bucket.s3.us-east-1.amazonaws.com/mako-growing.gif',
    //     'https://clipr-bucket.s3.us-east-1.amazonaws.com/among-us.gif',
    //     'https://clipr-bucket.s3.us-east-1.amazonaws.com/texas-watching.gif',
    //     'https://clipr-bucket.s3.us-east-1.amazonaws.com/patting-chris.gif',
    //     'https://clipr-bucket.s3.us-east-1.amazonaws.com/aris-dance.gif',
    //     'https://clipr-bucket.s3.us-east-1.amazonaws.com/bocchi-chase.gif',
    //     'https://clipr-bucket.s3.us-east-1.amazonaws.com/korone.gif',
    //     'https://clipr-bucket.s3.us-east-1.amazonaws.com/pay-up.gif',
    //     'https://clipr-bucket.s3.us-east-1.amazonaws.com/shiroko-dance.gif',
    //     'https://clipr-bucket.s3.us-east-1.amazonaws.com/suisei-dance.gif',
    //     'https://clipr-bucket.s3.us-east-1.amazonaws.com/w-dance.gif',
    //     'https://clipr-bucket.s3.us-east-1.amazonaws.com/yui-roll.gif'
    // ];

    // function getRandomLoadingAnimation() {
    //     return basePool[Math.floor(Math.random() * basePool.length)];
    // }

    const hertaPath = 'https://clipr-bucket.s3.us-east-1.amazonaws.com/herta-kurukuru.gif';

    // useEffect(() => {
    //     // setSpinnerImgPath(getRandomLoadingAnimation);
    //     // console.log("spinner path: " + hertaPath);
    // }, []);

    return (
        <div className='fixed top-0 w-screen left-0 h-screen bg-black bg-opacity-90 z-50 flex items-center justify-center'>

            <div className='w-1/3 h-1/2 flex items-center justify-center'>
                <div className='flex-col items-center justify-center'>
                <div className='w-full text-white mx-auto text-center text-4xl mb-10'>File Uploading...</div>
                    <img
                    src={hertaPath}
                    className='rounded-md w-36 h-36  mx-auto '>
                    </img>
                </div>
            </div>
        </div>
    );
}

export {LoadingSpinner};