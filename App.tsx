import React, { useState } from 'react';
import { Pyramid } from './components/Pyramid';
import { PYRAMID_LEVELS, FILTER_CATEGORIES, MANUFACTURER_BRANDS } from './constants';
import type { PyramidLevelData } from './types';

const App: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<PyramidLevelData | null>(
    PYRAMID_LEVELS[0]
  );
  const [hoveredLevel, setHoveredLevel] = useState<PyramidLevelData | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>(FILTER_CATEGORIES[0].id);


  const handleSelectLevel = (level: PyramidLevelData) => {
    setSelectedLevel(level);
  };

  const handleHoverLevel = (level: PyramidLevelData | null) => {
    setHoveredLevel(level);
  };

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
  };
  
  const getBankabilityPercentage = (level: PyramidLevelData | null) => {
    if (!level) return 0;
    const index = PYRAMID_LEVELS.findIndex(l => l.id === level.id);
    if (index === -1) return 0;
    const totalLevels = PYRAMID_LEVELS.length;
    // Maps index 0 to 100%, and the last index to a small percentage
    return 100 - (index / (totalLevels - 1)) * 95;
  };

  const getTierGroupInfo = (level: PyramidLevelData | null): { text: string; colorClass: string } => {
    if (!level) return { text: '', colorClass: 'text-gray-500' };
    const id = level.id;
    const tier1Premium = ['AAA', 'AA', 'A'];
    const tier2 = ['BBB', 'BB', 'B'];

    if (tier1Premium.includes(id)) {
      return { text: 'Nível: Tier 1 Premium', colorClass: 'text-green-600' };
    }
    if (tier2.includes(id)) {
      return { text: 'Nível: Tier 2', colorClass: 'text-amber-600' };
    }
    return { text: 'Nível: Especulativo', colorClass: 'text-red-600' };
  };

  const displayLevel = hoveredLevel || selectedLevel;
  const tierGroup = getTierGroupInfo(displayLevel);
  const filteredBrands = MANUFACTURER_BRANDS[activeFilter] || [];
  const shouldShowPremiumIcon = displayLevel && ['AAA', 'AA', 'A'].includes(displayLevel.id);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans overflow-hidden">
      <main className="w-full max-w-6xl flex flex-col items-center justify-center gap-6 sm:gap-8">
        <div className="w-full flex flex-col lg:flex-row items-stretch justify-center gap-6 sm:gap-8 lg:gap-12">
            <div className="w-full lg:w-1/2 flex justify-center items-stretch">
            <Pyramid
                levels={PYRAMID_LEVELS}
                selectedLevel={selectedLevel}
                hoveredLevel={hoveredLevel}
                onSelectLevel={handleSelectLevel}
                onHoverLevel={handleHoverLevel}
            />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col gap-6 sm:gap-8">
            {displayLevel ? (
                <div
                key={displayLevel.id}
                className="bg-white/50 backdrop-blur-md p-1 rounded-2xl animate-card-enter flex-grow flex flex-col"
                style={{
                    border: `1px solid #e5e7eb`, // gray-200
                    boxShadow: `0 25px 50px -12px rgb(0 0 0 / 0.1), 0 0 25px ${displayLevel.colorHex}20`,
                }}
                >
                <div className="bg-white/80 rounded-[14px] p-6 flex flex-col flex-grow justify-between relative">
                    {shouldShowPremiumIcon && (
                        <img
                            src="https://i.postimg.cc/7PdxbBg5/image-removebg-preview-25.png"
                            alt="Selo Tier 1 Premium"
                            className="absolute top-4 right-4 w-20 h-20 object-contain pointer-events-none"
                            aria-hidden="true"
                        />
                    )}
                    <div className="animate-content-enter" style={{ animationDelay: '150ms' }}>
                    <div className="flex justify-between items-start">
                        <div>
                        <h2 className="text-3xl font-bold mb-1">
                            Classificação:&nbsp;
                            <span style={{ color: displayLevel.colorHex, textShadow: `0 0 8px ${displayLevel.colorHex}40` }}>
                            {displayLevel.label}
                            </span>
                        </h2>
                        <p className={`text-lg font-semibold ${tierGroup.colorClass}`}>
                            <span className="text-gray-800 font-bold">Nível:</span>&nbsp;{tierGroup.text.replace('Nível: ', '')}
                        </p>
                        </div>
                    </div>
                    <div className="w-full mt-4">
                        <p className="text-sm text-gray-500 mb-1">Nível de Bancabilidade</p>
                        <div className="h-2.5 w-full rounded-full bg-gray-200">
                        <div 
                            className="h-2.5 rounded-full transition-all duration-700 ease-out" 
                            style={{ 
                            width: `${getBankabilityPercentage(displayLevel)}%`,
                            backgroundColor: displayLevel.colorHex,
                            boxShadow: `0 0 12px ${displayLevel.colorHex}90`,
                            }}
                        ></div>
                        </div>
                    </div>
                    </div>

                    <div 
                      className="mt-6 animate-content-enter min-h-28" 
                      style={{ animationDelay: '250ms' }}
                    >
                      <p className="text-gray-600 leading-relaxed line-clamp-4">
                        {displayLevel.description}
                      </p>
                    </div>
                </div>
                </div>
            ) : (
                <div className="bg-gray-200/50 border border-gray-300 rounded-2xl p-6 flex items-center justify-center text-gray-500 min-h-[400px] flex-grow">
                <p>Passe o mouse sobre uma fase da pirâmide para ver a explicação.</p>
                </div>
            )}

            {/* Filter Section */}
            <div
                className="bg-white/50 backdrop-blur-md p-1 rounded-2xl animate-card-enter"
                style={{
                border: `1px solid #e5e7eb`,
                boxShadow: `0 25px 50px -12px rgb(0 0 0 / 0.1)`,
                animationDelay: '150ms',
                }}
            >
                <div className="bg-white/80 rounded-[14px] p-4">
                <h3 className="text-lg font-bold text-center mb-3 text-gray-700">Exemplos de Fabricantes</h3>
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 flex-wrap">
                    {FILTER_CATEGORIES.map(category => (
                    <button
                        key={category.id}
                        onClick={() => handleFilterChange(category.id)}
                        className={`px-4 py-2 text-sm sm:text-base font-semibold rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 ${
                        activeFilter === category.id
                            ? 'bg-gray-800 text-white shadow-lg'
                            : 'bg-white/60 text-gray-700 hover:bg-gray-200/70 border border-gray-200'
                        }`}
                    >
                        {category.label}
                    </button>
                    ))}
                </div>
                
                <div key={activeFilter} className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                    {filteredBrands.map((brand, index) => (
                    <div
                        key={brand.name}
                        className="bg-gray-50/50 border border-gray-200/80 rounded-lg p-2 flex items-center justify-center text-center aspect-[2/1] transition-shadow duration-300 hover:shadow-md animate-brand-item-enter"
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <span className="font-semibold text-gray-700 text-sm sm:text-base">{brand.name}</span>
                    </div>
                    ))}
                </div>
                </div>
            </div>
            </div>
        </div>
        
      </main>
      
      <footer className="w-full max-w-3xl text-center mt-8 text-gray-500 text-sm px-4">
        <p>
          <strong>Fonte:</strong> <strong>PV Tech</strong>. A metodologia de classificação de bancabilidade é baseada na análise da <em>PV ModuleTech Bankability Ratings</em>, um relatório que a organização global lança trimestralmente para avaliar a saúde financeira e tecnológica de fabricantes de módulos solares para investidores.
        </p>
      </footer>

      <style>{`
        @keyframes card-enter {
          from {
            opacity: 0;
            transform: perspective(1000px) rotateX(-20deg) scale(0.9);
          }
          to {
            opacity: 1;
            transform: perspective(1000px) rotateX(0deg) scale(1);
          }
        }
        
        @keyframes content-enter {
          from { 
            opacity: 0; 
            transform: translateY(15px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }

        @keyframes brand-item-enter {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-card-enter {
          animation: card-enter 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .animate-content-enter {
          opacity: 0; /* Start hidden */
          animation: content-enter 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        .animate-brand-item-enter {
          opacity: 0;
          animation: brand-item-enter 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        
        .line-clamp-4 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
        }
      `}</style>
    </div>
  );
};

export default App;
