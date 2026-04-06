import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

/**
 * Mock Data basado en las nuevas referencias visuales (Galaxy S24 Ultra)
 */
const GALAXY_S24_ULTRA = {
  id: 'galaxy-s24-ultra',
  brand: 'SAMSUNG',
  name: 'GALAXY S24 ULTRA',
  price: '1.249,00',
  description: 'Introducing the Galaxy S24 Ultra, the ultimate smartphone experience. Featuring a stunning titanium frame, a powerful AI-enhanced camera, and a vibrant AMOLED display.',
  imgUrl: 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_1280.png',
  selectedColor: 'Negro Titanium',
  colors: [
    { name: 'Negro Titanium', hex: '#2C2E31' },
    { name: 'Gris Titanium', hex: '#8E9094' },
    { name: 'Violeta Titanium', hex: '#4B4D5B' },
    { name: 'Amarillo Titanium', hex: '#EBE6D6' },
  ],
  storage: [
    { id: '256', label: '256GB', selected: true },
    { id: '512', label: '512GB', selected: false },
    { id: '1024', label: '1TB', selected: false },
  ],
  specifications: [
    { label: 'PANTALLA', value: '6.8" QHD+ Dynamic AMOLED 2X, 120Hz' },
    { label: 'PROCESADOR', value: 'Snapdragon 8 Gen 3 for Galaxy' },
    { label: 'RAM', value: '12 GB LPDDR5X' },
    { label: 'CÁMARA TRASERA', value: '200 MP + 50 MP + 12 MP + 10 MP' },
    { label: 'CÁMARA FRONTAL', value: '12 MP' },
    { label: 'BATERÍA', value: '5.000 mAh' },
    { label: 'SISTEMA OPERATIVO', value: 'Android 14' },
  ],
  similar: [
    { brand: 'APPLE', name: 'IPHONE 15 PRO MAX', price: '1.399,00', imgUrl: 'https://cdn.pixabay.com/photo/2016/11/29/12/30/android-1869510_1280.jpg' },
    { brand: 'GOOGLE', name: 'PIXEL 8 PRO', price: '899,00', imgUrl: 'https://cdn.pixabay.com/photo/2014/08/05/10/30/iphone-410324_1280.jpg' },
    { brand: 'SAMSUNG', name: 'GALAXY Z FOLD 5', price: '1.599,00', imgUrl: 'https://cdn.pixabay.com/photo/2017/04/19/13/03/smartphone-2242142_1280.jpg' },
    { brand: 'XIAOMI', name: '14 ULTRA', price: '1.199,00', imgUrl: 'https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_1280.png' },
  ]
};

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-black selection:text-white pb-32 pt-20">
      
      {/* Botón Atrás - Top Left */}
      <div className="max-w-[1440px] mx-auto px-10 lg:px-24 pt-10 pb-6">
        <Link 
          to="/" 
          className="text-xs uppercase tracking-[0.4em] text-gray-400 hover:text-black transition-colors flex items-center group font-thin"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-2 stroke-[1px] group-hover:-translate-x-1 transition-transform" /> 
          BACK
        </Link>
      </div>

      <main className="max-w-[1440px] mx-auto px-10 lg:px-24">
        
        {/* Bloque de Compra (Imagen + Info) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 items-start mb-40">
          
          {/* Imagen Central (Columna Izquierda 7/12) */}
          <div className="lg:col-span-7 flex items-center justify-center bg-white aspect-square lg:aspect-auto h-auto lg:h-[700px] overflow-hidden p-20">
            <img 
              src={GALAXY_S24_ULTRA.imgUrl} 
              alt={GALAXY_S24_ULTRA.name} 
              className="w-full h-full object-contain mix-blend-multiply"
            />
          </div>

          {/* Columna Info (Derecha 5/12) */}
          <div className="lg:col-span-5 space-y-12">
            
            {/* Título y Precio */}
            <header className="space-y-4">
              <h1 className="text-3xl font-extralight uppercase tracking-[0.2em] text-[#000000]">
                {GALAXY_S24_ULTRA.name}
              </h1>
              <p className="text-xl font-extralight text-[#000000] tracking-widest tabular-nums">
                {GALAXY_S24_ULTRA.price} EUR
              </p>
            </header>

            {/* Selector de Storage */}
            <div className="space-y-6">
              <p className="text-[11px] font-thin uppercase tracking-[0.2em] text-[#000000]">
                STORAGE. ¿HOW MUCH SPACE DO YOU NEED?
              </p>
              <div className="grid grid-cols-3 gap-3">
                {GALAXY_S24_ULTRA.storage.map((opt) => (
                  <button 
                    key={opt.id}
                    className={`border px-4 py-8 text-[11px] uppercase tracking-widest transition-colors font-extralight ${
                      opt.selected 
                        ? 'border-[#000000] border-[1.5px]' 
                        : 'border-gray-100 hover:border-gray-400'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Selector de Color */}
            <div className="space-y-6">
              <p className="text-[11px] font-thin uppercase tracking-[0.2em] text-[#000000]">
                COLOR. PICK YOUR FAVOURITE.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4">
                  {GALAXY_S24_ULTRA.colors.map((color) => (
                    <button 
                      key={color.name}
                      className={`w-6 h-6 rounded-full border p-0.5 transition-colors ${
                        color.name === GALAXY_S24_ULTRA.selectedColor ? 'border-[#000000]' : 'border-transparent hover:border-gray-200'
                      }`}
                    >
                      <div className="w-full h-full rounded-full" style={{ backgroundColor: color.hex }} />
                    </button>
                  ))}
                </div>
                {/* Nombre del color seleccionado - Única negrita permitida */}
                <span className="text-[11px] text-[#000000] font-bold uppercase tracking-widest block">
                  {GALAXY_S24_ULTRA.selectedColor}
                </span>
              </div>
            </div>

            {/* Botón Añadir */}
            <button className="w-full bg-[#000000] text-white py-6 uppercase text-[12px] tracking-[0.5em] font-extralight hover:bg-neutral-900 transition-colors">
              Añadir
            </button>

            {/* Descripción suave abajo */}
            <p className="text-[12px] font-extralight leading-relaxed text-gray-500 uppercase tracking-widest pt-4">
              {GALAXY_S24_ULTRA.description}
            </p>
          </div>

        </div>

        {/* Sección de Especificaciones */}
        <section className="mb-40 pt-20">
          <h2 className="text-4xl font-thin uppercase tracking-[0.4em] text-[#000000] mb-20">
            SPECIFICATIONS
          </h2>
          <div className="w-full space-y-0">
            {GALAXY_S24_ULTRA.specifications.map((spec) => (
              <div 
                key={spec.label} 
                className="grid grid-cols-1 md:grid-cols-2 py-10 border-t-[0.5px] border-gray-300 items-center"
              >
                <span className="text-[10px] uppercase tracking-[0.4em] text-gray-400 font-extralight pl-4">
                  {spec.label}
                </span>
                <span className="text-[12px] uppercase tracking-[0.2em] text-[#000000] font-extralight pr-4 md:text-right">
                  {spec.value}
                </span>
              </div>
            ))}
            <div className="border-t-[0.5px] border-gray-300"></div>
          </div>
        </section>

        {/* Productos Similares */}
        <section className="mb-20">
          <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-[#000000] mb-16">
            SIMILAR ITEMS
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-0 border-t border-gray-100">
            {GALAXY_S24_ULTRA.similar.map((item, idx) => (
              <div 
                key={idx} 
                className="border-[0.5px] border-gray-100 bg-white flex flex-col relative group cursor-pointer transition-colors duration-300"
              >
                <div className="aspect-square w-full relative overflow-hidden bg-white p-12">
                  <img src={item.imgUrl} alt={item.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex justify-between items-end w-full px-2 pb-4 mt-auto">
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-[10px] uppercase tracking-widest font-extralight">{item.brand}</span>
                    <span className="text-black text-[12px] uppercase tracking-widest font-extralight">{item.name}</span>
                  </div>
                  <span className="text-black text-[12px] font-extralight tabular-nums tracking-widest">{item.price} EUR</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
