import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_PUBLIC_KEY
      );
      toast.success("Message sent successfully!");
      formRef.current.reset();
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-20">
      <div className="text-center mb-16">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900">Contact Us</h1>
      <p className="text-gray-600 max-w-2xl mx-auto text-lg">
        Have a question or concern? We're here to help. Reach out to us using
        the form below, and we'll get back to you as soon as possible.
      </p>
      </div>

      <div className="max-w-md mx-auto">
      <div>
        <div className="bg-white p-10 rounded-lg shadow-xl border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Send us a message</h2>
        <form className="space-y-6" ref={formRef} onSubmit={handleSubmit}>
          <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            placeholder="Enter your name"
          />
          </div>
          <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            placeholder="Enter your email"
          />
          </div>
          <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            name="message"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            placeholder="Write your message here"
          ></textarea>
          </div>
          <button
          type="submit"
          className={`w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting}
          >
          {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
        </div>
      </div>
      </div>
    </div>
  );
}
