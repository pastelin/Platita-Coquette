import { ArrowDownRight, ArrowUpRight, MoveUpRight } from 'lucide-react';
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
                <div className="hero__visual">
                    <div className="hero__backline" aria-hidden="true" />
                    <div className="hero__photo">
                        <img
                            src="/images/hero-infinito.webp"
                            alt="Anillo de diseño infinito con detalle azul"
                            fetchPriority="high"
                        />
                        <div className="hero__photo-label">
                            <span>01 — 04</span>
                            <span>
                                UNA COLECCIÓN QUE BRILLA{' '}
                                <MoveUpRight size={13} />
                            </span>
                        </div>
                    </div>
                    <div className="hero__mini-photo">
                        <img
                            src="/images/photo-12.webp"
                            alt="Aretes de zirconia en tono verde"
                            loading="lazy"
                        />
                    </div>
                    <div className="hero__round-stamp" aria-hidden="true">
                        <span>DETALLES QUE INSPIRAN</span>
                        <SparkleMark small />
                    </div>
                    <div className="hero__tiny-index" aria-hidden="true">
                        SELECCIÓN / 001
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
