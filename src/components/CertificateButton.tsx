"use client";

import { jsPDF } from "jspdf";

interface CertificateButtonProps {
  userName: string;
  walletAddress: string;
  trackName: string;
}

export default function CertificateButton({ userName, walletAddress, trackName }: CertificateButtonProps) {
  const handleDownload = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "a4"
    });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(36);
    doc.text("Certificate of Completion", 300, 80, { align: "center" });

    doc.setFontSize(20);
    doc.text(`This certifies that ${userName}`, 300, 150, { align: "center" });
    doc.text(`Wallet: ${walletAddress}`, 300, 190, { align: "center" });
    doc.text(`has successfully completed the ${trackName} track.`, 300, 230, { align: "center" });

    doc.save(`certificate-${trackName}-${userName}.pdf`);
  };

  return (
    <button
      onClick={handleDownload}
      className="px-4 py-2 bg-teal-400 hover:bg-teal-500 text-white font-bold rounded-lg"
    >
      Download Certificate
    </button>
  );
}
