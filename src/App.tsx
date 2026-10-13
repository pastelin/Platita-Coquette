import { Check, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Categories } from './components/Categories';
import { Catalog } from './components/Catalog';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductModal } from './components/ProductModal';
import { useShop } from './context/ShopContext';
import type { Product, ProductCategory } from './data/products';
import { BackToTop } from './components/BackToTop';

export default function App() {
    const [category, setCategory] = useState<ProductCategory | 'todos'>(
        'todos',
    );
    const [favoritesOnly, setFavoritesOnly] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(
        null,
    );
    const { toast, clearToast } = useShop();

    useEffect(() => {
        if (!toast) return;
        const timer = window.setTimeout(clearToast, 3500);
        return () => window.clearTimeout(timer);
    }, [toast, clearToast]);

    function scrollToCatalog() {
        window.setTimeout(
            () =>
                document
                    .getElementById('coleccion')
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
            0,
        );
    }

    function selectCategory(nextCategory: ProductCategory) {
        setCategory(nextCategory);
        setFavoritesOnly(false);
        scrollToCatalog();
    }

    function showFavorites() {
        setCategory('todos');
        setFavoritesOnly(true);
        scrollToCatalog();
    }

    return (
        <>
            <a href="#coleccion" className="skip-link">
                Saltar al catálogo
            </a>
            <Header onFavoritesClick={showFavorites} />
            <main>
                <Hero />
                <Categories onSelect={selectCategory} />
                <Catalog
                    category={category}
                    onCategoryChange={setCategory}
                    favoritesOnly={favoritesOnly}
                    onFavoritesChange={setFavoritesOnly}
                    onView={setSelectedProduct}
                />
                <Footer />
            </main>
            {selectedProduct && (
                <ProductModal
                    key={selectedProduct.id}
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
            <CartDrawer />
            <BackToTop />
            {toast && (
                <div className="toast" role="status">
                    <span>
                        <Check size={16} />
                    </span>
                    <p>{toast}</p>
                    <button
                        type="button"
                        aria-label="Cerrar mensaje"
                        onClick={clearToast}
                    >
                        <X size={16} />
                    </button>
                </div>
            )}
        </>
    );
}
