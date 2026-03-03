const Language = {

    current: "en",

    dictionary: {
        ml: {
            enterVitals: "ശിശുവിന്റെ വിവരങ്ങൾ നൽകുക",
            temperature: "താപനില (°C)",
            respiration: "ശ്വസന നിരക്ക്",
            spo2: "SpO₂ (%) - ഐച്ഛികം",
            submit: "സമർപ്പിക്കുക",
            currentStatus: "നിലവിലെ അവസ്ഥ",
            kmcTracker: "KMC സെഷൻ ട്രാക്കർ",
            start: "ആരംഭിക്കുക",
            stop: "നിർത്തുക",
            reset: "റീസെറ്റ്",
            temperatureTrend: "താപനില ട്രെൻഡ്",
            alertHistory: "അലർട്ട് ചരിത്രം"
        }
    },

    toggle() {

        if (this.current === "en") {
            this.current = "ml";
            this.apply("ml");
        } else {
            location.reload();
        }
    },

    apply(lang) {
        const elements = document.querySelectorAll("[data-key]");
        elements.forEach(el => {
            const key = el.getAttribute("data-key");
            el.innerText = this.dictionary[lang][key];
        });
    }
};

const Theme = {
    toggle() {
        document.body.classList.toggle("dark-mode");
    }
};
