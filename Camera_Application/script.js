//Used media devices API provided by Browser to get the access of camera and get our stream
// Used the media recorder API to record the media

let videoCont = document.querySelector(".video-cont");
let actionCont = document.querySelector(".actions-cont");
let video = document.querySelector("video");
let cameraShutterCont = document.querySelector(".camera-shutter-cont");
let cameraShutter = document.querySelector(".camera-shutter");
let recordShutterCont = document.querySelector(".record-shutter-cont");
let recordShutter = document.querySelector(".record-shutter");
let filterBtn = document.querySelector(".filter-button");
let filterLayer = document.querySelector(".filter-layer");
let allFilters = document.querySelectorAll(".filter");
let filterCont = document.querySelector(".filters-cont");
let zoomInBtn = document.querySelector(".zoom-in");
let zoomOutBtn = document.querySelector(".zoom-out");
let captureTimerCont = document.querySelector(".capture-timer-cont");
let gridIconCont = document.querySelector(".grid-icon-cont");
let gridCont = document.querySelector(".grid-cont");
let popUpCont = document.querySelector(".pop-up-cont");
let saveButtonCont = document.querySelector(".save-button-cont");
let popUpInput = document.querySelector(".pop-up-input");
let notificationCont = document.querySelector(".notification-cont");
let isGridActive = false;
let zoomLevel = 1;
let isPhoto = false;
let GlobalUrlForImage = "";
let GlobalBlobForVideo = "";
let recorder; 
let recordFlag = false;
let filterColor = "transparent";
let chunks = [] // To store the video in the form of chunks
let filterContFlag = false;
let constraints = {
    audio: true,
    video: true
};

handleSave();

// navigator.mediaDevices.getUserMedia(constraints)
// .then((stream) => {
//     video.srcObject = stream;
//     recorder = new MediaRecorder(stream);

//     recorder.addEventListener("start", (e) => {
//         chunks = [];
//         isPhoto = false;
//     })

//     recorder.addEventListener("dataavailable", (e) => {
//         chunks.push(e.data);
//     })

//     recorder.addEventListener("stop", (e) => {
//         // Conversion of media chunks data to video
//         let blob = new Blob(chunks, { type: "video/mp4" });
//         GlobalBlobForVideo = blob;
//         let videoUrl = URL.createObjectURL(blob);

//         let a = document.createElement("a");
//         a.href = videoUrl;
//         a.download = "stream.mp4";
//         a.click();

//         //For notification
//         notificationCont.innerHTML = `
//             VIDEO CAPTURED
//             <span class="material-icons notify-check">done</span>
//         `;
//         notificationCont.style.display = "flex";
//         notificationCont.classList.add("fade-out-opacity");
//         setTimeout(() => {
//             notificationCont.style.display = "none";
//             notificationCont.classList.remove("fade-out-opacity");
//         }, 1000);

//         //For pop-up
//         popUpCont.style.display = "block";
//         videoCont.classList.add("blur");
//         actionCont.classList.add("blur");
//     })
// })

recordShutterCont.addEventListener("click", (e) => {
    if(!recorder) return;

    recordFlag = !recordFlag;

    if(recordFlag == true){
        recorder.start();
        startTimer();
        recordShutter.classList.add("scale-record")
    }
    else{
        stopTimer();
        recordShutter.classList.remove("scale-record")
        recorder.stop();
    }
})

cameraShutterCont.addEventListener("click", (e) => {
    isPhoto = true;
    cameraShutter.classList.add("scale-capture");
    let canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    let tool = canvas.getContext("2d");
    tool.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Filtering 
    tool.fillStyle = filterColor;
    tool.fillRect(0, 0, canvas.width, canvas.height);

    let imageURL = canvas.toDataURL();
    GlobalUrlForImage = imageURL;

    //For pop-up
    popUpCont.style.display = "block";
    videoCont.classList.add("blur");
    actionCont.classList.add("blur");

    // For notification
    notificationCont.innerHTML = `
        PHOTO CAPTURED
        <span class="material-icons notify-check">done</span>
    `;
    notificationCont.style.display = "flex";
    notificationCont.classList.add("fade-out-opacity");
    setTimeout(() => {
        notificationCont.style.display = "none";
        notificationCont.classList.remove("fade-out-opacity");
    }, 1000);

    handleSave(imageURL);
    let a = document.createElement("a");
    a.href = imageURL;
    a.download = "image.jpg";
    a.click();

    setTimeout(() => {
        cameraShutter.classList.remove("scale-capture");
    }, 500)
})


function handleSave(){
    saveButtonCont.addEventListener("click", (e) => {   
        videoCont.classList.remove("blur");
        actionCont.classList.remove("blur");
    
        let fileName = popUpInput.value;

        if(db && isPhoto && popUpInput.value){
            // Storing in DB
            let imageID = shortid(); 
            let dbTransaction = db.transaction("image", "readwrite");
            let imageEntry = {
                id: `img-${imageID}`,
                url: GlobalUrlForImage,
                name: fileName,
            }
            let imageStore = dbTransaction.objectStore("image");
            imageStore.add(imageEntry);  
        }
        else if(db && isPhoto == false && popUpInput.value){
            let videoID = shortid(); 
            let dbTransaction = db.transaction("video", "readwrite");
            let videoEntry = {
                id: `vid-${videoID}`,
                blobData: GlobalBlobForVideo,
                name: fileName,
            }
            let videoStore = dbTransaction.objectStore("video");
            videoStore.add(videoEntry); 
        }

        popUpCont.style.display = "none";
        popUpInput.value = "";  
    })
}

let timerID;
let counter = 0; // Represents total seconds
let timerCont = document.querySelector(".timer-cont");
let timer = document.querySelector(".timer");

function startTimer() {
    timerCont.style.display = "flex";
    function displayTimer() {
        counter++;

        let totalSeconds = counter;

        let hours = Number.parseInt(totalSeconds / 3600);
        totalSeconds = totalSeconds % 3600; // remaining value

        let minutes = Number.parseInt(totalSeconds / 60);
        totalSeconds = totalSeconds % 60; // remaining value

        let seconds = totalSeconds;

        hours = (hours < 10) ? `0${hours}` : hours;
        minutes = (minutes < 10) ? `0${minutes}` : minutes;
        seconds = (seconds < 10) ? `0${seconds}` : seconds;

        timer.innerText = `${hours}:${minutes}:${seconds}`;
    }

    timerID = setInterval(displayTimer, 1000);
}

function stopTimer() {
    clearInterval(timerID);
    timer.innerText = "00:00:00";
    timerCont.style.display = "none";
    counter = 0;
}

filterBtn.addEventListener("click", (e) => {
    filterContFlag = !filterContFlag;
    if(filterContFlag == true){
        filterCont.classList.remove("fade-out");
        setTimeout(() => {
            filterCont.style.display = "flex";
        }, 100);
        filterCont.classList.add("fade-in");

        //animation
        videoCont.classList.remove("move-right");
        actionCont.classList.remove("move-right");

        videoCont.classList.add("move-left");
        actionCont.classList.add("move-left");
        videoCont.style.left = "8rem";
        actionCont.style.left = "8rem";
    }
    else{
        filterCont.classList.remove("fade-in");
        setTimeout(() => {
            filterCont.style.display = "none";
        }, 800);
        filterCont.classList.add("fade-out");
        
        //animation
        videoCont.classList.remove("move-left");
        actionCont.classList.remove("move-left");

        videoCont.classList.add("move-right");
        actionCont.classList.add("move-right");

        videoCont.style.left = "12rem";
        actionCont.style.left = "12rem";
    }
})

allFilters.forEach((filterElem) => {
    filterElem.addEventListener("click", (e) => {
        filterColor = getComputedStyle(filterElem).getPropertyValue("background-color");
        filterLayer.style.backgroundColor = filterColor;
    })
})

zoomInBtn.addEventListener("click", function () {
    if (zoomLevel < 3) {
        zoomLevel += 0.2;
        video.style.transform = `scale(${zoomLevel})`;
    }
})

zoomOutBtn.addEventListener("click", function () {
    if (zoomLevel > 1) {
        zoomLevel -= 0.2;
        video.style.transform = `scale(${zoomLevel})`;
    }
})


captureTimerCont.addEventListener("click", (e) => {
    let counter = 3;
    function displaySecondsTimer() {
        captureTimerCont.innerText = counter;
        counter--;
    }
        
    let secondsTimerID = setInterval(displaySecondsTimer, 1000);

    setTimeout(() => {
        clearInterval(secondsTimerID);
        cameraShutterCont.click();
        captureTimerCont.innerHTML = `
            <span class="material-icons capture-timer">timer_off</span>
        `;
    }, 4000);
});

// For making the grid structure
for(let i = 0; i < 7; i++){
    let gridRow = document.createElement("div");
    gridRow.setAttribute("class", "grid-row");
    for(let j = 0; j < 7; j++){
        let gridCol = document.createElement("div");
        gridCol.setAttribute("class", "grid-col");
        gridRow.appendChild(gridCol);
    }
    gridCont.appendChild(gridRow);
} 

gridIconCont.addEventListener("click", (e) => {
    isGridActive = !isGridActive;

    if(isGridActive == true){
        gridIconCont.children[0].innerText = "grid_on";
        gridCont.style.display = "block";
    }
    else{
        gridIconCont.children[0].innerText = "grid_off";
        gridCont.style.display = "none";
    }
})

