import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  CheckCircle2,
  PhoneCall,
} from "lucide-react";
import { useModal } from "../../context/ModalContext";

export const LiveChatWidget: React.FC = () => {
  const { openAdvisorModal } = useModal();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    Array<{ sender: "bot" | "user"; text: string }>
  >([
    {
      sender: "bot",
      text: "Hello! 👋 Welcome to Care International  Academy London. How can we assist you with our accredited qualifications or student admissions today?",
    },
  ]);
  const [input, setInput] = useState("");

  const quickPrompts = [
    "How do I get an SIA licence?",
    "What are the course dates for CSCS?",
    "Tell me about University Top-Up",
    "How much is the deposit?",
  ];

  const handleSend = (userText: string) => {
    if (!userText.trim()) return;

    const newMsgs = [...messages, { sender: "user" as const, text: userText }];
    setMessages(newMsgs);
    setInput("");

    // Generate intelligent instant bot replies
    setTimeout(() => {
      let botResponse =
        "Thank you for your question! Our course advisors are ready to assist you in detail.";
      const lower = userText.toLowerCase();

      if (lower.includes("sia") || lower.includes("security")) {
        botResponse =
          "Our SIA Door Supervisor (6-Day) and CCTV (3-Day) courses run weekly at our London campus. Tuition starts from £199 with a free re-sit guarantee and exam portal access!";
      } else if (lower.includes("cscs") || lower.includes("construction")) {
        botResponse =
          "Our 1-Day CSCS Green Card training includes the Level 1 Health & Safety in Construction Environment award plus CITB test booking support for £149.";
      } else if (
        lower.includes("top-up") ||
        lower.includes("university") ||
        lower.includes("degree")
      ) {
        botResponse =
          "Care International  Academy offers Ofqual Level 4 & 5 Extended Diplomas (240 credits) which give you direct progression into the final Year 3 (Top-Up) of UK Bachelor Degrees, saving you over £25,000!";
      } else if (
        lower.includes("deposit") ||
        lower.includes("cost") ||
        lower.includes("fee") ||
        lower.includes("price")
      ) {
        botResponse =
          "You can secure your seat in any upcoming batch with a £99 deposit! We also offer 0% interest monthly instalment plans for higher diplomas.";
      } else if (
        lower.includes("visa") ||
        lower.includes("international") ||
        lower.includes("cas")
      ) {
        botResponse =
          "We support international students from over 40 countries with CAS issuance, 28-day financial rule validation, and UK Student Route visa guidance.";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: botResponse,
        },
      ]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="w-[340px] sm:w-[380px] h-[480px] bg-white/85 dark:bg-slate-900/85 backdrop-blur-2xl rounded-3xl border border-white/80 dark:border-white/10 shadow-2xl flex flex-col overflow-hidden mb-3"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-950/90 via-slate-900/90 to-violet-950/90 backdrop-blur-xl p-4 text-white flex items-center justify-between border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-bold border border-white/20">
                  <Bot className="w-5 h-5 text-cyan-300" />
                </div>
                <div>
                  <h4 className="text-sm font-bold font-display leading-tight">
                    Care International Academy Live Desk
                  </h4>
                  <div className="flex items-center space-x-1.5 text-[11px] text-cyan-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Advisors Online Now</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl hover:bg-white/20 transition-colors text-white"
                aria-label="Close live chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/60 dark:bg-slate-950/60 backdrop-blur-sm text-xs">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[82%] p-3 rounded-2xl leading-relaxed ${
                      m.sender === "user"
                        ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-br-none shadow-md"
                        : "bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-slate-800 dark:text-slate-200 rounded-bl-none border border-white/80 dark:border-white/10 shadow-xs"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Prompts */}
            <div className="px-3 py-2.5 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-t border-white/60 dark:border-white/10 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  className="px-3 py-1 rounded-full bg-white/90 dark:bg-slate-800/90 border border-white/80 dark:border-white/10 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:border-indigo-400 whitespace-nowrap transition-colors flex-shrink-0 shadow-xs"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="p-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-white/60 dark:border-white/10 flex items-center space-x-2"
            >
              <input
                type="text"
                placeholder="Ask about courses, fees, or visas..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors flex-shrink-0 shadow-md shadow-indigo-600/25"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Launcher Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 text-white shadow-xl shadow-indigo-600/30 flex items-center space-x-2.5 font-bold text-xs sm:text-sm border border-white/20"
        aria-label="Open live chat desk"
      >
        <MessageSquare className="w-5 h-5 text-cyan-300" />
        <span className="hidden sm:inline">Ask Admissions / Live Chat</span>
      </motion.button>
    </div>
  );
};
