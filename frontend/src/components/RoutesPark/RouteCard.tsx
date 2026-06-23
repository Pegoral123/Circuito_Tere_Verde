import { Clock, TrendingUp, MapPin, Award, Navigation } from 'lucide-react';
// import { Route } from '../lib/supabase'; // Removido: Usaremos a interface local

// 1. Interface compatível com o Django
export interface Parque {
  id: number;
  nome: string;
}

export interface Route {
  id: number;
  nome: string; // Django: nome
  extensao_km: string; // Django: extensao_km (vem como string "12.50")
  dificuldade: number; // Django: 1, 2, 3
  dificuldade_nome: string; // "Fácil", "Difícil"
  parque: Parque;
  status: string;

  // Campos opcionais (depende do serializer)
  imagem_url?: string;
  descricao?: string;
  duracao?: string; // Caso adicione no futuro
  elevacao?: number; // Caso adicione no futuro
  tipo?: string; // 'caminhada', 'ciclismo' (se não tiver, assumimos Trilha)
}

type RouteCardProps = {
  route: Route;
  onClick: () => void;
};

export function RouteCard({ route, onClick }: RouteCardProps) {
  
  // Ícone baseado no tipo (ou padrão Trilha)
  const getTypeIcon = (tipo?: string) => {
    const icons: Record<string, string> = {
      caminhada: '🚶',
      ciclismo: '🚴',
      trilha: '🥾',
    };
    return icons[tipo?.toLowerCase() || 'trilha'] || '🥾';
  };

  // Cor baseada no NÚMERO da dificuldade (1, 2, 3)
  const getDifficultyColor = (dificuldade: number) => {
    switch (dificuldade) {
      case 1: // Fácil
        return 'bg-green-100 text-green-700 border-green-200';
      case 2: // Moderado
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 3: // Difícil
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-[1.02]"
    >
      {/* --- IMAGEM --- */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={route.imagem_url || 'https://images.pexels.com/photos/1647962/pexels-photo-1647962.jpeg'}
          alt={route.nome}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Badges Flutuantes */}
        <div className="absolute top-4 left-4 flex items-center space-x-2">
          <span className="px-3 py-1 bg-white rounded-full text-2xl shadow-sm">
            {getTypeIcon(route.tipo)}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border-2 shadow-sm ${getDifficultyColor(route.dificuldade)}`}>
            {route.dificuldade_nome || 'Nível'}
          </span>
        </div>
      </div>

      {/* --- CONTEÚDO --- */}
      <div className="p-6 space-y-4">
        <div>
          {/* Nome do Parque (Localização) */}
          <div className="flex items-center space-x-1 mb-1 text-green-600 text-sm font-medium">
             <MapPin className="h-3 w-3" />
             <span>{route.parque?.nome || "Parque Nacional"}</span>
          </div>

          <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
            {route.nome}
          </h3>
        </div>

        <p className="text-gray-600 text-sm line-clamp-2">
            {route.descricao || "Explore esta trilha incrível, conecte-se com a natureza e supere seus limites."}
        </p>

        {/* --- GRID DE INFORMAÇÕES --- */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
          
          {/* Distância */}
          <div className="flex items-center space-x-2">
            <Navigation className="h-4 w-4 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Extensão</p>
              <p className="text-sm font-semibold text-gray-900">{route.extensao_km} km</p>
            </div>
          </div>

          {/* Duração (Opcional) */}
          {route.duracao ? (
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Duração</p>
                <p className="text-sm font-semibold text-gray-900">{route.duracao}</p>
              </div>
            </div>
          ) : (
            // Placeholder se não tiver duração
            <div className="flex items-center space-x-2 opacity-50">
               <Clock className="h-4 w-4 text-gray-400" />
               <div>
                 <p className="text-xs text-gray-500">Duração</p>
                 <p className="text-xs text-gray-400">--</p>
               </div>
            </div>
          )}

          {/* Elevação (Opcional) */}
          {route.elevacao && route.elevacao > 0 && (
             <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Elevação</p>
                  <p className="text-sm font-semibold text-gray-900">{route.elevacao}m</p>
                </div>
              </div>
          )}

          {/* Nível (Repetido para preencher grid se necessário) */}
          <div className="flex items-center space-x-2">
            <Award className="h-4 w-4 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Status</p>
              <p className="text-sm font-semibold text-gray-900 capitalize">
                {route.status?.toLowerCase().replace('_', ' ') || 'Aberta'}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}