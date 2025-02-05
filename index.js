const express = require("express");
const path = require("path");
const {
  getRandomImageCaption,
  addCaption,
  changeVotes,
} = require("./datalayer");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const { image, caption, captionNumber, votes } = getRandomImageCaption();
  const imagePath = `${image}`;
  res.render("index", { image: imagePath, caption, captionNumber, votes });
});

app.post("/add-caption", (req, res) => {
  const { imageName, captionText } = req.body;
  addCaption(imageName, captionText);
  console.log("Caption added:", captionText);
  console.log("Image name:", imageName);
  res.redirect("/");
});

app.post("/change-votes", (req, res) => {
  const { imageName, captionNumber, voteChange } = req.body;
  changeVotes(imageName, captionNumber, parseInt(voteChange));
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});