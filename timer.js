const Timer = {

    seconds: 0,
    interval: null,

    start() {
        if (!this.interval) {
            this.interval = setInterval(() => {
                this.seconds++;
                document.getElementById("timerDisplay").innerText =
                    new Date(this.seconds * 1000)
                    .toISOString()
                    .substr(11, 8);
            }, 1000);
        }
    },

    stop() {
        clearInterval(this.interval);
        this.interval = null;
    },

    reset() {
        this.stop();
        this.seconds = 0;
        document.getElementById("timerDisplay").innerText = "00:00:00";
    }
};
