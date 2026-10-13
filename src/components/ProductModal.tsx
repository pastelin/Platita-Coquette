import { Check, Heart, Minus, Plus, ShoppingBag, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useShop } from '../context/ShopContext';
import { categoryLabel, materialLabels, type Product } from '../data/products';
import { formatPrice } from '../utils/format';

export function ProductModal({
    product,
    onClose,
}: {
    product: Product;
    onClose: () => void;
}) {
    const { addToCart, favorites, toggleFavorite, showToast, setCartOpen } =
        useShop();
    const [quantity, setQuantity] = useState(1);
    const [imageIndex, setImageIndex] = useState(0);
    const isFavorite = favorites.includes(product.id);

    useEffect(() => {
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', closeOnEscape);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', closeOnEscape);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    function add() {
        addToCart(product.id, quantity);
        showToast(`${quantity} × ${product.name} agregado a tu selección`);
        onClose();
    }

    return (
        <div
            className="overlay"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="product-dialog-title"
                className="product-modal"
            >
                <button
                    className="modal-close"
                    type="button"
                    onClick={onClose}
                    aria-label="Cerrar detalles"
                    autoFocus
                >
                    <X size={22} />
                </button>
                <div className="product-modal__visual">
                    <div className="product-modal__main-image">
                        <img
                            src={product.images[imageIndex]}
                            alt={product.name}
                        />
                    </div>
                    {product.images.length > 1 && (
                        <div className="product-modal__thumbs">
                            {product.images.map((image, index) => (
                                <button
                                    type="button"
                                    key={image}
                                    className={
                                        index === imageIndex
                                            ? 'is-selected'
                                            : ''
                                    }
                                    onClick={() => setImageIndex(index)}
                                    aria-label={`Ver foto ${index + 1}`}
                                >
                                    <img src={image} alt="" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <div className="product-modal__info">
                    <span className="eyebrow">
                        {categoryLabel(product.category)}
                        {' / '}
                        {materialLabels[product.material ?? 'plata']}
                        {' / '}
                        {product.id}
                    </span>
                    <h2 id="product-dialog-title">{product.name}</h2>
                    <div className="product-modal__price">
                        {formatPrice(product.price)}{' '}
                        <span>{product.price !== null ? 'MXN' : ''}</span>
                    </div>
                    <div className="small-divider" />
                    <p>{product.description}</p>
                    <div className="product-modal__assurance">
                        <Check size={16} /> Compra personalizada y atención
                        directa
                    </div>
                    <div className="product-modal__quantity-label">
                        CANTIDAD
                    </div>
                    <div className="product-modal__order">
                        <div className="quantity-control">
                            <button
                                onClick={() =>
                                    setQuantity((q) => Math.max(1, q - 1))
                                }
                                type="button"
                                aria-label="Reducir cantidad"
                            >
                                <Minus size={16} />
                            </button>
                            <span>{quantity}</span>
                            <button
                                onClick={() =>
                                    setQuantity((q) => Math.min(99, q + 1))
                                }
                                type="button"
                                aria-label="Aumentar cantidad"
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                        <button
                            className="button button--dark product-modal__add"
                            type="button"
                            onClick={add}
                        >
                            Agregar a mi selección <ShoppingBag size={18} />
                        </button>
                    </div>
                    <div className="product-modal__sub-actions">
                        <button
                            type="button"
                            onClick={() => toggleFavorite(product.id)}
                        >
                            <Heart
                                size={17}
                                fill={isFavorite ? 'currentColor' : 'none'}
                            />{' '}
                            {isFavorite
                                ? 'Guardado en favoritos'
                                : 'Guardar en favoritos'}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                onClose();
                                setCartOpen(true);
                            }}
                        >
                            <ShoppingBag size={17} /> Ver mi selección
                        </button>
                    </div>
                    <p className="product-modal__note">
                        Consulta tallas, material, disponibilidad y envío antes
                        de confirmar tu compra.
                    </p>
                </div>
            </div>
        </div>
    );
}
