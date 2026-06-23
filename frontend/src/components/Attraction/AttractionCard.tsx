import { Clock, MapPin, Phone, Calendar } from 'lucide-react';

// 1. Interfaces atualizadas conforme o JSON real
export interface Parque {
  id: number;
  nome: string;
  descricao: string;
  localizacao: string;
}

export interface Attraction {
  id: number;
  titulo: string;       // JSON usa 'titulo', não 'nome'
  descricao: string;
  imagem_url: string | null;
  
  parque: Parque;       // Objeto completo
  tags?: string[];      // Opcional
  
  // Campos variáveis (suporte a ambos os formatos)
  data?: string;        // JSON usa 'data'
  horario?: string;     
  local?: string;       // JSON usa 'local'
  localizacao?: string; 
  contato?: string;
}

type AttractionCardProps = {
  attraction: Attraction;
  onClick: () => void;
};

export function AttractionCard({ attraction, onClick }: AttractionCardProps) {
  
  const getTagColor = (tag: string) => {
    const lowerTag = tag.toLowerCase();
    if (lowerTag.includes('natureza')) return 'bg-green-100 text-green-700';
    if (lowerTag.includes('cultura')) return 'bg-amber-100 text-amber-700';
    if (lowerTag.includes('aventura')) return 'bg-orange-100 text-orange-700';
    if (lowerTag.includes('gastronomia')) return 'bg-rose-100 text-rose-700';
    if (lowerTag.includes('turismo')) return 'bg-blue-100 text-blue-700';
    return 'bg-gray-100 text-gray-700';
  };

  // Normalização de dados para exibição
  const displayLocation = attraction.local || attraction.localizacao;
  const displayTime = attraction.data || attraction.horario;
  // Garante que tags seja um array, mesmo que venha undefined
  const safeTags = attraction.tags || [];

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-[1.02]"
    >
      {/* --- IMAGEM E TAGS --- */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={attraction.imagem_url || 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg'}
          alt={attraction.titulo}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Renderiza tags apenas se existirem */}
        {safeTags.length > 0 && (
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {safeTags.slice(0, 3).map((tag, index) => (
              <span 
                key={index} 
                className={`px-3 py-1 rounded-full text-xs font-semibold ${getTagColor(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* --- CONTEÚDO --- */}
      <div className="p-6 space-y-3">
        
        {/* Título (Usando titulo do JSON) */}
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
          {attraction.titulo}
        </h3>
        
        {/* Nome do Parque (Acessando propriedade do objeto) */}
        <div className="flex items-center text-sm font-medium text-green-700">
           <MapPin className="h-3 w-3 mr-1" />
           {attraction.parque?.nome || "Parque não informado"}
        </div>

        {/* Descrição */}
        <p className="text-gray-600 text-sm line-clamp-2">
            {attraction.descricao || "Explore esta incrível atração no circuito verde."}
        </p>

        {/* Detalhes Extras */}
        <div className="space-y-2 pt-2 border-t border-gray-100 mt-2">
          
          {/* Data ou Horário */}
          {displayTime && (
            <div className="flex items-start space-x-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>{displayTime}</span>
            </div>
          )}

          {/* Localização */}
          {displayLocation && (
            <div className="flex items-start space-x-2 text-sm text-gray-500">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-1">{displayLocation}</span>
            </div>
          )}

          {/* Contato (Se houver) */}
          {attraction.contato && (
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Phone className="h-4 w-4 flex-shrink-0" />
              <span>{attraction.contato}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}