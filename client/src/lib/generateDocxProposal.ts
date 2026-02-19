import { Document, Packer, Paragraph, Table, TableCell, TableRow, WidthType, TextRun, AlignmentType, BorderStyle, HeadingLevel } from "docx";
import { saveAs } from "file-saver";

interface ProposalItem {
  id: string;
  name: string;
  qty: number;
  price: number;
  category: 'hardware' | 'software' | 'implementation';
}

interface VariantData {
  name: string;
  items: ProposalItem[];
  totalPrice: number;
}

interface ProposalData {
  variants: VariantData[];
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(value);
};

export const generateDocxProposal = async (data: ProposalData) => {
  const generateTable = (items: ProposalItem[], totalPrice: number) => {
    const rows = items.map((item) => 
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph(item.name)] }),
          new TableCell({ children: [new Paragraph({ text: item.qty.toString(), alignment: AlignmentType.CENTER })] }),
          new TableCell({ children: [new Paragraph({ text: formatCurrency(item.price), alignment: AlignmentType.RIGHT })] }),
          new TableCell({ children: [new Paragraph({ text: formatCurrency(item.price * item.qty), alignment: AlignmentType.RIGHT })] }),
        ],
      })
    );

    return new Table({
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: "Наименование", bold: true })] })],
              width: { size: 50, type: WidthType.PERCENTAGE },
              shading: { fill: "E0E0E0" },
            }),
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: "Кол-во", bold: true })], alignment: AlignmentType.CENTER })],
              width: { size: 10, type: WidthType.PERCENTAGE },
              shading: { fill: "E0E0E0" },
            }),
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: "Цена за ед.", bold: true })], alignment: AlignmentType.RIGHT })],
              width: { size: 20, type: WidthType.PERCENTAGE },
              shading: { fill: "E0E0E0" },
            }),
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: "Сумма", bold: true })], alignment: AlignmentType.RIGHT })],
              width: { size: 20, type: WidthType.PERCENTAGE },
              shading: { fill: "E0E0E0" },
            }),
          ],
        }),
        ...rows,
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: "ИТОГО:", bold: true })], alignment: AlignmentType.RIGHT })],
              columnSpan: 3,
            }),
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: formatCurrency(totalPrice), bold: true })], alignment: AlignmentType.RIGHT })],
            }),
          ],
        }),
      ],
      width: { size: 100, type: WidthType.PERCENTAGE },
    });
  };

  const variantSections = data.variants.map((variant) => [
    new Paragraph({
      text: `Вариант: ${variant.name}`,
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 400, after: 200 },
    }),
    generateTable(variant.items, variant.totalPrice),
  ]).flat();

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: "Коммерческое предложение",
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
          }),
          new Paragraph({
            text: "Локальный ИИ-агент для 1С:Предприятие",
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Дата: ${new Date().toLocaleDateString('ru-RU')}`,
                bold: true,
              }),
            ],
            alignment: AlignmentType.RIGHT,
            spacing: { after: 400 },
          }),
          new Paragraph({
            text: "Предлагаем рассмотреть внедрение автономной системы искусственного интеллекта для автоматизации финансово-хозяйственных операций. Решение разворачивается в локальном контуре предприятия, обеспечивая полную конфиденциальность данных и соответствие требованиям импортозамещения.",
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 400 },
          }),
          ...variantSections,
          new Paragraph({
            text: "Условия реализации",
            heading: HeadingLevel.HEADING_3,
            spacing: { before: 400, after: 200 },
          }),
          new Paragraph({ text: "1. Цены на оборудование являются ориентировочными и уточняются на момент закупки." }),
          new Paragraph({ text: "2. Срок действия предложения: 30 календарных дней." }),
          new Paragraph({ text: "3. Условия оплаты: 50% предоплата, 50% после подписания акта приемки-передачи." }),
          new Paragraph({ text: "4. Гарантия на работы: 12 месяцев с момента ввода в эксплуатацию." }),
          new Paragraph({
            text: "__________________________ / Подпись исполнителя",
            alignment: AlignmentType.RIGHT,
            spacing: { before: 800 },
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `Commercial_Proposal_${new Date().toISOString().split('T')[0]}.docx`);
};
