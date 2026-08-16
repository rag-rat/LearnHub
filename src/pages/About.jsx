import styles from "./About.module.css";

function About() {
  return (
    <div className={styles.aboutPage}>
      <section className={styles.hero}>
        <h1>
          Learning should be
          <span> simple.</span>
        </h1>

        <p>
          LearnHub is a place to learn technical skills from the
          ground up. We focus on clear explanations, practical
          examples, and making difficult concepts easier to understand.
        </p>
      </section>

      <section className={styles.story}>
        <div className={styles.storyText}>
          <h2>Why LearnHub?</h2>

          <p>
            Learning programming can be overwhelming. There are
            countless tutorials, courses, and technologies to choose
            from, and it can be difficult to know where to begin.
          </p>

          <p>
            LearnHub was created with a simple idea: you shouldn't
            need to know everything before you start learning.
          </p>

          <p>
            Our courses start with the fundamentals and gradually
            build your understanding. Every concept is explained
            step by step so that you can learn at your own pace.
          </p>
        </div>

        <div className={styles.highlight}>
          <span>Learn.</span>
          <span>Understand.</span>
          <span>Build.</span>
        </div>
      </section>

      <section className={styles.values}>
        <h2>What you can expect</h2>

        <div className={styles.valueGrid}>
          <div className={styles.valueCard}>
            <h3>From Scratch</h3>
            <p>
              We start with the basics and build your knowledge
              step by step.
            </p>
          </div>

          <div className={styles.valueCard}>
            <h3>Clear Explanations</h3>
            <p>
              Complex technical concepts are broken down into
              simple, understandable ideas.
            </p>
          </div>

          <div className={styles.valueCard}>
            <h3>Practical Learning</h3>
            <p>
              Learn concepts that you can actually use to build
              real projects.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.finalSection}>
        <h2>
          Start learning.
          <span> Build something.</span>
        </h2>

        <p>
          Choose a course and start your journey with LearnHub.
        </p>
      </section>
    </div>
  );
}

export default About;