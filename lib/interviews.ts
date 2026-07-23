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
  id: string;
  participant?: string;
  status?: string;
};

const sessionPaths = [
  "/api/sessions",
  "/sessions",
  "/api/interviews",
  "/interviews",
  "/api/survey-responses",
  "/survey-responses",
];

const interviewerKeys = [
  "interviewer_email",
  "interviewerEmail",
  "student_interviewer_email",
  "conducted_by",
  "conductedBy",
];

export async function getInterviewSessions(): Promise<InterviewSession[]> {
  const baseUrl = process.env.FASTAPI_BASE_URL?.replace(/\/$/, "");
  const apiKey = process.env.SURVEY_API_KEY;
  const interviewerEmail = process.env.STUDENT_INTERVIEWER_EMAIL;

  if (!baseUrl || !apiKey || !interviewerEmail) {
    throw new Error("The interview server settings are incomplete.");
  }

  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${apiKey}`,
    "X-API-Key": apiKey,
    "X-Survey-API-Key": apiKey,
  };

  for (const path of sessionPaths) {
    const url = new URL(`${baseUrl}${path}`);
    url.searchParams.set("interviewer_email", interviewerEmail);

    let response: Response;
    try {
      response = await fetch(url, {
        cache: "no-store",
        headers,
        signal: AbortSignal.timeout(8000),
      });
    } catch {
      throw new Error("The interview server could not be reached.");
    }

    if (response.status === 404) continue;

    if (!response.ok) {
      throw new Error(`The interview server returned ${response.status}.`);
    }

    const payload: unknown = await response.json();
    return normalizeSessions(payload, interviewerEmail);
  }

  throw new Error("The interview sessions endpoint was not found.");
}

function normalizeSessions(
  payload: unknown,
  interviewerEmail: string,
): InterviewSession[] {
  const items = extractItems(payload);
  const datasetIncludesInterviewer = items.some((item) =>
    Boolean(readText(item, interviewerKeys)),
  );

  const matchingItems = items.filter((item) => {
    const recordedEmail = readText(item, interviewerKeys);
    if (!datasetIncludesInterviewer) return true;
    return recordedEmail?.toLowerCase() === interviewerEmail.toLowerCase();
  });

  const sessions = new Map<string, InterviewSession>();

  matchingItems.forEach((item, itemIndex) => {
    const sessionId =
      readText(item, ["session_id", "sessionId", "id", "uuid"]) ??
      `session-${itemIndex + 1}`;
    const nestedAnswers = readArray(item, [
      "answers",
      "responses",
      "questions",
      "qa_pairs",
      "turns",
    ]);

    const existing = sessions.get(sessionId) ?? {
      answers: [],
      date: readText(item, [
        "completed_at",
        "completedAt",
        "created_at",
        "createdAt",
        "started_at",
        "startedAt",
        "timestamp",
        "date",
      ]),
      id: sessionId,
      participant: readText(item, [
        "participant_name",
        "participantName",
        "respondent_name",
        "respondentName",
        "participant_email",
        "participantEmail",
        "respondent_email",
        "respondentEmail",
      ]),
      status: readText(item, ["status", "state"]),
    };

    if (nestedAnswers.length > 0) {
      nestedAnswers.forEach((answer, answerIndex) => {
        const normalized = normalizeAnswer(answer, answerIndex);
        if (normalized) existing.answers.push(normalized);
      });
    } else {
      const normalized = normalizeAnswer(item, existing.answers.length);
      if (normalized) existing.answers.push(normalized);
    }

    sessions.set(sessionId, existing);
  });

  return Array.from(sessions.values()).sort((a, b) => {
    const aTime = a.date ? Date.parse(a.date) : 0;
    const bTime = b.date ? Date.parse(b.date) : 0;
    return bTime - aTime;
  });
}

function normalizeAnswer(
  value: UnknownRecord,
  index: number,
): InterviewAnswer | null {
  const question = readText(value, [
    "question",
    "question_text",
    "questionText",
    "prompt",
    "label",
  ]);
  const originalAnswer = readText(value, [
    "answer",
    "answer_text",
    "answerText",
    "response",
    "response_text",
    "responseText",
    "value",
  ]);
  const correctedAnswer = readText(value, [
    "corrected_answer",
    "correctedAnswer",
    "edited_answer",
    "editedAnswer",
    "final_answer",
    "finalAnswer",
  ]);

  if (!question && !originalAnswer && !correctedAnswer) return null;

  return {
    answer: correctedAnswer ?? originalAnswer ?? "No answer recorded.",
    originalAnswer,
    question: question ?? `Question ${index + 1}`,
    wasCorrected: Boolean(
      correctedAnswer && correctedAnswer !== originalAnswer,
    ),
  };
}

function extractItems(payload: unknown): UnknownRecord[] {
  if (Array.isArray(payload)) return payload.filter(isRecord);
  if (!isRecord(payload)) return [];

  for (const key of [
    "sessions",
    "interviews",
    "results",
    "items",
    "records",
    "responses",
    "data",
  ]) {
    const candidate = payload[key];
    if (Array.isArray(candidate)) return candidate.filter(isRecord);
    if (isRecord(candidate)) {
      const nested = extractItems(candidate);
      if (nested.length > 0) return nested;
    }
  }

  return [payload];
}

function readArray(record: UnknownRecord, keys: string[]): UnknownRecord[] {
  for (const key of keys) {
    const value = record[key];
    if (Array.isArray(value)) return value.filter(isRecord);
  }
  return [];
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
