import { useState } from "react";
import { useVariant } from "@/contexts/VariantContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Calendar, CheckCircle2, Flag, Search, Server, Users } from "lucide-react";

interface Task {
  id: string;
  title: string;
  startMonth: number;
  duration: number;
  description: string;
  icon: React.ReactNode;
  details: string[];
}

const tasks: Task[] = [
  {
    id: "phase1",
    title: "Этап 1: Проектирование",
    startMonth: 1,
    duration: 1,
    description: "Аудит, ТЗ и Архитектура",
    icon: <Search className="w-4 h-4" />,
    details: [
      "Аудит процессов СЭБ и интервью",
      "Разработка Технического Задания",
      "Закупка и поставка оборудования",
      "Проектирование архитектуры данных"
    ]
  },
  {
    id: "phase2",
    title: "Этап 2: Разработка ядра",
    startMonth: 2,
    duration: 3,
    description: "ML Модели и Интеграция",
    icon: <Server className="w-4 h-4" />,
    details: [
      "Разметка датасетов (договоры, счета)",
      "Обучение LLM и GraphNN моделей",
      "Разработка API шлюзов",
      "Интеграция с 1С:Предприятие"
    ]
  },
  {
    id: "phase3",
    title: "Этап 3: Внедрение",
    startMonth: 5,
    duration: 2,
    description: "Пилот и Эксплуатация",
    icon: <Flag className="w-4 h-4" />,
    details: [
      "Пилотный запуск в режиме 'суфлера'",
      "Валидация результатов с СЭБ",
      "Обучение персонала",
      "Сдача в промышленную эксплуатацию"
    ]
  }
];

export function GanttChart() {
  const [activeTask, setActiveTask] = useState<string | null>(null);
  const { selectedVariant } = useVariant();

  // Define tasks for Basic variant (4 months max)
  const basicTasks: Task[] = [
    {
      id: "basic-phase1",
      title: "Этап 1: Анализ",
      startMonth: 1,
      duration: 1,
      description: "Аудит и ТЗ",
      icon: <Search className="w-4 h-4" />,
      details: [
        "Аудит инфраструктуры",
        "Разработка ТЗ",
        "Проектирование архитектуры"
      ]
    },
    {
      id: "basic-phase2",
      title: "Этап 2: Развертывание",
      startMonth: 2,
      duration: 2,
      description: "Монтаж и Настройка",
      icon: <Server className="w-4 h-4" />,
      details: [
        "Монтаж оборудования",
        "Установка ПО (Альт Линукс, Postgres)",
        "Базовая настройка моделей"
      ]
    },
    {
      id: "basic-phase3",
      title: "Этап 3: Запуск",
      startMonth: 4,
      duration: 1,
      description: "Обучение и Старт",
      icon: <Flag className="w-4 h-4" />,
      details: [
        "Обучение персонала",
        "Опытная эксплуатация",
        "Передача в поддержку"
      ]
    }
  ];

  // Define tasks for Optimal variant (6 months max)
  const optimalTasks: Task[] = [
    {
      id: "opt-phase1",
      title: "Этап 1: Проектирование",
      startMonth: 1,
      duration: 1,
      description: "Аудит, ТЗ и HA-Архитектура",
      icon: <Search className="w-4 h-4" />,
      details: [
        "Глубокий аудит процессов",
        "Проектирование HA-кластера",
        "Детальное ТЗ"
      ]
    },
    {
      id: "opt-phase2",
      title: "Этап 2: Разработка ядра",
      startMonth: 2,
      duration: 3,
      description: "Кластер и Тюнинг",
      icon: <Server className="w-4 h-4" />,
      details: [
        "Настройка кластера виртуализации",
        "Репликация данных",
        "Тюнинг производительности моделей"
      ]
    },
    {
      id: "opt-phase3",
      title: "Этап 3: Внедрение",
      startMonth: 5,
      duration: 2,
      description: "Нагрузка и Прод",
      icon: <Flag className="w-4 h-4" />,
      details: [
        "Нагрузочное тестирование",
        "Обучение администраторов",
        "Запуск в промышленную эксплуатацию"
      ]
    }
  ];

  // Determine which tasks to show
  const currentTasks = selectedVariant === 'basic' ? basicTasks : optimalTasks;
  const totalMonths = selectedVariant === 'basic' ? 4 : 6;
  const variantTitle = selectedVariant === 'basic' ? "Базовый вариант: 4 месяца" : "Оптимальный вариант: 6 месяцев";

  return (
    <Card className="border border-border bg-card w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Интерактивный план-график ({selectedVariant === 'all' ? "Сравнение сроков" : variantTitle})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Timeline Header */}
          <div className={`grid grid-cols-${totalMonths} gap-1 text-center text-xs font-mono text-muted-foreground mb-2`} style={{ gridTemplateColumns: `repeat(${totalMonths}, minmax(0, 1fr))` }}>
            {Array.from({ length: totalMonths }).map((_, i) => (
              <div key={i} className="border-b border-border pb-2">
                Мес {i + 1}
              </div>
            ))}
          </div>

          {/* Timeline Bars */}
          <div className="relative space-y-4">
            {/* Grid Lines */}
            <div className={`absolute inset-0 grid grid-cols-${totalMonths} gap-1 pointer-events-none h-full`} style={{ gridTemplateColumns: `repeat(${totalMonths}, minmax(0, 1fr))` }}>
              {Array.from({ length: totalMonths }).map((_, i) => (
                <div key={i} className="border-r border-border/30 h-full last:border-r-0" />
              ))}
            </div>

            {currentTasks.map((task) => (
              <div key={task.id} className="relative z-10 group">
                  <div 
                    className={`grid grid-cols-${totalMonths} gap-1`} style={{ gridTemplateColumns: `repeat(${totalMonths}, minmax(0, 1fr))` }}
                    onMouseEnter={() => setActiveTask(task.id)}
                    onMouseLeave={() => setActiveTask(null)}
                  >
                    <div 
                      className={`col-span-${totalMonths} relative h-12 flex items-center`} style={{ gridColumn: `span ${totalMonths} / span ${totalMonths}` }}
                    >
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "100%", opacity: 1 }}
                      transition={{ duration: 0.5, delay: task.startMonth * 0.1 }}
                      className={`
                        absolute h-10 rounded-md border cursor-pointer transition-all duration-300
                        flex items-center px-3 gap-2 overflow-hidden
                        ${activeTask === task.id 
                          ? "bg-primary/20 border-primary shadow-[0_0_15px_rgba(var(--primary),0.3)] z-20 scale-[1.02]" 
                          : "bg-secondary/50 border-border hover:bg-secondary"}
                      `}
                      style={{
                        left: `${((task.startMonth - 1) / totalMonths) * 100}%`,
                        width: `${(task.duration / totalMonths) * 100}%`
                      }}
                    >
                      <div className={`p-1.5 rounded-full ${activeTask === task.id ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground"}`}>
                        {task.icon}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className={`text-sm font-bold truncate ${activeTask === task.id ? "text-primary" : "text-foreground"}`}>
                          {task.title}
                        </span>
                        <span className="text-xs text-muted-foreground truncate">
                          {task.description}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Expanded Details Panel */}
                <motion.div
                  initial={false}
                  animate={{ 
                    height: activeTask === task.id ? "auto" : 0,
                    opacity: activeTask === task.id ? 1 : 0,
                    marginBottom: activeTask === task.id ? 16 : 0
                  }}
                  className="overflow-hidden"
                >
                  <div className="bg-secondary/20 border border-border rounded-md p-4 ml-2 mr-2 mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-primary mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> Ключевые задачи:
                      </h4>
                      <ul className="space-y-1">
                        {task.details.map((detail, idx) => (
                          <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                            <span className="w-1 h-1 bg-primary rounded-full mt-1.5" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center justify-center border-l border-border/50 pl-4">
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Длительность</div>
                        <div className="text-2xl font-bold font-mono text-foreground">{task.duration} мес.</div>
                        <Badge variant="outline" className="mt-2 border-primary/30 text-primary">
                          {task.startMonth} - {task.startMonth + task.duration - 1} месяц
                        </Badge>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary/20 border border-primary rounded-sm" />
              <span>Активный этап</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>Параллельная работа команды (7 чел.)</span>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-secondary/20 border border-border rounded-md">
            <h4 className="text-sm font-bold text-foreground mb-2">Сроки реализации:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between items-center p-2 bg-background/50 rounded border border-border">
                <span className="text-muted-foreground">Базовый вариант</span>
                <span className="font-mono font-bold text-primary">2 - 4 месяца</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-background/50 rounded border border-border">
                <span className="text-muted-foreground">Оптимальный вариант</span>
                <span className="font-mono font-bold text-primary">3 - 6 месяцев</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
