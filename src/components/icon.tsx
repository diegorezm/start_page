import {lucideIcons} from "@/interfaces/icon";
import {cn} from "@/lib/utils";

type IconSize = 'sm' | 'md' | 'lg';

export function IconComponent({icon, size = 'md', className}: {icon: string, size?: IconSize, className?: string}) {
  if (!lucideIcons[icon]) {
    console.error(`Icon ${icon} not found`);
    return null;
  }

  const iconSizes = {
    sm: 'size-6',
    md: 'size-8',
    lg: 'size-10',
  }

  const IconComponent = lucideIcons[icon] as React.FC<React.SVGProps<SVGSVGElement>>;
  return <IconComponent className={cn(iconSizes[size], className)} />;
}
