"use client";
import ChatbotWidget from "fyrebot-widget";

export default function HomeChatbot() {
  return (
    <ChatbotWidget
      apiUrl="https://api.fyreway.com/api"
      apiKey="sk_Eul4xSznW_uisLy8wBi1k4Nfb6jaGXmB"
      primaryColor="#000ff"
      title="Chat with Aasim"
      subtitle="Ask about my experience and projects"
      suggestedQuestions={[
        { id: "0", question: "Who is Aasim Shah?" },
        { id: "1", question: "What services do you offer?" },
        { id: "2", question: "Can you tell me about your experience?" },
        { id: "3", question: "What technologies do you specialize in?" },
      ]}
    />
  );
}
