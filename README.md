# Platita Coquette — tienda catálogo de joyería en plata y accesorios

Proyecto React + TypeScript + Vite, responsivo, con estética editorial minimalista y las imágenes que compartiste. **Platita Coquette es un nombre de marca de ejemplo**, personalizable.

## Incluye

- 27 fotografías reales optimizadas en WebP, más un recorte para la portada, organizadas en **26 productos** (dos fotografías corresponden al mismo modelo de aretes de dados).
- Cuatro categorías: collares, pulseras, anillos y aretes.
- Catálogo con búsqueda, filtros, ordenamiento por precio y nombre, y estados vacíos.
- Detalle de producto con galería, selector de cantidad y precio.
- Favoritos y selección de compra persistentes en `localStorage`.
- Generación de mensaje de pedido por WhatsApp; si falta el número, el botón **copia el pedido** para que la demo siga siendo utilizable.
- Diseño responsivo (móvil, tableta, escritorio), navegación accesible y carga diferida de imágenes.
- Base de código desacoplada por componentes, catálogo y configuración.

## Arranque local

Necesitas Node.js **20.19+** (recomendado Node.js 22).

```bash
npm install
cp .env.example .env
npm run dev
```

En Windows PowerShell, copia el archivo con `Copy-Item .env.example .env`.

Después abre la URL que muestre Vite (habitualmente `http://localhost:5173`).

Para generar una versión lista para publicar:

```bash
npm run build
npm run preview
```

El sitio compilado queda en `dist/`.

## Personaliza tu tienda

| Quieres cambiar... | Archivo |
|---|---|
| Nombre, moneda, enlaces de contacto | `src/config/store.ts` |
| Productos, precios, textos, categorías | `src/data/products.ts` |
| Fotos | `public/images/photo-XX.webp` |
| Tipografía, colores, espacios, tamaños | `src/styles.css` |
| Títulos SEO, favicon | `index.html`, `public/favicon.svg` |
| Imágenes principales del inicio | `src/components/Hero.tsx` |
| Copys de la marca | `src/components/Hero.tsx`, `src/components/Footer.tsx` |

### Activa pedidos por WhatsApp

Copia `.env.example` a `.env` y configura:

```ini
VITE_WHATSAPP_NUMBER=52XXXXXXXXXX
VITE_INSTAGRAM_URL=https://www.instagram.com/tu_perfil/
VITE_CONTACT_EMAIL=ventas@tudominio.com
```

Usa el **número real y verificable**, con indicativo internacional y solo dígitos. Sin número configurado no habrá enlace a WhatsApp: el visitante podrá **copiar el pedido**. Reinicia el servidor después de modificar `.env`.

### Agrega un producto

1. Guarda una foto nueva en `public/images`, preferiblemente `.webp`.
2. Agrega una entrada en el arreglo `products` de `src/data/products.ts`:

```ts
{
  id: 'ANI-006',
  name: 'Anillo nuevo',
  category: 'anillos',
  price: 180, // null => "Consultar precio"
  description: 'Descripción corta y precisa.',
  images: ['/images/anillo-nuevo.webp'],
  featured: true,
}
```

3. Guarda; el catálogo, las búsquedas y el conteo se actualizan automáticamente.

## Importante: datos pendientes de validar

- Los importes se transcribieron de las **etiquetas visibles en tus fotos**; revisa que sigan vigentes antes de publicar.
- Para `ARE-001` (aretes de zirconia verde), la fotografía **no muestra un precio**. Se dejó `price: null` para evitar inventarlo.
- Como las etiquetas muestran `$` sin código de divisa, se asumió **MXN**. Cambia `currency` y `locale` en `src/config/store.ts` si corresponde.
- Los **nombres y descripciones son propuestas comerciales** basadas en las fotos. Antes de vender, verifica medidas, tipo de plata, pureza, tallas, acabados, stock y condiciones de entrega.
- Las fotos traen **etiquetas de precio dentro de la imagen original**; se conservaron intactas. Cambia la imagen si más adelante actualizas un precio para evitar inconsistencias.
- No se debe interpretar que la aplicación gestiona ventas cobradas, pagos electrónicos, envíos o existencias en tiempo real; esta primera versión funciona como catálogo con armado de pedido.

## Arquitectura y crecimiento

```
src/
├── components/   # Secciones, tarjetas, diálogos y carrito
├── config/       # Identidad y contacto de la tienda
├── context/      # Estado global del carrito y favoritos
├── data/         # Productos y categorías tipados
├── hooks/        # Persistencia local reutilizable
├── utils/        # Formateo de importes
├── App.tsx       # Composición de la página
└── styles.css    # Sistema visual y puntos de quiebre
public/images/    # 27 fotos originales en WebP + 1 recorte para portada
```

**Siguientes fases recomendadas para escalar:**

1. Catálogo y existencias gestionados desde base de datos (Supabase, PostgreSQL o plataforma de ecommerce).
2. Panel de administración con roles para actualizar fotos, precios, stock y promociones sin tocar código.
3. Autenticación, pedidos persistentes, pagos (p. ej. Stripe/Mercado Pago) e integraciones de envío.
4. Fichas individuales con URL propia, datos estructurados SEO y optimización de conversión.
5. Analítica, consentimiento y políticas legales adecuadas al país donde vendas.

## Despliegue

- **Vercel:** importa el repositorio y deja `npm run build` como comando de compilación. La salida es `dist`.
- **Netlify:** comando `npm run build`, carpeta publicada `dist`.
- En ambos casos, define `VITE_WHATSAPP_NUMBER` y otras variables en la configuración del hosting.

Para tu seguridad, no se requieren secretos ni API keys. Cualquier variable que comience por `VITE_` será pública en el navegador, así que nunca almacenes credenciales privadas allí.
