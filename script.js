let tempData = [];
let timerInterval;
let seconds = 0;
let currentLanguage = "en";

const ctx = document.getElementById('tempChart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Temperature',
            data: tempData,
            borderColor: 'blue',
            fill: false
        }]
    }
});

function analyzeVitals() {
    const temp = parseFloat(document.getElementById("temperature").value);
    const resp = parseInt(document.getElementById("respiration").value);
    const spo2 = parseInt(document.getElementById("spo2").value);

    let issues = [];
    let status = "Stable";
    let color = "green";

    if (temp < 36.5) issues.push("Hypothermia Risk");
    if (temp > 37.5) issues.push("Fever Risk");
    if (resp < 30 || resp > 60) issues.push("Breathing Irregular");
    if (spo2 && spo2 < 94) issues.push("Low Oxygen Level");

    if (issues.length === 1) {
        status = "Monitor";
        color = "yellow";
    } else if (issues.length > 1) {
        status = "Critical";
        color = "red";
    }

    const circle = document.getElementById("statusCircle");
    circle.className = color;
    circle.textContent = status;

    document.getElementById("riskMessage").innerText = issues.join(", ");

    const timestamp = new Date().toLocaleTimeString();
    document.getElementById("alertLog").innerHTML += `<li>${timestamp} - ${status} (${issues.join(", ")})</li>`;

    if (!isNaN(temp)) {
        tempData.push(temp);
        chart.data.labels.push(timestamp);
        chart.update();
    }
}

function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            seconds++;
            document.getElementById("timer").innerText =
                new Date(seconds * 1000).toISOString().substr(11, 8);
        }, 1000);
    }
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function toggleTheme() {
    document.body.classList.toggle("dark-mode");
}

function toggleLanguage() {
    if (currentLanguage === "en") {
        document.getElementById("title").innerText = "NeoHug - സ്മാർട്ട് KMC നിരീക്ഷണം";
        document.getElementById("enterVitals").innerText = "ശിശുവിന്റെ വിവരങ്ങൾ നൽകുക";
        document.getElementById("riskTitle").innerText = "നിലവിലെ അവസ്ഥ";
        document.getElementById("kmcTitle").innerText = "KMC സെഷൻ ട്രാക്കർ";
        document.getElementById("chartTitle").innerText = "താപനില ട്രെൻഡ്";
        document.getElementById("alertsTitle").innerText = "അലർട്ട് ചരിത്രം";
        currentLanguage = "ml";
    } else {
        location.reload();
    }
}