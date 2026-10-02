// Wenn daten.js existiert, wird TRAINING geladen
if (typeof TRAINING === "undefined") {
    var TRAINING = {};
}

// Zerlegt Text in Wörter
function tokenize(text) {
    return text.toLowerCase().split(/\s+/).filter(w => w.length > 0);
}

// Trainiert das Modell
function train() {
    let text = document.getElementById("input").value;
    let words = tokenize(text);

    for (let i = 0; i < words.length - 1; i++) {
        let w1 = words[i];
        let w2 = words[i + 1];

        if (!TRAINING[w1]) TRAINING[w1] = {};
        if (!TRAINING[w1][w2]) TRAINING[w1][w2] = 0;

        TRAINING[w1][w2]++;
    }

    document.getElementById("output").textContent = "Trainiert!";
}

// Generiert eine Antwort basierend auf Wahrscheinlichkeiten
function antwort() {
    let text = document.getElementById("input").value;
    let words = tokenize(text);

    if (words.length === 0) return;

    let start = words[words.length - 1];
    let result = [start];

    for (let i = 0; i < 20; i++) {
        let next = chooseNext(start);
        if (!next) break;
        result.push(next);
        start = next;
    }

    document.getElementById("output").textContent = result.join(" ");
}

// Wählt das wahrscheinlichste nächste Wort
function chooseNext(word) {
    if (!TRAINING[word]) return null;

    let options = TRAINING[word];
    let best = null;
    let bestCount = -1;

    for (let w in options) {
        if (options[w] > bestCount) {
            bestCount = options[w];
            best = w;
        }
    }

    return best;
}

// Exportiert TRAINING als daten.js
function downloadData() {
    let content = "var TRAINING = " + JSON.stringify(TRAINING, null, 2) + ";";

    let blob = new Blob([content], { type: "application/javascript" });
    let url = URL.createObjectURL(blob);

    let a = document.createElement("a");
    a.href = url;
    a.download = "daten.js";
    a.click();

    URL.revokeObjectURL(url);
}
