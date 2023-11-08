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


export function displayImages(question, 
                              name, 
                              currentImages, 
                              selectedImages,
                              winnerImages) {
    // Clear the body for new images
    document.body.innerHTML = '';

    // create an H1 element
    let h1 = document.createElement("h1");
    h1.innerHTML = question;
    document.body.appendChild(h1);



    let imageDiv = document.createElement("div");
    imageDiv.style.display = "flex";
    imageDiv.style.justifyContent = "center";
    imageDiv.style.flexWrap = "wrap";

    // Display the winner image if there is one but only after the currentImages array is exhausted

    if (winnerImages.length !== 0) {
        displayWinnerImages(winnerImages[winnerImages.length - 1], name);
        console.log("No more images to select from.");
    } else { 
        displayWinnerImages();
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
        console.log(id);
        let unselectedImageIndex = selectedImages.findIndex(img => img !== event.target.id);

        // Add the image to the winnerImages array
        console.log(currentImages.length);
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
        
        console.log(winnerImages);
        // Display the images again
        displayImages(question, name, currentImages, selectedImages, winnerImages);
    }
}


export function displayWinnerImages(winnerImage, name) {
    
    let imageDiv = document.createElement("div");
    imageDiv.style.display = "flex";
    imageDiv.style.justifyContent = "center";
    imageDiv.style.flexWrap = "wrap";

    let image = document.createElement("img");
    image.style.width = "100px";
    image.style.height = "100px";
    imageDiv.appendChild(image);

    
    if (winnerImage) {
        
        if (winnerImage.includes("flag")) {
            name = "flags";
        } else if (winnerImage.includes("frame")) {
            name = "frames";
        } else if (winnerImage.includes("A")){
            name = "A1-8";
        } else if (winnerImage.includes("B")){
            name = "B1-8";
        } else if (winnerImage.includes("C")){
            name = "C1-8";
        } else if (winnerImage.includes("D")){
            name = "D1-8";
        } else if (winnerImage.includes("E")){
            name = "E1-8";
        } else if (winnerImage.includes("F")){
            name = "F1-8";
        }
        image.src = `./images/${name == "flags" || name == "frames" ? name : "pictos/" + name}/${winnerImage}`;
        image.alt = winnerImage.slice(5, -4);
        image.title = winnerImage.slice(5, -4);
    } else {
        // Set the source to an empty image placeholder
        image.src = `./images/empty_flag/empty_flag.png`;
        image.alt = "empty flag";
        image.title = "empty flag";
    }

    document.body.appendChild(imageDiv);
}


