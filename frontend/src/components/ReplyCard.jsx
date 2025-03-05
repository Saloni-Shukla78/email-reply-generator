import React from 'react'

const ReplyCard = ({ reply }) => {
    if (!reply) return null;
  return (
    <>
   <div className="w-full bg-white p-6 rounded-2xl shadow-xl border border-gray-300">
  <h3 className="text-xl font-bold text-gray-900">Generated Reply</h3>
  <p className="mt-3 text-gray-700 text-lg leading-relaxed">{reply}</p>
</div>

    </>
  )
}

export default ReplyCard