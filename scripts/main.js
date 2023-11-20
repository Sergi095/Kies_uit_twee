import { getImages, displayImages, displayWinnerImages, questionDict } from "./helper.js";


let answers = {};



export async function startMain() {
    // Get an array of the keys in questionDict
    

    // jatos.onLoad(async function () { // jatos.onLoad uncomment !!

    let questions = Object.keys(questionDict);

    let keys = Object.keys(questionDict);
    // loop over all questions and loop over all categories for each question
    for (let question of questions) {
        let categories = questionDict[question];
        let winnerImages = [];
        
        


        // document.body.innerHTML = '';
        document.getElementById('question').innerHTML = '';
        
        // create an H1 element
        let h1 = document.createElement("h1");
        h1.innerHTML = question;
        document.getElementById("question").appendChild(h1);

        
        for (let name of categories) {
            await displayWinnerImages();
            
            let currentImages = await getImages(name);
            document.getElementById('image-container').innerHTML = '';
            // console.log(currentImages);
            let selectedImages = [];
            // document.getElementById("image-container").innerHTML = '';
            await displayImages(question, name, currentImages, selectedImages, winnerImages);

            // Wait for currentImages to be exhausted
            // console.log(`currentImages while loop: ${currentImages}`);
            
            while (currentImages.length >= 0) {
                // console.log(`selectedImages while loop: ${selectedImages}`)
                await new Promise(resolve => setTimeout(resolve, 1000));
            //     console.log(`currentImages.length while loop: ${currentImages.length}`);
                if (currentImages.length === 0 && selectedImages.length === 1) {
                break;
                }
            }


            // console.log(winnerImages);
            // displayWinnerImages(winnerImages, name);
        }
        // Show the button and wait for it to be clicked before continuing
        let currentIndex = keys.indexOf(question);
        answers[question] = winnerImages;


        localStorage.setItem('answers', JSON.stringify(answers));
        console.log(answers);
        let button = document.createElement("button");
        // button.textContent = "Next Question";
        if (currentIndex === keys.length - 1) {
            button.textContent = "Exit";
        } else {
            button.textContent = "Next Question";
        }
        button.style.display = "block";
        button.style.position = "bottom"; // Change position to relative
        button.style.bottom = "100%"; // Change top to bottom
        button.style.left = "10%";
        button.style.right = "10%";
        button.style.transform = "translate(20%, 50%)";
        document.body.appendChild(button);
        let images = document.querySelectorAll('img');
        images.forEach(img => img.setAttribute('disabled', ''));
        
        // await new Promise(resolve => button.onclick = resolve);
        await new Promise(resolve => {
            button.onclick = () => {
                resolve();
                // If it's the last question, redirect to end_experiment.html
                if (currentIndex === keys.length - 1) {
                    window.location.href = 'end_experiment.html';
                }
            };
        });
        button.remove();
        
    }

// }); // jatos.onLoad uncomment !!

}

startMain();




