'use server'

export async function fetchBeehiivPosts() {
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;
  const apiToken = process.env.BEEHIIV_API_TOKEN;

  if (!publicationId || !apiToken) {
    throw new Error('Beehiiv API credentials are not set');
  }

  try {
    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/posts`,
      {
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 }, // Cache for 1 hour on the server
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch posts from Beehiiv API');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching Beehiiv posts:', error);
    throw error;
  }
}