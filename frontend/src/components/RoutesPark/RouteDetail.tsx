import { X, Clock, TrendingUp, MapPin, Award, Sparkles, AlertCircle, TreePine } from 'lucide-react';
// import { Route } from '../lib/supabase'; // Removido

// 1. Interfaces Locais (Compatíveis com o Card e o JSON)
export interface Parque {
  id: number;
  nome: string;
  localizacao?: string;
}

export interface Route {
  id: number;
  nome: string;          // Django: nome
  extensao_km: string;   // Django: extensao_km
  dificuldade: number;   // Django: 1, 2, 3
  dificuldade_nome: string; // Django: "Fácil", etc.
  status: string;        // Django: "ABERTA"
  parque: Parque;
  
  // Opcionais
  imagem_url?: string;
  descricao?: string;
  duracao?: string;
  elevacao?: number;
  tipo?: string; 
  destaques?: string[]; // Antigo 'highlights'
}

type RouteDetailProps = {
  route: Route;
  onClose: () => void;
};

export function RouteDetail({ route, onClose }: RouteDetailProps) {
  
  // Lógica de cores baseada no NÚMERO (1, 2, 3)
  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
        case 1: return 'bg-green-100 text-green-700 border-green-200';
        case 2: return 'bg-amber-100 text-amber-700 border-amber-200';
        case 3: return 'bg-red-100 text-red-700 border-red-200';
        default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTypeIcon = (type?: string) => {
    const icons: Record<string, string> = {
      caminhada: '🚶',
      ciclismo: '🚴',
      trilha: '🥾',
    };
    return icons[type?.toLowerCase() || 'trilha'] || '🥾';
  };

  // Status formatado (ex: ABERTA -> Aberta)
  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase().replace('_', ' ');
  };

  // Normalização de dados para evitar crash
  const safeDestaques = route.destaques || [];
  const displayImage = route.imagem_url || 'https://images.pexels.com/photos/1647962/pexels-photo-1647962.jpeg';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-60 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden animate-fadeIn flex flex-col max-h-[90vh]">
        
        {/* --- HEADER COM IMAGEM (Fixo ou scrollável junto) --- */}
        <div className="relative h-72 sm:h-80 flex-shrink-0">
          <img
            src={displayImage}
            alt={route.nome}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors z-10"
          >
            <X className="h-6 w-6 text-gray-700" />
          </button>
          
          <div className="absolute top-4 left-4 flex items-center space-x-2">
            <span className="px-4 py-2 bg-white rounded-full text-2xl shadow-lg">
                {getTypeIcon(route.tipo)}
            </span>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold border-2 shadow-lg bg-white ${getDifficultyColor(route.dificuldade)}`}>
              {route.dificuldade_nome || 'Nível'}
            </span>
          </div>
        </div>

        {/* --- CONTEÚDO SCROLLÁVEL --- */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          <div>
             {/* Parque e Status */}
            <div className="flex flex-wrap items-center gap-3 mb-3">
                <div className="flex items-center text-sm font-medium text-green-700 bg-green-50 px-3 py-1 rounded-full">
                    <TreePine className="h-4 w-4 mr-1" />
                    {route.parque?.nome}
                </div>
                
                <div className={`flex items-center text-sm font-medium px-3 py-1 rounded-full border ${
                    route.status === 'FECHADA' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-blue-50 text-blue-700 border-blue-200'
                }`}>
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Status: {formatStatus(route.status)}
                </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-3">{route.nome}</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
                {route.descricao || "Sem descrição disponível no momento."}
            </p>
          </div>

          {/* Grid de Estatísticas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <div className="text-center">
              <MapPin className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{route.extensao_km} km</p>
              <p className="text-sm text-gray-500">Extensão</p>
            </div>

            <div className="text-center">
              <Clock className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{route.duracao || "--"}</p>
              <p className="text-sm text-gray-500">Duração</p>
            </div>

            <div className="text-center">
              <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{route.elevacao ? `${route.elevacao}m` : "--"}</p>
              <p className="text-sm text-gray-500">Elevação</p>
            </div>

            <div className="text-center">
              <Award className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="text-xl font-bold text-gray-900 truncate px-2">
                {route.dificuldade_nome}
              </p>
              <p className="text-sm text-gray-500">Nível</p>
            </div>
          </div>

          {/* Destaques (Renderiza apenas se houver) */}
          {safeDestaques.length > 0 && (
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-bold text-gray-900">O que você vai encontrar</h3>
              </div>
              <ul className="space-y-3">
                {safeDestaques.map((highlight, index) => (
                  <li key={index} className="flex items-start space-x-3 bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 font-medium">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Dica de Segurança */}
          <div className="border-t border-gray-200 pt-6">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                <strong>Dica do Parque:</strong> Verifique a previsão do tempo antes de sair. Leve água, protetor solar e use calçado apropriado para terrenos irregulares.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}