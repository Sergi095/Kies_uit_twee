import { getImages, displayImages, displayWinnerImages, questionDict } from "./helper.js";


let answers = {};


async function main() {
    // Get an array of the keys in questionDict
    let questions = Object.keys(questionDict);


    // loop over all questions and loop over all categories for each question
    for (let question of questions) {
        let categories = questionDict[question];
        let winnerImages = [];
        for (let name of categories) {
            displayWinnerImages();
            let currentImages = await getImages(name);
            // console.log(currentImages);
            let selectedImages = [];
            displayImages(question, name, currentImages, selectedImages, winnerImages);

            // Wait for currentImages to be exhausted
            while (currentImages.length > 0) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            // console.log(winnerImages);
            // displayWinnerImages(winnerImages, name);
        }
        // Show the button and wait for it to be clicked before continuing
        answers[question] = winnerImages;
        console.log(answers);
        let button = document.createElement("button");
        button.textContent = "Next Question";
        button.style.display = "block";
        // button.style.position = "absolute";
        button.style.position = "bottom"; // Change position to relative
        // button.style.marginTop = "20px"; // Add some space at the top
        // button.style.top = "50%";
        button.style.bottom = "100%"; // Change top to bottom
        button.style.left = "10%";
        button.style.right = "10%";
        button.style.transform = "translate(20%, 50%)";
        document.body.appendChild(button);
        await new Promise(resolve => button.onclick = resolve);
        

    }

}

main()

