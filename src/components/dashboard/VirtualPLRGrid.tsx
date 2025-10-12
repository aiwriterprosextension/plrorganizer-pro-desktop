import PLRItemCard from '@/components/PLRItemCard';
import { Checkbox } from '@/components/ui/checkbox';

interface VirtualPLRGridProps {
  items: any[];
  categories: any[];
  onUpdate: () => void;
  selectedItems: Set<string>;
  onToggleSelection: (id: string) => void;
}

export default function VirtualPLRGrid({ 
  items, 
  categories, 
  onUpdate,
  selectedItems,
  onToggleSelection 
}: VirtualPLRGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => {
        const isSelected = selectedItems.has(item.id);
        
        return (
          <div 
            key={item.id}
            className={`relative ${isSelected ? 'ring-2 ring-primary' : ''}`}
          >
            <div className="absolute top-2 left-2 z-10">
              <Checkbox 
                checked={isSelected}
                onCheckedChange={() => onToggleSelection(item.id)}
                className="bg-background"
              />
            </div>
            <PLRItemCard 
              item={item} 
              categories={categories} 
              onUpdate={onUpdate} 
            />
          </div>
        );
      })}
    </div>
  );
}
