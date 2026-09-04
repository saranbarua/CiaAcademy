import React, { useState } from "react";
import { motion } from "motion/react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Building,
  Navigation,
  Train,
  Loader2,
} from "lucide-react";
import { SEOHead } from "../components/common/SEOHead";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import apiurl from "../apiUrl/apiUrl";

const API_BASE = apiurl.mainUrl;

interface LeadPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  source: string;
  courseInterest: string;
}

async function submitLead(payload: LeadPayload) {
  const res = await fetch(`${API_BASE}/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    let msg = "Something went wrong. Please try again.";
    try {
      const body = await res.json();
      msg = body.error || body.message || msg;
    } catch {
      // ignore
    }
    throw new Error(msg);
  }
  return res.json();
}

function splitName(fullName: string) {
  const trimmed = fullName.trim().replace(/\s+/g, " ");
  const parts = trimmed.split(" ");
  const firstName = parts.shift() || trimmed;
  const lastName = parts.join(" ") || firstName;
  return { firstName, lastName };
}

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "Course Enrolment Query",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!formData.email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!formData.phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }
    if (!formData.message.trim()) {
      setError("Please enter a message.");
      return;
    }

    const { firstName, lastName } = splitName(formData.fullName);

    setSubmitting(true);
    try {
      await submitLead({
        firstName,
        lastName,
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: formData.subject,
        message: formData.message.trim(),
        source: "WEBSITE",
        courseInterest: formData.subject,
      });
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not send your message. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      subject: "Course Enrolment Query",
      message: "",
    });
    setSubmitted(false);
    setError(null);
  };

  return (
    <>
      <SEOHead
        title="Contact Us & Campus Location | Apex Academy London"
        description="Visit Apex Academy at 45 Commercial Road, London E1 1LA. Contact our admissions desk via telephone, email, or our online inquiry form."
        keywords="Apex Academy contact, London training centre address, Aldgate East education campus, course advisor helpline"
        canonicalUrl="https://apexacademy.ac.uk/contact"
      />

      <div className="bg-slate-50 dark:bg-[#0B0F19] min-h-screen pb-20">
        <Breadcrumbs items={[{ label: "Contact Us & Campus" }]} />

        {/* Hero */}
        <section className="py-12 bg-gradient-to-r from-indigo-950 via-slate-900 to-violet-950 text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-3.5 py-1.5 rounded-full border border-cyan-800/60 inline-block mb-3">
                Central London Campus
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white">
                Get in Touch with Apex Academy
              </h1>
              <p className="text-sm sm:text-base text-slate-300 mt-2">
                Have questions about our qualifications, batch timetables, or
                admissions? Our team is here to assist.
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left: Contact Info & Campus Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-md space-y-6">
                <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                  Head Office & London Training Suites
                </h3>

                <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 dark:text-white block">
                        Campus Address:
                      </strong>
                      <span>
                        Apex Education Campus, 45 Commercial Road, London E1
                        1LA, United Kingdom
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 dark:text-white block">
                        Admissions Helplines:
                      </strong>
                      <span>
                        +44 (0) 20 8123 4567
                        <br />
                        +44 (0) 7912 345678 (WhatsApp Support)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 dark:text-white block">
                        Email Inquiries:
                      </strong>
                      <span>
                        admissions@apexacademy.ac.uk
                        <br />
                        info@apexacademy.ac.uk
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 dark:text-white block">
                        Opening Hours:
                      </strong>
                      <span>
                        Monday – Friday: 09:00 – 18:00
                        <br />
                        Saturday: 10:00 – 16:00
                        <br />
                        Sunday: Closed
                      </span>
                    </div>
                  </div>
                </div>

                {/* Transport directions */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 text-xs space-y-2">
                  <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-bold">
                    <Train className="w-4 h-4" />
                    <span>Public Transport Connections:</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400">
                    • <strong>Aldgate East Station:</strong> 2 minutes walk
                    (District & Hammersmith Lines)
                    <br />• <strong>Whitechapel Station:</strong> 6 minutes walk
                    (Elizabeth Line & Overground)
                    <br />• <strong>Liverpool Street Station:</strong> 10
                    minutes walk
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Interactive Contact Form */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-md">
                <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-2">
                  Send Us A Direct Message
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                  Our admissions officers respond within 2-4 business hours.
                </p>

                {submitted ? (
                  <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                      Message Dispatched Successfully!
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
                      Thank you for contacting Apex Academy. An advisor has been
                      assigned to your query and will reach out shortly.
                    </p>
                    <button
                      onClick={resetForm}
                      className="mt-4 px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-300 dark:border-red-800 text-xs text-red-600 dark:text-red-400">
                        {error}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              fullName: e.target.value,
                            })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                          placeholder="e.g. Tariq Ahmed"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                          placeholder="tariq@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                          placeholder="+44 7123 456789"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Subject / Department
                        </label>
                        <select
                          value={formData.subject}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              subject: e.target.value,
                            })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                        >
                          <option value="Course Enrolment Query">
                            Course Enrolment Query
                          </option>
                          <option value="SIA Security Licence Training">
                            SIA Security Licence Training
                          </option>
                          <option value="CSCS Construction Card">
                            CSCS Construction Card
                          </option>
                          <option value="UK Degree Top-Up Pathway">
                            UK Degree Top-Up Pathway
                          </option>
                          <option value="International Student Visa & CAS">
                            International Student Visa & CAS
                          </option>
                          <option value="Corporate / Group Bookings">
                            Corporate / Group Bookings
                          </option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Your Message *
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                        placeholder="Tell us what you would like to know..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-md shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Inquiry</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
