import 'overlayscrollbars/overlayscrollbars.css';
import { OverlayScrollbars } from 'overlayscrollbars';

export function customScrollbar(el) {
    let elements = [];

    if (typeof el === 'string') {
        elements = document.querySelectorAll(el);
    } else if (el instanceof HTMLElement) {
        elements = [el];
    } else if (el instanceof NodeList || Array.isArray(el)) {
        elements = el;
    }

    const instances = [];
    elements.forEach(element => {
        const osInstance = OverlayScrollbars(element, {
            className: "os-theme-dark",
            resize: "none",
            sizeAutoCapable: true,
            paddingAbsolute: true,
            scrollbars: { clickScrolling: true }
        });
        instances.push(osInstance);
    });

    return () => {
        instances.forEach(inst => inst.destroy());
    };
}

export function scrollTop() {
    const container = document.querySelector('.contentContainer');
    if (container) container.scroll({ y: "0%" }, 'smooth');
}
