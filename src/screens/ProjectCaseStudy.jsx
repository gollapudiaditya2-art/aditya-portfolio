import { IndustrialProjectStory } from './IndustrialProjectStory.jsx'
import { industrialProjects } from '../content/industrialProjects.js'

export function AurioCaseStudy({ go }) {
  return <IndustrialProjectStory project={industrialProjects.aurio} go={go} />
}

export function BastionScreen({ go }) {
  return <IndustrialProjectStory project={industrialProjects.bastion} go={go} />
}

export function ArcScreen({ go }) {
  return <IndustrialProjectStory project={industrialProjects.arc} go={go} />
}
