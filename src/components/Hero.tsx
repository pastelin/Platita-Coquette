import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { SparkleMark } from './Brand';

export function Hero() {
    return (
        <section className="hero" id="inicio" aria-labelledby="hero-title">
            <div className="container hero__layout">
                <div className="hero__content">
                    <div className="eyebrow hero__eyebrow">
                        <span className="eyebrow__line" /> JOYAS PARA TODOS TUS
                        DÍAS
                    </div>
                    <h1 id="hero-title">
                        La belleza de <em>ser tú.</em>
                    </h1>
                    <p className="hero__description">
                        Pequeños detalles, grandes historias. Descubre piezas
                        que iluminan lo cotidiano y hacen que cada momento se
                        sienta especial.
                    </p>
                    <div className="hero__actions">
                        <a className="button button--dark" href="#coleccion">
                            Explorar colección <ArrowUpRight size={18} />
                        </a>
                        <a className="hero__text-link" href="#categorias">
                            Descubre las categorías <ArrowDownRight size={18} />
                        </a>
                    </div>
                    <div className="hero__bottom-note">
                        <SparkleMark small />
                        <span>Tu estilo. Tus reglas. Tu brillo.</span>
                    </div>
                </div>
            </div>
            <div className="container hero__footer">
                <span>DISEÑOS PARA CONECTAR CONTIGO</span>
                <span>✦</span>
                <span>ELIGE TU PRÓXIMO FAVORITO</span>
                <span>✦</span>
                <span>PEQUEÑOS LUJOS COTIDIANOS</span>
            </div>
        </section>
    );
}
