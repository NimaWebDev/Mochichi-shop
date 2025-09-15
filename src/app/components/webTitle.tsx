"use client"

import BlurText from "./animation/webTitleAnimation"

function WebTitle (){

    const handleAnimationComplete = () => {
    console.log('Animation completed!');
    };

    return(
        <div>
            <h1 className="sm:text-[28px] sm:font-semibold lg:text-[45px] lg:font-bold text-black text-center">
                <BlurText
                    text="فروشگاه اکسسوری های خاص"
                    animateBy="words"
                    direction="top"
                    delay={150}
                    className="inline-block [&>span:nth-child(2)]:text-[#FF6687]"
                />
            </h1>
        </div>
    )
}

export default WebTitle