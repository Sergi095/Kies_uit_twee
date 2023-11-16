import { getImages, displayImages, displayWinnerImages, questionDict } from "./helper.js";


let answers = {};



export async function startMain() {
    // Get an array of the keys in questionDict
    


    let questions = Object.keys(questionDict);


    // loop over all questions and loop over all categories for each question
    for (let question of questions) {
        let categories = questionDict[question];
        let winnerImages = [];
        
        


        // document.body.innerHTML = '';
        document.getElementById('question').innerHTML = '';
        
        // create an H1 element
        let h1 = document.createElement("h1");
        h1.innerHTML = question;
        document.getElementById("question").innerHTML = '';
        document.getElementById("question").appendChild(h1);

        
        for (let name of categories) {
            displayWinnerImages();
            // document.getElementById('image-container').innerHTML = '';
            let currentImages = await getImages(name);
            // console.log(currentImages);
            let selectedImages = [];
            document.getElementById("image-container").innerHTML = '';
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
        localStorage.setItem('answers', JSON.stringify(answers));
        console.log(answers);
        let button = document.createElement("button");
        button.textContent = "Next Question";
        button.style.display = "block";
        button.style.position = "bottom"; // Change position to relative
        button.style.bottom = "100%"; // Change top to bottom
        button.style.left = "10%";
        button.style.right = "10%";
        button.style.transform = "translate(20%, 50%)";
        document.body.appendChild(button);
        let images = document.querySelectorAll('img');
        images.forEach(img => img.setAttribute('disabled', ''));
        
        await new Promise(resolve => button.onclick = resolve);
        button.remove();
        
    }

        

}

startMain();




