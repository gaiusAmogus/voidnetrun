import { ReactComponent as SiteLine1 } from '../svg/siteLine_1.svg';
import { ReactComponent as SiteLine2 } from '../svg/siteLine_2.svg';
import { ReactComponent as Linkedin } from '../svg/linkedin.svg';
import { ReactComponent as Github } from '../svg/github.svg';
import { ReactComponent as BoxCorner1 } from '../svg/boxCorner_1.svg';
import { ReactComponent as BoxCorner2 } from '../svg/boxCorner_2.svg';
import { ReactComponent as ModulesIcon1 } from '../svg/modulesIcon_1.svg';
import { ReactComponent as ModulesIcon2 } from '../svg/modulesIcon_2.svg';
import { ReactComponent as ModulesIcon3 } from '../svg/modulesIcon_3.svg';
import { ReactComponent as DataDisc } from '../svg/dataDisc.svg';
import { ReactComponent as Human } from '../svg/human.svg';
import { ReactComponent as Brain } from '../svg/brain.svg';
import { ReactComponent as SkillBar } from '../svg/skillBar.svg';
import { ReactComponent as Lines } from '../svg/lines.svg';
import { ReactComponent as Pointer1 } from '../svg/pointer_1.svg';
import { ReactComponent as Pointer2 } from '../svg/pointer_2.svg';
import { ReactComponent as Pointer3 } from '../svg/pointer_3.svg';
import { ReactComponent as Pointer4 } from '../svg/pointer_4.svg';
import { ReactComponent as Pointer5 } from '../svg/pointer_5.svg';
import { ReactComponent as Pointer6 } from '../svg/pointer_6.svg';
import { ReactComponent as Pointer7 } from '../svg/pointer_7.svg';
import { ReactComponent as CategoryIcon_web } from '../svg/categoryIcon__web.svg';
import { ReactComponent as CategoryIcon_game } from '../svg/categoryIcon__game.svg';

const svgs = {
    siteLine_1: SiteLine1,
    siteLine_2: SiteLine2,
    linkedin: Linkedin,
    github: Github,
    boxCorner_1: BoxCorner1,
    boxCorner_2: BoxCorner2,
    modulesIcon_1: ModulesIcon1,
    modulesIcon_2: ModulesIcon2,
    modulesIcon_3: ModulesIcon3,
    dataDisc: DataDisc,
    human: Human,
    brain: Brain,
    skillBar: SkillBar,
    lines: Lines,
    pointer_1: Pointer1,
    pointer_2: Pointer2,
    pointer_3: Pointer3,
    pointer_4: Pointer4,
    pointer_5: Pointer5,
    pointer_6: Pointer6,
    pointer_7: Pointer7,
    categoryIcon__web: CategoryIcon_web,
    categoryIcon__game: CategoryIcon_game,
};

export function getSvg(name) {
    const SvgComponent = svgs[name];
    if (!SvgComponent) {
        console.warn(`SVG "${name}" not found!`);
        return null;
    }
    return <SvgComponent />;
}
