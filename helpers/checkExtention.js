const checkExtention = (fileName) => {
  const EXTENTIONS = ["txt", "js", "json", "html", "css"];
  const splittedFileName = fileName.split(".");
  const extention = splittedFileName[splittedFileName.length - 1];
  const isExtentionExists = EXTENTIONS.includes(extention);

  return {
    extention,
    result: isExtentionExists,
  };
};

module.exports = checkExtention;
