import { Helmet } from "react-helmet";

export const FAQ = () => {
  return (
    <div className="bg-[#F0FFE0] min-h-screen text-black">
      <Helmet>
        <title>Frequently Asked Questions | Study Smarter Now</title>
        <meta name="description" content="Get answers to frequently asked questions about Study Smarter Now, a platform that offers effective study tips, test-taking strategies, and personalized recommendations to help students achieve academic success." />
        <link rel="canonical" href="https://studysmarternow.com/faq" />
      </Helmet>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>

        <h2 className="text-2xl font-semibold mb-2">
          How does StudySmarterNow.com help with academic success?
        </h2>
        <p className="mb-4">
          StudySmarterNow.com uses AI-powered tools to provide homework help and improve learning strategies for college students. Our platform offers effective study tips, test-taking strategies, and personalized recommendations to help you achieve academic success.
        </p>

        <h2 className="text-2xl font-semibold mb-2">
          What makes StudySmarterNow.com different from other homework help websites?
        </h2>
        <p className="mb-4">
          Unlike other homework help websites, StudySmarterNow.com harnesses the power of artificial intelligence to analyze your study materials and provide tailored study tips and learning strategies. Our platform helps you optimize your study time and achieve better results in your college courses.
        </p>

        <h2 className="text-2xl font-semibold mb-2">
          How can I chat with my PDF file and generate study notes?
        </h2>
        <p className="mb-4">
          Our tool allows you to interact with your PDF files like never before. Simply upload your homework or study material in PDF format, and our AI tool will enable you to chat with it, ask questions, and generate study notes instantly. This interactive process enhances understanding and makes studying smarter and more efficient.
        </p>

        <h2 className="text-2xl font-semibold mb-2">
          Can I upload as many files as I want for free?
        </h2>
        <p className="mb-4">
          Yes, you can! We believe in providing accessible and quality education for all. At StudySmarterNow.com, you can upload as many PDF files as you want, free of charge. Our aim is to ensure that every student has the resources they need to succeed in their academic journey.
        </p>

        <h2 className="text-2xl font-semibold mb-2">
          What are some effective test-taking strategies I can use?
        </h2>
        <p className="mb-4">
          StudySmarterNow.com provides various AI-generated test-taking strategies based on your study materials. These may include time management techniques, understanding question patterns, focusing on understanding concepts rather than rote memorization, and more. Remember, the best strategy often depends on the specific test and individual learning style.
        </p>

      </div>
    </div>
  );
};
