/** Personaliza aquí los datos visibles de la tienda. */
export const storeConfig = {
    name: 'Platita Coquette', // Nombre de muestra: reemplázalo por tu marca.
    descriptor: 'JOYERÍA Y ACCESORIOS',
    currency: 'MXN', // Los precios en las fotos se interpretaron como pesos mexicanos.
    locale: 'es-MX',
    whatsappNumber: (import.meta.env.VITE_WHATSAPP_NUMBER || '').replace(
        /\D/g,
        '',
    ),
    instagramUrl: import.meta.env.VITE_INSTAGRAM_URL || '',
    email: import.meta.env.VITE_CONTACT_EMAIL || '',
} as const;
