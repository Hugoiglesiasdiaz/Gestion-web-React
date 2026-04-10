import type { FC } from 'react';

interface SpecRowProps {
  label: string;
  value: string;
}

export const SpecRow: FC<SpecRowProps> = ({ label, value }) => {
  return (
    <div
      className={`flex py-3 md:py-5 border-t-[0.5px] border-gray-300 ${
        label === 'DESCRIPTION' ? 'items-start' : 'items-center'
      }`}
    >
      <div className="w-1/3 text-xs font-light uppercase text-black">
        {label}
      </div>
      <div className="flex-1 text-xs font-light text-gray-800">
        {value || '-'}
      </div>
    </div>
  );
};

export default SpecRow;
