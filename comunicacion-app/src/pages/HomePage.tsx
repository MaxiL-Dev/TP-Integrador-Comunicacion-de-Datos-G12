import { ModuleCard } from '../components/ModuleCard';
import { homeModulesData } from './../types/homeProps';

export const HomePage = () => {
  return (
    <div className="max-w-5xl mx-auto">
        
      {/* Hero Section */}
      <div className="mb-16">
        <h1 className="text-4xl md:text-[2.75rem] font-serif font-bold text-zinc-100 mb-4 tracking-wide">
          Trabajo Integrador - Comunicación de Datos
        </h1>
        <p className="text-zinc-300 text-sm md:text-base">
          Integrantes: Baez Ramiro, López Máximo, Marini Santiago y Olivera Milagros
        </p>
      </div>

      {/* Grid de Módulos (Renderizado dinámico) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {homeModulesData.map((module) => (
          <ModuleCard
            key={module.id}
            title={module.title}
            description={module.description}
            buttonText={module.buttonText}
            iconClass={module.iconClass}
            navigateTo={module.navigateTo}
          />
        ))}
      </div>
    </div>
  );
};