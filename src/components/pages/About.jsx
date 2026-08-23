import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSvg } from '../../functions/svgLoader';
import { customScrollbar } from '../../functions/customScrollbar';
import { TextScramble, textType } from '../../functions/textScramble';
import { useAnimFrom } from '../../functions/animTransform';
import useAcronym from '../../functions/acronym';

function SkillLevelAcronym() {
    const levelAcronym = useAcronym(4);
    return levelAcronym;
}

export default function About() {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const navigate = useNavigate();

    const skills = [
        { title: 'JavaScript/React ' },
        { title: 'HTML5/CSS3/SASS' },
        { title: 'GSAP/Three.js' },
        { title: 'UI/Figma' },
        { title: 'PHP/Rest API' },
        { title: 'WooCommerce' },
        { title: 'WordPress' }
    ];

    const startYear = 2019;
    const currentYear = new Date().getFullYear();
    const experience = `${currentYear - startYear} years`;

    const descriptions = [
        { label: 'Object:', value: 'Dawid Jedynak' },
        { label: 'Location:', value: 'Poland' },
        { label: 'Experience:', value: experience },
    ];


    // Start fade animation
    useAnimFrom(contentRef, 'down');

    useEffect(() => {
        const aboutEl = sectionRef.current;
        if (!aboutEl) return;

        customScrollbar(sectionRef.current);

        // Scramble text
        const descEls = aboutEl.querySelectorAll('.aboutData__desc-list-el-val');
        descEls.forEach((el, i) => {
        setTimeout(() => {
            const fx = new TextScramble(el);
            fx.setText(el.getAttribute('data-text'));
        }, i * 300);
        });

        // Brain / glitch animation
        const analyse = aboutEl.querySelector('.aboutData__brain-analyse');
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
                analyse.classList.add('aboutData__brain-analyse--anim');
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
    return (
        <div key={index} className={`aboutData__brain-skillBar aboutData__brain-skillBar--${index}`}>
        <div className="aboutData__brain-skillBar-inner">
            <div className="aboutData__brain-skillBar-inner-title">{skill.title}</div>
            <div className="aboutData__brain-skillBar-inner-lvl"><SkillLevelAcronym /></div>
        </div>
        <div className="aboutData__brain-skillBar-pointer">
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
                            <div className="breadcrumbs__el breadcrumbs__el--go-back d-flex" onClick={handleBackHomepage}>
                                {getSvg('arrow_left')} 
                            </div>
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
                            <img src={`${process.env.PUBLIC_URL || ''}/assets/img/prof.jpg`} alt="profilPicture" />
                        </div>
                    </div>

                    <div className="col-12 col-lg-8">
                        <div className="aboutData__desc">
                            <div className="aboutData__desc-list">
                            {descriptions.map((desc, i) => (
                                <div key={i} className={`text text--1 aboutData__desc-list-el aboutData__desc-list-el--${i}`}>
                                {desc.label} <p className="aboutData__desc-list-el-val" data-text={desc.value}>{textType(desc.value)}</p>
                                </div>
                            ))}
                            </div>
                            <div className="aboutData__desc-desc">
                                <p className="text text--2">
                                    Computer Science graduate with a Bachelor of Engineering degree and several years of
                                    commercial experience in web development, including building, integrating, debugging,
                                    and maintaining web applications in production environments. My experience covers both
                                    frontend and backend development, PHP, JavaScript, REST APIs, WordPress,
                                    WooCommerce, and troubleshooting technical issues in existing systems.
                                    <br /><br />


                                    I am currently transitioning my career toward Application Security, Web Application
                                    Security, and Penetration Testing. I am developing practical security testing skills
                                    through PortSwigger Web Security Academy and Burp Suite. I am looking for my first role
                                    in AppSec, Security Engineering, or penetration testing at an internship or junior level,
                                    using my development background as a foundation for web application security analysis.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 aboutData__brain-col">
                        <div className="aboutData__brain">
                            <div className="aboutData__brain-analyse corners">
                                <p>ANALYSIS IN PROGRESS...</p>
                            </div>
                            <div className="aboutData__brain-inner">{getSvg('brain')}</div>
                            {skills.map(renderSkill)}
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="aboutData__cv">
                            <div className="aboutData__cv-part">
                                <h3 className="aboutData__cv-part-title">&lt;Application Security – Learning &amp; Hands-on Practice&gt;</h3>
                                <div className="aboutData__cv-part-content">
                                    <div className="aboutData__cv-part-content-el">
                                        <p className="text text--1">
                                            <b>PortSwigger Web Security Academy</b>
                                        </p>
                                        <ul className="text text--3">
                                            <li>Hands-on web application security labs in controlled environments.</li>
                                            <li>Using Burp Suite to intercept, analyze, and manually modify HTTP traffic and test application behavior.</li>
                                            <li>Current hands-on practice includes SQL Injection, Authentication, and Access Control / IDOR, with the scope being continuously expanded.</li>
                                            <li>Creating my own write-ups documenting the testing process, vulnerability exploitation, impact, and mitigation.</li>
                                            <li>Portfolio: <a href="https://github.com/gaiusAmogus/web-security-writeups" target="_blank" rel="noopener noreferrer">github.com/gaiusAmogus/web-security-writeups</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="aboutData__cv-part">
                                <h3 className="aboutData__cv-part-title">&lt;Professional experience&gt;</h3>
                                <div className="aboutData__cv-part-content">
                                    <div className="aboutData__cv-part-content-el">
                                        <p className="text text--1">
                                            <b>WordPress Developer | TS Marketing</b><br />
                                            <span className="text text--2">[11.2025 - 08.2026]</span>
                                        </p>
                                        <ul className="text text--3">
                                            <li>Development and maintenance of production web applications based on WordPress and WooCommerce.</li>
                                            <li>Implementation of custom frontend and backend functionality and integrations according to client requirements.</li>
                                            <li>Debugging application issues in production environments, performance optimization, and technical support for existing systems.</li>
                                            <li>Collaboration with developers, designers, and business clients on project development and maintenance.</li>
                                        </ul>
                                    </div>
                                    <div className="aboutData__cv-part-content-el">
                                        <p className="text text--1">
                                            <b>Frontend Developer | Acclaim</b><br />
                                            <span className="text text--2">[10.2024 - 09.2025]</span>
                                        </p>
                                        <ul className="text text--3">
                                            <li>Development of responsive web applications and websites based on WordPress and WooCommerce.</li>
                                            <li>Maintenance, development, and debugging of existing solutions in production environments.</li>
                                            <li>Implementation of custom frontend functionality, performance optimization, and resolution of technical SEO issues.</li>
                                        </ul>
                                    </div>
                                    <div className="aboutData__cv-part-content-el">
                                        <p className="text text--1">
                                            <b>Frontend Developer | DotLineCode</b><br />
                                            <span className="text text--2">[08.2022 - 08.2024]</span>
                                        </p>
                                        <ul className="text text--3">
                                            <li>Development of custom WordPress themes and plugins and WooCommerce stores.</li>
                                            <li>REST API integrations, integration with custom client systems, and implementation of dynamic components using ACF.</li>
                                            <li>Maintenance, optimization, and development of existing web applications and troubleshooting technical issues.</li>
                                            <li>Development of advanced frontend components using JavaScript, GSAP, and Three.js.</li>
                                        </ul>
                                    </div>
                                    <div className="aboutData__cv-part-content-el">
                                        <p className="text text--1">
                                            <b>Frontend Developer | Funktional</b><br />
                                            <span className="text text--2">[02.2021 - 07.2022]</span>
                                        </p>
                                        <ul className="text text--3">
                                            <li>Development of custom WordPress and WooCommerce solutions and responsive frontend interfaces.</li>
                                            <li>Maintenance, optimization, and development of existing websites, including ongoing technical support for client projects.</li>
                                        </ul>
                                    </div>
                                    <div className="aboutData__cv-part-content-el">
                                        <p className="text text--1">
                                            <b>Junior Frontend Developer | Millenium Studio</b><br />
                                            <span className="text text--2">[09.2020 - 01.2021]</span>
                                        </p>
                                        <ul className="text text--3">
                                            <li>Modification and development of WordPress themes, work with ACF, and development of basic WooCommerce and PrestaShop stores.</li>
                                            <li>Maintenance and optimization of client websites and support for the frontend development team.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="aboutData__cv-part">
                                <h3 className="aboutData__cv-part-title">&lt;Education&gt;</h3>
                                    <div className="aboutData__cv-part-content">
                                        <div className="aboutData__cv-part-content-el">
                                            <p className="text text--1"><b>Bachelor of Engineering in Computer Science</b><br /></p>
                                            <p className="text text--3">Wyższa Szkoła Biznesu - National Louis University, Nowy Sącz, Poland [02.2023 - 03.2026]</p>
                                        </div>
                                    </div>
                            </div>

                            <div className="aboutData__cv-part">
                                <h3 className="aboutData__cv-part-title">&lt;Skills&gt;</h3>
                                <div className="aboutData__cv-part-content">
                                    <h4>WEB DEVELOPMENT</h4>
                                    <ul className="aboutData__cv-part-content-el">
                                        <li>PHP / JavaScript (ES6+) / jQuery</li>
                                        <li>HTML5 / CSS3 / SASS / SCSS</li>
                                        <li>React / Next.js</li>
                                        <li>REST APIs / External API Integrations</li>
                                        <li>SQL / Git</li>
                                        <li>WordPress / WooCommerce Custom Themes and Plugin Modifications</li>
                                        <li>ACF</li>
                                        <li>Debugging / Performance Optimization</li>
                                        <li>RWD / Mobile-First Development</li>
                                    </ul>

                                    <h4>SECURITY LEARNING & TOOLS</h4>
                                    <ul className="aboutData__cv-part-content-el">
                                        <li>Burp Suite: Proxy / Repeater / Intruder</li>
                                        <li>Web Application Security / Security Testing</li>
                                        <li>HTTP Request Analysis</li>
                                        <li>Access Control / IDOR</li>
                                        <li>Authentication</li>
                                        <li>SQL Injection</li>
                                        <li>PortSwigger Web Security Academy</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="aboutData__cv-part">
                                <h3 className="aboutData__cv-part-title">&lt;Soft Skills&gt;</h3>
                                <div className="aboutData__cv-part-content">
                                    <ul className="aboutData__cv-part-content-el">
                                        <li>Analytical Thinking</li>
                                        <li>Problem Solving</li>
                                        <li>Teamwork</li>
                                        <li>Communication</li>
                                        <li>Adaptability to New Technologies</li>
                                        <li>Ability to Work Under Time Pressure</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="aboutData__cv-part">
                                <h3 className="aboutData__cv-part-title">&lt;Certifications&gt;</h3>
                                <div className="aboutData__cv-part-content">
                                    <ul className="aboutData__cv-part-content-el">
                                        <li>MTA 98-364: Database Fundamentals</li>
                                        <li>MTA 98-367: Security Fundamentals</li>
                                        <li>MTA 98-361: Software Development Fundamentals</li>
                                        <li>MTA 98-383: Introduction to Programming using HTML and CSS</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="aboutData__cv-part">
                                <h3 className="aboutData__cv-part-title">&lt;Languages&gt;</h3>
                                <div className="aboutData__cv-part-content">
                                    <ul className="aboutData__cv-part-content-el">
                                        <li>Polish Native</li>
                                        <li>English B2</li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>      
                </div>  
                <div className="row">
                    <div className="col-12">
                        <div className="breadcrumbs  d-flex align-items-center flex-wrap">
                            <div className="breadcrumbs__el breadcrumbs__el--go-back d-flex" onClick={handleBackHomepage}>
                                {getSvg('arrow_left')} 
                            </div>
                            <div className="breadcrumbs__el breadcrumbs__el--separator">V://</div>
                            <div className="breadcrumbs__el breadcrumbs__el--home" onClick={handleBackHomepage}>PORTFOLIO_CORE</div>
                            <div className="breadcrumbs__el breadcrumbs__el--separator">/</div>
                            <div className="breadcrumbs__el breadcrumbs__el--currentEl">USER_PROFILE</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}
