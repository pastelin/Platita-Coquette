import { ArrowUpRight, Heart, Plus } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { categoryLabel, materialLabels, type Product } from '../data/products';
import { formatPrice } from '../utils/format';

export function ProductCard({
    product,
    onView,
}: {
    product: Product;
    onView: (product: Product) => void;
}) {
    const { addToCart, favorites, toggleFavorite, showToast } = useShop();
    const isFavorite = favorites.includes(product.id);

    function addProduct() {
        addToCart(product.id);
        showToast(`${product.name} se agregó a tu selección`);
    }

    return (
        <article className="product-card">
            <div className="product-card__photo">
                <button
                    className="product-card__image-button"
                    type="button"
                    onClick={() => onView(product)}
                    aria-label={`Ver detalles de ${product.name}`}
                >
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        loading="lazy"
                    />
                </button>
                {product.label && (
                    <span className="product-card__badge">{product.label}</span>
                )}
                <button
                    className={`product-card__heart ${isFavorite ? 'is-active' : ''}`}
                    type="button"
                    onClick={() => toggleFavorite(product.id)}
                    aria-pressed={isFavorite}
                    aria-label={`${isFavorite ? 'Quitar' : 'Agregar'} ${product.name} ${isFavorite ? 'de' : 'a'} favoritos`}
                >
                    <Heart
                        size={18}
                        strokeWidth={1.7}
                        fill={isFavorite ? 'currentColor' : 'none'}
                    />
                </button>
                <button
                    className="product-card__quick"
                    type="button"
                    onClick={() => onView(product)}
                >
                    Ver detalles <ArrowUpRight size={16} />
                </button>
            </div>
            <div className="product-card__details">
                <span className="product-card__category">
                    {categoryLabel(product.category)}
                    {' · '}
                    {materialLabels[product.material ?? 'plata']}
                </span>
                <span className="product-card__sku">Código: {product.id}</span>
                <button
                    type="button"
                    className="product-card__title-button"
                    onClick={() => onView(product)}
                >
                    <h3>{product.name}</h3>
                </button>
                <p>{product.description}</p>
                <div className="product-card__bottom">
                    <span
                        className={`product-card__price ${product.price === null ? 'product-card__price--ask' : ''}`}
                    >
                        {formatPrice(product.price)}
                    </span>
                    <button
                        type="button"
                        className="product-card__add"
                        onClick={addProduct}
                        aria-label={`Añadir ${product.name} a mi selección`}
                    >
                        <Plus size={19} strokeWidth={1.7} />
                    </button>
                </div>
            </div>
        </article>
    );
}
