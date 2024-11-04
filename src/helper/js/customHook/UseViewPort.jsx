import { useEffect, useState } from "react";

const UseViewPort = () => {
    const [viewport, setViewPort] = useState(window.innerWidth)


    useEffect(() => {
        const changeViewPort = () => {
            setViewPort(window.innerWidth)
        }
        window.addEventListener('resize', changeViewPort())
        return () => {
            window.addEventListener('resize', changeViewPort())
        };
    }, []);
    return viewport;
}

export default UseViewPort;