let timers = [];
let flag=0;
function startNewTimer() {
   
    const hours = parseInt(document.getElementById('hours').value) || 0;
    let minutes = parseInt(document.getElementById('minutes').value) || 0;
    let seconds = parseInt(document.getElementById('seconds').value) || 0;

    // Ensure minutes and seconds are capped at 60
    minutes = Math.min(minutes, 60);
    seconds = Math.min(seconds, 60);

    // Adjust hours if needed
    if (minutes >= 60) {
        hours += Math.floor(minutes / 60);
        minutes %= 60;
    }

    const totalTime = hours * 3600 + minutes * 60 + seconds;

    if (totalTime > 0) {
        const timerId = setInterval(() => {
            const timerIndex = timers.findIndex(timer => timer.id === timerId);
            if (timerIndex !== -1) {
                if (timers[timerIndex].totalTime <= 0) {
                    clearInterval(timerId);
                    handleTimerEnd(timerId);
                } else {
                    timers[timerIndex].totalTime--;

                    updateTimersDisplay();
                }
            }
        }, 1000);

        timers.push({ id: timerId, totalTime });
        updateTimersDisplay();
    } else {
        alert('Please enter a valid time.');
    }
}


function handleTimerEnd(timerId) {
    const timerIndex = timers.findIndex(timer => timer.id === timerId);
    if (timerIndex !== 1) {
        const audio = document.getElementById("music");
        audio.play();
       
        audio.loop=true;
        // flag++;

        // timers.splice(timerIndex, 1);
        // updateTimersDisplay();
    }
}

function updateTimersDisplay() {
    const activeTimersContainer = document.getElementById('activeTimers');
    activeTimersContainer.innerHTML = '';

    timers.forEach(timer => {
        const timerElement = document.createElement('div');
        timerElement.classList.add('timer');
        const timeRemaining = formatTime(timer.totalTime);
        timerElement.innerHTML = `
        <p id="left">Time Left</p>
        <p id="up">Timer is up</p>
            <span>${timeRemaining}</span>
            <button id="stop" onclick="stopTimer() ">Delete </button>
            <button id="stopmusic" onclick="stopMusic() ">Stop </button>
            
        `;
        
        if (timer.totalTime <= 0) {
            timerElement.classList.add('timer-ended');
            // console.log(timerElement.button);
            // let lastbutton=document.getElementById("stop");
            // console.log(timerElement[].innerText);
            // console.log(lastbutton.innerText);
            // let music=document.querySelector("stopmusic");
        

        }

        

        activeTimersContainer.appendChild(timerElement);
    });

}
function stopTimer(timerId){

  clearInterval(timerId);
const timerIndex = timers.findIndex(timer => timer.id === timerId);
    if (timerIndex !== 1) {
        // const audio = document.getElementById("music");
        // audio.play();

        timers.splice(timerIndex, 1);
        updateTimersDisplay();
    }
    // console.log("abc");
}
function stopMusic(timerId){
    
    
    const timerIndex = timers.findIndex(timer => timer.id === timerId);
    
         const audio = document.getElementById("music");
         audio.currentTime=0;
        //  console.log("abc");
        
         timers.splice(timerIndex, 1);
         updateTimersDisplay();
    
    
        audio.pause();
    

    
}
// function stopTimer(timerId) {
//     handleTimerEnd(timerId);
// }

function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:
            ${minutes.toString().padStart(2, '0')}:
            ${seconds.toString().padStart(2, '0')}`;
}