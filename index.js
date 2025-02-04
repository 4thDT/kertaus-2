const express = require("express");
const app = express();
const path = require("path");
const dataLayer = require("./datalayer"); // Assuming the datalayer is correctly implemented

// Set EJS as the view engine and the views folder
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "ejsstuf"));

// Serve static files from the root directory (to serve images and other static assets)
app.use(express.static(path.join(__dirname)));

// Route for the homepage
app.get("/", (req, res) => {
    // Retrieve data from the dataLayer
    const images = dataLayer.readData();
    
    // Render the index.ejs template, passing the image data
    res.render("index", { images });
});

// Route for adding a new caption
app.post("/add-caption", express.urlencoded({ extended: true }), (req, res) => {
    const { imageName, captionText } = req.body;
    
    // Add the new caption to the image
    dataLayer.addCaption(imageName, captionText);
    
    // Redirect back to the homepage
    res.redirect("/");
});

// Route for upvoting/downvoting captions
app.post("/change-votes", express.urlencoded({ extended: true }), (req, res) => {
    const { imageName, captionNumber, voteChange } = req.body;
    
    // Change the vote count for the specified caption
    dataLayer.changeVotes(imageName, captionNumber, parseInt(voteChange, 10));
    
    // Redirect back to the homepage
    res.redirect("/");
});

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
