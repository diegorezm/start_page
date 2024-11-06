import icon1 from "@/assets/icons/icon.png";
import icon2 from "@/assets/icons/icon2.png";
import icon3 from "@/assets/icons/icon3.png";

import {random} from "@/lib/random";

import {useState, useEffect} from "react";

export const MiddleIconContainer = () => {
  const [icon, setIcon] = useState(icon1);

  useEffect(() => {
    const icons = [icon1, icon2, icon3];
    setIcon(icons[random(0, icons.length - 1)]);
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center hover:rotate-180 hover:cursor-pointer delay-200 transition-all">
      <img src={icon.src} alt="icon" width={100} height={100} className="bg-primary rounded-full h-32 w-32" />
    </div>
  );
}

