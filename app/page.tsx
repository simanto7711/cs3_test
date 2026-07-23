const interests = [
  {
    number: "01",
    title: "Engineering research",
    description:
      "Collecting and analyzing data, documenting results, and helping communicate research progress.",
  },
  {
    number: "02",
    title: "AI & emerging technology",
    description:
      "Exploring machine learning, prompt engineering, and useful AI-powered tools.",
  },
  {
    number: "03",
    title: "Web development",
    description:
      "Building responsive projects with HTML, CSS, JavaScript, and modern web tools.",
  },
  {
    number: "04",
    title: "Competitive mathematics",
    description:
      "Strengthening logical reasoning through challenging problems and team competitions.",
  },
];

const experiences = [
  {
    period: "Jun 2026 — Present",
    role: "Research Intern",
    organization: "Columbia Engineering",
    description:
      "Supporting active engineering research through data collection and analysis, interface design, database development, and research documentation.",
  },
  {
    period: "Mar — May 2026",
    role: "Engineering & AI Student",
    organization: "MIT Beaver Works Institute",
    description:
      "Designed engineering and coding projects around real-world challenges while exploring artificial intelligence and emerging technologies in teams.",
  },
  {
    period: "Jul 2025 — May 2026",
    role: "Technical Researcher",
    organization: "America On Tech",
    description:
      "Developed coding, leadership, and professional skills through Tech Flex Leaders and built an AI-powered chatbot during an intensive AI foundations program.",
  },
  {
    period: "Oct 2025 — May 2026",
    role: "Lead",
    organization: "ACE Mentor Program",
    description:
      "Explored practical engineering and building design, including foundational mechanical, electrical, and plumbing concepts.",
  },
  {
    period: "Jun — Aug 2024",
    role: "Student Developer",
    organization: "All Star Code",
    description:
      "Built a personal portfolio and interactive JavaScript projects while learning HTML, CSS, coding fundamentals, and technology career skills.",
  },
];

const learningGoals = [
  "Build clear, user-centered interfaces",
  "Strengthen full-stack development fundamentals",
  "Turn research and ideas into useful digital products",
];

export default function Home() {
  return (
    <main id="top">
      <nav className="nav" aria-label="Main navigation">
        <a className="wordmark" href="#top" aria-label="Back to the top">
          Simanto<span>.</span>
        </a>
        <div className="navLinks">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#learning">Learning</a>
        </div>
        <div className="navActions">
          <a className="navTextButton" href="/questionnaire">
            Questions
          </a>
          <a className="navButton" href="/dashboard">
            Dashboard
          </a>
        </div>
      </nav>

      <section className="hero">
        <div className="heroGlow" aria-hidden="true" />
        <div className="heroCopy">
          <div className="availability">
            <span aria-hidden="true" /> New York · Student researcher &amp;
            builder
          </div>
          <h1>
            Hi, I&apos;m <span>Simanto.</span>
          </h1>
          <p className="heroIntro">
            I&apos;m Simanto Kumar Sen, a high school student exploring how
            engineering, research, artificial intelligence, and code can solve
            meaningful problems.
          </p>
          <div className="heroActions">
            <a className="button primary" href="#experience">
              View my experience <span aria-hidden="true">↓</span>
            </a>
            <a
              className="button secondary"
              href="https://www.linkedin.com/in/simanto-kumar-sen-016285424/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <aside className="nowCard" aria-label="What I am currently focused on">
          <div className="cardTop">
            <span>Currently</span>
            <span className="cardDot" aria-hidden="true" />
          </div>
          <p>Supporting engineering research at Columbia Engineering.</p>
          <div className="skillTags" aria-label="Current areas of focus">
            <span>Research</span>
            <span>Data</span>
            <span>Interface design</span>
          </div>
          <div className="cardFooter">
            <span>2026</span>
            <span>Columbia Engineering</span>
          </div>
        </aside>
      </section>

      <section className="section aboutSection" id="about">
        <div className="sectionHeading">
          <p className="sectionLabel">01 — About</p>
          <h2>
            Curious about how
            <br />
            ideas become impact.
          </h2>
        </div>
        <div className="aboutCopy">
          <p className="lead">
            I&apos;m a student at Manhattan Center for Science &amp;
            Mathematics with a growing foundation in engineering, research,
            coding, and collaborative problem-solving.
          </p>
          <p>
            From research at Columbia Engineering to team projects at MIT
            Beaver Works and America On Tech, I enjoy learning by building,
            testing ideas, and explaining what I discover.
          </p>
          <div className="profileFacts" aria-label="Academic highlights">
            <div>
              <span>Class of</span>
              <strong>2027</strong>
            </div>
            <div>
              <span>GPA</span>
              <strong>99.8%</strong>
            </div>
            <div>
              <span>SAT</span>
              <strong>1470</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="interests">
        <div className="sectionIntro">
          <div>
            <p className="sectionLabel">02 — Interests</p>
            <h2>
              Where I focus
              <br />
              my curiosity.
            </h2>
          </div>
          <p>
            The technical and academic areas I keep exploring through projects,
            programs, and research.
          </p>
        </div>
        <div className="interestGrid">
          {interests.map((interest) => (
            <article className="interestCard" key={interest.number}>
              <span className="cardNumber">{interest.number}</span>
              <h3>{interest.title}</h3>
              <p>{interest.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section experienceSection" id="experience">
        <div className="experienceIntro">
          <div>
            <p className="sectionLabel">03 — Selected experience</p>
            <h2>
              Learning in
              <br />
              real environments.
            </h2>
          </div>
          <p>
            Programs and roles that have shaped how I approach engineering,
            research, technology, and teamwork.
          </p>
        </div>
        <div className="experienceList">
          {experiences.map((experience) => (
            <article
              className="experienceItem"
              key={`${experience.organization}-${experience.role}`}
            >
              <time>{experience.period}</time>
              <div>
                <h3>{experience.role}</h3>
                <p className="experienceOrg">{experience.organization}</p>
              </div>
              <p className="experienceDescription">
                {experience.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section learningSection" id="learning">
        <div className="learningCopy">
          <p className="sectionLabel">04 — In this class</p>
          <h2>
            Building skills
            <br />
            that connect.
          </h2>
          <p>
            I want to connect my research and engineering experience with the
            ability to design and build polished digital products.
          </p>
        </div>
        <ol className="goalList">
          {learningGoals.map((goal, index) => (
            <li key={goal}>
              <span>0{index + 1}</span>
              <p>{goal}</p>
              <span className="goalArrow" aria-hidden="true">
                ↗
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="connect" id="connect">
        <p className="sectionLabel">05 — Connect</p>
        <h2>
          Let&apos;s build something
          <br />
          meaningful.
        </h2>
        <p>Connect with me to talk about engineering, research, or technology.</p>
        <div className="socialLinks">
          <a
            href="https://github.com/simanto7711"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
          <a
            href="https://www.linkedin.com/in/simanto-kumar-sen-016285424/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn ↗
          </a>
          <a href="mailto:ss7711@columbia.edu">Email ↗</a>
        </div>
      </section>

      <footer>
        <a className="wordmark" href="#top">
          Simanto<span>.</span>
        </a>
        <p>Research · Engineering · Technology</p>
        <p>© 2026</p>
      </footer>
    </main>
  );
}
