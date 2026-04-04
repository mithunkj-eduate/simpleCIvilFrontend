"use client";

import { useContext, useEffect, useState } from "react";
import Api, { api } from "@/components/helpers/apiheader";
import { AppContext } from "@/context/context";
import { ApiErrorResponse, msgType } from "@/utils/commenTypes";
import { emptyMessage } from "@/utils/constants";
import { Operation } from "@/utils/enum.types";
import { PortfolioData } from "@/lib/types";
import { AxiosError } from "axios";
import MessageModal from "@/customComponents/MessageModal";
import Loading from "@/components/helpers/Loading";
import { Button } from "@/stories/Button/Button";

export default function GeneratePortfolioPage() {
  const [copied, setCopied] = useState(false);
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 📋 Copy Prompt
  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const validateJSON = (data: PortfolioData) => {
    const requiredFields = [
      "projects",
      "hero",
      "about",
      "skills",
      "footer",
      "contact",
    ];

    // Find ALL fields that are missing or undefined
    const missingFields = requiredFields.filter(
      (field) => !data?.[field as keyof PortfolioData],
    );

    // Return the string of missing fields (e.g., "services, contact")
    // or null if none are missing
    return missingFields.length > 0 ? missingFields.join(", ") : null;
  };

  const containsScript = (obj: any): boolean => {
    const scriptPattern = /<script|javascript:|on\w+=/i;

    // Convert the entire object to a string to scan all values at once
    const jsonString = JSON.stringify(obj);
    return scriptPattern.test(jsonString);
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    let parsed;

    // ✅ Step 1: Safe JSON Parse
    try {
      parsed = JSON.parse(jsonInput);
    } catch (error) {
      console.log(error, "valied");

      setError("Invalid JSON format ❌ (Check commas, quotes)");
      return;
    }

    // ✅ Step 2: Validate Structure
    const missingField = validateJSON(parsed);

    if (missingField) {
      setError(`Invalid JSON structure ❌ (Missing ${missingField} field)`);
      return;
    }

    // ✅ Step 2.5: Security Check (No Scripts Allowed)
    if (containsScript(parsed)) {
      setError("Security Error ❌ (Executable scripts are not allowed)");
      return;
    }

    // check max size
    const MAX_SIZE_KB = 50;
    const jsonSize = new Blob([JSON.stringify(parsed)]).size;
    const sizeInKb = jsonSize / 1024;

    console.log(`${sizeInKb} KB`); // ~1.62 KB

    if (sizeInKb > MAX_SIZE_KB) {
      setError(
        `File too large ❌ (${sizeInKb.toFixed(2)} KB). Max allowed is ${MAX_SIZE_KB} KB.`,
      );
      return;
    }

    // ✅ Step 3: API Call
    try {
      await handleSave(parsed);

      setJsonInput("");
    } catch (error) {
      setError("Invalid JSON format ❌");
      const axiosError = error as AxiosError<ApiErrorResponse>;

      if (axiosError.response) {
        setMessage({
          flag: true,
          message: axiosError.response.data.message,
          operation: Operation.NONE,
        });
      } else {
        setMessage({
          flag: true,
          message: "An unexpected error occurred",
          operation: Operation.NONE,
        });
      }
    }
  };

  const [loading, setLoading] = useState(true);

  const { TOKEN } = Api();
  const { state } = useContext(AppContext);
  const [message, setMessage] = useState<msgType>(emptyMessage);
  const [operation, setOperation] = useState(Operation.CREATE);
  const [showHow, setShowHow] = useState(false);

  useEffect(() => {
    if (!TOKEN || !state.user) return;

    const getStore = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/portfolio`, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        });

        if (res.data) {
          setOperation(Operation.UPDATE);
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiErrorResponse>;

        if (axiosError.response) {
          // The server responded with a status code (e.g., 403)
          const serverMessage = axiosError.response.data?.message;
          const status = axiosError.response.status;

          setError(serverMessage || `Error ${status}: Access Denied ❌`);
        } else if (axiosError.request) {
          // The request was made but no response was received (Network error)
          setError("Network Error: Could not reach the server 🌐");
        } else {
          // Something happened setting up the request
          setError("An unexpected error occurred: " + axiosError.message);
        }
      } finally {
        setLoading(false);
      }
    };

    getStore();
  }, [TOKEN, state.user]);

  const handleSave = async (value: PortfolioData) => {
    try {
      // setLoading(true);

      if (!TOKEN || !state.user) return;

      const addUpdatePortfolio = async () => {
        try {
          const res = await api.put(`/portfolio`, value, {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
              "Content-Type": "application/json",
            },
          });

          if (res.data) {
            setMessage({
              flag: true,
              message: "created successfully!",
              operation: Operation.CREATE,
            });
          }
        } catch (error) {
          console.log(error);
        }
      };
      addUpdatePortfolio();

      // alert("✅ Website Created Successfully!");
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;

      if (axiosError.response) {
        setMessage({
          flag: true,
          message: axiosError.response.data.message,
          operation: Operation.NONE,
        });
      } else {
        setMessage({
          flag: true,
          message: "An unexpected error occurred",
          operation: Operation.NONE,
        });
      }
    }
  };

  const handleClose = () => {
    setMessage(emptyMessage);
    if (
      message.operation === Operation.CREATE ||
      message.operation === Operation.UPDATE
    ) {
      setOperation(Operation.UPDATE);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="ai-container">
      {/* <h1 className="ai-title">Create Website with AI</h1> */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="ai-title">Create Portfolio with AI</h1>

        <Button
          onClick={() => setShowHow(true)}
          mode="info"
        >
          How it works
        </Button>
      </div>
      

      <p className="ai-subtitle">
        Copy the prompt → Generate JSON → Paste below
      </p>

      {/* PROMPT BOX */}
      <div className="ai-box">
        <pre>{prompt}</pre>
      </div>

      <button onClick={handleCopy} className="ai-button">
        {copied ? "Copied ✅" : "Copy Prompt"}
      </button>

      {/* TEXTAREA */}
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Paste ChatGPT JSON here..."
        className="ai-textarea"
      />

      {/* ERROR */}
      {error && <p className="ai-error">{error}</p>}

      {/* SUCCESS */}
      {success && <p className="ai-success">{success}</p>}

      {/* SUBMIT */}
      <button onClick={handleSubmit} className="ai-submit">
        Create Website
      </button>


      {showHow && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="max-w-lg w-full bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-semibold text-violet-300">
              How it Works 🚀
            </h2>

            <ul className="text-gray-300 space-y-2 text-sm list-disc pl-4">
              <li>Copy the prompt</li>
              <li>Paste into ChatGPT</li>
              <li>Add your resume/details</li>
              <li>Copy the AI response</li>
              <li>Paste it here</li>
              <li>Click Create Website</li>
              <li>Publish & get your link 🎉</li>
            </ul>

            <button
              onClick={() => setShowHow(false)}
              className="w-full mt-4 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white hover:opacity-90"
            >
              Got it 👍
            </button>
          </div>
        </div>
      )}

      <MessageModal
        handleClose={handleClose}
        modalFlag={message.flag}
        operation={message.operation}
        value={message.message}
      />
    </div>
  );
}

export const prompt = `Use this strict production prompt 👇
You are an expert portfolio content generator.
Your task is to generate a complete, realistic, modern developer portfolio JSON.
STRICT RULES:

* Output ONLY valid JSON

* No explanation, no markdown, no extra text

* Follow EXACT structure provided

* Do NOT add or remove fields

* All links must be plain strings (no clickable formatting)

* Fill all fields with realistic, professional data

* Avoid placeholders like "lorem ipsum" or empty values

MINIMUM REQUIREMENTS (MANDATORY):

* At least 4 projects in "projects"

* At least 5 skill groups in "skills"

* At least 2 experience entries in "about.experience"

* At least 2 social links in "contact.social"

* "hero.stats" must contain at least 2 entries

* "about.desc" must contain at least 2 paragraphs

* Each project must include: title, desc, link, tech (min 2), image

* Each skill group must contain at least 3 items

CONTENT GUIDELINES:

* Use real-world technologies (React, Next.js, Node.js, MongoDB, AWS, etc.)

* Use realistic names, companies, and project ideas

* Keep descriptions concise (1–2 sentences)

* Use proper image URLs (e.g., https://images.unsplash.com/...)

* Make portfolio sound professional and slightly premium

OUTPUT FORMAT (STRICT):
{
  "hero": {
    "name": "",
    "highlight": "",
    "subtitle": "",
    "desc": "",
    "image": "",
    "stats": [
      { "value": "", "label": "" }
    ]
  },
  "projects": [
    {
      "title": "",
      "desc": "",
      "link": "",
      "tech": [],
      "image": ""
    }
  ],
  "about": {
    "desc": [],
    "info": [
      { "label": "", "value": "" }
    ],
    "experience": [
      {
        "company": "",
        "role": "",
        "period": "",
        "tech": []
      }
    ]
  },
  "skills": [
    {
      "title": "",
      "items": []
    }
  ],
  "contact": {
    "title": "",
    "desc": "",
    "email": "",
    "phone": "",
    "social": [
      { "name": "", "link": "" }
    ]
  },
  "footer": {
    "text": "",
    "links": [
      { "name": "", "link": "" }
    ]
  }
}`;
