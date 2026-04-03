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
      <h1 className="ai-title">Create Website with AI</h1>

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

      <MessageModal
        handleClose={handleClose}
        modalFlag={message.flag}
        operation={message.operation}
        value={message.message}
      />
    </div>
  );
}

export const prompt = `You are an expert portfolio content generator and resume parser.

Your task is to convert the given resume or user input into a complete, modern, and professional portfolio JSON.

GOAL:
Generate a clean, realistic, and high-quality portfolio structure suitable for a developer/personal website.

STRICT RULES:
- Output ONLY valid JSON (no explanation, no markdown, no code block)
- Follow EXACT schema structure (do NOT add/remove/change keys)
- Fill ALL fields with meaningful and realistic content
- Do NOT leave empty strings
- If data is missing, intelligently generate professional placeholder content
- Keep descriptions concise, modern, and impactful (1–2 lines max)
- Use real-world professional tone (no generic AI phrases)
- Ensure consistency across sections (skills match projects, etc.)
- Use relevant technologies based on role (e.g., MERN, Node.js, etc.)
- Images can be placeholder paths like "/project1.png"
- All URLs must be plain strings (no markdown, no brackets, no formatting)
- Do NOT wrap links like [text](url)
- Return raw URLs only (e.g., "https://example.com")

IMPORTANT: Output must be pure JSON parsable by JSON.parse(). Any markdown-style links like [text](url) are invalid.

CONTENT QUALITY RULES:
- Hero section must feel strong and personal
- Projects must be realistic and slightly detailed (not generic)
- Skills must be grouped logically (e.g., Frontend, Backend, DevOps)
- About section should reflect experience clearly
- Experience must include real responsibilities + tech
- Contact should look usable in real-world portfolio

MINIMUM REQUIREMENTS:
- At least 4 projects
- At least 5 skills (grouped)
- At least 2 experience entries
- At least 2 social links

OUTPUT FORMAT (STRICT JSON):

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
}

INPUT:
{{PASTE USER RESUME / DETAILS HERE}}`;
