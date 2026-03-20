import type { Message } from '../types/message';

const BASE_URL = "http://localhost:3000/api/v1/messages";
const TOKEN = "super-secret-doodle-token";

export interface PostMessagePayload {
  message: string;
  author: string;
}

/**
 * Standard headers used for all authenticated requests
 */
const getHeaders = () => ({
  'Authorization': `Bearer ${TOKEN}`,
  'Content-Type': 'application/json',
});

/**
 * Fetches messages
 */
export const fetchMessages = async (after?: string, limit: number = 20): Promise<Message[]> => {
  const params = new URLSearchParams();
  
  if (after) {
    params.append('after', after);
  }
  
  params.append('limit', limit.toString());

  const url = `${BASE_URL}?${params.toString()}`;
  
  try {
    const response = await fetch(url, {
      headers: getHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error ${response.status}: Failed to fetch`);
    }

    const data: Message[] = await response.json();
    
    return data; 
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

/**
 * Sends a new message to the API
 */
export const postMessage = async (payload: PostMessagePayload): Promise<Message> => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: Could not send message`);
    }

    return await response.json();
  } catch (error) {
    console.error("Post error:", error);
    throw error;
  }
};
