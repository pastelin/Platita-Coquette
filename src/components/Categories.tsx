import { ArrowUpRight } from 'lucide-react';
import { categories, products, type ProductCategory } from '../data/products';

export function Categories({
    onSelect,
}: {
    onSelect: (category: ProductCategory) => void;
}) {
    return (
        <section
            id="categorias"
            className="categories-section"
            aria-labelledby="categories-title"
        >
            <div className="container">
                <div className="section-heading categories__heading">
                    <div>
                        <span className="eyebrow">
                            01 / EXPLORA A TU MANERA
                        </span>
                        <h2 id="categories-title">
                            Lo que te hace <em>brillar.</em>
                        </h2>
                    </div>
                    <p>
                        Tu próxima pieza favorita está aquí. Elige por dónde
                        quieres empezar.
                    </p>
                </div>
                <div className="category-grid">
                    {categories.map((category, index) => (
                        <button
                            className="category-card"
                            type="button"
                            key={category.id}
                            onClick={() => onSelect(category.id)}
                        >
                            <div className="category-card__image">
                                <img
                                    src={category.image}
                                    alt=""
                                    loading="lazy"
                                />
                                <span className="category-card__number">
                                    0{index + 1}
                                </span>
                                <span className="category-card__arrow">
                                    <ArrowUpRight size={21} />
                                </span>
                            </div>
                            <div className="category-card__details">
                                <div>
                                    <h3>{category.title}</h3>
                                    <span>{category.tagline}</span>
                                </div>
                                <span className="category-card__count">
                                    {String(
                                        products.filter(
                                            (product) =>
                                                product.category ===
                                                category.id,
                                        ).length,
                                    ).padStart(2, '0')}{' '}
                                    PIEZAS
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
