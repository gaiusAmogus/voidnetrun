import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAnimFrom } from '../../functions/animTransform';
import { customScrollbar } from '../../functions/customScrollbar';
import { TextScramble, textType } from '../../functions/textScramble';
import { getSvg } from '../../functions/svgLoader';

export default function Archive() {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const titleRef = useRef(null);
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);

    // Start fade animation
    useAnimFrom(contentRef, 'down');

    useEffect(() => {
        if (!sectionRef.current) return;
        customScrollbar(sectionRef.current);

        const titleElement = titleRef.current;
        if (titleElement) {
            const fx = new TextScramble(titleElement);
            fx.setText(titleElement.getAttribute('data-text'));
        }

        async function fetchProjects() {
            try {
                const response = await fetch('/vendor/projects.json?v=' + new Date().getTime());
                if (!response.ok) throw new Error('Failed to fetch projects');
                const data = await response.json();
                // Sort Desc by ID
                const sortedProjects = data.projects.sort((a, b) => b.id - a.id);
                setProjects(sortedProjects);
            } catch (err) {
                console.error(err);
                setProjects([]);
            }
        }

        fetchProjects();
    }, []);

    const handleBackHomepage = () => navigate('/');

    const handleProjectClick = (slug) => {
        navigate(`/archive/${slug}`);
    };

    return (
        <section className="archive" ref={sectionRef}>
            <div className="sectionWrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="breadcrumbs d-flex align-items-center flex-wrap">
                                <div className="breadcrumbs__el breadcrumbs__el--separator">V://</div>
                                <div className="breadcrumbs__el breadcrumbs__el--home" onClick={handleBackHomepage}>PORTFOLIO_CORE</div>
                                <div className="breadcrumbs__el breadcrumbs__el--separator">/</div>
                                <div className="breadcrumbs__el breadcrumbs__el--currentEl">PROJECT_MAINFRAME</div>
                            </div>
                        </div>
                    </div>
                    <div className="row" ref={contentRef}>
                        <div className="col-12">
                            <h2 className="title title--1 textShadow--white" data-text="[PROJECTS_DATA: LOADED]" ref={titleRef}>
                                {textType('[PROJECTS_DATA: LOADED]')}
                            </h2>
                        </div>
                    </div>
                    <div className="row">
                        {projects.map(project => (
                            <div key={project.id} className="col-12 col-md-6 col-xl-4 ">
                                <div className="project" onClick={() => handleProjectClick(project.slug)}>
                                    <div className="project__bg"></div>
                                    <div className="project__wrapper d-flex flex-column">

                                        <div className={`project__category project__category--${project.category_slug}`}>
                                            <p className="title title--5">{project.category}</p>
                                        </div>
                                        <div className="project__image">
                                            <img src={project.thumb} alt={project.title} />
                                        </div>
                                        <div className="project__content d-flex flex-column">
                                            <div className="project__icon">
                                                {getSvg(`categoryIcon__${project.category_slug}`)}
                                            </div>
                                            <div className="project__title d-flex align-items-center">
                                                <h3 className="title title--4">{project.title}</h3>
                                            </div>
                                            <div className="project__excerpt">
                                                <p className="text text--2">{project.excerpt}</p>
                                            </div>
                                            <div className="project__button">
                                                <div className="btn btn--primary">
                                                    View Data
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
