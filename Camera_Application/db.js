// Open a database
// Create ObjectStore
// Make transactions

let db;
let openRequest = indexedDB.open("Gallery");
openRequest.addEventListener("success", (e) => {
    db = openRequest.result;
})
openRequest.addEventListener("error", (e) => {
    console.log("Error in creating DB");
})
openRequest.addEventListener("upgradeneeded", (e) => {
    db = openRequest.result;
    db.createObjectStore("video", {keyPath : "id"});
    db.createObjectStore("image", {keyPath : "id"});
})