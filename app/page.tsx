const interests = [
  "Building useful websites",
  "Creative problem-solving",
  "Learning new technology",
  "Connecting with people",
];

const learningGoals = [
  "Write clean, understandable code",
  "Design responsive interfaces",
  "Turn an idea into a working project",
];

export default function Home() {
  return (
    <main>
      <nav className="nav" aria-label="Main navigation">
        <a className="wordmark" href="#top" aria-label="Back to the top">
          YN<span>.</span>
        </a>
        <div className="navLinks">
          <a href="#about">About</a>
          <a href="#learning">Learning</a>
          <a href="#connect">Connect</a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="eyebrow">Hello, I&apos;m</div>
        <h1>Your Name.</h1>
        <p className="heroIntro">
          I&apos;m a curious student learning how technology, design, and a good
          idea can come together to create something meaningful.
        </p>
        <div className="heroActions">
          <a className="button primary" href="#about">
            Get to know me <span aria-hidden="true">↓</span>
          </a>
          <a className="button secondary" href="mailto:hello@example.com">
            Say hello
          </a>
        </div>
        <div className="scrollNote" aria-hidden="true">
          <span /> Scroll to explore
        </div>
      </section>

      <section className="section" id="about">
        <p className="sectionNumber">01 / About me</p>
        <div className="sectionGrid">
          <h2>A little about<br />who I am.</h2>
          <div className="sectionContent">
            <p className="lead">
              I enjoy asking questions, trying new things, and learning by
              making. This site is one of my first steps into web development.
            </p>
            <p>
              Outside of class, you can usually find me exploring a new hobby,
              spending time with friends, or collecting ideas for the next
              thing I want to build.
            </p>
          </div>
        </div>
      </section>

      <section className="section interestsSection">
        <p className="sectionNumber">02 / My interests</p>
        <div className="interestList">
          {interests.map((interest, index) => (
            <div className="interestItem" key={interest}>
              <span>0{index + 1}</span>
              <h3>{interest}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="section learningSection" id="learning">
        <p className="sectionNumber light">03 / What I want to learn</p>
        <div className="learningGrid">
          <div>
            <h2>Learning by<br />doing.</h2>
            <p className="learningIntro">
              In this class, I want to move from simply using technology to
              understanding how to create with it.
            </p>
          </div>
          <ol className="goalList">
            {learningGoals.map((goal, index) => (
              <li key={goal}>
                <span>0{index + 1}</span>
                {goal}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="connect" id="connect">
        <p className="sectionNumber">04 / Let&apos;s connect</p>
        <h2>Want to say hello?</h2>
        <p>Find me online or send me a note.</p>
        <div className="socialLinks">
          <a href="https://github.com/" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href="mailto:hello@example.com">Email ↗</a>
        </div>
      </section>

      <footer>
        <p>Designed &amp; built by Your Name</p>
        <p>© 2026</p>
      </footer>
    </main>
  );
}
