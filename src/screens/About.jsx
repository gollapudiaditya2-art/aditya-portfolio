import { useEffect, useState } from 'react'
import { ArrowIcon } from '../design-system/index.js'

const EXPERIENCE = [
  ['Freelance', 'UX/UI Designer & Front-End Developer · Sep 2024 to Present', 'Designed and built Sanathan Sethu, the responsive Seeker.social experience and partner portal, and the Vaijayanthy Quality Exaal marketing site.'],
  ['CGI', 'UX/UI Designer · Sep 2022 to Jul 2024', 'Redesigned OpenGrid 360, led a multi-school platform from research through handoff, and used two rounds of usability testing to reduce task completion time by 30%.'],
  ['Ether and Sol Design House', 'Industrial Design Intern · Bangalore, India · Feb 2022 to Jun 2022', 'Designed a bakery and café interior from material research and spatial planning through client-ready 3D models, then created modular furniture that staff could quickly reset without sacrificing floor space.'],
  ['Permanent Objects', 'Industrial Design Intern · Bangalore, India · Jul 2021 to Nov 2021', 'Translated client conversations into approved mood boards, then developed custom furniture from test models through 1:4 and full-scale prototypes for CNC fabrication.'],
]

const EDUCATION = [
  ['MA, Industrial Design', 'Savannah College of Art and Design', '2024 to 2026'],
  ['B.Des, Product Design', 'Ramaiah University of Applied Sciences', '2018 to 2022'],
  ['Design Research & Insight Translation', 'Lextant', '2025'],
]

const CAPABILITIES = [
  ['Research', 'User interviews, surveys, affinity mapping, usability testing, and insight translation'],
  ['Design', 'Information architecture, user flows, interaction design, and visual systems'],
  ['Prototype', 'Figma, Blender, physical models, iterative testing, and developer handoff'],
  ['Build', 'React, Vue, Next.js, JavaScript, HTML, and CSS'],
]

const PERSONAL_STICKERS = [
  { src: '/assets/images/personal/triumph.webp', label: 'Triumph motorcycle', group: 'machines', x: '8%', y: '6%', width: '23%', rotate: '-12deg', size: [749, 688] },
  { src: '/assets/images/personal/world-cup.webp', label: 'World Cup', group: 'football', x: '30%', y: '3%', width: '22%', rotate: '4deg', size: [578, 1127] },
  { src: '/assets/images/personal/football-ball.png', label: 'Football', group: 'football', x: '24%', y: '23%', width: '17%', rotate: '-8deg', size: [1254, 1254] },
  { src: '/assets/images/personal/camera.webp', label: 'Camera', group: 'photography', x: '50%', y: '2%', width: '35%', rotate: '7deg', size: [738, 656] },
  { src: '/assets/images/personal/barcelona.webp', label: 'FC Barcelona', group: 'football', x: '5%', y: '26%', width: '26%', rotate: '-8deg', size: [570, 554] },
  { src: '/assets/images/personal/porsche.webp', label: 'Porsche', group: 'machines', x: '70%', y: '24%', width: '24%', rotate: '8deg', size: [848, 1055] },
  { src: '/assets/images/personal/motorcycle-engine.png', label: 'Motorcycle engine', group: 'machines', x: '71%', y: '45%', width: '24%', rotate: '6deg', size: [1254, 1254] },
  { src: '/assets/images/personal/blender-logo.png', label: 'Blender', group: 'blender', x: '51%', y: '31%', width: '22%', rotate: '-4deg', size: [512, 512] },
  { src: '/assets/images/personal/filter-coffee.webp', label: 'Filter coffee', group: 'coffee', x: '73%', y: '34%', width: '22%', rotate: '4deg', size: [865, 816] },
  { src: '/assets/images/personal/football-boot.webp', label: 'Football boot', group: 'football', x: '28%', y: '40%', width: '46%', rotate: '-5deg', size: [760, 425] },
  { src: '/assets/images/personal/hampi.webp', label: 'Hampi architecture', group: 'architecture', x: '6%', y: '47%', width: '32%', rotate: '-5deg', size: [390, 340] },
  { src: '/assets/images/personal/stone-detail.png', label: 'Carved stone detail', group: 'architecture', x: '22%', y: '48%', width: '18%', rotate: '-7deg', size: [1254, 1254] },
  { src: '/assets/images/personal/camp-nou.webp', label: 'Camp Nou', group: 'football', x: '48%', y: '55%', width: '38%', rotate: '4deg', size: [552, 337] },
  { src: '/assets/images/personal/ferrari-f1.webp', label: 'Ferrari Formula 1 car', group: 'machines', x: '8%', y: '61%', width: '76%', rotate: '-2deg', size: [1361, 548] },
]

const PERSONAL_CHAPTERS = [
  {
    id: 'football',
    title: 'Football is more than the match.',
    body: 'I follow Barcelona and the World Cup, and I care just as much about whether the ground looks good to play on.',
    images: [
      {
        src: '/assets/images/personal/gallery/football-playing.jpg',
        alt: 'Aditya standing with a football on an indoor pitch at night',
        size: [2400, 1600],
      },
    ],
  },
  {
    id: 'architecture',
    title: 'Architecture makes me stop and look.',
    body: 'From Hampi to the buildings around me, I notice structure, material and the details that hold everything together.',
    images: [
      { src: '/assets/images/personal/gallery/photography-qutub-minar.jpg', alt: 'Qutub Minar illuminated at night', size: [1200, 1600] },
      { src: '/assets/images/personal/gallery/photography-kansas-city-station.jpg', alt: 'A historic building beneath dramatic clouds', size: [1200, 1600] },
      { src: '/assets/images/personal/gallery/photography-cleveland-tower.jpg', alt: 'A tower framed between city buildings', size: [1200, 1600] },
      { src: '/assets/images/personal/gallery/photography-red-fort.jpg', alt: 'The Red Fort beneath a blue-grey sky', size: [1600, 1200] },
    ],
  },
  {
    id: 'photography',
    title: 'A camera gives me another way to observe.',
    body: 'Photography helps me slow down, frame what caught my attention and look at it again.',
    images: [
      { src: '/assets/images/personal/gallery/photography-sky-plane.jpg', alt: 'A small plane crossing a layered cloudy sky', size: [1200, 1600] },
      { src: '/assets/images/personal/gallery/photography-mountain-landscape.jpg', alt: 'Two people walking across a mountain ridge', size: [2400, 1600] },
    ],
  },
  {
    id: 'blender',
    title: 'I also build in Blender.',
    body: 'It gives me another way to explore an idea in three dimensions and view it from every side.',
    images: [
      { src: '/assets/images/personal/gallery/blender-concept-side-render.jpg', alt: 'Reflective car form explored from the side in Blender', size: [823, 1600] },
      { src: '/assets/images/personal/gallery/blender-blue-porsche-render.jpg', alt: 'Blue sports car rendered in Blender', size: [1280, 720] },
      { src: '/assets/images/personal/gallery/blender-caterham-render.jpg', alt: 'Open-top sports car rendered in a container yard', size: [1600, 900] },
      { src: '/assets/images/personal/gallery/blender-mercedes-render.jpg', alt: 'White sports car rendered against red lighting', size: [1600, 900] },
      { src: '/assets/images/personal/gallery/blender-concept-top-render.jpg', alt: 'Reflective car form explored from above in Blender', size: [823, 1600] },
      { src: '/assets/images/personal/gallery/blender-work-in-progress.jpg', alt: 'Blue car model shown while being developed in Blender', size: [1200, 1600] },
    ],
  },
  {
    id: 'machines',
    title: 'Machines keep me curious.',
    body: 'Formula 1, Porsche and Triumph keep me looking at proportion, performance and how every part works together.',
    images: [
      { src: '/assets/images/personal/gallery/machines-triumph-bobber.jpg', alt: 'Triumph Bobber motorcycle', size: [587, 522] },
      { src: '/assets/images/personal/gallery/machines-indy-car.jpg', alt: 'Historic open-wheel race car on display', size: [1200, 1600] },
      { src: '/assets/images/personal/gallery/machines-porsche-night.jpg', alt: 'Red Porsche photographed at night', size: [1200, 1600] },
      { src: '/assets/images/personal/gallery/machines-engine-bay.jpg', alt: 'Close view inside a car engine bay', size: [1600, 1200] },
    ],
  },
  {
    id: 'coffee',
    title: 'Filter coffee is the ritual I return to.',
    body: 'A familiar cup gives me a reason to pause, look around and let an idea take its time.',
    images: [
      {
        src: '/assets/images/personal/gallery/filter-kaapi.jpg',
        alt: 'South Indian filter coffee served in a steel tumbler and dabarah',
        size: [2400, 1600],
      },
    ],
  },
]

export function AboutScreen() {
  const [activePersonalGroup, setActivePersonalGroup] = useState(PERSONAL_CHAPTERS[0].id)
  const [activePersonalImage, setActivePersonalImage] = useState(0)

  useEffect(() => {
    const chapter = PERSONAL_CHAPTERS.find(({ id }) => id === activePersonalGroup)
    const imageCount = chapter?.images.length ?? 0

    if (imageCount < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const interval = window.setInterval(() => {
      setActivePersonalImage((current) => (current + 1) % imageCount)
    }, 3200)

    return () => window.clearInterval(interval)
  }, [activePersonalGroup])

  const selectPersonalGroup = (group) => {
    if (group !== activePersonalGroup) setActivePersonalImage(0)
    setActivePersonalGroup(group)
  }

  return (
    <section className="screen about active" id="s-about">
      <main className="about-main">
        <div className="about-wrap">
          <section className="about-overview" aria-labelledby="about-title">
            <header className="about-head">
              <h1 id="about-title">I work across the object and the interface.</h1>
              <div className="about-intro">
                <p>I&apos;m an industrial and UX/UI designer based in Savannah. I take ideas from research and flows to working front ends, and use the same prototype-first approach for physical products.</p>
                <div className="about-actions">
                  <a href="/assets/documents/aditya-gollapudi-resume.pdf" target="_blank" rel="noreferrer">View résumé <ArrowIcon direction="external" /></a>
                  <a href="mailto:gollapudi.aditya71@gmail.com">Email me <ArrowIcon /></a>
                </div>
              </div>
            </header>

            <dl className="about-facts">
              <div><dt>Based in</dt><dd>Savannah, Georgia</dd></div>
              <div><dt>Practice</dt><dd>UX/UI · Front-end · Industrial Design</dd></div>
              <div><dt>Approach</dt><dd>Research to working prototype</dd></div>
            </dl>

            <div className="about-skills">
              <h2>How I work</h2>
              <div className="skill-list">
                {CAPABILITIES.map(([title, items]) => (
                  <div className="skill-item" key={title}><h3>{title}</h3><p>{items}</p></div>
                ))}
              </div>
            </div>
          </section>

          <section className="about-section experience-timeline-section">
            <h2>Experience</h2>
            <div className="timeline">
              <div className="tl-line"><span className="tl-line-fill"></span></div>
              {EXPERIENCE.map(([title, role, description], index) => (
                <div className={`tl-step${index === 0 ? ' on' : ''}`} key={title}>
                  <span className="tl-dot">{index + 1}</span>
                  <div className="tl-body">
                    <h3>{title}</h3>
                    <p className="tl-role">{role}</p>
                    {description ? <p>{description}</p> : null}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="about-section">
            <h2>Education</h2>
            <div className="education-list">
              {EDUCATION.map(([degree, school, period]) => (
                <article key={degree}><time>{period}</time><h3>{degree}</h3><p>{school}</p></article>
              ))}
            </div>
          </section>
        </div>

        <section className="personal-story" aria-labelledby="personal-title">
          <header className="personal-prologue">
            <h2 id="personal-title">I notice things.</h2>
            <div className="personal-prologue-copy">
              <p>I&apos;m curious about almost everything. I can take something apart and put it back together simply because I need to understand what is happening inside.</p>
              <p>I can sit quietly and observe an ordinary place for a long time, noticing the smallest details others might pass by. I like going somewhere unfamiliar simply to understand it, and my mind often wanders into ancient worlds, imagining their stories, beliefs, and ways of life.</p>
              <p>Recently, I&apos;ve found myself asking “why?” more often. Not to question everything for the sake of it, but because understanding the reason behind something helps me see it from another person&apos;s perspective, even when I do not agree.</p>
              <p>I think that is who I am: someone who looks closely, keeps asking questions, and wants to understand things from more than one point of view.</p>
            </div>
          </header>

          <div className="personal-gallery">
            <div className="personal-collage" aria-label="Choose a personal interest">
              {PERSONAL_STICKERS.map((sticker) => {
                const isActive = sticker.group === activePersonalGroup
                return (
                  <button
                    type="button"
                    className={`personal-sticker${isActive ? ' is-active' : ''}`}
                    data-personal-group={sticker.group}
                    aria-label={`Show ${sticker.label}`}
                    aria-pressed={isActive}
                    onMouseEnter={() => selectPersonalGroup(sticker.group)}
                    onFocus={() => selectPersonalGroup(sticker.group)}
                    onClick={() => selectPersonalGroup(sticker.group)}
                    style={{ '--x': sticker.x, '--y': sticker.y, '--w': sticker.width, '--r': sticker.rotate }}
                    key={sticker.src}
                  >
                    <img
                      src={sticker.src}
                      alt=""
                      width={sticker.size[0]}
                      height={sticker.size[1]}
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                )
              })}
            </div>

            <div className="personal-visuals">
              {PERSONAL_CHAPTERS.map((chapter) => {
                const isActive = chapter.id === activePersonalGroup
                const activeSlide = isActive ? activePersonalImage % chapter.images.length : 0
                return (
                  <figure
                    className={`personal-frame is-media-fill${isActive ? ' is-active' : ''}`}
                    data-personal-group={chapter.id}
                    aria-hidden={String(!isActive)}
                    key={chapter.id}
                  >
                    <div className={`personal-frame-image${chapter.images.length > 1 ? ' is-slideshow' : ''}`}>
                      {chapter.images.map((image, imageIndex) => {
                        const isSlideActive = imageIndex === activeSlide
                        return (
                          <img
                            className={isSlideActive ? 'is-active' : ''}
                            src={image.src}
                            alt={isSlideActive ? image.alt : ''}
                            aria-hidden={String(!isSlideActive)}
                            width={image.size[0]}
                            height={image.size[1]}
                            loading="lazy"
                            decoding="async"
                            key={image.src}
                          />
                        )
                      })}
                    </div>
                    <figcaption><h3>{chapter.title}</h3><p>{chapter.body}</p></figcaption>
                  </figure>
                )
              })}
            </div>
          </div>

          <footer className="about-contact" aria-labelledby="about-contact-title">
            <div>
              <h2 id="about-contact-title">Have something worth designing?</h2>
              <p>Product roles, freelance briefs, or just a good problem to think about. The fastest way to reach me is email.</p>
            </div>
            <div className="about-actions about-contact-actions">
              <a href="mailto:gollapudi.aditya71@gmail.com">Email me <ArrowIcon /></a>
              <a href="/assets/documents/aditya-gollapudi-resume.pdf" target="_blank" rel="noreferrer">View résumé <ArrowIcon direction="external" /></a>
            </div>
          </footer>
        </section>
      </main>
    </section>
  )
}
