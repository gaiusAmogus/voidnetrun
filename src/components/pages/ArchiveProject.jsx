import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAnimFrom } from '../../functions/animTransform';
import { customScrollbar } from '../../functions/customScrollbar';


export default function ArchiveProject() {
    const { projectSlug } = useParams();
    const contentRef = useRef(null);
    const [project, setProject] = useState(null);
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const navigate = useNavigate();

    useAnimFrom(contentRef, 'down');

    useEffect(() => {
        async function fetchProject() {
            try {
                const response = await fetch('/vendor/projects.json?v=' + new Date().getTime());
                if (!response.ok) throw new Error('Failed to fetch projects');
                const data = await response.json();
                const foundProject = data.projects.find(p => p.slug === projectSlug);
                if (foundProject) {
                    setProject(foundProject);
                } else {
                    console.warn('Project not found for slug:', projectSlug);
                }
            } catch (err) {
                console.error(err);
                setProject(null);
            }
        }

        fetchProject();
    }, [projectSlug]);

    useEffect(() => {
        if (project && sectionRef.current) {
            customScrollbar(sectionRef.current);
        }
    }, [project]);

    const handleBackHome = () => navigate('/');
    const handleBackArchive = () => navigate('/archive');

    if (!project) return null;

    return (
        <section className="archiveProject" ref={sectionRef}>
            <div className="sectionWrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="breadcrumbs d-flex align-items-center flex-wrap">
                                <div className="breadcrumbs__el breadcrumbs__el--separator">V://</div>
                                <div className="breadcrumbs__el breadcrumbs__el--home" onClick={handleBackHome}>
                                    PORTFOLIO_CORE
                                </div>
                                <div className="breadcrumbs__el breadcrumbs__el--separator">/</div>
                                <div className="breadcrumbs__el" onClick={handleBackArchive}>PROJECT_MAINFRAME</div>
                                <div className="breadcrumbs__el breadcrumbs__el--separator">/</div>
                                <div className="breadcrumbs__el breadcrumbs__el--currentEl">
                                    {project.title}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row" ref={contentRef}>
                        <div className="col-12">
                            <div className="archiveProject__thumb">
                                <img src={`${window.location.origin}/${project.thumb}`} alt={project.title} />
                            </div>

                        </div>
                        <div className="col-12">
                            <div className="archiveProject__title d-flex flex-column flex-md-row align-items-center justify-content-between">
                                <h2 className="title title--1 textShadow--white" ref={titleRef}>{project.title} </h2>
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn--primary">View Website</a>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="archiveProject__desc text text--1" dangerouslySetInnerHTML={{ __html: project.desc }} />
                        </div>
                        <div className="col-12">
                            <div className="archiveProject__gallery d-flex flex-column">
                                {project.images && project.images.length > 0 ? (
                                    project.images.map((img, idx) => (
                                        <img key={idx} src={`${window.location.origin}/${img}`} alt={`${project.title} ${idx + 1}`} />
                                    ))
                                ) : (
                                    <p>No additional images</p>
                                )}
                            </div>
                            {project.link && (
                                <div className="archiveProject__btn">
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn--primary">View Website</a>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="breadcrumbs d-flex align-items-center flex-wrap">
                                <div className="breadcrumbs__el breadcrumbs__el--separator">V://</div>
                                <div className="breadcrumbs__el breadcrumbs__el--home" onClick={handleBackHome}>
                                    PORTFOLIO_CORE
                                </div>
                                <div className="breadcrumbs__el breadcrumbs__el--separator">/</div>
                                <div className="breadcrumbs__el" onClick={handleBackArchive}>PROJECT_MAINFRAME</div>
                                <div className="breadcrumbs__el breadcrumbs__el--separator">/</div>
                                <div className="breadcrumbs__el breadcrumbs__el--currentEl">
                                    {project.title}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );

    
}
