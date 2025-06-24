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
  const errorMessage = document.getElementById("error-message");

  qrCode.append(qrContainer);

  generateBtn.addEventListener("click", () => {
    const text = input.value.trim();
    errorMessage.style.display = "none";
    errorMessage.textContent = "";

    if (!text) {
      errorMessage.textContent = "Please enter something to encode.";
      errorMessage.style.display = "block";
      downloadControls.style.display = "none";
      return;
    }

    if (!isValidURL(text)) {
      errorMessage.textContent = "Please enter a valid URL (starting with http:// or https://).";
      errorMessage.style.display = "block";
      downloadControls.style.display = "none";
      return;
    }

    qrCode.update({ data: text });
    downloadControls.style.display = "flex";

    // Set download filename
    const filenameBase = getFilenameFromURL(text);
    const ext = formatSelect.value || "png";
    downloadLink.download = `${filenameBase}.${ext}`;
  });

  downloadLink.addEventListener("click", (e) => {
    e.preventDefault();
    const format = formatSelect.value;
    qrCode.download({ extension: format });
  });

  formatSelect.addEventListener("change", () => {
    // Update filename extension if user changes format after generation
    const text = input.value.trim();
    if (!text || !isValidURL(text)) return;
    const filenameBase = getFilenameFromURL(text);
    const ext = formatSelect.value || "png";
    downloadLink.download = `${filenameBase}.${ext}`;
  });

  function isValidURL(str) {
    try {
      const url = new URL(str);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  }

  function getFilenameFromURL(urlStr) {
    try {
      const url = new URL(urlStr);
      let hostname = url.hostname.toLowerCase();

      // Remove www. prefix
      if (hostname.startsWith("www.")) {
        hostname = hostname.slice(4);
      }

      // Remove TLD extensions, only keep domain part
      // e.g. example.com => example, example.co.uk => example
      // We'll just split by dot and take the first part
      const parts = hostname.split(".");
      if (parts.length > 1) {
        return parts[0];
      }
      return hostname;
    } catch {
      return "qr-code";
    }
  }
});
