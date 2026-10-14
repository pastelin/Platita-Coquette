/**
 * Catálogo centralizado: para añadir una pieza basta con agregar un objeto.
 * Precios transcritos de las etiquetas visibles en las fotografías originales.
 * Confirma precios, nombres, materiales, tallas y disponibilidad antes de publicar.
 */
export type ProductCategory = 'collares' | 'pulseras' | 'anillos' | 'aretes';
export type ProductMaterial = 'plata' | 'textil' | 'mixto' | 'plastico';
export const materialLabels: Record<ProductMaterial, string> = {
    plata: 'Plata',
    textil: 'Hilo / Tela',
    mixto: 'Hilo y cuentas',
    plastico: 'Plástico',
};

export type Product = {
    id: string;
    name: string;
    category: ProductCategory;
    price: number | 30;
    description: string;
    images: string[];
    featured?: boolean;
    label?: 'Popular' | 'Favorito';
    material?: ProductMaterial;
};

const image = (number: number) =>
    `/images/photo-${String(number).padStart(2, '0')}.webp`;

const pulseraImage = (number: number) =>
    `/images/pulsera-${String(number).padStart(2, '0')}.jpeg`;

export const categories: {
    id: ProductCategory;
    title: string;
    tagline: string;
    image: string;
}[] = [
    {
        id: 'collares',
        title: 'Collares',
        tagline: 'Lleva la luz contigo',
        image: image(10),
    },
    {
        id: 'pulseras',
        title: 'Pulseras',
        tagline: 'Un detalle en cada gesto',
        image: image(7),
    },
    {
        id: 'anillos',
        title: 'Anillos',
        tagline: 'Pequeños protagonistas',
        image: image(19),
    },
    {
        id: 'aretes',
        title: 'Aretes',
        tagline: 'Brilla a tu manera',
        image: image(22),
    },
];

export const products: Product[] = [
    {
        id: 'COL-001',
        name: 'Collar de Corazones Entrelazados',
        category: 'collares',
        price: 350,
        description:
            'Cadena de corazones entrelazados finos con una silueta ligera, ideal para llevar sola o en capas.',
        images: [image(1)],
        featured: true,
        label: 'Popular',
    },
    {
        id: 'COL-002',
        name: 'Collar Hilo de Luz',
        category: 'collares',
        price: 260,
        description:
            'Una cadena delicada y atemporal para aportar brillo discreto a cualquier look.',
        images: [image(2)],
    },
    {
        id: 'PUL-006',
        name: 'Pulsera Cadena Clásica',
        category: 'pulseras',
        price: 350,
        description:
            'Eslabones definidos y un acabado pulido que combinan con todo.',
        images: [image(3)],
    },
    {
        id: 'PUL-007',
        name: 'Pulsera Aura',
        category: 'pulseras',
        price: 180,
        description:
            'Detalles alargados que reflejan la luz y dan movimiento a tu estilo.',
        images: [image(4)],
        featured: true,
    },
    {
        id: 'PUL-001',
        name: 'Pulsera Órbita',
        category: 'pulseras',
        price: 230,
        description:
            'Una secuencia de eslabones ovalados con carácter minimalista.',
        images: [image(5)],
    },
    {
        id: 'PUL-002',
        name: 'Pulsera Trazo',
        category: 'pulseras',
        price: 320,
        description:
            'Líneas delicadas y detalles alargados para un toque moderno.',
        images: [image(6)],
    },
    {
        id: 'PUL-003',
        name: 'Pulsera Mirada Roja',
        category: 'pulseras',
        price: 250,
        description:
            'Toques de color rojo sobre una cadena ligera: un detalle que no pasa desapercibido.',
        images: [image(7)],
        featured: true,
        label: 'Favorito',
    },
    {
        id: 'PUL-004',
        name: 'Pulsera Destello',
        category: 'pulseras',
        price: 200,
        description:
            'Una pieza fina de textura luminosa, perfecta para usar todos los días.',
        images: [image(8)],
    },
    {
        id: 'COL-005',
        name: 'Collar Mini Esferas',
        category: 'collares',
        price: 380,
        description:
            'Pequeños acentos distribuidos en una cadena sutil que aporta brillo.',
        images: [image(9)],
    },
    {
        id: 'COL-006',
        name: 'Collar Línea Sutil',
        category: 'collares',
        price: 260,
        description:
            'Diseño sencillo y versátil para complementar tus piezas favoritas.',
        images: [image(10)],
    },
    {
        id: 'PUL-005',
        name: 'Pulsera Eslabón Fino',
        category: 'pulseras',
        price: 190,
        description:
            'Una cadena estilizada que combina fácilmente con otras pulseras.',
        images: [image(11)],
    },
    {
        id: 'ARE-001',
        name: 'Aretes Zirconia Verde',
        category: 'aretes',
        price: 60,
        description:
            'Zirconias de tono verde intenso. La fotografía muestra dos presentaciones; consulta el modelo disponible y su precio.',
        images: [image(12)],
    },
    {
        id: 'ARE-002',
        name: 'Broqueles Mini Corazón',
        category: 'aretes',
        price: 70,
        description:
            'Broqueles discretos con forma de corazón para quienes aman los detalles pequeños.',
        images: [image(13)],
    },
    {
        id: 'ANI-001',
        name: 'Anillo Círculos',
        category: 'anillos',
        price: 150,
        description:
            'Formas entrelazadas que crean un diseño limpio y elegante.',
        images: [image(14)],
    },
    {
        id: 'ANI-002',
        name: 'Anillo Estrella',
        category: 'anillos',
        price: 150,
        description:
            'Un motivo de estrella protagonista para darle personalidad a tus manos.',
        images: [image(15)],
    },
    {
        id: 'ANI-003',
        name: 'Anillo Nota Musical',
        category: 'anillos',
        price: 150,
        description:
            'Un guiño a la música convertido en un accesorio lleno de encanto.',
        images: [image(16)],
    },
    {
        id: 'ANI-004',
        name: 'Anillo Ondas',
        category: 'anillos',
        price: 150,
        description: 'Líneas onduladas y suaves que evocan movimiento.',
        images: [image(17)],
    },
    {
        id: 'ARE-003',
        name: 'Aretes Rosa Vibrante',
        category: 'aretes',
        price: 80,
        description:
            'Color rosa luminoso para añadir un acento alegre a tu día.',
        images: [image(18)],
    },
    {
        id: 'ANI-005',
        name: 'Anillo Infinito Azul',
        category: 'anillos',
        price: 150,
        description:
            'Diseño de infinito con un pequeño detalle azul que atrae las miradas.',
        images: [image(19)],
        featured: true,
        label: 'Popular',
    },
    {
        id: 'ARE-004',
        name: 'Aretes Dados',
        category: 'aretes',
        price: 100,
        description:
            'Un diseño divertido de pequeños dados que aporta un toque original.',
        images: [image(20), image(27)],
    },
    {
        id: 'ARE-005',
        name: 'Aretes Zirconia Noche',
        category: 'aretes',
        price: 60,
        description: 'Un punto de brillo en tono oscuro para un estilo sobrio.',
        images: [image(21)],
    },
    {
        id: 'ARE-006',
        name: 'Aretes Zirconia Azul',
        category: 'aretes',
        price: 60,
        description: 'Un toque azul intenso en un formato clásico y versátil.',
        images: [image(22)],
        featured: true,
    },
    {
        id: 'ARE-007',
        name: 'Aretes Zirconia Cristal',
        category: 'aretes',
        price: 60,
        description: 'Brillo cristalino, delicado y fácil de combinar.',
        images: [image(23)],
    },
    {
        id: 'ARE-008',
        name: 'Aretes Zirconia Roja',
        category: 'aretes',
        price: 60,
        description:
            'Un pequeño acento rojo que ilumina cualquier combinación.',
        images: [image(24)],
    },
    {
        id: 'ARE-009',
        name: 'Aretes Corazón Fuego',
        category: 'aretes',
        price: 100,
        description:
            'Corazones con detalles de color cálido para un estilo expresivo.',
        images: [image(25)],
    },
    {
        id: 'ARE-010',
        name: 'Aretes Corazón Azul',
        category: 'aretes',
        price: 100,
        description:
            'Corazones con detalles azules que hacen especial un look casual.',
        images: [image(26)],
    },
    // =======================================
    // NUEVA COLECCIÓN DE PULSERAS
    // =======================================

    {
        id: 'PUL-TEX-001',
        name: 'Pulsera Hilo Rojo',
        category: 'pulseras',
        material: 'textil',
        price: 30,
        description:
            'Pulsera minimalista de cordón rojo con nudos ajustables. Un accesorio sencillo para todos los días.',
        images: [pulseraImage(1), pulseraImage(10)],
        featured: true,
    },

    {
        id: 'PUL-MIX-001',
        name: 'Pulsera Ojo Multicolor',
        category: 'pulseras',
        material: 'mixto',
        price: 30,
        description:
            'Cordón rojo decorado con cuentas de colores y motivos de ojo. Un diseño vibrante y lleno de personalidad.',
        images: [pulseraImage(2), pulseraImage(4), pulseraImage(11)],
        featured: true,
        label: 'Popular',
    },

    // {
    //     id: 'PUL-MIX-002',
    //     name: 'Pulsera Yin Yang Negra',
    //     category: 'pulseras',
    //     material: 'mixto',
    //     price: 30,
    //     description:
    //         'Pulsera de cordón oscuro con pequeñas cuentas y un detalle central circular. Elegante y versátil.',
    //     images: [pulseraImage(4), pulseraImage(17)],
    // },

    {
        id: 'PUL-TEX-002',
        name: 'Pulsera Negra con Letra',
        category: 'pulseras',
        material: 'mixto',
        price: 30,
        description:
            'Cordón negro de estilo minimalista con pequeños detalles decorativos y ajuste mediante nudos.',
        images: [pulseraImage(5), pulseraImage(17)],
    },

    {
        id: 'PUL-TEX-003',
        name: 'Pulsera Nudos Negros',
        category: 'pulseras',
        material: 'textil',
        price: 30,
        description:
            'Pulsera de cordón negro trenzado con nudos decorativos. Un diseño discreto para cualquier ocasión.',
        images: [pulseraImage(6)],
    },

    {
        id: 'PUL-MIX-003',
        name: 'Pulsera Ojo Protector Roja',
        category: 'pulseras',
        material: 'mixto',
        price: 30,
        description:
            'Diseño de cordón rojo tejido con un ojo azul central y pequeños detalles decorativos.',
        images: [pulseraImage(7), pulseraImage(9), pulseraImage(18)],
        featured: true,
        label: 'Favorito',
    },

    {
        id: 'PUL-MIX-004',
        name: 'Pulsera Yin Yang Bicolor',
        category: 'pulseras',
        material: 'mixto',
        price: 30,
        description:
            'Combinación de cordón oscuro, cuentas claras y oscuras, con un símbolo de Yin Yang como protagonista.',
        images: [pulseraImage(8)],
    },

    {
        id: 'PUL-MIX-006',
        name: 'Pulsera Cruz Roja',
        category: 'pulseras',
        material: 'mixto',
        price: 30,
        description:
            'Cordón rojo tejido con un dije de cruz y pequeños detalles decorativos. Un accesorio de estilo artesanal.',
        images: [pulseraImage(12)],
    },

    {
        id: 'PUL-MIX-007',
        name: 'Pulsera Coral con Cuentas',
        category: 'pulseras',
        material: 'mixto',
        price: 30,
        description:
            'Pulsera de cordón coral con cuentas de distintos tonos y cierre ajustable.',
        images: [pulseraImage(13), pulseraImage(14)],
        featured: true,
    },

    {
        id: 'PUL-MIX-008',
        name: 'Pulsera Azul Ojo Protector',
        category: 'pulseras',
        material: 'mixto',
        price: 30,
        description:
            'Cordón azul con cuentas decorativas y motivos de ojo en tonos azules. Un accesorio llamativo.',
        images: [pulseraImage(15)],
        featured: true,
    },

    {
        id: 'PUL-MIX-009',
        name: 'Pulsera Negra Minimal',
        category: 'pulseras',
        material: 'mixto',
        price: 30,
        description:
            'Diseño de cordón negro con pequeños detalles metálicos y decorativos, perfecto para un estilo discreto.',
        images: [pulseraImage(3), pulseraImage(16)],
    },
];

export const getProduct = (id: string) =>
    products.find((product) => product.id === id);
export const categoryLabel = (category: ProductCategory) =>
    categories.find((item) => item.id === category)?.title || category;
