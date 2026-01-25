import { useEffect, useRef, useState } from "react";

const expValues = [
  {
    name: "Recipes",
    amount: "1000",
  },
  {
    name: "Certified Chef",
    amount: "500",
  },
  {
    name: "Visitor Satisfaction Rate",
    amount: "90",
  },
  {
    name: "Years of Experience",
    amount: "5",
  },
];

const CountUpAnimation = ({ target, symbol }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, target]);

  return (
    <div
      ref={ref}
      className="text-5xl font-bold text-inherit leading-none flex gap-1"
    >
      {count}
      {symbol}
    </div>
  );
};

const Experiences = () => {
  const getSymbol = (name) => {
    if (name.toLowerCase().includes("rate")) return "%";
    return "+";
  };

  return (
    <div className="w-full h-auto">
      <ul className="w-full grid xs:grid-cols-2 md:grid-cols-4 gap-8">
        {expValues.map((exp, index) => (
          <li key={index} className="w-full h-auto">
            <CountUpAnimation
              target={exp.amount}
              symbol={getSymbol(exp.name)}
            />
            <p className="text-stone-600 mt-4">{exp.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Experiences;
