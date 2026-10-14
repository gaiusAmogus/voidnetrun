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
        { title: 'Application Security' },
        { title: 'Burp Suite / PortSwigger' },
        { title: 'JavaScript / React' },
        { title: 'HTML5 / CSS3 / SASS' },
        { title: 'PHP / REST API' },
        { title: 'WordPress / WooCommerce' },
        { title: 'Git / CI-CD / Figma' }
    ];

    const startYear = 2020;
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
                                    Computer Science Engineer with 5+ years of commercial web development experience, currently transitioning into application security. Practical experience in web application security testing through PortSwigger Web Security Academy and 60+ documented lab writeups covering SQLi, XSS, SSRF, IDOR, JWT, XXE, and CSRF. Combines a software development background with practical security testing skills. Open to roles in application security and IT operations.

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
                                <h3 className="aboutData__cv-part-title">&lt;Skills&gt;</h3>
                                <div className="aboutData__cv-part-content">

                                    <h4>APPLICATION SECURITY / CYBERSECURITY</h4>
                                    <ul className="aboutData__cv-part-content-el">
                                        <li>Application Security, AppSec, Web Application Security</li>
                                        <li>Security Testing, Penetration Testing, Web Application Penetration Testing</li>
                                        <li>Vulnerability Assessment</li>
                                        <li>Burp Suite (Proxy, Repeater, Intruder)</li>
                                        <li>PortSwigger Web Security Academy (60+ labs)</li>
                                        <li>TryHackMe (in progress)</li>
                                        <li>OWASP Top 10, Access Control, Insecure Direct Object References (IDOR)</li>
                                        <li>Authentication, SQL Injection (SQLi), Cross-Site Scripting (XSS)</li>
                                        <li>Cross-Site Request Forgery (CSRF), Server-Side Request Forgery (SSRF)</li>
                                        <li>Business Logic Vulnerabilities, File Upload Vulnerabilities</li>
                                        <li>JSON Web Tokens (JWT), XML External Entity (XXE) Injection</li>
                                        <li>Secure Coding Practices, Software Architecture Awareness</li>
                                    </ul>

                                    <h4>PROGRAMMING / WEB DEVELOPMENT</h4>
                                    <ul className="aboutData__cv-part-content-el">
                                        <li>PHP, JavaScript (ES6+), SQL</li>
                                        <li>HTML5, CSS3, Sass, SCSS, jQuery</li>
                                        <li>React, React.js, React Router, Next.js</li>
                                        <li>REST APIs, External API Integrations</li>
                                        <li>WordPress, WooCommerce, Custom Themes, Plugin Customization, Advanced Custom Fields (ACF)</li>
                                        <li>Responsive Web Design (RWD), Mobile-First Development</li>
                                        <li>CI/CD: GitHub Actions, GitHub Pages Deployment</li>
                                    </ul>

                                    <h4>IT OPERATIONS / TROUBLESHOOTING</h4>
                                    <ul className="aboutData__cv-part-content-el">
                                        <li>Hosting Configuration, Website Deployment, Domain and DNS Configuration</li>
                                        <li>Windows (user-level), Linux (basics)</li>
                                        <li>TCP/IP fundamentals, DNS, HTTP/HTTPS</li>
                                        <li>Application Debugging, Technical Troubleshooting, Performance Optimization</li>
                                        <li>Software Configuration, Computer Hardware Diagnostics</li>
                                        <li>Ticketing &amp; Project Tools: Asana, ClickUp, Teamwork, Jira (basic)</li>
                                        <li>Git, Version Control</li>
                                    </ul>

                                    <h4>AI TOOLS / PRODUCTIVITY</h4>
                                    <ul className="aboutData__cv-part-content-el">
                                        <li>ChatGPT, Claude, GitHub Copilot, Cursor</li>
                                        <li>AI-Assisted Coding, Technical Research, Debugging Support, Code Analysis</li>
                                    </ul>

                                    <h4>ADDITIONAL TECHNICAL SKILLS</h4>
                                    <ul className="aboutData__cv-part-content-el">
                                        <li>Figma, Adobe Photoshop</li>
                                        <li>C++ (Fundamentals), Unreal Engine (Fundamentals), Unity (Fundamentals)</li>
                                    </ul>

                                    <h4>SOFT SKILLS</h4>
                                    <ul className="aboutData__cv-part-content-el">
                                        <li>Analytical Thinking</li>
                                        <li>Problem-Solving</li>
                                        <li>Technical Communication</li>
                                        <li>Teamwork</li>
                                        <li>Adaptability to New Technologies</li>
                                    </ul>

                                </div>
                            </div>

                            <div className="aboutData__cv-part">
                                <h3 className="aboutData__cv-part-title">&lt;Work Experience&gt;</h3>
                                <div className="aboutData__cv-part-content">

                                    <div className="aboutData__cv-part-content-el">
                                        <p className="text text--1">
                                            <b>WordPress Developer | TS Marketing</b><br />
                                            <span className="text text--2">[11.2025 - 08.2026]</span>
                                        </p>
                                        <ul className="text text--3">
                                            <li>Developed and maintained 10+ web applications built with WordPress, WooCommerce, PHP, and JavaScript, including frontend and backend functionality, following secure coding practices (input validation, output encoding).</li>
                                            <li>Implemented custom features and REST API integrations with external systems based on project requirements, including secure authentication and access control.</li>
                                            <li>Diagnosed and fixed 50+ production issues across PHP/JavaScript applications, including input validation and access control bugs (SQL Injection, Cross-Site Scripting, IDOR), gaining practical understanding of common vulnerability patterns.</li>
                                            <li>Collaborated with cross-functional teams (developers, designers, business clients) on application development and maintenance, including stakeholder communication.</li>
                                        </ul>
                                    </div>

                                    <div className="aboutData__cv-part-content-el">
                                        <p className="text text--1">
                                            <b>Frontend Developer | Acclaim</b><br />
                                            <span className="text text--2">[10.2024 - 09.2025]</span>
                                        </p>
                                        <ul className="text text--3">
                                            <li>Developed responsive web applications and websites using WordPress and WooCommerce for 20+ client projects.</li>
                                            <li>Implemented custom frontend functionality using HTML, CSS, and JavaScript.</li>
                                            <li>Debugged existing solutions, diagnosed defects, and resolved numerous issues in production environments, including security-related bugs (Cross-Site Scripting, CSRF).</li>
                                            <li>Optimized website performance and improved technical aspects of application behavior.</li>
                                        </ul>
                                    </div>

                                    <div className="aboutData__cv-part-content-el">
                                        <p className="text text--1">
                                            <b>Frontend Developer | DotLineCode</b><br />
                                            <span className="text text--2">[08.2022 - 08.2024]</span>
                                        </p>
                                        <ul className="text text--3">
                                            <li>Developed 30+ custom WordPress themes and plugins and WooCommerce stores.</li>
                                            <li>Integrated web applications with REST APIs and external systems.</li>
                                            <li>Implemented dynamic components and content structures using Advanced Custom Fields (ACF).</li>
                                            <li>Debugged, maintained, and optimized existing web applications.</li>
                                            <li>Built advanced user interfaces and animations using JavaScript, GSAP, and Three.js.</li>
                                        </ul>
                                    </div>

                                    <div className="aboutData__cv-part-content-el">
                                        <p className="text text--1">
                                            <b>Frontend Developer | Funktional</b><br />
                                            <span className="text text--2">[02.2021 - 07.2022]</span>
                                        </p>
                                        <ul className="text text--3">
                                            <li>Developed custom WordPress and WooCommerce solutions and responsive web interfaces for 10+ clients.</li>
                                            <li>Maintained existing websites, diagnosed technical issues, and optimized application performance.</li>
                                            <li>Provided technical support for client projects and implemented functional changes.</li>
                                            <li>Worked in Agile/Scrum environment with regular sprint planning and daily standups.</li>
                                        </ul>
                                    </div>

                                    <div className="aboutData__cv-part-content-el">
                                        <p className="text text--1">
                                            <b>Junior Frontend Developer | Millenium Studio</b><br />
                                            <span className="text text--2">[09.2020 - 01.2021]</span>
                                        </p>
                                        <ul className="text text--3">
                                            <li>Modified and developed WordPress themes and implemented dynamic components using ACF for 5+ client projects.</li>
                                            <li>Built simple online stores using WooCommerce and PrestaShop.</li>
                                            <li>Maintained and optimized client websites and supported the frontend development team.</li>
                                        </ul>
                                    </div>

                                </div>
                            </div>

                            <div className="aboutData__cv-part">
                                <h3 className="aboutData__cv-part-title">&lt;Education and Certifications&gt;</h3>
                                <div className="aboutData__cv-part-content">

                                    <div className="aboutData__cv-part-content-el">
                                        <p className="text text--1"><b>Bachelor of Engineering in Computer Science</b></p>
                                        <p className="text text--3">Wyższa Szkoła Biznesu - National Louis University, Nowy Sącz, Poland [02.2023 - 03.2026]</p>
                                    </div>

                                    <div className="aboutData__cv-part-content-el">
                                        <p className="text text--1"><b>Microsoft Technology Associate (MTA)</b></p>
                                        <ul className="text text--3">
                                            <li>98-367 - Security Fundamentals (RemC-FVpD)</li>
                                            <li>98-364 - Database Administration Fundamentals (JFSm-FVpT)</li>
                                            <li>98-361 - Software Development Fundamentals (w9y6A-HaL8)</li>
                                            <li>98-383 - Introduction to Programming Using HTML and CSS (wNQTG-2Fwn)</li>
                                        </ul>
                                    </div>

                                    <div className="aboutData__cv-part-content-el">
                                        <p className="text text--1"><b>Vocational Exams - Information Technology</b></p>
                                        <ul className="text text--3">
                                            <li>E.12 - Assembly and Maintenance of Personal Computers and Peripheral Devices (K/30040287/15)</li>
                                            <li>E.13 - Design of Local Computer Networks and Network Administration (K/30060963/16)</li>
                                        </ul>
                                    </div>

                                </div>
                            </div>

                            <div className="aboutData__cv-part">
                                <h3 className="aboutData__cv-part-title">&lt;Languages&gt;</h3>
                                <div className="aboutData__cv-part-content">
                                    <ul className="aboutData__cv-part-content-el">
                                        <li>Polish - Native</li>
                                        <li>English - C1</li>
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
