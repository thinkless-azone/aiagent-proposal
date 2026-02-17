import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, TrendingUp, DollarSign, Clock, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export function ROICalculator() {
  // State for input values
  const [docVolume, setDocVolume] = useState(5000);
  const [avgDocCost, setAvgDocCost] = useState(150);
  const [errorRate, setErrorRate] = useState(3);
  const [avgErrorCost, setAvgErrorCost] = useState(5000);
  const [fraudRisk, setFraudRisk] = useState(0.5);
  const [avgFraudLoss, setAvgFraudLoss] = useState(500000);

  // State for calculated values
  const [annualSavings, setAnnualSavings] = useState(0);
  const [paybackPeriod, setPaybackPeriod] = useState(0);
  const [roi, setRoi] = useState(0);

  // Constants based on proposal
  const BASIC_COST = 7285000; // ~7.3M
  const OPTIMAL_COST = 21590000; // ~21.6M
  const [selectedVariant, setSelectedVariant] = useState<"basic" | "optimal">("optimal");

  const calculateROI = () => {
    // 1. Labor Savings: Automated processing reduces manual verification time
    // Assuming AI processes 90% of docs, saving 80% of time per doc
    const manualProcessingCost = docVolume * avgDocCost * 12;
    const aiProcessingCost = manualProcessingCost * 0.2; // 80% efficiency gain
    const laborSavings = manualProcessingCost - aiProcessingCost;

    // 2. Error Prevention: Reducing human errors in data entry/verification
    // Assuming AI catches 95% of errors
    const annualErrors = (docVolume * errorRate / 100) * 12;
    const errorCosts = annualErrors * avgErrorCost;
    const errorSavings = errorCosts * 0.95;

    // 3. Fraud Prevention: Preventing financial losses from fraud
    // Probabilistic model: Risk % * Avg Loss
    const fraudLosses = (fraudRisk / 100) * avgFraudLoss * 12; // Monthly risk annualized? No, let's treat risk as annual probability of incident per 1000 docs or similar?
    // Let's simplify: Fraud Risk is % of total transaction volume that is at risk, or % chance of a major incident per year.
    // Better: Estimated annual loss from fraud/inefficiency without AI
    const estimatedFraudLoss = (docVolume * 12) * (fraudRisk / 100) * 10000; // Arbitrary multiplier for transaction value?
    // Let's use the user input directly: "Estimated Annual Fraud Loss" is better.
    // But we have avgFraudLoss per incident. Let's say fraudRisk is % of docs that are problematic.
    const annualFraudIncidents = (docVolume * 12) * (fraudRisk / 100);
    const fraudSavings = annualFraudIncidents * avgErrorCost * 2; // Conservative estimate, usually fraud is much more expensive than simple errors.
    
    // Let's refine the calculation logic to be more defensible
    // Savings = (Manual Cost - AI Cost) + (Error Cost Reduction) + (Fraud Prevention)
    
    const totalAnnualSavings = laborSavings + errorSavings + (annualFraudIncidents * avgFraudLoss * 0.1); // Assuming 10% of risky docs result in actual loss

    setAnnualSavings(Math.round(totalAnnualSavings));

    const investment = selectedVariant === "basic" ? BASIC_COST : OPTIMAL_COST;
    
    // Payback Period (Months) = Investment / (Monthly Savings)
    const monthlySavings = totalAnnualSavings / 12;
    const months = investment / monthlySavings;
    setPaybackPeriod(Number(months.toFixed(1)));

    // ROI % = ((Gain - Cost) / Cost) * 100
    // Let's calculate 3-year ROI
    const threeYearGain = totalAnnualSavings * 3;
    const threeYearCost = investment + (investment * 0.1 * 2); // Maintenance 10% per year for years 2-3
    const roiValue = ((threeYearGain - threeYearCost) / threeYearCost) * 100;
    setRoi(Math.round(roiValue));
  };

  useEffect(() => {
    calculateROI();
  }, [docVolume, avgDocCost, errorRate, avgErrorCost, fraudRisk, avgFraudLoss, selectedVariant]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(value);
  };

  return (
    <Card className="border-primary/20 shadow-lg bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Calculator className="w-6 h-6 text-primary" />
          Калькулятор ROI
        </CardTitle>
        <CardDescription>
          Рассчитайте экономическую эффективность внедрения ИИ-агента для вашей компании.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="optimal" onValueChange={(v) => setSelectedVariant(v as "basic" | "optimal")} className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Базовый вариант (~7.3 млн ₽)</TabsTrigger>
            <TabsTrigger value="optimal">Оптимальный вариант (~21.6 млн ₽)</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-primary" />
                  Объем документов (в месяц)
                </Label>
                <span className="font-mono font-bold text-primary">{docVolume} шт.</span>
              </div>
              <Slider
                value={[docVolume]}
                min={500}
                max={50000}
                step={500}
                onValueChange={(vals) => setDocVolume(vals[0])}
                className="py-2"
              />
              <p className="text-xs text-muted-foreground">Количество счетов, договоров и актов, обрабатываемых вручную.</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  Стоимость обработки 1 документа
                </Label>
                <span className="font-mono font-bold text-primary">{avgDocCost} ₽</span>
              </div>
              <Slider
                value={[avgDocCost]}
                min={50}
                max={1000}
                step={10}
                onValueChange={(vals) => setAvgDocCost(vals[0])}
                className="py-2"
              />
              <p className="text-xs text-muted-foreground">Зарплата сотрудников, налоги, накладные расходы, деленные на объем.</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-primary" />
                  Вероятность ошибок / рисков (%)
                </Label>
                <span className="font-mono font-bold text-primary">{errorRate}%</span>
              </div>
              <Slider
                value={[errorRate]}
                min={0.1}
                max={10}
                step={0.1}
                onValueChange={(vals) => setErrorRate(vals[0])}
                className="py-2"
              />
              <p className="text-xs text-muted-foreground">Процент документов с ошибками или рисками (штрафы, переплаты).</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <motion.div 
                className="bg-primary/10 border border-primary/20 rounded-lg p-6 flex flex-col items-center justify-center text-center"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                key={annualSavings}
              >
                <div className="text-sm text-muted-foreground uppercase font-bold mb-2">Ежегодная экономия</div>
                <div className="text-3xl font-bold text-primary">{formatCurrency(annualSavings)}</div>
                <div className="text-xs text-muted-foreground mt-2">Снижение ФОТ + Предотвращение потерь</div>
              </motion.div>

              <div className="grid grid-cols-2 gap-4">
                <motion.div 
                  className="bg-secondary/50 border border-border rounded-lg p-4 flex flex-col items-center justify-center text-center"
                  key={paybackPeriod}
                >
                  <div className="text-xs text-muted-foreground uppercase font-bold mb-1">Окупаемость</div>
                  <div className={`text-2xl font-bold ${paybackPeriod <= 12 ? 'text-green-500' : 'text-yellow-500'}`}>
                    {paybackPeriod} мес.
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-secondary/50 border border-border rounded-lg p-4 flex flex-col items-center justify-center text-center"
                  key={roi}
                >
                  <div className="text-xs text-muted-foreground uppercase font-bold mb-1">ROI (3 года)</div>
                  <div className={`text-2xl font-bold ${roi > 100 ? 'text-green-500' : 'text-primary'}`}>
                    {roi}%
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <InfoIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p>
                  Расчет является приблизительным. Модель учитывает сокращение трудозатрат на рутинные операции (80%), снижение количества ошибок ввода и предотвращение финансовых рисков. Для точного расчета TCO закажите детальный аудит.
                </p>
              </div>
            </div>
            
            <Button className="w-full font-bold" size="lg">
              Скачать детальный отчет (PDF)
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function InfoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  )
}
