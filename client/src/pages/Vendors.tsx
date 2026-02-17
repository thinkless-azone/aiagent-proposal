import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, ShieldCheck, Server, Cpu } from "lucide-react";

export default function Vendors() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-tight mb-2">Технологические партнеры</h1>
          <p className="text-muted-foreground max-w-3xl">
            Проект реализуется на базе решений ведущих российских разработчиков оборудования и программного обеспечения, 
            включенных в реестр Минпромторга и Минцифры РФ.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* YADRO */}
          <Card className="border-2 border-primary/20 hover:border-primary transition-all">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="rounded-none border-primary text-primary font-mono">HARDWARE</Badge>
                <ShieldCheck className="w-6 h-6 text-green-500" />
              </div>
              <CardTitle className="text-2xl font-bold uppercase">YADRO</CardTitle>
              <CardDescription className="text-base">
                Лидер российского рынка систем хранения данных и высокопроизводительных серверов. Компания полного цикла разработки и производства.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-secondary/30 border border-border">
                  <div className="font-bold text-sm uppercase mb-2 text-primary">Ключевые компетенции</div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Производство серверов архитектуры x86 и RISC-V</li>
                    <li>• Собственные производственные мощности (завод YADRO Fab Dubna)</li>
                    <li>• Лидерство на рынке СХД (доля &gt; 20%)</li>
                  </ul>
                </div>
                <div className="p-4 bg-secondary/30 border border-border">
                  <div className="font-bold text-sm uppercase mb-2 text-primary">В проекте</div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Высокопроизводительный AI-сервер G4208P G3</li>
                    <li>• Оптимизация под задачи машинного обучения</li>
                  </ul>
                </div>
              </div>
              <Button variant="outline" className="w-full md:w-auto rounded-none gap-2" asChild>
                <a href="https://yadro.com" target="_blank" rel="noopener noreferrer">
                  Официальный сайт <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* GRAVITON */}
          <Card className="border-2 border-primary/20 hover:border-primary transition-all">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="rounded-none border-primary text-primary font-mono">HARDWARE</Badge>
                <ShieldCheck className="w-6 h-6 text-green-500" />
              </div>
              <CardTitle className="text-2xl font-bold uppercase">Гравитон</CardTitle>
              <CardDescription className="text-base">
                Ведущий российский разработчик и производитель вычислительной техники. Продукция включена в Единый реестр российской радиоэлектронной продукции.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-secondary/30 border border-border">
                  <div className="font-bold text-sm uppercase mb-2 text-primary">Ключевые компетенции</div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Собственная разработка материнских плат</li>
                    <li>• Широкая линейка серверного оборудования</li>
                    <li>• Поддержка российских процессоров и ПО</li>
                  </ul>
                </div>
                <div className="p-4 bg-secondary/30 border border-border">
                  <div className="font-bold text-sm uppercase mb-2 text-primary">В проекте</div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Серверы С2101И (Базовый вариант)</li>
                    <li>• Серверы С2122ИУ (Оптимальный вариант)</li>
                  </ul>
                </div>
              </div>
              <Button variant="outline" className="w-full md:w-auto rounded-none gap-2" asChild>
                <a href="https://graviton.ru" target="_blank" rel="noopener noreferrer">
                  Официальный сайт <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* AQUARIUS */}
          <Card className="border border-border hover:border-primary/50 transition-all">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="rounded-none border-primary text-primary font-mono">HARDWARE</Badge>
                <ShieldCheck className="w-6 h-6 text-green-500" />
              </div>
              <CardTitle className="text-2xl font-bold uppercase">ГК «Аквариус»</CardTitle>
              <CardDescription className="text-base">
                Ведущий российский разработчик, производитель и поставщик компьютерной техники и ИТ-решений.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-secondary/30 border border-border">
                  <div className="font-bold text-sm uppercase mb-2 text-primary">Ключевые компетенции</div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Более 30 лет на рынке ИТ</li>
                    <li>• Сеть сервисных центров по всей России</li>
                    <li>• Широкая линейка клиентских устройств</li>
                  </ul>
                </div>
                <div className="p-4 bg-secondary/30 border border-border">
                  <div className="font-bold text-sm uppercase mb-2 text-primary">В проекте</div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Альтернативный поставщик серверных платформ</li>
                    <li>• Клиентские терминалы для доступа к системе</li>
                  </ul>
                </div>
              </div>
              <Button variant="outline" className="w-full md:w-auto rounded-none gap-2" asChild>
                <a href="https://www.aq.ru" target="_blank" rel="noopener noreferrer">
                  Официальный сайт <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* BASALT SPO */}
          <Card className="border border-border hover:border-primary/50 transition-all">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="rounded-none border-blue-400 text-blue-400 font-mono">SOFTWARE</Badge>
                <ShieldCheck className="w-6 h-6 text-green-500" />
              </div>
              <CardTitle className="text-2xl font-bold uppercase">Базальт СПО</CardTitle>
              <CardDescription className="text-base">
                Разработчик российских операционных систем «Альт».
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-secondary/30 border border-border">
                  <div className="font-bold text-sm uppercase mb-2 text-primary">Ключевые компетенции</div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Разработка ОС Альт Сервер, Альт Рабочая станция</li>
                    <li>• Собственная инфраструктура разработки (Sisyphus)</li>
                    <li>• Сертификация ФСТЭК</li>
                  </ul>
                </div>
                <div className="p-4 bg-secondary/30 border border-border">
                  <div className="font-bold text-sm uppercase mb-2 text-primary">В проекте</div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Базовая операционная система серверов (Альт Сервер)</li>
                    <li>• Платформа виртуализации (Альт Виртуализация)</li>
                  </ul>
                </div>
              </div>
              <Button variant="outline" className="w-full md:w-auto rounded-none gap-2" asChild>
                <a href="https://www.basealt.ru" target="_blank" rel="noopener noreferrer">
                  Официальный сайт <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
