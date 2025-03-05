import React from 'react'
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";

const EmailInput = ({ emailText, setEmailText }) => {
  return (
    <>
     <div className="w-full">
  <label className="block text-lg font-semibold text-gray-800 mb-2">
    Enter Your Email:
  </label>
  <textarea
    value={emailText}
    onChange={(e) => setEmailText(e.target.value)}
    placeholder="Type your email here..."
    className="w-full h-40 p-4 border border-gray-300 rounded-xl shadow-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-gray-800 transition-all duration-300 ease-in-out hover:border-blue-400"
  />
</div>

    </>
  )
}

export default EmailInput