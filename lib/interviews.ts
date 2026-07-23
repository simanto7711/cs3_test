type UnknownRecord = Record<string, unknown>;

export type InterviewAnswer = {
  answer: string;
  originalAnswer?: string;
  question: string;
  wasCorrected: boolean;
};

export type InterviewSession = {
  answers: InterviewAnswer[];
  date?: string;
  hasAudio: boolean;
  id: string;
  participant?: string;
  status?: string;
  transcription?: string;
};

export async function getInterviewSessions(): Promise<InterviewSession[]> {
  const baseUrl = process.env.FASTAPI_BASE_URL?.replace(/\/$/, "");
  const apiKey = process.env.SURVEY_API_KEY;
  const interviewerEmail = process.env.STUDENT_INTERVIEWER_EMAIL;

  if (!baseUrl || !apiKey || !interviewerEmail) {
    throw new Error("The interview server settings are incomplete.");
  }

  const headers = {
    Accept: "application/json",
    "X-API-Key": apiKey,
  };

  const listPayload = await fetchJson(`${baseUrl}/admin/sessions`, headers);
  const summaries = extractSessions(listPayload).filter((session) => {
    const email = readText(session, ["interviewer_email"]);
    return email?.toLowerCase() === interviewerEmail.toLowerCase();
  });

  const sessions = await Promise.all(
    summaries.map(async (summary) => {
      const sessionId = readText(summary, ["session_id"]);
      if (!sessionId) return null;

      const detailPayload = await fetchJson(
        `${baseUrl}/admin/sessions/${encodeURIComponent(sessionId)}`,
        headers,
      );
      const detail = isRecord(detailPayload) ? detailPayload : {};
      return normalizeSession(summary, detail, sessionId);
    }),
  );

  return sessions
    .filter((session): session is InterviewSession => session !== null)
    .sort((a, b) => {
      const aTime = a.date ? Date.parse(a.date) : 0;
      const bTime = b.date ? Date.parse(b.date) : 0;
      return bTime - aTime;
    });
}

async function fetchJson(
  url: string,
  headers: Record<string, string>,
): Promise<unknown> {
  let response: Response;

  try {
    response = await fetch(url, {
      cache: "no-store",
      headers,
      signal: AbortSignal.timeout(10000),
    });
  } catch {
    throw new Error("The interview server could not be reached.");
  }

  if (!response.ok) {
    throw new Error(`The interview server returned ${response.status}.`);
  }

  return response.json();
}

function normalizeSession(
  summary: UnknownRecord,
  detail: UnknownRecord,
  sessionId: string,
): InterviewSession {
  const respondent = readRecord(detail, ["respondent_info"]);
  const audio = readRecord(detail, ["audio"]);
  const answers = readArray(detail, ["matched_questions"])
    .map(normalizeAnswer)
    .filter((answer): answer is InterviewAnswer => answer !== null);

  return {
    answers,
    date:
      readText(summary, ["created_at", "uploaded_at", "recorded_at_ms"]) ??
      readText(detail, ["timestamp"]),
    hasAudio: Boolean(
      readText(summary, ["audio_filename"]) ??
        readText(audio, ["file_name"]),
    ),
    id: sessionId,
    participant:
      readText(summary, ["respondent_name", "respondent_email"]) ??
      readText(respondent, ["name"]),
    status: readText(summary, ["status"]),
    transcription: readText(detail, ["transcription"]),
  };
}

function normalizeAnswer(
  value: UnknownRecord,
  index: number,
): InterviewAnswer | null {
  const question = readText(value, ["matched_question"]);
  const originalAnswer = readText(value, [
    "extracted_answer",
    "selected_option_labels",
    "selected_option_codes",
  ]);
  const finalAnswer = readText(value, ["final_answer"]);
  const answerSource = readText(value, ["answer_source"]);
  const wasCorrected =
    value.manually_clarified === true ||
    answerSource === "manual_clarification" ||
    Boolean(finalAnswer && originalAnswer && finalAnswer !== originalAnswer);

  if (!question && !originalAnswer && !finalAnswer) return null;

  return {
    answer: finalAnswer ?? originalAnswer ?? "No answer recorded.",
    originalAnswer,
    question: question ?? `Question ${index + 1}`,
    wasCorrected,
  };
}

function extractSessions(payload: unknown): UnknownRecord[] {
  if (Array.isArray(payload)) return payload.filter(isRecord);
  if (!isRecord(payload)) return [];
  return readArray(payload, ["sessions"]);
}

function readArray(record: UnknownRecord, keys: string[]): UnknownRecord[] {
  for (const key of keys) {
    const value = record[key];
    if (Array.isArray(value)) return value.filter(isRecord);
  }
  return [];
}

function readRecord(record: UnknownRecord, keys: string[]): UnknownRecord {
  for (const key of keys) {
    const value = record[key];
    if (isRecord(value)) return value;
  }
  return {};
}

function readText(
  record: UnknownRecord,
  keys: string[],
): string | undefined {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) return value.trim();
    if (typeof value === "number" || typeof value === "boolean") {
      return String(value);
    }
    if (Array.isArray(value)) {
      const text = value
        .filter((item) => ["string", "number", "boolean"].includes(typeof item))
        .join(", ");
      if (text) return text;
    }
  }
  return undefined;
}

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
