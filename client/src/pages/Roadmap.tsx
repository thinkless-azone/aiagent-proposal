import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useVariant } from "@/contexts/VariantContext";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const basicPhases = [
  {
    id: "01",
    title: "Экспресс-анализ",
    duration: "2 недели",
    cost: "3.0 млн ₽",
    tasks: [
      "Сбор требований",
      "Подготовка инфраструктуры (Гравитон H22И)",
      "Установка базового ПО"
    ]
  },
  {
    id: "02",
    title: "Пилотный запуск",
    duration: "1.5 месяца",
    cost: "5.0 млн ₽",
    tasks: [
      "Развертывание базовых моделей",
      "Настройка коннекторов данных 1С",
      "Обучение ключевых пользователей"
    ]
  },
  {
    id: "03",
    title: "Сдача в эксплуатацию",
    duration: "1 месяц",
    cost: "3.0 млн ₽",
    tasks: [
      "Финальное тестирование",
      "Передача документации",
      "Запуск в продуктив"
    ]
  }
];

const optimalPhases = [
  {
    id: "01",
    title: "Глубокий анализ",
    duration: "1 месяц",
    cost: "4 - 6 млн ₽",
    tasks: [
      "Аудит бизнес-процессов",
      "Проектирование архитектуры (YADRO G4208P)",
      "Детальное ТЗ"
    ]
  },
  {
    id: "02",
    title: "Развертывание ядра",
    duration: "2 - 3 месяца",
    cost: "5 - 9 млн ₽",
    tasks: [
      "Монтаж сервера YADRO G4208P",
      "Настройка высокопроизводительной среды ИИ",
      "Тюнинг производительности моделей"
    ]
  },
  {
    id: "03",
    title: "Внедрение",
    duration: "1 - 2 месяца",
    cost: "3 - 5 млн ₽",
    tasks: [
      "Нагрузочное тестирование",
      "Обучение администраторов",
      "Запуск в промышленную эксплуатацию"
    ]
  }
];

export default function Roadmap() {
  const { selectedVariant, setSelectedVariant } = useVariant();
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>({});

  const togglePhase = (phaseId: string) => {
    setExpandedPhases(prev => ({
      ...prev,
      [phaseId]: !prev[phaseId]
    }));
  };

	  const renderPhases = (phases: typeof basicPhases) => (
	    <div className="relative border-l-2 border-border ml-4 md:ml-8 space-y-12 py-4">
	      {phases.map((phase) => {
	        const isExpanded = expandedPhases[phase.id];
	        return (
	          <div key={phase.id} className="relative pl-8 md:pl-12">
	            {/* Timeline Node */}
	            <div className={`absolute -left-[9px] top-0 w-4 h-4 bg-background border-2 ${isExpanded ? 'border-primary' : 'border-muted-foreground'} rounded-full z-10 transition-colors duration-300`}>
	              <div className={`w-2 h-2 bg-primary rounded-full m-0.5 transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`} />
	            </div>
	
	            <div className="flex flex-col md:flex-row gap-6 md:items-start">
	              <div className="md:w-32 shrink-0">
	                <div className="text-4xl font-bold text-muted-foreground/20 font-mono leading-none">{phase.id}</div>
	                <div className="flex flex-col gap-2 mt-2">
	                  <Badge variant="outline" className="rounded-none border-primary/50 text-primary font-mono text-xs w-fit">
	                    {phase.duration}
	                  </Badge>
	                  <Badge variant="secondary" className="rounded-none font-mono text-xs w-fit">
	                    {phase.cost}
	                  </Badge>
	                </div>
	              </div>
	
	              <Card 
	                className={`flex-1 border bg-card transition-all duration-300 cursor-pointer ${isExpanded ? 'border-primary shadow-lg' : 'border-border hover:border-primary/50'}`}
	                onClick={() => togglePhase(phase.id)}
	              >
	                <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
	                  <CardTitle className="text-xl font-bold uppercase">{phase.title}</CardTitle>
	                  <div className="text-muted-foreground">
	                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
	                  </div>
	                </CardHeader>
	                <AnimatePresence>
	                  {isExpanded && (
	                    <motion.div
	                      initial={{ height: 0, opacity: 0 }}
	                      animate={{ height: "auto", opacity: 1 }}
	                      exit={{ height: 0, opacity: 0 }}
	                      transition={{ duration: 0.3 }}
	                      className="overflow-hidden"
	                    >
	                      <CardContent>
	                        <ul className="space-y-3 pt-2">
	                          {phase.tasks.map((task, idx) => (
	                            <motion.li 
	                              key={`${phase.id}-task-${idx}`} 
	                              initial={{ x: -10, opacity: 0 }}
	                              animate={{ x: 0, opacity: 1 }}
	                              transition={{ delay: idx * 0.1 }}
	                              className="flex items-start gap-3 text-sm text-muted-foreground"
	                            >
	                              <div className="w-1.5 h-1.5 bg-primary mt-1.5 rounded-none shrink-0" />
	                              {task}
	                            </motion.li>
	                          ))}
	                        </ul>
	                      </CardContent>
	                    </motion.div>
	                  )}
	                </AnimatePresence>
	                {!isExpanded && (
	                   <div className="px-6 pb-4 text-xs text-muted-foreground uppercase tracking-wider font-bold opacity-60">
	                     Нажмите, чтобы увидеть задачи
	                   </div>
	                )}
	              </Card>
	            </div>
	          </div>
	        );
	      })}
	    </div>
	  );

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold uppercase tracking-tight mb-2">План реализации проекта</h1>
          </div>
          <p className="text-muted-foreground max-w-3xl">
            Поэтапная стратегия внедрения ИИ-агента. Нажмите на этап, чтобы увидеть подробный список задач.
          </p>
        </div>

        <Tabs defaultValue={selectedVariant || "optimal"} value={selectedVariant} onValueChange={(v) => setSelectedVariant(v as any)} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="basic">Базовый вариант</TabsTrigger>
              <TabsTrigger value="optimal">Оптимальный вариант</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="basic">
            <div className="mb-6 p-4 bg-secondary/50 rounded-lg border border-border">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm uppercase text-muted-foreground">Общий срок: 3 месяца</span>
                <span className="font-bold text-sm uppercase text-muted-foreground">Бюджет: 11 млн ₽</span>
              </div>
            </div>
            {renderPhases(basicPhases)}
          </TabsContent>

          <TabsContent value="optimal">
            <div className="mb-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm uppercase text-primary">Общий срок: 4 - 6 месяцев</span>
                <span className="font-bold text-sm uppercase text-primary">Бюджет: 12 - 20 млн ₽</span>
              </div>
            </div>
            {renderPhases(optimalPhases)}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
