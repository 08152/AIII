// Trainingsspeicher
let TRAINING = {};

// Zerlegt Text in Wörter
function tokenize(text) {
    return text.toLowerCase().split(/\s+/).filter(w => w.length > 0);
}

// Trainiert das Modell (nur Rhythmus, keine Antwort)
function train() {
    let text = document.getElementById("input").value;
    let words = tokenize(text);

    if (words.length < 2) {
        document.getElementById("output").textContent = "Zu wenig Wörter zum Trainieren.";
        return;
    }

    for (let i = 0; i < words.length - 1; i++) {
        let w1 = words[i];
        let w2 = words[i + 1];

        if (!TRAINING[w1]) TRAINING[w1] = {};
        if (!TRAINING[w1][w2]) TRAINING[w1][w2] = 0;

        TRAINING[w1][w2]++;
    }

    document.getElementById("output").textContent = "Trainiert! Rhythmus gespeichert.";
}

// Download als daten.json
function downloadData() {
    let content = JSON.stringify(TRAINING, null, 2);

    let blob = new Blob([content], { type: "application/json" });
    let url = URL.createObjectURL(blob);

    let a = document.createElement("a");
    a.href = url;
    a.download = "daten.json";
    a.click();

    URL.revokeObjectURL(url);
}
