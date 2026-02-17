import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle2, ArrowRight, RotateCcw, Server } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Recommendation = "basic" | "optimal";

export function Configurator() {
  const [step, setStep] = useState(1);
  const [volume, setVolume] = useState<"low" | "high">("low");
  const [ha, setHa] = useState<"no" | "yes">("no");
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      calculateRecommendation();
    }
  };

  const calculateRecommendation = () => {
    // Logic: If volume is high OR HA is required -> Optimal, else Basic
    if (volume === "high" || ha === "yes") {
      setRecommendation("optimal");
    } else {
      setRecommendation("basic");
    }
    setStep(3);
  };

  const reset = () => {
    setStep(1);
    setVolume("low");
    setHa("no");
    setRecommendation(null);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-2 border-primary/20 shadow-lg overflow-hidden">
      <CardHeader className="bg-secondary/30">
        <CardTitle className="flex items-center gap-2 uppercase tracking-tight">
          <Server className="w-5 h-5 text-primary" />
          Подбор конфигурации
        </CardTitle>
        <CardDescription>
          Ответьте на пару вопросов, чтобы мы подобрали идеальное решение для ваших задач.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 min-h-[300px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-3">
                <h3 className="text-lg font-bold">1. Какой объем документов планируется обрабатывать?</h3>
                <RadioGroup value={volume} onValueChange={(v) => setVolume(v as "low" | "high")}>
                  <div className="flex items-center space-x-2 border p-4 rounded-md hover:bg-secondary/50 transition-colors cursor-pointer" onClick={() => setVolume("low")}>
                    <RadioGroupItem value="low" id="vol-low" />
                    <Label htmlFor="vol-low" className="cursor-pointer flex-1">
                      <span className="font-bold block">До 2 000 документов в месяц</span>
                      <span className="text-muted-foreground text-sm">Пилотные проекты, небольшие отделы</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border p-4 rounded-md hover:bg-secondary/50 transition-colors cursor-pointer" onClick={() => setVolume("high")}>
                    <RadioGroupItem value="high" id="vol-high" />
                    <Label htmlFor="vol-high" className="cursor-pointer flex-1">
                      <span className="font-bold block">Более 2 000 документов в месяц</span>
                      <span className="text-muted-foreground text-sm">Масштабирование, высокая нагрузка</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-3">
                <h3 className="text-lg font-bold">2. Требуется ли отказоустойчивость (High Availability)?</h3>
                <RadioGroup value={ha} onValueChange={(v) => setHa(v as "no" | "yes")}>
                  <div className="flex items-center space-x-2 border p-4 rounded-md hover:bg-secondary/50 transition-colors cursor-pointer" onClick={() => setHa("no")}>
                    <RadioGroupItem value="no" id="ha-no" />
                    <Label htmlFor="ha-no" className="cursor-pointer flex-1">
                      <span className="font-bold block">Нет, допустимы технологические окна</span>
                      <span className="text-muted-foreground text-sm">Экономия бюджета важнее непрерывности</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border p-4 rounded-md hover:bg-secondary/50 transition-colors cursor-pointer" onClick={() => setHa("yes")}>
                    <RadioGroupItem value="yes" id="ha-yes" />
                    <Label htmlFor="ha-yes" className="cursor-pointer flex-1">
                      <span className="font-bold block">Да, критически важно 24/7</span>
                      <span className="text-muted-foreground text-sm">Дублирование узлов, отсутствие простоев</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </motion.div>
          )}

          {step === 3 && recommendation && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <div className="flex justify-center">
                <CheckCircle2 className="w-16 h-16 text-green-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Мы рекомендуем:</h3>
                <div className="text-3xl font-bold text-primary uppercase tracking-tight mb-4">
                  {recommendation === "basic" ? "Вариант 1: Базовый" : "Вариант 2: Оптимальный"}
                </div>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {recommendation === "basic"
                    ? "Отличный выбор для старта. Сервер Гравитон Н22И обеспечит достаточную производительность для ваших задач при минимальных вложениях."
                    : "Максимальная надежность и производительность. Сервер YADRO G4208P G3 с GPU NVIDIA H100 гарантирует стабильную работу под высокой нагрузкой."}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
      <CardFooter className="bg-secondary/30 flex justify-between p-6">
        {step < 3 ? (
          <>
            <div className="flex gap-1">
              <div className={`h-2 w-8 rounded-full transition-colors ${step >= 1 ? "bg-primary" : "bg-primary/20"}`} />
              <div className={`h-2 w-8 rounded-full transition-colors ${step >= 2 ? "bg-primary" : "bg-primary/20"}`} />
            </div>
            <Button onClick={handleNext} className="font-bold">
              {step === 2 ? "Показать результат" : "Далее"} <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </>
        ) : (
          <Button onClick={reset} variant="outline" className="w-full font-bold">
            <RotateCcw className="mr-2 w-4 h-4" /> Пройти заново
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
