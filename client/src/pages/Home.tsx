import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Cpu, ShieldCheck, Zap, FileText } from "lucide-react";
import { VideoPlayer } from "@/components/VideoPlayer";
import { Link } from "wouter";
import { ProposalConfigDialog } from "@/components/ProposalConfigDialog";

export default function Home() {
  return (
    <Layout>
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-xl border border-border bg-card">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663030955710/utGjqFYqYTcfkpVo.png" 
              alt="Server Room" 
              className="w-full h-full object-cover opacity-20 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent" />
          </div>
          
          <div className="relative z-10 p-8 md:p-12 max-w-3xl">
            <Badge variant="outline" className="mb-4 border-primary text-primary bg-primary/10 px-3 py-1 rounded-none font-mono">
              PROJECT PROPOSAL v4.0
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 font-display uppercase">
              Внедрение нейросетей <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                в бизнес-процессы
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl">
              Комплексная автоматизация: от управления документацией и закупками до видеоаналитики на стройплощадках. 
              Полная автономность, безопасность данных и соответствие требованиям импортозамещения.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/variants">
                <Button size="lg" className="rounded-none text-base font-bold px-8 h-12 border-2 border-primary bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-all">
                  Обзор решения <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/specs">
                <Button variant="outline" size="lg" className="rounded-none text-base font-bold px-8 h-12 border-2 hover:bg-secondary transition-all">
                  Технические детали
                </Button>
              </Link>
              <ProposalConfigDialog />
            </div>
          </div>
        </section>

        {/* Key Features Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-colors group">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-4 border border-primary/20 group-hover:border-primary group-hover:bg-primary/20 transition-all">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-xl font-bold uppercase tracking-tight">Безопасность</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Полная изоляция данных внутри контура компании. Отсутствие передачи информации в облачные сервисы.
                Соответствие 152-ФЗ.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-colors group">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-4 border border-primary/20 group-hover:border-primary group-hover:bg-primary/20 transition-all">
                <Cpu className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-xl font-bold uppercase tracking-tight">Импортозамещение</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Использование российского оборудования (YADRO) и программного обеспечения (Alt Linux, 1C).
                Независимость от санкций.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-colors group">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-4 border border-primary/20 group-hover:border-primary group-hover:bg-primary/20 transition-all">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-xl font-bold uppercase tracking-tight">Эффективность</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Сокращение времени обработки документов на 85%. Автоматизация рутинных операций и высвобождение ресурсов сотрудников.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Project Overview Stats */}
        <section className="border border-border bg-card p-8 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663030955710/qexCIHhKfWGaqWrH.png" alt="Graph" className="w-64 h-64 object-contain" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            <div>
              <div className="text-4xl font-bold text-primary font-mono mb-2">1</div>
              <div className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Оптимальное решение</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary font-mono mb-2">3-6</div>
              <div className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Месяцев внедрения</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary font-mono mb-2">50+</div>
              <div className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Пользователей</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary font-mono mb-2">100%</div>
              <div className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Локальный контур</div>
            </div>
          </div>
        </section>

        {/* AI Capabilities Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="md:col-span-2 lg:col-span-3">
            <h2 className="text-2xl font-bold uppercase tracking-tight mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-primary block" />
              Ключевые направления внедрения ИИ
            </h2>
          </div>
          
          <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle className="text-lg font-bold uppercase tracking-tight flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Управление документацией
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5" />
                  OCR + Vision AI для распознавания актов и смет.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5" />
                  Умный поиск по архивам (LLM) за секунды.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5" />
                  Автоматическая классификация и версионирование.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle className="text-lg font-bold uppercase tracking-tight flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Автоматизация смет и закупок
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5" />
                  Генерация смет по описанию работ (LLM + RAG).
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5" />
                  Сверка цен поставщиков в реальном времени.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5" />
                  Выявление аномалий и дублей в закупках.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle className="text-lg font-bold uppercase tracking-tight flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                Мониторинг и безопасность
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5" />
                  Видеоаналитика хода строительства и ТБ.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5" />
                  Прогнозирование срывов сроков (ML).
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5" />
                  Антифрод-система для финансовых операций.
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Objectives List */}
        <section>
          <h2 className="text-2xl font-bold uppercase tracking-tight mb-6 flex items-center gap-2">
            <span className="w-2 h-8 bg-primary block" />
            Цели проекта
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Снижение операционных расходов на 30%",
              "Исключение человеческого фактора при проверке данных",
              "Обеспечение 100% соответствия требованиям регуляторов",
              "Создание масштабируемой платформы для будущих ИИ-сервисов"
            ].map((goal, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 border border-border bg-card/30 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                <span className="font-medium">{goal}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
