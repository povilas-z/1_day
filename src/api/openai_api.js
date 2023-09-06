import axios from 'axios';

// Your API Key from OpenAI
const OPENAI_API_KEY = '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';

// Create an instance of axios with predefined defaults
const apiClient = axios.create({
  baseURL: 'https://api.openai.com',
  timeout: 100000,
  headers: {
    'Authorization': `Bearer ${OPENAI_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

export async function fetchChatGPT4Response(message){
  const requestBody = {
    model: 'gpt-3.5-turbo',  // the model version 
    messages: [
      {
        "role": "system",
        "content": "You are a helpful assistant."
      },
      {
        "role": "user",
        "content": message
      }
    ]
  };

  try {
    const response = await apiClient.post('/v1/chat/completions', requestBody);
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(error);
    return null;
  }
}


export async function generateTasks(goal){
  const requestBody = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        "role": "system",
        "content": "You are a helpful assistant."
      },
      {
        "role": "user",
        "content": 
        `I have a goal that I would like to achieve. 
        The goal is "${goal}". 
        Can you break down this goal into smaller actionable tasks? 
        Please provide these tasks in a list format. 
        I would like to achieve this goal over the course of a year and I would like each of these daily tasks to approximately take 18 minutes to complete. 
        Remember, these should be daily tasks for a year but for now can you provide me for now only the first weeks individual and unique tasks. 
        I would like your reply to include nothing but said tasks, in the following format "Task X: Y".`
      }
    ]
  };

  try {
    const response = await apiClient.post('/v1/chat/completions', requestBody);
    // Here, add some logic to process the response text into an array of tasks
    let tasks = response.data.choices[0].message.content.split('\n'); // Assuming the response tasks are separated by new lines
    return tasks;
  } catch (error) {
    console.error(error);
    return { error: error.message || 'An error occurred while generating tasks from OpenAI.' };  }
}

