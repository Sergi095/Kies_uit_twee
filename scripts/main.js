import { getImages, displayImages, displayWinnerImages, questionDict, iterations } from "./helper.js";


export async function startMain() {
    // Get an array of the keys in questionDict
    

    // jatos.onLoad(async function () { // jatos.onLoad uncomment !!

    let questions = Object.keys(questionDict);
    let abortButton = document.createElement('button');
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
            

            // ABORT BUTTON
            if (!abortButton) {
                abortButton = document.createElement('button');
                abortButton.id = 'abort-button';
                abortButton.style.display = "block";
                abortButton.style.position = "bottom"; // Change position to relative
                abortButton.style.bottom = "100%"; // Change top to bottom
                abortButton.style.left = "10%";
                abortButton.style.right = "10%";
                abortButton.style.transform = "translate(20%, 50%)";
                abortButton.style.cursor = "pointer";                
                document.body.appendChild(abortButton);
            }
            // let abort = false;
            abortButton.textContent = "Abort";

            abortButton.addEventListener('click', () => {
                localStorage.setItem('iterations', answersToCsv(iterations));
                window.location.href = 'end_experiment.html';
            });
            document.body.appendChild(abortButton);
            while (currentImages.length >= 0) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                if (currentImages.length === 0 && selectedImages.length === 1) {
                break;
                }
            }


            // console.log(winnerImages);
            // displayWinnerImages(winnerImages, name);
        }
        // Show the button and wait for it to be clicked before continuing
        let currentIndex = keys.indexOf(question);
        console.log(iterations);
        localStorage.setItem('iterations', answersToCsv(iterations));
        // console.log(unselectedChoices)
        let button = document.createElement("button");
        // button.textContent = "Next Question";
        if (currentIndex === keys.length - 1) {
            abortButton.remove();
            button.textContent = " Exit ";
        } else {
            button.textContent = "Next Question";
        }
        button.style.display = "block";
        button.style.position = "bottom"; // Change position to relative
        button.style.bottom = "100%"; // Change top to bottom
        button.style.left = "10%";
        button.style.right = "10%";
        button.style.transform = "translate(20%, 50%)";
        button.style.cursor = "pointer";
        document.body.appendChild(button);
        let images = document.querySelectorAll('img');
        images.forEach(img => img.setAttribute('disabled', ''));
        
        // await new Promise(resolve => button.onclick = resolve);
        await new Promise(resolve => {
            button.onclick = () => {
                resolve();
                // If it's the last question, redirect to end_experiment.html
                if (currentIndex === keys.length - 1) {
                    // jatos.endStudy(answersToCsv(iterations)); // jatos.onLoad uncomment !!
                    window.location.href = 'end_experiment.html';
                }
            };
        });
        button.remove();
        
    }

// }); // jatos.onLoad uncomment !!

}


function answersToCsv(iterations) {
    let csv = '';
    csv += 'iteration,category,question,optionLeft,optionRight,chosen,unchosen,timeToClick\n';
    for (let i = 0; i < iterations.length; i++) {
        let iteration = iterations[i];
        let category = iteration.type;
        let question = iteration.question;
        let optionLeft = iteration.optionLeft;
        let optionRight = iteration.optionRight;
        let chosen = iteration.chosen;
        let unchosen = iteration.unchosen;
        let timeToClick = iteration.timeToClick;
        csv += `${i},${category},${question},${optionLeft},${optionRight},${chosen},${unchosen},${timeToClick}\n`;     
    }
    return csv;
}

startMain();




