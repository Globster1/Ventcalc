// Helper function to log messages to debug box
function logDebug(message) {
    const debugBox = document.getElementById("debug"); // Make sure this matches your HTML
    if (debugBox) {
        debugBox.textContent += message + "\n";
    }
    console.log(message); // Also logs to browser console if available
}

function calculate() {
    logDebug("=== Calculate button clicked ===");

    try {
        const minuteVentilation = parseFloat(document.getElementById("minuteVentilation").value) || 0;
        const leak = parseFloat(document.getElementById("leak").value) || 0;
        const biasFlow = parseFloat(document.getElementById("biasFlow").value) || 0;
        const hours = parseFloat(document.getElementById("hours").value) || 0;

        logDebug("Inputs received:");
        logDebug("Minute Ventilation: " + minuteVentilation);
        logDebug("Leak: " + leak);
        logDebug("Bias Flow: " + biasFlow);
        logDebug("Hours: " + hours);

        // Step 1: Calculate litres per minute
        const litresPerMinute = minuteVentilation + leak + biasFlow;
        logDebug("Litres per Minute = " + litresPerMinute);

        // Step 2: Calculate total litres
        const totalLitres = litresPerMinute * hours * 60;
        logDebug("Total Litres = " + totalLitres);

        // Step 3: Compare to tank sizes
        const tankSizes = [
            { name: "D", value: 425 },
            { name: "DJ", value: 640 },
            { name: "E", value: 680 },
            { name: "M", value: 1738 },
            { name: "M/MM/M122", value: 3455 },
            { name: "H/K", value: 7080 }
        ];

        let selectedTank = "None – too large";
        for (let i = 0; i < tankSizes.length; i++) {
            if (totalLitres <= tankSizes[i].value) {
                selectedTank = tankSizes[i].name;
                break;
            }
        }

        logDebug("Selected Tank = " + selectedTank);

        // Update UI
        const resultsDiv = document.getElementById("results");
        if (resultsDiv) {
            document.getElementById("litresPerMinute").innerText = litresPerMinute.toFixed(2);
            document.getElementById("totalLitres").innerText = totalLitres.toFixed(2);
            document.getElementById("tankSize").innerText = selectedTank;
            resultsDiv.style.display = "block";
        }

    } catch (error) {
        logDebug("ERROR: " + error.message);
    }
}
