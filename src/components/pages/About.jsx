import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSvg } from '../../functions/svgLoader';
import { customScrollbar } from '../../functions/customScrollbar';
import { TextScramble, textType } from '../../functions/textScramble';
import { useAnimFrom } from '../../functions/animTransform';

export default function About() {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const navigate = useNavigate();

    const skills = [
        { title: 'Javascript', lvl: 3 },
        { title: 'HTML/CSS/SASS', lvl: 5 },
        { title: 'React', lvl: 1 },
        { title: 'UI', lvl: 1 },
        { title: 'PHP', lvl: 3 },
        { title: 'WooCommerce', lvl: 3 },
        { title: 'WordPress', lvl: 3 }
    ];

    const descriptions = [
        { label: 'Object:', value: 'Dawid Jedynak' },
        { label: 'Age:', value: 'no data' },
        { label: 'Location:', value: 'Somewhere in Poland' },
        { label: 'Experience:', value: '5 years' },
    ];

    // Start fade animation
    useAnimFrom(contentRef, 'down');

    useEffect(() => {
        const aboutEl = sectionRef.current;
        if (!aboutEl) return;

        customScrollbar(sectionRef.current);

        // Scramble text
        const descEls = aboutEl.querySelectorAll('.aboutData__desc__list__el__val');
        descEls.forEach((el, i) => {
        setTimeout(() => {
            const fx = new TextScramble(el);
            fx.setText(el.getAttribute('data-text'));
        }, i * 300);
        });

        // Brain / glitch animation
        const analyse = aboutEl.querySelector('.aboutData__brain__analyse');
        const brain = aboutEl.querySelector('.aboutData__brain');
        if (analyse && brain) {
        
            if (window.innerWidth >= 992) {
                setTimeout(() => {
                    if (window.glitch_exec) {
                        const gl = Object.create(window.glitch_exec);
                        gl.GLITCH_RENDER_COUNT = 2;
                        gl.start(aboutEl); 
                    }
                }, 1500);
            }

            setTimeout(() => {
                analyse.children[0].textContent = 'SUCCESS';
                analyse.classList.add('aboutData__brain__analyse--anim');
            }, 4000);
            setTimeout(() => {
                analyse.remove();
                brain.classList.add('aboutData__brain--active');
            }, 5000);
        }
    }, []);

    const handleBackHomepage = () => {
        navigate('/');
    };


    const pointerNames = [
    'pointer_1','pointer_2','pointer_3','pointer_4','pointer_5','pointer_6','pointer_7'
    ];

    const renderSkill = (skill, index) => {
    const levels = { 1:'JUNIOR',2:'JUNIOR/MID',3:'MID',4:'MID/SENIOR',5:'SENIOR' };
    return (
        <div key={index} className={`aboutData__brain__skillBar aboutData__brain__skillBar--${index}`}>
        <div className="aboutData__brain__skillBar__inner">
            <div className="aboutData__brain__skillBar__inner__title">{skill.title}</div>
            <div className="aboutData__brain__skillBar__inner__lvl">LEVEL: {levels[skill.lvl]}</div>
        </div>
        <div className="aboutData__brain__skillBar__pointer">
            {getSvg(pointerNames[index])}
        </div>
        </div>
    );
    };


  return (
    <section className="aboutData" ref={sectionRef}>
        <div className="sectionWrapper">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="breadcrumbs d-flex align-items-center flex-wrap">
                            <div className="breadcrumbs__el breadcrumbs__el--separator">V://</div>
                            <div className="breadcrumbs__el breadcrumbs__el--home" onClick={handleBackHomepage}>PORTFOLIO_CORE</div>
                            <div className="breadcrumbs__el breadcrumbs__el--separator">/</div>
                            <div className="breadcrumbs__el breadcrumbs__el--currentEl">USER_PROFILE</div>
                        </div>
                    </div>
                </div>
                <div className="row" ref={contentRef}>
                    <div className="col-12 col-lg-4">
                    <div className="aboutData__prof">
                        <img src={`${window.location.origin}/assets/img/prof.jpg`} alt="profilPicture" />
                    </div>
                    </div>
                    <div className="col-12 col-lg-5">
                    <div className="aboutData__desc">
                        <div className="aboutData__desc__list">
                        {descriptions.map((desc, i) => (
                            <div key={i} className={`text text--1 aboutData__desc__list__el aboutData__desc__list__el--${i}`}>
                            {desc.label} <p className="aboutData__desc__list__el__val" data-text={desc.value}>{textType(desc.value)}</p>
                            </div>
                        ))}
                        </div>
                        <div className="aboutData__desc__desc">
                        <p className="text text--2">
                            Frontend Developer with many years of experience, specializing in creating WordPress 
                            templates and WooCommerce stores. Quickly learns new technologies, works efficiently 
                            in a team, and has experience leading a group. Outside of work, he develops his passions: 
                            music production, fencing, video game development, and horseback riding.
                        </p>
                        </div>
                    </div>
                    </div>
                    <div className="col-12 col-lg-3 d-none d-lg-block">
                    <div className="aboutData__human">
                        <div className="aboutData__human__inner">{getSvg('human')}</div>
                    </div>
                    </div>
                    <div className="col-12 aboutData__brainCol">
                    <div className="aboutData__brain">
                        <div className="aboutData__brain__analyse corners">
                        <p>ANALYSIS IN PROGRESS...</p>
                        </div>
                        <div className="aboutData__brain__inner">{getSvg('brain')}</div>
                        {skills.map(renderSkill)}
                    </div>
                    </div>
                    <div className="col-12">
                        <div className="aboutData__cv">
                            <div className="aboutData__cv__part">
                            <h3 className="aboutData__cv__part__title">[Work Experience]</h3>
                                <div className="aboutData__cv__part__content">
                                    <div className="aboutData__cv__part__content__el">
                                        <p className="text text--1">
                                            [10.2024 - present]<br />
                                            <b>Frontend Developer at Acclaim</b>
                                        </p>
                                        <p className="text text--3">
                                            Creating, optimizing, debugging, and managing websites based on WordPress and WooCommerce, 
                                            resolving SEO issues, providing customer support, and maintaining existing solutions
                                        </p>
                                        </div>
                                        <div className="aboutData__cv__part__content__el">
                                        <p className="text text--1">
                                            [08.2022 - 08.2024]<br />
                                            <b>Frontend Developer at DotLineCode</b>
                                        </p>
                                        <p className="text text--3">
                                            Coding templates and creating plugins for WordPress and stores based on WooCommerce.
                                            Using ACF, REST API, design and implementation systems dedicated to the client. 
                                            Creating animations using three.js and GSAP, servicing, operation and optimization of websites.
                                        </p>
                                        </div>
                                        <div className="aboutData__cv__part__content__el">
                                        <p className="text text--1">
                                            [02.2021 - 07.2022]<br />
                                            <b>Frontend Developer at Funktional</b>
                                        </p>
                                        <p className="text text--3">
                                            Coding templates for WordPress using ACF.
                                            Creation of stores based on WooCommerce. 
                                            Website servicing, operation and optimization.
                                        </p>
                                        </div>
                                        <div className="aboutData__cv__part__content__el">
                                        <p className="text text--1">
                                            [09.2020 - 01.2021]<br />
                                            <b>Junior Frontend Developer at Millenium Studio</b>
                                        </p>
                                        <p className="text text--3">
                                            Modification of existing WordPress templates for the client using ACF.
                                            Simple stores based on WooCommerce and PrestaShop.
                                            Servicing, operation and website optimization.
                                        </p>
                                        </div>
                                        <div className="aboutData__cv__part__content__el">
                                        <p className="text text--1">
                                            [09.2019 – 07.2020]<br />
                                            <b>Junior Frontend Developer at CODESTICK</b>
                                        </p>
                                        <p className="text text--3">
                                            Coding simple landing pages.
                                            Simple online stores based on WooCommerce.
                                            Website maintenance.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="aboutData__cv__part">
                                <h3 className="aboutData__cv__part__title">[Education]</h3>
                                    <div className="aboutData__cv__part__content">
                                        <div className="aboutData__cv__part__content__el">
                                        <p className="text text--1"><b>Computer Science Engineer</b><br /></p>
                                        <p className="text text--3">College of Business - National Louis University located in Nowy Sącz [02/2023 – Present]</p>
                                    </div>
                                </div>
                            </div>

                            <div className="aboutData__cv__part">
                                <h3 className="aboutData__cv__part__title">[Skills]</h3>
                                <div className="aboutData__cv__part__content">
                                    <ul className="aboutData__cv__part__content__el">
                                        <li className="text text--1">HTML5 / CSS3 / SASS</li>
                                        <li className="text text--1">RWD / Mobile-first</li>
                                        <li className="text text--1">JavaScript / jQuery</li>
                                        <li className="text text--1">React</li>
                                        <li className="text text--1">WordPress <br /> <span className="text text--3">Theme development and customization, ACF, optimization</span></li>
                                        <li className="text text--1">WooCommerce <br /> <span className="text text--3">Store setup, API integrations, function customization</span></li>
                                        <li className="text text--1">PHP</li>
                                        <li className="text text--1">REST API / external integrations</li>
                                        <li className="text text--1">UX/UI <br /> <span className="text text--3">Working with Figma, Adobe XD</span></li>
                                        <li className="text text--1">Performance optimization</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="aboutData__cv__part">
                                <h3 className="aboutData__cv__part__title">[Soft Skills]</h3>
                                <div className="aboutData__cv__part__content">
                                    <ul className="aboutData__cv__part__content__el">
                                        <li className="text text--1">Teamwork</li>
                                        <li className="text text--1">Ability to work under pressure</li>
                                        <li className="text text--1">Communication skills</li>
                                        <li className="text text--1">Adaptability</li>
                                        <li className="text text--1">Problem-solving</li>
                                        <li className="text text--1">Creativity</li>
                                        <li className="text text--1">Analytical thinking</li>
                                        <li className="text text--1">Stress resistance</li>
                                        <li className="text text--1">Openness to feedback</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="aboutData__cv__part">
                                <h3 className="aboutData__cv__part__title">[Languages]</h3>
                                <div className="aboutData__cv__part__content">
                                    <ul className="aboutData__cv__part__content__el">
                                        <li className="text text--1">Polish (native)</li>
                                        <li className="text text--1">English (B2)</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="aboutData__cv__part">
                                <h3 className="aboutData__cv__part__title">[Other Skills]</h3>
                                <div className="aboutData__cv__part__content">
                                    <ul className="aboutData__cv__part__content__el">
                                        <li className="text text--1">Reserve Corporal, Polish Army</li>
                                        <li className="text text--1">Basic knowledge of graphic programs and UI design <br /> <span className="text text--3">(Photoshop, Figma)</span></li>
                                        <li className="text text--1">Basic video editing <br /> <span className="text text--3">(DaVinci Resolve)</span></li>
                                        <li className="text text--1">Unreal Engine 5</li>
                                        <li className="text text--1">Driver’s license <span>cat. A2, B</span></li>

                                    </ul>
                                </div>
                            </div>

                            <div className="aboutData__cv__part">
                                <h3 className="aboutData__cv__part__title">[Courses and qualifications]</h3>
                                <div className="aboutData__cv__part__content">
                                    <ul className="aboutData__cv__part__content__el">
                                        <li className="text text--1">98-364:MTA Database Fundamentals</li>
                                        <li className="text text--1">98-367:MTA Security Fundamentals</li>
                                        <li className="text text--1">98-361:MTA Software Development Fundamentals</li>
                                        <li className="text text--1">98-383:MTA Introduction to Programming using HTML and CSS</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="aboutData__cv__part">
                                <h3 className="aboutData__cv__part__title">[Interests]</h3>
                                <div className="aboutData__cv__part__content">
                                    <ul className="aboutData__cv__part__content__el">
                                        <li className="text text--1">HEMA (Historical European Martial Arts)</li>
                                        <li className="text text--1">Horse Riding</li>
                                        <li className="text text--1">Music production</li>
                                        <li className="text text--1">Video games</li>
                                        <li className="text text--1">History</li>
                                    </ul>
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
