import { Mountain, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Mountain className="h-8 w-8 text-green-500" />
              <div>
                <h3 className="text-xl font-bold text-white">Circuito Verde</h3>
                <p className="text-xs text-green-400">Turismo & Natureza</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Descubra as belezas naturais e culturais da nossa região. Rotas, trilhas e atrações para todos os gostos.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Navegação</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-green-400 transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-green-400 transition-colors">
                  Atrações
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-green-400 transition-colors">
                  Rotas
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span className="text-gray-400">Serra dos Órgãos - RJ</span>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span className="text-gray-400">(24) 99999-9999</span>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span className="text-gray-400">contato@circuitoverde.com.br</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} Circuito Verde. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
