import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, TrendingUp, ShieldAlert, Clock } from "lucide-react";
import { ROICalculator } from "@/components/ROICalculator";

export default function Risks() {
  return (
    <Layout>
      <div className="space-y-12">
        {/* Risks Section */}
        <section className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold uppercase tracking-tight mb-2">Управление рисками</h1>
            <p className="text-muted-foreground max-w-3xl">
              Анализ потенциальных рисков и стратегии их минимизации для обеспечения успешности проекта.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-l-4 border-l-yellow-500 bg-card">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  <span className="font-mono text-xs font-bold text-yellow-500 uppercase">Технический риск</span>
                </div>
                <CardTitle className="text-lg">Несовместимость оборудования</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p className="mb-2 font-bold text-foreground">Вероятность: Средняя</p>
                <p>Риск несовместимости компонентов российского оборудования с выбранным стеком ML.</p>
                <div className="mt-4 p-3 bg-secondary/50 border border-border text-xs">
                  <span className="font-bold text-primary">Минимизация:</span> Предварительное тестирования (PoC) на оборудовании вендора до закупки.
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500 bg-card">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <ShieldAlert className="w-5 h-5 text-red-500" />
                  <span className="font-mono text-xs font-bold text-red-500 uppercase">Безопасность</span>
                </div>
                <CardTitle className="text-lg">Утечка данных через LLM</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p className="mb-2 font-bold text-foreground">Вероятность: Низкая</p>
                <p>Риск "галлюцинаций" модели или выдачи конфиденциальной информации неавторизованным пользователям.</p>
                <div className="mt-4 p-3 bg-secondary/50 border border-border text-xs">
                  <span className="font-bold text-primary">Минимизация:</span> Полная изоляция контура, RBAC на уровне векторной БД, фильтрация вывода.
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500 bg-card">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span className="font-mono text-xs font-bold text-blue-500 uppercase">Организационный риск</span>
                </div>
                <CardTitle className="text-lg">Затягивание сроков поставки</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p className="mb-2 font-bold text-foreground">Вероятность: Высокая</p>
                <p>Увеличение сроков поставки российского оборудования из-за высокого спроса.</p>
                <div className="mt-4 p-3 bg-secondary/50 border border-border text-xs">
                  <span className="font-bold text-primary">Минимизация:</span> Раннее контрактование, выбор вендоров с наличием на складе (Аквариус).
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ROI Calculator Section */}
        <section className="space-y-6">
          <ROICalculator />
        </section>

        {/* KPI Section */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold uppercase tracking-tight mb-2">Ключевые показатели эффективности (KPI)</h2>
            <p className="text-muted-foreground max-w-3xl">
              Метрики успеха внедрения системы через 6 месяцев после запуска.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <TrendingUp className="w-8 h-8 text-primary mb-4" />
                <div className="text-3xl font-bold text-foreground mb-1">85%</div>
                <div className="text-xs font-bold uppercase text-muted-foreground">Автоматизация ввода</div>
              </CardContent>
            </Card>
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Clock className="w-8 h-8 text-primary mb-4" />
                <div className="text-3xl font-bold text-foreground mb-1">3x</div>
                <div className="text-xs font-bold uppercase text-muted-foreground">Ускорение процессов</div>
              </CardContent>
            </Card>
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <ShieldAlert className="w-8 h-8 text-primary mb-4" />
                <div className="text-3xl font-bold text-foreground mb-1">&lt; 1%</div>
                <div className="text-xs font-bold uppercase text-muted-foreground">Ошибок распознавания</div>
              </CardContent>
            </Card>
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <TrendingUp className="w-8 h-8 text-primary mb-4" />
                <div className="text-3xl font-bold text-foreground mb-1">ROI</div>
                <div className="text-xs font-bold uppercase text-muted-foreground">14 месяцев</div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </Layout>
  );
}
