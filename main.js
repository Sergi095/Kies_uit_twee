import { getImages, displayImages, displayWinnerImages, questionDict } from "./helper.js";

async function main() {
    // Get an array of the keys in questionDict
    let questions = Object.keys(questionDict);
            
    
    // console.log(questions);
    // loop over all questions and loop over all categories for each question
    for (let question of questions) {
        let categories = questionDict[question];
        // console.log(categories);
        let winnerImages = [];
        for (let name of categories) {
            // console.log(name);
            displayWinnerImages();
            let currentImages = await getImages(name);
            // console.log(currentImages);
            let selectedImages = [];
            displayImages(question, name, currentImages, selectedImages, winnerImages);

            // Wait for currentImages to be exhausted
            while (currentImages.length > 0) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            console.log(winnerImages);
            displayWinnerImages(name, winnerImages[winnerImages.length - 1]);
        }
    }
        
}
main()

