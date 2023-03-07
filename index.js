let difficulty = document.getElementById("difficulty");
let difficultyShow = document.querySelector("#difficultyContainer > p");
let obstacle = document.getElementById("obstacle");
let playBtn = document.querySelector("#btnContainer button");


window.onload = ()=>{
    difficulty.value = 0; 
    setMssg();
}

difficulty.addEventListener("input", (e) => {
    setMssg();
})



difficulty.addEventListener("change", (e) => {
    setMssg();
})

setMssg();

function setMssg() {
    if (difficulty.value == 0) {
        difficultyShow.style.color = "green";
        difficultyShow.innerHTML = "Easy";
    } else if (difficulty.value == 1) {
        difficultyShow.style.color = "yellow";
        difficultyShow.innerHTML = "Medium";
    } else if (difficulty.value == 2) {
        difficultyShow.style.color = "orange";
        difficultyShow.innerHTML = "Hard";
    } else if (difficulty.value == 3) {
        difficultyShow.style.color = "red";
        difficultyShow.innerHTML = "Extreme";
    } else if (difficulty.value == 4) {
        difficultyShow.style.color = "purple";
        difficultyShow.innerHTML = "Impossible";
    }
}


playBtn.addEventListener("click", (e) => {
    window.location = `./snake.html?level=${difficulty.value}&obstacle=${obstacle.checked}`;

})
