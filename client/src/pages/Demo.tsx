import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, CheckCircle2, AlertTriangle, XCircle, RefreshCw, Scan, Shield, Search } from "lucide-react";

export default function Demo() {
  const [step, setStep] = useState<"upload" | "processing" | "result">("upload");
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState("");

  const handleUpload = () => {
    // Simulate file selection
    const mockFiles = ["Договор_поставки_№123.pdf", "Счет_на_оплату_456.pdf", "Накладная_789.pdf"];
    const randomFile = mockFiles[Math.floor(Math.random() * mockFiles.length)];
    setFileName(randomFile);
    setStep("processing");
    simulateProcessing();
  };

  const simulateProcessing = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStep("result");
          return 100;
        }
        return prev + 2; // 50 steps * 50ms = 2.5s total
      });
    }, 50);
  };

  const resetDemo = () => {
    setStep("upload");
    setProgress(0);
    setFileName("");
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-tight mb-2">Демонстрация работы</h1>
          <p className="text-muted-foreground max-w-3xl">
            Интерактивная симуляция работы ИИ-агента. Загрузите документ для автоматического анализа, 
            извлечения данных и проверки на риски экономической безопасности.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Interaction Area */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-2 border-dashed border-border bg-card/50 min-h-[400px] flex flex-col justify-center items-center relative overflow-hidden">
              {step === "upload" && (
                <div className="text-center p-8 animate-in fade-in zoom-in duration-300">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/20">
                    <Upload className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Загрузите документ</h3>
                  <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                    Перетащите файл сюда или нажмите кнопку для выбора. 
                    Поддерживаются форматы: PDF, DOCX, XLSX, JPG, PNG.
                  </p>
                  <Button size="lg" onClick={handleUpload} className="font-bold px-8">
                    Выбрать файл
                  </Button>
                  <div className="mt-8 flex justify-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> Договоры</span>
                    <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> Счета</span>
                    <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> Акты</span>
                  </div>
                </div>
              )}

              {step === "processing" && (
                <div className="w-full max-w-md p-8 text-center animate-in fade-in duration-300">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/20 relative">
                    <Scan className="w-10 h-10 text-primary animate-pulse" />
                    <div className="absolute inset-0 border-t-2 border-primary rounded-full animate-spin" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Анализ документа...</h3>
                  <p className="text-muted-foreground mb-6">{fileName}</p>
                  <Progress value={progress} className="h-2 mb-2" />
                  <div className="flex justify-between text-xs text-muted-foreground font-mono">
                    <span>OCR SCANNING</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="mt-4 space-y-1 text-sm text-left font-mono text-muted-foreground">
                    <div className={progress > 20 ? "text-primary" : "opacity-30"}>[OK] Распознавание текста</div>
                    <div className={progress > 40 ? "text-primary" : "opacity-30"}>[OK] Извлечение сущностей (NER)</div>
                    <div className={progress > 60 ? "text-primary" : "opacity-30"}>[OK] Проверка в ЕГРЮЛ/ЕГРИП</div>
                    <div className={progress > 80 ? "text-primary" : "opacity-30"}>[OK] Анализ рисков и аномалий</div>
                  </div>
                </div>
              )}

              {step === "result" && (
                <div className="w-full h-full p-0 animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col">
                  <div className="bg-secondary/50 p-4 border-b border-border flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/20 p-2 rounded">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-bold text-sm">{fileName}</div>
                        <div className="text-xs text-muted-foreground">Обработано за 2.4 сек</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                      ПРОВЕРКА ПРОЙДЕНА
                    </Badge>
                  </div>
                  
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 overflow-y-auto">
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-bold uppercase text-muted-foreground mb-3">Извлеченные данные</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between border-b border-border pb-2">
                            <span className="text-sm text-muted-foreground">Тип документа</span>
                            <span className="text-sm font-mono font-bold">Договор поставки</span>
                          </div>
                          <div className="flex justify-between border-b border-border pb-2">
                            <span className="text-sm text-muted-foreground">Номер</span>
                            <span className="text-sm font-mono font-bold">№ 45-А/2024</span>
                          </div>
                          <div className="flex justify-between border-b border-border pb-2">
                            <span className="text-sm text-muted-foreground">Дата</span>
                            <span className="text-sm font-mono font-bold">12.05.2024</span>
                          </div>
                          <div className="flex justify-between border-b border-border pb-2">
                            <span className="text-sm text-muted-foreground">Сумма</span>
                            <span className="text-sm font-mono font-bold">1 250 000 ₽</span>
                          </div>
                          <div className="flex justify-between border-b border-border pb-2">
                            <span className="text-sm text-muted-foreground">Контрагент</span>
                            <span className="text-sm font-mono font-bold">ООО "ТехноСнаб"</span>
                          </div>
                          <div className="flex justify-between border-b border-border pb-2">
                            <span className="text-sm text-muted-foreground">ИНН</span>
                            <span className="text-sm font-mono font-bold">7701234567</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-bold uppercase text-muted-foreground mb-3">Проверка безопасности</h4>
                        <div className="space-y-3">
                          <Card className="bg-green-500/5 border-green-500/20">
                            <CardContent className="p-3 flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                              <div>
                                <div className="font-bold text-sm text-green-500">Контрагент надежен</div>
                                <div className="text-xs text-muted-foreground">Индекс благонадежности: 98/100. Действующее предприятие, судов и долгов нет.</div>
                              </div>
                            </CardContent>
                          </Card>
                          
                          <Card className="bg-green-500/5 border-green-500/20">
                            <CardContent className="p-3 flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                              <div>
                                <div className="font-bold text-sm text-green-500">Цены в рынке</div>
                                <div className="text-xs text-muted-foreground">Отклонение от среднерыночных цен менее 2%.</div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="bg-yellow-500/5 border-yellow-500/20">
                            <CardContent className="p-3 flex items-start gap-3">
                              <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                              <div>
                                <div className="font-bold text-sm text-yellow-500">Внимание: Условия оплаты</div>
                                <div className="text-xs text-muted-foreground">Предоплата 100% превышает стандартный лимит (70%). Требуется согласование.</div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border-t border-border bg-secondary/30 flex justify-end">
                    <Button onClick={resetDemo} variant="outline" className="gap-2">
                      <RefreshCw className="w-4 h-4" /> Загрузить другой файл
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Как это работает
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p>
                  1. <strong className="text-foreground">OCR & Распознавание:</strong> ИИ извлекает текст из сканов и фото, понимая структуру документа.
                </p>
                <p>
                  2. <strong className="text-foreground">Извлечение данных:</strong> Выделяются ключевые сущности: ИНН, суммы, даты, номенклатура.
                </p>
                <p>
                  3. <strong className="text-foreground">Кросс-проверка:</strong> Данные сверяются с ЕГРЮЛ, внутренними базами и историческими ценами.
                </p>
                <p>
                  4. <strong className="text-foreground">Оценка рисков:</strong> Система подсвечивает подозрительные условия и ненадежных контрагентов.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Search className="w-5 h-5 text-primary" />
                  Что можно проверить?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Договоры</Badge>
                  <Badge variant="secondary">Счета</Badge>
                  <Badge variant="secondary">Акты</Badge>
                  <Badge variant="secondary">Накладные</Badge>
                  <Badge variant="secondary">УПД</Badge>
                  <Badge variant="secondary">Спецификации</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
