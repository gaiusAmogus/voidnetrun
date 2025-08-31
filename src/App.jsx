import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/parts/Header';
import Footer from './components/parts/Footer';
import LoadingBar from './components/parts/LoadingBar';
import HomePage from './components/pages/HomePage';
import About from './components/pages/About';
import Archive from './components/pages/Archive';
import ArchiveProject from './components/pages/ArchiveProject';

function ContentWrapper({ loadingFinished }) {
    const location = useLocation();
    const contentRef = useRef(null);

    useEffect(() => {
        function updateContentHeight() {
            const header = document.querySelector('.header');
            const footer = document.querySelector('.footer');
            if (!header || !footer || !contentRef.current) return;

            let extraSpace = 24;

            if (window.innerWidth <= 1200) {
                extraSpace = 42;
            }
            if (window.innerWidth <= 1070) {
                extraSpace = 39;
            }
            if (window.innerWidth <= 790) {
                extraSpace = 32;
            }
            if (window.innerWidth <= 576) {
                extraSpace = 51;
            }
            if (window.innerWidth <= 488) {
                extraSpace = 40;
            }

            const headerFooterSpace = header.offsetHeight + footer.offsetHeight + extraSpace;
            contentRef.current.style.maxHeight = `calc(100% - ${headerFooterSpace}px)`;
}



        updateContentHeight();
        window.addEventListener('resize', updateContentHeight);
        return () => window.removeEventListener('resize', updateContentHeight);
    }, []);

    return (
        <div className="contentContainer" ref={contentRef}>
            <div id="pageTitle">VoidnetRun()</div>
        {loadingFinished && (
            <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/archive/:projectSlug" element={<ArchiveProject />} />    
            </Routes>
        )}
        </div>
    );
    }

    export default function App() {
    const [loadingFinished, setLoadingFinished] = useState(false);
    const [loadingCompleted, setLoadingCompleted] = useState(false);

    const handleLoadingFinish = () => {
        setTimeout(() => {
        setLoadingFinished(true);
        setLoadingCompleted(true);
        }, 3000);
    };

    return (
        <BrowserRouter>
        <Header />
        <LoadingBar onFinish={handleLoadingFinish} finished={loadingCompleted} />
        <ContentWrapper loadingFinished={loadingFinished} />
        <Footer />
        </BrowserRouter>
    );
}
