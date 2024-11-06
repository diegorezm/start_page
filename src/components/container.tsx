import {useWallpaperStore} from "@/features/wallpaper/wallpaper-store";
import {useEffect, useRef} from "react";

export const Container = ({children}: {children: React.ReactNode}) => {
  const {url} = useWallpaperStore();

  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current) {
      if (!url) {
        container.current.style.backgroundImage = "";
      } else {
        container.current.style.backgroundImage = `url(${url})`;
      }
    }
  }, [url]);

  return (
    <div
      ref={container}
      className="img_container bg-background relative flex flex-col items-center justify-center w-full h-screen overflow-y-auto" style={{
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}>
      {url && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      )}
      <main className="relative z-10 w-full h-full space-y-5 lg:space-y-20">
        {children}
      </main>
    </div>
  );
}
