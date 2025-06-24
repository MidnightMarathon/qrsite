window.addEventListener("load", () => {
  // Small visible QR code
  const qrCode = new QRCodeStyling({
    width: 150,
    height: 150,
    type: "png",
    data: "",
    dotsOptions: { color: "#000000", type: "square" },
    backgroundOptions: { color: "#ffffff" },
    qrOptions: { errorCorrectionLevel: "H" }
  });

  // Hidden high-res QR code for download
  const qrCodeHighRes = new QRCodeStyling({
    width: 480,
    height: 480,
    type: "png",
    data: "",
    dotsOptions: { color: "#000000", type: "square" },
    backgroundOptions: { color: "#ffffff" },
    qrOptions: { errorCorrectionLevel: "H" }
  });

  const input = document.getElementById("qr-input");
  const generateBtn = document.getElementById("generate-btn");
  const qrContainer = document.getElementById("qr-code");
  const downloadLink = document.getElementById("download-link");
  const formatSelect = document.getElementById("format-select");
  const downloadControls = document.getElementById("download-controls");

  qrCode.append(qrContainer);

  generateBtn.addEventListener("click", () => {
    const text = input.value.trim();
    if (!text) return;

    // Update both QR codes with the same data
    qrCode.update({ data: text });
    qrCodeHighRes.update({ data: text });

    downloadControls.style.display = "flex";
  });

  downloadLink.addEventListener("click", () => {
    const format = formatSelect.value;

    // Sanitize input text to create a safe filename
    const filename = input.value.trim()
      .replace(/[^a-z0-9]/gi, '_')  // replace non-alphanumeric with underscore
      .toLowerCase()
      .slice(0, 50) || 'qr-code';  // limit length, fallback if empty

    qrCodeHighRes.download({
      extension: format,
      name: filename
    });
  });
});

