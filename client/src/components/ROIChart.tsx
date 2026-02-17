import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useEquipmentPricing } from "@/hooks/useEquipmentPricing";

export function ROIChart() {
  const { prices, formatPrice } = useEquipmentPricing();
  const [docVolume, setDocVolume] = useState(2000); // Documents per month
  const [manualCost, setManualCost] = useState(150); // Cost per document manual processing (RUB)
  
  // Calculate Initial Investments (CAPEX)
  const basicCapex = useMemo(() => {
    return (prices['graviton-h22i']?.currentPrice || 0) + 
           (prices['eltex-mes2300-24']?.currentPrice || 0) +
           (prices['alt-linux']?.currentPrice || 0) +
           (prices['postgres-pro']?.currentPrice * 4 || 0) +
           (prices['ml-platform']?.currentPrice || 0) +
           (prices['data-connectors']?.currentPrice || 0) +
           (prices['impl-basic-phase-1']?.currentPrice || 0) +
           (prices['impl-basic-phase-2']?.currentPrice || 0) +
           (prices['impl-basic-phase-3']?.currentPrice || 0);
  }, [prices]);

  const optimalCapex = useMemo(() => {
    return (prices['yadro-g4208p']?.currentPrice || 0) + 
           (prices['eltex-mes2300-24']?.currentPrice || 0) +
           (prices['alt-linux']?.currentPrice || 0) +
           (prices['postgres-pro']?.currentPrice * 4 || 0) +
           (prices['alt-virtualization']?.currentPrice * 3 || 0) +
           (prices['ml-platform']?.currentPrice || 0) +
           (prices['data-connectors']?.currentPrice || 0) +
           (prices['impl-optimal-phase-1']?.currentPrice || 0) +
           (prices['impl-optimal-phase-2']?.currentPrice || 0) +
           (prices['impl-optimal-phase-3']?.currentPrice || 0) +
           500000 + 750000 + 1200000; // AI Modules
  }, [prices]);

  // Generate Chart Data
  const data = useMemo(() => {
    const months = 24;
    const chartData = [];
    
    // Monthly OPEX (Maintenance, Electricity, etc.) - Estimated
    const basicOpex = 50000; 
    const optimalOpex = 80000;
    
    // AI Processing Cost (Electricity + Maintenance per doc) - Very low compared to manual
    const aiCostPerDoc = 5; 

    for (let i = 0; i <= months; i++) {
      // Cumulative Cost of Manual Processing (The "Do Nothing" Scenario)
      const manualCumulative = i * docVolume * manualCost;
      
      // Cumulative Cost of Basic Variant
      const basicCumulative = basicCapex + (i * basicOpex) + (i * docVolume * aiCostPerDoc);
      
      // Cumulative Cost of Optimal Variant
      const optimalCumulative = optimalCapex + (i * optimalOpex) + (i * docVolume * aiCostPerDoc);

      chartData.push({
        month: i,
        manual: manualCumulative,
        basic: basicCumulative,
        optimal: optimalCumulative,
      });
    }
    return chartData;
  }, [docVolume, manualCost, basicCapex, optimalCapex]);

  // Find Break-even points
  const basicBreakEven = data.find(d => d.manual >= d.basic)?.month;
  const optimalBreakEven = data.find(d => d.manual >= d.optimal)?.month;

  return (
    <Card className="w-full border-2 border-primary/20 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold uppercase tracking-tight flex items-center gap-2">
          <span className="text-primary">ROI</span> Калькулятор окупаемости
        </CardTitle>
        <CardDescription>
          Оцените срок окупаемости внедрения в зависимости от объема документооборота.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="volume">Объем документов в месяц</Label>
                <span className="font-bold text-primary">{docVolume} шт.</span>
              </div>
              <Slider 
                id="volume"
                min={500} 
                max={20000} 
                step={100} 
                value={[docVolume]} 
                onValueChange={(v) => setDocVolume(v[0])}
                className="py-4"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="cost">Стоимость ручной обработки (1 док.)</Label>
                <span className="font-bold text-primary">{manualCost} ₽</span>
              </div>
              <Slider 
                id="cost"
                min={50} 
                max={500} 
                step={10} 
                value={[manualCost]} 
                onValueChange={(v) => setManualCost(v[0])}
                className="py-4"
              />
              <p className="text-xs text-muted-foreground">
                Включает ФОТ сотрудников, налоги, рабочее место, время на исправление ошибок.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-secondary/30 p-4 rounded-lg border border-border/50">
              <div className="text-sm text-muted-foreground mb-1">Окупаемость (Базовый)</div>
              <div className="text-3xl font-bold text-primary">
                {basicBreakEven ? `${basicBreakEven} мес.` : '> 24 мес.'}
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                CAPEX: {formatPrice(basicCapex)}
              </div>
            </div>
            <div className="bg-secondary/30 p-4 rounded-lg border border-border/50">
              <div className="text-sm text-muted-foreground mb-1">Окупаемость (Оптимальный)</div>
              <div className="text-3xl font-bold text-primary">
                {optimalBreakEven ? `${optimalBreakEven} мес.` : '> 24 мес.'}
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                CAPEX: {formatPrice(optimalCapex)}
              </div>
            </div>
          </div>
        </div>

        <div className="h-[400px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.2} />
              <XAxis 
                dataKey="month" 
                label={{ value: 'Месяцы', position: 'insideBottomRight', offset: -5 }} 
                stroke="#888"
              />
              <YAxis 
                tickFormatter={(value) => `${value / 1000000}M`} 
                stroke="#888"
                label={{ value: 'Затраты (₽)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                formatter={(value: number) => formatPrice(value)}
                labelFormatter={(label) => `${label} месяц`}
                contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333', color: '#fff' }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="manual" 
                name="Ручная обработка (Текущие затраты)" 
                stroke="#ef4444" 
                strokeWidth={2}
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="basic" 
                name="Базовый вариант (Внедрение + Поддержка)" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="optimal" 
                name="Оптимальный вариант (Внедрение + Поддержка)" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={false}
              />
              {basicBreakEven && (
                <ReferenceLine x={basicBreakEven} stroke="#3b82f6" strokeDasharray="3 3" label="Окупаемость Базового" />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
