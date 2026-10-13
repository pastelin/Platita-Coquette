import {
    ArrowRight,
    Check,
    Minus,
    Plus,
    ShoppingBag,
    Trash2,
    X,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { storeConfig } from '../config/store';
import { useShop } from '../context/ShopContext';
import { getProduct } from '../data/products';
import { formatPrice } from '../utils/format';

function createOrderMessage(
    lines: ReturnType<typeof getProduct>[],
    quantities: number[],
) {
    const items = lines.flatMap((product, index) => {
        if (!product) return [];

        const quantity = quantities[index] ?? 0;

        const price =
            product.price === null
                ? 'Precio por confirmar'
                : formatPrice(product.price);

        return [`• *${product.id}* × ${quantity} — ${product.name} — ${price}`];
    });

    const knownSubtotal = lines.reduce(
        (sum, product, index) =>
            sum + (product?.price ?? 0) * (quantities[index] ?? 0),
        0,
    );

    const hasUnknownPrice = lines.some((product) => product?.price === null);

    return [
        `*PEDIDO ${storeConfig.name}*`,
        '',
        '*Código × Cantidad — Producto — Precio*',
        ...items,
        '',
        `*Subtotal${hasUnknownPrice ? ' parcial' : ''} (sin envío):* ${formatPrice(knownSubtotal)}`,
        '',
        '¿Me ayudas a confirmar disponibilidad y envío?',
    ].join('\n');
}

export function CartDrawer() {
    const {
        cart,
        cartOpen,
        setCartOpen,
        updateQuantity,
        removeFromCart,
        showToast,
        totalItems,
    } = useShop();
    const [copying, setCopying] = useState(false);
    const entries = useMemo(
        () =>
            cart
                .map((line) => ({
                    ...line,
                    product: getProduct(line.productId),
                }))
                .filter((entry) => Boolean(entry.product)),
        [cart],
    );
    const subtotal = entries.reduce(
        (sum, entry) => sum + (entry.product?.price ?? 0) * entry.quantity,
        0,
    );
    const hasUnknown = entries.some((entry) => entry.product?.price === null);

    useEffect(() => {
        if (!cartOpen) return;
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setCartOpen(false);
        };
        document.addEventListener('keydown', closeOnEscape);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', closeOnEscape);
            document.body.style.overflow = '';
        };
    }, [cartOpen, setCartOpen]);

    async function checkout() {
        const text = createOrderMessage(
            entries.map((entry) => entry.product),
            entries.map((entry) => entry.quantity),
        );
        if (storeConfig.whatsappNumber) {
            window.open(
                `https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(text)}`,
                '_blank',
                'noopener,noreferrer',
            );
            return;
        }
        setCopying(true);
        try {
            await navigator.clipboard.writeText(text);
            showToast(
                'Pedido copiado. Envíalo por mensaje para confirmar tu compra.',
            );
        } catch {
            // Fallback para navegadores sin acceso al portapapeles.
            window.prompt('Copia el texto de tu pedido:', text);
        } finally {
            setCopying(false);
        }
    }

    if (!cartOpen) return null;

    return (
        <div
            className="drawer-overlay"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) setCartOpen(false);
            }}
        >
            <aside
                className="cart-drawer"
                role="dialog"
                aria-modal="true"
                aria-label="Mi selección de piezas"
            >
                <div className="cart-drawer__header">
                    <div>
                        <span className="eyebrow">TU ESPACIO PERSONAL</span>
                        <h2>
                            Mi selección <span>({totalItems})</span>
                        </h2>
                    </div>
                    <button
                        className="icon-button"
                        onClick={() => setCartOpen(false)}
                        type="button"
                        aria-label="Cerrar selección"
                        autoFocus
                    >
                        <X size={23} />
                    </button>
                </div>
                {entries.length > 0 ? (
                    <>
                        <div className="cart-drawer__items">
                            {entries.map(
                                ({ product, productId, quantity }) =>
                                    product && (
                                        <div
                                            className="cart-item"
                                            key={productId}
                                        >
                                            <img
                                                src={product.images[0]}
                                                alt={product.name}
                                            />
                                            <div className="cart-item__info">
                                                <span className="cart-item__category">
                                                    {product.category.toUpperCase()}{' '}
                                                    · {product.id}
                                                </span>

                                                <h3>{product.name}</h3>
                                                <span className="cart-item__price">
                                                    {formatPrice(product.price)}
                                                </span>
                                                <div className="cart-item__controls">
                                                    <div className="quantity-control quantity-control--small">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    productId,
                                                                    quantity -
                                                                        1,
                                                                )
                                                            }
                                                            aria-label={`Quitar una unidad de ${product.name}`}
                                                        >
                                                            <Minus size={13} />
                                                        </button>
                                                        <span>{quantity}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    productId,
                                                                    Math.min(
                                                                        99,
                                                                        quantity +
                                                                            1,
                                                                    ),
                                                                )
                                                            }
                                                            aria-label={`Agregar una unidad de ${product.name}`}
                                                        >
                                                            <Plus size={13} />
                                                        </button>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="cart-item__remove"
                                                        onClick={() =>
                                                            removeFromCart(
                                                                productId,
                                                            )
                                                        }
                                                        aria-label={`Quitar ${product.name} de mi selección`}
                                                    >
                                                        <Trash2 size={17} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ),
                            )}
                        </div>
                        <div className="cart-drawer__footer">
                            <div className="cart-drawer__subtotal">
                                <span>
                                    {hasUnknown
                                        ? 'Subtotal conocido'
                                        : 'Subtotal'}
                                </span>
                                <strong>{formatPrice(subtotal)}</strong>
                            </div>
                            <p className="cart-drawer__disclaimer">
                                {hasUnknown
                                    ? 'Hay piezas con precio por confirmar. '
                                    : ''}
                                Envío, existencia y detalles se confirman antes
                                de comprar.
                            </p>
                            <button
                                type="button"
                                disabled={copying}
                                onClick={checkout}
                                className="button button--dark cart-drawer__checkout"
                            >
                                {storeConfig.whatsappNumber
                                    ? 'Continuar por WhatsApp'
                                    : 'Copiar mi pedido'}{' '}
                                <ArrowRight size={19} />
                            </button>
                            <span className="cart-drawer__hint">
                                <Check size={14} /> Sin pago en línea · Atención
                                personalizada
                            </span>
                        </div>
                    </>
                ) : (
                    <div className="cart-drawer__empty">
                        <div>
                            <ShoppingBag size={36} strokeWidth={1.3} />
                        </div>
                        <h3>Tu selección está esperando</h3>
                        <p>
                            Encuentra las piezas que te encantan y agrégalas
                            aquí.
                        </p>
                        <button
                            className="button button--dark"
                            type="button"
                            onClick={() => {
                                setCartOpen(false);
                                document
                                    .getElementById('coleccion')
                                    ?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            Explorar colección <ArrowRight size={17} />
                        </button>
                    </div>
                )}
            </aside>
        </div>
    );
}
