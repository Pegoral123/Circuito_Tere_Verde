import { ArrowRight, Map } from 'lucide-react';
import { useEffect, useState } from "react";
import { CircuitoVerdeService } from '../services/CircuitoVerdeService';

type HeroProps = {
  onNavigate: (view: string) => void;
};

export function Hero({ onNavigate }: HeroProps) {
  const [novidades, setNovidades] = useState([]);
  const [parques, setParques] = useState([]);

  useEffect(() => {
    async function carregarDados() {
      try {
        const [novidadesData, parquesData] = await Promise.all([
          CircuitoVerdeService.buscarNovidades(),
          CircuitoVerdeService.buscarParques()
        ]);
        console.log(parquesData)
        setNovidades(novidadesData);
        setParques(parquesData);

      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }

    carregarDados();
  }, []);
  return (
    <div className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-10"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        
        {/* Hero Text Content */}
        <div className="text-center space-y-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Descubra o{' '}
            <span className="text-green-600 relative inline-block">
              Circuito Verde
              <svg
                className="absolute -bottom-2 left-0 w-full"
                height="12"
                viewBox="0 0 200 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 10C20 5 60 2 100 5C140 8 180 7 198 10"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="text-green-600"
                />
              </svg>
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Explore trilhas, cachoeiras, atrações culturais e rotas de ciclismo em um dos destinos mais belos da região.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => onNavigate('attractions')}
              className="group px-8 py-4 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition-all flex items-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <span>Explorar Atrações</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('routes')}
              className="group px-8 py-4 bg-white text-green-600 border-2 border-green-600 rounded-full font-medium hover:bg-green-50 transition-all flex items-center space-x-2"
            >
              <span>Ver Rotas</span>
              <Map className="h-5 w-5" />
            </button>
          </div>
        </div>
       {/* Novidades */}
        {novidades.length > 0 && (
          <div className="mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-12">
              Novidades do Circuito Verde
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {novidades.map((n) => (
                <NewsCard
                  key={n.id}
                  date={n.data_publicacao || "Não publicado"}
                  title={n.titulo}
                  park={n.parque?.nome || "Não informado"}
                  description={n.descricao}
                  tags={n.tag_novidades?.map((t) => t.nome_da_tag) || []}
                />
              ))}
            </div>
          </div>
        )}

        {/* Parques em Destaque */}
        {parques?.length > 0 && (
          <div className="mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-12">
              Parques em Destaque
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {parques.map((p) => (
                <ParkCard
                  key={p.id}
                  title={p.nome}
                  description={p.descricao}
                  address={p.localizacao}
                  hours={
                    p.horarios?.map(
                      h => `${h.dia_extenso}: ${h.hora_abertura} - ${h.hora_fechamento}`
                    ).join(" | ") || "Não informado"
                  }
                  tags={p.tag?.map(t => t.nome_da_tag) || []}
                />
              ))}
            </div>
          </div>
        )}


      </div>
    </div>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{text}</p>
    </div>
  );
}

type ParkCardProps = {
  title: string;
  description: string;
  address: string;
  hours: string;
  tags: string[];
};
type NewsCardProps = {
  date: string;
  title: string;
  park: string;
  description: string;
  tags?: string[];
};

export function ParkCard({ title, description, address, hours, tags }: ParkCardProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
      {/* Imagem placeholder */}
      <div className="h-40 bg-green-100 rounded-xl flex items-center justify-center text-green-600 font-bold text-xl">
        {title}
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mt-4">{title}</h3>
      <p className="text-gray-600 text-sm mt-1">{description}</p>

      <div className="mt-3 text-sm text-gray-700">
        <p><span className="font-semibold">Endereço:</span> {address}</p>
        <p><span className="font-semibold">Funcionamento:</span> {hours}</p>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
export function NewsCard({ date, title, park, description, tags = [] }: NewsCardProps) {
  const dataFormatada = date ? new Date(date).toLocaleDateString('pt-BR') : "Não publicado";

  return (
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
      
      {/* Data */}
      <p className="text-xs text-gray-500 font-medium mb-2">
        Data de publicação:{dataFormatada}
      </p>

      {/* Título */}
      <h3 className="text-lg font-semibold text-gray-900">
        {title}
      </h3>

      {/* Parque relacionado */}
      <p className="text-sm text-green-700 font-medium mt-1">
        Parque: {park}
      </p>

      {/* Descrição */}
      <p className="text-gray-600 text-sm mt-2 leading-relaxed">
        {description}
      </p>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

    </div>
  );
}
