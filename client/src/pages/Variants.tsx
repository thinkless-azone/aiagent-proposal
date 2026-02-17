import { useState, useEffect } from "react";
import { useVariant } from "@/contexts/VariantContext";
import { Layout } from "@/components/Layout";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, Server, HardDrive, Network, Cpu } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Configurator } from "@/components/Configurator";
import { ROIChart } from "@/components/ROIChart";
import { useEquipmentPricing } from "@/hooks/useEquipmentPricing";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function Variants() {
  const { prices, formatPrice } = useEquipmentPricing();
  const { selectedVariant, setSelectedVariant } = useVariant();

  // Calculate totals dynamically
  const basicTotal = (prices['graviton-h22i']?.currentPrice || 0) + 
                     (prices['eltex-mes2300-24']?.currentPrice || 0) +
                     (prices['alt-linux']?.currentPrice || 0) +
                     (prices['postgres-pro']?.currentPrice * 4 || 0) +
                     (prices['ml-platform']?.currentPrice || 0) +
                     (prices['data-connectors']?.currentPrice || 0);

  const optimalTotal = (prices['yadro-g4208p']?.currentPrice || 0) + 
                       (prices['eltex-mes2300-24']?.currentPrice || 0) +
                       (prices['alt-linux']?.currentPrice || 0) +
                       (prices['postgres-pro']?.currentPrice * 4 || 0) +
                       (prices['alt-virtualization']?.currentPrice * 3 || 0) +
                       (prices['ml-platform']?.currentPrice || 0) +
                       (prices['data-connectors']?.currentPrice || 0) +
                       500000 + 750000 + 1200000; // AI Modules

  const BasicCard = () => (
    <Card className={`border-2 ${selectedVariant === 'basic' ? 'border-primary shadow-[0_0_30px_rgba(59,130,246,0.1)]' : 'border-border/50 opacity-80 hover:opacity-100'} transition-all relative overflow-hidden flex flex-col h-full`}>
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold uppercase tracking-tight">Вариант: Базовый</CardTitle>
        <CardDescription className="text-base mt-2">
          Минимально необходимая конфигурация для запуска пилотного проекта.
        </CardDescription>
        <div className="mt-4">
          <div className="text-3xl font-bold text-primary">{formatPrice(basicTotal)}</div>
          <span className="text-sm text-muted-foreground font-bold uppercase">Ориентировочная стоимость оборудования</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 flex-1">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-secondary rounded-none">
              <Server className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <div className="font-bold text-sm uppercase">Серверное оборудование</div>
              <div className="text-sm text-muted-foreground">1x Сервер Гравитон Н22И (Intel Xeon)</div>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="p-2 bg-secondary rounded-none">
              <Cpu className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <div className="font-bold text-sm uppercase">Модели ИИ</div>
              <div className="text-sm text-muted-foreground">Базовые модели (7B параметров), ограниченная производительность</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-secondary rounded-none">
              <Network className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <div className="font-bold text-sm uppercase">Интеграция</div>
              <div className="text-sm text-muted-foreground">Коннекторы данных 1С включены</div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="font-bold text-sm uppercase mb-2 text-muted-foreground">Ключевые характеристики:</div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Обработка до 1,000 документов/мес</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Срок внедрения 3 месяца</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Стоимость внедрения: 11 млн ₽</span>
            </li>
            <li className="flex items-center gap-2">
              <X className="w-4 h-4 text-red-500" />
              <span className="text-muted-foreground">Нет отказоустойчивости</span>
            </li>
            <li className="flex items-center gap-2">
              <X className="w-4 h-4 text-red-500" />
              <span className="text-muted-foreground">Ограниченная масштабируемость</span>
            </li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="bg-secondary/50 border-t border-border/50 p-6">
        <Link href="/specs" className="w-full">
          <Button variant={selectedVariant === 'basic' ? 'default' : 'outline'} className="w-full rounded-none font-bold" onClick={() => setSelectedVariant('basic')}>Посмотреть спецификацию</Button>
        </Link>
      </CardFooter>
    </Card>
  );

  const OptimalCard = () => (
    <Card className="border-2 border-primary shadow-[0_0_30px_rgba(59,130,246,0.1)] relative overflow-hidden flex flex-col h-full">
      <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-xs font-bold font-mono uppercase">
        Рекомендуемый выбор
      </div>
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold uppercase tracking-tight text-primary">Вариант: Оптимальный</CardTitle>
        <CardDescription className="text-base mt-2">
          Сбалансированное решение с высокой доступностью и производительностью.
        </CardDescription>
        <div className="mt-4">
          <div className="text-3xl font-bold text-primary">{formatPrice(optimalTotal)}</div>
          <span className="text-sm text-muted-foreground font-bold uppercase">Ориентировочная стоимость оборудования</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 flex-1">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-none border border-primary/20">
              <Server className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-bold text-sm uppercase">Серверное оборудование</div>
              <div className="text-sm text-muted-foreground">Масштабируемый AI-сервер YADRO G4208P G3</div>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-none border border-primary/20">
              <Cpu className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-bold text-sm uppercase">Модели ИИ</div>
              <div className="text-sm text-muted-foreground">Продвинутые модели (13B-70B параметров), высокая точность</div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="font-bold text-sm uppercase mb-2 text-muted-foreground">Ключевые характеристики:</div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Обработка до 10,000 документов/мес</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Срок внедрения 4-6 месяцев</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Стоимость внедрения: 12-20 млн ₽</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Полная отказоустойчивость (High Availability)</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Масштабируемость без остановки сервиса</span>
            </li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="bg-primary/10 border-t border-primary/20 p-6">
        <Link href="/specs" className="w-full">
          <Button className="w-full rounded-none font-bold bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setSelectedVariant('optimal')}>Посмотреть спецификацию</Button>
        </Link>
      </CardFooter>
    </Card>
  );

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-tight mb-2">Сравнение вариантов</h1>
          <p className="text-muted-foreground max-w-3xl">
            Выберите подходящий вариант реализации в зависимости от бюджета и требований к производительности.
          </p>
        </div>

        {/* Configurator Section */}
        <div className="mb-12">
          <Configurator />
        </div>

        {/* ROI Chart Section */}
        <div className="mb-12">
          <ROIChart />
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-8 flex items-start gap-3">
          <div className="p-1 bg-yellow-500/20 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
          </div>
          <div className="text-sm text-yellow-200/80">
            <span className="font-medium text-yellow-500 block mb-1">Предварительный расчет стоимости</span>
            Указанные цены на оборудование являются ориентировочными и могут изменяться в зависимости от курса валют, доступности компонентов и условий поставщиков на момент закупки. Итоговая стоимость фиксируется в коммерческом предложении.
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <BasicCard />
          <OptimalCard />
        </div>
      </div>
    </Layout>
  );
}
