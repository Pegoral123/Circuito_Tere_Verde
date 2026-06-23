import { Mountain, Menu, X } from 'lucide-react';
import { useState } from 'react';

type HeaderProps = {
  currentView: string;
  onNavigate: (view: string) => void;
};

export function Header({ currentView, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Início' },
    { id: 'attractions', label: 'Atrações' },
    { id: 'routes', label: 'Rotas' },
    { id: 'admin', label: 'Administração' },
  ];
  const urlSiteAdmin  ="https://projeto-mvp-mobile-back-end.onrender.com/admin"

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-2 group"
          >
            <Mountain className="h-8 w-8 text-green-600 group-hover:text-green-700 transition-colors" />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900">Circuito Verde</span>
              <span className="text-xs text-green-600 -mt-1">Turismo & Natureza</span>
            </div>
          </button>

         <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === "admin") {
                    window.open(urlSiteAdmin, "_blank");
                    return;
                  }

                  onNavigate(item.id);
                }}
                className={`text-sm font-medium transition-colors relative pb-1 ${
                  currentView === item.id
                    ? 'text-green-600'
                    : 'text-gray-700 hover:text-green-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
        <nav className="md:hidden py-4 border-t border-gray-200">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === "admin") {
                  window.open(urlSiteAdmin, "_blank");
                  setMobileMenuOpen(false);
                  return;
                }

                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                currentView === item.id
                  ? "bg-green-50 text-green-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      )}
      </div>
    </header>
  );
}
