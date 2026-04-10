import type { FC } from 'react';

interface Option {
  id: string;
  label?: string;
  color?: string; // For hexCode
}

interface VariantSelectorProps {
  title: string;
  options: Option[];
  selectedId: string;
  onSelect: (id: string) => void;
  type: 'grid' | 'rounded';
}

export const VariantSelector: FC<VariantSelectorProps> = ({
  title,
  options,
  selectedId,
  onSelect,
  type,
}) => {
  return (
    <div className="space-y-6">
      <p className="text-xs font-extralight uppercase tracking-widest text-[#000000]">
        {title}
      </p>

      {type === 'grid' ? (
        <div
          className="grid grid-cols-3 gap-3"
          role="radiogroup"
          aria-label={title}
        >
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              aria-checked={selectedId === opt.id}
              role="radio"
              aria-label={opt.label}
              className={`border px-4 py-8 text-xs uppercase tracking-widest transition-colors font-extralight ${
                selectedId === opt.id
                  ? 'border-[#000000] border-[1.5px]'
                  : 'border-gray-100 hover:border-gray-400'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex gap-4" role="radiogroup" aria-label={title}>
            {options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => onSelect(opt.id)}
                role="radio"
                aria-checked={selectedId === opt.id}
                aria-label={`Color ${opt.id}`}
                className={`w-8 h-8 rounded-full border p-1 transition-colors ${
                  selectedId === opt.id
                    ? 'border-[#000000]'
                    : 'border-transparent hover:border-gray-200'
                }`}
              >
                <div
                  className="w-full h-full rounded-full"
                  style={{ backgroundColor: opt.color }}
                />
              </button>
            ))}
          </div>
          {/* Active selection label */}
          <span className="text-xs text-[#000000] font-light uppercase tracking-widest block">
            {selectedId}
          </span>
        </div>
      )}
    </div>
  );
};

export default VariantSelector;
