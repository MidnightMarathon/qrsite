window.addEventListener("load", () => {
  const qrCode = new QRCodeStyling({
    width: 1080,
    height: 1080,
    type: "png",
    data: "",
    dotsOptions: {
      color: "#000000",
      type: "square"
    },
    backgroundOptions: {
      color: "#ffffff"
    },
    qrOptions: {
      errorCorrectionLevel: "H"
    }
  });

  const input = document.getElementById("qr-input");
  const generateBtn = document.getElementById("generate-btn");
  const qrContainer = document.getElementById("qr-code");
  const downloadLink = document.getElementById("download-link");
  const formatSelect = document.getElementById("format-select");
  const downloadControls = document.getElementById("download-controls");
  const qrWrapper = document.getElementById("qr-wrapper");
  const errorMsg = document.getElementById("error-msg");

  qrCode.append(qrContainer);

  // Validate URL format (simple check)
  function isValidUrl(string) {
    try {
      const url = new URL(string);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  }

  // Extract domain name for filename
  function extractFilename(url) {
    try {
      const parsedUrl = new URL(url);
      let hostname = parsedUrl.hostname;
      if (hostname.startsWith("www.")) {
        hostname = hostname.slice(4);
      }
      // Remove TLD (e.g., .com, .net)
      const parts = hostname.split(".");
      if (parts.length > 1) parts.pop();
      return parts.join(".") || "qr-code";
    } catch {
      return "qr-code";
    }
  }

  generateBtn.addEventListener("click", () => {
    const text = input.value.trim();

    errorMsg.style.display = "none";
    downloadControls.style.display = "none";
    qrWrapper.style.display = "none";

    if (!isValidUrl(text)) {
      errorMsg.textContent = "Please enter a valid URL starting with http:// or https://";
      errorMsg.style.display = "block";
      return;
    }

    qrCode.update({ data: text });
    qrWrapper.style.display = "block";
    downloadControls.style.display = "flex";

    // Update download link filename on format or url change
    const filename = extractFilename(text);
    downloadLink.setAttribute("download", filename + "." + formatSelect.value);
  });

  // Update filename extension on format change
  formatSelect.addEventListener("change", () => {
    const text = input.value.trim();
    if (!isValidUrl(text)) return;

    const filename = extractFilename(text);
    downloadLink.setAttribute("download", filename + "." + formatSelect.value);
  });

  downloadLink.addEventListener("click", (e) => {
    const text = input.value.trim();
    if (!isValidUrl(text)) {
      e.preventDefault();
      errorMsg.textContent = "Please enter a valid URL before downloading.";
      errorMsg.style.display = "block";
      return;
    }

    const format = formatSelect.value;
    // Trigger download with selected format and filename
    qrCode.download({ extension: format });
  });
});
