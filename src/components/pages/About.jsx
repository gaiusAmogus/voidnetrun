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
        { label: 'Age:', value: 'no data' },
        { label: 'Location:', value: 'Somewhere in Poland' },
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
                                Fullstack Developer with 5+ years of commercial experience building and maintaining WordPress and WooCommerce solutions for clients across multiple industries. Specialized in custom WordPress theme development, WooCommerce customization, REST API integrations, website optimization, and performance improvements.
                                <br /><br />
                                Experienced in working with Agile teams, maintaining production systems, debugging complex issues, and delivering responsive, mobile-first websites. Strong understanding of frontend technologies, SEO optimization, UX/UI collaboration, and scalable WordPress architecture.
                                <br /><br />
                                Key strengths include problem-solving, fast adaptation to new technologies, analytical thinking, and efficient collaboration with developers, designers, and clients.
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
                                <h3 className="aboutData__cv-part-title">&lt;Work Experience&gt;</h3>
                                <div className="aboutData__cv-part-content">
                                    <div className="aboutData__cv-part-content-el">
                                        <p className="text text--1">
                                            <b>WordPress Developer at TS Marketing</b><br />
                                            <span className="text text--2">[11.2025 - Present]</span>
                                            
                                        </p>
                                        <ul className="text text--3">
                                            <li>Develop and maintain WordPress and WooCommerce websites for commercial clients</li>
                                            <li>Optimize website performance, loading speed, and SEO-related technical issues</li>
                                            <li>Debug frontend and backend issues in production environments</li>
                                            <li>Implement custom functionality and integrations based on client requirements</li>
                                            <li>Provide technical support and maintenance for existing projects</li>
                                            <li>Analyze website and user data using analytics tools</li>
                                            <li>Collaborate with designers, developers, and project stakeholders</li>
                                        </ul>
                                    </div>
                                    <div className="aboutData__cv-part-content-el">
                                        <p className="text text--1">
                                            <b>Frontend Developer at Acclaim</b><br />
                                            <span className="text text--2">[10.2024 - 09.2025]</span>
                                        </p>
                                        <ul className="text text--3">
                                            <li>Built and maintained responsive websites based on WordPress and WooCommerce</li>
                                            <li>Improved website performance and resolved technical SEO issues</li>
                                            <li>Maintained and optimized existing client solutions</li>
                                            <li>Delivered client support and troubleshooting for production websites</li>
                                            <li>Implemented frontend improvements and custom functionalities</li>
                                        </ul>
                                    </div>
                                    <div className="aboutData__cv-part-content-el">
                                        <p className="text text--1">
                                            <b>Frontend Developer at DotLineCode</b><br />
                                            <span className="text text--2">[08.2022 - 08.2024]</span>
                                        </p>
                                        <ul className="text text--3">
                                            <li>Developed custom WordPress themes and plugins</li>
                                            <li>Created and customized WooCommerce stores</li>
                                            <li>Built dynamic website sections using Advanced Custom Fields (ACF)</li>
                                            <li>Implemented REST API integrations and dedicated client systems</li>
                                            <li>Created advanced frontend animations using GSAP and Three.js</li>
                                            <li>Maintained, optimized, and supported existing websites</li>
                                            <li>Worked on responsive and performance-focused implementations</li>
                                        </ul>
                                    </div>
                                    <div className="aboutData__cv-part-content-el">
                                        <p className="text text--1">
                                            <b>Frontend Developer at Funktional</b><br />
                                            <span className="text text--2">[02.2021 - 07.2022]</span>
                                        </p>
                                        <ul className="text text--3">
                                            <li>Developed custom WordPress templates using ACF</li>
                                            <li>Built WooCommerce-based online stores</li>
                                            <li>Maintained and optimized existing websites</li>
                                            <li>Implemented responsive frontend solutions for client projects</li>
                                            <li>Supported website operations and ongoing development</li>
                                        </ul>
                                    </div>
                                    <div className="aboutData__cv-part-content-el">
                                        <p className="text text--1">
                                            <b>Junior Frontend Developer at Millenium Studio</b><br />
                                            <span className="text text--2">[09.2020 - 01.2021]</span>
                                        </p>
                                        <ul className="text text--3">
                                            <li>Modified and customized existing WordPress templates</li>
                                            <li>Worked with Advanced Custom Fields (ACF)</li>
                                            <li>Created simple WooCommerce and PrestaShop stores</li>
                                            <li>Maintained and optimized client websites</li>
                                            <li>Assisted in frontend development tasks and support</li>
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
                                    <h4>Frontend</h4>
                                    <ul className="aboutData__cv-part-content-el">
                                        <li>HTML5 / CSS3 / SASS / SCSS </li>
                                        <li>JavaScript (ES6+) / jQuery / React </li>
                                        <li>Responsive Web Design (RWD) / Mobile-First Development</li>
                                        <li>GSAP / Three.js</li>
                                    </ul>
                                    <h4>WordPress & eCommerce</h4>
                                    <ul className="aboutData__cv-part-content-el">  
                                        <li>Custom WordPress Theme Development</li>
                                        <li>Advanced Custom Fields (ACF)</li>
                                        <li>WooCommerce Development & Customization</li>
                                        <li>WordPress Optimization & Maintenance</li>
                                        <li>Plugin Development</li>
                                        <li>Technical SEO Improvements</li>
                                        <li>Website Debugging & Support</li>
                                    </ul>
                                    <h4>Backend & Integrations</h4>
                                    <ul className="aboutData__cv-part-content-el">  
                                        <li>PHP</li>
                                        <li>REST API / External API Integrations</li>
                                        <li>Data Analysis from Analytics Tools</li>
                                    </ul>
                                    <h4>UX/UI & Tools</h4>
                                    <ul className="aboutData__cv-part-content-el">  
                                        <li>Figma</li>
                                        <li>Adobe XD / Photoshop (basic)</li>
                                        <li>Git</li>                    
                                    </ul>
                                    <h4>Additional</h4>
                                    <ul className="aboutData__cv-part-content-el">  
                                        <li>Unreal Engine 5</li>
                                        <li>Reserve Corporal - Polish Army</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="aboutData__cv-part">
                                <h3 className="aboutData__cv-part-title">&lt;Soft Skills&gt;</h3>
                                <div className="aboutData__cv-part-content">
                                    <ul className="aboutData__cv-part-content-el">
                                        <li>Teamwork</li>
                                        <li>Communication</li>
                                        <li>Problem-solving</li>
                                        <li>Adaptability</li>
                                        <li>Analytical thinking</li>
                                        <li>Ability to work under pressure</li>
                                        <li>Openness to feedback</li>
                                        <li>Creativity</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="aboutData__cv-part">
                                <h3 className="aboutData__cv-part-title">&lt;Languages&gt;</h3>
                                <div className="aboutData__cv-part-content">
                                    <ul className="aboutData__cv-part-content-el">
                                        <li>Polish (native)</li>
                                        <li>English (B2)</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="aboutData__cv-part">
                                <h3 className="aboutData__cv-part-title">&lt;Courses and qualifications&gt;</h3>
                                <div className="aboutData__cv-part-content">
                                    <ul className="aboutData__cv-part-content-el">
                                        <li>98-364:MTA Database Fundamentals</li>
                                        <li>98-367:MTA Security Fundamentals</li>
                                        <li>98-361:MTA Software Development Fundamentals</li>
                                        <li>98-383:MTA Introduction to Programming using HTML and CSS</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="aboutData__cv-part">
                                <h3 className="aboutData__cv-part-title">&lt;Interests&gt;</h3>
                                <div className="aboutData__cv-part-content">
                                    <ul className="aboutData__cv-part-content-el">
                                        <li>HEMA (Historical European Martial Arts)</li>
                                        <li>Horse Riding</li>
                                        <li>Music production</li>
                                        <li>Video games</li>
                                        <li>History</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>      
                </div>
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
            </div>
        </div>
    </section>
  );
}
