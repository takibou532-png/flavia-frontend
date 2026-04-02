import { useEffect, useRef, useState } from "react";

export default function AnimateOnScroll({ children, animation , delay = 0 }) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(ref.current); 
        }
      },
      { threshold: 0.2 } 
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.6s ease ${delay}s`,
      }}
      className={visible ? animation : ""}
    >
      {children}
    </div>
  );
}