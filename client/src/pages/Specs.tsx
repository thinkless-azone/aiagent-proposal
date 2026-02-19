import { Layout } from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GanttChart } from "@/components/GanttChart";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowRightLeft, Info, RefreshCw, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useEquipmentPricing } from "@/hooks/useEquipmentPricing";
import { useVariant } from "@/contexts/VariantContext";
import { XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";

export default function Specs() {
  const { prices, isLive, setIsLive, lastUpdate, formatPrice } = useEquipmentPricing();
  const { selectedVariant, setSelectedVariant } = useVariant();

  // State for selected items in the calculator
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({
    // Basic Variant Items
    'graviton-h22i': true,
    'data-connectors': true,
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
            <h1 className="text-3xl font-bold uppercase tracking-tight mb-2">Технические спецификации</h1>
          </div>
          <p className="text-muted-foreground max-w-3xl">
            Детальный состав аппаратного и программного обеспечения для оптимального варианта реализации.
            Все оборудование включено в реестр Минпромторга РФ.
          </p>
        </div>

        {/* Architecture Diagram */}
        <div className="mb-12">
          <ArchitectureDiagram />
        </div>

        {/* Total Cost Summary Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-4xl mx-auto">
            {/* Basic Variant Summary */}
            <Card className="border-border/50 bg-secondary/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold flex justify-between items-center">
                  <span>Итого: Базовый вариант</span>
                  <Badge variant="outline">
                    {formatPrice(
                      ((prices['graviton-h22i']?.currentPrice || 0)) +
                      ((prices['eltex-mes2300-24']?.currentPrice || 0)) +
                      ((prices['alt-linux']?.currentPrice || 0)) +
                      (prices['postgres-pro']?.currentPrice * 4 || 0) +
                      (prices['ml-platform']?.currentPrice || 0) +
                      (prices['data-connectors']?.currentPrice || 0) +
                      (prices['impl-basic-phase-1']?.currentPrice || 0) +
                      (prices['impl-basic-phase-2']?.currentPrice || 0) +
                      (prices['impl-basic-phase-3']?.currentPrice || 0)
                    )}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Оборудование:</span>
                    <span className="font-mono">
                      {formatPrice(
                        ((prices['graviton-h22i']?.currentPrice || 0)) +
                        ((prices['eltex-mes2300-24']?.currentPrice || 0))
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ПО:</span>
                    <span className="font-mono">
                      {formatPrice(
                        ((prices['alt-linux']?.currentPrice || 0)) +
                        (prices['postgres-pro']?.currentPrice * 4 || 0) +
                        (prices['ml-platform']?.currentPrice || 0) +
                        (prices['data-connectors']?.currentPrice || 0)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Внедрение:</span>
                    <span className="font-mono">
                      {formatPrice(
                        (prices['impl-basic-phase-1']?.currentPrice || 0) +
                        (prices['impl-basic-phase-2']?.currentPrice || 0) +
                        (prices['impl-basic-phase-3']?.currentPrice || 0)
                      )}
                    </span>
                  </div>
                  <Separator className="my-2" />
                  <div className="text-xs text-muted-foreground italic">
                    * Минимальный комплект для пилотного запуска.
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Optimal Variant Summary */}
            <Card className="border-primary bg-primary/5 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold text-primary flex justify-between items-center">
                  <span>Итого: Оптимальный вариант</span>
                  <Badge className="bg-primary text-primary-foreground">
                    {formatPrice(
                      ((prices['yadro-g4208p']?.currentPrice || 0)) +
                      ((prices['eltex-mes2300-24']?.currentPrice || 0)) +
                      ((prices['alt-linux']?.currentPrice || 0)) +
                      (prices['postgres-pro']?.currentPrice * 4 || 0) +
                      ((prices['alt-virtualization']?.currentPrice || 0) * 3) +
                      (prices['ml-platform']?.currentPrice || 0) +
                      (prices['data-connectors']?.currentPrice || 0) +
                      (prices['impl-optimal-phase-1']?.currentPrice || 0) +
                      (prices['impl-optimal-phase-2']?.currentPrice || 0) +
                      (prices['impl-optimal-phase-3']?.currentPrice || 0)
                    )}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Оборудование:</span>
                    <span className="font-mono">
                      {formatPrice(
                        ((prices['yadro-g4208p']?.currentPrice || 0)) +
                        ((prices['eltex-mes2300-24']?.currentPrice || 0))
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ПО:</span>
                    <span className="font-mono">
                      {formatPrice(
                        ((prices['alt-linux']?.currentPrice || 0)) +
                        (prices['postgres-pro']?.currentPrice * 4 || 0) +
                        ((prices['alt-virtualization']?.currentPrice || 0) * 3) +
                        (prices['ml-platform']?.currentPrice || 0) +
                        (prices['data-connectors']?.currentPrice || 0)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Внедрение:</span>
                    <span className="font-mono">
                      {formatPrice(
                        (prices['impl-optimal-phase-1']?.currentPrice || 0) +
                        (prices['impl-optimal-phase-2']?.currentPrice || 0) +
                        (prices['impl-optimal-phase-3']?.currentPrice || 0)
                      )}
                    </span>
                  </div>
                  <Separator className="my-2 bg-primary/20" />
                  <div className="text-xs text-muted-foreground italic">
                    * Расчет приблизительный. Включает сервер, коммутатор, лицензии ОС, СУБД, ML-платформы и работы по внедрению.
                  </div>
                </div>
              </CardContent>
            </Card>
        </div>

        <Tabs defaultValue={selectedVariant || "optimal"} value={selectedVariant} onValueChange={(v) => setSelectedVariant(v as any)} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="basic">Базовый вариант</TabsTrigger>
              <TabsTrigger value="optimal">Оптимальный вариант</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="basic" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Server Specs */}
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge variant="outline">Сервер</Badge>
                    Гравитон С2122ИУ
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <span className="text-muted-foreground">Процессор:</span>
                        <span className="font-medium">2 × Intel Xeon Scalable (LGA 4677)</span>
                        
                        <span className="text-muted-foreground">ОЗУ:</span>
                        <span className="font-medium">128 GB DDR5</span>

                        <span className="text-muted-foreground">GPU:</span>
                        <span className="font-medium">1x NVIDIA A40</span>
                        
                        <span className="text-muted-foreground">Диски (ОС):</span>
                        <span className="font-medium">2x 480GB SSD SATA (RAID 1)</span>
                        
                        <span className="text-muted-foreground">Диски (Данные):</span>
                        <span className="font-medium">4x 1.92TB SSD SATA</span>
                        
                        <span className="text-muted-foreground">Сеть:</span>
                        <span className="font-medium">2x 10GbE SFP+</span>
                        
                        <span className="text-muted-foreground">Питание:</span>
                        <span className="font-medium">2x 800W (1+1 Redundant)</span>
                        
                        <span className="text-muted-foreground">Форм-фактор:</span>
                        <span className="font-medium">2U Rackmount</span>
                      </div>
                      <Separator />
                      <div className="text-sm text-muted-foreground">
                        <p className="mb-2"><strong>Особенности:</strong></p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Оптимальное соотношение цена/производительность</li>
                          <li>Включен в реестр Минпромторга РФ</li>
                          <li>Поддержка базовых задач инференса ИИ (NVIDIA A40)</li>
                        </ul>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Network Specs */}
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge variant="outline">Сеть</Badge>
                    Eltex MES2300-24
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <span className="text-muted-foreground">Порты:</span>
                        <span className="font-medium">24x 10/100/1000BASE-T</span>
                        
                        <span className="text-muted-foreground">Uplink:</span>
                        <span className="font-medium">4x 10GBASE-R (SFP+)</span>
                        
                        <span className="text-muted-foreground">Производительность:</span>
                        <span className="font-medium">128 Гбит/с</span>
                        
                        <span className="text-muted-foreground">Стекирование:</span>
                        <span className="font-medium">До 8 устройств</span>
                      </div>
                      <Separator />
                      <div className="text-sm text-muted-foreground">
                        <p className="mb-2"><strong>Преимущества:</strong></p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Надежный коммутатор уровня доступа L2+</li>
                          <li>Поддержка VLAN, QoS, IGMP Snooping</li>
                          <li>Российское производство (Реестр Минпромторга)</li>
                        </ul>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="optimal" className="space-y-8">


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Server Specs */}
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge variant="outline">Сервер</Badge>
                    YADRO G4208P G3
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <span className="text-muted-foreground">Процессор:</span>
                        <span className="font-medium">2x Intel Xeon Scalable (LGA 4677)</span>
                        
                        <span className="text-muted-foreground">ОЗУ:</span>
                        <span className="font-medium">128 GB DDR5</span>
                        
                        <span className="text-muted-foreground">GPU:</span>
                        <span className="font-medium">1x NVIDIA A40</span>
                        
                        <span className="text-muted-foreground">Диски (ОС):</span>
                        <span className="font-medium">2x 480GB SSD SATA (RAID 1)</span>
                        
                        <span className="text-muted-foreground">Диски (Данные):</span>
                        <span className="font-medium">4x 1.92TB SSD SATA</span>
                        
                        <span className="text-muted-foreground">Сеть:</span>
                        <span className="font-medium">2x 10GbE SFP+</span>
                        
                        <span className="text-muted-foreground">Питание:</span>
                        <span className="font-medium">2x 800W (1+1 Redundant)</span>
                        
                        <span className="text-muted-foreground">Форм-фактор:</span>
                        <span className="font-medium">2U Rackmount</span>
                      </div>
                      <Separator />
                      <div className="text-sm text-muted-foreground">
                        <p className="mb-2"><strong>Преимущества:</strong></p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Высочайшая производительность для обучения LLM</li>
                          <li>Масштабируемость до 8 GPU</li>
                          <li>Российское производство (Реестр Минпромторга)</li>
                          <li>Встроенные возможности для хранения больших данных</li>
                        </ul>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Software Specs */}
              <Card className="h-full md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge variant="outline">Программное обеспечение</Badge>
                    Лицензии и ПО
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium mb-1">Операционная система</p>
                          <p className="text-muted-foreground">ОС Альт СП / 4305 / Лицензия на право использования Альт СП Сервер релиз 10</p>
                          <p className="text-xs text-muted-foreground mt-1">1 шт.</p>
                        </div>
                        
                        <div>
                          <p className="font-medium mb-1">СУБД</p>
                          <p className="text-muted-foreground">Лицензия СУБД Postgres Pro Certified на 1 ядро x86-64</p>
                          <p className="text-xs text-muted-foreground mt-1">4 шт. (лицензирование 4 ядер)</p>
                        </div>
                        
                        <div>
                          <p className="font-medium mb-1">Виртуализация</p>
                          <p className="text-muted-foreground">Альт Виртуализация 11 редакция PVE</p>
                          <p className="text-xs text-muted-foreground mt-1">3 шт. (для кластера)</p>
                        </div>
                        
                        <div>
                          <p className="font-medium mb-1">ML Платформа</p>
                          <p className="text-muted-foreground">Платформа управления моделями (MLOps)</p>
                          <p className="text-xs text-muted-foreground mt-1">Enterprise лицензия</p>
                        </div>
                      </div>
                      <Separator />
                      <div className="text-sm text-muted-foreground">
                        <p className="mb-2"><strong>Преимущества:</strong></p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Полностью российское ПО (Реестр Минцифры)</li>
                          <li>Сертифицированные версии ФСТЭК</li>
                          <li>Поддержка кластеризации и высокой доступности</li>
                          <li>Профессиональная техническая поддержка</li>
                        </ul>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Network Specs */}
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge variant="outline">Сеть</Badge>
                    Eltex MES2300-24
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <span className="text-muted-foreground">Порты доступа:</span>
                        <span className="font-medium">24x 10/100/1000BASE-T</span>
                        
                        <span className="text-muted-foreground">Uplink порты:</span>
                        <span className="font-medium">4x 10GBASE-R (SFP+)</span>
                        
                        <span className="text-muted-foreground">Производительность:</span>
                        <span className="font-medium">128 Гбит/с</span>
                        
                        <span className="text-muted-foreground">Стекирование:</span>
                        <span className="font-medium">До 8 устройств</span>
                        
                        <span className="text-muted-foreground">L3 функции:</span>
                        <span className="font-medium">Статическая маршрутизация, RIP, OSPF</span>
                      </div>
                      <Separator />
                      <div className="text-sm text-muted-foreground">
                        <p className="mb-2"><strong>Особенности:</strong></p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Поддержка VLAN (802.1Q), Q-in-Q</li>
                          <li>Функции безопасности (L2-L4 ACL, IP Source Guard)</li>
                          <li>Расширенные функции QoS</li>
                          <li>Энергоэффективность (Green Ethernet)</li>
                        </ul>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
