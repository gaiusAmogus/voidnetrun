// src/components/pages/HomePage.jsx
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSvg } from '../../functions/svgLoader';
import useAcronym from '../../functions/acronym';
import { TextScramble, textType } from '../../functions/textScramble';
import { useAnimFrom } from '../../functions/animTransform';
import { customScrollbar } from '../../functions/customScrollbar';


export default function HomePage() {
    const navigate = useNavigate();
    const glitchModuleRef = useRef(null);
    const titleRef = useRef(null);
    const module0Ref = useRef(null);
    const module1Ref = useRef(null);
    const module2Ref = useRef(null);
    const sectionRef = useRef(null); 
    const contentRef = useRef(null);
    const acr = useAcronym(10);

    // Acronym hook
    useAcronym(18); // <-- move hook call to top level

    // Start fade animation
    useAnimFrom(contentRef, 'down');

    useEffect(() => {
        if (!sectionRef.current) return;
        customScrollbar(sectionRef.current);

        //Scramble text
        if (titleRef.current) {
            const fx = new TextScramble(titleRef.current);
            fx.setText(titleRef.current.getAttribute('data-text'));
        }

        // Glitch module
        if (window.glitch_exec && glitchModuleRef.current) {
            const gl1 = Object.create(window.glitch_exec);
            gl1.start(glitchModuleRef.current);
        }

    }, []);

    const handleModule0Click = () => {
        navigate('/archive');
    };

    const handleModule1Click = () => {
        navigate('/about');
    };

    return (
        <section className="dataModules" ref={sectionRef}>
            <div className="sectionWrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="breadcrumbs d-flex align-items-center flex-wrap">
                                <div className="breadcrumbs__el breadcrumbs__el--separator">V://</div>
                                <div className="breadcrumbs__el breadcrumbs__el--currentEl">PORTFOLIO_CORE</div>
                            </div>
                        </div>
                    </div>
                    <div className="row" ref={contentRef}>
                        <div className="col-12">
                            <p
                                ref={titleRef}
                                className="title title--1 textShadow--white"
                                data-text="[BOOT_SEQUENCE: COMPLETE]"
                            >
                                {textType('[BOOT_SEQUENCE: COMPLETE]')}
                            </p>
                        </div>
                        <div className="col-12 col-lg-5 col-xxl-4">
                            <div className="dataModules__content d-flex flex-column">
                                <h2 className="title title--3">System Online. Entering Portfolio Mainframe...</h2>
                                <p className="text text--2">
                                    You're connecting to the interface of my world - code, design, and technology. <br /><br />
                                    Here, neon lines guide you through projects where creativity meets functionality.<br /><br />
                                    Get ready for a journey through a futuristic maze of frontend, where every pixel has its purpose and every effect carries a hidden intent.<br /><br />
                                    <b>Data loaded. System ready. Dive in.</b>
                                </p>
                            </div>

                        </div>
                        <div className="col-12 col-lg-7 offset-xxl-1">
                            <div className="modules d-flex flex-column">
                                <h2 className="modules__title">[AVAILABLE MODULES]</h2>

                                <div ref={module0Ref} className="dataModule dataModule--0" onClick={handleModule0Click} >
                                    <div className="dataModule__inner d-flex  corners corners--hover">
                                        <div className="dataModule__inner__bg">
                                            <div className="dataModule__inner__bg__cut"></div>
                                        </div>
                                        <div className="dataModule__inner__leftbar d-flex align-items-center justify-content-center"></div>
                                        <div className="dataModule__inner__content d-flex align-items-center justify-content-between position-relative">
                                            <div className="d-flex flex-column">
                                                <h3 className="title title--3">ACCESS: PROJECT_MAINFRAME</h3>
                                                <p>
                                                    &gt; LOADING MODULES...  <br />
                                                    &gt; RETRIEVING PROJECT_DATA...  <br />
                                                    &gt; ACCESS GRANTED: ARCHIVE ONLINE
                                                </p>
                                            </div>
                                            {getSvg('modulesIcon_1')}
                                        </div>
                                    </div>
                                </div>

                                <div ref={module1Ref} className="dataModule dataModule--1" onClick={handleModule1Click} >
                                    <div className="dataModule__inner d-flex  corners corners--hover">
                                        <div className="dataModule__inner__bg">
                                            <div className="dataModule__inner__bg__cut"></div>
                                        </div>
                                        <div className="dataModule__inner__leftbar d-flex align-items-center justify-content-center"></div>
                                        <div className="dataModule__inner__content d-flex align-items-center justify-content-between position-relative">
                                            <div className="d-flex flex-column">
                                                <h3 className="title title--3">ACCESS: USER_PROFILE</h3>
                                                <p>
                                                    &gt; DECRYPTING IDENTITY...  <br />
                                                    &gt; USER_SEQUENCE UNLOCKED...  <br />
                                                    &gt; PROFILE DATA READY
                                                </p>
                                            </div>
                                            {getSvg('modulesIcon_2')}
                                        </div>
                                    </div>
                                </div>

                                <div ref={module2Ref} className="dataModule dataModule--2" id="glitchModule" >
                                    <div className="dataModule__inner d-flex  corners" ref={glitchModuleRef}>
                                        <div className="dataModule__inner__bg">
                                            <div className="dataModule__inner__bg__cut"></div>
                                        </div>
                                        <div className="dataModule__inner__leftbar d-flex align-items-center justify-content-center"></div>
                                        <div className="dataModule__inner__content d-flex align-items-center justify-content-between position-relative">
                                            <div className="d-flex flex-column">
                                                <h3 className="title title--3 color--red">
                                                    ERROR: [CODE: 0x3F7A]
                                                </h3>
                                                <p>
                                                    &gt; INIT_SEQ FAILED  <br />
                                                    &gt; MEMORY DUMP: 0x0000FF12  <br />
                                                    &gt; PACKET LOSS DETECTED  <br />
                                                    &gt; CONNECTION TERMINATED<br />
                                                </p>
                                            </div>
                                            {getSvg('modulesIcon_3')}
                                        </div>
                                        <div id="dataModule__acr" className="acr">{acr}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
