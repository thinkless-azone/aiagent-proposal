import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowRightLeft, Info, RefreshCw, TrendingUp, TrendingDown, Minus, Calculator as CalculatorIcon } from "lucide-react";
import { useEquipmentPricing } from "@/hooks/useEquipmentPricing";
import { useVariant } from "@/contexts/VariantContext";
import { motion, AnimatePresence } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { generateProposal } from "@/lib/generateProposal";
import { FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Calculator() {
  const { prices, formatPrice } = useEquipmentPricing();
  const { selectedVariant, setSelectedVariant } = useVariant();
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<'basic' | 'optimal' | null>(null);

  // State for selected items in the calculator
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({
    // Basic Variant Items
    'graviton-h22i': true,
    'impl-basic-phase-1': true,
    'impl-basic-phase-2': true,
    'impl-basic-phase-3': true,
    
    // Optimal Variant Items
    'yadro-g4208p': true,
    'eltex-mes2300-24': true,
    'alt-linux': true,
    'postgres-pro': true,
    'alt-virtualization': true,
    'ml-platform': true,
    'data-connectors': true,
    'ai-module-ocr': true,
    'ai-module-estimates': true,
    'ai-module-video': true,
    'impl-optimal-phase-1': true,
    'impl-optimal-phase-2': true,
    'impl-optimal-phase-3': true,
  });

  const toggleItem = (id: string) => {
    setSelectedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleDownloadProposal = async (variant: 'basic' | 'optimal') => {
    const items: any[] = [];
    let totalPrice = 0;

    if (variant === 'basic') {
      const basicItems = [
        { id: 'graviton-h22i', name: 'Сервер Гравитон (Intel Xeon)', qty: 1, category: 'hardware' },
        { id: 'eltex-mes2300-24', name: 'Коммутатор Eltex MES2300-24', qty: 1, category: 'hardware' },
        { id: 'alt-linux', name: 'ОС Альт СП / 4305 / Лицензия на право использования Альт СП Сервер релиз 10', qty: 1, category: 'software' },
        { id: 'postgres-pro', name: 'Лицензия СУБД Postgres Pro Certified на 1 ядро x86-64', qty: 4, category: 'software' },
        { id: 'ml-platform', name: 'ML Платформа (Basic)', qty: 1, category: 'software' },
        { id: 'data-connectors', name: 'Коннекторы данных 1С', qty: 1, category: 'software' },
        { id: 'impl-basic-phase-1', name: 'Внедрение: Этап 1 (Анализ)', qty: 1, category: 'implementation' },
        { id: 'impl-basic-phase-2', name: 'Внедрение: Этап 2 (Развертывание)', qty: 1, category: 'implementation' },
        { id: 'impl-basic-phase-3', name: 'Внедрение: Этап 3 (Запуск)', qty: 1, category: 'implementation' },
      ];

      basicItems.forEach(item => {
        if (selectedItems[item.id]) {
          const price = prices[item.id]?.currentPrice || 0;
          items.push({ ...item, price });
          totalPrice += price * item.qty;
        }
      });
    } else {
      const optimalItems = [
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

      optimalItems.forEach(item => {
        if (selectedItems[item.id]) {
          // @ts-ignore
          const price = item.fixedPrice || (prices[item.id]?.currentPrice || 0);
          items.push({ ...item, price });
          totalPrice += price * item.qty;
        }
      });
    }

    setIsGeneratingPdf(variant);
    try {
      // @ts-ignore
      await generateProposal({ variant, items, totalPrice });
    } finally {
      setIsGeneratingPdf(null);
    }
  };

  // Helper to get price display with trend indicator
  const PriceDisplay = ({ id, qty = 1, showCheckbox = false }: { id: string, qty?: number, showCheckbox?: boolean }) => {
    const item = prices[id];
    if (!item) return <span className="animate-pulse">Загрузка...</span>;
    
    const total = item.currentPrice * qty;
    
    const isSelected = selectedItems[id] !== false; // Default to true if not in state
    const displayTotal = isSelected ? total : 0;

    return (
      <div className="flex items-center gap-3 justify-end">
        {showCheckbox && (
          <div className="flex items-center mr-2">
            <Checkbox 
              id={`check-${id}`} 
              checked={isSelected} 
              onCheckedChange={() => toggleItem(id)}
              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
          </div>
        )}
        <div className={`flex items-center gap-2 justify-end ${!isSelected ? 'opacity-50' : ''}`}>
          <AnimatePresence mode="wait">
            <motion.span 
              key={displayTotal}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className={`font-mono font-bold ${!isSelected ? 'text-muted-foreground line-through' : item.trend === 'up' ? 'text-red-400' : item.trend === 'down' ? 'text-green-400' : 'text-primary'}`}
            >
              {formatPrice(displayTotal)}
            </motion.span>
          </AnimatePresence>
          {isSelected && item.trend === 'up' && <TrendingUp className="w-3 h-3 text-red-400" />}
          {isSelected && item.trend === 'down' && <TrendingDown className="w-3 h-3 text-green-400" />}
          {isSelected && item.trend === 'stable' && <Minus className="w-3 h-3 text-muted-foreground" />}
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold uppercase tracking-tight mb-2">Калькулятор стоимости</h1>
          </div>
          <p className="text-muted-foreground max-w-3xl">
            Интерактивный расчет стоимости внедрения. Выберите вариант и настройте конфигурацию.
          </p>
        </div>

        {/* Total Cost Summary Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-4xl mx-auto">
          {/* Basic Variant Card */}
          <Card className={`border-border/50 bg-secondary/50 ${selectedVariant === 'basic' ? 'ring-2 ring-primary' : ''}`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold flex justify-between items-center">
                <span>Базовый вариант</span>
                <Badge variant="outline">
                  {formatPrice(
                    ((selectedItems['graviton-h22i'] ? prices['graviton-h22i']?.currentPrice : 0) || 0) +
                    ((selectedItems['eltex-mes2300-24'] ? prices['eltex-mes2300-24']?.currentPrice : 0) || 0) +
                    ((selectedItems['alt-linux'] ? prices['alt-linux']?.currentPrice : 0) || 0) +
                    ((selectedItems['postgres-pro'] ? prices['postgres-pro']?.currentPrice * 4 : 0) || 0) +
                    ((selectedItems['ml-platform'] ? prices['ml-platform']?.currentPrice : 0) || 0) +
                    ((selectedItems['data-connectors'] ? prices['data-connectors']?.currentPrice : 0) || 0) +
                    ((selectedItems['impl-basic-phase-1'] ? prices['impl-basic-phase-1']?.currentPrice : 0) || 0) +
                    ((selectedItems['impl-basic-phase-2'] ? prices['impl-basic-phase-2']?.currentPrice : 0) || 0) +
                    ((selectedItems['impl-basic-phase-3'] ? prices['impl-basic-phase-3']?.currentPrice : 0) || 0)
                  )}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-4">
                Минимальная конфигурация для пилотного запуска.
              </div>
              <Button variant="outline" className="w-full font-bold" onClick={() => handleDownloadProposal('basic')} disabled={isGeneratingPdf !== null}>
                <FileText className="w-4 h-4 mr-2" />
                {isGeneratingPdf === 'basic' ? 'Формируем PDF...' : 'Скачать смету (PDF)'}
              </Button>
            </CardContent>
          </Card>

          {/* Optimal Variant Card */}
          <Card className={`border-primary bg-primary/5 shadow-[0_0_30px_rgba(59,130,246,0.1)] ${selectedVariant === 'optimal' ? 'ring-2 ring-primary' : ''}`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold text-primary flex justify-between items-center">
                <span>Оптимальный вариант</span>
                <Badge className="bg-primary text-primary-foreground">
                  {formatPrice(
                    ((selectedItems['yadro-g4208p'] ? prices['yadro-g4208p']?.currentPrice : 0) || 0) +
                    ((selectedItems['eltex-mes2300-24'] ? prices['eltex-mes2300-24']?.currentPrice : 0) || 0) +
                    ((selectedItems['alt-linux'] ? prices['alt-linux']?.currentPrice * 2 : 0) || 0) +
                    ((selectedItems['postgres-pro'] ? prices['postgres-pro']?.currentPrice * 4 : 0) || 0) +
                    ((selectedItems['alt-virtualization'] ? prices['alt-virtualization']?.currentPrice * 3 : 0) || 0) +
                    ((selectedItems['ml-platform'] ? prices['ml-platform']?.currentPrice : 0) || 0) +
                    ((selectedItems['data-connectors'] ? prices['data-connectors']?.currentPrice : 0) || 0) +
                    ((selectedItems['ai-module-ocr'] ? 500000 : 0) || 0) +
                    ((selectedItems['ai-module-estimates'] ? 750000 : 0) || 0) +
                    ((selectedItems['ai-module-video'] ? 1200000 : 0) || 0) +
                    ((selectedItems['impl-optimal-phase-1'] ? prices['impl-optimal-phase-1']?.currentPrice : 0) || 0) +
                    ((selectedItems['impl-optimal-phase-2'] ? prices['impl-optimal-phase-2']?.currentPrice : 0) || 0) +
                    ((selectedItems['impl-optimal-phase-3'] ? prices['impl-optimal-phase-3']?.currentPrice : 0) || 0)
                  )}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-4">
                Полный комплект оборудования и ПО для высоконагруженной системы.
              </div>
              <Button className="w-full font-bold" onClick={() => handleDownloadProposal('optimal')} disabled={isGeneratingPdf !== null}>
                <FileText className="w-4 h-4 mr-2" />
                {isGeneratingPdf === 'optimal' ? 'Формируем PDF...' : 'Скачать смету (PDF)'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Breakdown Table with Tabs */}
        <Card>
          <CardHeader>
            <CardTitle className="uppercase tracking-tight">Детализация расчета</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={selectedVariant || "optimal"} value={selectedVariant} onValueChange={(v) => setSelectedVariant(v as any)} className="w-full">
              <div className="flex justify-center mb-6">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="basic">Базовый вариант</TabsTrigger>
                  <TabsTrigger value="optimal">Оптимальный вариант</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="basic">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[400px]">Наименование</TableHead>
                      <TableHead>Категория</TableHead>
                      <TableHead className="text-right">Кол-во</TableHead>
                      <TableHead className="text-right">Цена за ед.</TableHead>
                      <TableHead className="text-right">Итого</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* Hardware Section */}
                    <TableRow className="bg-muted/50">
                      <TableCell colSpan={5} className="font-bold text-xs uppercase text-muted-foreground py-2">
                        Аппаратное обеспечение
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Checkbox 
                            id="check-graviton-h22i" 
                            checked={selectedItems['graviton-h22i']} 
                            onCheckedChange={() => toggleItem('graviton-h22i')}
                          />
                          Сервер Гравитон Н22И
                        </div>
                        <div className="text-xs text-muted-foreground ml-6">2x Intel Xeon Silver, 128GB RAM</div>
                      </TableCell>
                      <TableCell><Badge variant="outline">Серверы</Badge></TableCell>
                      <TableCell className="text-right">1</TableCell>
                      <TableCell className="text-right font-mono text-muted-foreground">{formatPrice(prices['graviton-h22i']?.currentPrice || 0)}</TableCell>
                      <TableCell className="text-right"><PriceDisplay id="graviton-h22i" qty={1} /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Checkbox 
                            id="check-eltex-mes2300-24-basic" 
                            checked={selectedItems['eltex-mes2300-24']} 
                            onCheckedChange={() => toggleItem('eltex-mes2300-24')}
                          />
                          Коммутатор Eltex MES2300-24
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="outline">Сеть</Badge></TableCell>
                      <TableCell className="text-right">1</TableCell>
                      <TableCell className="text-right font-mono text-muted-foreground">{formatPrice(prices['eltex-mes2300-24']?.currentPrice || 0)}</TableCell>
                      <TableCell className="text-right"><PriceDisplay id="eltex-mes2300-24" qty={1} /></TableCell>
                    </TableRow>

                    {/* Software Section */}
                    <TableRow className="bg-muted/50">
                      <TableCell colSpan={5} className="font-bold text-xs uppercase text-muted-foreground py-2">
                        Программное обеспечение
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Checkbox 
                            id="check-alt-linux-basic" 
                            checked={selectedItems['alt-linux']} 
                            onCheckedChange={() => toggleItem('alt-linux')}
                          />
                          ОС Альт СП / 4305 / Лицензия на право использования Альт СП Сервер релиз 10
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="outline">ОС</Badge></TableCell>
                      <TableCell className="text-right">1</TableCell>
                      <TableCell className="text-right font-mono text-muted-foreground">{formatPrice(prices['alt-linux']?.currentPrice || 0)}</TableCell>
                      <TableCell className="text-right"><PriceDisplay id="alt-linux" qty={1} /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Checkbox 
                            id="check-postgres-pro-basic" 
                            checked={selectedItems['postgres-pro']} 
                            onCheckedChange={() => toggleItem('postgres-pro')}
                          />
                          Лицензия СУБД Postgres Pro Certified на 1 ядро x86-64
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="outline">СУБД</Badge></TableCell>
                      <TableCell className="text-right">4</TableCell>
                      <TableCell className="text-right font-mono text-muted-foreground">{formatPrice(prices['postgres-pro']?.currentPrice || 0)}</TableCell>
                      <TableCell className="text-right"><PriceDisplay id="postgres-pro" qty={4} /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Checkbox 
                            id="check-ml-platform-basic" 
                            checked={selectedItems['ml-platform']} 
                            onCheckedChange={() => toggleItem('ml-platform')}
                          />
                          ML Платформа (Basic)
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="outline">Приложение</Badge></TableCell>
                      <TableCell className="text-right">1</TableCell>
                      <TableCell className="text-right font-mono text-muted-foreground">{formatPrice(prices['ml-platform']?.currentPrice || 0)}</TableCell>
                      <TableCell className="text-right"><PriceDisplay id="ml-platform" qty={1} /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Checkbox 
                            id="check-data-connectors-basic" 
                            checked={selectedItems['data-connectors']} 
                            onCheckedChange={() => toggleItem('data-connectors')}
                          />
                          Коннекторы данных 1С
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="outline">Интеграция</Badge></TableCell>
                      <TableCell className="text-right">1</TableCell>
                      <TableCell className="text-right font-mono text-muted-foreground">{formatPrice(prices['data-connectors']?.currentPrice || 0)}</TableCell>
                      <TableCell className="text-right"><PriceDisplay id="data-connectors" qty={1} /></TableCell>
                    </TableRow>

                    {/* Implementation Section */}
                    <TableRow className="bg-muted/50">
                      <TableCell colSpan={5} className="font-bold text-xs uppercase text-muted-foreground py-2">
                        Услуги внедрения
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Checkbox 
                            id="check-impl-basic-phase-1" 
                            checked={selectedItems['impl-basic-phase-1']} 
                            onCheckedChange={() => toggleItem('impl-basic-phase-1')}
                          />
                          Этап 1: Анализ и проектирование
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="outline">Услуги</Badge></TableCell>
                      <TableCell className="text-right">1</TableCell>
                      <TableCell className="text-right font-mono text-muted-foreground">{formatPrice(prices['impl-basic-phase-1']?.currentPrice || 0)}</TableCell>
                      <TableCell className="text-right"><PriceDisplay id="impl-basic-phase-1" qty={1} /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Checkbox 
                            id="check-impl-basic-phase-2" 
                            checked={selectedItems['impl-basic-phase-2']} 
                            onCheckedChange={() => toggleItem('impl-basic-phase-2')}
                          />
                          Этап 2: Развертывание и настройка
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="outline">Услуги</Badge></TableCell>
                      <TableCell className="text-right">1</TableCell>
                      <TableCell className="text-right font-mono text-muted-foreground">{formatPrice(prices['impl-basic-phase-2']?.currentPrice || 0)}</TableCell>
                      <TableCell className="text-right"><PriceDisplay id="impl-basic-phase-2" qty={1} /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Checkbox 
                            id="check-impl-basic-phase-3" 
                            checked={selectedItems['impl-basic-phase-3']} 
                            onCheckedChange={() => toggleItem('impl-basic-phase-3')}
                          />
                          Этап 3: Опытная эксплуатация
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="outline">Услуги</Badge></TableCell>
                      <TableCell className="text-right">1</TableCell>
                      <TableCell className="text-right font-mono text-muted-foreground">{formatPrice(prices['impl-basic-phase-3']?.currentPrice || 0)}</TableCell>
                      <TableCell className="text-right"><PriceDisplay id="impl-basic-phase-3" qty={1} /></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="optimal">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[400px]">Наименование</TableHead>
                      <TableHead>Категория</TableHead>
                      <TableHead className="text-right">Кол-во</TableHead>
                      <TableHead className="text-right">Цена за ед.</TableHead>
                      <TableHead className="text-right">Итого</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* Hardware Section */}
                    <TableRow className="bg-muted/50">
                      <TableCell colSpan={5} className="font-bold text-xs uppercase text-muted-foreground py-2">
                        Аппаратное обеспечение
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Checkbox 
                            id="check-yadro-g4208p" 
                            checked={selectedItems['yadro-g4208p']} 
                            onCheckedChange={() => toggleItem('yadro-g4208p')}
                          />
                          Сервер YADRO G4208P G3
                        </div>
                        <div className="text-xs text-muted-foreground ml-6">2x Intel Xeon Gold, 512GB RAM, NVIDIA H100</div>
                      </TableCell>
                      <TableCell><Badge variant="outline">Серверы</Badge></TableCell>
                      <TableCell className="text-right">1</TableCell>
                      <TableCell className="text-right font-mono text-muted-foreground">{formatPrice(prices['yadro-g4208p']?.currentPrice || 0)}</TableCell>
                      <TableCell className="text-right"><PriceDisplay id="yadro-g4208p" qty={1} /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Checkbox 
                            id="check-eltex-mes2300-24-optimal" 
                            checked={selectedItems['eltex-mes2300-24']} 
                            onCheckedChange={() => toggleItem('eltex-mes2300-24')}
                          />
                          Коммутатор Eltex MES2300-24
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="outline">Сеть</Badge></TableCell>
                      <TableCell className="text-right">1</TableCell>
                      <TableCell className="text-right font-mono text-muted-foreground">{formatPrice(prices['eltex-mes2300-24']?.currentPrice || 0)}</TableCell>
                      <TableCell className="text-right"><PriceDisplay id="eltex-mes2300-24" qty={1} /></TableCell>
                    </TableRow>

                    {/* Software Section */}
                    <TableRow className="bg-muted/50">
                      <TableCell colSpan={5} className="font-bold text-xs uppercase text-muted-foreground py-2">
                        Программное обеспечение
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Checkbox 
                            id="check-alt-linux-optimal" 
                            checked={selectedItems['alt-linux']} 
                            onCheckedChange={() => toggleItem('alt-linux')}
                          />
                          ОС Альт СП / 4305 / Лицензия на право использования Альт СП Сервер релиз 10
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="outline">ОС</Badge></TableCell>
                      <TableCell className="text-right">1</TableCell>
                      <TableCell className="text-right font-mono text-muted-foreground">{formatPrice(prices['alt-linux']?.currentPrice || 0)}</TableCell>
                      <TableCell className="text-right"><PriceDisplay id="alt-linux" qty={1} /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Checkbox 
                            id="check-postgres-pro-optimal" 
                            checked={selectedItems['postgres-pro']} 
                            onCheckedChange={() => toggleItem('postgres-pro')}
                          />
                          Лицензия СУБД Postgres Pro Certified на 1 ядро x86-64
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="outline">СУБД</Badge></TableCell>
                      <TableCell className="text-right">4</TableCell>
                      <TableCell className="text-right font-mono text-muted-foreground">{formatPrice(prices['postgres-pro']?.currentPrice || 0)}</TableCell>
                      <TableCell className="text-right"><PriceDisplay id="postgres-pro" qty={4} /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Checkbox 
                            id="check-alt-virtualization" 
                            checked={selectedItems['alt-virtualization']} 
                            onCheckedChange={() => toggleItem('alt-virtualization')}
                          />
                          Альт Виртуализация / 6487 / Лицензия на право использования Альт Виртуализация 11 редакция PVE
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="outline">Виртуализация</Badge></TableCell>
                      <TableCell className="text-right">3</TableCell>
                      <TableCell className="text-right font-mono text-muted-foreground">{formatPrice(prices['alt-virtualization']?.currentPrice || 0)}</TableCell>
                      <TableCell className="text-right"><PriceDisplay id="alt-virtualization" qty={3} /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Checkbox 
                            id="check-ml-platform-optimal" 
                            checked={selectedItems['ml-platform']} 
                            onCheckedChange={() => toggleItem('ml-platform')}
                          />
                          Платформа ML (Enterprise)
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="outline">Приложение</Badge></TableCell>
                      <TableCell className="text-right">1</TableCell>
                      <TableCell className="text-right font-mono text-muted-foreground">{formatPrice(prices['ml-platform']?.currentPrice || 0)}</TableCell>
                      <TableCell className="text-right"><PriceDisplay id="ml-platform" qty={1} /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Checkbox 
                            id="check-data-connectors" 
                            checked={selectedItems['data-connectors']} 
                            onCheckedChange={() => toggleItem('data-connectors')}
                          />
                          Коннекторы данных 1С
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="outline">Приложение</Badge></TableCell>
                      <TableCell className="text-right">1</TableCell>
                      <TableCell className="text-right font-mono text-muted-foreground">{formatPrice(prices['data-connectors']?.currentPrice || 0)}</TableCell>
                      <TableCell className="text-right"><PriceDisplay id="data-connectors" qty={1} /></TableCell>
                    </TableRow>

                    {/* Business Modules */}
                    <TableRow className="bg-muted/50">
                      <TableCell colSpan={5} className="font-bold text-xs uppercase text-muted-foreground py-2">
                        Бизнес-модули ИИ
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Checkbox 
                            id="check-ai-module-ocr" 
                            checked={selectedItems['ai-module-ocr']} 
                            onCheckedChange={() => toggleItem('ai-module-ocr')}
                          />
                          Модуль: Документооборот (OCR)
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="outline">AI Модуль</Badge></TableCell>
                      <TableCell className="text-right">1</TableCell>
                      <TableCell className="text-right font-mono text-muted-foreground">{formatPrice(500000)}</TableCell>
                      <TableCell className="text-right">
                        <span className={`font-mono font-bold ${!selectedItems['ai-module-ocr'] ? 'text-muted-foreground line-through opacity-50' : 'text-primary'}`}>
                          {selectedItems['ai-module-ocr'] ? formatPrice(500000) : formatPrice(0)}
                        </span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Checkbox 
                            id="check-ai-module-estimates" 
                            checked={selectedItems['ai-module-estimates']} 
                            onCheckedChange={() => toggleItem('ai-module-estimates')}
                          />
                          Модуль: Сметы и Закупки
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="outline">AI Модуль</Badge></TableCell>
                      <TableCell className="text-right">1</TableCell>
                      <TableCell className="text-right font-mono text-muted-foreground">{formatPrice(750000)}</TableCell>
                      <TableCell className="text-right">
                        <span className={`font-mono font-bold ${!selectedItems['ai-module-estimates'] ? 'text-muted-foreground line-through opacity-50' : 'text-primary'}`}>
                          {selectedItems['ai-module-estimates'] ? formatPrice(750000) : formatPrice(0)}
                        </span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Checkbox 
                            id="check-ai-module-video" 
                            checked={selectedItems['ai-module-video']} 
                            onCheckedChange={() => toggleItem('ai-module-video')}
                          />
                          Модуль: Видеоаналитика
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="outline">AI Модуль</Badge></TableCell>
                      <TableCell className="text-right">1</TableCell>
                      <TableCell className="text-right font-mono text-muted-foreground">{formatPrice(1200000)}</TableCell>
                      <TableCell className="text-right">
                        <span className={`font-mono font-bold ${!selectedItems['ai-module-video'] ? 'text-muted-foreground line-through opacity-50' : 'text-primary'}`}>
                          {selectedItems['ai-module-video'] ? formatPrice(1200000) : formatPrice(0)}
                        </span>
                      </TableCell>
                    </TableRow>

                    {/* Implementation Section */}
                    <TableRow className="bg-muted/50">
                      <TableCell colSpan={5} className="font-bold text-xs uppercase text-muted-foreground py-2">
                        Услуги внедрения
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Checkbox 
                            id="check-impl-optimal-phase-1" 
                            checked={selectedItems['impl-optimal-phase-1']} 
                            onCheckedChange={() => toggleItem('impl-optimal-phase-1')}
                          />
                          Этап 1: Анализ и проектирование
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="outline">Услуги</Badge></TableCell>
                      <TableCell className="text-right">1</TableCell>
                      <TableCell className="text-right font-mono text-muted-foreground">{formatPrice(prices['impl-optimal-phase-1']?.currentPrice || 0)}</TableCell>
                      <TableCell className="text-right"><PriceDisplay id="impl-optimal-phase-1" qty={1} /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Checkbox 
                            id="check-impl-optimal-phase-2" 
                            checked={selectedItems['impl-optimal-phase-2']} 
                            onCheckedChange={() => toggleItem('impl-optimal-phase-2')}
                          />
                          Этап 2: Развертывание и настройка
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="outline">Услуги</Badge></TableCell>
                      <TableCell className="text-right">1</TableCell>
                      <TableCell className="text-right font-mono text-muted-foreground">{formatPrice(prices['impl-optimal-phase-2']?.currentPrice || 0)}</TableCell>
                      <TableCell className="text-right"><PriceDisplay id="impl-optimal-phase-2" qty={1} /></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Checkbox 
                            id="check-impl-optimal-phase-3" 
                            checked={selectedItems['impl-optimal-phase-3']} 
                            onCheckedChange={() => toggleItem('impl-optimal-phase-3')}
                          />
                          Этап 3: Опытная эксплуатация
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="outline">Услуги</Badge></TableCell>
                      <TableCell className="text-right">1</TableCell>
                      <TableCell className="text-right font-mono text-muted-foreground">{formatPrice(prices['impl-optimal-phase-3']?.currentPrice || 0)}</TableCell>
                      <TableCell className="text-right"><PriceDisplay id="impl-optimal-phase-3" qty={1} /></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
