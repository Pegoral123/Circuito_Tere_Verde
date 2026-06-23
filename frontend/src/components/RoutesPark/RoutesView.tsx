import { useEffect, useState, useMemo } from 'react';
import { Filter } from 'lucide-react';
// import { supabase } from '../lib/supabase'; // Removido em favor da API Django
import { RouteCard } from './RouteCard';
import { RouteDetail } from './RouteDetail';
import { CircuitoVerdeService } from '../../services/CircuitoVerdeService';

// 1. Interfaces baseadas no JSON do Django
export interface Parque {
  id: number;
  nome: string;
  descricao: string;
  localizacao: string;
}

export interface Route {
  id: number;
  nome: string;
  extensao_km: string; // Vem como string "12.00" do Django
  dificuldade: number; // 1, 2 ou 3
  dificuldade_nome: string; // "Fácil", "Moderado", "Difícil"
  status: string; // "ABERTA", etc.
  parque: Parque; // Objeto aninhado
  
  // Campos opcionais (caso existam no futuro)
  imagem_url?: string;
  descricao?: string;
}

export function RoutesView() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  
  // Estados dos Filtros
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all'); // 'all' | '1' | '2' | '3'
  const [selectedPark, setSelectedPark] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  // 2. Fetch dos dados da API Django
  
  useEffect(() => {
      const fetchRoutes = async () => {
        try {
          const data = await CircuitoVerdeService.buscarTrilhas();
          setRoutes(data || []);
        } catch (error) {
          console.error("Erro ao buscar trilhas:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchRoutes();
    }, []);

  // 3. Extrair Parques Únicos (Dinamicamente)
  const uniqueParks = useMemo(() => {
    const parks = routes.map(r => r.parque?.nome).filter(Boolean);
    return Array.from(new Set(parks)).sort();
  }, [routes]);

  // 4. Configuração das Dificuldades (Mapeando IDs 1, 2, 3)
  const difficulties = [
    { id: 'all', label: 'Todos', color: 'bg-gray-100 text-gray-700 hover:bg-gray-200' },
    { id: '1', label: 'Fácil', color: 'bg-green-100 text-green-700 hover:bg-green-200' },
    { id: '2', label: 'Moderado', color: 'bg-amber-100 text-amber-700 hover:bg-amber-200' },
    { id: '3', label: 'Difícil', color: 'bg-red-100 text-red-700 hover:bg-red-200' },
  ];

  // 5. Lógica de Filtragem Otimizada (useMemo)
  const filteredRoutes = useMemo(() => {
    return routes.filter((r) => {
      // Filtro de Dificuldade (Compara número com string convertida)
      if (selectedDifficulty !== 'all') {
        if (r.dificuldade.toString() !== selectedDifficulty) return false;
      }

      // Filtro de Parque (Acessa objeto aninhado)
      if (selectedPark !== 'all') {
        if (r.parque?.nome !== selectedPark) return false;
      }

      return true;
    });
  }, [selectedDifficulty, selectedPark, routes]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando trilhas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Rotas e Trilhas</h1>
          <p className="text-lg text-emerald-50 max-w-2xl">
            Explore caminhos para caminhada e aventura. Encontre a rota perfeita para o seu nível de experiência.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* === FILTRO DE DIFICULDADE === */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Nível de Dificuldade</h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {difficulties.map((difficulty) => (
              <button
                key={difficulty.id}
                onClick={() => setSelectedDifficulty(difficulty.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedDifficulty === difficulty.id
                    ? `${difficulty.color.split(' ')[0]} ${difficulty.color.split(' ')[1]} ring-2 ring-offset-2 ring-green-600` // Mantém a cor base mas adiciona ring
                    : difficulty.color
                }`}
              >
                {difficulty.label}
              </button>
            ))}
          </div>
        </div>

        {/* === FILTRO DE PARQUE (Agora Corrigido) === */}
        <div className="bg-white rounded-2xl shadow-md p-6">
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
        {filteredRoutes.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">Nenhuma rota encontrada com os filtros selecionados.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRoutes.map((route) => (
              <RouteCard 
                key={route.id} 
                route={route} 
                onClick={() => setSelectedRoute(route)} 
              />
            ))}
          </div>
        )}
      </div>

      {selectedRoute && (
        <RouteDetail 
          route={selectedRoute} 
          onClose={() => setSelectedRoute(null)} 
        />
      )}
    </div>
  );
}