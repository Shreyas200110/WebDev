let galleryCont = document.querySelector(".gallery-cont");

setTimeout(() => {
    if(db){

        // For displaying videos
        let videoDBtransaction = db.transaction("video", "readonly");
        let videoStore = videoDBtransaction.objectStore("video");
        let videoRequest = videoStore.getAll();
    
        videoRequest.onsuccess = (e) => {
            let videoResult = videoRequest.result;
            videoResult.forEach((videoObj) => {
                let mediaCont = document.createElement("div");
                mediaCont.setAttribute("class", "media-cont");
                mediaCont.setAttribute("id", videoObj.id);
    
                let videoUrl = URL.createObjectURL(videoObj.blobData);
                mediaCont.innerHTML = `
                    <div class="gallery-actions-cont">
                        <div class="delete-button">
                            <span class="material-icons delete">close</span>
                        </div>
                        <div class="download-button">
                            <span class="material-icons download">download</span>
                        </div>
                    </div>
    
                    <div class="media">
                        <video autoplay loop src="${videoUrl}"></video>
                    </div>
                `;
                galleryCont.appendChild(mediaCont);

                let deleteButton = mediaCont.querySelector(".delete-button");
                deleteButton.addEventListener("click", handleDelete);

                let downloadButton = mediaCont.querySelector(".download-button");
                downloadButton.addEventListener("click", handleDownload);
            })
        }   
    

        // For displaying images
        let imageDBtransaction = db.transaction("image", "readonly");
        let imageStore = imageDBtransaction.objectStore("image");
        let imageRequest = imageStore.getAll();
    
        imageRequest.onsuccess = (e) => {
            let imageResult = imageRequest.result;
    
            imageResult.forEach((imageObj) => {
                let mediaCont = document.createElement("div");
                mediaCont.setAttribute("class", "media-cont");
                mediaCont.setAttribute("id", imageObj.id);
                let imageUrl = imageObj.url;
                mediaCont.innerHTML = `
                    <div class="gallery-actions-cont">
                        <div class="delete-button">
                            <span class="material-icons delete">close</span>
                        </div>
                        <div class="download-button">
                            <span class="material-icons download">download</span>
                        </div>
                    </div>
    
                    <div class="media">
                        <img src="${imageUrl}" />
                    </div>
                `;
                galleryCont.appendChild(mediaCont);

                let deleteButton = mediaCont.querySelector(".delete-button");
                deleteButton.addEventListener("click", handleDelete);

                let downloadButton = mediaCont.querySelector(".download-button");
                downloadButton.addEventListener("click", handleDownload);
            })
        } 
    }
}, 100);


function handleDelete(e){
    let id = e.target.parentElement.parentElement.parentElement.getAttribute("id");
    let type = id.slice(0, 3);

    // DB removal
    if(type == "vid"){
        let videoDBTransaction = db.transaction("video", "readwrite");
        let videoStore = videoDBTransaction.objectStore("video");
        videoStore.delete(id);
    }
    else if(type == "img"){
        let imageDBTransaction = db.transaction("image", "readwrite");
        let imageStore = imageDBTransaction.objectStore("image");
        imageStore.delete(id);
    }

    //UI removal
    e.target.parentElement.parentElement.parentElement.remove();
}

function handleDownload(e){
    let id = e.target.parentElement.parentElement.parentElement.getAttribute("id");
    let type = id.slice(0, 3);

    if (type === "vid") {
        let videoDBTransaction = db.transaction("video", "readwrite");
        let videoStore = videoDBTransaction.objectStore("video");
        let videoRequest = videoStore.get(id);
        videoRequest.onsuccess = (e) => {
            let videoResult = videoRequest.result;

            let videoURL = URL.createObjectURL(videoResult.blobData);

            let a = document.createElement("a");
            a.href = videoURL;
            a.download = "stream.mp4";
            a.click();
        }
    }
    else if (type === "img") {
        let imageDBTransaction = db.transaction("image", "readwrite");
        let imageStore = imageDBTransaction.objectStore("image");
        let imageRequest = imageStore.get(id);
        imageRequest.onsuccess = (e) => {
            let imageResult = imageRequest.result;

            let a = document.createElement("a");
            a.href = imageResult.url;
            a.download = "image.jpg";
            a.click();
        }
    }
}
