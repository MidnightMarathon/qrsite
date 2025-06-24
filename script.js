window.addEventListener("load", () => {
  const qrCode = new QRCodeStyling({
    width: 1024,
    height: 1024,
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

  qrCode.append(qrContainer);

  generateBtn.addEventListener("click", () => {
    const text = input.value.trim();
    if (!text) return;

    qrCode.update({ data: text });

    // Wait a short moment to ensure rendering is complete
    setTimeout(() => {
      downloadControls.style.display = "flex";
    }, 200);
  });

  downloadLink.addEventListener("click", async () => {
    const format = formatSelect.value;

    if (format === "pdf") {
      const { jsPDF } = window.jspdf;
      const canvas = qrContainer.querySelector("canvas");
      if (!canvas) return alert("QR code not generated yet.");

      const imageData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: [1024, 1024]
      });

      pdf.addImage(imageData, "PNG", 0, 0, 1024, 1024);
      pdf.save("qr-code.pdf");
    } else {
      qrCode.download({ extension: format });
    }
  });
});
