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

const getFiles = async () => {
  try {
    const folderPath = path.join(__dirname, "files");

    const filesList = await fs.readdir(folderPath);

    if (!filesList.length) {
      console.log(chalk.red("Files not exist"));
    } else {
      console.log(filesList);
    }
  } catch (error) {
    console.log(chalk.red(error));
  }
};

const getInfo = async (fileName) => {
  try {
    const folderPath = path.join(__dirname, "files");
    const filesList = await fs.readdir(folderPath);

    if (!filesList.includes(fileName)) {
      console.log(chalk.red(`File ${fileName} not exist`));
      return;
    }

    const filePath = path.join(__dirname, "files", fileName);
    const file = await fs.readFile(filePath, "utf-8");
    const stats = await fs.stat(filePath, "utf-8");

    console.log({
      name: path.basename(fileName, path.extname(fileName)),
      extention: path.extname(fileName).slice(1),
      content: file,
      createdAt: stats.birthtime.toString(),
      size: stats.size,
    });
  } catch (error) {
    console.log(chalk.red(error));
  }
};

module.exports = {
  createFile,
  getFiles,
  getInfo,
};
