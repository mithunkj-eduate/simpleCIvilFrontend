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
    const requiredFields = ["meta", "hero", "about", "services", "contact"];

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

      setError("Invalid JSON format ❌ (Check commas, quotes)");
      return;
    }

    // ✅ Step 2: Validate Structure
    const missingFieldsString = validateJSON(parsed);
    if (missingFieldsString) {
      setError(`Invalid JSON structure ❌ (Missing: ${missingFieldsString})`);
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

        const res = await api.get(`/professionalPortfolio`, {
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

      if (operation === Operation.CREATE) {
        const addUpdatePortfolio = async () => {
          try {
            const res = await api.post(`/professionalPortfolio`, value, {
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
      } else {
        const addUpdatePortfolio = async () => {
          try {
            const res = await api.put(`/professionalPortfolio`, value, {
              headers: {
                Authorization: `Bearer ${TOKEN}`,
                "Content-Type": "application/json",
              },
            });

            if (res.data) {
              setMessage({
                flag: true,
                message: "updated successfully!",
                operation: Operation.CREATE,
              });
            }
          } catch (error) {
            console.log(error);
          }
        };
        addUpdatePortfolio();
      }

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

export const prompt = `{
  "instruction": "Generate a complete professional portfolio website content in strict JSON format for any user input.",
  "rules": [
    "Return ONLY valid JSON (no comments, no extra text, no explanation)",
    "Do NOT change structure, keys, or nesting",
    "Do NOT remove any field",
    "Do NOT add new fields",
    "Only update values based on user input (name, profession, location, etc.)",
    "Ensure JSON is strictly valid (double quotes, no trailing commas, properly escaped text)",
    "All arrays and objects must remain in same format",
    "If data is unknown, generate realistic professional placeholder values",
    "Maintain high-quality, professional, human-like content",
    "Keep descriptions concise but premium quality",
    "Use industry-relevant terminology based on profession",
    "Images must be valid URLs (use Unsplash if needed)",
    "Phone numbers, emails, and links should look realistic",
    "SEO fields must be optimized and relevant",
    "Do not leave empty fields"
  ],
  "dynamic_inputs": {
    "name": "string",
    "profession": "string",
    "location": "string",
    "experience_years": "number",
    "specialization": "string"
  },
  "output_format": {
    "meta": {
      "slug": "string",
      "profession": "string",
      "name": "string",
      "tagline": "string",
      "description": "string",
      "seo": {
        "title": "string",
        "description": "string",
        "keywords": ["string"]
      },
      "accentColor": "string"
    },
    "hero": {
      "heading": "string",
      "subheading": "string",
      "image": "string",
      "carousel": ["string"],
      "cta": [
        {
          "label": "string",
          "href": "string",
          "variant": "primary | secondary",
          "icon": "string"
        }
      ],
      "stats": [
        {
          "label": "string",
          "value": "string"
        }
      ]
    },
    "about": {
      "title": "string",
      "description": "string",
      "image": "string",
      "highlights": [
        {
          "icon": "string",
          "title": "string",
          "value": "string"
        }
      ]
    },
    "businessInfo": {
      "ownerName": "string",
      "registrationNumber": "string",
      "gst": "string",
      "established": "string",
      "licenseNumber": "string",
      "additionalInfo": [
        {
          "label": "string",
          "value": "string"
        }
      ]
    },
    "services": [
      {
        "id": "string",
        "title": "string",
        "description": "string",
        "image": "string",
        "price": "string",
        "duration": "string",
        "badge": "string",
        "features": ["string"]
      }
    ],
    "projects": [
      {
        "id": "string",
        "title": "string",
        "description": "string",
        "category": "string",
        "year": "string",
        "images": [
          {
            "url": "string",
            "alt": "string"
          }
        ],
        "tags": ["string"],
        "link": "string"
      }
    ],
    "skills": [
      {
        "name": "string",
        "level": "number",
        "category": "string"
      }
    ],
    "certifications": [
      {
        "title": "string",
        "issuer": "string",
        "year": "string"
      }
    ],
    "gallery": [
      {
        "url": "string",
        "alt": "string",
        "category": "string"
      }
    ],
    "testimonials": [
      {
        "id": "string",
        "name": "string",
        "role": "string",
        "rating": "number",
        "text": "string",
        "date": "string"
      }
    ],
    "faq": [
      {
        "question": "string",
        "answer": "string"
      }
    ],
    "contact": {
      "email": "string",
      "phone": "string",
      "whatsapp": "string",
      "address": "string",
      "map": {
        "lat": "number",
        "lng": "number",
        "zoom": "number"
      },
      "workingHours": [
        {
          "day": "string",
          "hours": "string",
          "closed": "boolean"
        }
      ]
    },
    "socialLinks": [
      {
        "platform": "string",
        "url": "string",
        "icon": "string"
      }
    ]
  }
}`
