import { HomeScreen } from './Home.jsx'
import { AboutScreen } from './About.jsx'
import { ColophonScreen } from './Colophon.jsx'
import { NotFoundScreen } from './NotFound.jsx'
import { IndustrialIndexScreen } from './IndustrialIndex.jsx'
import { UxIndexScreen } from './UxIndex.jsx'
import { CuraTestingReport, CuraVisualEdit, CuraVisualProcess, ForkastTestingReport, ForkastVisualEdit, ForkastVisualProcess } from './VisualCaseStudy.jsx'
import { ArcScreen, AurioCaseStudy as AurioScreen, BastionScreen } from './ProjectCaseStudy.jsx'

export const screens = {
  fork: HomeScreen,
  about: AboutScreen,
  colophon: ColophonScreen,
  'id-index': IndustrialIndexScreen,
  'id-aurio': AurioScreen,
  'id-arc': ArcScreen,
  'id-bastion': BastionScreen,
  'ux-index': UxIndexScreen,
  'ux-forkast-visual': ForkastVisualEdit,
  'ux-forkast-process': ForkastVisualProcess,
  'ux-forkast-testing': ForkastTestingReport,
  'ux-cura-visual': CuraVisualEdit,
  'ux-cura-process': CuraVisualProcess,
  'ux-cura-testing': CuraTestingReport,
  'not-found': NotFoundScreen,
}
