import type { Metadata } from "next";
import Link from "next/link";
import { getInterviewSessions } from "@/lib/interviews";
import "./dashboard.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Interview Dashboard — Simanto",
  description: "Interview sessions conducted by Simanto Sen.",
};

function formatDate(value?: string) {
  if (!value) return "Date not recorded";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default async function DashboardPage() {
  let sessions = [] as Awaited<ReturnType<typeof getInterviewSessions>>;
  let errorMessage: string | null = null;

  try {
    sessions = await getInterviewSessions();
  } catch (error) {
    errorMessage =
      error instanceof Error
        ? error.message
        : "The interview data could not be loaded.";
  }

  const answerCount = sessions.reduce(
    (total, session) => total + session.answers.length,
    0,
  );
  const correctedCount = sessions.reduce(
    (total, session) =>
      total + session.answers.filter((answer) => answer.wasCorrected).length,
    0,
  );

  return (
    <main className="dashboardPage">
      <nav className="dashboardNav" aria-label="Dashboard navigation">
        <Link className="wordmark" href="/">
          Simanto<span>.</span>
        </Link>
        <div className="dashboardNavTitle">Interview dashboard</div>
        <Link className="backLink" href="/">
          ← Profile
        </Link>
      </nav>

      <header className="dashboardHeader">
        <div>
          <p className="dashboardEyebrow">Research archive</p>
          <h1>Interview sessions</h1>
          <p className="dashboardIntro">
            Questions and answers from sessions conducted by Simanto Sen.
            Corrected responses are shown whenever they are available.
          </p>
        </div>
        <div className="dashboardIdentity">
          <span>Interviewer</span>
          <strong>{process.env.STUDENT_NAME ?? "Simanto Sen"}</strong>
          <small>{process.env.STUDENT_INTERVIEWER_EMAIL}</small>
        </div>
      </header>

      <section className="metricGrid" aria-label="Interview summary">
        <article>
          <span>Sessions</span>
          <strong>{sessions.length}</strong>
        </article>
        <article>
          <span>Answers</span>
          <strong>{answerCount}</strong>
        </article>
        <article>
          <span>Corrections used</span>
          <strong>{correctedCount}</strong>
        </article>
      </section>

      {errorMessage ? (
        <section className="dashboardState" role="alert">
          <span className="stateIcon">!</span>
          <div>
            <h2>Interview server unavailable</h2>
            <p>{errorMessage} Please try this page again shortly.</p>
            <a className="retryLink" href="/dashboard">Retry connection</a>
          </div>
        </section>
      ) : sessions.length === 0 ? (
        <section className="dashboardState">
          <span className="stateIcon">0</span>
          <div>
            <h2>No sessions yet</h2>
            <p>No interview sessions were found for this interviewer.</p>
          </div>
        </section>
      ) : (
        <section className="sessionList" aria-label="Interview sessions">
          {sessions.map((session, sessionIndex) => (
            <article className="sessionCard" key={session.id}>
              <header className="sessionHeader">
                <div className="sessionIndex">{String(sessionIndex + 1).padStart(2, "0")}</div>
                <div>
                  <p>Session {sessionIndex + 1}</p>
                  <h2>{session.participant ?? "Anonymous participant"}</h2>
                </div>
                <div className="sessionMeta">
                  {session.status && <span>{session.status}</span>}
                  <time>{formatDate(session.date)}</time>
                </div>
              </header>

              {session.hasAudio && (
                <section className="recordingPanel" aria-label="Session recording">
                  <div>
                    <span>Audio recording</span>
                    <p>Listen to the recording from this interview session.</p>
                  </div>
                  <audio
                    controls
                    preload="metadata"
                    src={`/api/interview-audio?sessionId=${encodeURIComponent(session.id)}`}
                  >
                    Your browser does not support audio playback.
                  </audio>
                </section>
              )}

              <section
                className="transcriptionPanel"
                aria-label={`Transcription for session ${sessionIndex + 1}`}
              >
                <div className="transcriptionHeading">
                  <span>Transcript</span>
                  <h3>Full interview transcription</h3>
                </div>
                {session.transcription ? (
                  <div className="transcriptionText">
                    {session.transcription}
                  </div>
                ) : (
                  <p className="transcriptionEmpty">
                    No transcription is available for this session.
                  </p>
                )}
              </section>

              <div className="answerList">
                {session.answers.length === 0 ? (
                  <p className="noAnswers">No questions were recorded for this session.</p>
                ) : (
                  session.answers.map((answer, answerIndex) => (
                    <section className="answerRow" key={`${session.id}-${answerIndex}`}>
                      <div className="questionNumber">Q{answerIndex + 1}</div>
                      <div className="answerContent">
                        <h3>{answer.question}</h3>
                        <p>{answer.answer}</p>
                        {answer.wasCorrected && (
                          <div className="correctedNote">
                            <span>Corrected answer</span>
                            {answer.originalAnswer && (
                              <details>
                                <summary>View original</summary>
                                <p>{answer.originalAnswer}</p>
                              </details>
                            )}
                          </div>
                        )}
                      </div>
                    </section>
                  ))
                )}
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
