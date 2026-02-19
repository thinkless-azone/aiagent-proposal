import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Download } from "lucide-react";
import { generateDocxProposal } from "@/lib/generateDocxProposal";
import { useEquipmentPricing } from "@/hooks/useEquipmentPricing";

interface ProposalItem {
  id: string;
  name: string;
  qty: number;
  category: 'hardware' | 'software' | 'implementation';
  fixedPrice?: number;
}

const basicItems: ProposalItem[] = [
  { id: 'graviton-h22i', name: 'Сервер Гравитон С2122ИУ', qty: 1, category: 'hardware' },
  { id: 'eltex-mes2300-24', name: 'Коммутатор Eltex MES2300-24', qty: 1, category: 'hardware' },
  { id: 'alt-linux', name: 'ОС Альт СП / 4305 / Лицензия на право использования Альт СП Сервер релиз 10', qty: 1, category: 'software' },
  { id: 'postgres-pro', name: 'Лицензия СУБД Postgres Pro Certified на 1 ядро x86-64', qty: 4, category: 'software' },
  { id: 'ml-platform', name: 'ML Платформа', qty: 1, category: 'software' },
  { id: 'data-connectors', name: 'Коннекторы данных', qty: 1, category: 'software' },
  { id: 'impl-basic-phase-1', name: 'Внедрение: Этап 1 (Анализ)', qty: 1, category: 'implementation' },
  { id: 'impl-basic-phase-2', name: 'Внедрение: Этап 2 (Развертывание)', qty: 1, category: 'implementation' },
  { id: 'impl-basic-phase-3', name: 'Внедрение: Этап 3 (Запуск)', qty: 1, category: 'implementation' },
];

const optimalItems: ProposalItem[] = [
  { id: 'yadro-g4208p', name: 'Сервер YADRO G4208P G3', qty: 1, category: 'hardware' },
  { id: 'eltex-mes2300-24', name: 'Коммутатор Eltex MES2300-24', qty: 1, category: 'hardware' },
  { id: 'alt-linux', name: 'ОС Альт СП / 4305 / Лицензия на право использования Альт СП Сервер релиз 10', qty: 1, category: 'software' },
  { id: 'postgres-pro', name: 'Лицензия СУБД Postgres Pro Certified на 1 ядро x86-64', qty: 4, category: 'software' },
  { id: 'alt-virtualization', name: 'Альт Виртуализация / 6487 / Лицензия на право использования Альт Виртуализация 11 редакция PVE', qty: 3, category: 'software' },
  { id: 'ml-platform', name: 'ML Платформа', qty: 1, category: 'software' },
  { id: 'data-connectors', name: 'Коннекторы данных', qty: 1, category: 'software' },
  { id: 'ai-module-ocr', name: 'Модуль: Документооборот (OCR)', qty: 1, category: 'software', fixedPrice: 500000 },
  { id: 'ai-module-estimates', name: 'Модуль: Сметы и Закупки', qty: 1, category: 'software', fixedPrice: 750000 },
  { id: 'ai-module-video', name: 'Модуль: Видеоаналитика', qty: 1, category: 'software', fixedPrice: 1200000 },
  { id: 'impl-optimal-phase-1', name: 'Внедрение: Этап 1 (Анализ)', qty: 1, category: 'implementation' },
  { id: 'impl-optimal-phase-2', name: 'Внедрение: Этап 2 (Развертывание)', qty: 1, category: 'implementation' },
  { id: 'impl-optimal-phase-3', name: 'Внедрение: Этап 3 (Запуск)', qty: 1, category: 'implementation' },
];

export function ProposalConfigDialog() {
  const [open, setOpen] = useState(false);
  const [includeBasic, setIncludeBasic] = useState(true);
  const [includeOptimal, setIncludeOptimal] = useState(true);
  const { prices, formatPrice } = useEquipmentPricing();

  const handleDownload = async () => {
    const variants = [];

    if (includeBasic) {
      const items = basicItems.map(item => ({
        ...item,
        price: item.fixedPrice || (prices[item.id]?.currentPrice || 0),
        category: item.category
      }));
      const totalPrice = items.reduce((sum, item) => sum + (item.price * item.qty), 0);
      variants.push({ name: 'Базовый', items, totalPrice });
    }

    if (includeOptimal) {
      const items = optimalItems.map(item => ({
        ...item,
        price: item.fixedPrice || (prices[item.id]?.currentPrice || 0),
        category: item.category
      }));
      const totalPrice = items.reduce((sum, item) => sum + (item.price * item.qty), 0);
      variants.push({ name: 'Оптимальный', items, totalPrice });
    }

    await generateDocxProposal({ variants: variants as any });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="lg" 
          className="rounded-none text-base font-bold px-8 h-12 hover:bg-primary/10 transition-all gap-2"
        >
          <FileText className="w-5 h-5" />
          Скачать КП (DOCX)
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Настройка коммерческого предложения</DialogTitle>
          <DialogDescription>
            Выберите варианты конфигурации для включения в документ.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
            <Checkbox 
              id="basic-variant" 
              checked={includeBasic}
              onCheckedChange={(checked) => setIncludeBasic(checked as boolean)}
            />
            <div className="grid gap-1.5 leading-none">
              <Label 
                htmlFor="basic-variant"
                className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Базовый вариант
              </Label>
              <p className="text-sm text-muted-foreground">
                Минимальная конфигурация для пилотного запуска.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
            <Checkbox 
              id="optimal-variant" 
              checked={includeOptimal}
              onCheckedChange={(checked) => setIncludeOptimal(checked as boolean)}
            />
            <div className="grid gap-1.5 leading-none">
              <Label 
                htmlFor="optimal-variant"
                className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Оптимальный вариант
              </Label>
              <p className="text-sm text-muted-foreground">
                Полная конфигурация с отказоустойчивостью и расширенными возможностями.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Отмена</Button>
          <Button onClick={handleDownload} className="gap-2" disabled={!includeBasic && !includeOptimal}>
            <Download className="w-4 h-4" />
            Скачать
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
