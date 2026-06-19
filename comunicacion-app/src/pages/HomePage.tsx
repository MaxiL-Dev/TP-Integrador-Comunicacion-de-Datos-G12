import { ModuleCard } from '../components/home/ModuleCard';
import { homeModulesData } from './../types/homeProps';

export const HomePage = () => {
  return (
    <div className="max-w-5xl mx-auto">
        
      {/* Hero Section */}
      <div className="mb-16">
        <h1 className="text-4xl md:text-[2.75rem] font-display font-bold text-zinc-100 mb-4 tracking-wide">
          Trabajo Integrador <em className="text-[#a8c7fa] not-italic font-normal">-</em> Comunicación de Datos
        </h1>
        <p className="text-zinc-300 text-sm md:text-base">
          Integrantes: Baez Ramiro, López Máximo, Marini Santiago y Olivera Milagros
        </p>
        <a
          href="https://github.com/MaxiL-Dev/TP-Integrador-Comunicacion-de-Datos-G12"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[#a8c7fa] hover:text-[#96b8ef] transition-colors mt-4"
        >
          <svg viewBox="0 0 16 16" width="24" height="24" fill="currentColor" aria-hidden="true">
            <path d="M8 0c4.42 0 8 3.58 8 8a8 8 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38c0-.27.01-1.13.01-2.2c0-.75-.25-1.23-.54-1.48c1.78-.2 3.65-.88 3.65-3.95c0-.88-.31-1.59-.82-2.15c.08-.2.36-1.02-.08-2.12c0 0-.67-.22-2.2.82c-.64-.18-1.32-.27-2-.27c-.68 0-1.36.09-2 .27c-1.53-1.03-2.2-.82-2.2-.82c-.44 1.1-.16 1.92-.08 2.12c-.51.56-.82 1.28-.82 2.15c0 3.06 1.86 3.75 3.64 3.95c-.23.2-.44.55-.51 1.07c-.46.21-1.61.55-2.33-.66c0 0-.42-.77-1.22-.82c0 0-.78 0-.05.48c0 0 .53.25.9 1.18c0 0 .47 1.44 2.7.95c0 .55.01 1.07.01 1.43c0 .21-.15.45-.55.38A8 8 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
          </svg>
          Repositorio de GitHub
        </a>
      </div>

      {/* Grid de Módulos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {homeModulesData.map((module) => (
          <ModuleCard
            key={module.id}
            title={module.title}
            description={module.description}
            buttonText={module.buttonText}
            iconName={module.iconName}
            navigateTo={module.navigateTo}
          />
        ))}
      </div>
    </div>
  );
};