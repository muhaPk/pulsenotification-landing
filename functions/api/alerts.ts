export async function onRequest(context: EventContext<unknown, string, unknown>) {
  const apiUrl = context.env.API_BASE_URL || 'https://api.pulsenotification.com/api/v1';
  const url = `${apiUrl}/public/alerts`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
