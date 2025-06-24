import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { message } from "antd";

export const downloadPDF = async () => {
  const element = document.getElementById("pdf-content");
  if (!element) return;
  const loadingMessage = message.loading("Generating PDF...", 0);

  // Create a temporary container for PDF generation
  const tempContainer = document.createElement("div");
  tempContainer.style.cssText = `
    position: absolute;
    left: -9999px;
    top: 0;
    width: 800px;
    background: white;
    font-family: inherit;
  `;

  document.body.appendChild(tempContainer);

  try {
    // Clone the main content (excluding fixed elements)
    const mainContent = element.querySelector(".flex-1");
    if (!mainContent) return;

    const clonedContent = mainContent.cloneNode(true);

    // Remove any fixed or problematic elements from clone
    const problematicElements = clonedContent.querySelectorAll(
      '.fixed, [style*="position: fixed"]'
    );
    problematicElements.forEach((el) => el.remove());

    // Ensure all styles are preserved and visible - NO DESIGN CHANGES
    const allElements = clonedContent.querySelectorAll("*");
    allElements.forEach((el) => {
      el.style.position = "static";
      el.style.overflow = "visible";
    });

    tempContainer.appendChild(clonedContent);

    // Wait for any images to load
    const images = tempContainer.querySelectorAll("img");
    await Promise.all(
      Array.from(images).map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete) return resolve();
            img.onload = img.onerror = resolve;
          })
      )
    );
    loadingMessage();
    message.loading("Creating PDF...", 0);
    const canvas = await html2canvas(tempContainer, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
      scrollX: 0,
      scrollY: 0,
    });

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = 210;
    const pdfHeight = 297;
    const margin = 10;

    const imgWidth = pdfWidth - margin * 2;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // FORCE EVERYTHING ON ONE PAGE - Scale down if needed
    const maxHeight = pdfHeight - margin * 2;

    if (imgHeight > maxHeight) {
      // Scale down to fit on one page
      const scaleFactor = maxHeight / imgHeight;
      const scaledWidth = imgWidth * scaleFactor;
      const scaledHeight = maxHeight;

      // Center horizontally if scaled down
      const xPosition = margin + (imgWidth - scaledWidth) / 2;

      pdf.addImage(
        canvas.toDataURL("image/png", 0.95),
        "PNG",
        xPosition,
        margin,
        scaledWidth,
        scaledHeight
      );
    } else {
      // Fits normally
      pdf.addImage(
        canvas.toDataURL("image/png", 0.95),
        "PNG",
        margin,
        margin,
        imgWidth,
        imgHeight
      );
    }

    loadingMessage();
    message.loading("Downloading PDF...", 0);

    pdf.save("prescription.pdf");

    // Success message
    message.success("PDF downloaded successfully!");
  } catch (error) {
    console.error("Error generating PDF:", error);
    message.error("Failed to generate PDF. Please try again.");
  } finally {
    document.body.removeChild(tempContainer);
    message.destroy();
  }
};
