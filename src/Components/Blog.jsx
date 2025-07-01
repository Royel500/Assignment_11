import React from 'react';

const Blog = () => {
  const blogPosts = [
    {
      title: "📚 How This Platform Helps Students",
      content:
        "Our assignment platform allows students to explore, submit, and manage assignments in an organized way. With categorized difficulties and deadlines, students can plan their studies effectively. Real-time feedback helps them grow academically.",
    },
    {
      title: "🧑‍🏫 For Teachers: Create & Manage Assignments",
      content:
        "Teachers can create assignments with details like title, description, marks, difficulty level, and due date. They can also evaluate student submissions, give feedback, and mark assignments — all from one dashboard.",
    },
    {
      title: "🔐 Why We Use Protected Routes",
      content:
        "Some pages like 'Create Assignment' and 'Pending Assignments' are only accessible to logged-in users. This ensures data security and user-specific control over actions such as submissions and evaluations.",
    },
    {
      title: "🎯 Features You’ll Love",
      content:
        "✔ Dark/Light theme toggle\n✔ Animated UI with Framer Motion\n✔ Secure login/signup\n✔ Feedback and Marks system\n✔ Mobile responsive design",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-5 py-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-600">📖 Assignment Platform Blog</h1>
      <div className="space-y-8">
        {blogPosts.map((post, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 p-6 rounded-xl shadow-lg border border-gray-200"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">{post.title}</h2>
            <p className="text-gray-700 whitespace-pre-line">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
