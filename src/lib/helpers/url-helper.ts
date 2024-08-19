const urlHelper = () => {
  const isURL = (str: string) => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i",
    );

    return !!pattern.test(str);
  };

  const isImageURL = (str: string) => {
    const imagePattern = /\.(jpeg|jpg|gif|png|webp|bmp)$/i;
    return !!imagePattern.test(str);
  };

  return {
    isURL,
    isImageURL,
  };
};

export default urlHelper;
