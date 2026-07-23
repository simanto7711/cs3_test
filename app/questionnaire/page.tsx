import type { Metadata } from "next";
import Link from "next/link";
import "./questionnaire.css";

export const metadata: Metadata = {
  title: "Interview Questionnaire — Simanto",
  description: "The questions used during Simanto's interview sessions.",
};

const questions = [
  {
    id: 1,
    type: "Multiple choice",
    question: "What neighborhood or borough do you live in?",
    options: ["Bronx", "Manhattan", "Queens", "Brooklyn", "Staten Island"],
  },
  {
    id: 2,
    type: "Open response",
    question: "Do you usually walk in your neighborhood and why?",
  },
  {
    id: 3,
    type: "Open response",
    question:
      "Is there anything that makes it hard for you to walk in your neighborhood? (Cracked sidewalks, garbage, construction, e-bikes or delivery bikes, flooded curbs on rainy days, etc.)",
  },
  {
    id: 4,
    type: "Open response",
    question: "Which mode of transportation in NYC do you prefer and why?",
  },
  {
    id: 5,
    type: "Open response",
    question:
      "Tell me a story about an issue you had using public transportation?",
  },
  {
    id: 6,
    type: "Open response",
    question:
      "Do you feel streets in Harlem are safe for pedestrians to walk in terms of accidents?",
  },
  {
    id: 7,
    type: "Open response",
    question:
      "Has there been anything that has happened to you that made you feel unsafe as a pedestrian (e.g., cars, buses, e-bikes, motorcycles, scooters, etc.)?",
  },
  {
    id: 8,
    type: "Open response",
    question: "How do you think public transportation can be improved?",
  },
];

export default function QuestionnairePage() {
  return (
    <main className="questionnairePage">
      <nav className="questionnaireNav" aria-label="Questionnaire navigation">
        <Link className="wordmark" href="/">
          Simanto<span>.</span>
        </Link>
        <div className="questionnaireNavTitle">Questionnaire</div>
        <Link className="questionnaireBackLink" href="/dashboard">
          View dashboard
        </Link>
      </nav>

      <header className="questionnaireHeader">
        <p>Interview guide</p>
        <h1>Questions we asked</h1>
        <div className="questionnaireIntro">
          <p>
            These eight questions guided our conversations about walking,
            transportation, and pedestrian safety in New York City.
          </p>
          <span>8 questions</span>
        </div>
      </header>

      <section className="questionList" aria-label="Interview questions">
        {questions.map((question) => (
          <article className="questionCard" key={question.id}>
            <div className="questionCardNumber">
              {String(question.id).padStart(2, "0")}
            </div>
            <div className="questionCardContent">
              <span className="questionType">{question.type}</span>
              <h2>{question.question}</h2>
              {question.options && (
                <ol className="optionList">
                  {question.options.map((option) => (
                    <li key={option}>{option}</li>
                  ))}
                </ol>
              )}
            </div>
          </article>
        ))}
      </section>

      <footer className="questionnaireFooter">
        <p>Interview questionnaire</p>
        <Link href="/dashboard">Explore the responses →</Link>
      </footer>
    </main>
  );
}
