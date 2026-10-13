import { ArrowDown, Heart, Search, SlidersHorizontal, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
    categories,
    products,
    materialLabels,
    type Product,
    type ProductCategory,
    type ProductMaterial,
} from '../data/products';
import { ProductCard } from './ProductCard';

type CategoryFilter = ProductCategory | 'todos';
type Sort = 'destacados' | 'menor' | 'mayor' | 'nombre';

export function Catalog({
    category,
    onCategoryChange,
    favoritesOnly,
    onFavoritesChange,
    onView,
}: {
    category: CategoryFilter;
    onCategoryChange: (category: CategoryFilter) => void;
    favoritesOnly: boolean;
    onFavoritesChange: (enabled: boolean) => void;
    onView: (product: Product) => void;
}) {
    const { favorites } = useShop();
    const [query, setQuery] = useState('');
    const [sort, setSort] = useState<Sort>('destacados');
    const [filtersOpen, setFiltersOpen] = useState(false);

    const [material, setMaterial] = useState<ProductMaterial | 'todos'>(
        'todos',
    );

    const availableMaterials = (
        Object.keys(materialLabels) as ProductMaterial[]
    ).filter((value) =>
        products.some((product) => (product.material ?? 'plata') === value),
    );

    const visible = useMemo(() => {
        const normalized = query.toLocaleLowerCase('es').trim();
        return products
            .filter(
                (product) =>
                    category === 'todos' || product.category === category,
            )
            .filter(
                (product) =>
                    material === 'todos' ||
                    (product.material ?? 'plata') === material,
            )
            .filter(
                (product) => !favoritesOnly || favorites.includes(product.id),
            )
            .filter((product) => {
                if (!normalized) return true;

                const content = [
                    product.id,
                    product.name,
                    product.description,
                    product.category,
                    materialLabels[product.material ?? 'plata'],
                ]
                    .join(' ')
                    .toLocaleLowerCase('es');

                return content.includes(normalized);
            })
            .sort((a, b) => {
                if (sort === 'menor')
                    return (a.price ?? Infinity) - (b.price ?? Infinity);
                if (sort === 'mayor')
                    return (b.price ?? -Infinity) - (a.price ?? -Infinity);
                if (sort === 'nombre')
                    return a.name.localeCompare(b.name, 'es');
                return (
                    Number(Boolean(b.featured)) - Number(Boolean(a.featured))
                );
            });
    }, [category, material, favoritesOnly, favorites, query, sort]);

    function reset() {
        onCategoryChange('todos');
        onFavoritesChange(false);
        setQuery('');
        setSort('destacados');
        setMaterial('todos');
    }

    return (
        <section
            className="catalog-section"
            id="coleccion"
            aria-labelledby="catalog-title"
        >
            <div className="container">
                <div className="section-heading catalog__heading">
                    <div>
                        <span className="eyebrow">02 / LA COLECCIÓN</span>
                        <h2 id="catalog-title">
                            Encuentra tu <em>favorito.</em>
                        </h2>
                    </div>
                    <p>
                        Piezas que hablan de ti. Encuentra el detalle perfecto
                        para cualquier ocasión.
                    </p>
                </div>
                <div className="catalog__toolbar">
                    <div
                        className="category-tabs"
                        role="group"
                        aria-label="Filtrar por categoría"
                    >
                        <button
                            type="button"
                            className={`tab ${category === 'todos' && !favoritesOnly ? 'is-selected' : ''}`}
                            onClick={() => {
                                onCategoryChange('todos');
                                onFavoritesChange(false);
                            }}
                        >
                            Ver todo <span>{products.length}</span>
                        </button>
                        {categories.map((item) => (
                            <button
                                type="button"
                                key={item.id}
                                className={`tab ${category === item.id && !favoritesOnly ? 'is-selected' : ''}`}
                                onClick={() => {
                                    onCategoryChange(item.id);
                                    onFavoritesChange(false);
                                }}
                            >
                                {item.title}
                            </button>
                        ))}
                        <button
                            type="button"
                            className={`tab tab--favorites ${favoritesOnly ? 'is-selected' : ''}`}
                            onClick={() => {
                                onFavoritesChange(!favoritesOnly);
                                if (!favoritesOnly) onCategoryChange('todos');
                            }}
                        >
                            <Heart
                                size={15}
                                fill={favoritesOnly ? 'currentColor' : 'none'}
                            />{' '}
                            Favoritos
                            {favorites.length > 0
                                ? ` (${favorites.length})`
                                : ''}
                        </button>
                    </div>
                    <div className="catalog__tools">
                        <label className="search-field">
                            <Search size={18} aria-hidden="true" />
                            <span className="visually-hidden">
                                Buscar productos
                            </span>
                            <input
                                placeholder="Buscar por nombre o código..."
                                value={query}
                                onChange={(event) =>
                                    setQuery(event.target.value)
                                }
                            />
                            {query && (
                                <button
                                    type="button"
                                    onClick={() => setQuery('')}
                                    aria-label="Limpiar búsqueda"
                                >
                                    <X size={15} />
                                </button>
                            )}
                        </label>
                        <button
                            className="filter-toggle"
                            type="button"
                            onClick={() => setFiltersOpen(!filtersOpen)}
                            aria-expanded={filtersOpen}
                            aria-label="Ordenar resultados"
                        >
                            <SlidersHorizontal size={18} />
                        </button>
                        <label
                            className={`sort-select ${filtersOpen ? 'is-open' : ''}`}
                        >
                            <span className="visually-hidden">
                                Ordenar resultados
                            </span>
                            <select
                                value={sort}
                                onChange={(event) =>
                                    setSort(event.target.value as Sort)
                                }
                            >
                                <option value="destacados">Destacados</option>
                                <option value="menor">Menor precio</option>
                                <option value="mayor">Mayor precio</option>
                                <option value="nombre">Nombre A–Z</option>
                            </select>
                            <ArrowDown size={14} aria-hidden="true" />
                        </label>
                    </div>
                </div>
                <div
                    className="catalog__material-filters"
                    role="group"
                    aria-label="Filtrar productos por material"
                >
                    <span className="material-filters__label">MATERIAL</span>

                    <button
                        type="button"
                        className={material === 'todos' ? 'active' : ''}
                        aria-pressed={material === 'todos'}
                        onClick={() => setMaterial('todos')}
                    >
                        Todos
                    </button>

                    {availableMaterials.map((value) => (
                        <button
                            key={value}
                            type="button"
                            className={material === value ? 'active' : ''}
                            aria-pressed={material === value}
                            onClick={() => setMaterial(value)}
                        >
                            {materialLabels[value]}
                        </button>
                    ))}
                </div>
                <div className="catalog__result-line">
                    <span>
                        {visible.length}{' '}
                        {visible.length === 1
                            ? 'pieza encontrada'
                            : 'piezas encontradas'}{' '}
                        {favoritesOnly && ' · Favoritos'}
                    </span>
                    <span>PRECIOS EN MXN</span>
                </div>
                {visible.length > 0 ? (
                    <div className="product-grid">
                        {visible.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onView={onView}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="empty-results">
                        <span className="empty-results__symbol">✳</span>
                        <h3>No encontramos esa pieza</h3>
                        <p>
                            Prueba otra búsqueda o explora todas las categorías.
                        </p>
                        <button
                            className="button button--dark"
                            type="button"
                            onClick={reset}
                        >
                            Ver toda la colección <ArrowDown size={18} />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
