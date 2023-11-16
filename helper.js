export const questionDict = {"Question 1": ["flags", "frames", "A1-8"],
                      "Question 2": ["flags", "frames", "B1-8"],
                      "Question 3": ["flags", "frames", "C1-8"],
                      "Question 4": ["flags", "frames", "D1-8"],
                      "Question 5": ["flags", "frames", "E1-8"],
                      "Question 6": ["flags", "frames", "F1-8"]};



export const array_names = ["flags", 
"frames", 
"A1-8", 
"B1-8", 
"C1-8", 
"D1-8", 
"E1-8", 
"F1-8"];


export async function getImages(name) {

let images = [];
if (array_names.includes(name)) {
    if (name == "flags" || name == "frames") {
        const response = await fetch(`./images/${name}/${name}_list.json`);
        const data = await response.json();
        data.forEach(element => {
            images.push(element.name);
        });
    } else {
        const response = await fetch(`./images/pictos/${name}/${name}_list.json`);
        const data = await response.json();

        data.forEach(element => {
            images.push(element.name);
        });
    }

    // console.log(images);
}
return images;
}
                    

function getRandomImage(images) {
    // Get a random index
    let randomIndex = Math.floor(Math.random() * images.length);
    // delete the image from the array
    let image = images[randomIndex];
    images.splice(randomIndex, 1);
    return image;
}



// functions to display the images and select the winner


export async function displayImages(question, 
                              name, 
                              currentImages, 
                              selectedImages,
                              winnerImages) {
    // Clear the body for new images
    document.body.innerHTML = '';
    // Clear the image container for new images
    // document.getElementById('image-container').innerHTML = '';

    // create an H1 element
    let h1 = document.createElement("h1");
    h1.innerHTML = question;
    document.body.appendChild(h1);

    let imageDiv = document.createElement("div");
    imageDiv.style.display = "flex";
    imageDiv.style.justifyContent = "center";
    imageDiv.style.flexWrap = "nowrap";
    imageDiv.style.overflowX = "auto";


    // Display the winner image if there is one but only after the currentImages array is exhausted

    if (winnerImages.length !== 0) {
        // displayWinnerImages(winnerImages[winnerImages.length - 1], name);
        await displayWinnerImages(winnerImages, name);
        // console.log("No more images to select from.");
    } else { 
        await displayWinnerImages();
    }

    // Initialize selectedImages with 2 random images
    if (selectedImages.length == 0) {
        selectedImages.push(getRandomImage(currentImages));
        selectedImages.push(getRandomImage(currentImages));
    }

    // Display the images in selectedImages

    selectedImages.forEach(img => {
        let image = document.createElement("img");
        image.src = `./images/${name == "flags" || name == "frames" ? name : "pictos/" + name}/${img}`;
        image.id = img;
        image.alt = img.slice(5, -4);
        image.title = img.slice(5, -4);
        image.addEventListener("click", handleClick(question, name, currentImages, selectedImages, winnerImages));
        image.style.width = "100px";
        image.style.height = "100px";
        imageDiv.appendChild(image);
    });

    document.body.appendChild(imageDiv);
}



function handleClick(question, name, currentImages, selectedImages, winnerImages) {

    return function (event) {
        // Get the id of the clicked image
        let id = event.target.id;
        // console.log(id);
        let unselectedImageIndex = selectedImages.findIndex(img => img !== event.target.id);

        // Add the image to the winnerImages array
        // console.log(currentImages.length);
        if (currentImages.length <= 1) {
            winnerImages.push(id);
        }

        // Remove the image from selectedImages
        if (currentImages.length > 0) {
            selectedImages[unselectedImageIndex] = getRandomImage(currentImages);
        } else {
            selectedImages.splice(unselectedImageIndex, 1);
        }
        document.querySelectorAll("img").forEach(img => img.remove());
        // Add a new image to selectedImages
        // selectedImages.push(getRandomImage(currentImages));
        
        // console.log(winnerImages);
        // Display the images again
        displayImages(question, name, currentImages, selectedImages, winnerImages);
    }
}




export async function displayWinnerImages(winnerImages, name) {
    
    // console.log(`These are the winner images inside displayWinnerImages: ${winnerImages}`)

    // let imageDiv = document.createElement("div");
    // imageDiv.style.display = "flex";
    // imageDiv.style.justifyContent = "center";
    // imageDiv.style.flexWrap = "wrap";

    let image2Div = document.createElement("div");
    image2Div.style.display = "flex";
    image2Div.style.justifyContent = "center";
    image2Div.style.flexWrap = "wrap";
    document.body.appendChild(image2Div);
    let image2 = document.createElement("img");
    image2.style.width = "200px";
    image2.style.height = "200px";
    
    while (image2Div.firstChild) {
        image2Div.removeChild(image2Div.firstChild);
    }
    

    if (!winnerImages || winnerImages.length === 0) { 
        // Set the source to an empty image placeholder
        // console.log(`There are no winner images: ${winnerImages}`)
        image2.src = `./images/empty_flag/empty_flag.png`;
        image2.alt = "empty flag";
        image2.title = "empty flag";
    }
    if (winnerImages && winnerImages.length === 1) {
        // Display the single image
        // console.log(`This is the winner image: ${winnerImages}`)
        let winnerImage = winnerImages[0];
        if (winnerImage.includes("flag")) {
            name = "flags";}
        // } else if (winnerImage.includes("frame")) {
        //     name = "frames";
        // } else if (winnerImage.includes("A")){
        //     name = "A1-8";
        // } else if (winnerImage.includes("B")){
        //     name = "B1-8";
        // } else if (winnerImage.includes("C")){
        //     name = "C1-8";
        // } else if (winnerImage.includes("D")){
        //     name = "D1-8";
        // } else if (winnerImage.includes("E")){
        //     name = "E1-8";
        // } else if (winnerImage.includes("F")){
        //     name = "F1-8";
        // }
        image2.src = `./images/${name == "flags" || name == "frames" ? name : "pictos/" + name}/${winnerImage}`;
        image2.alt = winnerImage.slice(5, -4);
        image2.title = winnerImage.slice(5, -4);
    }
    if (winnerImages && winnerImages.length > 1) {
        // Combine the images
        // console.log(`These are the winner images: ${winnerImages}`)
        let combinedImageSrc = await combineImages(winnerImages);
        image2.src = combinedImageSrc;
        image2.alt = 'Combined image';
        image2.title = 'Combined image';
}
image2Div.appendChild(image2);
document.body.appendChild(image2Div);
}








let imageCache = {};

export async function combineImages(imageFileNames) {
    let cacheKey = imageFileNames.join(',');
    if (imageCache[cacheKey]) {
        return imageCache[cacheKey];
    }

    // Create new image elements
    let images = await Promise.all(imageFileNames.map(async fileName => {
        let img = new Image();
        let name = "";
        if (fileName.includes("flag")) {
            name = "flags";
        } else if (fileName.includes("frame")) {
            name = "frames";
        } else if (fileName.includes("A")) {
            name = "A1-8";
        } else if (fileName.includes("B")) {
            name = "B1-8";
        } else if (fileName.includes("C")) {
            name = "C1-8";
        } else if (fileName.includes("D")) {
            name = "D1-8";
        } else if (fileName.includes("E")) {
            name = "E1-8";
        } else if (fileName.includes("F")) {
            name = "F1-8";
        }
        img.src = `./images/${name == "flags" || name == "frames" ? name : "pictos/" + name}/${fileName}`;
        await new Promise(resolve => { img.onload = resolve; }); // Wait for image to load
        return img;
    }));

    // Create a canvas element
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');

    // Adjust the size of the images
    let bigImage = images[0];
    bigImage.width *= 2; // Double the size of the first image
    bigImage.height *= 2;

    let mediumImage = images[1];
    mediumImage.width *= 2; // Increase the size of the second image by 50%
    mediumImage.height *= 2;

    let smallImage = images[2]; // The third image remains the same size

    // Calculate the total width and maximum height of the images
    let totalWidth = Math.max(bigImage.width, mediumImage.width, smallImage ? smallImage.width : 0);
    let maxHeight = Math.max(bigImage.height, mediumImage.height, smallImage ? smallImage.height : 0);

    // Increase the size of the canvas
    let scale = 2; // Change this to increase or decrease the size of the canvas
    canvas.width = totalWidth * scale;
    canvas.height = maxHeight * scale;

    // Draw the images onto the canvas
    for (let img of [bigImage, mediumImage, smallImage]) {
        if (img) {
            let xOffset = (canvas.width - img.width * scale) / 2;
            let yOffset = (canvas.height - img.height * scale) / 2;


            if (img === smallImage){
                ctx.globalCompositeOperation = "source-over";
            }

            ctx.drawImage(img, xOffset, yOffset, img.width * scale, img.height * scale);
        }
    }

    // Return the data URL of the canvas as the combined image
    let dataUrl = canvas.toDataURL();
    imageCache[cacheKey] = dataUrl;
    return dataUrl;
}

export function clearImageCache() {
    imageCache = {};
}


