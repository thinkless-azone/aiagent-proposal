import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Server, Database, Network, Cpu, ShieldCheck, Users, Globe, Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ComponentProps {
  id: string;
  icon: React.ElementType;
  label: string;
  description: string;
  specs: string[];
  x: number;
  y: number;
}

const components: ComponentProps[] = [
  {
    id: "server",
    icon: Server,
    label: "AI Server",
    description: "Вычислительное ядро системы",
    specs: ["2x Intel Xeon Scalable", "1x NVIDIA A100 (80GB)", "128GB DDR5 RAM", "2x 480GB SSD (OS)"],
    x: 50,
    y: 50
  },
  {
    id: "db",
    icon: Database,
    label: "Postgres Pro",
    description: "Надежное хранение данных",
    specs: ["Сертифицированная версия ФСТЭК", "Кластеризация", "Резервное копирование", "Шифрование данных"],
    x: 20,
    y: 80
  },
  {
    id: "network",
    icon: Network,
    label: "Eltex Switch",
    description: "Сетевая инфраструктура",
    specs: ["24x 1G Ports", "4x 10G Uplink", "L3 Routing", "VLAN Segmentation"],
    x: 80,
    y: 80
  },
  {
    id: "users",
    icon: Users,
    label: "Users",
    description: "Корпоративные пользователи",
    specs: ["Доступ через веб-интерфейс", "Интеграция с AD/LDAP", "Ролевая модель доступа", "SSO Аутентификация"],
    x: 50,
    y: 10
  },
  {
    id: "security",
    icon: ShieldCheck,
    label: "Security",
    description: "Контур безопасности",
    specs: ["Межсетевой экран", "IDS/IPS", "Аудит действий", "Защита от утечек (DLP)"],
    x: 85,
    y: 30
  },
  {
    id: "integration",
    icon: Globe,
    label: "1C Integration",
    description: "Шина данных",
    specs: ["REST API", "Очереди сообщений", "Синхронизация справочников", "Обмен документами"],
    x: 15,
    y: 30
  }
];

export const ArchitectureDiagram = () => {
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);

  return (
    <div className="relative w-full h-[600px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20" 
        style={{ 
          backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', 
          backgroundSize: '30px 30px' 
        }} 
      />
      
      {/* Central Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {/* Connections from Server to others */}
        <line x1="50%" y1="50%" x2="20%" y2="80%" stroke="url(#lineGradient)" strokeWidth="2" />
        <line x1="50%" y1="50%" x2="80%" y2="80%" stroke="url(#lineGradient)" strokeWidth="2" />
        <line x1="50%" y1="50%" x2="50%" y2="10%" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="5,5" />
        <line x1="50%" y1="50%" x2="85%" y2="30%" stroke="url(#lineGradient)" strokeWidth="2" />
        <line x1="50%" y1="50%" x2="15%" y2="30%" stroke="url(#lineGradient)" strokeWidth="2" />
      </svg>

      {/* Components */}
      {components.map((comp) => (
        <div
          key={comp.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
          style={{ left: `${comp.x}%`, top: `${comp.y}%` }}
          onMouseEnter={() => setHoveredComponent(comp.id)}
          onMouseLeave={() => setHoveredComponent(null)}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            className={`relative z-10 p-4 rounded-full border-2 transition-colors duration-300 ${
              hoveredComponent === comp.id 
                ? 'bg-primary border-primary text-primary-foreground shadow-[0_0_30px_rgba(59,130,246,0.5)]' 
                : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-primary/50 hover:text-primary'
            }`}
          >
            <comp.icon className="w-8 h-8" />
          </motion.div>
          
          {/* Label */}
          <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 text-sm font-bold whitespace-nowrap transition-colors duration-300 ${
            hoveredComponent === comp.id ? 'text-primary' : 'text-slate-500'
          }`}>
            {comp.label}
          </div>
        </div>
      ))}

      {/* Info Panel */}
      <AnimatePresence>
        {hoveredComponent && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-80 z-20"
          >
            <Card className="bg-slate-900/95 backdrop-blur border-primary/50 shadow-2xl">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-primary">
                  {(() => {
                    const Comp = components.find(c => c.id === hoveredComponent)?.icon;
                    return Comp ? <Comp className="w-5 h-5" /> : null;
                  })()}
                  {components.find(c => c.id === hoveredComponent)?.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-300 mb-4">
                  {components.find(c => c.id === hoveredComponent)?.description}
                </p>
                <div className="space-y-2">
                  {components.find(c => c.id === hoveredComponent)?.specs.map((spec, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-400">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {spec}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend/Title */}
      <div className="absolute top-6 left-6 pointer-events-none">
        <Badge variant="outline" className="mb-2 border-primary/30 text-primary bg-primary/5">
          ARCHITECTURE v1.0
        </Badge>
        <h3 className="text-xl font-bold text-white uppercase tracking-tight">
          Схема взаимодействия
        </h3>
        <p className="text-sm text-slate-500">
          Наведите на элемент для деталей
        </p>
      </div>
    </div>
  );
};
