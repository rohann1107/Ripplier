import React, { useState } from 'react';
import { Sparkles, Play, Award, Timer, MessageSquare, Volume2, Users, HelpCircle, ChevronDown } from 'lucide-react';
import { CATEGORIES } from '../data/topics';

export const SEOContent: React.FC = () => {
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "What is a random topic generator?",
      a: "A random topic generator is an online tool that provides spontaneous prompts and ideas to speak, write, or discuss. Ripplier combines random topic generation with advanced tools like speech transcription, WPM tracking, and AI-powered coaching to create an immersive practice platform."
    },
    {
      q: "What is Ripplier?",
      a: "Ripplier is a premium interactive random topic generator and impromptu speaking practice platform designed to build confidence, improve communication skills, and sharpen critical thinking. It allows you to select category niches, spin the mechanical topic reel, prepare with a timer, record your speech, and receive instant AI coach feedback."
    },
    {
      q: "How does Ripplier's random topic generator work?",
      a: "Simply select a category filters (like Philosophy, Psychology, AI, or Technology), and pull the mechanical lever or press Spacebar. The reel decelerates dynamically to land on a curated thinking seed from our extensive database of thousands of high-quality topic prompts."
    },
    {
      q: "Can Ripplier help with public speaking practice?",
      a: "Absolutely! Ripplier is engineered specifically for public speaking and impromptu speech practice. It helps you prepare on-the-fly for events like Toastmasters Table Topics, presentations, school debates, or panels by training your brain to structure ideas quickly and speak without hesitating."
    },
    {
      q: "What are the research and speaking timers on Ripplier?",
      a: "The research timer gives you structured time (e.g. 60 seconds) to outline your main arguments, brainstorm points, and plan your thoughts before speaking. The speaking timer tracks your actual impromptu speech duration to help you manage your pacing and timing."
    },
    {
      q: "Does Ripplier transcribe speech and detect filler words?",
      a: "Yes! Ripplier uses real-time speech transcription to convert your spoken words into text. It automatically detects common filler words such as 'um', 'uh', 'like', 'you know', and 'so' to help you minimize verbal clutter and speak more eloquently."
    },
    {
      q: "What is WPM in speaking, and how does Ripplier analyze it?",
      a: "WPM stands for Words Per Minute. It is a key measure of your speaking speed. Ripplier analyzes your transcription duration and word count to show your speaking pace in real-time, helping you practice slowing down or speeding up to hit the optimal conversational rate (130–160 WPM)."
    },
    {
      q: "How does the AI speaking coach work?",
      a: "Once you complete your impromptu speech, Ripplier's AI speaking coach analyzes the transcript. It delivers precise, personalized feedback on your critical thinking depth, speech structure, vocabulary, areas of strength, and recommendations for improvement."
    },
    {
      q: "Can Ripplier be used for classroom, debate, or IELTS speaking practice?",
      a: "Yes. Teachers, debate coaches, and students worldwide use Ripplier for classroom speaking drills, academic debate preparation, and ESL/IELTS speaking exam practice. Drawing random, diverse topics builds the agility needed to score high on speaking tests."
    },
    {
      q: "Is Ripplier free to use?",
      a: "Yes, Ripplier is completely free to use. All topic generation, speech recording, transcription, timers, and AI speaking coach features are accessible without any registration or hidden fees."
    }
  ];

  return (
    <section className="w-full max-w-7xl mx-auto sm:mt-15  px-4 md:px-8 py-8 border-t  border-white/[0.06] text-left">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 mb-12 sm:mt-12 mt-5">

        {/* LEFT COLUMN */}
        <div className="w-full max-w-[680px] mx-auto min-w-0">

          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F5F2EC] tracking-tight mb-5 lg:mb-6 flex items-center justify-center gap-2 animate-fade-in text-center lg:whitespace-nowrap">
            <Sparkles className="w-4 h-4 lg:w-5 lg:h-5 text-[#C58A55] flex-shrink-0" />
            <span>Random Topic Generator &amp; Speaking Practice</span>
          </h2>

          {/* LEFT CONTENT */}
          <div className="text-left">

            <p
              className="text-sm sm:text-l lg:text-m text-[#AAAAAA] leading-relaxed mb-4"
              style={{ textAlign: 'justify', textJustify: 'inter-word' }}
            >
              Ripplier is an interactive random topic generator built for speaking
              practice, public speaking, conversation, and creative thinking. Spin the
              physical-feel topic reel to generate random speaking topics and start
              thinking about your response.
            </p>

            <p
              className="text-sm lg:text-m text-[#AAAAAA] leading-relaxed mb-4"
              style={{ textAlign: 'justify', textJustify: 'inter-word' }}
            >
              Find random topics to talk about, practice spontaneous speaking, prepare
              for presentations, or improve conversation skills. Explore curated
              categories including psychology, philosophy, technology, science, history,
              health, relationships, business, environment, space, productivity, and more.
            </p>

            <p
              className="text-sm lg:text-m text-[#AAAAAA] leading-relaxed mb-4"
              style={{ textAlign: 'justify', textJustify: 'inter-word' }}
            >
              Use the research timer to prepare, then record and transcribe your speech
              while Ripplier tracks speaking time, WPM, and filler words. Review your
              transcription, get personalized AI speaking feedback, and save or download
              your recording for self-analysis and continued speaking practice.
            </p>

            <p
              className="text-sm lg:text-m text-[#AAAAAA] leading-relaxed"
              style={{ textAlign: 'justify', textJustify: 'inter-word' }}
            >
              After speaking, review your transcription and speech performance.
              This makes Ripplier more than a simple topic generator—it is a complete
              environment for practicing speaking, improving communication skills.
            </p>

          </div>

        </div>


        {/* RIGHT COLUMN */}
        <div className="w-full max-w-[680px] mx-auto min-w-0 ">

          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F5F2EC] tracking-tight mb-5 lg:mb-6 flex items-center justify-center gap-2 animate-fade-in text-center lg:whitespace-nowrap">
            <Play className="w-4 h-4 lg:w-5 lg:h-5 text-[#7CC8F3] flex-shrink-0" />
            <span>The Ripplier Speaking Practice Loop</span>
          </h2>

          {/* RIGHT CONTENT */}
          <div>

            <ol className="space-y-3 text-sm lg:text-m text-[#AAAAAA]">

              <li className="flex gap-3">

                <span className="font-mono text-[#C58A55] font-bold flex-shrink-0">
                  01.
                </span>

                <span
                  className="flex-1"
                  style={{ textAlign: 'justify', textJustify: 'inter-word' }}
                >
                  <strong>Spin for a Topic:</strong> Choose a topic category and pull
                  the lever to generate a random speaking topic, conversation starter,
                  or thinking seed.
                </span>

              </li>


              <li className="flex gap-3">

                <span className="font-mono text-[#C58A55] font-bold flex-shrink-0">
                  02.
                </span>

                <span
                  className="flex-1"
                  style={{ textAlign: 'justify', textJustify: 'inter-word' }}
                >
                  <strong>Research &amp; Prepare:</strong> Use the research timer to
                  explore your topic, organize your thoughts, form a clear point of
                  view, and prepare your key ideas before speaking.
                </span>

              </li>


              <li className="flex gap-3">

                <span className="font-mono text-[#C58A55] font-bold flex-shrink-0">
                  03.
                </span>

                <span
                  className="flex-1"
                  style={{ textAlign: 'justify', textJustify: 'inter-word' }}
                >
                  <strong>Record &amp; Speak:</strong> Start the speaking timer and
                  record your speech. Ripplier transcribes your audio, measures your
                  speaking time and WPM, and analyzes your delivery while you speak.
                </span>

              </li>


              <li className="flex gap-3">

                <span className="font-mono text-[#C58A55] font-bold flex-shrink-0">
                  04.
                </span>

                <span
                  className="flex-1"
                  style={{ textAlign: 'justify', textJustify: 'inter-word' }}
                >
                  <strong>Review &amp; Improve:</strong> Review your transcription,
                  WPM, and filler-word usage, then use the AI speaking coach to identify
                  areas for improvement and receive personalized feedback.
                </span>

              </li>


              <li className="flex gap-3">

                <span className="font-mono text-[#C58A55] font-bold flex-shrink-0">
                  05.
                </span>

                <span
                  className="flex-1"
                  style={{ textAlign: 'justify', textJustify: 'inter-word' }}
                >
                  <strong>Save &amp; Self-Analyze:</strong> Listen back to your recorded
                  speech, analyze your delivery and communication style yourself, and
                  download your audio recording for later review or practice.
                </span>

              </li>

            </ol>

          </div>

        </div>

      </div>


      {/* Category Tags */}

      <div className="mb-12 p-4 mt-20 sm:mt-24 sm:p-6 rounded-2xl bg-[#111111]/40 border border-white/[0.06]">

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-6xl text-[#F5F2EC] tracking-tight mb-6 mt-4 lg:mt-7 text-center">
          Curated Search Intent Topics &amp; Niches
        </h2>

        <p
          className="text-sm lg:text-lg text-[#AAAAAA] leading-relaxed mb-6 text-center max-w-3xl mx-auto"
        >
          Ripplier filters its random topic generator to align with
          specific domains of study. Spin high-quality conversation starters or deep
          discussion topics in any of these categories:
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-4">

          {CATEGORIES.filter(cat => cat !== 'All').map(cat => (

            <span
              key={cat}
              className="px-3 py-1 rounded-full bg-[#111111] border border-white/[0.08] text-xs lg:text-m font-mono text-[#AAAAAA] hover:text-[#C58A55] transition-all"
            >
              {cat}
            </span>

          ))}

        </div>

      </div>


      {/* FAQ Accordion Section */}

      <div className="mb mt-20">

        <h2 className="font-serif  text-3xl sm:text-4xl lg:text-5xl text-[#F5F2EC] tracking-tight mb-8 lg:mb-12 text-center flex items-center justify-center gap-2">

          <HelpCircle className="w-5 h-5 lg:w-6 lg:h-6 text-[#C58A55] flex-shrink-0" />

          Frequently Asked Questions

        </h2>


        <div className="space-y-3 mt-10">

          {faqs.map((faq, idx) => {

            const isOpen = openFAQIndex === idx;

            return (

              <div
                key={idx}
                className="rounded-xl bg-[#111111] border border-white/[0.08] overflow-hidden transition-all duration-300"
              >

                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full px-4 sm:px-5 py-4 flex items-center justify-between text-left text-xs sm:text-sm lg:text-m font-mono uppercase tracking-wider text-[#F5F2EC] hover:text-[#C58A55] transition-all cursor-pointer gap-3"
                  aria-expanded={isOpen}
                >

                  <span>{faq.q}</span>

                  <ChevronDown
                    className={`w-4 h-4 text-[#AAAAAA] transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180 text-[#C58A55]' : ''
                      }`}
                  />

                </button>


                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen
                    ? 'max-h-96 border-t border-white/[0.04]'
                    : 'max-h-0'
                    }`}
                >

                  <p
                    className="px-4 sm:px-5 py-4 text-sm lg:text-m text-[#AAAAAA] leading-relaxed"
                    style={{ textAlign: 'justify', textJustify: 'inter-word' }}
                  >
                    {faq.a}
                  </p>

                </div>

              </div>

            );

          })}

        </div>

      </div>
    </section>
  );
};
