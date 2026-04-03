import { useEffect, useRef } from "react";

export default function useScrollAnimation(className = "animate-fadeup") {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ref.current.classList.remove("opacity-0");
          ref.current.classList.add(className);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px" // ← this is the fix!
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return ref;
}