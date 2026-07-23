const interests = [
  {
    number: "01",
    title: "Web development",
    description: "Turning ideas into useful, responsive experiences.",
  },
  {
    number: "02",
    title: "Creative thinking",
    description: "Finding simple and thoughtful ways to solve problems.",
  },
  {
    number: "03",
    title: "New technology",
    description: "Learning how modern tools shape the way we create.",
  },
  {
    number: "04",
    title: "Connecting with people",
    description: "Sharing ideas, listening, and learning from others.",
  },
];

const learningGoals = [
  "Write clean, understandable code",
  "Design responsive interfaces",
  "Turn an idea into a working project",
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
          <a href="#interests">Interests</a>
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
            <span aria-hidden="true" /> Student &amp; curious builder
          </div>
          <h1>
            Hi, I&apos;m <span>Simanto.</span>
          </h1>
          <p className="heroIntro">
            I&apos;m learning how technology, design, and a good idea can come
            together to create something meaningful.
          </p>
          <div className="heroActions">
            <a className="button primary" href="#about">
              Explore my story <span aria-hidden="true">↓</span>
            </a>
            <a className="button secondary" href="mailto:hello@example.com">
              Say hello <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <aside className="nowCard" aria-label="What I am currently focused on">
          <div className="cardTop">
            <span>Now</span>
            <span className="cardDot" aria-hidden="true" />
          </div>
          <p>Learning the foundations of modern web development.</p>
          <div className="skillTags" aria-label="Skills I am exploring">
            <span>Next.js</span>
            <span>TypeScript</span>
            <span>Design</span>
          </div>
          <div className="cardFooter">
            <span>01</span>
            <span>Keep exploring</span>
          </div>
        </aside>
      </section>

      <section className="section aboutSection" id="about">
        <div className="sectionHeading">
          <p className="sectionLabel">01 — About</p>
          <h2>Curious by nature.<br />Learning by doing.</h2>
        </div>
        <div className="aboutCopy">
          <p className="lead">
            I enjoy asking questions, trying new things, and understanding how
            ideas become real projects.
          </p>
          <p>
            This website is one of my first steps into web development. Outside
            of class, you can usually find me exploring a new hobby, spending
            time with friends, or collecting ideas for the next thing I want to
            build.
          </p>
        </div>
      </section>

      <section className="section" id="interests">
        <div className="sectionIntro">
          <div>
            <p className="sectionLabel">02 — Interests</p>
            <h2>Things that keep<br />me curious.</h2>
          </div>
          <p>The subjects and ideas I naturally come back to.</p>
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

      <section className="section learningSection" id="learning">
        <div className="learningCopy">
          <p className="sectionLabel">03 — In this class</p>
          <h2>Building skills<br />that last.</h2>
          <p>
            I want to move from simply using technology to understanding how
            to create with it confidently.
          </p>
        </div>
        <ol className="goalList">
          {learningGoals.map((goal, index) => (
            <li key={goal}>
              <span>0{index + 1}</span>
              <p>{goal}</p>
              <span className="goalArrow" aria-hidden="true">↗</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="connect" id="connect">
        <p className="sectionLabel">04 — Connect</p>
        <h2>Let&apos;s make something<br />worth sharing.</h2>
        <p>Find me online or send me a note.</p>
        <div className="socialLinks">
          <a href="https://github.com/" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href="mailto:hello@example.com">Email ↗</a>
        </div>
      </section>

      <footer>
        <a className="wordmark" href="#top">Simanto<span>.</span></a>
        <p>Designed &amp; built with curiosity</p>
        <p>© 2026</p>
      </footer>
    </main>
  );
}
