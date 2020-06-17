// Start der Ausführung des Hauptthreads
let worker = new Worker("./worker.js"); // starten des Nebenthreads
console.log("HT gestartet!");

worker.addEventListener("message", (event)=>{
    console.log("Hauptthread: Antwort von Worker erhalten: " + event.data);
});
worker.addEventListener("error", (event) => {
    console.log("Fehler aufgetreten: " + event.data);
})
let message = "Hallo Worker";
worker.postMessage(message);