import { useState, useEffect, useRef } from "react";
import { Play, Pause, RefreshCw, Volume2, VolumeX, Captions, CaptionsOff } from "lucide-react";
import { cn } from "@/lib/utils";

const FRAMES = [
  "/images/video-frame-1.png",
  "/images/video-frame-2.png",
  "/images/video-frame-3.png",
  "/images/video-frame-4.png",
];

const CAPTIONS = [
  "Сканирование и распознавание документа...",
  "Анализ финансового состояния и рисков...",
  "Поиск связей и аффилированности...",
  "Проверка завершена. Контрагент надежен.",
];

const DETAILS = [
  "OCR-модуль извлекает текст из сканов, распознает печати и подписи, проверяет корректность реквизитов (ИНН, КПП, БИК).",
  "Система запрашивает данные из ФНС, ФССП и арбитражных судов. ML-модель оценивает вероятность банкротства.",
  "Построение графа связей выявляет скрытую аффилированность, массовых директоров и пересечения с черными списками.",
  "Формируется итоговый отчет с индексом благонадежности. Документ автоматически маршрутизируется в 1С.",
];

export function VideoPlayer({ className }: { className?: string }) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showSubtitles, setShowSubtitles] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const FRAME_DURATION = 3000; // 3 seconds per frame

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentFrame((prev) => {
          if (prev < FRAMES.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, FRAME_DURATION);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  useEffect(() => {
    // Reset progress when frame changes manually or automatically
    setProgress(0);
    
    if (isPlaying) {
      const startTime = Date.now();
      const progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min((elapsed / FRAME_DURATION) * 100, 100);
        setProgress(newProgress);
      }, 50);
      
      return () => clearInterval(progressInterval);
    }
  }, [currentFrame, isPlaying]);

  const handlePlayPause = () => {
    if (currentFrame === FRAMES.length - 1 && !isPlaying) {
      setCurrentFrame(0);
    }
    setIsPlaying(!isPlaying);
    setShowDetails(false);
    window.speechSynthesis.cancel();
  };

  // Auto-play TTS when frame changes if not muted and subtitles are on (optional smart feature)
  useEffect(() => {
    if (isPlaying && !isMuted && showSubtitles) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(DETAILS[currentFrame]);
      utterance.lang = 'ru-RU';
      window.speechSynthesis.speak(utterance);
    }
  }, [currentFrame, isPlaying, isMuted, showSubtitles]);

  const handleReplay = () => {
    setCurrentFrame(0);
    setIsPlaying(true);
    window.speechSynthesis.cancel();
  };

  return (
    <div className={cn("relative rounded-xl overflow-hidden border border-border bg-black/50 shadow-2xl", className)}>
      {/* Screen */}
      <div className="aspect-video relative">
        {FRAMES.map((src, index) => (
          <img
            key={src}
            src={src}
            alt={`Frame ${index + 1}`}
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000",
              index === currentFrame ? "opacity-100" : "opacity-0"
            )}
          />
        ))}
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

        {/* Subtitles Overlay */}
        {showSubtitles && !showDetails && (
          <div className="absolute bottom-20 left-0 right-0 px-8 text-center pointer-events-none">
            <div className="inline-block bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg">
              <p className="text-white/90 text-sm font-medium leading-relaxed max-w-2xl mx-auto">
                {DETAILS[currentFrame]}
              </p>
            </div>
          </div>
        )}

        {/* Interactive Details Overlay */}
        {showDetails && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 text-center animate-in fade-in duration-200">
            <div className="space-y-4 max-w-md">
              <h3 className="text-xl font-bold text-primary">{CAPTIONS[currentFrame]}</h3>
              <p className="text-white/90 leading-relaxed">{DETAILS[currentFrame]}</p>
              <div className="flex justify-center gap-3">
                <button 
                  onClick={() => {
                    setShowDetails(false);
                    window.speechSynthesis.cancel();
                  }}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm text-white transition-colors"
                >
                  Закрыть
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                  title={isMuted ? "Включить озвучку" : "Выключить озвучку"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Play Button Overlay (when paused) */}
        {!isPlaying && currentFrame !== FRAMES.length - 1 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px] transition-all">
            <button
              onClick={handlePlayPause}
              className="w-16 h-16 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center hover:scale-110 transition-transform shadow-lg hover:bg-primary"
            >
              <Play className="w-8 h-8 ml-1" />
            </button>
          </div>
        )}

        {/* Replay Overlay (at the end) */}
        {!isPlaying && currentFrame === FRAMES.length - 1 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all">
            <button
              onClick={handleReplay}
              className="w-16 h-16 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center hover:scale-110 transition-transform shadow-lg hover:bg-primary"
            >
              <RefreshCw className="w-8 h-8" />
            </button>
          </div>
        )}
      </div>

      {/* Controls Bar */}
      <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
        {/* Progress Bar for current frame */}
        <div className="h-1 bg-white/20 rounded-full overflow-hidden">
           <div 
             className="h-full bg-primary transition-all duration-75 ease-linear"
             style={{ width: `${isPlaying ? progress : (currentFrame === FRAMES.length - 1 ? 100 : 0)}%` }}
           />
        </div>

        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <button onClick={handlePlayPause} className="hover:text-primary transition-colors">
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            
            <button 
              onClick={() => setShowSubtitles(!showSubtitles)}
              className={cn(
                "hover:text-primary transition-colors",
                showSubtitles ? "text-primary" : "text-white/70"
              )}
              title={showSubtitles ? "Скрыть субтитры" : "Показать субтитры"}
            >
              {showSubtitles ? <Captions className="w-5 h-5" /> : <CaptionsOff className="w-5 h-5" />}
            </button>

            <button 
              onClick={() => {
                setIsPlaying(false);
                setShowDetails(true);
                if (!isMuted) {
                  const utterance = new SpeechSynthesisUtterance(DETAILS[currentFrame]);
                  utterance.lang = 'ru-RU';
                  window.speechSynthesis.speak(utterance);
                }
              }}
              className="text-sm font-medium tracking-wide text-white/90 hover:text-primary transition-colors text-left underline decoration-dotted underline-offset-4 ml-2"
            >
              {CAPTIONS[currentFrame]}
            </button>
          </div>
          
          <div className="flex gap-1">
            {FRAMES.map((_, idx) => (
              <div 
                key={idx}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  idx === currentFrame ? "bg-primary" : "bg-white/30"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
