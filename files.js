const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");
const dataValidate = require("./helpers/dataValidator");
const checkExtention = require("./helpers/checkExtention");

const createFile = async (fileName, content) => {
  const file = {
    fileName,
    content,
  };

  const validatedFile = dataValidate(file);
  if (validatedFile.error) {
    console.log(
      chalk.red(
        `Please specify ${validatedFile.error.details[0].path[0]} parameter.`
      )
    );
    return;
  }

  const check = checkExtention(fileName);
  if (!check.result) {
    console.log(
      chalk.red(
        `Sorry, this app doesn't support files with ${check.extention} extention.`
      )
    );
    return;
  }

  const filePath = path.join(__dirname, `files`, fileName);
  try {
    await fs.writeFile(filePath, content, "utf-8");
    console.log(chalk.green("File created succesfully!"));
  } catch (error) {
    console.log(chalk.red(error));
  }
};

module.exports = {
  createFile,
};
