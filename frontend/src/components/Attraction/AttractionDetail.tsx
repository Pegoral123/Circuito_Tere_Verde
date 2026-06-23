import { X, Clock, MapPin, Phone, Navigation, TreePine, Calendar } from 'lucide-react';

// 1. Interfaces atualizadas (Sincronizadas com o AttractionCard)
export interface Parque {
  id: number;
  nome: string;
  descricao: string;
  localizacao: string;
}

export interface Attraction {
  id: number;
  titulo: string;       // JSON usa 'titulo'
  descricao: string;
  imagem_url: string | null;
  parque: Parque;       // Objeto
  tags?: string[];      // Opcional
  
  // Campos variáveis
  data?: string;        // JSON usa 'data'
  horario?: string;
  local?: string;       // JSON usa 'local'
  localizacao?: string;
  contato?: string;
  latitude?: string;
  longitude?: string;
}

type AttractionDetailProps = {
  attraction: Attraction;
  onClose: () => void;
};

export function AttractionDetail({ attraction, onClose }: AttractionDetailProps) {
  
  // Normalização dos dados para exibição
  const displayTitle = attraction.titulo;
  const displayParkName = attraction.parque?.nome || "Parque não identificado";
  const displayLocation = attraction.local || attraction.localizacao || attraction.parque?.localizacao;
  const displayTime = attraction.data || attraction.horario;
  const safeTags = attraction.tags || [];

  const getTagColor = (tag: string) => {
    const lowerTag = tag.toLowerCase();
    if (lowerTag.includes('natureza')) return 'bg-green-100 text-green-700 border-green-200';
    if (lowerTag.includes('cultura')) return 'bg-amber-100 text-amber-700 border-amber-200';
    if (lowerTag.includes('aventura')) return 'bg-orange-100 text-orange-700 border-orange-200';
    if (lowerTag.includes('gastronomia')) return 'bg-rose-100 text-rose-700 border-rose-200';
    if (lowerTag.includes('turismo')) return 'bg-blue-100 text-blue-700 border-blue-200';
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  // Função para abrir o Google Maps (URL corrigida)
  const handleOpenMaps = () => {
    let url = '';
    
    if (attraction.latitude && attraction.longitude) {
      // Busca por coordenadas
      url = `https://www.google.com/maps/search/?api=1&query=${attraction.latitude},${attraction.longitude}`;
    } else {
      // Busca por Nome + Parque + Cidade (Teresópolis hardcoded ou vindo do objeto parque)
      const searchTerm = `${displayTitle}, ${displayParkName}, Teresópolis`;
      const query = encodeURIComponent(searchTerm);
      url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    }
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-60 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden animate-fadeIn relative flex flex-col max-h-[90vh]">
        
        {/* --- HEADER COM IMAGEM (Scrollável se necessário, mas fixo visualmente fica melhor) --- */}
        <div className="relative h-64 sm:h-72 flex-shrink-0">
          <img
            src={attraction.imagem_url || 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg'}
            alt={displayTitle}
            className="w-full h-full object-cover"
          />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors z-10"
          >
            <X className="h-6 w-6 text-gray-700" />
          </button>

          {/* Lista de Tags */}
          {safeTags.length > 0 && (
            <div className="absolute top-4 left-4 flex flex-wrap gap-2 pr-16">
              {safeTags.map((tag, index) => (
                <span 
                  key={index}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border shadow-sm ${getTagColor(tag)}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* --- CONTEÚDO PRINCIPAL (Scrollável) --- */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{displayTitle}</h2>
            
            {/* Indicação do Parque (Agora acessando .nome) */}
            <div className="flex items-center text-green-700 font-medium mb-4 bg-green-50 w-fit px-3 py-1 rounded-lg">
                <TreePine className="h-5 w-5 mr-2" />
                <span>{displayParkName}</span>
            </div>

            <p className="text-gray-600 leading-relaxed text-lg">
                {attraction.descricao || "Descrição detalhada não disponível no momento."}
            </p>
          </div>

          <div className="border-t border-gray-200 pt-6 space-y-4">
            
            {/* Horários / Data */}
            {displayTime && (
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-green-50 rounded-xl">
                  {/* Se parecer data, usa ícone de calendário, senão relógio */}
                  {displayTime.includes('-') || displayTime.includes('/') ? (
                     <Calendar className="h-6 w-6 text-green-600" />
                  ) : (
                     <Clock className="h-6 w-6 text-green-600" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {displayTime.includes('-') || displayTime.includes('/') ? "Data do Evento" : "Horários"}
                  </p>
                  <p className="text-gray-600 mt-1">{displayTime}</p>
                </div>
              </div>
            )}

            {/* Localização */}
            {displayLocation && (
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-green-50 rounded-xl">
                  <MapPin className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Localização</p>
                  <p className="text-gray-600 mt-1">{displayLocation}</p>
                </div>
              </div>
            )}

            {/* Contato */}
            {attraction.contato && (
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-green-50 rounded-xl">
                  <Phone className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Contato</p>
                  <p className="text-gray-600 mt-1">{attraction.contato}</p>
                </div>
              </div>
            )}

            {/* Botão Maps */}
            <button
                onClick={handleOpenMaps}
                className="w-full sm:w-auto mt-6 flex items-center justify-center space-x-2 px-8 py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg hover:shadow-green-200 hover:-translate-y-0.5 duration-200"
            >
                <Navigation className="h-5 w-5" />
                <span>Como Chegar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}