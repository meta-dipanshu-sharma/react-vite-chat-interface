const BASE_URL = "http://localhost:3000/api/v1";
const TOKEN = "super-secret-doodle-token";

export async function fetchMessages() {
  const res = await fetch(`${BASE_URL}/messages`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch messages");

  return res.json();
}

export async function sendMessage(message: string, author: string) {
  const res = await fetch(`${BASE_URL}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, author }),
  });

  if (!res.ok) throw new Error("Failed to send message");

  return res.json();
}
