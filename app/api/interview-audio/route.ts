import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const baseUrl = process.env.FASTAPI_BASE_URL?.replace(/\/$/, "");
  const apiKey = process.env.SURVEY_API_KEY;
  const sessionId = request.nextUrl.searchParams.get("sessionId");

  if (!baseUrl || !apiKey || !sessionId) {
    return new Response("Audio is unavailable.", { status: 404 });
  }

  let target: URL;
  try {
    target = new URL(
      `${baseUrl}/admin/sessions/${encodeURIComponent(sessionId)}/audio`,
    );
  } catch {
    return new Response("Invalid recording request.", { status: 400 });
  }

  const headers: Record<string, string> = {
    Accept: "audio/*",
    "X-API-Key": apiKey,
  };
  const range = request.headers.get("range");
  if (range) headers.Range = range;

  let response: Response;
  try {
    response = await fetch(target, {
      cache: "no-store",
      headers,
      signal: AbortSignal.timeout(15000),
    });
  } catch {
    return new Response("The recording server could not be reached.", {
      status: 503,
    });
  }

  if (!response.ok && response.status !== 206) {
    return new Response("The recording could not be loaded.", {
      status: response.status,
    });
  }

  const responseHeaders = new Headers();
  for (const name of [
    "accept-ranges",
    "content-length",
    "content-range",
    "content-type",
  ]) {
    const value = response.headers.get(name);
    if (value) responseHeaders.set(name, value);
  }
  responseHeaders.set("Cache-Control", "private, no-store");

  return new Response(response.body, {
    headers: responseHeaders,
    status: response.status,
  });
}
