const fs = require('fs');
const path = require('path');

function createImageListJson(imageFolder, type) {
    // types are flags, frames, and pictos

    console.log(`The imageFolder is: ${imageFolder}`);
    
    fs.readdir(imageFolder, (err, files) => {
        if (err) {
            console.error('Could not list the directory.', err);
            process.exit(1);
        } 
        console.log(`The files are: ${files}`);
        var imageObjects = files.filter(file => path.extname(file) === '.jpg' || path.extname(file) === '.png')
                                .map(file => ({name:file, url:`image/${type}/${file}`}));
        var jsonContent = JSON.stringify(imageObjects);

        fs.writeFile(imageFolder + `/${type}_list.json`, jsonContent, 'utf8', function (err) {
            if (err) {
                console.error("An error occurred while writing JSON Object to File.", err);
            } else {
                console.log("JSON file has been saved.");
            }
        });
    });
}

// Call the function
var imageFolder = path.join(__dirname, "images", "flags");
createImageListJson(imageFolder, "flags");

imageFolder = path.join(__dirname, "images", "frames");
createImageListJson(imageFolder, "frames");

imageFolder = path.join(__dirname, "images", "pictos", "A1-8");
createImageListJson(imageFolder, "A1-8");
imageFolder = path.join(__dirname, "images", "pictos", "B1-8");
createImageListJson(imageFolder, "B1-8");
imageFolder = path.join(__dirname, "images", "pictos", "C1-8");
createImageListJson(imageFolder, "C1-8");
imageFolder = path.join(__dirname, "images", "pictos", "D1-8");
createImageListJson(imageFolder, "D1-8");
imageFolder = path.join(__dirname, "images", "pictos", "E1-8");
createImageListJson(imageFolder, "E1-8");
imageFolder = path.join(__dirname, "images", "pictos", "F1-8");
createImageListJson(imageFolder, "F1-8");
