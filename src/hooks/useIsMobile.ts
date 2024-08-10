import { useEffect, useState } from 'react';

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState({
        Android: false,
        BlackBerry: false,
        IOS: false,
        Opera: false,
        Windows: false,
        any: false,
    });

    useEffect(() => {
        const checkMobile = {
            Android: () => navigator.userAgent.match(/Android/i) !== null,
            BlackBerry: () => navigator.userAgent.match(/BlackBerry/i) !== null,
            IOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i) !== null,
            Opera: () => navigator.userAgent.match(/Opera Mini/i) !== null,
            Windows: () => navigator.userAgent.match(/IEMobile/i) !== null,
        };

        setIsMobile({
            Android: checkMobile.Android(),
            BlackBerry: checkMobile.BlackBerry(),
            IOS: checkMobile.IOS(),
            Opera: checkMobile.Opera(),
            Windows: checkMobile.Windows(),
            any:
                checkMobile.Android() ||
                checkMobile.BlackBerry() ||
                checkMobile.IOS() ||
                checkMobile.Opera() ||
                checkMobile.Windows(),
        });
    }, []);

    return isMobile;
};

export default useIsMobile;
