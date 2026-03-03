const RiskEngine = {

    evaluate(temp, resp, spo2) {

        let issues = [];

        if (!isNaN(temp)) {
            if (temp < 36.5) issues.push("Hypothermia Risk");
            if (temp > 37.5) issues.push("Fever Risk");
        }

        if (!isNaN(resp)) {
            if (resp < 30 || resp > 60)
                issues.push("Breathing Irregular");
        }

        if (!isNaN(spo2)) {
            if (spo2 < 94)
                issues.push("Low Oxygen Level");
        }

        let level = "Stable";
        let color = "green";

        if (issues.length === 1) {
            level = "Monitor";
            color = "yellow";
        }

        if (issues.length > 1) {
            level = "Critical";
            color = "red";
        }

        return { level, color, issues };
    }
};
