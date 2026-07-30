export const generateWebsitePlan = async (prompt: string): Promise<string> => {
  try {
    const response = await fetch('/api/generate-plan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to generate website plan.');
    }

    return data.result || 'Failed to generate website plan.';
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    throw new Error(error?.message || 'Failed to connect to the FBX engine. Please try again.');
  }
};
