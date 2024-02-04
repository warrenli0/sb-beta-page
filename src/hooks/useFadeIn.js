import { useState, useRef, useEffect } from "react";

const useFadeIn = (refEl) => {
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            setIsIntersecting(entry.isIntersecting);
          },
          { threshold: 0.2 }
        );
        observer.observe(refEl.current);
    
        return () => observer.disconnect();
    }, [isIntersecting]);

    useEffect(() => {
        if (isIntersecting) {
            refEl.current.querySelectorAll(".hidden, .hidden2, .hidden3").forEach((el) => {
            el.classList.add("show");
          });
        } 
      }, [isIntersecting]);
}

export default useFadeIn;