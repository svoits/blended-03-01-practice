const fs = require("fs/promises");
const path = require("path");
const dataValidate = require("./helpers/dataValidator");
const checkExtention = require("./helpers/checkExtention");

const createFile = async (req, res) => {
  const { fileName, content } = req.body;
  const validatedFile = dataValidate(req.body);

  if (validatedFile.error) {
    res.status(400).json({
      message: `Please specify ${validatedFile.error.details[0].path[0]} parameter.`,
    });
    return;
  }

  const check = checkExtention(fileName);

  if (!check.result) {
    res.status(400).json({
      message: `Sorry, this app doesn't support files with ${check.extention} extention.`,
    });
    return;
  }

  const filePath = path.join(__dirname, `files`, fileName);

  try {
    await fs.writeFile(filePath, content, "utf-8");
    res.status(201).json({
      message: "File created succesfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error." });
  }
};

const getFiles = async (req, res) => {
  try {
    const folderPath = path.join(__dirname, "files");

    const filesList = await fs.readdir(folderPath);

    if (!filesList.length) {
      res.status(404).json({
        message: "Files not exist",
      });
    } else {
      res.status(200).json(filesList);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error." });
  }
};

const getInfo = async (req, res) => {
  const { fileName } = req.params;
  try {
    const folderPath = path.join(__dirname, "files");
    const filesList = await fs.readdir(folderPath);

    if (!filesList.includes(fileName)) {
      res.status(404).json({
        message: `File ${fileName} not exist`,
      });
      return;
    }

    const filePath = path.join(__dirname, "files", fileName);
    const file = await fs.readFile(filePath, "utf-8");
    const stats = await fs.stat(filePath, "utf-8");

    res.status(200).json({
      name: path.basename(fileName, path.extname(fileName)),
      extention: path.extname(fileName).slice(1),
      content: file,
      createdAt: stats.birthtime.toString(),
      size: stats.size,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = {
  createFile,
  getFiles,
  getInfo,
};
