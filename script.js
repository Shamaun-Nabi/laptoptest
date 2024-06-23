var stopwatchInterval;
var milliseconds = 0,
  seconds = 0,
  minutes = 0;
var isRunning = false;

function toaster(data) {
  Toastify({
    text: data,
    duration: 1000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
}

function updateStopwatch() {
  milliseconds += 10;
  if (milliseconds >= 1000) {
    milliseconds = 0;
    seconds++;
  }
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
  }

  document.getElementById("milliseconds").innerText = (milliseconds / 10)
    .toString()
    .padStart(2, "0");
  document.getElementById("seconds").innerText = seconds
    .toString()
    .padStart(2, "0");
  document.getElementById("minutes").innerText = minutes
    .toString()
    .padStart(2, "0");
}

function startStopwatch() {
  if (!isRunning) {
    stopwatchInterval = setInterval(updateStopwatch, 10);
    isRunning = true;
  }
}

function pauseStopwatch() {
  clearInterval(stopwatchInterval);
  isRunning = false;
}

function resetStopwatch() {
  clearInterval(stopwatchInterval);
  isRunning = false;
  milliseconds = 0;
  seconds = 0;
  minutes = 0;
  document.getElementById("milliseconds").innerText = "00";
  document.getElementById("seconds").innerText = "00";
  document.getElementById("minutes").innerText = "00";
}

function copyCommand(id) {
  var copyText = document.getElementById(id);
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

  navigator.clipboard.writeText(copyText.value).then(
    function () {
      toaster("Copied the command");
    },
    function (err) {
      toaster("Failed to copy the command", err);
    }
  );
}

function explainCPU() {
  var cpuInput = document.getElementById("cpuInput").value;
  var explanation = "";

  if (cpuInput.includes("Intel")) {
    var model = cpuInput.match(/i\d-\d{4}[A-Z]/)[0];
    var series = model.slice(-1);
    var generation = model.charAt(3);

    var seriesExplanation = "";
    switch (series) {
      case "U":
        seriesExplanation =
          "U: Ultra Low Power - designed for mobile devices with low power consumption.";
        break;
      case "P":
        seriesExplanation =
          "P: Performance - part of the performance CPU lineup for laptops and tablets.";
        break;
      case "H":
        seriesExplanation =
          "H: High Power/Performance - highest performing chips for mobile systems.";
        break;
      case "G":
        seriesExplanation =
          "G: Graphics - powerful built-in graphics processor for handling graphics-intensive tasks.";
        break;
      default:
        seriesExplanation = "Unknown series";
    }

    explanation = `
            <strong>Brand:</strong> Intel<br>
            <strong>Processor Family:</strong> ${
              model.split("-")[0]
            } (mid-range series designed for balanced performance)<br>
            <strong>Generation:</strong> ${generation}th Generation (indicated by the first digit '${generation}' in ${model})<br>
            <strong>Model Number:</strong> ${model} (specific model within the ${generation}th generation Core family)<br>
            <strong>Series:</strong> ${seriesExplanation}
        `;
  } else {
    explanation = "Please enter a valid Intel CPU model.";
  }

  document.getElementById("cpuExplanation").innerHTML = explanation;
}

function convertMemory() {
  var memoryInput = document.getElementById("memoryInput").value.split("\n");
  var totalMemory = 0;

  memoryInput.forEach(function (capacity) {
    if (!isNaN(capacity) && capacity.trim() !== "") {
      totalMemory += parseInt(capacity);
    }
  });

  var totalMemoryGB = totalMemory / 1024 ** 3;
  document.getElementById("memoryOutput").innerText =
    "Total Memory: " + totalMemoryGB.toFixed(2) + " GB";
}
