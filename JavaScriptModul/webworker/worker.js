// Start des Workerthreads

self.addEventListener('message', (event) => {
    console.log("Worker: Nachricht erhalten: " + event.data);
    let workerResult = "Hallo Hauptthread";
    console.log("Worker: Sende Antwort: " + workerResult);
    self.postMessage(workerResult);
} );
console.log("WT gestartet");