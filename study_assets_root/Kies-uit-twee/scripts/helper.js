// CHANGE THIS PART TO CHANGE WHAT IS BEING DISPLAYED ON THE SCREEN
export const questionDict = {"Question 1, Preferences A1-8": ["flags", "frames", "A1-8"],
                             "Question 2, Preferences B1-8": ["flags", "frames", "B1-8"],
                             "Question 3, Preferences C1-8": ["flags", "frames", "C1-8"],
                             "Question 4, Preferences D1-8": ["flags", "frames", "D1-8"],
                             "Question 5, Preferences E1-8": ["flags", "frames", "E1-8"],
                             "Question 6, Preferences F1-8": ["flags", "frames", "F1-8"]};



export const array_names = ["flags", 
                            "frames", 
                            "A1-8", 
                            "B1-8", 
                            "C1-8", 
                            "D1-8", 
                            "E1-8", 
                            "F1-8"];


export let iterations = [];



export async function getImages(name) {

let images = [];
if (array_names.includes(name)) {
    if (name == "flags" || name == "frames") {
        // const response = await fetch(`../images/${name}/${name}_list.json`);
        const response = await fetch(`images/${name}/${name}_list.json`); //Jatos

        const data = await response.json();
        data.forEach(element => {
            images.push(element.name);
        });
    } else {
        // const response = await fetch(`../images/pictos/${name}/${name}_list.json`);
        const response = await fetch(`images/pictos/${name}/${name}_list.json`); //Jatos

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


    let imageDiv = document.getElementById("image-container");
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

    let loadingImage = new Image(); // preloading gif animation
    // loadingImage.src = '../images/loading_gif/loading-icon.gif'; 
    loadingImage.src = 'images/loading_gif/loading-icon.gif'; //Jatos
    let startTime = new Date();
    if (selectedImages.length == 1) { selectedImages = []; } // reset selectedImages if there is only one image left
    selectedImages.forEach(img => {
        let image = document.createElement("img");
        // image.src = `../images/${name == "flags" || name == "frames" ? name : "pictos/" + name}/${img}`;
        image.src = `images/${name == "flags" || name == "frames" ? name : "pictos/" + name}/${img}`; //Jatos
        image.id = img;
        image.alt = img.slice(5, -4);
        image.title = img.slice(5, -4);
        image.addEventListener("click", handleClick(question, name, currentImages, selectedImages, winnerImages, startTime));
        image.addEventListener("touchend", handleClick(question, name, currentImages, selectedImages, winnerImages, startTime));
        image.style.minWidth = "110px"; // Set the minimum width
        image.style.minHeight = "110px"; // Set the minimum height
        image.style.objectFit = "contain"; // or "cover"
        image.style.marginRight = "10px"; // Add margin to space out the images
        image.style.opacity = "0.8"; // Set the opacity to 0.8 to make the background more transparent
        image.style.cursor = "pointer"; // Add pointer cursor to the images
        // gif animation
        imageDiv.appendChild(loadingImage);
        setTimeout(() => {
        imageDiv.appendChild(image);
        loadingImage.remove();
        }, 500); // Add a delay of 5 seconds before displaying the images

        
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function handleClick(question, name, currentImages, selectedImages, winnerImages, startTime) {

    // const currentTime = new Date().getTime(); TODO: add timing functionality
    return async  function (event) {
        // Get the id of the clicked image
        if (event.target.getAttribute('disabled') !== null) {
            return;
        }

        let id = event.target.id;
        // console.log(id);
        let unselectedImageIndex = selectedImages.findIndex(img => img !== event.target.id);
        let unselectedImage = selectedImages[unselectedImageIndex];
        let data = {
            type: name,
            question: question,
            optionRight: selectedImages[0],
            optionLeft: selectedImages[1],
            chosen: id,
            unchosen: unselectedImage,
            timeToClick: `${(new Date() - startTime - 500) / 10000} seconds`, // -500 to account for the 0.5 second delay
        };

        // Add the image to the winnerImages array
        if (currentImages.length <= 0) {
            winnerImages.push(id);
        }


        // Remove the image from selectedImages
        if (currentImages.length > 0) {
            selectedImages[unselectedImageIndex] = getRandomImage(currentImages);
            // selectedImages.push(getRandomImage(currentImages));
            // selectedImages.splice(unselectedImageIndex, 1);
        } 
        else {
            selectedImages.splice(unselectedImageIndex, 1);
        }

        // suffle selectedImages array after each click
        shuffleArray(selectedImages);

        

        document.querySelectorAll("img").forEach(img => img.remove());
        // console.log(currentImages);
        // console.log(currentImages.length);
        
        
        // console.log(winnerImages);
        // Display the images again
        await displayImages(question, name, currentImages, selectedImages, winnerImages);

        iterations.push(data);
    }
    
}




export async function displayWinnerImages(winnerImages, name) {
    
    // document.getElementById("winner-image-container").innerHTML = '';

    // console.log(`These are the winner images inside displayWinnerImages: ${winnerImages}`)
    let image2Div = document.querySelector("#winner-image-container");
    if (!image2Div) {
        image2Div = document.createElement("div");
        image2Div.id = "winner-image-container";
        document.body.appendChild(image2Div);
    }
    let image2 = document.createElement("img");
    image2.style.width = "400px";
    image2.style.height = "300px";
    while (image2Div.firstChild) {
        image2Div.removeChild(image2Div.firstChild);
    }
    image2Div.appendChild(image2);
    
    
    let loadingImage = new Image();
    // loadingImage.src = '../images/loading_gif/loading-icon.gif'; 
    loadingImage.src = 'images/loading_gif/loading-icon.gif'; //Jatos
    if (!winnerImages || winnerImages.length === 0) { 
        // Set the source to an empty image placeholder
        // console.log(`There are no winner images: ${winnerImages}`)
        // image2.src = `../images/empty_flag/empty_flag.png`;
        image2.src = `images/empty_flag/empty_flag.png`; //Jatos
        image2.alt = "empty flag";
        image2.title = "empty flag";
    }
    if (winnerImages && winnerImages.length === 1) {
        // Display the single image
        // console.log(`This is the winner image: ${winnerImages}`)
        let winnerImage = winnerImages[0];
        if (winnerImage.includes("flag")) {
            name = "flags";}

        // image2.src = `../images/${name == "flags" || name == "frames" ? name : "pictos/" + name}/${winnerImage}`;
        image2.src = `images/${name == "flags" || name == "frames" ? name : "pictos/" + name}/${winnerImage}`; //Jatos
        image2.alt = winnerImage.slice(5, -4);
        image2.title = winnerImage.slice(5, -4);
    }
    if (winnerImages && winnerImages.length > 1) {
        // Combine the images
        // console.log(`These are the winner images: ${winnerImages}`)
        // Show loading animation
        image2.src = loadingImage.src;
        image2.style.width = "100px";
        image2.style.height = "100px";
        // console.log("here");
        // loadingAnimation.style.display = 'block';
        let combinedImageSrc = await combineImages(winnerImages);
        // Hide loading animation
        // loadingAnimation.style.display = 'none';
        image2.src = combinedImageSrc;
        image2.alt = 'Combined image';
        image2.title = 'Combined image';
}
image2Div.appendChild(image2);
image2.style.width = "400px";
image2.style.height = "300px";
// document.body.appendChild(image2Div);
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
        // img.src = `../images/${name == "flags" || name == "frames" ? name : "pictos/" + name}/${fileName}`;
        img.src = `images/${name == "flags" || name == "frames" ? name : "pictos/" + name}/${fileName}`; //Jatos
        await new Promise(resolve => { img.onload = resolve; }); // Wait for image to load
        return img;
    }));


    // Create a canvas element
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');

    // Adjust the size of the images
    let bigImage = images[0];
    bigImage.width *= 1.5; // Double the size of the first image
    bigImage.height *= 1.5;

    let mediumImage = images[1];

    mediumImage.width *= 1.5; 
    mediumImage.height *= 1.5;
    

    let smallImage = images[2]; // The third image remains the same size
    if (smallImage)
    {if (imageFileNames[1].includes("triangle")) {
        
    smallImage.width *= 0.5; 
    smallImage.height *= 0.5;
        } else {
            smallImage.width *= 1; 
            smallImage.height *= 1;
        }
    }

    // Calculate the total width and maximum height of the images
    let totalWidth = Math.max(bigImage.width, mediumImage.width, smallImage ? smallImage.width : 0);
    let maxHeight = Math.max(bigImage.height, mediumImage.height, smallImage ? smallImage.height : 0);

    // Increase the size of the canvas
    let scale = 1; // Change this to increase or decrease the size of the canvas
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
            if (img === mediumImage){
                ctx.globalCompositeOperation = "source-atop";
            }
            ctx.drawImage(img, xOffset, yOffset, img.width * scale, img.height * scale);
        }
    }

    // Return the data URL of the canvas as the combined image
    const dataUrl = canvas.toDataURL(0.5);
    imageCache[cacheKey] = dataUrl;
    return dataUrl;
}

export function clearImageCache() {
    imageCache = {};
}


