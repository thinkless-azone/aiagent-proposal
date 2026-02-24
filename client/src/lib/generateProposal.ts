import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

// Define types for the input data
interface ProposalItem {
  id: string;
  name: string;
  qty: number;
  price: number;
  category: 'hardware' | 'software' | 'implementation';
}

interface ProposalData {
  variant: 'basic' | 'optimal' | 'budget' | 'custom';
  items: ProposalItem[];
  totalPrice: number;
  title?: string;
  subtitle?: string;
  fileName?: string;
}

// Helper to convert ArrayBuffer to Base64
const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

// Helper to format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(value);
};

export const generateProposal = async (data: ProposalData) => {
  const doc = new jsPDF();

  // Load custom font (fallback to default font when unavailable)
  const regularFontUrl = `${import.meta.env.BASE_URL}Roboto-Regular.ttf`;
  const boldFontUrl = `${import.meta.env.BASE_URL}Roboto-Bold.ttf`;
  let fontFamily: 'Roboto' | 'helvetica' = 'helvetica';

  try {
    const regularResponse = await fetch(regularFontUrl);
    if (regularResponse.ok) {
      const regularBuffer = await regularResponse.arrayBuffer();
      const regularBase64 = arrayBufferToBase64(regularBuffer);
      doc.addFileToVFS('Roboto-Regular.ttf', regularBase64);
      doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');

      // Register bold style explicitly so Cyrillic text in bold cells does not fallback to core fonts.
      const boldResponse = await fetch(boldFontUrl);
      if (boldResponse.ok) {
        const boldBuffer = await boldResponse.arrayBuffer();
        const boldBase64 = arrayBufferToBase64(boldBuffer);
        doc.addFileToVFS('Roboto-Bold.ttf', boldBase64);
        doc.addFont('Roboto-Bold.ttf', 'Roboto', 'bold');
      } else {
        doc.addFont('Roboto-Regular.ttf', 'Roboto', 'bold');
      }

      fontFamily = 'Roboto';
    }
  } catch {
    // Ignore font loading errors and continue with default PDF font
  }

  doc.setFont(fontFamily, 'normal');

  const pageWidth = doc.internal.pageSize.width;
  
  // --- Header ---
  doc.setFontSize(22);
  doc.setTextColor(40, 40, 40);
  doc.text(data.title ?? 'Коммерческое предложение', pageWidth / 2, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text(data.subtitle ?? 'Локальный ИИ-агент для 1С:Предприятие', pageWidth / 2, 30, { align: 'center' });
  
  doc.setFontSize(10);
  doc.text(`Дата: ${format(new Date(), 'd MMMM yyyy', { locale: ru })}`, pageWidth - 20, 40, { align: 'right' });
  
  // --- Project Description ---
  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  const description = "Предлагаем рассмотреть внедрение автономной системы искусственного интеллекта для автоматизации финансово-хозяйственных операций. Решение разворачивается в локальном контуре предприятия, обеспечивая полную конфиденциальность данных и соответствие требованиям импортозамещения.";
  const splitDescription = doc.splitTextToSize(description, pageWidth - 40);
  doc.text(splitDescription, 20, 50);

  // --- Configuration Summary ---
  let yPos = 80;
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text('Конфигурация решения', 20, yPos);
  yPos += 10;

  // Prepare table data
  const tableBody: any[] = data.items.map((item: any) => [
    item.name,
    item.qty,
    new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(item.price),
    new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(item.price * item.qty)
  ]);

  // Add Total Row
  tableBody.push([
    { content: 'ИТОГО:', colSpan: 3, styles: { fontStyle: 'bold', halign: 'right' } },
    { content: formatCurrency(data.totalPrice), styles: { fontStyle: 'bold' } }
  ]);

  // Generate Table
  autoTable(doc, {
    startY: yPos,
    head: [['Наименование', 'Кол-во', 'Цена за ед.', 'Сумма']],
    body: tableBody,
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold', font: fontFamily },
    styles: { font: fontFamily, fontSize: 10, cellPadding: 3 },
    columnStyles: {
      0: { cellWidth: 'auto' },
      1: { cellWidth: 20, halign: 'center' },
      2: { cellWidth: 35, halign: 'right' },
      3: { cellWidth: 35, halign: 'right' }
    },
    didDrawPage: (data) => {
      // Footer
      const pageHeight = doc.internal.pageSize.height;
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text('AZONE AI // Проектное предложение v3.0', 20, pageHeight - 10);
      doc.text(`Страница ${data.pageNumber}`, pageWidth - 20, pageHeight - 10, { align: 'right' });
    }
  });

  // --- Terms & Conditions ---
  const finalY = (doc as any).lastAutoTable.finalY + 20;
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('Условия реализации', 20, finalY);
  
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  const terms = [
    "1. Цены на оборудование являются ориентировочными и уточняются на момент закупки.",
    "2. Срок действия предложения: 30 календарных дней.",
    "3. Условия оплаты: 50% предоплата, 50% после подписания акта приемки-передачи.",
    "4. Гарантия на работы: 12 месяцев с момента ввода в эксплуатацию."
  ];
  
  let termY = finalY + 10;
  terms.forEach(term => {
    doc.text(term, 20, termY);
    termY += 7;
  });

  // --- Signatures ---
  const signY = termY + 20;
  doc.line(20, signY, 80, signY); // Line for signature
  doc.text('М.П.', 25, signY - 5);
  doc.text('Подпись исполнителя', 20, signY + 5);

  // Save the PDF
  doc.save(data.fileName ?? 'commercial_proposal.pdf');
};
