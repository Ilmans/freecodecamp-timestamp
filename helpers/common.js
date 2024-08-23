const fs = require("fs");
const path = require("path");

// Function to manage local file storage (File data.json)
function fileManager(action, input) {
  const filePath = path.join(__dirname, "public", "data.json");

  // Ensure the directory exists
  if (!fs.existsSync(path.dirname(filePath))) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
  }

  // Check if file exists, create if not
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]");
  }

  // Read file data.json
  const fileContent = fs.readFileSync(filePath, "utf8");
  let data = fileContent ? JSON.parse(fileContent) : [];

  if (action === "save" && input) {
    // Check if input.original_url already exists
    const exists = data.some(
      (item) => item.original_url === input.original_url
    );
    if (!exists) {
      data.push(input);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }
  } else if (action === "load") {
    return data;
  }
}

// Function to generate random short URL using Math.random()
function createShortUrl() {
  const data = fileManager("load");
  const max = data.length ? data.length * 1000 : 1000;
  let shortUrl;

  do {
    shortUrl = Math.floor(Math.random() * max) + 1;
  } while (data.some((item) => item.short_url === shortUrl));

  return shortUrl;
}

module.exports = { fileManager, createShortUrl };
