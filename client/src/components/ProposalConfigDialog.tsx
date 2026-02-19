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
  const [selectedItems, setSelectedItems] = useState<string[]>(optimalItems.map(item => item.id));
  const { prices, formatPrice } = useEquipmentPricing();

  const handleToggleItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleDownload = async () => {
    const itemsToInclude = optimalItems.filter(item => selectedItems.includes(item.id));
    
    const items = itemsToInclude.map(item => ({
      ...item,
      price: item.fixedPrice || (prices[item.id]?.currentPrice || 0),
      category: item.category
    }));

    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.qty), 0);

    await generateDocxProposal({
      variant: 'optimal',
      items,
      totalPrice
    });
    
    setOpen(false);
  };

  const calculateTotal = () => {
    const total = optimalItems
      .filter(item => selectedItems.includes(item.id))
      .reduce((sum, item) => sum + ((item.fixedPrice || prices[item.id]?.currentPrice || 0) * item.qty), 0);
    return total;
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
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Настройка коммерческого предложения</DialogTitle>
          <DialogDescription>
            Выберите позиции, которые необходимо включить в итоговый документ.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2 mb-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => setSelectedItems(['yadro-g4208p', 'eltex-mes2300-24', 'alt-linux', 'postgres-pro', 'alt-virtualization'])}
          >
            Минимальная
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => setSelectedItems(optimalItems.map(item => item.id))}
          >
            Полная
          </Button>
        </div>
        
        <ScrollArea className="h-[350px] pr-4">
          <div className="space-y-4">
            {['hardware', 'software', 'implementation'].map((category) => {
              const categoryItems = optimalItems.filter(item => item.category === category);
              if (categoryItems.length === 0) return null;

              const categoryTitle = {
                hardware: 'Оборудование',
                software: 'Программное обеспечение',
                implementation: 'Внедрение'
              }[category as 'hardware' | 'software' | 'implementation'];

              return (
                <div key={category} className="space-y-2">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-2">
                    {categoryTitle}
                  </h3>
                  {categoryItems.map((item) => (
                    <div key={item.id} className="flex items-start space-x-3 p-2 rounded hover:bg-muted/50 transition-colors">
                      <Checkbox 
                        id={item.id} 
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={() => handleToggleItem(item.id)}
                      />
                      <div className="grid gap-1.5 leading-none w-full">
                        <Label 
                          htmlFor={item.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {item.name}
                        </Label>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{item.qty} шт.</span>
                          <span>{formatPrice((prices[item.id]?.currentPrice || 0) * item.qty)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </ScrollArea>

        <div className="flex items-center justify-between border-t pt-4 mt-4">
          <div className="text-sm">
            <span className="text-muted-foreground">Итого: </span>
            <span className="font-bold text-lg">{formatPrice(calculateTotal())}</span>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Отмена</Button>
            <Button onClick={handleDownload} className="gap-2">
              <Download className="w-4 h-4" />
              Скачать
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
