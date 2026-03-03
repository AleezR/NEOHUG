const App = {

    chart: null,
    tempData: [],
    labels: [],

    init() {
        const ctx = document.getElementById("temperatureChart");

        this.chart = new Chart(ctx, {
            type: "line",
            data: {
                labels: this.labels,
                datasets: [{
                    label: "Temperature",
                    data: this.tempData,
                    borderColor: "blue",
                    fill: false
                }]
            }
        });
    },

    submitVitals() {

        const temp = parseFloat(document.getElementById("temperature").value);
        const resp = parseInt(document.getElementById("respiration").value);
        const spo2 = parseInt(document.getElementById("spo2").value);

        const result = RiskEngine.evaluate(temp, resp, spo2);

        this.updateStatus(result);
        this.logAlert(result);

        if (!isNaN(temp)) {
            this.tempData.push(temp);
            this.labels.push(new Date().toLocaleTimeString());
            this.chart.update();
        }
    },

    updateStatus(result) {

        const statusDiv = document.getElementById("statusIndicator");
        statusDiv.className = "status " + result.color;
        statusDiv.innerText = result.level;

        document.getElementById("riskMessage").innerText =
            result.issues.join(", ");
    },

    logAlert(result) {

        const log = document.getElementById("alertLog");
        const li = document.createElement("li");

        li.innerText =
            new Date().toLocaleTimeString() +
            " - " +
            result.level +
            (result.issues.length ? " (" + result.issues.join(", ") + ")" : "");

        log.appendChild(li);
    }
};

window.onload = () => App.init();
