import { useEffect, useState, useMemo } from 'react';
import { Filter } from 'lucide-react';
import { AttractionCard } from './AttractionCard';
import { AttractionDetail } from './AttractionDetail';
import { CircuitoVerdeService } from '../../services/CircuitoVerdeService';

// --- INTERFACES ATUALIZADAS ---
export interface Parque {
  id: number;
  nome: string;
  descricao: string;
  localizacao: string;
}

export interface Attraction {
  id: number;
  titulo: string;
  descricao: string;
  imagem_url: string | null;
  data: string;
  local: string;
  parque: Parque;   // Objeto
  tags?: string[];  // Opcional
}

export function AttractionsView() {
  const [allAttractions, setAllAttractions] = useState<Attraction[]>([]);
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPark, setSelectedPark] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  // 1. Fetch dos dados
  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        const data = await CircuitoVerdeService.buscarEventos();
        setAllAttractions(data || []);
      } catch (error) {
        console.error("Erro ao buscar atrações:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttractions();
  }, []);

  // 2. Extrai PARQUES únicos (Ajustado para ler a.parque.nome)
  const uniqueParks = useMemo(() => {
    // Proteção: verifica se 'parque' existe antes de tentar ler o nome
    const parks = allAttractions.map(a => a.parque?.nome).filter(Boolean);
    return Array.from(new Set(parks)).sort();
  }, [allAttractions]);

  // 3. Extrai TAGS únicas (Ajustado para evitar crash se não houver tags)
  const uniqueCategories = useMemo(() => {
    const allTags = allAttractions.flatMap(a => a.tags || []); 
    const unique = Array.from(new Set(allTags)).sort();
    return ['Todas', ...unique];
  }, [allAttractions]);

  // 4. Helper de Cores (Mantido igual)
  const getCategoryColor = (category: string, isSelected: boolean) => {
    const base = "px-4 py-2 rounded-full text-sm font-medium transition-all";
    const tag = category.toLowerCase();

    if (isSelected) {
       if (tag === 'natureza') return `${base} bg-green-100 text-green-800 ring-2 ring-offset-2 ring-green-600`;
       if (tag === 'aventura') return `${base} bg-orange-100 text-orange-800 ring-2 ring-offset-2 ring-orange-600`;
       return `${base} bg-gray-800 text-white ring-2 ring-offset-2 ring-gray-600`;
    }
    return `${base} bg-gray-100 text-gray-700 hover:bg-gray-200`;
  };

  // 5. Lógica de Filtragem (Agora usando useMemo em vez de useEffect)
  const filteredAttractions = useMemo(() => {
    return allAttractions.filter((a) => {
      // Filtro de Categoria
      if (selectedCategory !== 'Todas' && selectedCategory !== 'all') {
        const hasTag = a.tags?.some(tag => tag.toLowerCase() === selectedCategory.toLowerCase());
        if (!hasTag) return false;
      }

      // Filtro de Parque (Ajustado para objeto)
      if (selectedPark !== 'all') {
        if (a.parque?.nome !== selectedPark) return false;
      }

      return true;
    });
  }, [selectedCategory, selectedPark, allAttractions]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-green-600 to-emerald-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Atrações do Circuito Verde</h1>
          <p className="text-lg text-green-50 max-w-2xl">
            Explore as melhores atrações da região.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* === FILTRO DINÂMICO DE CATEGORIAS === */}
        {/* Só mostra se existirem categorias além de "Todas" */}
        {uniqueCategories.length > 1 && (
          <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Filter className="h-5 w-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Filtrar por Categoria</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {uniqueCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={getCategoryColor(category, selectedCategory === category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* === FILTRO DINÂMICO DE PARQUES === */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Filtrar por Parque</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedPark('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedPark === 'all'
                  ? 'bg-gray-800 text-white ring-2 ring-offset-2 ring-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todos os Parques
            </button>
            {uniqueParks.map((parkName) => (
              <button
                key={parkName}
                onClick={() => setSelectedPark(parkName)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedPark === parkName
                    ? 'bg-green-600 text-white ring-2 ring-offset-2 ring-green-600'
                    : 'bg-green-50 text-green-700 hover:bg-green-100'
                }`}
              >
                {parkName}
              </button>
            ))}
          </div>
        </div>

        {/* === LISTAGEM === */}
        {filteredAttractions.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">Nenhuma atração encontrada.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAttractions.map((attraction) => (
              <AttractionCard
                key={attraction.id}
                attraction={attraction}
                onClick={() => setSelectedAttraction(attraction)}
              />
            ))}
          </div>
        )}
      </div>

      {selectedAttraction && (
        <AttractionDetail
          attraction={selectedAttraction}
          onClose={() => setSelectedAttraction(null)}
        />
      )}
    </div>
  );
}