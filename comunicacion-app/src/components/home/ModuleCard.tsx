import { useNavigate } from 'react-router-dom';
import { Button } from '../elements/Button';
import { IconBox } from '../elements/IconBox';

interface ModuleCardProps {
  title: string;
  description: string;
  buttonText: string;
  iconName: string; 
  navigateTo: string;
}

export const ModuleCard = ({ title, description, buttonText, iconName, navigateTo }: ModuleCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="group bg-[#151515] border border-zinc-800/60 rounded-xl p-10 flex flex-col items-center text-center shadow-lg transition-colors duration-300 hover:bg-[#181818]">
      
      <IconBox className="transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:bg-[#2c344d]">
        <span className="material-symbols-outlined text-[28px]">
          {iconName}
        </span> 
      </IconBox>
      
      <h3 className="text-xl font-semibold text-zinc-100 mb-3">{title}</h3>
      <p className="text-zinc-400 text-sm leading-relaxed mb-8 flex-grow">
        {description}
      </p>
      
      <Button className="w-full" onClick={() => navigate(navigateTo)}>
        {buttonText}
      </Button>
    </div>
  );
};