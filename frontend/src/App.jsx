import { useState } from "react";
import EmailInput from "./components/EmailInput";
import GenerateButton from "./components/GenerateButton";
import ReplyCard from "./components/ReplyCard";


function App() {
  const [emailText, setEmailText] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setReply("");

    try {
      const response = await fetch("http://127.0.0.1:5001/generate-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email_text: emailText }),
      });

      const data = await response.json();
      setReply(data.reply);
    } catch (error) {
      console.error("Error generating reply:", error);
    }

    setLoading(false);
  };
  return (
    <>
    <div className="flex flex-col items-center p-8 space-y-6 max-w-2xl mx-auto">
  <h1 className="text-3xl font-bold text-gray-900">Email Reply Generator</h1>

  <div className="w-full p-6 bg-white shadow-2xl rounded-2xl border border-gray-200">
    <EmailInput emailText={emailText} setEmailText={setEmailText} />
    <GenerateButton onClick={handleSubmit} loading={loading} />
  </div>

  {reply && <ReplyCard reply={reply} />}
</div>

    
    </>
  )
}

export default App
