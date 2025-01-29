import {useEffect, useState} from "react";

import {IconComponent} from "./icon";

const getCurrentTime = () => {
  const lang = () => {
    if (typeof navigator !== 'undefined') {
      return navigator.language;
    }
    return 'pt-BR';
  }

  const date = new Date();
  return date.toLocaleTimeString(lang(), {hour: '2-digit', minute: '2-digit'});
}

export const ClockComponent = () => {
  const [currentTime, setCurrentTime] = useState(getCurrentTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center gap-2">
      <IconComponent icon="Clock" size="sm" />
      <span className="text-2xl">{currentTime}</span>
    </div>
  );
}
