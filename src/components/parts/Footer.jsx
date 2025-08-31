import { getSvg } from '../../functions/svgLoader';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__row">
                <div className="footer__row__el footer__row__el--1">
                    <div className="footer__row__el__content">
                        <p><span>SYSTEM CREATED BY DAWID JEDYNAK</span></p>
                        <p><span>AS A PORTFOLIO</span></p>
                    </div>
                </div>
                <div className="footer__row__el footer__row__el--2">
                    <p>
                        <span>If you want to offer me cooperation write to </span>
                        <a href="mailto:contact@voidnetrun.it" className="link link--red">
                            contact@voidnetrun.it
                        </a>
                    </p>
                    <a href="https://www.linkedin.com/in/dawid-jedynak-4b9991322/" target="_blank" rel="noreferrer">
                        {getSvg('linkedin')}
                    </a>
                    <a href="https://github.com/gaiusAmogus" target="_blank" rel="noreferrer">
                        {getSvg('github')}
                    </a>
                </div>
            </div>
        </footer>
    );
}
