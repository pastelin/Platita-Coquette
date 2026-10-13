import { ArrowUpRight, Heart, Menu, ShoppingBag, X } from 'lucide-react';
import { useState } from 'react';
import { Brand } from './Brand';
import { useShop } from '../context/ShopContext';

export function Header({ onFavoritesClick }: { onFavoritesClick: () => void }) {
  const { totalItems, favorites, setCartOpen } = useShop();
  const [menuOpen, setMenuOpen] = useState(false);

  return <>
    <div className="announcement"><span>Un detalle para cada versión de ti</span><span className="announcement__divider">✦</span><span>Descubre tu siguiente favorito</span></div>
    <header className="site-header">
      <div className="container header__inner">
        <Brand />
        <nav className="header__nav" aria-label="Navegación principal">
          <a href="#coleccion">Colección</a>
          <a href="#categorias">Categorías</a>
          <a href="#nosotros">Nuestra esencia</a>
        </nav>
        <div className="header__actions">
          <button type="button" className="icon-button header__favorites" onClick={onFavoritesClick} aria-label={`Ver favoritos (${favorites.length})`} title="Favoritos">
            <Heart size={20} strokeWidth={1.65} /><span className="visually-hidden">Favoritos</span>
          </button>
          <button type="button" className="header__bag" onClick={() => setCartOpen(true)} aria-label={`Abrir selección, ${totalItems} piezas`}>
            <ShoppingBag size={19} strokeWidth={1.65} /><span className="header__bag-name">Mi selección</span><span className="bag-count">{totalItems}</span>
          </button>
          <button type="button" className="icon-button mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}>{menuOpen ? <X size={24} /> : <Menu size={24} />}</button>
        </div>
      </div>
      {menuOpen && <nav className="mobile-nav" aria-label="Menú móvil">
        <a href="#coleccion" onClick={() => setMenuOpen(false)}>Colección <ArrowUpRight size={16} /></a>
        <a href="#categorias" onClick={() => setMenuOpen(false)}>Categorías <ArrowUpRight size={16} /></a>
        <a href="#nosotros" onClick={() => setMenuOpen(false)}>Nuestra esencia <ArrowUpRight size={16} /></a>
        <button onClick={() => { onFavoritesClick(); setMenuOpen(false); }}>Ver mis favoritos <Heart size={16} /></button>
      </nav>}
    </header>
  </>;
}
