import userWallpaper from "../context/wallpaper-context";

const STORAGE_KEY = "wallpaper";

const useWallpaper = () => {
  const saveWallpaper = () => {
    const currentWallpaper = userWallpaper.value;
    if (currentWallpaper) {
      localStorage.setItem(STORAGE_KEY, currentWallpaper);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const loadWallpaper = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      userWallpaper.value = data;
    } else {
      userWallpaper.value = null;
    }
    return userWallpaper.value;
  };

  const setWallpaper = (url: string) => {
    userWallpaper.value = url;
    saveWallpaper();
  };

  const removeWallpaper = () => {
    userWallpaper.value = null;
    saveWallpaper();
  };

  return {
    loadWallpaper,
    saveWallpaper,
    setWallpaper,
    removeWallpaper,
  };
};
export default useWallpaper;
