import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/constants/config/db";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ trackingNumber: string }> }
) {
  try {
    const { trackingNumber } = await params;

    // Fetch shipment data
    const shipment = await prisma.shipment.findUnique({
      where: { trackingNumber },
      include: {
        recipient: true,
        Sender: true,
        packages: true,
      },
    });

    if (!shipment) {
      return NextResponse.json(
        { error: "Shipment not found" },
        { status: 404 }
      );
    }

    // Create PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4 size
    const { width, height } = page.getSize();

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Colors
    const primaryColor = rgb(0.05, 0.1, 0.2);
    const accentColor = rgb(0.2, 0.4, 0.8);
    const grayColor = rgb(0.4, 0.4, 0.4);
    const lightGray = rgb(0.9, 0.9, 0.9);

    // Header background
    page.drawRectangle({
      x: 0,
      y: height - 120,
      width: width,
      height: 120,
      color: primaryColor,
    });

    // Company name
    page.drawText("ASYNCSHIP LOGISTICS", {
      x: 40,
      y: height - 50,
      size: 24,
      font: boldFont,
      color: rgb(1, 1, 1),
    });

    page.drawText("AIRWAY BILL", {
      x: 40,
      y: height - 80,
      size: 14,
      font: font,
      color: rgb(0.7, 0.8, 1),
    });

    // Tracking number (right side)
    page.drawText("AWB NUMBER", {
      x: width - 200,
      y: height - 45,
      size: 10,
      font: font,
      color: rgb(0.7, 0.8, 1),
    });

    page.drawText(shipment.trackingNumber, {
      x: width - 200,
      y: height - 65,
      size: 16,
      font: boldFont,
      color: rgb(1, 1, 1),
    });

    // Service type badge
    page.drawRectangle({
      x: width - 200,
      y: height - 100,
      width: 160,
      height: 25,
      color: accentColor,
    });

    page.drawText(shipment.serviceType.toUpperCase(), {
      x: width - 190,
      y: height - 92,
      size: 12,
      font: boldFont,
      color: rgb(1, 1, 1),
    });

    let yPos = height - 160;

    // Shipper and Consignee section
    // Left column - Shipper
    page.drawText("SHIPPER / SENDER", {
      x: 40,
      y: yPos,
      size: 10,
      font: boldFont,
      color: accentColor,
    });

    yPos -= 20;
    page.drawText(shipment.Sender?.name || "N/A", {
      x: 40,
      y: yPos,
      size: 12,
      font: boldFont,
      color: primaryColor,
    });

    yPos -= 15;
    page.drawText(shipment.originAddress, {
      x: 40,
      y: yPos,
      size: 10,
      font: font,
      color: grayColor,
    });

    yPos -= 12;
    page.drawText(`${shipment.originCity}, ${shipment.originState} ${shipment.originPostalCode}`, {
      x: 40,
      y: yPos,
      size: 10,
      font: font,
      color: grayColor,
    });

    yPos -= 12;
    page.drawText(shipment.originCountry, {
      x: 40,
      y: yPos,
      size: 10,
      font: font,
      color: grayColor,
    });

    if (shipment.Sender?.email) {
      yPos -= 15;
      page.drawText(`Email: ${shipment.Sender.email}`, {
        x: 40,
        y: yPos,
        size: 9,
        font: font,
        color: grayColor,
      });
    }

    // Right column - Consignee
    let rightYPos = height - 160;
    page.drawText("CONSIGNEE / RECIPIENT", {
      x: width / 2 + 20,
      y: rightYPos,
      size: 10,
      font: boldFont,
      color: accentColor,
    });

    rightYPos -= 20;
    page.drawText(shipment.recipient.name, {
      x: width / 2 + 20,
      y: rightYPos,
      size: 12,
      font: boldFont,
      color: primaryColor,
    });

    if (shipment.recipient.company) {
      rightYPos -= 15;
      page.drawText(shipment.recipient.company, {
        x: width / 2 + 20,
        y: rightYPos,
        size: 10,
        font: font,
        color: grayColor,
      });
    }

    rightYPos -= 15;
    page.drawText(shipment.destinationAddress, {
      x: width / 2 + 20,
      y: rightYPos,
      size: 10,
      font: font,
      color: grayColor,
    });

    rightYPos -= 12;
    page.drawText(`${shipment.destinationCity}, ${shipment.destinationState} ${shipment.destinationPostalCode}`, {
      x: width / 2 + 20,
      y: rightYPos,
      size: 10,
      font: font,
      color: grayColor,
    });

    rightYPos -= 12;
    page.drawText(shipment.destinationCountry, {
      x: width / 2 + 20,
      y: rightYPos,
      size: 10,
      font: font,
      color: grayColor,
    });

    rightYPos -= 15;
    page.drawText(`Phone: ${shipment.recipient.phone}`, {
      x: width / 2 + 20,
      y: rightYPos,
      size: 9,
      font: font,
      color: grayColor,
    });

    if (shipment.recipient.email) {
      rightYPos -= 12;
      page.drawText(`Email: ${shipment.recipient.email}`, {
        x: width / 2 + 20,
        y: rightYPos,
        size: 9,
        font: font,
        color: grayColor,
      });
    }

    // Divider line
    yPos = Math.min(yPos, rightYPos) - 30;
    page.drawLine({
      start: { x: 40, y: yPos },
      end: { x: width - 40, y: yPos },
      thickness: 1,
      color: lightGray,
    });

    // Package Details Section
    yPos -= 30;
    page.drawText("PACKAGE DETAILS", {
      x: 40,
      y: yPos,
      size: 10,
      font: boldFont,
      color: accentColor,
    });

    // Table header background
    yPos -= 25;
    page.drawRectangle({
      x: 40,
      y: yPos - 5,
      width: width - 80,
      height: 20,
      color: lightGray,
    });

    // Table headers
    const headers = ["#", "Type", "Dimensions (cm)", "Weight", "Pieces", "Value"];
    const colWidths = [30, 80, 140, 70, 60, 80];
    let xPos = 45;

    headers.forEach((header, idx) => {
      page.drawText(header, {
        x: xPos,
        y: yPos,
        size: 9,
        font: boldFont,
        color: primaryColor,
      });
      xPos += colWidths[idx];
    });

    // Table rows
    yPos -= 25;
    let totalWeight = 0;
    let totalValue = 0;
    let totalPieces = 0;

    shipment.packages.forEach((pkg, idx) => {
      xPos = 45;
      totalWeight += pkg.weight;
      totalValue += pkg.declaredValue || 0;
      totalPieces += pkg.pieces;

      const rowData = [
        `${idx + 1}`,
        pkg.packageType,
        `${pkg.length} × ${pkg.width} × ${pkg.height}`,
        `${pkg.weight} kg`,
        `${pkg.pieces}`,
        `$${pkg.declaredValue || 0}`,
      ];

      rowData.forEach((data, colIdx) => {
        page.drawText(data, {
          x: xPos,
          y: yPos,
          size: 9,
          font: font,
          color: grayColor,
        });
        xPos += colWidths[colIdx];
      });

      // Description
      yPos -= 15;
      page.drawText(`Description: ${pkg.description}`, {
        x: 75,
        y: yPos,
        size: 8,
        font: font,
        color: grayColor,
      });

      // Badges for dangerous/insurance
      if (pkg.dangerous || pkg.insurance) {
        yPos -= 12;
        if (pkg.dangerous) {
          page.drawText("⚠ DANGEROUS GOODS", {
            x: 75,
            y: yPos,
            size: 8,
            font: boldFont,
            color: rgb(0.8, 0.2, 0.2),
          });
        }
        if (pkg.insurance) {
          page.drawText("✓ INSURED", {
            x: pkg.dangerous ? 200 : 75,
            y: yPos,
            size: 8,
            font: boldFont,
            color: rgb(0.2, 0.6, 0.2),
          });
        }
      }

      yPos -= 20;
    });

    // Totals
    yPos -= 10;
    page.drawLine({
      start: { x: 40, y: yPos + 5 },
      end: { x: width - 40, y: yPos + 5 },
      thickness: 1,
      color: lightGray,
    });

    yPos -= 15;
    page.drawText("TOTALS:", {
      x: 45,
      y: yPos,
      size: 10,
      font: boldFont,
      color: primaryColor,
    });

    page.drawText(`Weight: ${totalWeight} kg`, {
      x: 200,
      y: yPos,
      size: 10,
      font: boldFont,
      color: primaryColor,
    });

    page.drawText(`Pieces: ${totalPieces}`, {
      x: 320,
      y: yPos,
      size: 10,
      font: boldFont,
      color: primaryColor,
    });

    page.drawText(`Value: $${totalValue}`, {
      x: 420,
      y: yPos,
      size: 10,
      font: boldFont,
      color: primaryColor,
    });

    // Shipment Info Section
    yPos -= 40;
    page.drawLine({
      start: { x: 40, y: yPos + 10 },
      end: { x: width - 40, y: yPos + 10 },
      thickness: 1,
      color: lightGray,
    });

    page.drawText("SHIPMENT INFORMATION", {
      x: 40,
      y: yPos - 10,
      size: 10,
      font: boldFont,
      color: accentColor,
    });

    yPos -= 35;
    const createdDate = new Date(shipment.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const estDelivery = new Date(shipment.estimatedDelivery).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    page.drawText(`Date Created: ${createdDate}`, {
      x: 40,
      y: yPos,
      size: 10,
      font: font,
      color: grayColor,
    });

    page.drawText(`Estimated Delivery: ${estDelivery}`, {
      x: 280,
      y: yPos,
      size: 10,
      font: font,
      color: grayColor,
    });

    yPos -= 20;
    page.drawText(`Payment Status: ${shipment.isPaid ? "PAID" : "UNPAID"}`, {
      x: 40,
      y: yPos,
      size: 10,
      font: boldFont,
      color: shipment.isPaid ? rgb(0.2, 0.6, 0.2) : rgb(0.8, 0.2, 0.2),
    });

    // Special instructions
    if (shipment.specialInstructions) {
      yPos -= 30;
      page.drawText("SPECIAL INSTRUCTIONS:", {
        x: 40,
        y: yPos,
        size: 10,
        font: boldFont,
        color: accentColor,
      });

      yPos -= 15;
      page.drawText(shipment.specialInstructions, {
        x: 40,
        y: yPos,
        size: 9,
        font: font,
        color: grayColor,
      });
    }

    // Footer
    page.drawRectangle({
      x: 0,
      y: 0,
      width: width,
      height: 60,
      color: lightGray,
    });

    page.drawText("This is an electronically generated document. No signature required.", {
      x: 40,
      y: 35,
      size: 8,
      font: font,
      color: grayColor,
    });

    page.drawText("AsyncShip Logistics | www.asyncship.com | support@asyncship.com | +1 (912) 980-1024", {
      x: 40,
      y: 20,
      size: 8,
      font: font,
      color: grayColor,
    });

    // Barcode placeholder
    page.drawRectangle({
      x: width - 180,
      y: 15,
      width: 140,
      height: 35,
      borderColor: grayColor,
      borderWidth: 1,
    });

    page.drawText(shipment.trackingNumber, {
      x: width - 160,
      y: 28,
      size: 10,
      font: boldFont,
      color: primaryColor,
    });

    // Generate PDF bytes
    const pdfBytes = await pdfDoc.save();

    // Return PDF response
    return new NextResponse(new Uint8Array(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Airway-Bill-${shipment.trackingNumber}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Error generating Airway Bill:", error);
    return NextResponse.json(
      { error: "Failed to generate Airway Bill" },
      { status: 500 }
    );
  }
}