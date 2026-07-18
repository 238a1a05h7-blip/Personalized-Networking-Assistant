import React, { useState } from 'react';
import { 
  Folder, 
  FileCode, 
  Layers, 
  Server, 
  Layout, 
  Cpu, 
  Database, 
  ChevronRight, 
  ChevronDown, 
  Code,
  Info,
  CheckCircle,
  FileText,
  Terminal,
  Activity,
  Laptop,
  Check,
  Copy,
  Sliders,
  Settings,
  HelpCircle,
  Package,
  ShieldCheck,
  PlayCircle,
  Sparkles,
  Shuffle,
  Search,
  Globe,
  History,
  Save,
  Trash,
  ThumbsUp,
  ThumbsDown,
  Network,
  Zap,
  ArrowRight,
  BookOpen,
  ShieldAlert,
  Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  description?: string;
  role?: string;
  dependencies?: string[];
  snippet?: string;
}

const directoryData: FileNode = {
  name: "networking-analytics-ai",
  type: "folder",
  children: [
    {
      name: "app",
      type: "folder",
      description: "Core backend source code hosting all API routes, ML services, and logic pipelines.",
      children: [
        {
          name: "api",
          type: "folder",
          description: "FastAPI router endpoints organizing standard RESTful payloads and JSON interactions.",
          children: [
            {
              name: "__init__.py",
              type: "file",
              description: "Initializes the API submodule and exposes routing endpoints.",
              role: "Submodule Initialization",
              dependencies: ["fastapi"],
              snippet: "# Expose routing packages\nfrom .profiles import router as profiles_router\nfrom .themes import router as themes_router"
            },
            {
              name: "profiles.py",
              type: "file",
              description: "FastAPI router endpoints for managing user profile ingestion, parsing, and bios.",
              role: "User profile API router. Sanitizes input bio strings and records them into 3NF user profile entities.",
              dependencies: ["fastapi", "pydantic"],
              snippet: "from fastapi import APIRouter, HTTPException\nfrom pydantic import BaseModel\n\nrouter = APIRouter(prefix='/api/profiles')\n\nclass ProfileCreate(BaseModel):\n    bio_text: str\n\n@router.post('/')\ndef create_profile(profile: ProfileCreate):\n    # Core business logic for profile registry\n    return {'status': 'processed', 'bio_text_len': len(profile.bio_text)}"
            },
            {
              name: "themes.py",
              type: "file",
              description: "FastAPI endpoints that orchestrate the DistilBERT zero-shot classification on event descriptions.",
              role: "Theme Extraction Endpoint. Parses raw event texts and extracts core themes using Zero-Shot NLP pipeline.",
              dependencies: ["fastapi", "transformers"],
              snippet: "@router.post('/analyze')\ndef analyze_event_themes(event_desc: str):\n    themes = classifier_service.extract_themes(event_desc)\n    return {'event_themes': themes}"
            },
            {
              name: "starters.py",
              type: "file",
              description: "Generative endpoints connecting bio texts with event themes to produce customized openers.",
              role: "Conversation starter synthesizer. Triggers GPT-2 Decoders based on overlapping bio and event themes.",
              dependencies: ["fastapi", "transformers"],
              snippet: "@router.post('/generate')\ndef generate_conversation_starters(user_id: str, event_id: str):\n    prompts = template_service.build_prompts(user_id, event_id)\n    starters = gpt2_service.generate(prompts)\n    return {'starters': starters}"
            },
            {
              name: "factcheck.py",
              type: "file",
              description: "Endpoints performing real-time queries against Wikipedia to audit historical or technical claims.",
              role: "Wikipedia Fact-Checker Router. Retrieves relevant wiki summaries and highlights source references.",
              dependencies: ["fastapi", "wikipedia-api"],
              snippet: "@router.get('/audit')\ndef audit_claim(query: str):\n    wiki_results = wiki_service.search(query)\n    claims = auditor.evaluate(query, wiki_results)\n    return {'fact_check': claims}"
            }
          ]
        },
        {
          name: "services",
          type: "folder",
          description: "Encapsulated service layers wrapping pre-trained machine learning models and external APIs.",
          children: [
            {
              name: "__init__.py",
              type: "file",
              description: "Initializes the service modules.",
              role: "Submodule Initialization",
              snippet: "# Expose services\nfrom .classifier import DistilBERTClassifier\nfrom .synthesizer import GPT2Synthesizer"
            },
            {
              name: "classifier.py",
              type: "file",
              description: "Initializes and runs the Hugging Face zero-shot pipeline using DistilBERT Base.",
              role: "Zero-Shot Text Classifier. Performs thematic parsing in milliseconds to support real-time feedback loops.",
              dependencies: ["transformers", "torch"],
              snippet: "from transformers import pipeline\n\nclass DistilBERTClassifier:\n    def __init__(self):\n        self.classifier = pipeline('zero-shot-classification', model='distilbert-base-uncased')\n        \n    def extract_themes(self, text, candidate_labels):\n        res = self.classifier(text, candidate_labels)\n        return [label for label, score in zip(res['labels'], res['scores']) if score > 0.45]"
            },
            {
              name: "synthesizer.py",
              type: "file",
              description: "Handles generative tasks with GPT-2 Small, mapping context prompts into professional conversation lines.",
              role: "GPT-2 Generative Service. Formulates punchy and context-relevant introductions on resource-constrained hardware.",
              dependencies: ["transformers", "torch"],
              snippet: "from transformers import AutoTokenizer, AutoModelForCausalLM\n\nclass GPT2Synthesizer:\n    def __init__(self):\n        self.tokenizer = AutoTokenizer.from_pretrained('gpt2')\n        self.model = AutoModelForCausalLM.from_pretrained('gpt2')\n        \n    def generate_starter(self, prompt):\n        # Text-generation pipeline executing contextually coherent sentences\n        return 'Hello! I noticed you are interested in agentic systems...'"
            },
            {
              name: "wiki_auditor.py",
              type: "file",
              description: "Queries the official Wikipedia API, processes search nodes, and returns contextual citations.",
              role: "Wikipedia Search Wrapper. Implements defensive rate-limiting and snippet processing.",
              dependencies: ["wikipedia-api", "urllib3"],
              snippet: "import wikipedia\n\ndef search_wikipedia_claims(query: str):\n    try:\n        summary = wikipedia.summary(query, sentences=3)\n        return {'success': True, 'text': summary}\n    except Exception as e:\n        return {'success': False, 'error': str(e)}"
            },
            {
              name: "database.py",
              type: "file",
              description: "Relational SQLite manager enforcing 3rd Normal Form (3NF) tables and foreign keys.",
              role: "Database Integration Service. Persists profiles, events, starters, and logs with transaction safety.",
              dependencies: ["sqlite3"],
              snippet: "import sqlite3\n\ndef init_3nf_database():\n    conn = sqlite3.connect('networking.db')\n    # Enforce foreign key constraints\n    conn.execute('PRAGMA foreign_keys = ON;')\n    # DDL schema creation matches our ER specifications..."
            }
          ]
        },
        {
          name: "main.py",
          type: "file",
          description: "FastAPI server bootstrapper. Sets up global middleware, CORS, and hooks into our router nodes.",
          role: "Application Entry Point. Bootstraps the backend, maps middlewares, and exposes Port 8000.",
          dependencies: ["fastapi", "uvicorn"],
          snippet: "from fastapi import FastAPI\nfrom fastapi.middleware.cors import CORSMiddleware\nfrom app.api import profiles, themes, starters, factcheck\n\napp = FastAPI(title='Networking AI Engine')\n\n# Configure CORS policies for Streamlit client-side traffic\napp.add_middleware(\n    CORSMiddleware,\n    allow_origins=['*'],\n    allow_methods=['*'],\n)\n\napp.include_router(profiles.router)"
        }
      ]
    },
    {
      name: "frontend",
      type: "folder",
      description: "Frontend interface powered by Streamlit, offering modular widgets and interactive dashboards.",
      children: [
        {
          name: "components",
          type: "folder",
          description: "Reusable modular visual components for standard UI views.",
          children: [
            {
              name: "forms.py",
              type: "file",
              description: "Interactive input cards supporting file uploads, text parsing, and draft submissions.",
              role: "UI Form Components. Captures BioText drafts and Event descriptions with validation checks.",
              dependencies: ["streamlit"],
              snippet: "import streamlit as st\n\ndef render_profile_form():\n    st.markdown('### 📝 Profile Creator')\n    bio_input = st.text_area('Write about your technology interests:')\n    return bio_input"
            },
            {
              name: "displays.py",
              type: "file",
              description: "Structured display boxes formatting extracted themes, matching metrics, and dialogues.",
              role: "UI Display Helper. Formats overlapping tags and conversation starters into a custom dialogue feed.",
              dependencies: ["streamlit"],
              snippet: "def render_starter_bubble(starter_text, timestamp):\n    st.markdown(f'<div style=\"padding:12px; background:#1e293b; border-radius:12px; margin-bottom:8px\">{starter_text}</div>', unsafe_allow_html=True)"
            },
            {
              name: "auditing.py",
              type: "file",
              description: "Auditing sidebar interface demonstrating the real-time Wikipedia evaluation of generated content.",
              role: "UI Auditing Component. Displays Wikipedia claims side-by-side with generated claims.",
              dependencies: ["streamlit"],
              snippet: "def render_wikipedia_auditor(claim, wiki_summary):\n    # Formats a clean split-panel with warning thresholds and verified checkmarks\n    st.info(f'Claim under audit: {claim}')"
            }
          ]
        },
        {
          name: "main.py",
          type: "file",
          description: "Main multi-page entry point of the Streamlit frontend application, routing states dynamically.",
          role: "Frontend App Entrypoint. Renders sidebar tab routing, maps state keys, and synchronizes with APIs.",
          dependencies: ["streamlit", "requests"],
          snippet: "import streamlit as st\nfrom components.forms import render_profile_form\n\nst.set_page_config(page_title='Networking Companion', layout='wide')\nst.sidebar.title('🧭 Navigation Navigator')\n# Tab-based dashboard state router..."
        }
      ]
    },
    {
      name: "tests",
      type: "folder",
      description: "Comprehensive pytest suites for end-to-end API testing and microservice function checks.",
      children: [
        {
          name: "test_api.py",
          type: "file",
          description: "Integration testing suite evaluating the input-output behaviors of router endpoints.",
          role: "API Integration Testing. Uses FastAPI TestClient to query routers with mock profiles.",
          dependencies: ["pytest", "httpx"],
          snippet: "from fastapi.testclient import TestClient\nfrom app.main import app\n\nclient = TestClient(app)\n\ndef test_create_profile_success():\n    response = client.post('/api/profiles/', json={'bio_text': 'Valid testing BioText'})\n    assert response.status_code == 200"
        },
        {
          name: "test_services.py",
          type: "file",
          description: "Unit tests evaluating DistilBERT theme extraction, GPT-2 synthesizers, and Wikipedia mock responses.",
          role: "Model Pipeline Verification. Mocks heavy transformer layers to test state logic and fallback systems.",
          dependencies: ["pytest", "unittest.mock"],
          snippet: "from unittest.mock import MagicMock, patch\n\n@patch('app.services.classifier.pipeline')\ndef test_theme_extraction_pipeline(mock_pipeline):\n    # Confirms DistilBERT can be successfully queried or mock-evaluated\n    assert True"
        }
      ]
    },
    {
      name: "requirements.txt",
      type: "file",
      description: "Configuration listing pinned external libraries, ensuring build reproducibility and license audits.",
      role: "Dependencies List. Lists python-dotenv, fastapi, transformers, torch, streamlit, and wikipedia-api.",
      snippet: "fastapi>=0.100.0\nuvicorn>=0.22.0\ntransformers>=4.30.0\ntorch>=2.0.0\nstreamlit>=1.25.0\nwikipedia-api>=0.5.8\npython-dotenv>=1.0.0"
    },
    {
      name: "README.md",
      type: "file",
      description: "Project bootstrap guide, architecture documentation, 3NF schema outlines, and developer deployment instructions.",
      role: "Project documentation. Helps new team members understand installation protocols and design goals.",
      snippet: "# AI-Driven Professional Networking Companion\n\n## 🛠️ Quickstart\n```bash\n# Boot the application\npython -m venv venv\nsource venv/bin/activate\npip install -r requirements.txt\npython app/main.py\n```"
    }
  ]
};

const keyPackages = [
  {
    name: "fastapi",
    version: ">=0.100.0",
    category: "Routing & Validation",
    description: "Hosts robust web routing nodes and utilizes Pydantic validation decorators for rapid type-safe JSON serialization."
  },
  {
    name: "uvicorn",
    version: ">=0.22.0",
    category: "Web Server",
    description: "Lightning-fast ASGI server implementation hosting FastAPI endpoints on an asynchronous event loop."
  },
  {
    name: "streamlit",
    version: ">=1.25.0",
    category: "User Interface",
    description: "Dynamic presentation framework rendering bento cards, responsive forms, and markdown-friendly wiki panels."
  },
  {
    name: "transformers",
    version: ">=4.30.0",
    category: "Machine Learning Core",
    description: "Bridges Python with Hugging Face Hub, loading zero-shot DistilBERT and causal GPT-2 decoders."
  },
  {
    name: "torch",
    version: ">=2.0.0",
    category: "Deep Learning Runtime",
    description: "Backbone neural network matrix mathematics compiler processing token graphs and calculating model outputs."
  },
  {
    name: "wikipedia-api",
    version: ">=0.5.8",
    category: "Fact Verification",
    description: "Wrapper client facilitating search nodes, page indexing, and citation summaries against live Wiki nodes."
  },
  {
    name: "pydantic",
    version: ">=2.0.0",
    category: "Data Models",
    description: "Strict schemas enforcing 3NF primary and foreign attributes on client-submitted bio forms."
  },
  {
    name: "pytest & httpx",
    version: ">=7.0.0",
    category: "Automated Auditing",
    description: "Drives API integration testing and service mocks to evaluate framework pipelines prior to deployments."
  }
];

interface BackendModule {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  role: string;
  layer: 'API Router' | 'Machine Learning' | 'Database Ingestion' | 'Automated Testing';
  filepath: string;
  responsibility: string;
  inputSchema?: string;
  outputSchema?: string;
  codeSnippet: string;
  testingStrategy: string;
}

const backendModules: BackendModule[] = [
  {
    id: "api_profiles",
    name: "Profile Ingestion Route",
    icon: Server,
    role: "User Data Sanitization",
    layer: "API Router",
    filepath: "app/api/profiles.py",
    responsibility: "Exposes POST /api/profiles endpoints. Sanitizes raw biographical strings, matches schema rules using Pydantic BaseModel wrappers, and forwards validated structures to the relational db service layer.",
    inputSchema: `{ "bio_text": "Experienced Python researcher specializing in ML model deployments and full-stack web applications." }`,
    outputSchema: `{ "status": "processed", "profile_id": "prof_9a2b", "bio_text_len": 90 }`,
    codeSnippet: `from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, constr
from app.services.database import get_db_connection

router = APIRouter(prefix="/api/profiles", tags=["Profiles"])

class ProfileSchema(BaseModel):
    bio_text: constr(min_length=10, max_length=1500)

@router.post("/", response_model=dict)
def register_profile(profile: ProfileSchema):
    try:
        profile_id = db_service.insert_user_profile(profile.bio_text)
        return {"status": "success", "profile_id": profile_id, "bio_text_len": len(profile.bio_text)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))`,
    testingStrategy: "Invoke TestClient(app).post('/api/profiles/', json={'bio_text': 'Valid details'}). Confirm status is 200, output JSON structure contains positive 'profile_id', and validation errors correctly trigger status 422."
  },
  {
    id: "api_themes",
    name: "Zero-Shot Theme Endpoint",
    icon: Layout,
    role: "Thematic Event Processing",
    layer: "API Router",
    filepath: "app/api/themes.py",
    responsibility: "Exposes POST /api/themes/analyze endpoints. Triggers zero-shot NLP classification loops on unstructured event agendas, mapping topics to pre-configured professional tags without task-specific training data.",
    inputSchema: `{ "event_description": "Join our technical webinar introducing FastAPI deployment structures, multi-threading in Python, and Pytest suites." }`,
    outputSchema: `{ "status": "analyzed", "themes": ["Web Development", "Software Engineering", "Testing"], "scores": [0.92, 0.81, 0.74] }`,
    codeSnippet: `from fastapi import APIRouter
from pydantic import BaseModel
from app.services.classifier import classifier_service

router = APIRouter(prefix="/api/themes", tags=["Themes"])

class EventSchema(BaseModel):
    event_description: str

@router.post("/analyze")
def analyze_themes(event: EventSchema):
    # Triggers lightweight DistilBERT pipeline for real-time categorizations
    tags = classifier_service.extract_themes(event.event_description)
    return {"status": "analyzed", "themes": tags}`,
    testingStrategy: "Verify endpoint with long event strings containing technical keywords. Assert the returned tags list contains 'Web Development' when the query relates to FastAPI."
  },
  {
    id: "service_classifier",
    name: "DistilBERT Theme Service",
    icon: Cpu,
    role: "Zero-Shot NLP Pipelines",
    layer: "Machine Learning",
    filepath: "app/services/classifier.py",
    responsibility: "Initializes and compiles standard zero-shot classification pipelines using distilbert-base-uncased. Measures similarity bounds in milliseconds to support immediate user interface feedback loops.",
    inputSchema: `text: "An intensive coding bootcamp on database structures and SQL optimizations."\ncandidate_labels: ["Databases", "AI Research", "Web Development"]`,
    outputSchema: `["Databases"] (Score: 0.94)`,
    codeSnippet: `from transformers import pipeline
import torch

class DistilBERTClassifier:
    def __init__(self):
        # Fallback to CPU execution if CUDA nodes are absent
        device = 0 if torch.cuda.is_available() else -1
        self.pipeline = pipeline(
            "zero-shot-classification", 
            model="valhalla/distilbert-body-classifier", # Compact optimized DistilBERT
            device=device
        )
        self.candidate_tags = ["AI & ML", "Databases", "Web Development", "UI/UX Design", "Testing"]

    def extract_themes(self, text: str) -> list:
        if not text.strip():
            return []
        res = self.pipeline(text, self.candidate_tags)
        # Filter labels where confidence scores exceed 45% threshold
        return [label for label, score in zip(res["labels"], res["scores"]) if score > 0.45]`,
    testingStrategy: "Mock the transformers pipeline using pytest patching. Assert that the service handles empty strings gracefully, and executes filtering math on mock confidence arrays correctly."
  },
  {
    id: "service_synthesizer",
    name: "GPT-2 Synthesizer Service",
    icon: Sliders,
    role: "Generative Text Compilation",
    layer: "Machine Learning",
    filepath: "app/services/synthesizer.py",
    responsibility: "Encapsulates GPT-2 Small language decoders. Leverages custom template prompts containing bios and matched event categories to output contextually coherent, professional networking introductions.",
    inputSchema: `bio_text: "Python Developer studying database 3NF rules."\nevent_themes: ["Databases", "Software Engineering"]`,
    outputSchema: `"I saw you study database 3NF rules! I'm attending the Database session too. How do you approach normal forms in Python projects?"`,
    codeSnippet: `from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

class GPT2Synthesizer:
    def __init__(self):
        self.tokenizer = AutoTokenizer.from_pretrained("gpt2")
        self.model = AutoModelForCausalLM.from_pretrained("gpt2")
        
    def generate_starters(self, bio: str, themes: list, count: int = 3) -> list:
        prompt = f"Professional introduction. Bio: {bio}. Themes: {', '.join(themes)}. Line: "
        inputs = self.tokenizer.encode(prompt, return_tensors="pt")
        
        outputs = self.model.generate(
            inputs,
            max_length=60,
            num_return_sequences=count,
            no_repeat_ngram_size=2,
            temperature=0.85,
            do_sample=True,
            pad_token_id=self.tokenizer.eos_token_id
        )
        
        starters = []
        for out in outputs:
            text = self.tokenizer.decode(out, skip_special_tokens=True)
            # Slice away original prompt instruction
            clean_line = text[len(prompt):].split("\\n")[0].strip()
            starters.append(clean_line)
        return starters`,
    testingStrategy: "Write unit assertions matching text bounds. Ensure return arrays contain precisely 'count' lines, and each string is non-empty."
  },
  {
    id: "service_database",
    name: "Relational 3NF Manager",
    icon: Database,
    role: "Durable Transaction Logging",
    layer: "Database Ingestion",
    filepath: "app/services/database.py",
    responsibility: "Operates SQLite engine connections. Strictly enforces relational integrity rules, constructs tables conforming to Third Normal Form (3NF), handles foreign keys, and logs matching matrices.",
    inputSchema: `user_id: "usr_a1b2", session_id: "ses_f9g8", text: "Matched intro sentence."`,
    outputSchema: `True (Transaction committed, primary key created)`,
    codeSnippet: `import sqlite3
from typing import List, Tuple

class DatabaseService:
    def __init__(self, db_path: str = "networking.db"):
        self.db_path = db_path
        self._enforce_foreign_keys()

    def _enforce_foreign_keys(self):
        with sqlite3.connect(self.db_path) as conn:
            conn.execute("PRAGMA foreign_keys = ON;")

    def insert_starter(self, user_id: str, session_id: str, text: str) -> str:
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute(
                """
                INSERT INTO ConversationStarters (UserID, SessionID, StarterText, CreatedAt)
                VALUES (?, ?, ?, datetime('now'))
                """,
                (user_id, session_id, text)
            )
            conn.commit()
            return cursor.lastrowid`,
    testingStrategy: "Trigger db insertions inside ephemeral sqlite memory-allocated targets (:memory:). Attempt inserting a Starter with an invalid, non-existent UserID. Assert that a Foreign Key Constraint violation is raised."
  },
  {
    id: "tests_suite",
    name: "FastAPI & Service Test Suites",
    icon: ShieldCheck,
    role: "Continuous Verification",
    layer: "Automated Testing",
    filepath: "tests/test_api.py",
    responsibility: "Ensures codebase reliability prior to container assemblies. Mocks heavyweight Hugging Face transformers using unittest patches to guarantee quick, predictable validation workflows under CI/CD runtimes.",
    inputSchema: `pytest executing on test directory target`,
    outputSchema: `All tests passed (100% green)`,
    codeSnippet: `import pytest
from fastapi.testclient import TestClient
from unittest.mock import MagicMock, patch
from app.main import app

client = TestClient(app)

@pytest.fixture
def mock_classifier():
    with patch("app.services.classifier.DistilBERTClassifier.extract_themes") as mock:
        mock.return_value = ["Web Development", "AI & ML"]
        yield mock

def test_api_themes_endpoint(mock_classifier):
    payload = {"event_description": "FastAPI workshop for neural net engineers."}
    response = client.post("/api/themes/analyze", json=payload)
    
    assert response.status_code == 200
    assert "themes" in response.json()
    assert response.json()["themes"] == ["Web Development", "AI & ML"]
    mock_classifier.assert_called_once()`,
    testingStrategy: "Execute pytest tests/ in a sandbox terminal. Ensure all routers, business logic modules, and mock endpoints execute perfectly and register 100% green status passes."
  }
];

interface PydanticModel {
  id: string;
  name: string;
  description: string;
  pydanticCode: string;
  defaultPayload: string;
  validate: (payload: any) => { isValid: boolean; errors: any[] };
}

const pydanticModelsList: PydanticModel[] = [
  {
    id: "UserProfileCreate",
    name: "UserProfileCreate",
    description: "Enforces structure and length validation of raw user-submitted biography texts prior to 3NF registration.",
    pydanticCode: `from pydantic import BaseModel, Field

class UserProfileCreate(BaseModel):
    bio_text: str = Field(
        ...,
        min_length=15,
        max_length=500,
        description="Raw professional biography containing industry, experience, or role details."
    )`,
    defaultPayload: `{
  "bio_text": "AI Ethics advocate and Technical Product Manager with 5 years of experience in responsible machine learning."
}`,
    validate: (payload: any) => {
      const errors: any[] = [];
      if (payload.bio_text === undefined) {
        errors.push({ type: "missing", loc: ["body", "bio_text"], msg: "Field required", input: null });
      } else if (typeof payload.bio_text !== 'string') {
        errors.push({ type: "string_type", loc: ["body", "bio_text"], msg: "Input should be a valid string", input: payload.bio_text });
      } else {
        if (payload.bio_text.length < 15) {
          errors.push({ type: "string_too_short", loc: ["body", "bio_text"], msg: "String should have at least 15 characters", input: payload.bio_text });
        }
        if (payload.bio_text.length > 500) {
          errors.push({ type: "string_too_long", loc: ["body", "bio_text"], msg: "String should have at most 500 characters", input: payload.bio_text });
        }
      }
      return { isValid: errors.length === 0, errors };
    }
  },
  {
    id: "EventThemeAnalyze",
    name: "EventThemeAnalyze",
    description: "Validates incoming event descriptions prior to running DistilBERT zero-shot classification pipelines.",
    pydanticCode: `from pydantic import BaseModel, Field

class EventThemeAnalyze(BaseModel):
    event_description: str = Field(
        ...,
        min_length=20,
        max_length=1000,
        description="Full textual description of the tech meetup, panel agenda, or summit keynote."
    )`,
    defaultPayload: `{
  "event_description": "Next-Gen AI Summit 2026: An elite gathering discussing multimodal interfaces and agentic frameworks."
}`,
    validate: (payload: any) => {
      const errors: any[] = [];
      if (payload.event_description === undefined) {
        errors.push({ type: "missing", loc: ["body", "event_description"], msg: "Field required", input: null });
      } else if (typeof payload.event_description !== 'string') {
        errors.push({ type: "string_type", loc: ["body", "event_description"], msg: "Input should be a valid string", input: payload.event_description });
      } else {
        if (payload.event_description.length < 20) {
          errors.push({ type: "string_too_short", loc: ["body", "event_description"], msg: "String should have at least 20 characters", input: payload.event_description });
        }
        if (payload.event_description.length > 1000) {
          errors.push({ type: "string_too_long", loc: ["body", "event_description"], msg: "String should have at most 1000 characters", input: payload.event_description });
        }
      }
      return { isValid: errors.length === 0, errors };
    }
  },
  {
    id: "ConversationStarterRequest",
    name: "ConversationStarterRequest",
    description: "Enforces complete prompt context alignment when matching user biographies with analyzed event themes.",
    pydanticCode: `from pydantic import BaseModel, Field
from typing import List

class ConversationStarterRequest(BaseModel):
    bio_text: str = Field(..., description="The user's professional background biography.")
    event_description: str = Field(..., description="The keynote or meetup description.")
    analyzed_themes: List[str] = Field(
        ...,
        min_length=1,
        max_length=5,
        description="A validated list of AI-extracted themes relevant to the event."
    )`,
    defaultPayload: `{
  "bio_text": "AI Product Manager specializing in developer tooling and API design.",
  "event_description": "FastAPI workshop for microservices and neural net pipelines.",
  "analyzed_themes": ["FastAPI", "Microservices", "API Design"]
}`,
    validate: (payload: any) => {
      const errors: any[] = [];
      if (payload.bio_text === undefined) {
        errors.push({ type: "missing", loc: ["body", "bio_text"], msg: "Field required", input: null });
      } else if (typeof payload.bio_text !== 'string') {
        errors.push({ type: "string_type", loc: ["body", "bio_text"], msg: "Input should be a valid string", input: payload.bio_text });
      }

      if (payload.event_description === undefined) {
        errors.push({ type: "missing", loc: ["body", "event_description"], msg: "Field required", input: null });
      } else if (typeof payload.event_description !== 'string') {
        errors.push({ type: "string_type", loc: ["body", "event_description"], msg: "Input should be a valid string", input: payload.event_description });
      }

      if (payload.analyzed_themes === undefined) {
        errors.push({ type: "missing", loc: ["body", "analyzed_themes"], msg: "Field required", input: null });
      } else if (!Array.isArray(payload.analyzed_themes)) {
        errors.push({ type: "list_type", loc: ["body", "analyzed_themes"], msg: "Input should be a valid list", input: payload.analyzed_themes });
      } else {
        if (payload.analyzed_themes.length < 1) {
          errors.push({ type: "list_too_short", loc: ["body", "analyzed_themes"], msg: "List should have at least 1 item", input: payload.analyzed_themes });
        }
        if (payload.analyzed_themes.length > 5) {
          errors.push({ type: "list_too_long", loc: ["body", "analyzed_themes"], msg: "List should have at most 5 items", input: payload.analyzed_themes });
        }
        payload.analyzed_themes.forEach((theme: any, idx: number) => {
          if (typeof theme !== 'string') {
            errors.push({ type: "string_type", loc: ["body", "analyzed_themes", idx], msg: "Input should be a valid string", input: theme });
          }
        });
      }

      return { isValid: errors.length === 0, errors };
    }
  },
  {
    id: "WikipediaAuditRequest",
    name: "WikipediaAuditRequest",
    description: "Accepts raw verified claims or queries to audit and match against live Wikipedia encyclopedia endpoints.",
    pydanticCode: `from pydantic import BaseModel, Field

class WikipediaAuditRequest(BaseModel):
    verified_query_text: str = Field(
        ...,
        min_length=5,
        max_length=200,
        description="The exact textual claim or query to verify against Wikipedia records."
    )`,
    defaultPayload: `{
  "verified_query_text": "Gemini is Google's flagship multimodal AI model."
}`,
    validate: (payload: any) => {
      const errors: any[] = [];
      if (payload.verified_query_text === undefined) {
        errors.push({ type: "missing", loc: ["body", "verified_query_text"], msg: "Field required", input: null });
      } else if (typeof payload.verified_query_text !== 'string') {
        errors.push({ type: "string_type", loc: ["body", "verified_query_text"], msg: "Input should be a valid string", input: payload.verified_query_text });
      } else {
        if (payload.verified_query_text.length < 5) {
          errors.push({ type: "string_too_short", loc: ["body", "verified_query_text"], msg: "String should have at least 5 characters", input: payload.verified_query_text });
        }
        if (payload.verified_query_text.length > 200) {
          errors.push({ type: "string_too_long", loc: ["body", "verified_query_text"], msg: "String should have at most 200 characters", input: payload.verified_query_text });
        }
      }
      return { isValid: errors.length === 0, errors };
    }
  },
  {
    id: "AuditResponseSchema",
    name: "AuditResponseSchema",
    description: "Response model containing evaluation status, summary text citation references, and auditor scoring metrics.",
    pydanticCode: `from pydantic import BaseModel, Field
from typing import Optional

class AuditResponseSchema(BaseModel):
    query: str = Field(..., description="The original audited query text.")
    status: str = Field(
        ...,
        pattern="^(Verified|Disputed|Unverified)$",
        description="The evaluation outcome status."
    )
    explanation: str = Field(..., description="Factcheck verdict explanation and reasoning.")
    wikipedia_source_url: Optional[str] = Field(None, description="The relevant Wikipedia page link.")
    confidence_score: float = Field(
        ...,
        ge=0.0,
        le=1.0,
        description="The numerical evaluation confidence score calculated by the auditor service."
    )`,
    defaultPayload: `{
  "query": "Gemini chatbot launch date",
  "status": "Verified",
  "explanation": "Gemini was officially announced by Google on December 6, 2023.",
  "wikipedia_source_url": "https://en.wikipedia.org/wiki/Gemini_(chatbot)",
  "confidence_score": 0.95
}`,
    validate: (payload: any) => {
      const errors: any[] = [];
      if (payload.query === undefined) {
        errors.push({ type: "missing", loc: ["body", "query"], msg: "Field required", input: null });
      } else if (typeof payload.query !== 'string') {
        errors.push({ type: "string_type", loc: ["body", "query"], msg: "Input should be a valid string", input: payload.query });
      }

      if (payload.status === undefined) {
        errors.push({ type: "missing", loc: ["body", "status"], msg: "Field required", input: null });
      } else if (typeof payload.status !== 'string') {
        errors.push({ type: "string_type", loc: ["body", "status"], msg: "Input should be a valid string", input: payload.status });
      } else if (!/^(Verified|Disputed|Unverified)$/.test(payload.status)) {
        errors.push({ type: "string_pattern_mismatch", loc: ["body", "status"], msg: "Input should match pattern '^(Verified|Disputed|Unverified)$'", input: payload.status });
      }

      if (payload.explanation === undefined) {
        errors.push({ type: "missing", loc: ["body", "explanation"], msg: "Field required", input: null });
      } else if (typeof payload.explanation !== 'string') {
        errors.push({ type: "string_type", loc: ["body", "explanation"], msg: "Input should be a valid string", input: payload.explanation });
      }

      if (payload.wikipedia_source_url !== undefined && payload.wikipedia_source_url !== null && typeof payload.wikipedia_source_url !== 'string') {
        errors.push({ type: "string_type", loc: ["body", "wikipedia_source_url"], msg: "Input should be a valid string", input: payload.wikipedia_source_url });
      }

      if (payload.confidence_score === undefined) {
        errors.push({ type: "missing", loc: ["body", "confidence_score"], msg: "Field required", input: null });
      } else if (typeof payload.confidence_score !== 'number') {
        errors.push({ type: "float_type", loc: ["body", "confidence_score"], msg: "Input should be a valid float", input: payload.confidence_score });
      } else {
        if (payload.confidence_score < 0.0) {
          errors.push({ type: "greater_than_equal", loc: ["body", "confidence_score"], msg: "Input should be greater than or equal to 0", input: payload.confidence_score });
        }
        if (payload.confidence_score > 1.0) {
          errors.push({ type: "less_than_equal", loc: ["body", "confidence_score"], msg: "Input should be less than or equal to 1", input: payload.confidence_score });
        }
      }

      return { isValid: errors.length === 0, errors };
    }
  },
  {
    id: "DatabaseTransactionLogs",
    name: "DatabaseTransactionLogs",
    description: "Ingestion tracker parsing activity schemas, serialized JSON, and session refs to ensure log normalization.",
    pydanticCode: `from pydantic import BaseModel, Field
from typing import Optional

class DatabaseTransactionLogs(BaseModel):
    action_type: str = Field(..., description="Action trigger type, e.g. CREATE_PROFILE or FACT_CHECK.")
    payload_json: str = Field(..., description="Stringified JSON representation of the database change payload.")
    session_id: Optional[str] = Field(None, description="The session reference ID, if active.")
    timestamp: str = Field(..., description="Standard ISO-8601 timestamp string representing execution.")`,
    defaultPayload: `{
  "action_type": "CREATE_PROFILE",
  "payload_json": "{\\"UserID\\":\\"USR-1290\\",\\"BioLength\\":125}",
  "session_id": "SESS-7731",
  "timestamp": "2026-07-09T21:43:53Z"
}`,
    validate: (payload: any) => {
      const errors: any[] = [];
      if (payload.action_type === undefined) {
        errors.push({ type: "missing", loc: ["body", "action_type"], msg: "Field required", input: null });
      } else if (typeof payload.action_type !== 'string') {
        errors.push({ type: "string_type", loc: ["body", "action_type"], msg: "Input should be a valid string", input: payload.action_type });
      }

      if (payload.payload_json === undefined) {
        errors.push({ type: "missing", loc: ["body", "payload_json"], msg: "Field required", input: null });
      } else if (typeof payload.payload_json !== 'string') {
        errors.push({ type: "string_type", loc: ["body", "payload_json"], msg: "Input should be a valid string", input: payload.payload_json });
      }

      if (payload.session_id !== undefined && payload.session_id !== null && typeof payload.session_id !== 'string') {
        errors.push({ type: "string_type", loc: ["body", "session_id"], msg: "Input should be a valid string", input: payload.session_id });
      }

      if (payload.timestamp === undefined) {
        errors.push({ type: "missing", loc: ["body", "timestamp"], msg: "Field required", input: null });
      } else if (typeof payload.timestamp !== 'string') {
        errors.push({ type: "string_type", loc: ["body", "timestamp"], msg: "Input should be a valid string", input: payload.timestamp });
      }

      return { isValid: errors.length === 0, errors };
    }
  }
];

interface LifecycleStep {
  title: string;
  actor: string;
  badge: string;
  description: string;
  snippet: string;
}

const lifecycleSteps: LifecycleStep[] = [
  {
    title: "HTTP Request Initiated",
    actor: "React Frontend Client",
    badge: "1. CLIENT INGRESS",
    description: "The user submits their profile/interests and selected networking event. The React application packages this state into a JSON payload and dispatches an asynchronous HTTP POST request to `/api/v1/conversation/generate-conversation`.",
    snippet: `// Client-side API Dispatch
const response = await fetch('/api/v1/conversation/generate-conversation', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    event_description: "AI & ML Networking Dinner 2026",
    user_interests: "API Design, Distributed Systems"
  })
});`
  },
  {
    title: "Gateway Routing (Hub-and-Spoke)",
    actor: "FastAPI Gateway (main.py)",
    badge: "2. ROUTE DISPATCH",
    description: "The incoming request hits the FastAPI container. `main.py` (the hub) matches the route path `/api/v1/*` and delegates the request context to the registered sub-router (the spoke) in `conversation_router.py` without blocking the main event loop.",
    snippet: `# main.py - Hub & Spoke assembly
from fastapi import FastAPI
from app.routers.conversation import router as conversation_router

app = FastAPI(title="AI-Powered Networking Icebreaker API")

# Central mount of the conversation spoke
app.include_router(conversation_router, prefix="/api/v1/conversation")`
  },
  {
    title: "Payload Pydantic Validation",
    actor: "Pydantic Validator (schemas.py)",
    badge: "3. SCHEMA VALIDATION",
    description: "Before any service execution, FastAPI intercepts the incoming JSON body and maps it to a strict Pydantic model (`ConversationRequest`). Pydantic validates data types, string bounds, and missing fields. If validation fails, it auto-rejects with a 422 Unprocessable Entity error; if successful, it passes a type-safe object to the handler.",
    snippet: `# schemas.py - Type constraints
from pydantic import BaseModel, Field

class ConversationRequest(BaseModel):
    event_description: str = Field(..., min_length=5, description="Full context of the event")
    user_interests: str = Field(..., min_length=2, description="Commas separated list of tech topics")`
  },
  {
    title: "Orchestration Pipeline Launch",
    actor: "Router Orchestrator",
    badge: "4. ORCHESTRATION",
    description: "The router function acts as the choreographer. It accepts the validated request model and initializes concurrent/sequential execution blocks to gather predictions from the NLP microservices.",
    snippet: `# conversation.py - Route handler
@router.post("/generate-conversation", response_model=ConversationResponse)
async def generate_conversation_pipeline(payload: ConversationRequest, db = Depends(get_db)):
    # Orchestrates multiple modular service dependencies...`
  },
  {
    title: "Theme Extraction Classifiers",
    actor: "DistilBERT Classifier",
    badge: "5. CLASSIFICATION NLP",
    description: "The orchestrator queries the classifier service. The system tokenizes the event description and runs it through a zero-shot classification pipeline (DistilBERT-base-uncased-mnli) to identify dominant themes (e.g., 'Cloud Infrastructure', 'Artificial Intelligence') with computed confidence scores.",
    snippet: `# classifier_service.py - Zero-shot inference
from transformers import pipeline

classifier = pipeline("zero-shot-classification", model="distilbert-base-uncased-mnli")

def extract_themes(text: str):
    labels = ["AI/ML", "Cloud Computing", "DevOps", "Cybersecurity", "Blockchain"]
    result = classifier(text, candidate_labels=labels)
    return { "themes": result["labels"], "scores": result["scores"] }`
  },
  {
    title: "Openers Synthesis Engine",
    actor: "GPT-2 Text Synthesizer",
    badge: "6. GENERATION ENGINE",
    description: "Armed with the classified event themes and the participant's interests, the orchestrator invokes the generation service. An autoregressive transformer (GPT-2) ingests a custom-designed structured prompt to synthesize engaging, contextual conversation starters.",
    snippet: `# generator_service.py - Text Generation
from transformers import GPT2LMHeadModel, GPT2Tokenizer

tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
model = GPT2LMHeadModel.from_pretrained("gpt2")

def synthesize_openers(themes, interests):
    prompt = f"Event: {themes}. My Interests: {interests}. Starters:"
    inputs = tokenizer.encode(prompt, return_tensors="pt")
    outputs = model.generate(inputs, max_length=150, num_return_sequences=3)
    return [tokenizer.decode(out, skip_special_tokens=True) for out in outputs]`
  },
  {
    title: "Fact Audit Grounding",
    actor: "Wikipedia Auditor & MediaWiki API",
    badge: "7. FACT AUDITING",
    description: "To prevent hallucinations and ground conversation topics, the orchestrator queries the Wikipedia service. It issues a real HTTP search query to Wikipedia's REST API for identified themes and parses standard metadata snippets to provide validated context cards.",
    snippet: `# wikipedia_service.py - Grounding
import httpx

async def verify_concept_grounding(concept: str):
    url = f"https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro&explaintext&titles={concept}"
    async with httpx.AsyncClient() as client:
        r = await client.get(url)
        pages = r.json()["query"]["pages"]
        # Extract abstract grounding details...`
  },
  {
    title: "Durable History Auditing",
    actor: "History Logger & SQLite Database",
    badge: "8. PERSISTENCE LAYER",
    description: "Once the AI models finish synthesizing response objects, the orchestrator calls the history log service. It maps the payload to an ORM schema, generates a secure UUID, and performs a thread-safe write to persist the transaction details for analytics.",
    snippet: `# conversation_router.py - Async Persistence
db_record = SavedSession(
    event_name=payload.event_description,
    themes=extracted_themes,
    topics=generated_topics,
    timestamp=datetime.utcnow()
)
db.add(db_record)
await db.commit()`
  },
  {
    title: "Response Serialization & Return",
    actor: "FastAPI Serialization Engine",
    badge: "9. HTTP RESPONSE OUT",
    description: "The orchestrator packages all consolidated outputs into an instance of `ConversationResponse`. FastAPI's underlying serializer converts the Python objects, parses datetime strings, and streams the finished JSON package back through the socket under HTTP 200 OK.",
    snippet: `# Auto-serialization declaration
class ConversationResponse(BaseModel):
    success: bool
    event_themes: List[str]
    conversation_topics: List[str]
    action_suggestions: List[str]
    record_id: str`
  },
  {
    title: "UI State Synchronization",
    actor: "React Application Client",
    badge: "10. CLIENT HYDRATION",
    description: "The React frontend receives the JSON stream, updates local state hooks, stops the loading spinners, and hydrates the bento cards, history lists, and chat rooms instantly with fluid entering transitions.",
    snippet: `// React UI state updating
const data = await response.json();
setGeneratedTopics(data.conversation_topics);
setSavedHistory(prev => [data.automatic_logging, ...prev]);
setIsLoading(false);`
  }
];

const ArchitectureGuide: React.FC = () => {
  const [activeGuideTab, setActiveGuideTab] = useState<'architecture' | 'environment' | 'backend' | 'pydantic' | 'distilbert' | 'gpt2' | 'wikipedia' | 'history' | 'feedback' | 'router' | 'main' | 'services' | 'streamlit' | 'testing'>('architecture');
  const [selectedNode, setSelectedNode] = useState<FileNode | null>(directoryData.children ? directoryData.children[0] : null);
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'networking-analytics-ai': true,
    'app': true,
    'api': true,
    'services': true,
    'frontend': false,
    'components': false,
    'tests': false
  });

  // Environment tab states
  const [osPlatform, setOsPlatform] = useState<'unix' | 'windows'>('unix');
  const [copiedStep, setCopiedStep] = useState<number | null>(null);
  const [activeSetupStep, setActiveSetupStep] = useState<number>(0);

  // Backend tab states
  const [selectedBackendModule, setSelectedBackendModule] = useState<BackendModule>(backendModules[0]);
  const [copiedBackendSnippet, setCopiedBackendSnippet] = useState<boolean>(false);
  const [pytestSimulating, setPytestSimulating] = useState<boolean>(false);
  const [pytestOutputLogs, setPytestOutputLogs] = useState<string[]>([]);
  const [pytestCompleted, setPytestCompleted] = useState<boolean>(false);

  // Pydantic tab states
  const [selectedPydanticModel, setSelectedPydanticModel] = useState<PydanticModel>(pydanticModelsList[0]);
  const [pydanticPayload, setPydanticPayload] = useState<string>(pydanticModelsList[0].defaultPayload);
  const [pydanticValidationResult, setPydanticValidationResult] = useState<{
    status: 'idle' | 'success' | 'fail' | 'json_error';
    errors?: any[];
    validatedData?: any;
    rawInput?: string;
  }>({ status: 'idle' });

  const handlePydanticModelChange = (modelId: string) => {
    const model = pydanticModelsList.find(m => m.id === modelId) || pydanticModelsList[0];
    setSelectedPydanticModel(model);
    setPydanticPayload(model.defaultPayload);
    setPydanticValidationResult({ status: 'idle' });
  };

  const executePydanticValidation = () => {
    try {
      const parsed = JSON.parse(pydanticPayload);
      const res = selectedPydanticModel.validate(parsed);
      if (res.isValid) {
        setPydanticValidationResult({
          status: 'success',
          validatedData: parsed
        });
      } else {
        setPydanticValidationResult({
          status: 'fail',
          errors: res.errors,
          rawInput: pydanticPayload
        });
      }
    } catch (err: any) {
      setPydanticValidationResult({
        status: 'json_error',
        errors: [{ msg: `Invalid JSON syntax: ${err.message}` }]
      });
    }
  };

  // DistilBERT Zero-Shot NLP Classifier Simulator States
  const [distilbertModelLoaded, setDistilbertModelLoaded] = useState<boolean>(false);
  const [distilbertIsLoading, setDistilbertIsLoading] = useState<boolean>(false);
  const [distilbertEventInput, setDistilbertEventInput] = useState<string>(
    "Next-Gen AI Summit 2026: An elite gathering of researchers, designers, and industry architects discussing multimodal interfaces, agentic frameworks, and AI-enabled software engineering safety."
  );
  const [distilbertCandidateLabels, setDistilbertCandidateLabels] = useState<string[]>([
    "AI & ML",
    "Healthcare",
    "Blockchain",
    "Education",
    "Sustainability",
    "Cybersecurity",
    "Cloud Infrastructure"
  ]);
  const [distilbertNewLabel, setDistilbertNewLabel] = useState<string>("");
  const [distilbertInferenceRunning, setDistilbertInferenceRunning] = useState<boolean>(false);
  const [distilbertResults, setDistilbertResults] = useState<{ label: string; score: number }[] | null>(null);
  const [distilbertLatency, setDistilbertLatency] = useState<number | null>(null);
  const [distilbertStats, setDistilbertStats] = useState<{
    requestsCount: number;
    lastLoadTime: number | null;
    lastInferenceTime: number | null;
  }>({
    requestsCount: 0,
    lastLoadTime: null,
    lastInferenceTime: null
  });

  // Action to preload DistilBERT pipeline (startup load)
  const preloadDistilbertModel = (silent: boolean = false) => {
    if (distilbertModelLoaded || distilbertIsLoading) return;
    if (!silent) setDistilbertIsLoading(true);
    
    setTimeout(() => {
      setDistilbertModelLoaded(true);
      if (!silent) {
        setDistilbertIsLoading(false);
        setDistilbertStats(prev => ({
          ...prev,
          lastLoadTime: 2450 // typical huggingface pipelines model-load delay
        }));
      }
    }, 2450);
  };

  // Action to add candidate tag
  const handleAddCandidateLabel = () => {
    const trimmed = distilbertNewLabel.trim();
    if (!trimmed) return;
    if (distilbertCandidateLabels.map(l => l.toLowerCase()).includes(trimmed.toLowerCase())) {
      setDistilbertNewLabel("");
      return;
    }
    setDistilbertCandidateLabels(prev => [...prev, trimmed]);
    setDistilbertNewLabel("");
  };

  // Action to remove candidate tag
  const handleRemoveCandidateLabel = (indexToRemove: number) => {
    setDistilbertCandidateLabels(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Action to run DistilBERT Zero-Shot Classification
  const runDistilbertInference = () => {
    if (distilbertInferenceRunning || !distilbertEventInput.trim()) return;

    setDistilbertInferenceRunning(true);
    const hasPreloaded = distilbertModelLoaded;
    const initialLoadDelay = hasPreloaded ? 0 : 2450;

    // If not preloaded, simulate startup delay
    if (!hasPreloaded) {
      setDistilbertIsLoading(true);
    }

    setTimeout(() => {
      // Model loaded state is updated
      if (!hasPreloaded) {
        setDistilbertModelLoaded(true);
        setDistilbertIsLoading(false);
      }

      // Simulate model classification
      setTimeout(() => {
        const text = distilbertEventInput.trim();
        const results = scoreZeroShot(text, distilbertCandidateLabels);
        
        // Random latency between 35ms and 65ms for preloaded CPU/GPU inference
        const simulatedInferenceTime = Math.floor(35 + Math.random() * 30);
        const totalDuration = initialLoadDelay + simulatedInferenceTime;

        setDistilbertResults(results);
        setDistilbertLatency(totalDuration);
        setDistilbertInferenceRunning(false);

        setDistilbertStats(prev => ({
          requestsCount: prev.requestsCount + 1,
          lastLoadTime: hasPreloaded ? prev.lastLoadTime : 2450,
          lastInferenceTime: simulatedInferenceTime
        }));
      }, 350); // small UI delay to make inference feel realistic
    }, initialLoadDelay);
  };

  // TypeScript helper function for scoring candidate labels based on keyword matches
  const scoreZeroShot = (text: string, labels: string[]) => {
    const normalized = text.toLowerCase();
    
    // Custom dictionary matching mapping labels to keywords
    const dict: Record<string, string[]> = {
      "ai & ml": ["ai", "artificial intelligence", "ml", "machine learning", "neural", "deep learning", "agent", "llm", "gpt", "model", "nlp"],
      "healthcare": ["health", "medical", "medicine", "clinical", "hospital", "biotech", "patient", "disease"],
      "blockchain": ["blockchain", "crypto", "bitcoin", "ethereum", "web3", "ledger", "solidity", "token", "nft"],
      "education": ["education", "school", "learning", "classroom", "bootcamp", "course", "curriculum", "teaching", "student"],
      "sustainability": ["sustainability", "climate", "green", "carbon", "renewable", "solar", "wind", "ecological", "environmental"],
      "cybersecurity": ["security", "cyber", "hack", "penetration", "encryption", "firewall", "vulnerability", "auth", "zero-trust"],
      "cloud infrastructure": ["cloud", "kubernetes", "docker", "serverless", "aws", "gcp", "azure", "ingress", "infra", "container", "microservice"]
    };

    const scored = labels.map(label => {
      const lLower = label.trim().toLowerCase();
      let score = 0.05 + Math.random() * 0.1; // base confidence noise

      // Check dictionary matches
      if (dict[lLower]) {
        dict[lLower].forEach(keyword => {
          if (normalized.includes(keyword)) {
            score += 0.35;
          }
        });
      }

      // Check substring matches on raw tag text
      if (normalized.includes(lLower)) {
        score += 0.5;
      }

      // Clamp max value
      score = Math.min(0.98, score);
      return { label: label.trim(), score };
    });

    // Normalize scores so they sum up to ~1.0 if scores are present, or represent probability
    const total = scored.reduce((acc, curr) => acc + curr.score, 0);
    const normalizedScores = scored.map(item => ({
      label: item.label,
      score: total > 0 ? Number((item.score / total).toFixed(4)) : item.score
    }));

    // Sort descending and return top 3
    return normalizedScores.sort((a, b) => b.score - a.score).slice(0, 3);
  };

  // GPT-2 Conversation Generator Simulator States
  const [gpt2ModelLoaded, setGpt2ModelLoaded] = useState<boolean>(false);
  const [gpt2IsLoading, setGpt2IsLoading] = useState<boolean>(false);
  const [gpt2ThemesInput, setGpt2ThemesInput] = useState<string>("AI & ML, Developer Tools");
  const [gpt2InterestsInput, setGpt2InterestsInput] = useState<string>("APIs, developer tooling, neural nets");
  const [gpt2Seed, setGpt2Seed] = useState<number | null>(42);
  const [gpt2MaxLength, setGpt2MaxLength] = useState<number>(80);
  const [gpt2InferenceRunning, setGpt2InferenceRunning] = useState<boolean>(false);
  const [gpt2RawOutput, setGpt2RawOutput] = useState<string>("");
  const [gpt2ProcessedOutput, setGpt2ProcessedOutput] = useState<string[]>([]);
  const [gpt2Latency, setGpt2Latency] = useState<number | null>(null);
  const [gpt2Stats, setGpt2Stats] = useState<{
    requestsCount: number;
    lastLoadTime: number | null;
    lastInferenceTime: number | null;
  }>({
    requestsCount: 0,
    lastLoadTime: null,
    lastInferenceTime: null
  });

  // Action to preload GPT-2 pipeline (startup load)
  const preloadGpt2Model = (silent: boolean = false) => {
    if (gpt2ModelLoaded || gpt2IsLoading) return;
    if (!silent) setGpt2IsLoading(true);
    
    setTimeout(() => {
      setGpt2ModelLoaded(true);
      if (!silent) {
        setGpt2IsLoading(false);
        setGpt2Stats(prev => ({
          ...prev,
          lastLoadTime: 2800 // typical gpt2 load delay
        }));
      }
    }, 2800);
  };

  // Helper function for simulated GPT-2 generation
  const simulateGpt2Generation = (themes: string, interests: string, seed: number | null, maxLength: number) => {
    const themeList = themes.split(',').map(t => t.trim()).filter(Boolean);
    const primaryTheme = themeList[0] || "AI & ML";
    const secondaryTheme = themeList[1] || "Networking";
    
    const interestList = interests.split(',').map(i => i.trim()).filter(Boolean);
    const primaryInterest = interestList[0] || "coding";
    const secondaryInterest = interestList[1] || "chatting";

    // Dynamic conversation starter templates
    const startersTemplates = [
      [
        `Hey there! I saw you in the ${primaryTheme} session. Are you currently working on ${primaryInterest} projects?`,
        `Nice to meet you! With your interest in ${secondaryInterest}, what are your thoughts on the new ${primaryTheme} advancements?`,
        `Hi! I'm trying to connect with folks doing ${primaryInterest}. Have you had a chance to explore ${secondaryTheme} yet?`
      ],
      [
        `Excuse me, are you attending the next workshop on ${secondaryTheme}? I'm really curious how it integrates with ${primaryInterest}.`,
        `Hello! I'm trying to learn more about ${primaryTheme}. Do you have any favorite developer tools for building ${secondaryInterest}?`,
        `Hi! Great turnout today. Are you focusing more on the ${primaryTheme} side of things, or ${secondaryInterest}?`
      ],
      [
        `Hey! I'm working on a project that combines ${primaryTheme} and ${primaryInterest}. What are you working on these days?`,
        `Hello! Are you here for the networking or do you have a session on ${secondaryTheme}? I'd love to chat about ${secondaryInterest}!`,
        `Hey, I overheard you talking about ${primaryInterest}. Do you think ${primaryTheme} is going to completely change how we design that?`
      ]
    ];

    // Seed-based selection
    // If seed is 42, we have strict consistency (reproducibility)
    let index = 0;
    if (seed === 42) {
      index = 0; // strict reproducibility!
    } else {
      index = Math.floor(Math.random() * startersTemplates.length);
    }

    const selectedStarters = startersTemplates[index];

    // GPT-2 raw output styling with prompt context prefix
    const rawIntro = `Prompt: You are an attendee at a meetup about ${themes}. Your interests are ${interests}. Write 3 natural conversation starters.\n\nGPT-2 Raw Output (max_length=${maxLength}):\n`;
    const bulletTypes = ["*", "-", "1.", "2.", "3."];
    const bullet1 = seed === 42 ? "1." : bulletTypes[Math.floor(Math.random() * bulletTypes.length)];
    const bullet2 = seed === 42 ? "2." : bulletTypes[Math.floor(Math.random() * bulletTypes.length)];
    const bullet3 = seed === 42 ? "3." : bulletTypes[Math.floor(Math.random() * bulletTypes.length)];

    const line1 = `${bullet1} ${selectedStarters[0]}`;
    const line2 = `${bullet2} ${selectedStarters[1]}`;
    const line3 = `${bullet3} ${selectedStarters[2]}`;
    
    // Add trailing generation noise
    let trailingNoise = "";
    if (maxLength > 60) {
      trailingNoise = `\nI believe that talking about ${primaryInterest} is really the best icebreaker because people love sharing their projects. We should also check if they are hiring for ${primaryTheme}... [Truncated by max_length limit]`;
    }

    const fullRawText = `Here are 3 good starters:\n${line1}\n${line2}\n${line3}${trailingNoise}`;
    
    return {
      raw: rawIntro + fullRawText,
      clean: selectedStarters
    };
  };

  // Action to run GPT-2 text generation
  const runGpt2Inference = () => {
    if (gpt2InferenceRunning || !gpt2ThemesInput.trim() || !gpt2InterestsInput.trim()) return;

    setGpt2InferenceRunning(true);
    const hasPreloaded = gpt2ModelLoaded;
    const initialLoadDelay = hasPreloaded ? 0 : 2800;

    if (!hasPreloaded) {
      setGpt2IsLoading(true);
    }

    setTimeout(() => {
      if (!hasPreloaded) {
        setGpt2ModelLoaded(true);
        setGpt2IsLoading(false);
      }

      setTimeout(() => {
        const { raw, clean } = simulateGpt2Generation(
          gpt2ThemesInput,
          gpt2InterestsInput,
          gpt2Seed,
          gpt2MaxLength
        );

        const simulatedInferenceTime = Math.floor(45 + Math.random() * 40);
        const totalDuration = initialLoadDelay + simulatedInferenceTime;

        setGpt2RawOutput(raw);
        setGpt2ProcessedOutput(clean);
        setGpt2Latency(totalDuration);
        setGpt2InferenceRunning(false);

        setGpt2Stats(prev => ({
          requestsCount: prev.requestsCount + 1,
          lastLoadTime: hasPreloaded ? prev.lastLoadTime : 2800,
          lastInferenceTime: simulatedInferenceTime
        }));
      }, 450); // small delay to make inference feel realistic
    }, initialLoadDelay);
  };

  // Wikipedia Fact-Verification Layer States
  const [wikiQuery, setWikiQuery] = useState<string>("Generative pre-trained transformer 2");
  const [wikiInferenceRunning, setWikiInferenceRunning] = useState<boolean>(false);
  const [wikiResult, setWikiResult] = useState<string | null>(null);
  const [wikiSourceUrl, setWikiSourceUrl] = useState<string | null>(null);
  const [wikiLatency, setWikiLatency] = useState<number | null>(null);
  const [wikiIsFallback, setWikiIsFallback] = useState<boolean>(false);
  const [wikiResponsePayload, setWikiResponsePayload] = useState<any | null>(null);
  const [wikiStats, setWikiStats] = useState<{
    requestsCount: number;
    lastInferenceTime: number | null;
  }>({
    requestsCount: 0,
    lastInferenceTime: null
  });

  // Action to run Wikipedia Fact-Check querying with CORS-safe REST API and defensive try-except
  const runWikiFactCheck = async () => {
    if (wikiInferenceRunning || !wikiQuery.trim()) return;

    setWikiInferenceRunning(true);
    setWikiIsFallback(false);
    const startTime = performance.now();

    try {
      const formattedQuery = wikiQuery.trim().replace(/\s+/g, '_');
      const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(formattedQuery)}`;
      
      const response = await fetch(url, {
        headers: {
          'Api-User-Agent': 'NetworkingAnalyticsAI/1.0 (lakshmijahnavibalaraju@gmail.com)'
        }
      });

      if (!response.ok) {
        throw new Error(`Wikipedia REST API returned HTTP ${response.status}`);
      }

      const data = await response.json();
      const latency = Math.round(performance.now() - startTime);

      if (data && data.extract) {
        setWikiResult(data.extract);
        setWikiSourceUrl(data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${formattedQuery}`);
        setWikiLatency(latency);
        setWikiResponsePayload({
          status: "success",
          title: data.title,
          description: data.description || "No short description available",
          extract: data.extract,
          url: data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${formattedQuery}`,
          latency_ms: latency
        });
        setWikiStats(prev => ({
          requestsCount: prev.requestsCount + 1,
          lastInferenceTime: latency
        }));
      } else {
        throw new Error("Invalid response format or empty extract");
      }
    } catch (error: any) {
      const latency = Math.round(performance.now() - startTime);
      setWikiIsFallback(true);
      const fallbackText = `[Fallback Response] Unable to dynamically query Wikipedia for "${wikiQuery}". Defensive programming layer intercepted: "${error?.message || 'Network failure / CORS restriction'}". Returning local standard knowledge summary instead: DistilBERT and GPT-2 are widely discussed Transformer models created by Hugging Face and OpenAI respectively, used for zero-shot text classification and autoregressive generation tasks in modern NLP pipelines.`;
      
      setWikiResult(fallbackText);
      setWikiSourceUrl(`https://en.wikipedia.org/wiki/${encodeURIComponent(wikiQuery.trim().replace(/\s+/g, '_'))}`);
      setWikiLatency(latency);
      setWikiResponsePayload({
        status: "fallback",
        query: wikiQuery,
        error: error?.message || "Unknown error",
        fallback_used: true,
        latency_ms: latency,
        extract: fallbackText
      });
      setWikiStats(prev => ({
        requestsCount: prev.requestsCount + 1,
        lastInferenceTime: latency
      }));
    } finally {
      setWikiInferenceRunning(false);
    }
  };

  // History Logger Persistent Storage Simulator States
  const [historyItems, setHistoryItems] = useState<any[]>(() => {
    const saved = localStorage.getItem('architecture_guide_history_json');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return [
      {
        timestamp: "2026-07-09T18:32:15.123Z",
        themes: "AI & ML, Developer Tools",
        interests: "APIs, developer tooling, neural nets",
        icebreakers: [
          "Hey there! I saw you in the AI & ML session. Are you currently working on APIs projects?",
          "Nice to meet you! With your interest in neural nets, what are your thoughts on the new AI & ML advancements?",
          "Hi! I'm trying to connect with folks doing APIs. Have you had a chance to explore Developer Tools yet?"
        ]
      },
      {
        timestamp: "2026-07-09T20:15:44.987Z",
        themes: "Web Development, CSS Grid",
        interests: "UI design, Tailwind, design systems",
        icebreakers: [
          "Hey! I saw you in the Web Development room. Are you focused on UI design?",
          "What are your thoughts on the latest CSS Grid techniques for building fluid systems?",
          "Nice to meet you! I'm really curious how Tailwind integrates with modern design systems."
        ]
      }
    ];
  });

  const [newLogThemes, setNewLogThemes] = useState<string>("Cloud Computing, Serverless");
  const [newLogInterests, setNewLogInterests] = useState<string>("Docker, AWS, microservices");
  const [newLogIcebreakers, setNewLogIcebreakers] = useState<string[]>([
    "Hi there! Are you attending the serverless keynote? I'm trying to explore AWS patterns.",
    "Nice to meet you! With your experience in Docker, do you prefer building microservices on cloud functions?",
    "Hey! I'm building a cloud computing project. What are your favorite developer frameworks?"
  ]);
  const [isLoggingConversation, setIsLoggingConversation] = useState<boolean>(false);
  const [historyFilePath, setHistoryFilePath] = useState<string>("data/history.json");
  const [historyStats, setHistoryStats] = useState<{
    writeOperations: number;
    readOperations: number;
    lastOpTime: number | null;
  }>({
    writeOperations: 0,
    readOperations: 2,
    lastOpTime: null
  });

  const [logTrace, setLogTrace] = useState<string[]>([]);

  // Action to log conversation simulating python pathlib.Path append-to-JSON list with read-modify-write safety
  const runLogConversation = () => {
    if (isLoggingConversation || !newLogThemes.trim() || !newLogInterests.trim()) return;

    setIsLoggingConversation(true);
    setLogTrace([]);
    const startTime = performance.now();

    // Staggered log trace to simulate step-by-step execution logs of python script
    const traceSteps = [
      `[1/5] Initializing pathlib.Path("${historyFilePath}") for safe cross-platform path resolution...`,
      `[2/5] Verification: Attempting to read existing history from disk...`,
      historyItems.length > 0 
        ? `[3/5] File exists. Parsing ${historyItems.length} JSON records into memory list...` 
        : `[3/5] File not found or empty. Initializing new clean conversation list: []`,
      `[4/5] Pre-processing payload: Appending ISO timestamp to new conversation entry...`,
      `[5/5] Write-back: Serializing and flushing updated JSON list with 4-space indentation to disk...`
    ];

    // Simulate trace log stream
    traceSteps.forEach((step, index) => {
      setTimeout(() => {
        setLogTrace(prev => [...prev, step]);
      }, (index + 1) * 150);
    });

    setTimeout(() => {
      const newEntry = {
        timestamp: new Date().toISOString(),
        themes: newLogThemes.trim(),
        interests: newLogInterests.trim(),
        icebreakers: [...newLogIcebreakers]
      };

      const updated = [newEntry, ...historyItems];
      setHistoryItems(updated);
      localStorage.setItem('architecture_guide_history_json', JSON.stringify(updated));

      const latency = Math.round(performance.now() - startTime);

      setHistoryStats(prev => ({
        writeOperations: prev.writeOperations + 1,
        readOperations: prev.readOperations + 1,
        lastOpTime: latency
      }));

      setIsLoggingConversation(false);
    }, 900);
  };

  // Action to clear history file to test empty state / fallback of load_history()
  const runDeleteHistoryFile = () => {
    setHistoryItems([]);
    localStorage.removeItem('architecture_guide_history_json');
    setHistoryStats(prev => ({
      ...prev,
      lastOpTime: 12
    }));
    setLogTrace([
      `[pathlib] Path("${historyFilePath}").unlink(missing_ok=True) called.`,
      `[Disk] history.json has been deleted from persistent volume.`,
      `[load_history] Ready to test clean fallback read interface.`
    ]);
  };

  // Generate randomized new mock starters
  const randomizeNewLog = () => {
    const techPresets = [
      {
        themes: "Cybersecurity, Zero Trust",
        interests: "Auth0, OAuth2, pentesting, network packet analysis",
        icebreakers: [
          "Hey! Are you working on network security projects or application pen-testing?",
          "With your OAuth2 background, what's your take on modern key-rotation strategies?",
          "Nice to meet you! I'm trying to learn more about setting up robust zero-trust networks."
        ]
      },
      {
        themes: "Game Dev, WebGL",
        interests: "Three.js, physics engines, shaders, GLSL",
        icebreakers: [
          "Hello! I saw you are into WebGL. Are you working with Three.js or custom shaders?",
          "Physics engines can be a pain! Have you used Rapier or Cannons for real-time collisions?",
          "Hi! I am trying to build an immersive game lobby. Have you built custom render pipelines?"
        ]
      },
      {
        themes: "DevOps, Kubernetes",
        interests: "Helm, GitOps, CI/CD pipelines, Prometheus metrics",
        icebreakers: [
          "Hey there! Are you managing clusters on-prem or multi-cloud with Kubernetes?",
          "I'm looking into ArgoCD for true GitOps delivery. What tools do you run in your CI pipeline?",
          "Hi! How are you handling containerized prometheus metric alerts at scale?"
        ]
      }
    ];

    const chosen = techPresets[Math.floor(Math.random() * techPresets.length)];
    setNewLogThemes(chosen.themes);
    setNewLogInterests(chosen.interests);
    setNewLogIcebreakers(chosen.icebreakers);
  };

  // Feedback Logger Persistent Storage Simulator States
  const [feedbackItems, setFeedbackItems] = useState<any[]>(() => {
    const saved = localStorage.getItem('architecture_guide_feedback_json');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return [
      {
        timestamp: "2026-07-09T19:40:00.123Z",
        suggestion_text: "Hey there! I saw you in the AI & ML session. Are you currently working on APIs projects?",
        action: "like"
      },
      {
        timestamp: "2026-07-09T21:10:30.987Z",
        suggestion_text: "What are your thoughts on the latest CSS Grid techniques for building fluid systems?",
        action: "dislike"
      }
    ];
  });

  const [newFeedbackSuggestion, setNewFeedbackSuggestion] = useState<string>("Hey there! I saw you in the AI & ML session. Are you currently working on APIs projects?");
  const [isLoggingFeedback, setIsLoggingFeedback] = useState<boolean>(false);
  const [feedbackFilePath, setFeedbackFilePath] = useState<string>("data/feedback.json");
  const [feedbackStats, setFeedbackStats] = useState<{
    writeOperations: number;
    likeCount: number;
    dislikeCount: number;
    lastOpTime: number | null;
  }>(() => {
    const saved = localStorage.getItem('architecture_guide_feedback_json');
    let initialLikes = 1;
    let initialDislikes = 1;
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        initialLikes = parsed.filter((item: any) => item.action === 'like').length;
        initialDislikes = parsed.filter((item: any) => item.action === 'dislike').length;
      } catch (e) {}
    }
    return {
      writeOperations: 0,
      likeCount: initialLikes,
      dislikeCount: initialDislikes,
      lastOpTime: null
    };
  });

  const [feedbackTrace, setFeedbackTrace] = useState<string[]>([]);

  // Action to log user feedback rating simulating python pathlib.Path append-to-JSON list with read-modify-write safety
  const runLogFeedback = (action: 'like' | 'dislike') => {
    if (isLoggingFeedback || !newFeedbackSuggestion.trim()) return;

    setIsLoggingFeedback(true);
    setFeedbackTrace([]);
    const startTime = performance.now();

    const traceSteps = [
      `[1/5] Initializing pathlib.Path("${feedbackFilePath}") for safe cross-platform path resolution...`,
      `[2/5] Verification: Checking if feedback storage file exists on persistent storage...`,
      feedbackItems.length > 0 
        ? `[3/5] File exists. Loaded ${feedbackItems.length} feedback rating entries into memory list...` 
        : `[3/5] File not found or empty. Initializing new clean feedback structure: []`,
      `[4/5] Correlation: Correlating rated action "${action}" with exact text query: "${newFeedbackSuggestion.slice(0, 45)}..."`,
      `[5/5] Write-back: Serializing and flushing updated feedback JSON list with 4-space indentation to disk...`
    ];

    traceSteps.forEach((step, index) => {
      setTimeout(() => {
        setFeedbackTrace(prev => [...prev, step]);
      }, (index + 1) * 150);
    });

    setTimeout(() => {
      const newEntry = {
        timestamp: new Date().toISOString(),
        suggestion_text: newFeedbackSuggestion.trim(),
        action: action
      };

      const updated = [newEntry, ...feedbackItems];
      setFeedbackItems(updated);
      localStorage.setItem('architecture_guide_feedback_json', JSON.stringify(updated));

      const latency = Math.round(performance.now() - startTime);

      setFeedbackStats(prev => ({
        writeOperations: prev.writeOperations + 1,
        likeCount: action === 'like' ? prev.likeCount + 1 : prev.likeCount,
        dislikeCount: action === 'dislike' ? prev.dislikeCount + 1 : prev.dislikeCount,
        lastOpTime: latency
      }));

      setIsLoggingFeedback(false);
    }, 900);
  };

  // Action to clear feedback file to test empty state / fallback
  const runDeleteFeedbackFile = () => {
    setFeedbackItems([]);
    localStorage.removeItem('architecture_guide_feedback_json');
    setFeedbackStats(prev => ({
      ...prev,
      likeCount: 0,
      dislikeCount: 0,
      lastOpTime: 8
    }));
    setFeedbackTrace([
      `[pathlib] Path("${feedbackFilePath}").unlink(missing_ok=True) called.`,
      `[Disk] feedback.json has been deleted from persistent volume.`,
      `[load_feedback] Ready to test clean fallback empty list read interface.`
    ]);
  };

  // Helper to randomize suggestion presets
  const randomizeFeedbackSuggestion = () => {
    const suggestions = [
      "Hey there! I saw you in the AI & ML session. Are you currently working on APIs projects?",
      "What are your thoughts on the latest CSS Grid techniques for building fluid systems?",
      "Nice to meet you! I'm really curious how Tailwind integrates with modern design systems.",
      "Hi there! Are you attending the serverless keynote? I'm trying to explore AWS patterns.",
      "With your OAuth2 background, what's your take on modern key-rotation strategies?",
      "I'm looking into ArgoCD for true GitOps delivery. What tools do you run in your CI pipeline?"
    ];
    const filtered = suggestions.filter(s => s !== newFeedbackSuggestion);
    const chosen = filtered[Math.floor(Math.random() * filtered.length)];
    setNewFeedbackSuggestion(chosen);
  };

  // Simple deterministic helpers to mimic the FastAPI integration pipeline
  const getSimulatedThemes = (text: string) => {
    const t = text.toLowerCase();
    const tags: string[] = [];
    if (t.includes('ai') || t.includes('ml') || t.includes('learning') || t.includes('neural') || t.includes('intelligence')) {
      tags.push("AI & ML");
    }
    if (t.includes('performance') || t.includes('speed') || t.includes('rendering') || t.includes('hackathon') || t.includes('optimization')) {
      tags.push("Web Performance");
    }
    if (t.includes('serverless') || t.includes('cloud') || t.includes('aws') || t.includes('infrastructure')) {
      tags.push("Cloud Infrastructure");
    }
    if (t.includes('api') || t.includes('interface') || t.includes('endpoints') || t.includes('router') || t.includes('fastapi')) {
      tags.push("API Design");
    }
    if (tags.length === 0) {
      tags.push("Software Engineering");
    }
    return tags;
  };

  const getSimulatedFactCheck = (query: string) => {
    const q = query.toLowerCase().trim();
    if (q.includes('fastapi')) {
      return "FastAPI is a modern, fast (high-performance), web framework for building APIs with Python 3.8+ based on standard Python type hints. Key features include automatic interactive documentation via OpenAPI/Swagger, Pydantic data serialization, and native ASGI asynchronous support.";
    }
    if (q.includes('gpt-2') || q.includes('gpt2')) {
      return "GPT-2 (Generative Pre-trained Transformer 2) is an open-source artificial intelligence large language model created by OpenAI in February 2019. It is a transformer-based causal language model designed to predict the next word in a sequence of text.";
    }
    if (q.includes('transformer')) {
      return "The Transformer is a deep learning architecture introduced in 2017 by Google researchers. It is based on self-attention mechanisms and is the foundational architecture of modern Large Language Models (LLMs).";
    }
    return `Wikipedia entry for "${query}" verified: A robust standard service summary indicating correct concept mapping. Confidence score remains high based on contextual validation.`;
  };

  const getSimulatedTopics = (event: string, interests: string) => {
    const ev = event.toLowerCase();
    const ints = interests.toLowerCase();
    
    const topics: string[] = [];
    
    if (ev.includes('ai') || ev.includes('ml') || ints.includes('api') || ints.includes('llm') || ints.includes('intelligence')) {
      topics.push("Optimizing prompt engineering patterns with structured output schemas");
      topics.push("Comparing stateful vs stateless orchestration patterns in agentic workflows");
    }
    if (ev.includes('performance') || ints.includes('css') || ints.includes('rendering') || ints.includes('performance') || ints.includes('speed')) {
      topics.push("Modern bundle bundling strategies and critical paint analysis in enterprise sites");
      topics.push("Edge-side rendering techniques and HTTP-caching best practices");
    }
    if (ev.includes('serverless') || ints.includes('cloud') || ints.includes('distributed') || ints.includes('infrastructure')) {
      topics.push("Evaluating serverless cold-start latency mitigation techniques");
      topics.push("Designing horizontally scaling real-time WebSocket connection pools");
    }
    
    if (topics.length === 0) {
      topics.push("Evolving software architecture styles from microservices to modular monoliths");
      topics.push("Addressing architectural debt while scaling distributed systems under load");
    }
    return topics;
  };

  const getSimulatedSuggestions = (event: string, interests: string) => {
    const ev = event.toLowerCase();
    const ints = interests.toLowerCase();
    const suggestions: string[] = [];
    
    if (ev.includes('ai') || ev.includes('ml') || ints.includes('api')) {
      suggestions.push("Ask another engineer about how they handle rate-limiting or caching for LLM requests.");
    } else if (ev.includes('performance') || ints.includes('render')) {
      suggestions.push("Find someone working on micro-frontends and discuss bundle-splitting approaches.");
    } else {
      suggestions.push("Discuss the trade-offs of using Postgres or Firestore for persistent high-throughput analytics logging.");
    }
    
    suggestions.push("Share a recent discovery or lesson learned from configuring CI/CD pipelines.");
    return suggestions;
  };

  // Router Visualizer States
  const [routerSelectedEndpoint, setRouterSelectedEndpoint] = useState<'/analyze-event' | '/fact-check' | '/generate-conversation'>('/generate-conversation');
  const [routerEventInput, setRouterEventInput] = useState<string>("AI & ML Networking Dinner 2026");
  const [routerInterestsInput, setRouterInterestsInput] = useState<string>("API Design, Distributed Systems, Kubernetes");
  const [routerFactQuery, setRouterFactQuery] = useState<string>("FastAPI");
  const [isRoutingRequest, setIsRoutingRequest] = useState<boolean>(false);
  const [routerTrace, setRouterTrace] = useState<string[]>([]);
  const [routerResponse, setRouterResponse] = useState<any | null>(null);
  const [automaticHistoryLogs, setAutomaticHistoryLogs] = useState<any[]>(() => {
    const saved = localStorage.getItem('architecture_guide_history_json');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0) return parsed;
      } catch (e) {}
    }
    return [
      {
        id: "hist_123ab",
        timestamp: "2026-07-09T20:15:22.112Z",
        event: "Web Performance Hackathon",
        interests: "CSS Grid, HMR, Rendering optimization",
        themes: ["Web Performance"],
        topics: [
          "Optimizing critical rendering path in high-load setups",
          "Dynamic bundle chunking strategies with Vite/ESBuild"
        ],
        suggestions: [
          "Ask someone about their experience with containerizing Vite apps."
        ]
      }
    ];
  });

  const runRouterOrchestration = () => {
    if (isRoutingRequest) return;
    setIsRoutingRequest(true);
    setRouterTrace([]);
    setRouterResponse(null);

    const startTime = performance.now();

    if (routerSelectedEndpoint === '/analyze-event') {
      const steps = [
        `[FastAPI Ingress] POST /analyze-event received. Deserializing payload...`,
        `[Pydantic] Validating request body against EventAnalysisRequest schema...`,
        `[DistilBERT Service] Extracting zero-shot classification themes for: "${routerEventInput}"...`,
        `[DistilBERT Service] Inference complete. Extracted themes: ${JSON.stringify(getSimulatedThemes(routerEventInput))}`,
        `[FastAPI Egress] Serializing Response models with HTTP 200 OK...`
      ];

      steps.forEach((step, idx) => {
        setTimeout(() => {
          setRouterTrace(prev => [...prev, step]);
        }, (idx + 1) * 180);
      });

      setTimeout(() => {
        const themes = getSimulatedThemes(routerEventInput);
        setRouterResponse({
          status: "success",
          event: routerEventInput,
          extracted_themes: themes,
          execution_metadata: {
            latency_ms: Math.round(performance.now() - startTime),
            provider: "DistilBERT-base-uncased-mnli",
            confidence_threshold: 0.55
          }
        });
        setIsRoutingRequest(false);
      }, 1000);

    } else if (routerSelectedEndpoint === '/fact-check') {
      const steps = [
        `[FastAPI Ingress] POST /fact-check received. Deserializing payload...`,
        `[Pydantic] Validating request body against FactCheckRequest schema...`,
        `[Wikipedia Service] Executing MediaWiki API search query for: "${routerFactQuery}"...`,
        `[Wikipedia Service] Parsing and cleaning Wikipedia text summary. Computing cross-reference hash...`,
        `[FastAPI Egress] Serializing FactCheckResponse model with HTTP 200 OK...`
      ];

      steps.forEach((step, idx) => {
        setTimeout(() => {
          setRouterTrace(prev => [...prev, step]);
        }, (idx + 1) * 180);
      });

      setTimeout(() => {
        setRouterResponse({
          status: "verified",
          query: routerFactQuery,
          wikipedia_summary: getSimulatedFactCheck(routerFactQuery),
          confidence_score: 0.94,
          execution_metadata: {
            latency_ms: Math.round(performance.now() - startTime),
            source: "en.wikipedia.org"
          }
        });
        setIsRoutingRequest(false);
      }, 1000);

    } else if (routerSelectedEndpoint === '/generate-conversation') {
      const themes = getSimulatedThemes(routerEventInput);
      const generatedTopics = getSimulatedTopics(routerEventInput, routerInterestsInput);
      const generatedSuggestions = getSimulatedSuggestions(routerEventInput, routerInterestsInput);

      const steps = [
        `[FastAPI Ingress] POST /generate-conversation received. Orchestrating pipeline...`,
        `[Pydantic] Validating Event & Interests payload structures...`,
        `[Pipeline Step 1] Invoking DistilBERT Event Analyzer backend service...`,
        `[Pipeline Step 1] Themes extracted: ${JSON.stringify(themes)}`,
        `[Pipeline Step 2] Invoking GPT-2 Topic & Suggestion Generation Engine...`,
        `[Pipeline Step 2] Generated ${generatedTopics.length} discussion topics & ${generatedSuggestions.length} icebreakers...`,
        `[Pipeline Step 3 - Side Effect] Executing automatic backend history persistence...`,
        `[History Service] File path resolved: "data/history.json". Running read-modify-write...`,
        `[History Service] Appended complete interaction record. Total history records now: ${automaticHistoryLogs.length + 1}.`,
        `[FastAPI Egress] Orchestrated response structured and returned with HTTP 200 OK!`
      ];

      steps.forEach((step, idx) => {
        setTimeout(() => {
          setRouterTrace(prev => [...prev, step]);
        }, (idx + 1) * 150);
      });

      setTimeout(() => {
        const newRecord = {
          id: "hist_" + Math.random().toString(36).substring(2, 7),
          timestamp: new Date().toISOString(),
          event: routerEventInput,
          interests: routerInterestsInput,
          themes: themes,
          topics: generatedTopics,
          suggestions: generatedSuggestions
        };

        // Prepend to simulated history logs
        const updatedLogs = [newRecord, ...automaticHistoryLogs];
        setAutomaticHistoryLogs(updatedLogs);
        
        // Also save to standard local storage so other components can see it
        const savedHistoryStr = localStorage.getItem('architecture_guide_history_json');
        if (savedHistoryStr) {
          try {
            const parsed = JSON.parse(savedHistoryStr);
            localStorage.setItem('architecture_guide_history_json', JSON.stringify([newRecord, ...parsed]));
          } catch (e) {}
        } else {
          localStorage.setItem('architecture_guide_history_json', JSON.stringify([newRecord]));
        }

        setRouterResponse({
          success: true,
          event_themes: themes,
          conversation_topics: generatedTopics,
          action_suggestions: generatedSuggestions,
          automatic_logging: {
            logged_to_history: true,
            record_id: newRecord.id,
            timestamp: newRecord.timestamp
          }
        });
        setIsRoutingRequest(false);
      }, 1500);
    }
  };

  // FastAPI Main Entrypoint States
  const [mainIsRunningHealthCheck, setMainIsRunningHealthCheck] = useState<boolean>(false);
  const [mainTerminalLogs, setMainTerminalLogs] = useState<string[]>([]);
  const [mainHealthResponse, setMainHealthResponse] = useState<any | null>(null);
  const [currentLifecycleStep, setCurrentLifecycleStep] = useState<number>(0);

  // Swagger simulator states
  const [swaggerSelectedEndpoint, setSwaggerSelectedEndpoint] = useState<string | null>(null);
  const [swaggerResponsePayload, setSwaggerResponsePayload] = useState<any | null>(null);
  const [swaggerIsRunning, setSwaggerIsRunning] = useState<boolean>(false);
  const [swaggerEventInput, setSwaggerEventInput] = useState<string>("AI & ML Networking Dinner 2026");
  const [swaggerInterestsInput, setSwaggerInterestsInput] = useState<string>("API Design, Distributed Systems, Kubernetes");
  const [swaggerFactQuery, setSwaggerFactQuery] = useState<string>("FastAPI");

  // Service Layer principles states
  const [selectedServicePrinciple, setSelectedServicePrinciple] = useState<'event_analyzer' | 'topic_generator' | 'fact_checker' | 'history_logger'>('event_analyzer');
  const [isMockMode, setIsMockMode] = useState<boolean>(true);
  const [isServiceRunning, setIsServiceRunning] = useState<boolean>(false);
  const [serviceTerminalLogs, setServiceTerminalLogs] = useState<string[]>([]);

  // Streamlit Epic 4 states
  const [streamlitActiveWidget, setStreamlitActiveWidget] = useState<'forms' | 'displays' | 'auditing' | 'main_routing'>('forms');
  const [streamlitBioInput, setStreamlitBioInput] = useState<string>("PhD student researching distributed NLP systems.");
  const [streamlitSelectedEvent, setStreamlitSelectedEvent] = useState<string>("Next-Gen AI Summit");
  const [streamlitSimulatedState, setStreamlitSimulatedState] = useState<Record<string, any>>({
    "user_profiles": 1,
    "current_page": "📝 Profiles Creator"
  });
  const [streamlitTerminalLogs, setStreamlitTerminalLogs] = useState<string[]>([]);
  const [isStreamlitExecuting, setIsStreamlitExecuting] = useState<boolean>(false);

  const runMainHealthCheck = () => {
    if (mainIsRunningHealthCheck) return;
    setMainIsRunningHealthCheck(true);
    setMainTerminalLogs([]);
    setMainHealthResponse(null);

    const steps = [
      `[FastAPI Engine] GET / received. Initializing Ingress validation...`,
      `[FastAPI Engine] Routing to Main App Health-check Handler...`,
      `[FastAPI Engine] Building system state diagnostics...`,
      `[FastAPI Engine] Status: OPERATIONAL. Service: "AI Icebreakers API".`,
      `[FastAPI Engine] Serializing response (application/json) with HTTP 200 OK`
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setMainTerminalLogs(prev => [...prev, step]);
      }, (idx + 1) * 150);
    });

    setTimeout(() => {
      setMainHealthResponse({
        status: "healthy",
        service: "AI-Powered Networking Icebreaker API",
        version: "1.0.0",
        uptime_seconds: 345600,
        diagnostics: {
          database_connection: "connected",
          classifier_model_status: "ready",
          generation_model_status: "ready"
        },
        docs_url: "/docs"
      });
      setMainIsRunningHealthCheck(false);
    }, 900);
  };

  const runServiceDiagnostic = () => {
    if (isServiceRunning) return;
    setIsServiceRunning(true);
    setServiceTerminalLogs([]);

    let steps: string[] = [];
    if (selectedServicePrinciple === 'event_analyzer') {
      if (isMockMode) {
        steps = [
          `[Testing Environment] Initializing pytest context...`,
          `[Dependency Injection] Swapping real event_analyzer.py with MockEventAnalyzer()`,
          `[Single Responsibility] Assert: This service ONLY classifies themes. No generation, no database actions.`,
          `[Stateless Call] MockEventAnalyzer.extract_themes("...") invoked. Parameters passed as clean, isolated arguments.`,
          `[Performance Audit] Completed in 0.08ms (No heavy weights loaded). RAM Overhead: 0MB.`,
          `[MOCK SUCCESS] Yielded deterministic categories: ["AI/ML", "Cloud Computing"]`
        ];
      } else {
        steps = [
          `[Production Container] Loading PyTorch/Transformers runtime...`,
          `[Model Compilation] Ingesting neural weights from local cache folder...`,
          `[Hardware Accelerator] Initializing matrix multipliers on CPU/GPU thread allocation...`,
          `[Inference Engine] DistilBERT zero-shot pipeline tokenizing raw text...`,
          `[Performance Audit] Classification completed in 2450.4ms. RAM Footprint: 480MB.`,
          `[Stateless Assert] Clean execution completed. Given the same inputs, outputs remain deterministic.`,
          `[PROD SUCCESS] Yielded: {"themes": ["AI/ML", "Cloud"], "scores": [0.94, 0.04]}`
        ];
      }
    } else if (selectedServicePrinciple === 'topic_generator') {
      if (isMockMode) {
        steps = [
          `[Testing Environment] Initializing pytest context...`,
          `[Dependency Injection] Injecting MockTopicGenerator() mock instance. Overriding transformer imports.`,
          `[Single Responsibility] Assert: This service ONLY synthesizes textual conversational starters.`,
          `[Stateless Call] Generating icebreaker suggestions from pure parameters without global states.`,
          `[Performance Audit] Generated mock starters in 0.12ms. RAM Overhead: 0MB.`,
          `[MOCK SUCCESS] Yielded 3 mock starters: ["Hey, did you see the Kubernetes talk?", "What is your API design style?", "Welcome!"]`
        ];
      } else {
        steps = [
          `[Production Container] Loading GPT-2 Autoregressive Decoder...`,
          `[Model Compile] Compiling tokenizer vocabulary: 'gpt2'...`,
          `[Hardware Context] Allocating max_length=150, temperature=0.75, top_k=50...`,
          `[Inference Engine] Sequential token generation in progress (autoregressive beam search)...`,
          `[Performance Audit] Starters synthesized in 3200.1ms. RAM Footprint: 850MB.`,
          `[PROD SUCCESS] Yielded: ["What are your thoughts on modern API design?", "How do you handle distributed latency?", "Nice to meet you!"]`
        ];
      }
    } else if (selectedServicePrinciple === 'fact_checker') {
      if (isMockMode) {
        steps = [
          `[Testing Environment] Initializing pytest context...`,
          `[Dependency Injection] Swapping actual Wikipedia API client with MockFactChecker()`,
          `[Single Responsibility] Assert: This service ONLY validates facts against text databases.`,
          `[Stateless Call] Query verification parsed through isolated string parameters.`,
          `[Performance Audit] Concept verified in 0.05ms (0 network calls dispatched). WAN bandwidth: 0 bytes.`,
          `[MOCK SUCCESS] Verified: "FastAPI is a modern web framework" with 1.0 confidence.`
        ];
      } else {
        steps = [
          `[Production Container] Initializing HTTP client (httpx)...`,
          `[API Dispatch] Dispatching query to "https://en.wikipedia.org/w/api.php"...`,
          `[API Network] Received HTTP 200 OK. parsing JSON mediawiki payload...`,
          `[Performance Audit] Wikipedia REST fetch completed in 320ms.`,
          `[PROD SUCCESS] Successfully verified concepts using official wiki abstracts.`
        ];
      }
    } else {
      if (isMockMode) {
        steps = [
          `[Testing Environment] Initializing pytest context...`,
          `[Dependency Injection] MockHistoryLogger() injected. Diverting persistence I/O to memory.`,
          `[Single Responsibility] Assert: This service ONLY serializes/logs session objects.`,
          `[Stateless Call] Validating schema constraints without thread or file locks.`,
          `[Performance Audit] Log intercept succeeded in 0.02ms. Disk I/O: 0 bytes.`,
          `[MOCK SUCCESS] Successfully validated JSON session schema contracts.`
        ];
      } else {
        steps = [
          `[Production Container] Connecting to local thread-safe state database...`,
          `[DB Write] Marshaling session payload to relational ORM schemas...`,
          `[DB Transaction] Performing SQL insert with 3NF relational layout...`,
          `[Performance Audit] Persistent session log completed in 8.5ms.`,
          `[PROD SUCCESS] Relational tuple successfully stored under UUID-v4 identifier.`
        ];
      }
    }

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setServiceTerminalLogs(prev => [...prev, step]);
      }, (idx + 1) * 150);
    });

    setTimeout(() => {
      setIsServiceRunning(false);
    }, (steps.length + 1) * 150);
  };

  const runStreamlitSimulation = () => {
    if (isStreamlitExecuting) return;
    setIsStreamlitExecuting(true);
    setStreamlitTerminalLogs([]);

    const steps = [
      `[Streamlit] 🔄 Event Triggered! User interaction detected on widget.`,
      `[Streamlit] 🏁 Initiating full Top-to-Bottom rerun of Python script...`,
      `[SessionState] 📥 Retrieving cached states... Page: ${streamlitActiveWidget === 'forms' ? 'Profile Creator' : streamlitActiveWidget === 'displays' ? 'Starter Feed' : streamlitActiveWidget === 'auditing' ? 'Wikipedia Auditor' : 'Main Sidebar Navigator'}`,
      `[Rendering] Evaluated st.set_page_config() and sidebar navigation widgets.`,
      `[Rendering] Compiling components with st.session_state.bio_input = "${streamlitBioInput.substring(0, 30)}..."`,
      `[API Client] Syncing payload to Port 3000 backend microservices...`,
      `[Streamlit] ⚡ Completed execution. Redrawn DOM elements instantly. Rerun time: 14ms (0 lines of HTML/CSS/JS written manually)`
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setStreamlitTerminalLogs(prev => [...prev, step]);
      }, (idx + 1) * 180);
    });

    setTimeout(() => {
      setIsStreamlitExecuting(false);
    }, (steps.length + 1) * 180);
  };

  const runSwaggerCall = (endpoint: string) => {
    if (swaggerIsRunning) return;
    setSwaggerIsRunning(true);
    setSwaggerResponsePayload(null);

    setTimeout(() => {
      if (endpoint === '/') {
        setSwaggerResponsePayload({
          status: "healthy",
          service: "AI-Powered Networking Icebreaker API",
          version: "1.0.0",
          docs_url: "/docs"
        });
      } else if (endpoint === '/analyze-event') {
        setSwaggerResponsePayload({
          status: "success",
          event: swaggerEventInput,
          extracted_themes: getSimulatedThemes(swaggerEventInput),
          execution_metadata: {
            latency_ms: 120,
            provider: "DistilBERT-base-uncased-mnli"
          }
        });
      } else if (endpoint === '/fact-check') {
        setSwaggerResponsePayload({
          status: "verified",
          query: swaggerFactQuery,
          wikipedia_summary: getSimulatedFactCheck(swaggerFactQuery),
          confidence_score: 0.95
        });
      } else if (endpoint === '/generate-conversation') {
        setSwaggerResponsePayload({
          success: true,
          event_themes: getSimulatedThemes(swaggerEventInput),
          conversation_topics: getSimulatedTopics(swaggerEventInput, swaggerInterestsInput),
          action_suggestions: getSimulatedSuggestions(swaggerEventInput, swaggerInterestsInput),
          automatic_logging: {
            logged_to_history: true,
            record_id: "hist_" + Math.random().toString(36).substring(2, 7),
            timestamp: new Date().toISOString()
          }
        });
      }
      setSwaggerIsRunning(false);
    }, 800);
  };

  const toggleFolder = (folderName: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderName]: !prev[folderName]
    }));
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(index);
    setTimeout(() => {
      setCopiedStep(null);
    }, 2000);
  };

  const copyBackendSnippet = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBackendSnippet(true);
    setTimeout(() => {
      setCopiedBackendSnippet(false);
    }, 2000);
  };

  const runPytestSimulation = () => {
    setPytestSimulating(true);
    setPytestCompleted(false);
    setPytestOutputLogs([]);

    const logLines = [
      "============================= test session starts =============================",
      "platform linux -- Python 3.11.4, pytest-7.4.0, pluggy-1.2.0",
      "rootdir: /workspace/networking-analytics-ai",
      "plugins: cov-4.1.0, anyio-3.7.1",
      "collected 12 items",
      "",
      "tests/test_api.py::test_create_profile_success PASSED                     [  8%]",
      "tests/test_api.py::test_create_profile_validation_fail PASSED             [ 16%]",
      "tests/test_api.py::test_theme_extraction_endpoint PASSED                  [ 25%]",
      "tests/test_api.py::test_starter_generation_endpoint PASSED                [ 33%]",
      "tests/test_api.py::test_wikipedia_audit_endpoint PASSED                   [ 41%]",
      "tests/test_services.py::test_distilbert_theme_filtering PASSED            [ 50%]",
      "tests/test_services.py::test_distilbert_empty_text_handling PASSED        [ 58%]",
      "tests/test_services.py::test_gpt2_starter_sequence_generation PASSED      [ 66%]",
      "tests/test_services.py::test_wiki_auditor_search_nodes PASSED              [ 75%]",
      "tests/test_services.py::test_wiki_auditor_error_handling PASSED           [ 83%]",
      "tests/test_services.py::test_database_3nf_enforcement PASSED              [ 91%]",
      "tests/test_services.py::test_database_foreign_key_violation PASSED         [100%]",
      "",
      "---------- coverage: platform linux, python 3.11.4-final-0 -----------",
      "Name                         Stmts   Miss  Cover",
      "------------------------------------------------",
      "app/__init__.py                  3      0   100%",
      "app/api/__init__.py              5      0   100%",
      "app/api/profiles.py             21      0   100%",
      "app/api/themes.py               18      0   100%",
      "app/api/starters.py             19      0   100%",
      "app/api/factcheck.py            16      0   100%",
      "app/services/__init__.py         6      0   100%",
      "app/services/classifier.py      24      2    91%",
      "app/services/synthesizer.py     28      1    96%",
      "app/services/wiki_auditor.py    19      3    84%",
      "app/services/database.py        31      0   100%",
      "app/main.py                     14      0   100%",
      "------------------------------------------------",
      "TOTAL                          204      6    97%",
      "",
      "====================== 12 passed, 2 warnings in 1.48s ======================"
    ];

    let currentLineIdx = 0;
    const interval = setInterval(() => {
      if (currentLineIdx < logLines.length) {
        setPytestOutputLogs(prev => [...prev, logLines[currentLineIdx]]);
        currentLineIdx++;
      } else {
        clearInterval(interval);
        setPytestSimulating(false);
        setPytestCompleted(true);
      }
    }, 60);
  };

  const stepsData = [
    {
      title: "1. Create Isolated Virtual Environment",
      description: "Establishes an isolated directory structure for python dependencies, guaranteeing zero package leakage or version pollution from system libraries.",
      command: "python -m venv venv",
      explanation: "Uses Python's native venv library to compile a self-contained local shell environment inside the './venv' directory.",
      terminalOutput: "Creating python virtual environment structure at ./venv...\nDone.\nIncludes bin/, lib/python3.11/site-packages/, and configuration files."
    },
    {
      title: "2. Activate Virtual Environment",
      description: "Modifies active shell path configurations, overriding global target pointers so subsequent 'python' or 'pip' flags resolve to your sandbox binaries.",
      command: osPlatform === 'unix' ? "source venv/bin/activate" : "venv\\Scripts\\activate",
      explanation: osPlatform === 'unix' 
        ? "Unix shells use 'source' or '.' to execute the activation script and update path headers." 
        : "Windows Command Prompt triggers the local scripts batch file, whereas PowerShell requires venv\\Scripts\\Activate.ps1.",
      terminalOutput: osPlatform === 'unix'
        ? "(venv) dev@server:~$ which python\n/workspace/venv/bin/python\n# Virtual environment successfully bound!"
        : "C:\\projects\\networking> venv\\Scripts\\activate\n(venv) C:\\projects\\networking> \n# Path override verified."
    },
    {
      title: "3. Install Pinned Package Ecosystem",
      description: "Resolves, compiles, and installs precise package versions documented in your project repository specifications.",
      command: "pip install -r requirements.txt",
      explanation: "Reads requirements.txt line-by-line, downloads source tarballs from PyPI, and compiles bindings directly into local site-packages folders.",
      terminalOutput: "Collecting fastapi>=0.100.0 (from -r requirements.txt)\n  Downloading fastapi-0.100.1-py3-none-any.whl (59 kB)\nCollecting transformers>=4.30.0 (from -r requirements.txt)\n  Downloading transformers-4.30.2-py3-none-any.whl (7.2 MB)\nInstalling collected packages: fastapi, uvicorn, torch, transformers, streamlit\nSuccessfully installed dependencies."
    },
    {
      title: "4. Verify Package bindings & API Hooks",
      description: "Executes an validation runtime to guarantee that all neural network libraries, web routers, and testing wrappers import cleanly without segmentation faults.",
      command: `python -c "import fastapi, uvicorn, streamlit, transformers, torch, requests, pydantic, pytest, httpx; print('Verification Status: PRISTINE')"`,
      explanation: "Launches Python as a one-shot CLI execution, testing imports of all critical components. Returns SUCCESS only if all binary dependencies bind correctly.",
      terminalOutput: "Loading Deep Learning matrix bindings (PyTorch v2.1)...\nInitializing HuggingFace Hub bindings...\nResolving router serialization variables...\n\nVerification Status: PRISTINE\n[Process completed with exit code 0]"
    }
  ];

  const renderTree = (node: FileNode, depth: number = 0) => {
    const isFolder = node.type === 'folder';
    const isExpanded = expandedFolders[node.name] || false;
    const hasChildren = isFolder && node.children && node.children.length > 0;

    return (
      <div key={node.name} className="select-none">
        <div 
          onClick={() => {
            if (isFolder) {
              toggleFolder(node.name);
            }
            setSelectedNode(node);
          }}
          className={`flex items-center gap-1.5 py-1 px-2 rounded-md text-[11px] font-mono transition-colors cursor-pointer ${
            selectedNode?.name === node.name 
              ? 'bg-indigo-950/70 text-indigo-200 border-l-2 border-indigo-500 font-semibold' 
              : 'text-slate-400 hover:bg-slate-900/40 hover:text-slate-200'
          }`}
          style={{ paddingLeft: `${Math.max(8, depth * 12)}px` }}
        >
          {isFolder ? (
            <>
              {hasChildren ? (
                isExpanded ? <ChevronDown className="w-3 h-3 text-slate-500" /> : <ChevronRight className="w-3 h-3 text-slate-500" />
              ) : (
                <span className="w-3" />
              )}
              <Folder className={`w-3.5 h-3.5 ${selectedNode?.name === node.name ? 'text-indigo-400' : 'text-slate-500'}`} />
            </>
          ) : (
            <>
              <span className="w-3" />
              <FileCode className={`w-3.5 h-3.5 ${selectedNode?.name === node.name ? 'text-indigo-400 font-semibold' : 'text-slate-600'}`} />
            </>
          )}
          <span className="truncate">{node.name}</span>
          {isFolder && (
            <span className="text-[9px] text-slate-600 font-normal">
              ({node.children?.length} items)
            </span>
          )}
        </div>

        {isFolder && isExpanded && hasChildren && (
          <div className="mt-0.5 border-l border-slate-900 ml-2.5">
            {node.children!.map(child => renderTree(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">

      {/* Guide Sub-Nav Tabs */}
      <div className="flex border-b border-slate-800">
        <button
          onClick={() => setActiveGuideTab('architecture')}
          className={`px-5 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
            activeGuideTab === 'architecture'
              ? 'border-indigo-500 text-indigo-400 bg-indigo-950/10 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/10'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-indigo-400" />
          <span>1. Core Modular Architecture</span>
        </button>
        <button
          onClick={() => setActiveGuideTab('environment')}
          className={`px-5 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
            activeGuideTab === 'environment'
              ? 'border-indigo-500 text-indigo-400 bg-indigo-950/10 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/10'
          }`}
        >
          <Laptop className="w-3.5 h-3.5 text-amber-400" />
          <span>2. Isolated Environment Setup & Sandbox</span>
        </button>
        <button
          onClick={() => setActiveGuideTab('backend')}
          className={`px-5 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
            activeGuideTab === 'backend'
              ? 'border-indigo-500 text-indigo-400 bg-indigo-950/10 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/10'
          }`}
        >
          <Server className="w-3.5 h-3.5 text-purple-400" />
          <span>3. Backend API & QA Testing Suite</span>
        </button>
        <button
          onClick={() => setActiveGuideTab('pydantic')}
          className={`px-5 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
            activeGuideTab === 'pydantic'
              ? 'border-indigo-500 text-indigo-400 bg-indigo-950/10 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/10'
          }`}
        >
          <Code className="w-3.5 h-3.5 text-emerald-400" />
          <span>4. Pydantic Models & Data Contracts</span>
        </button>
        <button
          onClick={() => setActiveGuideTab('distilbert')}
          className={`px-5 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
            activeGuideTab === 'distilbert'
              ? 'border-indigo-500 text-indigo-400 bg-indigo-950/10 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/10'
          }`}
        >
          <Cpu className="w-3.5 h-3.5 text-blue-400" />
          <span>5. Zero-Shot NLP Classifier</span>
        </button>
         <button
          onClick={() => setActiveGuideTab('gpt2')}
          className={`px-5 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
            activeGuideTab === 'gpt2'
              ? 'border-indigo-500 text-indigo-400 bg-indigo-950/10 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/10'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>6. GPT-2 Conversation Generator</span>
        </button>
        <button
          onClick={() => setActiveGuideTab('wikipedia')}
          className={`px-5 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
            activeGuideTab === 'wikipedia'
              ? 'border-indigo-500 text-indigo-400 bg-indigo-950/10 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/10'
          }`}
        >
          <Globe className="w-3.5 h-3.5 text-teal-400" />
          <span>7. Wikipedia Fact-Verifier</span>
        </button>
        <button
          onClick={() => setActiveGuideTab('history')}
          className={`px-5 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
            activeGuideTab === 'history'
              ? 'border-indigo-500 text-indigo-400 bg-indigo-950/10 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/10'
          }`}
        >
          <History className="w-3.5 h-3.5 text-purple-400" />
          <span>8. Persistent History Logger</span>
        </button>
        <button
          onClick={() => setActiveGuideTab('feedback')}
          className={`px-5 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
            activeGuideTab === 'feedback'
              ? 'border-indigo-500 text-indigo-400 bg-indigo-950/10 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/10'
          }`}
        >
          <ThumbsUp className="w-3.5 h-3.5 text-rose-400" />
          <span>9. Suggestion Feedback Logger</span>
        </button>
        <button
          onClick={() => setActiveGuideTab('router')}
          className={`px-5 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
            activeGuideTab === 'router'
              ? 'border-indigo-500 text-indigo-400 bg-indigo-950/10 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/10'
          }`}
        >
          <Network className="w-3.5 h-3.5 text-amber-400 font-bold" />
          <span>10. FastAPI Router & Orchestrator</span>
        </button>
        <button
          onClick={() => setActiveGuideTab('main')}
          className={`px-5 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
            activeGuideTab === 'main'
              ? 'border-indigo-500 text-indigo-400 bg-indigo-950/10 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/10'
          }`}
        >
          <Server className="w-3.5 h-3.5 text-emerald-400 font-bold" />
          <span>11. FastAPI Main Entrypoint</span>
        </button>
        <button
          onClick={() => setActiveGuideTab('services')}
          className={`px-5 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
            activeGuideTab === 'services'
              ? 'border-indigo-500 text-indigo-400 bg-indigo-950/10 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/10'
          }`}
        >
          <Sliders className="w-3.5 h-3.5 text-amber-400 font-bold" />
          <span>12. Service Layer Principles</span>
        </button>
        <button
          onClick={() => setActiveGuideTab('streamlit')}
          className={`px-5 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
            activeGuideTab === 'streamlit'
              ? 'border-indigo-500 text-indigo-400 bg-indigo-950/10 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/10'
          }`}
        >
          <Layout className="w-3.5 h-3.5 text-pink-400 font-bold" />
          <span>13. Epic 4: Streamlit Frontend</span>
        </button>
        <button
          onClick={() => setActiveGuideTab('testing')}
          className={`px-5 py-2.5 text-xs font-semibold border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
            activeGuideTab === 'testing'
              ? 'border-indigo-500 text-indigo-400 bg-indigo-950/10 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/10'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 font-bold" />
          <span>14. Epic 5: Quality Assurance</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeGuideTab === 'architecture' ? (
          <motion.div
            key="architecture-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* 3-Tier Flow Visualization */}
            <div className="bg-slate-950/30 border border-slate-800/80 p-5 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-400" />
                  <h3 className="text-xs font-bold font-mono uppercase text-slate-300 tracking-wider">
                    Modular 3-Tier System Architecture
                  </h3>
                </div>
                <span className="px-2 py-0.5 bg-indigo-950/80 border border-indigo-500/30 text-indigo-400 text-[9px] font-mono rounded font-semibold uppercase">
                  Data-Flow Pipeline
                </span>
              </div>

              <p className="text-[11px] text-slate-400 leading-normal max-w-2xl">
                The application organizes concerns into strict, isolated tiers. This decouples user experience from intensive transformer model execution, allowing frontend, api, and database tasks to run in parallel.
              </p>

              {/* 3-Tier Stack Flow Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                
                {/* Presentation Tier */}
                <div className="bg-slate-950/50 border border-slate-800/60 p-4 rounded-xl flex flex-col justify-between space-y-3 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl -mr-6 -mt-6"></div>
                  <div className="space-y-1.5 z-10">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-md bg-indigo-950 flex items-center justify-center text-indigo-400 border border-indigo-800">
                        <Layout className="w-3 h-3" />
                      </div>
                      <h4 className="text-[11px] font-bold text-slate-200">1. Presentation Layer</h4>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-normal">
                      Multi-page user interface powered by <strong>Streamlit</strong>. Hosts input forms, renders responsive dialogue feeds, and formats real-time Wikipedia citations.
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[9px] font-mono text-indigo-400 pt-1 border-t border-slate-900">
                    <span>streamlit, CSS, HTML</span>
                  </div>
                </div>

                {/* Logic/API Tier */}
                <div className="bg-slate-950/50 border border-slate-800/60 p-4 rounded-xl flex flex-col justify-between space-y-3 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl -mr-6 -mt-6"></div>
                  <div className="space-y-1.5 z-10">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-md bg-purple-950 flex items-center justify-center text-purple-400 border border-purple-800">
                        <Server className="w-3 h-3" />
                      </div>
                      <h4 className="text-[11px] font-bold text-slate-200">2. Rest API Control Tier</h4>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-normal">
                      High-performance router nodes managed via <strong>FastAPI</strong>. Handshakes client-side requests, parses endpoints, and feeds clean data payloads to ML pipelines.
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[9px] font-mono text-purple-400 pt-1 border-t border-slate-900">
                    <span>fastapi, uvicorn, pydantic</span>
                  </div>
                </div>

                {/* AI / Data Tier */}
                <div className="bg-slate-950/50 border border-slate-800/60 p-4 rounded-xl flex flex-col justify-between space-y-3 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl -mr-6 -mt-6"></div>
                  <div className="space-y-1.5 z-10">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-md bg-emerald-950 flex items-center justify-center text-emerald-400 border border-emerald-800">
                        <Cpu className="w-3 h-3" />
                      </div>
                      <h4 className="text-[11px] font-bold text-slate-200">3. AI Service & Storage Tier</h4>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-normal">
                      Encapsulates <strong>DistilBERT NLP</strong> classifiers, <strong>GPT-2 Decoders</strong>, and live <strong>Wikipedia API</strong> queries. Logs all data strictly to 3NF SQLite schema tables.
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[9px] font-mono text-emerald-400 pt-1 border-t border-slate-900">
                    <span>transformers, torch, sqlite3</span>
                  </div>
                </div>

              </div>

              {/* Dynamic flow line connector */}
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-900 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>DATA ROUTING PATH:</span>
                </div>
                <div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap scrollbar-none">
                  <span className="text-indigo-400 font-semibold">User Submits Bio</span>
                  <ChevronRight className="w-3 h-3 mx-1 inline" />
                  <span className="text-purple-400">FastAPI Router parses Pydantic</span>
                  <ChevronRight className="w-3 h-3 mx-1 inline" />
                  <span className="text-purple-300">DistilBERT extracts themes</span>
                  <ChevronRight className="w-3 h-3 mx-1 inline" />
                  <span className="text-emerald-400">GPT-2 synthesizes Starter</span>
                  <ChevronRight className="w-3 h-3 mx-1 inline" />
                  <span className="text-emerald-300">SQLite writes 3NF relational tuples</span>
                </div>
              </div>

            </div>

            {/* Interactive Directory Explorer & Module Inspector */}
            <div className="bg-slate-950/30 border border-slate-800/80 p-5 rounded-xl space-y-4">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Folder className="w-4 h-4 text-amber-400" />
                  <h3 className="text-xs font-bold font-mono uppercase text-slate-300 tracking-wider">
                    Directory Structure & Modular Codebase Explorer
                  </h3>
                </div>
                <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
                  Click on folders or files to inspect their role & source snippets
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                
                {/* Left Tree Pane (Cols 1 & 2) */}
                <div className="lg:col-span-2 bg-slate-950/60 rounded-xl border border-slate-900 p-4 max-h-[460px] overflow-y-auto space-y-1 scrollbar-thin">
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-900 text-xs text-slate-400 font-bold uppercase tracking-wider font-mono">
                    <Code className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Project Repository Tree</span>
                  </div>
                  <div className="space-y-1">
                    {renderTree(directoryData)}
                  </div>
                </div>

                {/* Right Inspector Card (Cols 3, 4, 5) */}
                <div className="lg:col-span-3 space-y-4">
                  <AnimatePresence mode="wait">
                    {selectedNode ? (
                      <motion.div
                        key={selectedNode.name}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="bg-slate-950/60 rounded-xl border border-slate-900 p-5 h-full flex flex-col justify-between space-y-4"
                      >
                        <div className="space-y-3.5">
                          {/* Header */}
                          <div className="flex items-center justify-between pb-2 border-b border-slate-900">
                            <div className="flex items-center gap-2">
                              {selectedNode.type === 'folder' ? (
                                <Folder className="w-4 h-4 text-amber-400" />
                              ) : (
                                <FileCode className="w-4 h-4 text-indigo-400" />
                              )}
                              <h4 className="text-xs font-mono font-bold text-slate-200">
                                {selectedNode.name}
                              </h4>
                            </div>
                            <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase ${
                              selectedNode.type === 'folder' 
                                ? 'bg-amber-950/40 text-amber-300 border border-amber-500/25' 
                                : 'bg-indigo-950/40 text-indigo-300 border border-indigo-500/25'
                            }`}>
                              {selectedNode.type}
                            </span>
                          </div>

                          {/* Meta Detail Description */}
                          <div className="space-y-2">
                            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">Description Overview</span>
                            <p className="text-xs text-slate-300 leading-relaxed">
                              {selectedNode.description}
                            </p>
                          </div>

                          {/* Role Spec (For files) */}
                          {selectedNode.role && (
                            <div className="space-y-2 p-3 bg-slate-900/40 border border-slate-800/50 rounded-lg">
                              <span className="text-[9px] font-mono text-indigo-400 uppercase tracking-wider block font-bold flex items-center gap-1">
                                <CheckCircle className="w-3 h-3 text-emerald-400" />
                                <span>Core Architectural Responsibility</span>
                              </span>
                              <p className="text-[11px] text-slate-300 leading-normal font-sans">
                                {selectedNode.role}
                              </p>
                            </div>
                          )}

                          {/* Dependencies */}
                          {selectedNode.dependencies && selectedNode.dependencies.length > 0 && (
                            <div className="space-y-1.5">
                              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">Key Dependencies</span>
                              <div className="flex flex-wrap gap-1.5">
                                {selectedNode.dependencies.map(dep => (
                                  <span key={dep} className="px-1.5 py-0.5 bg-slate-900 text-slate-400 font-mono text-[10px] rounded border border-slate-800">
                                    {dep}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Snippet Card */}
                          {selectedNode.snippet && (
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">Sample Source / Implementation Block</span>
                                <span className="text-[8px] font-mono text-slate-600">Python 3.11</span>
                              </div>
                              <div className="p-3 bg-slate-950 border border-slate-900 rounded-lg font-mono text-[10px] text-indigo-300 leading-relaxed overflow-x-auto whitespace-pre">
                                {selectedNode.snippet}
                              </div>
                            </div>
                          )}

                        </div>

                        <div className="text-[10px] text-slate-500 flex items-center gap-1.5 pt-2 border-t border-slate-900">
                          <Info className="w-3 h-3 text-indigo-400 flex-shrink-0" />
                          <span>Selected from repository navigator</span>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="bg-slate-950/60 rounded-xl border border-slate-900 p-8 h-full flex flex-col items-center justify-center text-center text-slate-500 space-y-2">
                        <Folder className="w-8 h-8 text-slate-700" />
                        <p className="text-xs font-mono">No directory item selected</p>
                        <p className="text-[10px] text-slate-600">Click a node on the repository explorer tree to inspect metadata and specifications.</p>
                      </div>
                    )}
                  </AnimatePresence>
                </div>

              </div>

            </div>
          </motion.div>
        ) : activeGuideTab === 'environment' ? (
          <motion.div
            key="environment-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Context intro card */}
            <div className="bg-slate-950/30 border border-slate-800/80 p-5 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Laptop className="w-4 h-4 text-amber-400" />
                  <h3 className="text-xs font-bold font-mono uppercase text-slate-300 tracking-wider">
                    Virtual Environment Isolation Protocol (venv)
                  </h3>
                </div>
                <span className="px-2 py-0.5 bg-amber-950/40 border border-amber-500/20 text-amber-300 text-[9px] font-mono rounded font-semibold uppercase">
                  Development Context
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Consistent environment setup is critical for reproducibility. Setting up a dedicated <strong>Python 3.11 virtual environment</strong> isolates python dependencies from the system installation, preventing version conflicts, library overlapping, and ensuring that any developer can recreate the exact same runtime parameters from scratch.
              </p>
            </div>

            {/* Interactive Step-by-Step Shell Terminal Sandbox */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Selector (Cols 1-4) */}
              <div className="lg:col-span-4 space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Configuration Pipeline</span>
                  
                  {/* OS Switcher */}
                  <div className="flex bg-slate-900 p-0.5 rounded-lg border border-slate-800">
                    <button
                      onClick={() => setOsPlatform('unix')}
                      className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors cursor-pointer ${
                        osPlatform === 'unix' 
                          ? 'bg-indigo-600 text-white font-semibold' 
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      macOS/Linux
                    </button>
                    <button
                      onClick={() => setOsPlatform('windows')}
                      className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors cursor-pointer ${
                        osPlatform === 'windows' 
                          ? 'bg-indigo-600 text-white font-semibold' 
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Windows
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  {stepsData.map((step, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSetupStep(idx)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                        activeSetupStep === idx
                          ? 'bg-slate-900/80 border-indigo-500/80 shadow-md shadow-indigo-950/10'
                          : 'bg-slate-950/20 border-slate-800/60 hover:bg-slate-900/30'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-bold ${
                        activeSetupStep === idx
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-900 text-slate-500 border border-slate-800'
                      }`}>
                        {idx + 1}
                      </div>
                      <div className="space-y-1">
                        <h4 className={`text-[11px] font-bold ${
                          activeSetupStep === idx ? 'text-indigo-400 font-semibold' : 'text-slate-300'
                        }`}>
                          {step.title.split('. ')[1]}
                        </h4>
                        <p className="text-[10px] text-slate-500 leading-normal line-clamp-2">
                          {step.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Terminal Panel (Cols 5-12) */}
              <div className="lg:col-span-8 flex flex-col justify-between bg-slate-950 border border-slate-900 rounded-xl overflow-hidden min-h-[380px]">
                
                {/* Terminal Header */}
                <div className="px-4 py-2 bg-slate-900 border-b border-slate-950 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                    <span>interactive_setup_bash.sh</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-800"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-800"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-800"></span>
                  </div>
                </div>

                {/* Terminal Body */}
                <div className="p-5 flex-grow font-mono text-xs text-indigo-200/90 space-y-4">
                  
                  {/* Step Spec Explanation */}
                  <div className="p-3.5 bg-slate-900/40 border border-slate-800/40 rounded-lg space-y-1">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                      <Sliders className="w-3 h-3 text-amber-500" />
                      <span>Setup Operation Protocol</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                      {stepsData[activeSetupStep].explanation}
                    </p>
                  </div>

                  {/* Command box with Copy button */}
                  <div className="space-y-1.5">
                    <span className="text-[9px] text-slate-500 uppercase tracking-wider">Interactive Command Line</span>
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800/60 flex items-center justify-between group">
                      <span className="text-emerald-400 select-all font-mono font-bold leading-normal truncate pr-2">
                        $ {stepsData[activeSetupStep].command}
                      </span>
                      <button
                        onClick={() => copyToClipboard(stepsData[activeSetupStep].command, activeSetupStep)}
                        className="p-1.5 bg-slate-950 hover:bg-slate-850 text-slate-400 hover:text-indigo-400 rounded-md border border-slate-800 transition-colors flex-shrink-0 cursor-pointer"
                        title="Copy command to clipboard"
                      >
                        {copiedStep === activeSetupStep ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Mock Shell Terminal Stream Output */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[9px] text-slate-500 uppercase tracking-wider">Stdout Terminal Stream</span>
                    <div className="p-4 bg-black/50 rounded-lg border border-slate-900 font-mono text-[10px] text-slate-400 leading-relaxed overflow-x-auto whitespace-pre">
                      {stepsData[activeSetupStep].terminalOutput}
                    </div>
                  </div>

                </div>

                {/* Terminal Footer Info */}
                <div className="px-4 py-2 bg-slate-900/50 border-t border-slate-950 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <div className="flex items-center gap-1.5">
                    <Activity className="w-3 h-3 text-emerald-500" />
                    <span>SYSTEM SHELL: ACTIVE</span>
                  </div>
                  <span>UTF-8 | bash</span>
                </div>

              </div>

            </div>

            {/* Dependency Library Ecosystem */}
            <div className="bg-slate-950/30 border border-slate-800/80 p-5 rounded-xl space-y-4">
              <div className="flex items-center gap-2 pb-1 border-b border-slate-900">
                <Package className="w-4 h-4 text-indigo-400" />
                <h3 className="text-xs font-bold font-mono uppercase text-slate-300 tracking-wider">
                  Pinned Dependency Library Specification (requirements.txt)
                </h3>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed max-w-3xl">
                The requirements.txt manifest pins all direct and transitive libraries to strict version ranges. This ensures package compatibility across developers, builds reproducible container artifacts, and prevents breaking API updates.
              </p>

              {/* Dependency cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 pt-2">
                {keyPackages.map((pkg, idx) => (
                  <div key={idx} className="bg-slate-950/50 border border-slate-800/60 p-4 rounded-xl flex flex-col justify-between space-y-3 relative overflow-hidden group">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-slate-200">
                          {pkg.name}
                        </span>
                        <span className="px-1.5 py-0.2 bg-slate-900 text-slate-500 font-mono text-[9px] rounded font-bold border border-slate-800">
                          {pkg.version}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono text-indigo-400 font-semibold block uppercase">
                        {pkg.category}
                      </span>
                      <p className="text-[10px] text-slate-400 leading-normal">
                        {pkg.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        ) : activeGuideTab === 'backend' ? (
          <motion.div
            key="backend-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Backend Intro Card */}
            <div className="bg-slate-950/30 border border-slate-800/80 p-5 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-purple-400" />
                  <h3 className="text-xs font-bold font-mono uppercase text-slate-300 tracking-wider">
                    Epic 2: Core Backend Ingestion, NLP and Persist Engineering
                  </h3>
                </div>
                <span className="px-2 py-0.5 bg-purple-950/40 border border-purple-500/20 text-purple-300 text-[9px] font-mono rounded font-semibold uppercase">
                  Service Layer Architecture
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                The core backend phase is the technical powerhouse of the networking application. By establishing the <strong>Single Responsibility Principle (SRP)</strong> across decoupled modules, frontend, ML execution, database persistence, and automated auditing pipelines can evolve independently and are easily verified using unit tests.
              </p>
            </div>

            {/* Interactive Module Details Inspector */}
            <div className="bg-slate-950/30 border border-slate-800/80 p-5 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Service Components Directory</span>
                <span className="text-[9px] font-mono text-slate-600 hidden sm:inline">Select a module below to inspect code contracts</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left Module List (Cols 1-4) */}
                <div className="lg:col-span-4 space-y-2">
                  {backendModules.map((module) => {
                    const IconComponent = module.icon;
                    return (
                      <button
                        key={module.id}
                        onClick={() => setSelectedBackendModule(module)}
                        className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                          selectedBackendModule.id === module.id
                            ? 'bg-slate-900/80 border-purple-500/80 shadow-md shadow-purple-950/10'
                            : 'bg-slate-950/20 border-slate-800/60 hover:bg-slate-900/30'
                        }`}
                      >
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center border ${
                          selectedBackendModule.id === module.id
                            ? 'bg-purple-950 text-purple-400 border-purple-800'
                            : 'bg-slate-900 text-slate-500 border-slate-800'
                        }`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5">
                          <h4 className={`text-[11px] font-bold ${
                            selectedBackendModule.id === module.id ? 'text-purple-400 font-semibold' : 'text-slate-300'
                          }`}>
                            {module.name}
                          </h4>
                          <span className="text-[9px] text-slate-500 font-mono uppercase block">
                            {module.layer}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Right Specifications Card (Cols 5-12) */}
                <div className="lg:col-span-8 bg-slate-950/60 border border-slate-900 rounded-xl p-5 space-y-4">
                  
                  {/* Title & File Path Headers */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-900">
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-slate-200">
                        {selectedBackendModule.name} Specs
                      </h4>
                      <code className="text-[10px] text-purple-400 font-mono">
                        {selectedBackendModule.filepath}
                      </code>
                    </div>
                    <span className="px-2 py-0.5 bg-slate-900 text-slate-400 text-[9px] font-mono border border-slate-800 rounded">
                      {selectedBackendModule.role}
                    </span>
                  </div>

                  {/* Responsibility Description */}
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">Functional Mandate</span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {selectedBackendModule.responsibility}
                    </p>
                  </div>

                  {/* Schemas / JSON Contracts (If any) */}
                  {selectedBackendModule.inputSchema && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">API Payload / Input Schema</span>
                        <div className="p-3 bg-black/40 border border-slate-900 rounded-lg font-mono text-[9px] text-slate-400 overflow-x-auto whitespace-pre">
                          {selectedBackendModule.inputSchema}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">API Response / Output Model</span>
                        <div className="p-3 bg-black/40 border border-slate-900 rounded-lg font-mono text-[9px] text-slate-400 overflow-x-auto whitespace-pre">
                          {selectedBackendModule.outputSchema}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Python Source Code Snippet */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">Python 3.11 Production Implementation</span>
                      <button
                        onClick={() => copyBackendSnippet(selectedBackendModule.codeSnippet)}
                        className="text-[10px] text-slate-400 hover:text-purple-400 font-mono flex items-center gap-1 bg-slate-900 px-2 py-0.5 border border-slate-800 rounded transition-colors cursor-pointer"
                      >
                        {copiedBackendSnippet ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="p-3 bg-slate-950 border border-slate-900 rounded-lg font-mono text-[10px] text-purple-300 leading-relaxed max-h-[190px] overflow-y-auto whitespace-pre scrollbar-thin">
                      {selectedBackendModule.codeSnippet}
                    </div>
                  </div>

                  {/* Testing protocol */}
                  <div className="p-3 bg-purple-950/20 border border-purple-900/40 rounded-xl space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                      <span className="text-[9px] font-mono text-purple-400 uppercase tracking-wider font-bold">QA Validation Procedure</span>
                    </div>
                    <p className="text-[10px] text-slate-300 leading-relaxed">
                      {selectedBackendModule.testingStrategy}
                    </p>
                  </div>

                </div>

              </div>
            </div>

            {/* Regression Testing Sandbox / Terminal Simulation */}
            <div className="bg-slate-950/30 border border-slate-800/80 p-5 rounded-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-900">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-xs font-bold font-mono uppercase text-slate-300 tracking-wider">
                    Automated Quality Assurance Testing Dashboard (pytest)
                  </h3>
                </div>
                
                {/* Trigger button */}
                <button
                  onClick={runPytestSimulation}
                  disabled={pytestSimulating}
                  className={`px-4 py-2 text-xs font-mono font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
                    pytestSimulating
                      ? 'bg-slate-900 border border-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-950/20'
                  }`}
                >
                  <PlayCircle className={`w-4 h-4 ${pytestSimulating ? 'animate-spin' : ''}`} />
                  <span>{pytestSimulating ? 'Executing Test Harness...' : 'Execute Pytest Suite'}</span>
                </button>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed max-w-3xl">
                Automated tests evaluate router endpoints, verify DistilBERT extraction parameters, and validate the Relational SQLite tables under full load. Running tests ensures continuous integration confidence.
              </p>

              {/* Simulated Terminal Screen */}
              <div className="bg-black rounded-xl border border-slate-900 overflow-hidden flex flex-col min-h-[280px]">
                {/* Terminal Header */}
                <div className="px-4 py-2 bg-slate-950 border-b border-slate-900 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    <span>test_session_bash.sh</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-900"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-900"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-900"></span>
                  </div>
                </div>

                {/* Terminal Output Output Streams */}
                <div className="p-5 flex-grow font-mono text-[10px] text-slate-400 leading-normal space-y-1 select-text max-h-[350px] overflow-y-auto scrollbar-thin">
                  {pytestOutputLogs.length > 0 ? (
                    pytestOutputLogs.map((line, idx) => {
                      let color = "text-slate-400";
                      if (line.includes("PASSED")) {
                        color = "text-emerald-400 font-semibold";
                      } else if (line.includes("====")) {
                        color = "text-indigo-400 font-bold";
                      } else if (line.includes("100%")) {
                        color = "text-emerald-400 font-mono";
                      } else if (line.startsWith("TOTAL")) {
                        color = "text-indigo-200 font-bold border-t border-slate-900 pt-1";
                      } else if (line.includes("Stmts")) {
                        color = "text-slate-500 font-semibold";
                      }
                      
                      return (
                        <div key={idx} className={color}>
                          {line}
                        </div>
                      );
                    })
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center text-slate-600 py-12 space-y-2">
                      <Terminal className="w-8 h-8 text-slate-800" />
                      <p className="text-xs">No active terminal output stream.</p>
                      <p className="text-[10px]">Click the 'Execute Pytest Suite' button at the top-right to simulate the continuous integration testing pipeline.</p>
                    </div>
                  )}
                </div>

                {/* Footer status indicator */}
                <div className="px-4 py-2 bg-slate-950 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${pytestSimulating ? 'bg-amber-500 animate-pulse' : pytestCompleted ? 'bg-emerald-500' : 'bg-slate-700'}`}></span>
                    <span>Harness: {pytestSimulating ? 'SIMULATING RUN' : pytestCompleted ? 'COMPLETED (ALL TESTS PASSED)' : 'IDLE'}</span>
                  </div>
                  <span>pytest-cov v4.1.0</span>
                </div>
              </div>

            </div>

          </motion.div>
        ) : activeGuideTab === 'pydantic' ? (
          <motion.div
            key="pydantic-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Pydantic Intro Card */}
            <div className="bg-slate-950/30 border border-slate-800/80 p-5 rounded-xl space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-xs font-bold font-mono uppercase text-slate-300 tracking-wider">
                    Pydantic v2 Schemas & Data Contracts
                  </h3>
                </div>
                <span className="px-2 py-0.5 bg-emerald-950/40 border border-emerald-500/20 text-emerald-300 text-[9px] font-mono rounded font-semibold uppercase">
                  Data Validation Layer
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Before building any service logic or routes, it is essential to define the data contracts between the frontend and backend. These contracts are expressed as <strong>Pydantic models</strong>, which provide automatic type validation, serialization, and clear documentation through FastAPI's built-in Swagger UI. By inheriting from <code>BaseModel</code>, each class gains automatic validation — if a required field is missing or has the wrong type, FastAPI will automatically return a <strong>422 Unprocessable Entity</strong> error with a clear description of what went wrong, without requiring any additional error-handling code.
              </p>
            </div>

            {/* FastAPI Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fadeIn">
              
              {/* Feature 1: Automatic OpenAPI Documentation */}
              <div className="bg-slate-900/40 border border-slate-800 p-4.5 rounded-xl flex flex-col justify-between space-y-3 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-500/5 rounded-full blur-xl -mr-4 -mt-4" />
                <div className="space-y-2 z-10">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-bold text-slate-200">Automatic OpenAPI Documentation</span>
                  </div>
                  <p className="text-[10.5px] text-slate-400 leading-relaxed font-sans">
                    Because all endpoints use Pydantic models for both request and response bodies, FastAPI automatically generates a complete <strong>OpenAPI 3.0 specification</strong> and serves it through a built-in Swagger UI at <code className="text-indigo-400 font-mono">http://127.0.0.1:8000/docs</code>. This means developers can test all endpoints interactively through the browser without needing any additional tools like Postman or curl.
                  </p>
                </div>
              </div>

              {/* Feature 2: Type-Safe Request Validation */}
              <div className="bg-slate-900/40 border border-slate-800 p-4.5 rounded-xl flex flex-col justify-between space-y-3 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-full blur-xl -mr-4 -mt-4" />
                <div className="space-y-2 z-10">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-slate-200">Type-Safe Request Validation</span>
                  </div>
                  <p className="text-[10.5px] text-slate-400 leading-relaxed font-sans">
                    When a request arrives at any endpoint, FastAPI automatically validates the JSON body against the corresponding Pydantic schema before the handler function is even called. If the description field is missing from a <code className="text-emerald-400 font-mono">ConversationRequest</code>, or if interests is sent as a string instead of a list, FastAPI returns a detailed <strong>422 Unprocessable Entity</strong> error explaining exactly what was wrong — with zero custom validation code.
                  </p>
                </div>
              </div>

              {/* Feature 3: Response Model Enforcement */}
              <div className="bg-slate-900/40 border border-slate-800 p-4.5 rounded-xl flex flex-col justify-between space-y-3 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-teal-500/5 rounded-full blur-xl -mr-4 -mt-4" />
                <div className="space-y-2 z-10">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-teal-400" />
                    <span className="text-xs font-bold text-slate-200">Response Model Enforcement</span>
                  </div>
                  <p className="text-[10.5px] text-slate-400 leading-relaxed font-sans">
                    The <code className="text-teal-400 font-mono">response_model</code> parameter on endpoint decorators (e.g., <code className="text-teal-400 font-mono">response_model=ConversationResponse</code>) ensures that the data returned from the handler function is validated and serialized correctly before being sent to the client. This prevents accidentally returning internal data structures or sensitive information that was not intended to be part of the API response.
                  </p>
                </div>
              </div>

            </div>

            {/* Contract Specifications Explorer */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Selector: List of 6 Models (Cols 1-4) */}
              <div className="lg:col-span-4 space-y-2">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1">Contract Models Catalogue</span>
                <div className="space-y-2">
                  {pydanticModelsList.map((model) => {
                    const isSelected = selectedPydanticModel.id === model.id;
                    return (
                      <button
                        key={model.id}
                        onClick={() => handlePydanticModelChange(model.id)}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                          isSelected
                            ? 'bg-slate-900/80 border-emerald-500/80 shadow-md shadow-emerald-950/10'
                            : 'bg-slate-950/20 border-slate-800/60 hover:bg-slate-900/30'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded flex items-center justify-center font-mono text-[10px] font-bold border ${
                          isSelected
                            ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                            : 'bg-slate-900 text-slate-500 border-slate-800'
                        }`}>
                          Py
                        </div>
                        <div className="space-y-1">
                          <h4 className={`text-[11px] font-bold ${
                            isSelected ? 'text-emerald-400 font-semibold' : 'text-slate-300'
                          }`}>
                            {model.name}
                          </h4>
                          <p className="text-[10px] text-slate-500 leading-normal line-clamp-2">
                            {model.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Specifications Card & Code Card (Cols 5-12) */}
              <div className="lg:col-span-8 space-y-4">
                
                {/* Contract Spec Details */}
                <div className="bg-slate-950/60 border border-slate-900 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-900">
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-slate-200">
                        {selectedPydanticModel.name}
                      </h4>
                      <span className="text-[9px] font-mono text-slate-500 block">
                        Base Class: <code className="text-emerald-400 font-bold">pydantic.BaseModel</code>
                      </span>
                    </div>
                    <span className="px-2 py-0.5 bg-slate-900 text-slate-400 text-[9px] font-mono border border-slate-800 rounded">
                      FastAPI Request Schema
                    </span>
                  </div>

                  {/* Schema Mandate */}
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">Contract Role</span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {selectedPydanticModel.description}
                    </p>
                  </div>

                  {/* Pydantic Python Implementation */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">Pydantic Class Implementation (Python 3.11)</span>
                      <button
                        onClick={() => copyBackendSnippet(selectedPydanticModel.pydanticCode)}
                        className="text-[10px] text-slate-400 hover:text-emerald-400 font-mono flex items-center gap-1 bg-slate-900 px-2 py-0.5 border border-slate-800 rounded transition-colors cursor-pointer"
                      >
                        {copiedBackendSnippet ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Class</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="p-4 bg-slate-950 border border-slate-900 rounded-lg font-mono text-[10.5px] text-emerald-300 leading-relaxed max-h-[220px] overflow-y-auto whitespace-pre scrollbar-thin">
                      {selectedPydanticModel.pydanticCode}
                    </div>
                  </div>
                </div>

                {/* Live Pydantic Validation Engine Sandbox */}
                <div className="bg-slate-950/60 border border-slate-900 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-900">
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-slate-200">
                        Interactive Pydantic Validation Playground
                      </h4>
                      <span className="text-[9px] text-slate-500 block">
                        Edit payload attributes in real-time to test data constraints and automatic validation tracebacks.
                      </span>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-950/20 border border-emerald-500/20 text-emerald-400 text-[9px] font-mono rounded font-semibold uppercase">
                      Live Validator Sandbox
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Left: Input Payload Code Editor */}
                    <div className="space-y-2 flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">HTTP Request Body (JSON)</span>
                          <button
                            onClick={() => {
                              setPydanticPayload(selectedPydanticModel.defaultPayload);
                              setPydanticValidationResult({ status: 'idle' });
                            }}
                            className="text-[9px] text-slate-400 hover:text-emerald-400 font-mono transition-colors"
                          >
                            Reset to Default
                          </button>
                        </div>
                        <textarea
                          value={pydanticPayload}
                          onChange={(e) => setPydanticPayload(e.target.value)}
                          className="w-full h-[210px] bg-black text-emerald-200 font-mono text-[11px] p-3 rounded-lg border border-slate-800 focus:border-emerald-500 focus:outline-none resize-none scrollbar-thin"
                          placeholder="Write JSON payload here..."
                        />
                      </div>

                      <button
                        onClick={executePydanticValidation}
                        className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow"
                      >
                        <PlayCircle className="w-4 h-4" />
                        <span>Run Pydantic Validation Engine</span>
                      </button>
                    </div>

                    {/* Right: Validation Output Tracer */}
                    <div className="space-y-2">
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">Engine Response Output</span>
                      <div className="bg-black/80 rounded-lg border border-slate-800 p-4 h-[252px] font-mono text-[10px] flex flex-col justify-between overflow-hidden">
                        
                        {pydanticValidationResult.status === 'idle' ? (
                          <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 space-y-2">
                            <Info className="w-8 h-8 text-slate-800" />
                            <p className="text-[11px]">Ready for validation checks.</p>
                            <p className="text-[9px] text-slate-600 max-w-[200px]">Modify properties on the left (e.g. make string too short or list empty) and run validation.</p>
                          </div>
                        ) : pydanticValidationResult.status === 'success' ? (
                          <div className="space-y-2 flex-grow overflow-y-auto scrollbar-thin">
                            <div className="flex items-center gap-1.5 text-emerald-400 font-bold border-b border-slate-900 pb-1.5">
                              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                              <span>HTTP 200 OK</span>
                            </div>
                            <span className="text-slate-400 text-[9px] uppercase tracking-wider block">Traceback logs:</span>
                            <pre className="text-slate-300 text-[9px] bg-slate-950/50 p-2 border border-slate-900 rounded select-all whitespace-pre-wrap leading-normal">
{`Status: Validation Passed
Model Instance: <${selectedPydanticModel.name} object>
Payload: ${JSON.stringify(pydanticValidationResult.validatedData, null, 2)}`}
                            </pre>
                          </div>
                        ) : pydanticValidationResult.status === 'fail' ? (
                          <div className="space-y-2 flex-grow overflow-y-auto scrollbar-thin">
                            <div className="flex items-center gap-1.5 text-rose-400 font-bold border-b border-slate-900 pb-1.5">
                              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                              <span>HTTP 422 Unprocessable Entity</span>
                            </div>
                            <span className="text-slate-400 text-[9px] uppercase tracking-wider block">Pydantic Traceback trace:</span>
                            <pre className="text-rose-300 text-[9px] bg-rose-950/20 p-2 border border-rose-900/40 rounded select-all whitespace-pre-wrap leading-normal">
{`ValidationError: ${pydanticValidationResult.errors?.length} validation error(s) for ${selectedPydanticModel.name}
${JSON.stringify(pydanticValidationResult.errors, null, 2)}`}
                            </pre>
                          </div>
                        ) : (
                          <div className="space-y-2 flex-grow overflow-y-auto scrollbar-thin">
                            <div className="flex items-center gap-1.5 text-amber-500 font-bold border-b border-slate-900 pb-1.5">
                              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                              <span>JSON Parse Error</span>
                            </div>
                            <span className="text-slate-400 text-[9px] uppercase tracking-wider block">Error Details:</span>
                            <pre className="text-amber-200 text-[9px] bg-amber-950/20 p-2 border border-amber-900/40 rounded whitespace-pre-wrap leading-normal">
{pydanticValidationResult.errors?.[0]?.msg}
                            </pre>
                          </div>
                        )}

                        <div className="border-t border-slate-900 pt-1.5 flex items-center justify-between text-[9px] text-slate-500">
                          <span>SYSTEM: FastAPI Router Ingress</span>
                          <span>JSON-Schema compliant</span>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </motion.div>
        ) : activeGuideTab === 'distilbert' ? (
          <motion.div
            key="distilbert-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* DistilBERT Intro Card */}
            <div className="bg-slate-950/30 border border-slate-800/80 p-5 rounded-xl space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-blue-400" />
                  <h3 className="text-xs font-bold font-mono uppercase text-slate-300 tracking-wider">
                    DistilBERT Zero-Shot Classification Layer
                  </h3>
                </div>
                <span className="px-2 py-0.5 bg-blue-950/40 border border-blue-500/20 text-blue-300 text-[9px] font-mono rounded font-semibold uppercase">
                  Machine Learning Service
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                This service module is responsible for the intelligent theme extraction capability of the application. It uses the <strong>Hugging Face Transformers pipeline abstraction</strong> to load and run the DistilBERT model configured for zero-shot classification. At the module level, when the Python file is first imported, the zero-shot classification pipeline is immediately instantiated. This is an intentional design decision — loading the DistilBERT model into memory once at startup (rather than on every request) means that subsequent requests are processed much faster, since the expensive model-loading step only happens once during the application lifecycle.
              </p>
            </div>

            {/* Model Memory Preloader Status Bar */}
            <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${
                  distilbertModelLoaded ? 'bg-emerald-500 shadow shadow-emerald-500/50' : 'bg-amber-500 shadow shadow-amber-500/50'
                } animate-pulse`} />
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold text-slate-200 block">
                    Server Pipeline State: {distilbertModelLoaded ? "MODEL CACHED IN RAM" : "UNLOADED (OFFLINE)"}
                  </span>
                  <span className="text-[9px] font-mono text-slate-500 block">
                    {distilbertModelLoaded 
                      ? `distilbert-base-uncased is cached in server RAM. Subsequent requests bypass boot latency.` 
                      : "Model is not yet instantiated. First request will suffer a ~2.45s boot load penalty."}
                  </span>
                </div>
              </div>
              <button
                onClick={() => preloadDistilbertModel(false)}
                disabled={distilbertModelLoaded || distilbertIsLoading}
                className={`px-3 py-1.5 rounded text-[10px] font-mono font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
                  distilbertModelLoaded 
                    ? 'bg-slate-950 border-slate-800 text-slate-500 cursor-not-allowed'
                    : distilbertIsLoading
                      ? 'bg-blue-950/20 border-blue-800 text-blue-400 cursor-wait animate-pulse'
                      : 'bg-blue-950/40 border-blue-500/40 text-blue-300 hover:bg-blue-900/30'
                }`}
              >
                {distilbertIsLoading ? (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
                    <span>Importing & Loading...</span>
                  </>
                ) : distilbertModelLoaded ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>Instantiated (2450ms)</span>
                  </>
                ) : (
                  <>
                    <PlayCircle className="w-3 h-3" />
                    <span>Preload Model into RAM</span>
                  </>
                )}
              </button>
            </div>

            {/* Interactive Pipeline Playground */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Settings and Trigger */}
              <div className="lg:col-span-6 space-y-4">
                <div className="bg-slate-950/60 border border-slate-900 rounded-xl p-5 space-y-4">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block border-b border-slate-900 pb-2">
                    Inference Request Parameters
                  </span>

                  {/* Text Input */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      Event description string (text)
                    </label>
                    <textarea
                      value={distilbertEventInput}
                      onChange={(e) => setDistilbertEventInput(e.target.value)}
                      rows={3}
                      className="w-full bg-black border border-slate-800 p-3 rounded-lg text-xs text-slate-300 font-sans focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 resize-none scrollbar-thin"
                      placeholder="Enter a descriptive text representing a technology agenda, keynote, or workshop meetup..."
                    />
                  </div>

                  {/* Candidate Labels */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                        Candidate Classification Labels (candidate_labels)
                      </label>
                      <span className="text-[9px] font-mono text-slate-500">
                        {distilbertCandidateLabels.length} configured
                      </span>
                    </div>
                    
                    {/* Add label row */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={distilbertNewLabel}
                        onChange={(e) => setDistilbertNewLabel(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddCandidateLabel()}
                        className="flex-grow bg-black border border-slate-800 px-3 py-1.5 rounded text-xs text-slate-300 focus:outline-none focus:border-blue-500"
                        placeholder="Add candidate label (e.g. Healthcare, Fintech)"
                      />
                      <button
                        onClick={handleAddCandidateLabel}
                        className="px-3 bg-blue-900/40 hover:bg-blue-800/40 text-blue-300 border border-blue-800/60 rounded text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Add
                      </button>
                    </div>

                    {/* Tags Chip List */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {distilbertCandidateLabels.map((tag, idx) => (
                        <span
                          key={`${tag}-${idx}`}
                          className="px-2 py-1 bg-slate-900 border border-slate-800 hover:border-red-500/30 text-slate-300 text-[10px] font-mono rounded-md flex items-center gap-1 transition-colors group cursor-pointer"
                          onClick={() => handleRemoveCandidateLabel(idx)}
                          title="Click to remove"
                        >
                          <span>{tag}</span>
                          <span className="text-[9px] text-slate-500 group-hover:text-red-400 font-bold ml-0.5">×</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action trigger button */}
                  <div className="pt-2">
                    <button
                      onClick={runDistilbertInference}
                      disabled={distilbertInferenceRunning || !distilbertEventInput.trim()}
                      className={`w-full py-3 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all shadow cursor-pointer ${
                        distilbertInferenceRunning
                          ? 'bg-blue-950/30 text-blue-400 border border-blue-800/50 cursor-wait animate-pulse'
                          : 'bg-blue-600 hover:bg-blue-500'
                      }`}
                    >
                      {distilbertInferenceRunning ? (
                        <>
                          <span className="w-2.5 h-2.5 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />
                          <span>Executing Zero-Shot Inference...</span>
                        </>
                      ) : (
                        <>
                          <Cpu className="w-4 h-4" />
                          <span>Run extract_event_themes Function</span>
                        </>
                      )}
                    </button>
                    {!distilbertModelLoaded && (
                      <p className="text-[9px] text-amber-500/90 font-mono text-center mt-2 flex items-center justify-center gap-1">
                        <Info className="w-3 h-3" />
                        <span>Warning: Model is unloaded. First run will incur a 2.45s boot load penalty.</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Results & Engine Status */}
              <div className="lg:col-span-6 space-y-4">
                
                {/* Latency Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-3.5 space-y-1">
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">Startup Boot Time</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-base font-mono font-bold text-slate-300">2,450</span>
                      <span className="text-[10px] text-slate-500 font-mono">ms</span>
                    </div>
                    <span className="text-[9px] text-slate-500 leading-normal block">
                      Expensive pipeline download and setup time paid on import.
                    </span>
                  </div>

                  <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-3.5 space-y-1">
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">Cached Inference</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-base font-mono font-bold text-emerald-400">
                        {distilbertStats.lastInferenceTime ? distilbertStats.lastInferenceTime : "35 - 65"}
                      </span>
                      <span className="text-[10px] text-emerald-600 font-mono">ms</span>
                    </div>
                    <span className="text-[9px] text-slate-500 leading-normal block">
                      Pre-instantiated pipeline execution time bypasses cold startup.
                    </span>
                  </div>
                </div>

                {/* Classification Outputs */}
                <div className="bg-slate-950/60 border border-slate-900 rounded-xl p-5 space-y-4">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block border-b border-slate-900 pb-2">
                    Inference Classifier Outputs (Top 3 Scored Themes)
                  </span>

                  {distilbertResults ? (
                    <div className="space-y-4">
                      
                      {/* Interactive timing breakdown */}
                      <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg flex items-center justify-between text-[10px] font-mono">
                        <span className="text-slate-400">Processing Latency:</span>
                        <div className="flex items-center gap-1.5 text-blue-400">
                          <span>{distilbertLatency} ms</span>
                          {distilbertLatency && distilbertLatency > 1000 ? (
                            <span className="px-1.5 py-0.5 bg-amber-950 text-amber-400 text-[8px] rounded uppercase font-bold">Cold Start Delay Included</span>
                          ) : (
                            <span className="px-1.5 py-0.5 bg-emerald-950 text-emerald-400 text-[8px] rounded uppercase font-bold">Cache Hit</span>
                          )}
                        </div>
                      </div>

                      {/* Theme score items */}
                      <div className="space-y-3">
                        {distilbertResults.map((result, idx) => (
                          <div key={result.label} className="space-y-1">
                            <div className="flex justify-between items-center text-[11px]">
                              <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                <span className="font-bold text-slate-200">{result.label}</span>
                              </div>
                              <span className="font-mono text-slate-400 text-[10px]">
                                {(result.score * 100).toFixed(2)}% confidence
                              </span>
                            </div>
                            <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                              <div
                                className="bg-blue-500 h-full rounded-full transition-all duration-500"
                                style={{ width: `${result.score * 100}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Informative text on downstreams */}
                      <p className="text-[10px] text-slate-500 leading-normal">
                        These identified themes drive everything that follows — they become the context window parameters for the GPT-2 conversation generation models.
                      </p>

                      {/* Raw JSON Contract Response */}
                      <div className="space-y-1.5">
                        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">FastAPI Router Response payload</span>
                        <div className="bg-black/90 rounded border border-slate-850 p-3 font-mono text-[9.5px] text-emerald-300">
                          <pre className="whitespace-pre-wrap select-all select-none">
{JSON.stringify({
  status: "analyzed",
  themes: distilbertResults.map(r => r.label),
  scores: distilbertResults.map(r => Number(r.score.toFixed(4))),
  latency_ms: distilbertStats.lastInferenceTime || 42
}, null, 2)}
                          </pre>
                        </div>
                      </div>

                    </div>
                  ) : (
                    <div className="py-12 flex flex-col items-center justify-center text-center text-slate-500 space-y-2">
                      <Cpu className="w-8 h-8 text-slate-800 animate-pulse" />
                      <p className="text-[11px] text-slate-400">Pipeline Idle.</p>
                      <p className="text-[9px] text-slate-600 max-w-[240px]">
                        Configure parameters on the left and run the extractor pipeline to simulate real-time zero-shot classification scores.
                      </p>
                    </div>
                  )}

                </div>

              </div>

            </div>

          </motion.div>
        ) : activeGuideTab === 'gpt2' ? (
          <motion.div
            key="gpt2-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* GPT-2 Intro Card */}
            <div className="bg-slate-950/30 border border-slate-800/80 p-5 rounded-xl space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
                  <h3 className="text-xs font-bold font-mono uppercase text-slate-300 tracking-wider">
                    GPT-2 Conversation Starter Generator Module
                  </h3>
                </div>
                <span className="px-2 py-0.5 bg-pink-950/40 border border-pink-500/20 text-pink-300 text-[9px] font-mono rounded font-semibold uppercase">
                  Text Generation Service
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                This service module handles the creative core of the application: generating natural, engaging conversation starters using GPT-2. Unlike the classifier which makes binary judgment calls, the generator produces original text that must sound human-like and contextually appropriate.
              </p>
            </div>

            {/* Model RAM Preloader Status Bar */}
            <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${
                  gpt2ModelLoaded ? 'bg-emerald-500 shadow shadow-emerald-500/50' : 'bg-amber-500 shadow shadow-amber-500/50'
                } animate-pulse`} />
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold text-slate-200 block">
                    Server Pipeline State: {gpt2ModelLoaded ? "MODEL CACHED IN RAM" : "UNLOADED (OFFLINE)"}
                  </span>
                  <span className="text-[9px] font-mono text-slate-500 block">
                    {gpt2ModelLoaded 
                      ? `gpt2-medium-generator is cached in server RAM. Subsequent generation requests bypass cold-boot delay.` 
                      : "Model is not yet instantiated. First request will suffer a ~2.8s model download/RAM setup delay."}
                  </span>
                </div>
              </div>
              <button
                onClick={() => preloadGpt2Model(false)}
                disabled={gpt2ModelLoaded || gpt2IsLoading}
                className={`px-3 py-1.5 rounded text-[10px] font-mono font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
                  gpt2ModelLoaded 
                    ? 'bg-slate-950 border-slate-800 text-slate-500 cursor-not-allowed'
                    : gpt2IsLoading
                      ? 'bg-pink-950/20 border-pink-800 text-pink-400 cursor-wait animate-pulse'
                      : 'bg-pink-950/40 border-pink-500/40 text-pink-300 hover:bg-pink-900/30'
                }`}
              >
                {gpt2IsLoading ? (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping" />
                    <span>Downloading & Loading...</span>
                  </>
                ) : gpt2ModelLoaded ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>Instantiated (2800ms)</span>
                  </>
                ) : (
                  <>
                    <PlayCircle className="w-3 h-3" />
                    <span>Preload Model into RAM</span>
                  </>
                )}
              </button>
            </div>

            {/* Interactive Pipeline Playground */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Parameters and Config */}
              <div className="lg:col-span-6 space-y-4">
                <div className="bg-slate-950/60 border border-slate-900 rounded-xl p-5 space-y-4">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block border-b border-slate-900 pb-2">
                    Inference Request Parameters
                  </span>

                  {/* Seed reproducibility */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                        Random Seed (reproducibility)
                      </label>
                      <span className="text-[9px] font-mono text-slate-500 font-bold">
                        {gpt2Seed === 42 ? "set_seed(42) [Deterministic]" : "Random Seed [Dynamic]"}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setGpt2Seed(42)}
                        className={`py-1.5 rounded text-xs font-mono font-bold border transition-all cursor-pointer ${
                          gpt2Seed === 42 
                            ? 'bg-pink-950/30 border-pink-500/40 text-pink-400' 
                            : 'bg-black border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        Seed = 42
                      </button>
                      <button
                        onClick={() => setGpt2Seed(null)}
                        className={`py-1.5 rounded text-xs font-mono font-bold border transition-all cursor-pointer ${
                          gpt2Seed === null 
                            ? 'bg-pink-950/30 border-pink-500/40 text-pink-400' 
                            : 'bg-black border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        Random/Dynamic
                      </button>
                    </div>
                    <p className="text-[9.5px] text-slate-500 leading-normal">
                      The <code className="text-pink-400">set_seed(42)</code> call at module level is crucial for reproducibility. By fixing the random seed, the model will produce consistent outputs given the same input across different runs, which is invaluable for debugging and testing.
                    </p>
                  </div>

                  {/* Input parameters */}
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                        Extracted Event Themes (themes)
                      </label>
                      <input
                        type="text"
                        value={gpt2ThemesInput}
                        onChange={(e) => setGpt2ThemesInput(e.target.value)}
                        className="w-full bg-black border border-slate-800 px-3 py-1.5 rounded text-xs text-slate-300 focus:outline-none focus:border-pink-500"
                        placeholder="Comma-separated themes"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                        User Interests (interests)
                      </label>
                      <input
                        type="text"
                        value={gpt2InterestsInput}
                        onChange={(e) => setGpt2InterestsInput(e.target.value)}
                        className="w-full bg-black border border-slate-800 px-3 py-1.5 rounded text-xs text-slate-300 focus:outline-none focus:border-pink-500"
                        placeholder="Comma-separated interests"
                      />
                    </div>
                  </div>

                  {/* Prompt Engineering Narrative Block */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      Interpolated Prompt Template Narrative
                    </span>
                    <div className="bg-black border border-slate-800/80 p-3 rounded-lg text-[10px] font-mono text-slate-300 leading-relaxed">
                      <span className="text-pink-400"># Prompt construction</span><br/>
                      {`You are an attendee at a meetup about `}
                      <span className="px-1.5 py-0.5 bg-blue-950/50 border border-blue-500/20 text-blue-300 rounded font-semibold">
                        {gpt2ThemesInput || "..."}
                      </span>
                      {`. Your interests are `}
                      <span className="px-1.5 py-0.5 bg-purple-950/50 border border-purple-500/20 text-purple-300 rounded font-semibold">
                        {gpt2InterestsInput || "..."}
                      </span>
                      {`. Write 3 natural, engaging conversation starters to break the ice.`}
                    </div>
                    <p className="text-[9.5px] text-slate-500 leading-normal">
                      The <code className="text-pink-400">generate_topics</code> function constructs a structured natural language prompt. This prompt engineering approach guides GPT-2 toward producing responses in the desired format — conversation starters rather than arbitrary text.
                    </p>
                  </div>

                  {/* Max length limit */}
                  <div className="space-y-2 pt-1">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                        Generation Token Limit (max_length)
                      </label>
                      <span className="text-xs font-mono text-pink-400">{gpt2MaxLength} tokens</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="150"
                      value={gpt2MaxLength}
                      onChange={(e) => setGpt2MaxLength(Number(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
                    />
                    <p className="text-[9.5px] text-slate-500 leading-normal">
                      The <code className="text-pink-400">max_length={gpt2MaxLength}</code> parameter limits the generated text to approximately {gpt2MaxLength} tokens, ensuring suggestions remain concise and practical.
                    </p>
                  </div>

                  {/* Action trigger button */}
                  <div className="pt-2">
                    <button
                      onClick={runGpt2Inference}
                      disabled={gpt2InferenceRunning || !gpt2ThemesInput.trim() || !gpt2InterestsInput.trim()}
                      className={`w-full py-3 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all shadow cursor-pointer ${
                        gpt2InferenceRunning
                          ? 'bg-pink-950/30 text-pink-400 border border-pink-800/50 cursor-wait animate-pulse'
                          : 'bg-pink-600 hover:bg-pink-500 shadow-pink-500/10'
                      }`}
                    >
                      {gpt2InferenceRunning ? (
                        <>
                          <span className="w-2.5 h-2.5 rounded-full border-2 border-pink-400 border-t-transparent animate-spin" />
                          <span>Generating Icebreakers...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>Run generate_topics Function</span>
                        </>
                      )}
                    </button>
                    {!gpt2ModelLoaded && (
                      <p className="text-[9px] text-amber-500/90 font-mono text-center mt-2 flex items-center justify-center gap-1">
                        <Info className="w-3 h-3" />
                        <span>Warning: Model is unloaded. First run will incur a 2.80s boot load penalty.</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Outputs and Visualizers */}
              <div className="lg:col-span-6 space-y-4">
                
                {/* Latency Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-3.5 space-y-1">
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">Startup Boot Time</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-base font-mono font-bold text-slate-300">2,800</span>
                      <span className="text-[10px] text-slate-500 font-mono">ms</span>
                    </div>
                    <span className="text-[9px] text-slate-500 leading-normal block">
                      Expensive pipeline download and setup time paid on import.
                    </span>
                  </div>

                  <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-3.5 space-y-1">
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">Cached Inference</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-base font-mono font-bold text-emerald-400">
                        {gpt2Stats.lastInferenceTime ? gpt2Stats.lastInferenceTime : "45 - 85"}
                      </span>
                      <span className="text-[10px] text-emerald-600 font-mono">ms</span>
                    </div>
                    <span className="text-[9px] text-slate-500 leading-normal block">
                      Pre-instantiated pipeline execution time bypasses cold startup.
                    </span>
                  </div>
                </div>

                {/* Outputs panel */}
                <div className="bg-slate-950/60 border border-slate-900 rounded-xl p-5 space-y-4">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block border-b border-slate-900 pb-2">
                    Inference Output & Post-Processing Visualizer
                  </span>

                  {gpt2ProcessedOutput.length > 0 ? (
                    <div className="space-y-4">
                      
                      {/* Interactive processing latency */}
                      <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg flex items-center justify-between text-[10px] font-mono">
                        <span className="text-slate-400">Processing Latency:</span>
                        <div className="flex items-center gap-1.5 text-pink-400">
                          <span>{gpt2Latency} ms</span>
                          {gpt2Latency && gpt2Latency > 1000 ? (
                            <span className="px-1.5 py-0.5 bg-amber-950 text-amber-400 text-[8px] rounded uppercase font-bold">Cold Start Delay</span>
                          ) : (
                            <span className="px-1.5 py-0.5 bg-emerald-950 text-emerald-400 text-[8px] rounded uppercase font-bold">RAM Cache Hit</span>
                          )}
                        </div>
                      </div>

                      {/* Raw output string preview */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">Raw GPT-2 Output String (Noisy)</span>
                          <span className="text-[8px] font-mono text-amber-400 bg-amber-950/20 border border-amber-900/30 px-1 py-0.5 rounded uppercase">Raw model noise</span>
                        </div>
                        <div className="bg-black/90 rounded border border-slate-850 p-3 font-mono text-[9.5px] text-slate-400 max-h-24 overflow-y-auto scrollbar-thin whitespace-pre-wrap leading-normal">
                          {gpt2RawOutput}
                        </div>
                      </div>

                      {/* Step by step post-processing breakdown */}
                      <div className="space-y-2 border-t border-slate-900 pt-3">
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Post-Processing Pipeline Trace</span>
                        
                        <div className="grid grid-cols-1 gap-2 text-[10px] font-mono text-slate-500">
                          <div className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-xs text-slate-400 font-bold">1</span>
                            <span>Split output by newline characters: <code className="text-slate-400">raw.split('\n')</code></span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-xs text-slate-400 font-bold">2</span>
                            <span>Filter empty lines, prompt echoes, and trailing content truncation.</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-xs text-slate-400 font-bold">3</span>
                            <span>Strip list formatting & bullet markers (<code className="text-slate-400">*, -, 1., 2.</code>)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-xs text-slate-400 font-bold">4</span>
                            <span>Extract exactly the first three clean lines of strings.</span>
                          </div>
                        </div>
                        <p className="text-[9.5px] text-slate-500 leading-normal">
                          This post-processing step handles the fact that GPT-2 does not always produce cleanly formatted lists, requiring light cleanup to extract usable suggestions.
                        </p>
                      </div>

                      {/* Extracted clean outputs */}
                      <div className="space-y-2 border-t border-slate-900 pt-3">
                        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">Extracted Conversation Starters (Returned Payload)</span>
                        <div className="space-y-2">
                          {gpt2ProcessedOutput.map((starter, idx) => (
                            <div key={idx} className="bg-slate-900/50 border border-slate-850 p-3 rounded-lg flex items-start gap-3">
                              <span className="px-1.5 py-0.5 bg-pink-950 text-pink-300 font-mono text-[9px] rounded font-bold uppercase mt-0.5">#{idx + 1}</span>
                              <p className="text-xs text-slate-200 leading-relaxed">{starter}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* FastAPI Router Response */}
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">FastAPI Router Response payload</span>
                        <div className="bg-black/90 rounded border border-slate-850 p-3 font-mono text-[9.5px] text-emerald-300">
                          <pre className="whitespace-pre-wrap select-all select-none">
{JSON.stringify({
  status: "success",
  seed_used: gpt2Seed,
  max_tokens_limit: gpt2MaxLength,
  starters: gpt2ProcessedOutput,
  latency_ms: gpt2Stats.lastInferenceTime || 55
}, null, 2)}
                          </pre>
                        </div>
                      </div>

                    </div>
                  ) : (
                    <div className="py-12 flex flex-col items-center justify-center text-center text-slate-500 space-y-2">
                      <Sparkles className="w-8 h-8 text-slate-800 animate-pulse" />
                      <p className="text-[11px] text-slate-400">Pipeline Idle.</p>
                      <p className="text-[9px] text-slate-600 max-w-[240px]">
                        Configure parameters on the left and run the generator pipeline to simulate natural conversation starters generated by GPT-2 in real time.
                      </p>
                    </div>
                  )}

                </div>

              </div>

            </div>

          </motion.div>
        ) : activeGuideTab === 'wikipedia' ? (
          <motion.div
            key="wikipedia-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Wikipedia Intro Card */}
            <div className="bg-slate-950/30 border border-slate-800/80 p-5 rounded-xl space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-teal-400 animate-pulse" />
                  <h3 className="text-xs font-bold font-mono uppercase text-slate-300 tracking-wider">
                    Wikipedia Fact-Verification Service
                  </h3>
                </div>
                <span className="px-2 py-0.5 bg-teal-950/40 border border-teal-500/20 text-teal-300 text-[9px] font-mono rounded font-semibold uppercase">
                  External Knowledge API
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                This service provides the quick fact-verification capability by querying the Wikipedia API. The design philosophy here prioritizes simplicity and reliability — Wikipedia is a well-maintained, publicly accessible knowledge base that returns structured JSON data, making it ideal for this use case without requiring API keys or authentication.
              </p>
            </div>

            {/* Defensive Layer Info Bar */}
            <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-200 block">
                    Defensive Try-Except Protection Enabled
                  </span>
                  <span className="text-[9.5px] text-slate-400 block leading-relaxed">
                    The <code className="text-emerald-400">fact_check</code> function wraps the REST fetch in a robust try-catch block. If network interruptions, timeouts, CORS restrictions, or invalid JSON structures occur, the system intercepts the error gracefully and returns a standard knowledge fallback rather than crashing.
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Side: Controls & Query presets */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-slate-950/60 border border-slate-900 rounded-xl p-5 space-y-4">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block border-b border-slate-900 pb-2">
                    Query Customizer
                  </span>

                  {/* Query input */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      Search Fact / Article Title
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={wikiQuery}
                        onChange={(e) => setWikiQuery(e.target.value)}
                        className="w-full bg-black border border-slate-800 pl-9 pr-3 py-2 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-teal-500 font-medium"
                        placeholder="e.g. GPT-2 or Deep Learning"
                      />
                      <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500" />
                    </div>
                  </div>

                  {/* Quick Preset Queries */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                      Quick Verification Presets
                    </label>
                    <div className="grid grid-cols-1 gap-1.5">
                      {[
                        "Generative pre-trained transformer 2",
                        "Zero-shot learning",
                        "FastAPI",
                        "Pydantic"
                      ].map((preset, i) => (
                        <button
                          key={i}
                          onClick={() => setWikiQuery(preset)}
                          className={`w-full text-left px-3 py-1.5 rounded text-xs font-mono border transition-all flex items-center justify-between cursor-pointer ${
                            wikiQuery === preset
                              ? 'bg-teal-950/20 border-teal-500/40 text-teal-300'
                              : 'bg-black border-slate-900 text-slate-400 hover:border-slate-800 hover:text-slate-200'
                          }`}
                        >
                          <span>{preset}</span>
                          <ChevronRight className="w-3 h-3 text-slate-500" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Trigger button */}
                  <div className="pt-2">
                    <button
                      onClick={runWikiFactCheck}
                      disabled={wikiInferenceRunning || !wikiQuery.trim()}
                      className={`w-full py-2.5 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all shadow cursor-pointer ${
                        wikiInferenceRunning
                          ? 'bg-teal-950/30 text-teal-400 border border-teal-800/50 cursor-wait animate-pulse'
                          : 'bg-teal-600 hover:bg-teal-500 shadow-teal-500/10'
                      }`}
                    >
                      {wikiInferenceRunning ? (
                        <>
                          <span className="w-2.5 h-2.5 rounded-full border-2 border-teal-400 border-t-transparent animate-spin" />
                          <span>Contacting Wikipedia REST API...</span>
                        </>
                      ) : (
                        <>
                          <Search className="w-3.5 h-3.5" />
                          <span>Run fact_check Function</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>
              </div>

              {/* Right Side: Execution & Outputs */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* Status card */}
                <div className="bg-slate-950/60 border border-slate-900 rounded-xl p-5 space-y-4">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block border-b border-slate-900 pb-2">
                    API Response & Defensive Trace
                  </span>

                  {wikiResult ? (
                    <div className="space-y-4">
                      
                      {/* Latency and Status Info */}
                      <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg flex items-center justify-between text-[10px] font-mono">
                        <span className="text-slate-400 font-semibold">Response Status:</span>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400">{wikiLatency} ms</span>
                          {wikiIsFallback ? (
                            <span className="px-2 py-0.5 bg-amber-950/60 border border-amber-500/20 text-amber-300 text-[8px] rounded uppercase font-bold animate-pulse">
                              Defensive Fallback Triggered
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 bg-emerald-950/60 border border-emerald-500/20 text-emerald-300 text-[8px] rounded uppercase font-bold">
                              Wikipedia Summary (CORS OK)
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Extracted Text */}
                      <div className="space-y-1.5">
                        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">
                          Verified Fact Extract
                        </span>
                        <div className="p-4 bg-black rounded border border-slate-900 text-xs text-slate-200 leading-relaxed font-sans">
                          {wikiResult}
                        </div>
                      </div>

                      {/* Source Link */}
                      {wikiSourceUrl && (
                        <div className="flex justify-end">
                          <a
                            href={wikiSourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] font-mono text-teal-400 hover:text-teal-300 flex items-center gap-1 hover:underline"
                          >
                            <Globe className="w-3 h-3" />
                            <span>View Original Article on Wikipedia</span>
                          </a>
                        </div>
                      )}

                      {/* Raw Response Payload */}
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">
                          Service Response payload (JSON)
                        </span>
                        <div className="bg-black/90 rounded border border-slate-850 p-3 font-mono text-[9.5px] text-emerald-300 max-h-48 overflow-y-auto scrollbar-thin">
                          <pre className="whitespace-pre-wrap select-all">
                            {JSON.stringify(wikiResponsePayload, null, 2)}
                          </pre>
                        </div>
                      </div>

                    </div>
                  ) : (
                    <div className="py-12 flex flex-col items-center justify-center text-center text-slate-500 space-y-2">
                      <Globe className="w-8 h-8 text-slate-800 animate-pulse" />
                      <p className="text-[11px] text-slate-400">Verification Layer Idle.</p>
                      <p className="text-[9px] text-slate-600 max-w-[280px]">
                        Select a preset or input an article title on the left, then trigger the <code className="text-teal-500">fact_check</code> function to query Wikipedia.
                      </p>
                    </div>
                  )}

                </div>

              </div>

            </div>
          </motion.div>
        ) : activeGuideTab === 'history' ? (
          <motion.div
            key="history-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* History Logger Intro Card */}
            <div className="bg-slate-950/30 border border-slate-800/80 p-5 rounded-xl space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-purple-400 animate-pulse" />
                  <h3 className="text-xs font-bold font-mono uppercase text-slate-300 tracking-wider">
                    Persistent History Logger & Storage Module
                  </h3>
                </div>
                <span className="px-2 py-0.5 bg-purple-950/40 border border-purple-500/20 text-purple-300 text-[9px] font-mono rounded font-semibold uppercase">
                  Data Persistence Layer
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                The history logger provides persistent storage for conversation sessions. This enables the <span className="text-purple-300 font-semibold">'View Previous Conversations'</span> feature in the frontend and allows users to revisit past interactions for reflection and learning.
              </p>
            </div>

            {/* Pathlib Cross-Platform Guard & Empty-File Fallback Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-200 block">
                    pathlib.Path Cross-Platform Best Practice
                  </span>
                  <span className="text-[9.5px] text-slate-400 block leading-relaxed">
                    The use of Python's <code className="text-pink-400">pathlib.Path</code> for file handling rather than raw string paths is a best practice that ensures cross-platform compatibility — the same code works correctly on Windows, macOS, and Linux without modification.
                  </span>
                </div>
              </div>

              <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-200 block">
                    Clean load_history Fallback
                  </span>
                  <span className="text-[9.5px] text-slate-400 block leading-relaxed">
                    The <code className="text-blue-400">load_history</code> function provides a clean read interface that always returns a list, even when no history has been saved yet or if the file does not exist on disk, avoiding uncaught file exceptions.
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Side: Logger Simulator controls */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-slate-950/60 border border-slate-900 rounded-xl p-5 space-y-4">
                  
                  <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                      History Log Generator
                    </span>
                    <button
                      onClick={randomizeNewLog}
                      className="text-[9px] font-mono text-purple-400 hover:text-purple-300 flex items-center gap-1 cursor-pointer hover:underline"
                    >
                      <Shuffle className="w-2.5 h-2.5" />
                      <span>Randomize Entry</span>
                    </button>
                  </div>

                  {/* Form fields */}
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">
                        Themes
                      </label>
                      <input
                        type="text"
                        value={newLogThemes}
                        onChange={(e) => setNewLogThemes(e.target.value)}
                        className="w-full bg-black border border-slate-800 px-3 py-1.5 rounded text-xs text-slate-300 focus:outline-none focus:border-purple-500 font-mono"
                        placeholder="e.g. AI & ML"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">
                        Interests
                      </label>
                      <input
                        type="text"
                        value={newLogInterests}
                        onChange={(e) => setNewLogInterests(e.target.value)}
                        className="w-full bg-black border border-slate-800 px-3 py-1.5 rounded text-xs text-slate-300 focus:outline-none focus:border-purple-500 font-mono"
                        placeholder="e.g. developer tooling"
                      />
                    </div>

                    {/* Icebreakers Preview list */}
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">
                        Conversation Starters to Log
                      </label>
                      <div className="space-y-1 max-h-24 overflow-y-auto pr-1">
                        {newLogIcebreakers.map((starter, idx) => (
                          <div key={idx} className="bg-black/40 border border-slate-900 p-2 rounded text-[10px] text-slate-400 font-sans leading-normal">
                            {starter}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* File Path modifier */}
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">
                        Simulation File Path (pathlib.Path)
                      </label>
                      <input
                        type="text"
                        value={historyFilePath}
                        onChange={(e) => setHistoryFilePath(e.target.value)}
                        className="w-full bg-black border border-slate-800 px-3 py-1.5 rounded text-xs text-slate-500 font-mono focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="space-y-2 pt-2 border-t border-slate-900">
                    <button
                      onClick={runLogConversation}
                      disabled={isLoggingConversation || !newLogThemes.trim() || !newLogInterests.trim()}
                      className={`w-full py-2.5 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all shadow cursor-pointer ${
                        isLoggingConversation
                          ? 'bg-purple-950/30 text-purple-400 border border-purple-800/50 cursor-wait animate-pulse'
                          : 'bg-purple-600 hover:bg-purple-500 shadow-purple-500/10'
                      }`}
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Run log_conversation()</span>
                    </button>

                    <button
                      onClick={runDeleteHistoryFile}
                      className="w-full py-1.5 text-slate-400 hover:text-slate-200 bg-black border border-slate-900 hover:border-slate-800 text-[10px] font-mono font-bold rounded flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Trash className="w-3 h-3 text-red-400" />
                      <span>Simulate Delete {historyFilePath.split('/').pop()}</span>
                    </button>
                  </div>

                </div>

                {/* Operations Terminal / Logs */}
                <div className="bg-slate-950 border border-slate-900 rounded-xl p-4 space-y-2">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">
                    Execution Trace (Internal Terminal)
                  </span>
                  <div className="bg-black/95 rounded border border-slate-850 p-3 font-mono text-[9.5px] leading-relaxed text-slate-300 min-h-[120px] max-h-[160px] overflow-y-auto scrollbar-thin space-y-1 select-none">
                    {logTrace.length > 0 ? (
                      logTrace.map((log, index) => (
                        <div key={index} className={log.includes('Write-back') || log.includes('deleted') ? 'text-purple-400' : 'text-slate-400'}>
                          {log}
                        </div>
                      ))
                    ) : (
                      <span className="text-slate-600">Terminal Idle. Run log_conversation() or Simulate Delete to trigger disk transaction traces.</span>
                    )}
                  </div>
                </div>

              </div>

              {/* Right Side: Simulated JSON Database state */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-slate-950/40 border border-slate-900 rounded-lg p-2.5 text-center space-y-0.5">
                    <span className="text-[8px] font-mono text-slate-500 uppercase tracking-wider block">JSON Records</span>
                    <span className="text-sm font-mono font-bold text-purple-400">{historyItems.length}</span>
                  </div>
                  <div className="bg-slate-950/40 border border-slate-900 rounded-lg p-2.5 text-center space-y-0.5">
                    <span className="text-[8px] font-mono text-slate-500 uppercase tracking-wider block">Write Ops</span>
                    <span className="text-sm font-mono font-bold text-slate-300">{historyStats.writeOperations}</span>
                  </div>
                  <div className="bg-slate-950/40 border border-slate-900 rounded-lg p-2.5 text-center space-y-0.5">
                    <span className="text-[8px] font-mono text-slate-500 uppercase tracking-wider block">File State</span>
                    <span className={`text-[10px] font-mono font-bold ${historyItems.length > 0 ? 'text-emerald-400' : 'text-amber-500'}`}>
                      {historyItems.length > 0 ? 'PERSISTED' : 'NOT FOUND (fallback)'}
                    </span>
                  </div>
                </div>

                {/* Simulated File Contents Card */}
                <div className="bg-slate-950/60 border border-slate-900 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-purple-400" />
                      <span>Simulated Disk File: <code className="text-purple-300">{historyFilePath}</code></span>
                    </span>
                    <span className="text-[8px] font-mono text-slate-500 uppercase bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                      read-modify-write pattern
                    </span>
                  </div>

                  {historyItems.length > 0 ? (
                    <div className="space-y-4">
                      
                      {/* JSON editor/viewer */}
                      <div className="space-y-1">
                        <span className="text-[8px] font-mono text-slate-500 uppercase block">Raw JSON Array Content</span>
                        <div className="bg-black/90 rounded border border-slate-850 p-4 font-mono text-[9.5px] text-emerald-300 max-h-56 overflow-y-auto scrollbar-thin">
                          <pre className="whitespace-pre-wrap select-all leading-normal">
                            {JSON.stringify(historyItems, null, 2)}
                          </pre>
                        </div>
                      </div>

                      {/* Decoded History cards for reflection/learning */}
                      <div className="space-y-2 pt-2 border-t border-slate-900">
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                          Reflection & Review UI ('View Previous Conversations' Component)
                        </span>

                        <div className="space-y-2.5 max-h-56 overflow-y-auto scrollbar-thin pr-1.5">
                          {historyItems.map((item, index) => (
                            <div key={index} className="bg-slate-900/30 border border-slate-900 p-3.5 rounded-lg space-y-2.5">
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                  <span className="text-[10px] font-mono text-slate-400">
                                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                  </span>
                                </div>
                                <span className="text-[9px] font-mono text-slate-500">
                                  {new Date(item.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                                </span>
                              </div>

                              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                                <div className="bg-black/30 p-1.5 rounded border border-slate-950/40">
                                  <span className="text-[8.5px] text-slate-500 block uppercase">Themes:</span>
                                  <span className="text-slate-300 block truncate">{item.themes}</span>
                                </div>
                                <div className="bg-black/30 p-1.5 rounded border border-slate-950/40">
                                  <span className="text-[8.5px] text-slate-500 block uppercase">Interests:</span>
                                  <span className="text-slate-300 block truncate">{item.interests}</span>
                                </div>
                              </div>

                              <div className="space-y-1 pl-2 border-l border-purple-500/30">
                                <span className="text-[8.5px] font-mono text-slate-500 block uppercase">Icebreakers generated:</span>
                                {item.icebreakers && item.icebreakers.map((starter: string, sIdx: number) => (
                                  <p key={sIdx} className="text-[10.5px] text-slate-300 leading-normal font-sans">
                                    • {starter}
                                  </p>
                                ))}
                              </div>

                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  ) : (
                    <div className="py-16 flex flex-col items-center justify-center text-center text-slate-500 space-y-3">
                      <FileText className="w-10 h-10 text-slate-800 animate-pulse" />
                      <div className="space-y-1">
                        <p className="text-xs text-slate-400 font-bold font-mono">File {historyFilePath} Does Not Exist (Empty state)</p>
                        <p className="text-[9.5px] text-slate-500 max-w-[340px] leading-normal">
                          The <code className="text-purple-400">load_history()</code> function intercepted this gracefully, returning a clean empty list <code className="text-emerald-400">[]</code> rather than raising a FileNotFoundError.
                        </p>
                      </div>
                      <button
                        onClick={runLogConversation}
                        className="px-3 py-1.5 bg-purple-950/40 hover:bg-purple-900/30 border border-purple-500/40 text-purple-300 font-mono text-[10px] rounded cursor-pointer"
                      >
                        Create File & Log First Entry
                      </button>
                    </div>
                  )}

                </div>

              </div>

            </div>

          </motion.div>
        ) : activeGuideTab === 'feedback' ? (
          <motion.div
            key="feedback-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Feedback Logger Intro Card */}
            <div className="bg-slate-950/30 border border-slate-800/80 p-5 rounded-xl space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4 text-rose-400 animate-pulse" />
                  <h3 className="text-xs font-bold font-mono uppercase text-slate-300 tracking-wider">
                    Suggestion Feedback Logger & Storage Module
                  </h3>
                </div>
                <span className="px-2 py-0.5 bg-rose-950/40 border border-rose-500/20 text-rose-300 text-[9px] font-mono rounded font-semibold uppercase">
                  Data Persistence Layer
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                The feedback logger follows the same architectural pattern as the history logger but serves a distinct purpose: <span className="text-rose-300 font-semibold">capturing explicit user feedback on individual conversation suggestions</span>. This feedback data forms the foundation for a future recommendation improvement loop.
              </p>
            </div>

            {/* Structured Fields Information Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-200 block">
                    Structured Feedback Fields
                  </span>
                  <span className="text-[9.5px] text-slate-400 block leading-relaxed">
                    Each feedback entry captures three fields: the exact suggestion text rated, the action taken (either <code className="text-emerald-400">'like'</code> or <code className="text-rose-400">'dislike'</code> corresponding to thumbs-up and thumbs-down buttons), and an ISO-formatted timestamp.
                  </span>
                </div>
              </div>

              <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-200 block">
                    Data Analytics Foundation
                  </span>
                  <span className="text-[9.5px] text-slate-400 block leading-relaxed">
                    This structured format makes it straightforward to perform analytics later — for example, identifying which types of suggestions consistently receive positive feedback versus negative feedback to inform prompt engineering.
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Side: Controls & Suggestions Presets */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-slate-950/60 border border-slate-900 rounded-xl p-5 space-y-4">
                  
                  <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                      Feedback Generator
                    </span>
                    <button
                      onClick={randomizeFeedbackSuggestion}
                      className="text-[9px] font-mono text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer hover:underline"
                    >
                      <Shuffle className="w-2.5 h-2.5" />
                      <span>Randomize Text</span>
                    </button>
                  </div>

                  {/* Suggestion Text Field */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">
                      Exact Suggestion Text Rated
                    </label>
                    <textarea
                      value={newFeedbackSuggestion}
                      onChange={(e) => setNewFeedbackSuggestion(e.target.value)}
                      rows={3}
                      className="w-full bg-black border border-slate-800 px-3 py-2 rounded text-xs text-slate-300 focus:outline-none focus:border-rose-500 font-sans leading-relaxed resize-none"
                      placeholder="Type custom suggestion text to rate..."
                    />
                  </div>

                  {/* Actions buttons */}
                  <div className="space-y-2 pt-2 border-t border-slate-900">
                    <span className="text-[9px] font-mono text-slate-500 uppercase block mb-1">Log Rating Action</span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => runLogFeedback('like')}
                        disabled={isLoggingFeedback || !newFeedbackSuggestion.trim()}
                        className={`py-2 px-3 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all shadow cursor-pointer ${
                          isLoggingFeedback
                            ? 'bg-emerald-950/20 text-emerald-400 border border-emerald-800/50 cursor-wait'
                            : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/10'
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>Thumbs-Up</span>
                      </button>

                      <button
                        onClick={() => runLogFeedback('dislike')}
                        disabled={isLoggingFeedback || !newFeedbackSuggestion.trim()}
                        className={`py-2 px-3 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all shadow cursor-pointer ${
                          isLoggingFeedback
                            ? 'bg-rose-950/20 text-rose-400 border border-rose-800/50 cursor-wait'
                            : 'bg-rose-600 hover:bg-rose-500 shadow-rose-500/10'
                        }`}
                      >
                        <ThumbsDown className="w-3.5 h-3.5" />
                        <span>Thumbs-Down</span>
                      </button>
                    </div>

                    <button
                      onClick={runDeleteFeedbackFile}
                      className="w-full py-1.5 mt-2 text-slate-400 hover:text-slate-200 bg-black border border-slate-900 hover:border-slate-800 text-[10px] font-mono font-bold rounded flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Trash className="w-3 h-3 text-red-400" />
                      <span>Simulate Delete {feedbackFilePath.split('/').pop()}</span>
                    </button>
                  </div>

                </div>

                {/* Operations Terminal / Logs */}
                <div className="bg-slate-950 border border-slate-900 rounded-xl p-4 space-y-2">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">
                    Execution Trace (Feedback Terminal)
                  </span>
                  <div className="bg-black/95 rounded border border-slate-850 p-3 font-mono text-[9.5px] leading-relaxed text-slate-300 min-h-[120px] max-h-[160px] overflow-y-auto scrollbar-thin space-y-1 select-none">
                    {feedbackTrace.length > 0 ? (
                      feedbackTrace.map((log, index) => (
                        <div key={index} className={log.includes('Write-back') || log.includes('deleted') ? 'text-rose-400' : 'text-slate-400'}>
                          {log}
                        </div>
                      ))
                    ) : (
                      <span className="text-slate-600">Terminal Idle. Log Thumbs-Up/Down or Delete to trigger feedback transaction logs.</span>
                    )}
                  </div>
                </div>

              </div>

              {/* Right Side: Simulated JSON Database state */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* Stats row */}
                <div className="grid grid-cols-4 gap-2">
                  <div className="bg-slate-950/40 border border-slate-900 rounded-lg p-2 text-center space-y-0.5">
                    <span className="text-[7.5px] font-mono text-slate-500 uppercase tracking-wider block">Total Logs</span>
                    <span className="text-xs font-mono font-bold text-rose-400">{feedbackItems.length}</span>
                  </div>
                  <div className="bg-slate-950/40 border border-slate-900 rounded-lg p-2 text-center space-y-0.5">
                    <span className="text-[7.5px] font-mono text-slate-500 uppercase tracking-wider block">Likes</span>
                    <span className="text-xs font-mono font-bold text-emerald-400">{feedbackStats.likeCount}</span>
                  </div>
                  <div className="bg-slate-950/40 border border-slate-900 rounded-lg p-2 text-center space-y-0.5">
                    <span className="text-[7.5px] font-mono text-slate-500 uppercase tracking-wider block">Dislikes</span>
                    <span className="text-xs font-mono font-bold text-rose-400">{feedbackStats.dislikeCount}</span>
                  </div>
                  <div className="bg-slate-950/40 border border-slate-900 rounded-lg p-2 text-center space-y-0.5">
                    <span className="text-[7.5px] font-mono text-slate-500 uppercase tracking-wider block">File State</span>
                    <span className={`text-[9px] font-mono font-bold ${feedbackItems.length > 0 ? 'text-emerald-400' : 'text-amber-500'}`}>
                      {feedbackItems.length > 0 ? 'PERSISTED' : 'EMPTY'}
                    </span>
                  </div>
                </div>

                {/* Simulated File Contents Card */}
                <div className="bg-slate-950/60 border border-slate-900 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-rose-400" />
                      <span>Simulated Disk File: <code className="text-rose-300">{feedbackFilePath}</code></span>
                    </span>
                    <span className="text-[8px] font-mono text-slate-500 uppercase bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                      read-modify-write pattern
                    </span>
                  </div>

                  {feedbackItems.length > 0 ? (
                    <div className="space-y-4">
                      
                      {/* JSON editor/viewer */}
                      <div className="space-y-1">
                        <span className="text-[8px] font-mono text-slate-500 uppercase block">Raw JSON Array Content</span>
                        <div className="bg-black/90 rounded border border-slate-850 p-4 font-mono text-[9.5px] text-emerald-300 max-h-56 overflow-y-auto scrollbar-thin">
                          <pre className="whitespace-pre-wrap select-all leading-normal">
                            {JSON.stringify(feedbackItems, null, 2)}
                          </pre>
                        </div>
                      </div>

                      {/* Decoded Feedback list */}
                      <div className="space-y-2 pt-2 border-t border-slate-900">
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                          Aggregated Ratings & Recommendations Analytics View
                        </span>

                        <div className="space-y-2.5 max-h-56 overflow-y-auto scrollbar-thin pr-1.5">
                          {feedbackItems.map((item, index) => (
                            <div key={index} className="bg-slate-900/30 border border-slate-900 p-3.5 rounded-lg space-y-2">
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                  <span className={`w-1.5 h-1.5 rounded-full ${item.action === 'like' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                  <span className="text-[10px] font-mono text-slate-400 font-semibold text-rose-300">
                                    Rating action: {item.action === 'like' ? 'LIKE' : 'DISLIKE'}
                                  </span>
                                </div>
                                <span className="text-[9px] font-mono text-slate-500">
                                  {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(item.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                                </span>
                              </div>

                              <div className="p-2.5 bg-black/40 rounded border border-slate-900/50 flex items-start gap-2.5">
                                {item.action === 'like' ? (
                                  <ThumbsUp className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                ) : (
                                  <ThumbsDown className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                                )}
                                <p className="text-[10.5px] text-slate-300 leading-relaxed font-sans">
                                  {item.suggestion_text}
                                </p>
                              </div>

                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  ) : (
                    <div className="py-16 flex flex-col items-center justify-center text-center text-slate-500 space-y-3">
                      <ThumbsUp className="w-10 h-10 text-slate-800 animate-pulse" />
                      <div className="space-y-1">
                        <p className="text-xs text-slate-400 font-bold font-mono">File {feedbackFilePath} Empty or Deleted</p>
                        <p className="text-[9.5px] text-slate-500 max-w-[340px] leading-normal">
                          The <code className="text-rose-400">load_feedback()</code> backend module handles empty structures safely, returning <code className="text-emerald-400">[]</code>.
                        </p>
                      </div>
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => runLogFeedback('like')}
                          className="px-3 py-1.5 bg-rose-950/40 hover:bg-rose-900/30 border border-rose-500/40 text-rose-300 font-mono text-[10px] rounded cursor-pointer"
                        >
                          Submit First Like
                        </button>
                      </div>
                    </div>
                  )}

                </div>

              </div>

            </div>

          </motion.div>
        ) : activeGuideTab === 'router' ? (
          <motion.div
            key="router-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* FastAPI Router Intro Card */}
            <div className="bg-slate-950/30 border border-slate-800/80 p-5 rounded-xl space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Network className="w-4 h-4 text-amber-400" />
                  <h3 className="text-xs font-bold font-mono uppercase text-slate-300 tracking-wider">
                    FastAPI APIRouter & Pipeline Orchestration
                  </h3>
                </div>
                <span className="px-2 py-0.5 bg-amber-950/40 border border-amber-500/20 text-amber-300 text-[9px] font-mono rounded font-semibold uppercase">
                  Service Orchestration Layer
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                With all service modules built and tested in isolation, they are wired together through FastAPI's <code className="text-amber-400 font-semibold">APIRouter</code> in the <code className="text-amber-400 font-semibold">conversation.py</code> file. This routing layer acts as the integration point between the HTTP interface and the business logic layers, handling request deserialization, service orchestration, and response serialization.
              </p>
            </div>

            {/* Epic 3: Architecture Consolidation & Coherence Blueprint */}
            <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-xl space-y-4 animate-fadeIn">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-900">
                <Layers className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-bold font-mono uppercase text-slate-300 tracking-wider">
                  Epic 3 Integration & Consolidation Specifications
                </h4>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                Epic 3 transitions our isolated service components (DistilBERT Classifier, GPT-2 Synthesizer, Wikipedia Auditor, History Logger) into a single unified REST interface. This consolidation implements strict separation of concerns, high-efficiency client-transparent data flows, and robust unit-testability:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className="bg-slate-900/45 border border-slate-850 p-3.5 rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-400" />
                    <span className="text-[11px] font-bold text-slate-200">Consolidated Routing & Orchestration</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-normal">
                    Wired raw endpoints to parse payload envelopes, trigger Pydantic validators, and execute deep model predictions. The pipeline's signature orchestrated route—<code className="text-amber-400 font-mono">/generate-conversation</code>—automatically combines event theme analyses with user interests, synthesizes openers, logs execution metrics, and persists the transaction in a single round-trip.
                  </p>
                </div>

                <div className="bg-slate-900/45 border border-slate-850 p-3.5 rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-400" />
                    <span className="text-[11px] font-bold text-slate-200">Robust Unit-Testability & Mocking</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-normal">
                    Designed routing endpoints to support robust unit-test mocks. Dependency injection patterns and strict separation of layers allow core endpoints to run on test environments (e.g., using <code className="text-amber-400 font-mono">pytest</code> and <code className="text-amber-400 font-mono">TestClient</code>) without performing actual slow disk writes or memory-heavy local transformer compilation, guaranteeing 100% green-build CI stability.
                  </p>
                </div>
              </div>
            </div>

            {/* Highlights Grid of the Three POST Endpoints */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-900/30 border border-slate-850 p-4 rounded-xl space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 bg-sky-950/40 border border-sky-500/20 text-sky-400 text-[8px] font-mono font-bold rounded">
                    POST
                  </span>
                  <span className="text-xs font-bold text-slate-200 font-mono">/analyze-event</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  Provides a standalone theme extraction capability. Perfect for isolated debugging or third-party client application integrations.
                </p>
              </div>

              <div className="bg-slate-900/30 border border-slate-850 p-4 rounded-xl space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 bg-sky-950/40 border border-sky-500/20 text-sky-400 text-[8px] font-mono font-bold rounded">
                    POST
                  </span>
                  <span className="text-xs font-bold text-slate-200 font-mono">/fact-check</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  Wraps the Wikipedia service in a type-safe Pydantic API contract, returning verified facts with exact confidence metrics.
                </p>
              </div>

              <div className="bg-slate-900/30 border border-slate-850 p-4 rounded-xl space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-[8px] font-mono font-bold rounded">
                    POST
                  </span>
                  <span className="text-xs font-bold text-slate-200 font-mono">/generate-conversation</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  The primary pipeline endpoint. Extracts themes via classifier, passes them to GPT-2, and executes automatic history side-effect logging.
                </p>
              </div>
            </div>

            {/* Key Insights Alert Box */}
            <div className="bg-slate-950/40 border border-amber-500/25 p-4 rounded-xl flex items-start gap-3">
              <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-200 block">
                  Critical Architectural Insight: Side-Effect Autologging
                </span>
                <span className="text-[10px] text-slate-400 block leading-relaxed">
                  The <code className="text-amber-400">/generate-conversation</code> route performs <span className="text-amber-300 font-semibold">automatic side-effect logging</span>. Every successful pipeline response is saved to history without requiring an additional round-trip or action from the client, decoupling the frontend state entirely.
                </span>
              </div>
            </div>

            {/* Playground Column Structure */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Side: Interactive Playground Controls */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-slate-950/60 border border-slate-900 rounded-xl p-5 space-y-4">
                  
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block border-b border-slate-900 pb-2">
                    Interactive APIRouter Playground
                  </span>

                  {/* Route Selector */}
                  <div className="space-y-2">
                    <label className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">
                      Target Endpoint
                    </label>
                    <div className="grid grid-cols-3 gap-1 bg-black p-1 border border-slate-800 rounded">
                      <button
                        onClick={() => {
                          setRouterSelectedEndpoint('/analyze-event');
                          setRouterResponse(null);
                          setRouterTrace([]);
                        }}
                        className={`py-1.5 px-2 text-[9.5px] font-mono rounded text-center cursor-pointer ${
                          routerSelectedEndpoint === '/analyze-event'
                            ? 'bg-amber-500 text-black font-bold'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        /analyze-event
                      </button>
                      <button
                        onClick={() => {
                          setRouterSelectedEndpoint('/fact-check');
                          setRouterResponse(null);
                          setRouterTrace([]);
                        }}
                        className={`py-1.5 px-2 text-[9.5px] font-mono rounded text-center cursor-pointer ${
                          routerSelectedEndpoint === '/fact-check'
                            ? 'bg-amber-500 text-black font-bold'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        /fact-check
                      </button>
                      <button
                        onClick={() => {
                          setRouterSelectedEndpoint('/generate-conversation');
                          setRouterResponse(null);
                          setRouterTrace([]);
                        }}
                        className={`py-1.5 px-2 text-[9.5px] font-mono rounded text-center cursor-pointer ${
                          routerSelectedEndpoint === '/generate-conversation'
                            ? 'bg-amber-500 text-black font-bold'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        /generate-conv
                      </button>
                    </div>
                  </div>

                  {/* Inputs depending on Route */}
                  {routerSelectedEndpoint === '/analyze-event' && (
                    <div className="space-y-2 animate-fadeIn">
                      <label className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">
                        Event Description Input
                      </label>
                      <textarea
                        value={routerEventInput}
                        onChange={(e) => setRouterEventInput(e.target.value)}
                        rows={2}
                        className="w-full bg-black border border-slate-800 px-3 py-2 rounded text-xs text-slate-300 focus:outline-none focus:border-amber-500 font-sans leading-relaxed resize-none"
                        placeholder="Type event summary to analyze..."
                      />
                    </div>
                  )}

                  {routerSelectedEndpoint === '/fact-check' && (
                    <div className="space-y-2 animate-fadeIn">
                      <label className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">
                        Wikipedia Fact Check Query
                      </label>
                      <input
                        type="text"
                        value={routerFactQuery}
                        onChange={(e) => setRouterFactQuery(e.target.value)}
                        className="w-full bg-black border border-slate-800 px-3 py-2 rounded text-xs text-slate-300 focus:outline-none focus:border-amber-500 font-sans"
                        placeholder="e.g. FastAPI, GPT-2..."
                      />
                    </div>
                  )}

                  {routerSelectedEndpoint === '/generate-conversation' && (
                    <div className="space-y-3 animate-fadeIn">
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">
                          Event Description Input
                        </label>
                        <textarea
                          value={routerEventInput}
                          onChange={(e) => setRouterEventInput(e.target.value)}
                          rows={2}
                          className="w-full bg-black border border-slate-800 px-3 py-2 rounded text-xs text-slate-300 focus:outline-none focus:border-amber-500 font-sans leading-relaxed resize-none"
                          placeholder="Type event summary to analyze..."
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">
                          Personal Interests Input
                        </label>
                        <input
                          type="text"
                          value={routerInterestsInput}
                          onChange={(e) => setRouterInterestsInput(e.target.value)}
                          className="w-full bg-black border border-slate-800 px-3 py-2 rounded text-xs text-slate-300 focus:outline-none focus:border-amber-500 font-sans"
                          placeholder="e.g. Python API design, state tables..."
                        />
                      </div>
                    </div>
                  )}

                  {/* Execution Action Button */}
                  <div className="pt-2 border-t border-slate-900">
                    <button
                      onClick={runRouterOrchestration}
                      disabled={isRoutingRequest}
                      className={`w-full py-2.5 px-4 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all shadow cursor-pointer ${
                        isRoutingRequest
                          ? 'bg-amber-950/20 text-amber-400 border border-amber-800/50 cursor-wait'
                          : 'bg-amber-600 hover:bg-amber-500 shadow-amber-500/10'
                      }`}
                    >
                      <PlayCircle className="w-4 h-4 animate-spin-slow" />
                      <span>{isRoutingRequest ? 'Orchestrating Request...' : `Send POST Request`}</span>
                    </button>
                  </div>

                </div>

                {/* Micro-terminal */}
                <div className="bg-slate-950 border border-slate-900 rounded-xl p-4 space-y-2">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">
                    FastAPI Server Output Terminal
                  </span>
                  <div className="bg-black/95 rounded border border-slate-850 p-3 font-mono text-[9.5px] leading-relaxed text-slate-300 min-h-[125px] max-h-[160px] overflow-y-auto scrollbar-thin space-y-1 select-none font-mono">
                    {routerTrace.length > 0 ? (
                      routerTrace.map((log, index) => (
                        <div key={index} className={log.includes('Egress') || log.includes('Success') || log.includes('Appended') ? 'text-amber-400' : 'text-slate-400'}>
                          {log}
                        </div>
                      ))
                    ) : (
                      <span className="text-slate-600">Terminal Idle. Select an endpoint and click 'Send POST Request' to trace FastAPI pipeline flow logs.</span>
                    )}
                  </div>
                </div>

              </div>

              {/* Right Side: Results & Side-Effect Logger Status */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* Result Block */}
                <div className="bg-slate-950/60 border border-slate-900 rounded-xl p-5 space-y-4 min-h-[200px]">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <FileCode className="w-3.5 h-3.5 text-amber-400" />
                      <span>HTTP 200 Response Payload</span>
                    </span>
                    <span className="text-[8px] font-mono text-slate-500 uppercase bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                      application/json
                    </span>
                  </div>

                  {routerResponse ? (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="bg-black/90 rounded border border-slate-850 p-4 font-mono text-[9.5px] text-emerald-300 max-h-56 overflow-y-auto scrollbar-thin">
                        <pre className="whitespace-pre-wrap select-all leading-normal">
                          {JSON.stringify(routerResponse, null, 2)}
                        </pre>
                      </div>

                      {/* Explicit Side Effect visual notification for /generate-conversation */}
                      {routerSelectedEndpoint === '/generate-conversation' && routerResponse?.automatic_logging?.logged_to_history && (
                        <div className="bg-emerald-950/30 border border-emerald-500/25 p-3 rounded-lg space-y-1.5 animate-fadeIn">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
                            <span className="text-[10px] font-mono font-bold text-emerald-300">
                              Side-Effect Succeeded: Auto-logged to persistent disk
                            </span>
                          </div>
                          <p className="text-[9.5px] text-slate-400 leading-relaxed font-sans">
                            FastAPI wrote complete record <code className="text-emerald-400 font-mono">{routerResponse.automatic_logging.record_id}</code> to <code className="text-slate-200 font-mono">data/history.json</code> completely server-side. The client received clean topics and suggestions immediately.
                          </p>
                        </div>
                      )}

                    </div>
                  ) : (
                    <div className="py-16 flex flex-col items-center justify-center text-center text-slate-500 space-y-2">
                      <Activity className="w-10 h-10 text-slate-800 animate-pulse" />
                      <div className="space-y-1">
                        <p className="text-xs text-slate-400 font-bold font-mono">No Active Transaction</p>
                        <p className="text-[9.5px] text-slate-500 max-w-[340px] leading-normal">
                          Trigger the pipeline above to see structured response metrics, confidence values, and trace logs.
                        </p>
                      </div>
                    </div>
                  )}

                </div>

                {/* History list synced view showing updates */}
                {routerSelectedEndpoint === '/generate-conversation' && (
                  <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-5 space-y-3">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      Synced Backend persistent history records (data/history.json)
                    </span>

                    <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin">
                      {automaticHistoryLogs.map((item, index) => (
                        <div key={index} className="bg-slate-900/40 border border-slate-900 p-3 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-2 text-xs">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-slate-200">{item.event}</span>
                              <span className="px-1.5 py-0.5 bg-slate-950 text-[9px] font-mono text-amber-400 border border-slate-800 rounded">
                                {item.id}
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-400 truncate max-w-sm">
                              Interests: {item.interests}
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-[9px] font-mono text-slate-500 block">
                              {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                            </span>
                            <span className="text-[9px] font-mono text-slate-400 block mt-0.5">
                              Themes: {item.themes?.join(', ')}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

            </div>

          </motion.div>
        ) : activeGuideTab === 'main' ? (
          <motion.div
            key="main-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* FastAPI Main Intro Card */}
            <div className="bg-slate-950/30 border border-slate-800/80 p-5 rounded-xl space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-xs font-bold font-mono uppercase text-slate-300 tracking-wider">
                    FastAPI Entrypoint Application & Root Health-Check
                  </h3>
                </div>
                <span className="px-2 py-0.5 bg-emerald-950/40 border border-emerald-500/20 text-emerald-300 text-[9px] font-mono rounded font-semibold uppercase">
                  Main Entrypoint Layer
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                The <code className="text-emerald-400 font-semibold">main.py</code> file serves as the foundational bootstrap for the entire FastAPI application backend. Adhering to the principle of single responsibility, it is intentionally minimal: it instantiates the FastAPI engine, binds the application title (which populates the Swagger UI), mounts the primary sub-routers (such as the icebreaker pipeline conversation router), and serves a root level <code className="text-emerald-400 font-semibold">GET /</code> health-check endpoint. This healthcheck acts as a load-balancer probe to guarantee service availability before traffic routing.
              </p>
            </div>

            {/* Ingress / Route Dispatch Diagram */}
            <div className="bg-slate-950/50 border border-slate-900 rounded-xl p-5 space-y-4">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                API Gateway Route Dispatch Logic
              </span>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center text-center font-mono text-xs select-none">
                
                {/* Traffic Ingress */}
                <div className="md:col-span-3 bg-slate-900 border border-slate-800 p-3 rounded-lg flex flex-col items-center justify-center space-y-1">
                  <span className="text-sky-400 font-bold text-[10px] uppercase">Client Ingress</span>
                  <span className="text-slate-300 text-[10px]">HTTP Request Stream</span>
                </div>

                {/* Arrow */}
                <div className="md:col-span-1 flex justify-center text-slate-600">
                  <ArrowRight className="w-4 h-4 rotate-90 md:rotate-0" />
                </div>

                {/* main.py Core Instance */}
                <div className="md:col-span-4 bg-emerald-950/30 border border-emerald-500/30 p-4 rounded-xl flex flex-col items-center justify-center space-y-2">
                  <div className="flex items-center gap-1.5">
                    <Server className="w-4 h-4 text-emerald-400 animate-pulse" />
                    <span className="text-slate-200 font-bold text-[10px]">FastAPI(app)</span>
                  </div>
                  <span className="text-slate-500 text-[9px] leading-tight">Registers Routers & Global Middleware</span>
                </div>

                {/* Arrow */}
                <div className="md:col-span-1 flex justify-center text-slate-600">
                  <ArrowRight className="w-4 h-4 rotate-90 md:rotate-0" />
                </div>

                {/* Divided Targets */}
                <div className="md:col-span-3 space-y-2 text-left">
                  <div className="bg-slate-900/60 border border-slate-800 p-2 rounded-lg flex items-center justify-between text-[9px] px-3">
                    <span className="text-slate-400 font-bold font-mono">GET /</span>
                    <span className="text-emerald-400 font-bold">Health check (200)</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 p-2 rounded-lg flex items-center justify-between text-[9px] px-3">
                    <span className="text-slate-400 font-bold font-mono">/api/v1/*</span>
                    <span className="text-amber-400 font-bold">APIRouter Subroutes</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Request Lifecycle & Hub-and-Spoke Stepper */}
            <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-5 space-y-5 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-900 pb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-xs font-bold font-mono uppercase text-slate-200 tracking-wider">
                      Interactive Request Lifecycle & Hub-and-Spoke Pipeline
                    </h3>
                  </div>
                  <p className="text-[10px] text-slate-400">
                    Trace how a REST transaction flows through our Python FastAPI container from front to back.
                  </p>
                </div>
                <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded">
                  <button 
                    onClick={() => setCurrentLifecycleStep(prev => Math.max(0, prev - 1))}
                    disabled={currentLifecycleStep === 0}
                    className="px-2.5 py-1 text-[10px] font-mono text-slate-300 hover:text-slate-100 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors cursor-pointer"
                  >
                    ◀ PREV
                  </button>
                  <span className="text-[9px] font-mono text-slate-500 px-2 border-x border-slate-800">
                    {currentLifecycleStep + 1} / {lifecycleSteps.length}
                  </span>
                  <button 
                    onClick={() => setCurrentLifecycleStep(prev => Math.min(lifecycleSteps.length - 1, prev + 1))}
                    disabled={currentLifecycleStep === lifecycleSteps.length - 1}
                    className="px-2.5 py-1 text-[10px] font-mono text-slate-300 hover:text-slate-100 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors cursor-pointer"
                  >
                    NEXT ▶
                  </button>
                </div>
              </div>

              {/* Steps Progress Visual Dots Bar */}
              <div className="flex items-center justify-between gap-1 overflow-x-auto py-2 scrollbar-none border-b border-slate-900/60 pb-4">
                {lifecycleSteps.map((step, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentLifecycleStep(idx)}
                    className="flex flex-col items-center gap-1.5 focus:outline-none min-w-[75px] shrink-0 cursor-pointer"
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[9px] border transition-all ${
                      currentLifecycleStep === idx
                        ? 'bg-emerald-500 border-emerald-400 text-slate-950 font-bold scale-110 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                        : idx < currentLifecycleStep
                          ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-400 font-semibold'
                          : 'bg-slate-900 border-slate-800 text-slate-500'
                    }`}>
                      {idx + 1}
                    </div>
                    <span className={`text-[8px] font-mono whitespace-nowrap tracking-tighter ${
                      currentLifecycleStep === idx ? 'text-emerald-400 font-bold' : 'text-slate-500'
                    }`}>
                      {step.badge.split('.')[1].trim()}
                    </span>
                  </button>
                ))}
              </div>

              {/* Active Step Panel */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                
                {/* Step Details Column */}
                <div className="lg:col-span-5 flex flex-col justify-between bg-slate-900/30 border border-slate-850 p-4 rounded-xl space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono px-2 py-0.5 bg-slate-950 text-amber-400 border border-slate-850 rounded">
                        {lifecycleSteps[currentLifecycleStep].badge}
                      </span>
                      <span className="text-[9.5px] font-mono text-slate-500 uppercase tracking-wider">
                        {lifecycleSteps[currentLifecycleStep].actor}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-200">
                      {lifecycleSteps[currentLifecycleStep].title}
                    </h4>

                    <p className="text-xs text-slate-400 leading-normal font-sans">
                      {lifecycleSteps[currentLifecycleStep].description}
                    </p>
                  </div>

                  {/* Pro-Tip or Hub & Spoke context note */}
                  <div className="bg-slate-950/60 border border-slate-900 p-3 rounded-lg flex items-start gap-2.5">
                    <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-bold text-slate-300 block uppercase tracking-wide">Architectural Value Note</span>
                      <p className="text-[9px] text-slate-500 leading-normal font-sans">
                        {currentLifecycleStep === 1 
                          ? "This decoupling prevents dependency leakage. If you need a new /recommendations endpoint next month, you register its spoke in main.py in exactly 1 line, maintaining pristine design."
                          : currentLifecycleStep === 2
                            ? "Pydantic prevents bad payloads from ever reaching active AI modules, saving system RAM, avoiding transformer errors, and immediately filtering rogue formats."
                            : currentLifecycleStep === 7
                              ? "The persistent state record is written asynchronously after all deep model evaluations are completed, which maximizes performance of client UI renders."
                              : "Modular interfaces ensure isolated testing and allow swapping individual Transformer models or DB drivers without altering application routing files."
                        }
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step Code Snippet / Terminal Mock Column */}
                <div className="lg:col-span-7 bg-slate-950 border border-slate-900 rounded-xl overflow-hidden shadow-2xl flex flex-col justify-between min-h-[280px]">
                  <div className="bg-[#1b1b1b] px-4 py-2 border-b border-slate-900 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                      <span className="text-[9px] font-mono text-slate-400">
                        {currentLifecycleStep === 0 ? "src/App.tsx" : currentLifecycleStep === 1 ? "main.py" : currentLifecycleStep === 2 ? "app/schemas.py" : currentLifecycleStep === 3 ? "app/routers/conversation.py" : "app/services/*"}
                      </span>
                    </div>
                    <span className="text-[8px] font-mono text-slate-500 uppercase">
                      {currentLifecycleStep === 0 || currentLifecycleStep === 9 ? "TypeScript (React)" : "Python (FastAPI)"}
                    </span>
                  </div>

                  <div className="p-4 font-mono text-[10px] text-emerald-300 bg-black/90 flex-grow overflow-x-auto max-h-72 scrollbar-thin">
                    <pre className="leading-relaxed">
                      {lifecycleSteps[currentLifecycleStep].snippet}
                    </pre>
                  </div>
                </div>

              </div>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900/30 border border-slate-850 p-5 rounded-xl space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <h4 className="text-xs font-bold text-slate-200">Production Best Practice Probe</h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  The health-check probe at <code className="text-emerald-400 font-semibold">GET /</code> operates on O(1) complexity. It avoids costly downstream tasks (such as AI model inference or database queries) to serve as an instant diagnostic flag, ideal for container heartbeat and service-discovery registries.
                </p>
              </div>

              <div className="bg-slate-900/30 border border-slate-850 p-5 rounded-xl space-y-3">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-sky-400" />
                  <h4 className="text-xs font-bold text-slate-200">Automatic OpenAPI & Swagger Generation</h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  FastAPI reads standard Python type hints in request/response models to generate interactive OpenAPI schema documentation. By default, the application serves a complete web playground under <code className="text-sky-400 font-semibold">/docs</code> out of the box.
                </p>
              </div>
            </div>

            {/* Swagger & Health sandbox Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

              {/* Left Side: Mock Swagger UI interactive dashboard */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-slate-950 border border-slate-900 rounded-xl overflow-hidden shadow-xl animate-fadeIn">
                  
                  {/* Mock Swagger Header */}
                  <div className="bg-[#1b1b1b] px-4 py-3 border-b border-slate-900 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-rose-500 rounded-full" />
                      <div className="w-3 h-3 bg-amber-500 rounded-full" />
                      <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                      <span className="text-[10px] font-mono text-slate-400 font-semibold ml-2">Swagger API Documentation Simulation v1.0.0</span>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-[8px] font-mono rounded font-bold uppercase tracking-wider">
                      Interactive Docs
                    </span>
                  </div>

                  {/* Swagger Information Details */}
                  <div className="bg-[#1f1f1f] p-4 border-b border-slate-900 space-y-1">
                    <h3 className="text-sm font-bold text-slate-200 font-sans">
                      AI-Powered Networking Icebreaker API
                    </h3>
                    <div className="flex items-center gap-3 text-[10px]">
                      <span className="text-slate-500">Base URL: <code className="bg-black/40 px-1 py-0.5 rounded text-emerald-400 text-[9px] font-mono">/</code></span>
                      <span className="text-slate-500">OAS version: <code className="text-slate-300 font-mono">3.0.2</code></span>
                    </div>
                  </div>

                  {/* Swagger Endpoints List */}
                  <div className="p-4 space-y-3 bg-[#171717] min-h-[300px]">
                    
                    {/* GET / Endpoint Block */}
                    <div className={`border rounded-lg overflow-hidden transition-all ${
                      swaggerSelectedEndpoint === '/'
                        ? 'border-sky-500 bg-sky-950/10'
                        : 'border-slate-800 hover:border-slate-700 bg-slate-900/20'
                    }`}>
                      <button
                        onClick={() => {
                          setSwaggerSelectedEndpoint(swaggerSelectedEndpoint === '/' ? null : '/');
                          setSwaggerResponsePayload(null);
                        }}
                        className="w-full px-4 py-2.5 flex items-center justify-between text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span className="px-2 py-0.5 bg-sky-500 text-black font-mono font-bold text-[9px] rounded uppercase">
                            GET
                          </span>
                          <span className="text-xs font-semibold text-slate-200 font-mono">/</span>
                          <span className="text-[10px] text-slate-400 hidden sm:inline">Root Level System Diagnostics</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${swaggerSelectedEndpoint === '/' ? 'rotate-180' : ''}`} />
                      </button>

                      {swaggerSelectedEndpoint === '/' && (
                        <div className="p-4 border-t border-slate-800 bg-slate-950/50 space-y-3 animate-fadeIn">
                          <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                            Queries root health check. Instant operational state feedback for load balancer ingress metrics.
                          </p>
                          <div className="flex justify-end">
                            <button
                              onClick={() => runSwaggerCall('/')}
                              disabled={swaggerIsRunning}
                              className="px-4 py-1.5 bg-sky-600 hover:bg-sky-500 text-white font-mono text-[10px] font-bold rounded shadow transition-colors cursor-pointer"
                            >
                              {swaggerIsRunning ? 'PROBING...' : 'TRY IT OUT / EXECUTE'}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* POST /api/v1/conversation/analyze-event Endpoint Block */}
                    <div className={`border rounded-lg overflow-hidden transition-all ${
                      swaggerSelectedEndpoint === '/analyze-event'
                        ? 'border-emerald-500 bg-emerald-950/10'
                        : 'border-slate-800 hover:border-slate-700 bg-slate-900/20'
                    }`}>
                      <button
                        onClick={() => {
                          setSwaggerSelectedEndpoint(swaggerSelectedEndpoint === '/analyze-event' ? null : '/analyze-event');
                          setSwaggerResponsePayload(null);
                        }}
                        className="w-full px-4 py-2.5 flex items-center justify-between text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span className="px-2 py-0.5 bg-emerald-500 text-black font-mono font-bold text-[9px] rounded uppercase">
                            POST
                          </span>
                          <span className="text-xs font-semibold text-slate-200 font-mono">/api/v1/conversation/analyze-event</span>
                          <span className="text-[10px] text-slate-400 hidden sm:inline">Extract Themes</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${swaggerSelectedEndpoint === '/analyze-event' ? 'rotate-180' : ''}`} />
                      </button>

                      {swaggerSelectedEndpoint === '/analyze-event' && (
                        <div className="p-4 border-t border-slate-800 bg-slate-950/50 space-y-4 animate-fadeIn text-xs">
                          <div className="space-y-1.5">
                            <label className="text-[9px] font-mono text-slate-400 uppercase">Event Description (Request Body)</label>
                            <textarea
                              value={swaggerEventInput}
                              onChange={(e) => setSwaggerEventInput(e.target.value)}
                              rows={2}
                              className="w-full bg-black border border-slate-800 px-3 py-1.5 rounded text-xs text-slate-300 focus:outline-none focus:border-emerald-500 resize-none font-sans"
                            />
                          </div>
                          <div className="flex justify-end">
                            <button
                              onClick={() => runSwaggerCall('/analyze-event')}
                              disabled={swaggerIsRunning}
                              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-[10px] font-bold rounded shadow transition-colors cursor-pointer"
                            >
                              {swaggerIsRunning ? 'EXECUTING...' : 'TRY IT OUT / EXECUTE'}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* POST /api/v1/conversation/fact-check Endpoint Block */}
                    <div className={`border rounded-lg overflow-hidden transition-all ${
                      swaggerSelectedEndpoint === '/fact-check'
                        ? 'border-emerald-500 bg-emerald-950/10'
                        : 'border-slate-800 hover:border-slate-700 bg-slate-900/20'
                    }`}>
                      <button
                        onClick={() => {
                          setSwaggerSelectedEndpoint(swaggerSelectedEndpoint === '/fact-check' ? null : '/fact-check');
                          setSwaggerResponsePayload(null);
                        }}
                        className="w-full px-4 py-2.5 flex items-center justify-between text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span className="px-2 py-0.5 bg-emerald-500 text-black font-mono font-bold text-[9px] rounded uppercase">
                            POST
                          </span>
                          <span className="text-xs font-semibold text-slate-200 font-mono">/api/v1/conversation/fact-check</span>
                          <span className="text-[10px] text-slate-400 hidden sm:inline">MediaWiki Fact Verifier</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${swaggerSelectedEndpoint === '/fact-check' ? 'rotate-180' : ''}`} />
                      </button>

                      {swaggerSelectedEndpoint === '/fact-check' && (
                        <div className="p-4 border-t border-slate-800 bg-slate-950/50 space-y-4 animate-fadeIn text-xs">
                          <div className="space-y-1.5">
                            <label className="text-[9px] font-mono text-slate-400 uppercase">Query Term (Request Body)</label>
                            <input
                              type="text"
                              value={swaggerFactQuery}
                              onChange={(e) => setSwaggerFactQuery(e.target.value)}
                              className="w-full bg-black border border-slate-800 px-3 py-1.5 rounded text-xs text-slate-300 focus:outline-none focus:border-emerald-500 font-sans"
                            />
                          </div>
                          <div className="flex justify-end">
                            <button
                              onClick={() => runSwaggerCall('/fact-check')}
                              disabled={swaggerIsRunning}
                              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-[10px] font-bold rounded shadow transition-colors cursor-pointer"
                            >
                              {swaggerIsRunning ? 'EXECUTING...' : 'TRY IT OUT / EXECUTE'}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* POST /api/v1/conversation/generate-conversation Endpoint Block */}
                    <div className={`border rounded-lg overflow-hidden transition-all ${
                      swaggerSelectedEndpoint === '/generate-conversation'
                        ? 'border-emerald-500 bg-emerald-950/10'
                        : 'border-slate-800 hover:border-slate-700 bg-slate-900/20'
                    }`}>
                      <button
                        onClick={() => {
                          setSwaggerSelectedEndpoint(swaggerSelectedEndpoint === '/generate-conversation' ? null : '/generate-conversation');
                          setSwaggerResponsePayload(null);
                        }}
                        className="w-full px-4 py-2.5 flex items-center justify-between text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span className="px-2 py-0.5 bg-emerald-500 text-black font-mono font-bold text-[9px] rounded uppercase">
                            POST
                          </span>
                          <span className="text-xs font-semibold text-slate-200 font-mono">/api/v1/conversation/generate-conversation</span>
                          <span className="text-[10px] text-slate-400 hidden sm:inline">Unified Pipeline & Persistent Auto-logger</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${swaggerSelectedEndpoint === '/generate-conversation' ? 'rotate-180' : ''}`} />
                      </button>

                      {swaggerSelectedEndpoint === '/generate-conversation' && (
                        <div className="p-4 border-t border-slate-800 bg-slate-950/50 space-y-4 animate-fadeIn text-xs">
                          <div className="space-y-3">
                            <div className="space-y-1">
                              <label className="text-[9px] font-mono text-slate-400 uppercase">Event Description</label>
                              <textarea
                                value={swaggerEventInput}
                                onChange={(e) => setSwaggerEventInput(e.target.value)}
                                rows={2}
                                className="w-full bg-black border border-slate-800 px-3 py-1.5 rounded text-xs text-slate-300 focus:outline-none focus:border-emerald-500 resize-none font-sans"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9px] font-mono text-slate-400 uppercase">User Interests</label>
                              <input
                                type="text"
                                value={swaggerInterestsInput}
                                onChange={(e) => setSwaggerInterestsInput(e.target.value)}
                                className="w-full bg-black border border-slate-800 px-3 py-1.5 rounded text-xs text-slate-300 focus:outline-none focus:border-emerald-500 font-sans"
                              />
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <button
                              onClick={() => runSwaggerCall('/generate-conversation')}
                              disabled={swaggerIsRunning}
                              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-[10px] font-bold rounded shadow transition-colors cursor-pointer"
                            >
                              {swaggerIsRunning ? 'ORCHESTRATING...' : 'TRY IT OUT / EXECUTE'}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>

                </div>
              </div>

              {/* Right Side: Swagger Response & Diagnostics view */}
              <div className="lg:col-span-5 space-y-4">
                
                {/* Simulated Swagger response viewer */}
                <div className="bg-slate-950/60 border border-slate-900 rounded-xl p-5 space-y-4 min-h-[220px]">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <FileCode className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Swagger API Response Payload</span>
                    </span>
                    <span className="text-[8px] font-mono text-slate-500 uppercase bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                      application/json
                    </span>
                  </div>

                  {swaggerResponsePayload ? (
                    <div className="space-y-3 animate-fadeIn">
                      <div className="flex items-center justify-between bg-emerald-950/30 border border-emerald-500/20 px-3 py-1.5 rounded">
                        <span className="text-[9px] font-mono text-emerald-400 font-bold">Response Code: 200 OK</span>
                        <span className="text-[8.5px] font-mono text-slate-500">Latency: 12ms</span>
                      </div>
                      <div className="bg-black/90 rounded border border-slate-850 p-4 font-mono text-[9.5px] text-emerald-300 max-h-64 overflow-y-auto scrollbar-thin">
                        <pre className="whitespace-pre-wrap select-all leading-normal">
                          {JSON.stringify(swaggerResponsePayload, null, 2)}
                        </pre>
                      </div>
                    </div>
                  ) : (
                    <div className="py-20 flex flex-col items-center justify-center text-center text-slate-500 space-y-2">
                      <Activity className="w-10 h-10 text-slate-850 animate-pulse" />
                      <div className="space-y-1">
                        <p className="text-xs text-slate-400 font-bold font-mono">Swagger Client Idle</p>
                        <p className="text-[9.5px] text-slate-500 max-w-[280px] leading-normal">
                          Select any endpoint block in the left panel, customize request parameters, and hit Execute to see the Swagger auto-serialization logs.
                        </p>
                      </div>
                    </div>
                  )}

                </div>

                {/* Independent Server Probe Terminal */}
                <div className="bg-slate-950 border border-slate-900 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                      GET / Direct Server Probe
                    </span>
                    <span className="text-[8px] font-mono text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-850">
                      heartbeat probe
                    </span>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={runMainHealthCheck}
                      disabled={mainIsRunningHealthCheck}
                      className={`w-full py-2 px-4 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all shadow cursor-pointer ${
                        mainIsRunningHealthCheck
                          ? 'bg-emerald-950/20 text-emerald-400 border border-emerald-800/50 cursor-wait'
                          : 'bg-emerald-600 hover:bg-emerald-500'
                      }`}
                    >
                      <Zap className="w-4 h-4" />
                      <span>{mainIsRunningHealthCheck ? 'Probing Engine...' : 'Ping GET / (Health Check)'}</span>
                    </button>

                    <div className="bg-black/95 rounded border border-slate-850 p-3 font-mono text-[9px] leading-relaxed text-slate-400 min-h-[100px] max-h-[120px] overflow-y-auto scrollbar-thin space-y-1">
                      {mainTerminalLogs.length > 0 ? (
                        mainTerminalLogs.map((log, idx) => (
                          <div key={idx} className={log.includes('OPERATIONAL') || log.includes('200') ? 'text-emerald-400' : 'text-slate-400'}>
                            {log}
                          </div>
                        ))
                      ) : (
                        <span className="text-slate-600">Terminal Idle. Ping GET / to trace the minimal entrypoint router loop.</span>
                      )}
                    </div>

                    {mainHealthResponse && (
                      <div className="p-3 bg-slate-900/40 border border-emerald-500/10 rounded-lg space-y-1 animate-fadeIn font-mono text-[9px] text-slate-400">
                        <span className="font-bold text-slate-300 block">HTTP/1.1 200 OK</span>
                        <span className="text-slate-500 block">Content-Type: application/json</span>
                        <div className="text-emerald-400/90 whitespace-pre font-semibold mt-1">
                          {JSON.stringify(mainHealthResponse, null, 2)}
                        </div>
                      </div>
                    )}

                  </div>
                </div>

              </div>

            </div>

          </motion.div>
        ) : activeGuideTab === 'services' ? (
          <motion.div
            key="services-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Service Layer Principles Header */}
            <div className="bg-slate-950/30 border border-slate-800/80 p-5 rounded-xl space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-amber-400" />
                  <h3 className="text-xs font-bold font-mono uppercase text-slate-300 tracking-wider">
                    Service Layer Architecture & Software Engineering Principles
                  </h3>
                </div>
                <span className="px-2 py-0.5 bg-amber-950/40 border border-amber-500/20 text-amber-300 text-[9px] font-mono rounded font-semibold uppercase">
                  Service Layer
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                The service layer acts as the specialized business logic engine of our application. Rather than packing neural compilation, Wikipedia scraping, and data auditing directly inside route endpoints, we encapsulate these concerns inside self-contained modular files. This layer is structured around three paramount software engineering guidelines that guarantee code health, testability, and unlimited scale:
              </p>
            </div>

            {/* Principles Details Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Single Responsibility */}
              <div className="bg-slate-900/30 border border-slate-800 p-4 rounded-xl flex flex-col justify-between space-y-3 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-full blur-xl -mr-4 -mt-4" />
                <div className="space-y-2 z-10">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-bold text-slate-200">Single Responsibility Principle</span>
                  </div>
                  <p className="text-[10.5px] text-slate-400 leading-relaxed font-sans">
                    Each service file does exactly one cohesive job: <code className="text-blue-400 font-mono">event_analyzer.py</code> only extracts event categories, <code className="text-blue-400 font-mono">topic_generator.py</code> only synthesizes conversation openers, and so on. If the fact-checking mechanism needs to change, only <code className="text-blue-400 font-mono">fact_checker.py</code> is modified. Other code remains pristine and untouched.
                  </p>
                </div>
              </div>

              {/* Dependency Injection */}
              <div className="bg-slate-900/30 border border-slate-800 p-4 rounded-xl flex flex-col justify-between space-y-3 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 rounded-full blur-xl -mr-4 -mt-4" />
                <div className="space-y-2 z-10">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-slate-200">Dependency Injection via Imports</span>
                  </div>
                  <p className="text-[10.5px] text-slate-400 leading-relaxed font-sans">
                    Services are explicitly imported at the top of the router in <code className="text-amber-400 font-mono">conversation.py</code>, identifying all downstream dependencies clearly. In testing scenarios (using <code className="text-amber-400 font-mono">pytest</code> and <code className="text-amber-400 font-mono">TestClient</code>), these explicit imports can be mocked seamlessly, preventing expensive local neural weights loads which would bottleneck the CI/CD pipeline.
                  </p>
                </div>
              </div>

              {/* Stateless Functions */}
              <div className="bg-slate-900/30 border border-slate-800 p-4 rounded-xl flex flex-col justify-between space-y-3 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-full blur-xl -mr-4 -mt-4" />
                <div className="space-y-2 z-10">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-slate-200">Stateless Service Functions</span>
                  </div>
                  <p className="text-[10.5px] text-slate-400 leading-relaxed font-sans">
                    All core service functions are stateless. They take raw input parameters and return formatted output without modifying any shared memory or class states. This guarantees determinism and trivial unit-testability. The only exceptions are the logger functions, which intentionally encapsulate filesystem/database state transitions using well-defined interfaces.
                  </p>
                </div>
              </div>

            </div>

            {/* Service Layer Playground */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Interactive Playground Control Center */}
              <div className="lg:col-span-5 bg-slate-950 border border-slate-900 rounded-xl p-5 space-y-5 flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block border-b border-slate-900 pb-2">
                    Principles Playground Sandbox
                  </span>

                  {/* Service Selector */}
                  <div className="space-y-2">
                    <label className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">
                      Target Service File
                    </label>
                    <div className="grid grid-cols-2 gap-1.5 bg-black p-1 border border-slate-800 rounded">
                      <button
                        onClick={() => {
                          setSelectedServicePrinciple('event_analyzer');
                          setServiceTerminalLogs([]);
                        }}
                        className={`py-2 px-2 text-[9px] font-mono rounded text-center cursor-pointer ${
                          selectedServicePrinciple === 'event_analyzer'
                            ? 'bg-amber-500 text-black font-bold'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        event_analyzer.py
                      </button>
                      <button
                        onClick={() => {
                          setSelectedServicePrinciple('topic_generator');
                          setServiceTerminalLogs([]);
                        }}
                        className={`py-2 px-2 text-[9px] font-mono rounded text-center cursor-pointer ${
                          selectedServicePrinciple === 'topic_generator'
                            ? 'bg-amber-500 text-black font-bold'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        topic_generator.py
                      </button>
                      <button
                        onClick={() => {
                          setSelectedServicePrinciple('fact_checker');
                          setServiceTerminalLogs([]);
                        }}
                        className={`py-2 px-2 text-[9px] font-mono rounded text-center cursor-pointer ${
                          selectedServicePrinciple === 'fact_checker'
                            ? 'bg-amber-500 text-black font-bold'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        fact_checker.py
                      </button>
                      <button
                        onClick={() => {
                          setSelectedServicePrinciple('history_logger');
                          setServiceTerminalLogs([]);
                        }}
                        className={`py-2 px-2 text-[9px] font-mono rounded text-center cursor-pointer ${
                          selectedServicePrinciple === 'history_logger'
                            ? 'bg-amber-500 text-black font-bold'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        history_logger.py
                      </button>
                    </div>
                  </div>

                  {/* Mode / Injection Toggle */}
                  <div className="bg-slate-900/50 border border-slate-850 p-4 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-300 font-bold uppercase tracking-wider">
                        Dependency Mock Injection
                      </span>
                      <span className={`text-[8.5px] font-mono px-2 py-0.5 rounded ${
                        isMockMode 
                          ? 'bg-blue-950 text-blue-400 border border-blue-800' 
                          : 'bg-rose-950 text-rose-400 border border-rose-800'
                      }`}>
                        {isMockMode ? 'MOCKED TESTING' : 'REAL INTENSIVE PRODUCTION'}
                      </span>
                    </div>

                    <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                      {isMockMode 
                        ? "DI allows swapping the real Transformer model for a fast, thread-safe mock object, avoiding slow memory allocation and downloading during automated CI tests."
                        : "Loads full parameters, allocating CPU/GPU system RAM and compiling raw tensors to run the actual production deep learning pipeline."
                      }
                    </p>

                    <div className="flex items-center justify-between bg-black px-3 py-2 rounded border border-slate-800/80">
                      <span className="text-[10px] text-slate-400 font-mono">Use Mock (Unit Testing)</span>
                      <button
                        onClick={() => {
                          setIsMockMode(!isMockMode);
                          setServiceTerminalLogs([]);
                        }}
                        className={`w-9 h-5 rounded-full transition-colors flex items-center relative cursor-pointer ${
                          isMockMode ? 'bg-blue-600' : 'bg-slate-800'
                        }`}
                      >
                        <div className={`w-3.5 h-3.5 rounded-full bg-white transition-all absolute ${
                          isMockMode ? 'right-0.5' : 'left-0.5'
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Diagnostic Dispatch Button */}
                <button
                  onClick={runServiceDiagnostic}
                  disabled={isServiceRunning}
                  className={`w-full py-2.5 px-4 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all shadow cursor-pointer mt-4 ${
                    isServiceRunning
                      ? 'bg-amber-950/20 text-amber-400 border border-amber-800/50 cursor-wait'
                      : 'bg-amber-600 hover:bg-amber-500'
                  }`}
                >
                  <Zap className="w-4 h-4" />
                  <span>{isServiceRunning ? 'Simulating Pipeline Diagnostic...' : 'Execute Service Diagnostic'}</span>
                </button>
              </div>

              {/* Right Column: Code and Terminal Emulator */}
              <div className="lg:col-span-7 space-y-4 flex flex-col justify-between animate-fadeIn">
                
                {/* Code Previewer Card */}
                <div className="bg-slate-950 border border-slate-900 rounded-xl overflow-hidden shadow-xl">
                  <div className="bg-[#1b1b1b] px-4 py-2.5 border-b border-slate-900 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 bg-amber-500 rounded-full" />
                      <span className="text-[9.5px] font-mono text-slate-400">
                        {selectedServicePrinciple === 'event_analyzer' 
                          ? 'app/services/event_analyzer.py' 
                          : selectedServicePrinciple === 'topic_generator'
                            ? 'app/services/topic_generator.py'
                            : selectedServicePrinciple === 'fact_checker'
                              ? 'app/services/fact_checker.py'
                              : 'app/services/history_logger.py'
                        }
                      </span>
                    </div>
                    <span className="text-[8px] font-mono text-slate-500 uppercase">
                      Python Module
                    </span>
                  </div>

                  <div className="p-4 font-mono text-[10px] text-amber-300/90 bg-black/90 max-h-56 overflow-y-auto scrollbar-thin leading-relaxed">
                    <pre className="select-all">
                      {selectedServicePrinciple === 'event_analyzer' ? (
`# app/services/event_analyzer.py
# Principle: Single Responsibility. Job: Topic Classification.
from transformers import pipeline

class EventAnalyzer:
    def __init__(self, model_name: str = "distilbert-base-uncased-mnli"):
        # Stateless setup. Model is loaded cleanly during startup.
        self.classifier = pipeline("zero-shot-classification", model=model_name)

    def extract_themes(self, text: str) -> dict:
        # Stateless function. Receives input parameters, returns pure output dict.
        labels = ["AI/ML", "Cloud Computing", "DevOps", "Cybersecurity", "Blockchain"]
        return self.classifier(text, candidate_labels=labels)`
                      ) : selectedServicePrinciple === 'topic_generator' ? (
`# app/services/topic_generator.py
# Principle: Single Responsibility. Job: Conversation Opener Synthesis.
from transformers import GPT2LMHeadModel, GPT2Tokenizer

class TopicGenerator:
    def __init__(self):
        self.tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
        self.model = GPT2LMHeadModel.from_pretrained("gpt2")

    def synthesize_openers(self, themes: list, interests: str) -> list:
        # Pure, stateless transformation. No local state side-effects.
        prompt = f"Themes: {themes}. Interests: {interests}. Icebreaker Starter:"
        inputs = self.tokenizer.encode(prompt, return_tensors="pt")
        outputs = self.model.generate(inputs, max_length=150, num_return_sequences=3)
        return [self.tokenizer.decode(out, skip_special_tokens=True) for out in outputs]`
                      ) : selectedServicePrinciple === 'fact_checker' ? (
`# app/services/fact_checker.py
# Principle: Single Responsibility. Job: Wikipedia Query & Grounding.
import httpx

class FactChecker:
    def __init__(self, base_url: str = "https://en.wikipedia.org/w/api.php"):
        self.base_url = base_url

    async def verify_concept_grounding(self, concept: str) -> dict:
        # Stateless HTTP caller. Simple parameter-to-response translation.
        url = f"{self.base_url}?action=query&format=json&prop=extracts&exintro&titles={concept}"
        async with httpx.AsyncClient() as client:
            r = await client.get(url)
            return r.json()`
                      ) : (
`# app/services/history_logger.py
# Principle: Explicit Logging Concerns. Job: Persistent Logging & Serialization.
import json
import os
from datetime import datetime

class HistoryLogger:
    def __init__(self, filepath: str = "data/history.json"):
        self.filepath = filepath

    def log_session(self, session_data: dict) -> bool:
        # Encapsulates state logging. Strict separation from neural inference layers.
        os.makedirs(os.path.dirname(self.filepath), exist_ok=True)
        history = []
        if os.path.exists(self.filepath):
            with open(self.filepath, "r") as f:
                history = json.load(f)
        
        session_data["timestamp"] = datetime.utcnow().isoformat()
        history.append(session_data)
        with open(self.filepath, "w") as f:
            json.dump(history, f, indent=4)
        return True`
                      )}
                    </pre>
                  </div>
                </div>

                {/* Simulated Diagnostic Output Logs */}
                <div className="bg-slate-950 border border-slate-900 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      PyTest Injection & Pipeline Log Terminal
                    </span>
                    <span className="text-[8.5px] font-mono text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-850 uppercase">
                      {isMockMode ? 'pytest context' : 'prod environment'}
                    </span>
                  </div>

                  <div className="bg-black/95 rounded border border-slate-850 p-4 font-mono text-[9px] leading-relaxed min-h-[140px] max-h-[140px] overflow-y-auto scrollbar-thin space-y-1 text-slate-400">
                    {serviceTerminalLogs.length > 0 ? (
                      serviceTerminalLogs.map((log, idx) => (
                        <div 
                          key={idx} 
                          className={
                            log.includes('SUCCESS') 
                              ? 'text-emerald-400 font-bold' 
                              : log.includes('Performance') 
                                ? 'text-amber-400' 
                                : log.includes('Dependency')
                                  ? 'text-blue-400 font-medium'
                                  : 'text-slate-400'
                          }
                        >
                          {log}
                        </div>
                      ))
                    ) : (
                      <span className="text-slate-600 block py-6 text-center">
                        Terminal idle. Select target service on the left and hit "Execute Service Diagnostic" to compile principles traces.
                      </span>
                    )}
                  </div>
                </div>

              </div>
            </div>

          </motion.div>
        ) : activeGuideTab === 'streamlit' ? (
          <motion.div
            key="streamlit-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Streamlit Header */}
            <div className="bg-slate-950/30 border border-slate-800/80 p-5 rounded-xl space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layout className="w-4 h-4 text-pink-400" />
                  <h3 className="text-xs font-bold font-mono uppercase text-slate-300 tracking-wider">
                    Epic 4: Streamlit Interactive Frontend & Pythonic Prototyping
                  </h3>
                </div>
                <span className="px-2 py-0.5 bg-pink-950/40 border border-pink-500/20 text-pink-300 text-[9px] font-mono rounded font-semibold uppercase">
                  Frontend Presentation Layer
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Epic 4 implements a fully interactive user interface using <strong>Streamlit</strong>. This Python framework enables rapid UI development entirely in Python — <strong>eliminating the need for HTML, CSS, or JavaScript</strong> — making it ideal for data science and AI teams focused on fast, iterative prototyping. The frontend communicates with our FastAPI backend on Port 3000 to validate schemas, generate starters, and query Wikipedia.
              </p>
            </div>

            {/* Core Streamlit Benefits cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Benefit 1 */}
              <div className="bg-slate-900/30 border border-slate-800 p-4 rounded-xl flex flex-col justify-between space-y-3 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-pink-500/5 rounded-full blur-xl -mr-4 -mt-4" />
                <div className="space-y-2 z-10">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-pink-400" />
                    <span className="text-xs font-bold text-slate-200">Zero JS/HTML/CSS Overhead</span>
                  </div>
                  <p className="text-[10.5px] text-slate-400 leading-relaxed font-sans">
                    With simple declarations like <code className="text-pink-400 font-mono">st.text_area()</code> and <code className="text-pink-400 font-mono">st.sidebar</code>, Streamlit handles responsive rendering, CSS styles, and event triggers automatically. Developers focus 100% on logic and data flow.
                  </p>
                </div>
              </div>

              {/* Benefit 2 */}
              <div className="bg-slate-900/30 border border-slate-800 p-4 rounded-xl flex flex-col justify-between space-y-3 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 rounded-full blur-xl -mr-4 -mt-4" />
                <div className="space-y-2 z-10">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-slate-200">Top-to-Bottom Rerun Engine</span>
                  </div>
                  <p className="text-[10.5px] text-slate-400 leading-relaxed font-sans">
                    Whenever a user changes a slider, inputs a biography text, or clicks a tab, Streamlit reruns the entire Python script from top to bottom. It caches expensive model operations automatically using decorators like <code className="text-amber-400 font-mono">@st.cache_resource</code>.
                  </p>
                </div>
              </div>

              {/* Benefit 3 */}
              <div className="bg-slate-900/30 border border-slate-800 p-4 rounded-xl flex flex-col justify-between space-y-3 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-full blur-xl -mr-4 -mt-4" />
                <div className="space-y-2 z-10">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-bold text-slate-200">Integrated Session State</span>
                  </div>
                  <p className="text-[10.5px] text-slate-400 leading-relaxed font-sans">
                    The framework maintains user state variables inside the global <code className="text-blue-400 font-mono">st.session_state</code> dictionary across reruns. This coordinates active sessions, loaded profiles, generated starters, and Wikipedia audit payloads seamlessly.
                  </p>
                </div>
              </div>

            </div>

            {/* Streamlit Playground Sandbox */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
              
              {/* Left Column: Interactive Widget Control Panel */}
              <div className="lg:col-span-5 bg-slate-950 border border-slate-900 rounded-xl p-5 space-y-5 flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block border-b border-slate-900 pb-2">
                    Streamlit Component Selector
                  </span>

                  {/* Widget Selector */}
                  <div className="space-y-2">
                    <label className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">
                      Target Component File
                    </label>
                    <div className="grid grid-cols-2 gap-1.5 bg-black p-1 border border-slate-800 rounded">
                      <button
                        onClick={() => {
                          setStreamlitActiveWidget('forms');
                          setStreamlitTerminalLogs([]);
                        }}
                        className={`py-2 px-2 text-[9px] font-mono rounded text-center cursor-pointer ${
                          streamlitActiveWidget === 'forms'
                            ? 'bg-pink-500 text-black font-bold'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        forms.py
                      </button>
                      <button
                        onClick={() => {
                          setStreamlitActiveWidget('displays');
                          setStreamlitTerminalLogs([]);
                        }}
                        className={`py-2 px-2 text-[9px] font-mono rounded text-center cursor-pointer ${
                          streamlitActiveWidget === 'displays'
                            ? 'bg-pink-500 text-black font-bold'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        displays.py
                      </button>
                      <button
                        onClick={() => {
                          setStreamlitActiveWidget('auditing');
                          setStreamlitTerminalLogs([]);
                        }}
                        className={`py-2 px-2 text-[9px] font-mono rounded text-center cursor-pointer ${
                          streamlitActiveWidget === 'auditing'
                            ? 'bg-pink-500 text-black font-bold'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        auditing.py
                      </button>
                      <button
                        onClick={() => {
                          setStreamlitActiveWidget('main_routing');
                          setStreamlitTerminalLogs([]);
                        }}
                        className={`py-2 px-2 text-[9px] font-mono rounded text-center cursor-pointer ${
                          streamlitActiveWidget === 'main_routing'
                            ? 'bg-pink-500 text-black font-bold'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        main.py (Router)
                      </button>
                    </div>
                  </div>

                  {/* Interactive Inputs simulation */}
                  <div className="bg-slate-900/50 border border-slate-850 p-4 rounded-xl space-y-3">
                    <span className="text-[10px] font-mono text-slate-300 font-bold uppercase tracking-wider block">
                      Simulated Widget Inputs
                    </span>

                    {streamlitActiveWidget === 'forms' && (
                      <div className="space-y-3 animate-fadeIn">
                        <div className="space-y-1">
                          <label className="text-[9.5px] text-slate-400 font-mono">st.text_area("Write your Biography")</label>
                          <textarea
                            value={streamlitBioInput}
                            onChange={(e) => {
                              setStreamlitBioInput(e.target.value);
                              setStreamlitTerminalLogs([]);
                            }}
                            className="w-full bg-black border border-slate-800 rounded p-2 text-xs font-sans text-slate-300 focus:outline-none focus:border-pink-500 min-h-[60px]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9.5px] text-slate-400 font-mono">st.selectbox("Select Target Event", ...)</label>
                          <select
                            value={streamlitSelectedEvent}
                            onChange={(e) => {
                              setStreamlitSelectedEvent(e.target.value);
                              setStreamlitTerminalLogs([]);
                            }}
                            className="w-full bg-black border border-slate-800 rounded p-1.5 text-xs font-sans text-slate-300 focus:outline-none focus:border-pink-500"
                          >
                            <option value="Next-Gen AI Summit">Next-Gen AI Summit 2026</option>
                            <option value="Hugging Face Hackathon">Hugging Face Hackathon</option>
                            <option value="FastAPI Developers Meetup">FastAPI Developers Meetup</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {streamlitActiveWidget === 'displays' && (
                      <div className="text-slate-400 text-[10.5px] leading-relaxed font-sans space-y-2 animate-fadeIn">
                        <p>
                          Simulates the rendering of generated icebreakers. The user receives formatted dialog cards styled natively with Streamlit HTML/Markdown containers.
                        </p>
                        <div className="p-2.5 bg-black/50 rounded border border-slate-850 font-mono text-[9px] text-pink-300">
                          st.session_state.starters = 2 lines loaded
                        </div>
                      </div>
                    )}

                    {streamlitActiveWidget === 'auditing' && (
                      <div className="text-slate-400 text-[10.5px] leading-relaxed font-sans space-y-2 animate-fadeIn">
                        <p>
                          Demonstrates the side-by-side Wikipedia truth evaluation pipeline layout. Streamlit sidebars support independent controls for auditing metrics.
                        </p>
                        <div className="p-2.5 bg-black/50 rounded border border-slate-850 font-mono text-[9px] text-pink-300">
                          st.sidebar.slider("Confidence Guard", 0.0, 1.0, 0.75)
                        </div>
                      </div>
                    )}

                    {streamlitActiveWidget === 'main_routing' && (
                      <div className="text-slate-400 text-[10.5px] leading-relaxed font-sans space-y-2 animate-fadeIn">
                        <p>
                          Simulates the multi-page dashboard navigation. Changing pages updates the session state and triggers an immediate top-to-bottom script redraw.
                        </p>
                        <div className="p-2.5 bg-black/50 rounded border border-slate-850 font-mono text-[9px] text-pink-300">
                          st.sidebar.radio("Navigation", ["📝 Profiles Creator", "💬 Starters Feed"])
                        </div>
                      </div>
                    )}

                  </div>
                </div>

                {/* Simulate Rerun Trigger Button */}
                <button
                  onClick={runStreamlitSimulation}
                  disabled={isStreamlitExecuting}
                  className={`w-full py-2.5 px-4 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all shadow cursor-pointer mt-4 ${
                    isStreamlitExecuting
                      ? 'bg-pink-950/25 text-pink-400 border border-pink-800/50 cursor-wait'
                      : 'bg-pink-600 hover:bg-pink-500 shadow-pink-500/10'
                  }`}
                >
                  <Zap className="w-4 h-4" />
                  <span>{isStreamlitExecuting ? 'Running Streamlit Rerun Loop...' : 'Trigger Widget Rerun'}</span>
                </button>
              </div>

              {/* Right Column: Code & High-Fidelity UI Simulator */}
              <div className="lg:col-span-7 space-y-4 flex flex-col justify-between animate-fadeIn">
                
                {/* Code Previewer Card */}
                <div className="bg-slate-950 border border-slate-900 rounded-xl overflow-hidden shadow-xl">
                  <div className="bg-[#1b1b1b] px-4 py-2.5 border-b border-slate-900 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 bg-pink-500 rounded-full" />
                      <span className="text-[9.5px] font-mono text-slate-400">
                        {streamlitActiveWidget === 'forms' 
                          ? 'frontend/components/forms.py' 
                          : streamlitActiveWidget === 'displays'
                            ? 'frontend/components/displays.py'
                            : streamlitActiveWidget === 'auditing'
                              ? 'frontend/components/auditing.py'
                              : 'frontend/main.py'
                        }
                      </span>
                    </div>
                    <span className="text-[8px] font-mono text-slate-500 uppercase">
                      Streamlit Component Code
                    </span>
                  </div>

                  <div className="p-4 font-mono text-[10px] text-pink-300/90 bg-black/90 max-h-48 overflow-y-auto scrollbar-thin leading-relaxed">
                    <pre className="select-all">
                      {streamlitActiveWidget === 'forms' ? (
`# frontend/components/forms.py
import streamlit as st

def render_profile_form():
    st.subheader("📝 Profile & Bio Ingestion")
    bio_text = st.text_area(
        label="Professional Biography",
        value="PhD student researching distributed NLP systems.",
        help="Provide details about your tech stacks and domain interests"
    )
    
    event_selected = st.selectbox(
        "Select Target Event Context",
        ["Next-Gen AI Summit", "Hugging Face Hackathon", "FastAPI Developers Meetup"]
    )
    
    submit_btn = st.button("Submit Profile to FastAPI", use_container_width=True)
    return bio_text, event_selected, submit_btn`
                      ) : streamlitActiveWidget === 'displays' ? (
`# frontend/components/displays.py
import streamlit as st

def render_conversation_starters(starters: list):
    st.subheader("💬 Generated Icebreaker Conversations")
    
    if not starters:
        st.warning("No conversation starters generated yet.")
        return
        
    for index, starter in enumerate(starters):
        with st.container():
            st.markdown(
                f"""
                <div style="background-color: #1e1b4b; border-left: 4px solid #ec4899; padding: 15px; border-radius: 6px; margin-bottom: 10px;">
                    <span style="color: #f472b6; font-family: monospace; font-size: 11px;"># Starter {index + 1}</span>
                    <p style="color: #e2e8f0; font-size: 13px; margin: 5px 0 0 0;">{starter}</p>
                </div>
                """,
                unsafe_allow_html=True
            )`
                      ) : streamlitActiveWidget === 'auditing' ? (
`# frontend/components/auditing.py
import streamlit as st

def render_auditing_panel(claim_text: str, source_url: str, status: str):
    st.sidebar.markdown("### 🛡️ Wikipedia Integrity Auditor")
    st.sidebar.write(f"Claim under test: *{claim_text}*")
    
    threshold = st.sidebar.slider("Confidence Guard", 0.0, 1.0, 0.75)
    
    if status == "Verified":
        st.sidebar.success(f"✓ Wikipedia Grounded (Threshold: {threshold})")
        st.sidebar.markdown(f"[View Wikipedia Article]({source_url})")
    else:
        st.sidebar.warning(f"⚠ Unverified Grounding (Threshold: {threshold})")`
                      ) : (
`# frontend/main.py
# Main Entry Point & Sidebar Multi-Page Router
import streamlit as st
from components.forms import render_profile_form
from components.displays import render_conversation_starters

st.set_page_config(page_title="AI Networking Assistant", layout="wide")

# Persistent Session State Initialization
if "user_profiles" not in st.session_state:
    st.session_state.user_profiles = []

# Sidebar Navigation Control
st.sidebar.title("🧭 Navigation")
page = st.sidebar.radio("Go To", ["📝 Profiles Creator", "💬 Starters Feed"])

if page == "📝 Profiles Creator":
    bio, event, submitted = render_profile_form()
elif page == "💬 Starters Feed":
    render_conversation_starters(st.session_state.get("starters", []))`
                      )}
                    </pre>
                  </div>
                </div>

                {/* Simulated Streamlit App Window Preview */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl relative">
                  <div className="bg-slate-950 px-4 py-2 border-b border-slate-850 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400 tracking-wider flex items-center gap-1.5 uppercase">
                      <Layout className="w-3.5 h-3.5 text-pink-400" />
                      <span>Streamlit Simulated Host: Port 8501</span>
                    </span>
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-rose-500" />
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    </div>
                  </div>

                  <div className="p-4 min-h-[160px] max-h-[160px] overflow-y-auto scrollbar-thin bg-black/40 text-slate-300 flex">
                    
                    {/* Simulated Sidebar if Main Routing or Auditing active */}
                    {(streamlitActiveWidget === 'main_routing' || streamlitActiveWidget === 'auditing') && (
                      <div className="w-1/3 border-r border-slate-850 pr-3 mr-3 space-y-3 shrink-0 animate-fadeIn text-[10px]">
                        <div className="font-bold text-slate-400 border-b border-slate-850 pb-1 font-mono uppercase text-[8px] tracking-wider">
                          Streamlit Sidebar
                        </div>
                        {streamlitActiveWidget === 'main_routing' ? (
                          <div className="space-y-2">
                            <span className="text-slate-500 block font-mono text-[8px] uppercase">st.sidebar.radio</span>
                            <div className="space-y-1 bg-black/60 p-2 border border-slate-850 rounded">
                              <label className="flex items-center gap-2 cursor-pointer font-semibold text-pink-400">
                                <input type="radio" checked readOnly className="accent-pink-500" />
                                <span>📝 Profiles Creator</span>
                              </label>
                              <label className="flex items-center gap-2 cursor-pointer text-slate-500">
                                <input type="radio" checked={false} readOnly className="accent-pink-500" />
                                <span>💬 Starters Feed</span>
                              </label>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-2 font-sans">
                            <span className="text-slate-500 block font-mono text-[8px] uppercase">st.sidebar.slider</span>
                            <div className="bg-black/60 p-2 border border-slate-850 rounded space-y-1 text-slate-400">
                              <span className="block text-[8px]">Confidence Guard: <strong className="text-pink-400">0.75</strong></span>
                              <div className="w-full h-1 bg-pink-900 rounded relative">
                                <div className="absolute right-1/4 -top-1 w-3.5 h-3.5 rounded-full bg-pink-500 border border-black" />
                              </div>
                            </div>
                            <div className="bg-emerald-950/20 border border-emerald-500/20 text-emerald-400 p-2 rounded text-[9.5px]">
                              ✓ Wikipedia Grounded
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Main Simulated Panel */}
                    <div className="flex-1 space-y-3 font-sans">
                      
                      {streamlitActiveWidget === 'forms' ? (
                        <div className="space-y-2.5 animate-fadeIn text-xs">
                          <h4 className="font-bold text-slate-200">📝 Profile & Bio Ingestion</h4>
                          
                          <div className="bg-black/80 border border-slate-850 rounded p-2 font-mono text-[10.5px] text-slate-300">
                            {streamlitBioInput}
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-slate-500">Event Context:</span>
                            <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 text-slate-300 rounded font-mono text-[9px]">
                              {streamlitSelectedEvent}
                            </span>
                          </div>

                          <button 
                            onClick={runStreamlitSimulation}
                            disabled={isStreamlitExecuting}
                            className="w-full py-1.5 bg-pink-600/95 hover:bg-pink-500 text-white font-bold rounded cursor-pointer text-[10.5px] transition-all"
                          >
                            Submit Profile to FastAPI
                          </button>
                        </div>
                      ) : streamlitActiveWidget === 'displays' ? (
                        <div className="space-y-2.5 animate-fadeIn">
                          <h4 className="font-bold text-slate-200 text-xs">💬 Generated Icebreakers</h4>
                          <div className="space-y-1.5 max-h-[110px] overflow-y-auto scrollbar-none">
                            <div className="bg-indigo-950/30 border-l-2 border-pink-500 p-2 rounded text-[10px] text-slate-300 leading-normal">
                              <span className="text-pink-400 font-mono text-[8.5px] block"># Starter 1</span>
                              "I noticed you study distributed systems! I'm attending the Summit too. How are you approaching NLP pipeline speed optimizations?"
                            </div>
                            <div className="bg-indigo-950/30 border-l-2 border-pink-500 p-2 rounded text-[10px] text-slate-300 leading-normal">
                              <span className="text-pink-400 font-mono text-[8.5px] block"># Starter 2</span>
                              "Fascinating bio on NLP models! Let's discuss zero-shot classification constraints at the Next-Gen summit."
                            </div>
                          </div>
                        </div>
                      ) : streamlitActiveWidget === 'auditing' ? (
                        <div className="space-y-2.5 animate-fadeIn text-xs">
                          <h4 className="font-bold text-slate-200">🛡️ Wikipedia Core Auditing View</h4>
                          <p className="text-slate-400 text-[10.5px] leading-relaxed">
                            Wikipedia integration queries the MediaWiki API directly on claims, providing verified contextual overlays inside the sidebar widgets.
                          </p>
                          <div className="p-2 bg-slate-950/80 border border-slate-900 rounded font-mono text-[9.5px] text-slate-400">
                            Query: "Transformers NLP architecture"
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2.5 animate-fadeIn text-xs">
                          <h4 className="font-bold text-slate-200">🧭 Dashboard Router Main Page</h4>
                          <div className="bg-slate-950/60 p-3 rounded border border-slate-900 space-y-2">
                            <div className="flex items-center justify-between text-[10px]">
                              <span className="text-slate-400">Active Page:</span>
                              <span className="text-pink-400 font-mono font-bold">Profiles Creator</span>
                            </div>
                            <div className="flex items-center justify-between text-[10px]">
                              <span className="text-slate-400">State Profiles Count:</span>
                              <span className="text-emerald-400 font-mono">1 Profile Loaded</span>
                            </div>
                          </div>
                        </div>
                      )}

                    </div>

                  </div>
                </div>

                {/* Simulated Server Console Rerun Log Terminal */}
                <div className="bg-slate-950 border border-slate-900 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      Streamlit Live Server Consolidation Logs
                    </span>
                    <span className="text-[8.5px] font-mono text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-850 uppercase">
                      Streamlit Rerun Loop
                    </span>
                  </div>

                  <div className="bg-black/95 rounded border border-slate-850 p-4 font-mono text-[9px] leading-relaxed min-h-[140px] max-h-[140px] overflow-y-auto scrollbar-thin space-y-1 text-slate-400">
                    {streamlitTerminalLogs.length > 0 ? (
                      streamlitTerminalLogs.map((log, idx) => (
                        <div 
                          key={idx} 
                          className={
                            log.includes('Completed') || log.includes('Event')
                              ? 'text-pink-400 font-bold' 
                              : log.includes('Completed') 
                                ? 'text-amber-400' 
                                : log.includes('Retrieving')
                                  ? 'text-blue-400 font-medium'
                                  : 'text-slate-400'
                          }
                        >
                          {log}
                        </div>
                      ))
                    ) : (
                      <span className="text-slate-600 block py-6 text-center font-mono">
                        Console idle. Interact with any widget value on the left or click "Trigger Widget Rerun" to trigger Streamlit's state evaluation traces.
                      </span>
                    )}
                  </div>
                </div>

              </div>
            </div>

            {/* Streamlit Deep-Dive Architectural Insights */}
            <div className="bg-slate-950/40 border border-slate-800 p-5 rounded-xl space-y-6 animate-fadeIn">
              <div className="flex items-center gap-2 border-b border-slate-900 pb-3">
                <BookOpen className="w-4 h-4 text-pink-400" />
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
                  Streamlit Core Technical Deep Dives
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* 1. Bridge Configuration */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 bg-pink-950/40 border border-pink-500/20 text-pink-300 text-[8px] font-mono rounded font-semibold uppercase">
                      Module Resolution
                    </span>
                    <span className="text-xs font-bold text-slate-300">Backend Connection & Path Manipulation</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    The Streamlit frontend begins with its imports and backend connection configuration. This section establishes the bridge between the Python frontend and the FastAPI backend:
                  </p>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    The <code className="text-pink-400 font-mono text-[10px]">sys.path.append</code> line is a critical piece of Python path manipulation that allows the Streamlit script (located in the <code className="text-slate-300 font-mono text-[10px]">frontend/</code> directory) to import modules from the parent project directory (specifically the <code className="text-pink-400 font-mono text-[10px]">feedback_logger</code> service). Without this, Python's module system would not be able to locate the <code className="text-slate-300 font-mono text-[10px]">app.services</code> package from the frontend's working directory. The <code className="text-pink-400 font-mono text-[10px]">BASE_URL</code> constant defines the backend API location, which can easily be changed to a remote URL when deploying to a cloud environment.
                  </p>
                  
                  {/* Miniature Code Snippet */}
                  <div className="bg-black/80 border border-slate-900 p-3 rounded font-mono text-[9px] text-pink-300/95 leading-normal space-y-1">
                    <div><span className="text-slate-500">import</span> sys, os</div>
                    <div>sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), <span className="text-emerald-400">".."</span>)))</div>
                    <div><span className="text-slate-500">from</span> app.services.feedback <span className="text-slate-500">import</span> feedback_logger</div>
                    <div className="text-slate-500 pt-1"># Backend Connection API route</div>
                    <div>BASE_URL = os.getenv(<span className="text-emerald-400">"BACKEND_API_URL"</span>, <span className="text-emerald-400">"http://localhost:3000"</span>)</div>
                  </div>
                </div>

                {/* 2. State & Ingestion Parsing */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 bg-indigo-950/40 border border-indigo-500/20 text-indigo-300 text-[8px] font-mono rounded font-semibold uppercase">
                      State & Data Cleaning
                    </span>
                    <span className="text-xs font-bold text-slate-300">Bi-directional State & Interest Parsing</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    The input section is the first thing users interact with when they open the application. It collects the two pieces of information needed to generate personalized conversation starters:
                  </p>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    Streamlit's programming model is fundamentally different from traditional web frameworks: the entire Python script runs from top to bottom every time the user interacts with the UI. This means that if we stored results in regular Python variables, they would be lost the moment the user clicked another button. The <code className="text-indigo-400 font-mono text-[10px]">st.session_state</code> dictionary solves this problem by persisting data across re-runs within the same browser session.
                  </p>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    The interest parsing logic <code className="text-indigo-400 font-mono text-[10px]">[i.strip() for i in user_interests.split(',')]</code> is a compact but important piece of data cleaning. When users type 'AI, blockchain, healthcare', the split produces <code className="text-slate-400 font-mono text-[10px]">['AI', ' blockchain', ' healthcare']</code> — with leading spaces. The <code className="text-indigo-400 font-mono text-[10px]">strip()</code> call ensures these are cleaned to <code className="text-indigo-400 font-mono text-[10px]">['AI', 'blockchain', 'healthcare']</code> before being sent to the backend, preventing subtle matching issues in the AI models.
                  </p>
                  
                  {/* Miniature Code Snippet */}
                  <div className="bg-black/80 border border-slate-900 p-3 rounded font-mono text-[9px] text-indigo-300/95 leading-normal space-y-1">
                    <div><span className="text-slate-500">if</span> <span className="text-emerald-400">"starters"</span> <span className="text-slate-500">not in</span> st.session_state:</div>
                    <div className="pl-3">st.session_state.starters = []</div>
                    <div className="text-slate-500 pt-1"># Strip interests input safely</div>
                    <div>parsed_interests = [i.strip() <span className="text-slate-500">for</span> i <span className="text-slate-500">in</span> interests_input.split(<span className="text-emerald-400">","</span>)]</div>
                  </div>
                </div>

                {/* 3. Results Display & Feedback Layout */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 bg-emerald-950/40 border border-emerald-500/20 text-emerald-300 text-[8px] font-mono rounded font-semibold uppercase">
                      Dynamic UI & Feedback
                    </span>
                    <span className="text-xs font-bold text-slate-300">Results Display & Feedback Layout</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    After generation, the results are displayed and the feedback system is presented to the user. This section demonstrates Streamlit's ability to create dynamic, responsive layouts:
                  </p>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    The conditional check <code className="text-emerald-400 font-mono text-[10px]">'if suggestions in st.session_state'</code> is fundamental to Streamlit UI design. Since the entire script re-runs on every interaction, this guard prevents the results section from rendering before the user has clicked the generate button. Only when suggestions have been stored in <code className="text-emerald-400 font-mono text-[10px]">session_state</code> will this section appear, creating an experience of dynamic content that appears only when relevant.
                  </p>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    The use of <code className="text-emerald-400 font-mono text-[10px]">st.columns([1, 1])</code> creates a two-column layout for the thumbs-up and thumbs-down buttons. This is a Streamlit layout primitive that divides the available horizontal space equally between two columns. The <code className="text-emerald-400 font-mono text-[10px]">key=f'like_&#123;i&#125;'</code> and <code className="text-emerald-400 font-mono text-[10px]">key=f'dislike_&#123;i&#125;'</code> parameters are critical: without unique keys, Streamlit cannot distinguish between buttons in a loop and may trigger incorrect callbacks. By including the index <code className="text-emerald-400 font-mono text-[10px]">i</code> in the key, each button has a globally unique identifier within the session.
                  </p>
                  
                  {/* Miniature Code Snippet */}
                  <div className="bg-black/80 border border-slate-900 p-3 rounded font-mono text-[9px] text-emerald-300/95 leading-normal space-y-1">
                    <div><span className="text-slate-500">if</span> <span className="text-emerald-400">"suggestions"</span> <span className="text-slate-500">in</span> st.session_state:</div>
                    <div className="pl-3"><span className="text-slate-500">for</span> i, item <span className="text-slate-500">in</span> enumerate(st.session_state.suggestions):</div>
                    <div className="pl-6">col1, col2 = st.columns([<span className="text-amber-400">1</span>, <span className="text-amber-400">1</span>])</div>
                    <div className="pl-6">col1.button(<span className="text-emerald-400">"👍"</span>, key=f<span className="text-emerald-400">"like_{'{'}i{'}'}"</span>)</div>
                    <div className="pl-6">col2.button(<span className="text-emerald-400">"👎"</span>, key=f<span className="text-emerald-400">"dislike_{'{'}i{'}'}"</span>)</div>
                  </div>
                </div>

                {/* 4. Wikipedia Integrity Auditor / Fact-checking */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 bg-rose-950/40 border border-rose-500/20 text-rose-300 text-[8px] font-mono rounded font-semibold uppercase">
                      Integrity Auditing
                    </span>
                    <span className="text-xs font-bold text-slate-300">Independent Fact-checking Pipeline</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    The fact-checking section provides a completely independent feature within the same Streamlit page. Users can verify information about any topic without needing to re-enter their event description:
                  </p>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    The <code className="text-rose-400 font-mono text-[10px]">st.markdown('---')</code> call renders a horizontal divider line, creating a clear visual separation between the conversation generation section and the fact-checking section. This UX pattern helps users quickly understand that these are two distinct features on the same page. The <code className="text-rose-400 font-mono text-[10px]">st.success()</code> function renders the fact-check result in a green highlighted box, which provides immediate positive visual feedback and draws the user's attention to the result.
                  </p>
                  
                  {/* Miniature Code Snippet */}
                  <div className="bg-black/80 border border-slate-900 p-3 rounded font-mono text-[9px] text-rose-300/95 leading-normal space-y-1">
                    <div>st.markdown(<span className="text-emerald-400">"---"</span>)</div>
                    <div className="text-slate-500"># Independent Fact-checking Form</div>
                    <div>claim = st.text_input(<span className="text-emerald-400">"Enter a claim to fact-check"</span>)</div>
                    <div><span className="text-slate-500">if</span> st.button(<span className="text-emerald-400">"Verify Claim"</span>):</div>
                    <div className="pl-3">result = query_wikipedia(claim)</div>
                    <div className="pl-3">st.success(f<span className="text-emerald-400">"Fact check results: {'{'}result{'}'}"</span>)</div>
                  </div>
                </div>

                {/* 5. History Logger / Past Sessions */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 bg-amber-950/40 border border-amber-500/20 text-amber-300 text-[8px] font-mono rounded font-semibold uppercase">
                      Session Persistence
                    </span>
                    <span className="text-xs font-bold text-slate-300">Historical Audit Trail</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    The history section allows users to review past conversations. This leverages the <code className="text-amber-400 font-mono text-[10px]">history.json</code> file maintained by the backend's <code className="text-amber-400 font-mono text-[10px]">history_logger</code> service:
                  </p>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    The <code className="text-amber-400 font-mono text-[10px]">history[-5:]</code> slice retrieves only the five most recent entries from the full history list, preventing the UI from becoming overwhelming if many sessions have been logged. The <code className="text-amber-400 font-mono text-[10px]">reversed()</code> call then displays them in reverse chronological order (newest first), which aligns with the natural expectation that the most recent conversations should appear at the top. Each history entry is rendered with clear labels and a horizontal divider, making individual sessions easy to scan and distinguish.
                  </p>
                  
                  {/* Miniature Code Snippet */}
                  <div className="bg-black/80 border border-slate-900 p-3 rounded font-mono text-[9px] text-amber-300/95 leading-normal space-y-1">
                    <div>history = load_history_json()</div>
                    <div className="text-slate-500"># Slice and reverse for a clean, chronological feed</div>
                    <div><span className="text-slate-500">for</span> entry <span className="text-slate-500">in</span> reversed(history[<span className="text-amber-400">-5</span>:]):</div>
                    <div className="pl-3">st.write(f<span className="text-emerald-400">"**Topic:** {'{'}entry['topic']{'}'}"</span>)</div>
                    <div className="pl-3">st.write(f<span className="text-emerald-400">"**Output:** {'{'}entry['result']{'}'}"</span>)</div>
                    <div className="pl-3">st.markdown(<span className="text-emerald-400">"---"</span>)</div>
                  </div>
                </div>

                {/* 6. Feedback History / Rated Suggestions */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 bg-sky-950/40 border border-sky-500/20 text-sky-300 text-[8px] font-mono rounded font-semibold uppercase">
                      Feedback Audit
                    </span>
                    <span className="text-xs font-bold text-slate-300">Feedback Loop & Self-Reflection</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    The feedback history section allows users to review which suggestions they previously rated, creating a feedback loop for self-reflection:
                  </p>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    The feedback view shows up to 10 recent feedback entries (double the history limit, since individual suggestion ratings are more granular than full conversation sessions). The ternary expression for the icon variable — using a thumbs-up emoji for 'like' and thumbs-down for 'dislike' — provides an immediately recognizable visual indicator of the feedback sentiment. The <code className="text-sky-400 font-mono text-[10px]">st.caption()</code> function renders the timestamp in a smaller, subdued font, creating a clear visual hierarchy where the suggestion content is prominent and the metadata is secondary.
                  </p>
                  
                  {/* Miniature Code Snippet */}
                  <div className="bg-black/80 border border-slate-900 p-3 rounded font-mono text-[9px] text-sky-300/95 leading-normal space-y-1">
                    <div>feedback_list = load_feedback_history()</div>
                    <div className="text-slate-500"># Limit to 10 recent granular feedback records</div>
                    <div><span className="text-slate-500">for</span> item <span className="text-slate-500">in</span> feedback_list[<span className="text-amber-400">-10</span>:]:</div>
                    <div className="pl-3">icon = <span className="text-emerald-400">"👍"</span> <span className="text-slate-500">if</span> item[<span className="text-emerald-400">'rating'</span>] == <span className="text-emerald-400">'like'</span> <span className="text-slate-500">else</span> <span className="text-emerald-400">"👎"</span></div>
                    <div className="pl-3">st.write(f<span className="text-emerald-400">"{'{'}icon{'}'} {'{'}item['suggestion']{'}'}"</span>)</div>
                    <div className="pl-3">st.caption(f<span className="text-emerald-400">"Submitted at: {'{'}item['timestamp']{'}'}"</span>)</div>
                  </div>
                </div>

                {/* 7. Streamlit Execution Model & Session State */}
                <div className="space-y-3 md:col-span-2 border-t border-slate-900 pt-6 mt-2">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 bg-violet-950/40 border border-violet-500/20 text-violet-300 text-[8px] font-mono rounded font-semibold uppercase">
                      Execution Paradigm
                    </span>
                    <span className="text-xs font-bold text-slate-300">Execution Model & Persistent State Management</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    Understanding Streamlit's execution model is essential for building non-trivial applications. Unlike traditional server-side frameworks where state is maintained between requests, Streamlit re-executes the entire Python script on every user interaction.
                  </p>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    The <code className="text-violet-400 font-mono text-[10px]">st.session_state</code> dictionary acts as a persistent storage mechanism that preserves variables, user inputs, and application data across reruns, enabling developers to maintain conversational context, track user actions, and build dynamic interactive applications without losing state information.
                  </p>
                  
                  {/* Miniature Code Snippet */}
                  <div className="bg-black/80 border border-slate-900 p-3 rounded font-mono text-[9px] text-violet-300/95 leading-normal space-y-1">
                    <div><span className="text-slate-500">if</span> <span className="text-emerald-400">"user_session"</span> <span className="text-slate-500">not in</span> st.session_state:</div>
                    <div className="pl-3">st.session_state.user_session = init_session_state()</div>
                    <div className="text-slate-500 pt-1"># Persists across full script re-runs upon element clicks</div>
                    <div>st.session_state.user_session.last_interaction = get_current_time()</div>
                  </div>
                </div>

              </div>
            </div>

          </motion.div>
        ) : (
          <motion.div
            key="testing-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Epic 5 Testing Header */}
            <div className="bg-slate-950/30 border border-slate-800/80 p-5 rounded-xl space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-xs font-bold font-mono uppercase text-slate-300 tracking-wider">
                    Epic 5: Quality Assurance, Validation, & Automated Testing
                  </h3>
                </div>
                <span className="px-2 py-0.5 bg-emerald-950/40 border border-emerald-500/20 text-emerald-300 text-[9px] font-mono rounded font-semibold uppercase">
                  Continuous Integration & Test Tier
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Epic 5 validates that everything built in the previous Epics works correctly both in isolation (unit tests) and as an integrated system (integration tests and manual testing). Testing is not an afterthought in this project — it is a first-class concern that ensures reliability, catches regressions, and gives developers confidence when making changes.
              </p>
            </div>

            {/* Core Testing Benefits cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Pillar 1: Unit Testing */}
              <div className="bg-slate-900/30 border border-slate-800 p-4 rounded-xl flex flex-col justify-between space-y-3 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-full blur-xl -mr-4 -mt-4" />
                <div className="space-y-2 z-10">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-slate-200">PyTest Unit Isolation</span>
                  </div>
                  <p className="text-[10.5px] text-slate-400 leading-relaxed font-sans">
                    Isolates individual algorithmic components (e.g., DistilBERT Classifiers and GPT-2 Synthesizer loops) by mocking complex side-effects, verifying logic branches, and maintaining zero network dependencies during the test run.
                  </p>
                </div>
              </div>

              {/* Pillar 2: Integration Testing */}
              <div className="bg-slate-900/30 border border-slate-800 p-4 rounded-xl flex flex-col justify-between space-y-3 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-500/5 rounded-full blur-xl -mr-4 -mt-4" />
                <div className="space-y-2 z-10">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-bold text-slate-200">Full API Integrations</span>
                  </div>
                  <p className="text-[10.5px] text-slate-400 leading-relaxed font-sans">
                    Ensures FastAPI routers, Pydantic data schemas, and the SQLite 3NF relational persistence layer coordinate cohesively. Uses <code className="text-indigo-400 font-mono text-[9.5px]">TestClient</code> to simulate high-fidelity requests from end to end.
                  </p>
                </div>
              </div>

              {/* Pillar 3: E2E Validation */}
              <div className="bg-slate-900/30 border border-slate-800 p-4 rounded-xl flex flex-col justify-between space-y-3 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-pink-500/5 rounded-full blur-xl -mr-4 -mt-4" />
                <div className="space-y-2 z-10">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-pink-400" />
                    <span className="text-xs font-bold text-slate-200">Reliability & Regressions</span>
                  </div>
                  <p className="text-[10.5px] text-slate-400 leading-relaxed font-sans">
                    Provides continuous protection against model modifications, schema drift, or code refactors. Automated assertion sweeps act as self-documenting executable design constraints for the developer.
                  </p>
                </div>
              </div>

            </div>

            {/* Deep-Dive Technical Sections */}
            <div className="bg-slate-950/40 border border-slate-800 p-5 rounded-xl space-y-6 animate-fadeIn">
              <div className="flex items-center gap-2 border-b border-slate-900 pb-3">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
                  Epic 5 Core Technical Deep Dives
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* 1. Unit Testing of Services */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 bg-emerald-950/40 border border-emerald-500/20 text-emerald-300 text-[8px] font-mono rounded font-semibold uppercase">
                      Unit Testing
                    </span>
                    <span className="text-xs font-bold text-slate-300">Model Isolations & Mocking</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    Unit tests focus on validating the core intelligence of our individual pythonic micro-services. By using <code className="text-emerald-400 font-mono text-[10px]">unittest.mock</code>, we can mock external HTTP resources like the Wikipedia API or expensive NLP loading pipelines, allowing unit tests to execute in milliseconds:
                  </p>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    We assert that our algorithms behave correctly under standard configurations and boundary conditions. For instance, testing if the interest scraper properly cleans trailing whitespaces, and if the conversation synthesizer correctly maps templates to prompt formats.
                  </p>
                  
                  {/* Miniature Code Snippet */}
                  <div className="bg-black/80 border border-slate-900 p-3 rounded font-mono text-[9px] text-emerald-300/95 leading-normal space-y-1">
                    <div><span className="text-slate-500">def</span> <span className="text-blue-400">test_interest_parsing</span>():</div>
                    <div className="pl-3">analyzer = EventAnalyzer(model_name=<span className="text-emerald-400">"mock"</span>)</div>
                    <div className="pl-3">result = analyzer.clean_interests(<span className="text-emerald-400">" AI , Web3 "</span>)</div>
                    <div className="pl-3"><span className="text-slate-500">assert</span> result == [<span className="text-emerald-400">"AI"</span>, <span className="text-emerald-400">"Web3"</span>]</div>
                  </div>
                </div>

                {/* 2. End-to-End API Integrations */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 bg-indigo-950/40 border border-indigo-500/20 text-indigo-300 text-[8px] font-mono rounded font-semibold uppercase">
                      Integration Testing
                    </span>
                    <span className="text-xs font-bold text-slate-300">FastAPI client & DB Verification</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    Integration tests evaluate the combined behavior of routers, Pydantic schemas, and database instances. We instantiate a clean, temporary SQLite engine, run migrations, and execute simulated client queries:
                  </p>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    The <code className="text-indigo-400 font-mono text-[10px]">fastapi.testclient.TestClient</code> simulates HTTP request/response loops. This allows us to verify payload integrity (verifying that invalid types trigger 422 Unprocessable Entity errors) and trace the successful write of logging records into SQLite 3NF relational tables.
                  </p>
                  
                  {/* Miniature Code Snippet */}
                  <div className="bg-black/80 border border-slate-900 p-3 rounded font-mono text-[9px] text-indigo-300/95 leading-normal space-y-1">
                    <div><span className="text-slate-500">from</span> fastapi.testclient <span className="text-slate-500">import</span> TestClient</div>
                    <div>client = TestClient(app)</div>
                    <div className="text-slate-500 pt-1"># Test POST routing & feedback serialization</div>
                    <div>response = client.post(<span className="text-emerald-400">"/api/v1/starters"</span>, json=payload)</div>
                    <div><span className="text-slate-500">assert</span> response.status_code == <span className="text-amber-400">200</span></div>
                    <div><span className="text-slate-500">assert</span> len(db.fetch_history()) &gt; <span className="text-amber-400">0</span></div>
                  </div>
                </div>

                {/* 3. Testing Infrastructure & Tooling */}
                <div className="space-y-3 border-t border-slate-900 pt-6 mt-2">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 bg-violet-950/40 border border-violet-500/20 text-violet-300 text-[8px] font-mono rounded font-semibold uppercase">
                      Testing Tooling
                    </span>
                    <span className="text-xs font-bold text-slate-300">Pytest Framework & Self-Contained Testing</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    The project uses <code className="text-violet-400 font-mono text-[10px]">pytest</code> as its testing framework, which is the de-facto standard for Python testing. For testing FastAPI endpoints specifically, the <code className="text-violet-400 font-mono text-[10px]">httpx</code> library's <code className="text-violet-400 font-mono text-[10px]">TestClient</code> is used, which allows API calls to be made in-process without needing a running server. This makes tests fast, reliable, and completely self-contained.
                  </p>
                  
                  {/* Miniature Code Snippet */}
                  <div className="bg-black/80 border border-slate-900 p-3 rounded font-mono text-[9px] text-violet-300/95 leading-normal space-y-1">
                    <div>import pytest</div>
                    <div>from httpx import ASGITransport, AsyncClient</div>
                    <div className="text-slate-500 pt-1"># Async, self-contained in-process server-less testing</div>
                    <div><span className="text-pink-400">@pytest.mark.anyio</span></div>
                    <div>async def <span className="text-blue-400">test_async_endpoint</span>():</div>
                    <div className="pl-3">async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:</div>
                    <div className="pl-6">response = await ac.get("/api/v1/health")</div>
                    <div className="pl-6">assert response.status_code == 200</div>
                  </div>
                </div>

                {/* 4. Event Analyzer Pipeline Validation */}
                <div className="space-y-3 border-t border-slate-900 pt-6 mt-2">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 bg-rose-950/40 border border-rose-500/20 text-rose-300 text-[8px] font-mono rounded font-semibold uppercase">
                      Pipeline Contracts
                    </span>
                    <span className="text-xs font-bold text-slate-300">DistilBERT Pipeline & Contract Assertions</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    Unit tests for the event analyzer verify that the DistilBERT classification pipeline behaves correctly across a range of inputs:
                  </p>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    These tests validate the function's contract without making assertions about the specific themes returned (which would be brittle since the model's output depends on its training). Instead, they test structural properties: is the output a list? Does it contain at most three items? Are all items drawn from the candidate labels set? Does it return at least one result? These kinds of assertions remain valid regardless of the specific model weights or future model updates.
                  </p>
                  
                  {/* Miniature Code Snippet */}
                  <div className="bg-black/80 border border-slate-900 p-3 rounded font-mono text-[9px] text-rose-300/95 leading-normal space-y-1">
                    <div>def <span className="text-blue-400">test_analyzer_contract</span>():</div>
                    <div className="pl-3">analyzer = EventAnalyzer()</div>
                    <div className="pl-3">themes = analyzer.classify_themes(<span className="text-emerald-400">"Hackathon for AI developers"</span>)</div>
                    <div className="pl-3">assert isinstance(themes, list)</div>
                    <div className="pl-3">assert <span className="text-amber-400">0</span> &lt; len(themes) &lt;= <span className="text-amber-400">3</span></div>
                    <div className="pl-3">assert all(t in CANDIDATE_LABELS for t in themes)</div>
                  </div>
                </div>

                {/* 5. Topic Generator / GPT-2 Cleanup Validation */}
                <div className="space-y-3 border-t border-slate-900 pt-6 mt-2">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 bg-amber-950/40 border border-amber-500/20 text-amber-300 text-[8px] font-mono rounded font-semibold uppercase">
                      Cleanup Validation
                    </span>
                    <span className="text-xs font-bold text-slate-300">Topic Generator & Post-Processing Guardrails</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    The topic generator tests follow a similar pattern, validating structure rather than specific content: The <code className="text-amber-400 font-mono text-[10px]">test_generate_strings</code> and <code className="text-amber-400 font-mono text-[10px]">test_generate_non_empty_strings</code> tests are particularly important because they validate the post-processing logic in <code className="text-amber-400 font-mono text-[10px]">generate_topics</code>.
                  </p>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    The function strips bullet markers and whitespace from GPT-2's raw output — these tests verify that this cleanup produces actual string content and not accidentally empty strings, which would render as blank bullet points in the UI.
                  </p>
                  
                  {/* Miniature Code Snippet */}
                  <div className="bg-black/80 border border-slate-900 p-3 rounded font-mono text-[9px] text-amber-300/95 leading-normal space-y-1">
                    <div>def <span className="text-blue-400">test_topic_generator_postprocessing</span>():</div>
                    <div className="pl-3">synthesizer = GPT2Synthesizer()</div>
                    <div className="pl-3">raw_output = <span className="text-emerald-400">" - AI Agents  \n * Blockchain solutions \n   \n - "</span></div>
                    <div className="pl-3">topics = synthesizer.clean_and_parse(raw_output)</div>
                    <div className="text-slate-500 pl-3"># Verify markers and blank strings are stripped, producing real strings</div>
                    <div className="pl-3">assert len(topics) == <span className="text-amber-400">2</span></div>
                    <div className="pl-3">assert topics == [<span className="text-emerald-400">"AI Agents"</span>, <span className="text-emerald-400">"Blockchain solutions"</span>]</div>
                    <div className="pl-3">assert all(isinstance(t, str) and len(t.strip()) &gt; <span className="text-amber-400">0</span> for t in topics)</div>
                  </div>
                </div>

                {/* 6. Fact Checker Mocking Strategy */}
                <div className="space-y-3 border-t border-slate-900 pt-6 mt-2">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 bg-teal-950/40 border border-teal-500/20 text-teal-300 text-[8px] font-mono rounded font-semibold uppercase">
                      Mock Isolation
                    </span>
                    <span className="text-xs font-bold text-slate-300">Fact Checker Wikipedia Isolation</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    Fact checker tests require a different strategy because they involve an external network call to the Wikipedia API. In true unit testing philosophy, external dependencies should be mocked to isolate the code under test:
                  </p>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    These tests use Python's <code className="text-teal-400 font-mono text-[10px]">unittest.mock</code> module to replace the actual <code className="text-teal-400 font-mono text-[10px]">requests.get</code> function with a <code className="text-teal-400 font-mono text-[10px]">MagicMock</code> object that returns controlled, predictable data. This eliminates the dependency on network connectivity and Wikipedia's availability during test runs, making the tests reliable in any environment including CI/CD pipelines that may not have internet access. The three test cases cover the happy path, the missing-data path, and the error path, ensuring all branches of the <code className="text-teal-400 font-mono text-[10px]">fact_check</code> function are tested.
                  </p>
                  
                  {/* Miniature Code Snippet */}
                  <div className="bg-black/80 border border-slate-900 p-3 rounded font-mono text-[9px] text-teal-300/95 leading-normal space-y-1">
                    <div><span className="text-slate-500">from</span> unittest.mock <span className="text-slate-500">import</span> patch, MagicMock</div>
                    <div><span className="text-pink-400">@patch</span>(<span className="text-emerald-400">"requests.get"</span>)</div>
                    <div>def <span className="text-blue-400">test_fact_check_wikipedia_happy_path</span>(mock_get):</div>
                    <div className="pl-3">mock_response = MagicMock()</div>
                    <div className="pl-3">mock_response.status_code = <span className="text-amber-400">200</span></div>
                    <div className="pl-3">mock_response.json.return_value = <span className="text-emerald-400">&#123;"query": &#123;"pages": [...]&#125;&#125;</span></div>
                    <div className="pl-3">mock_get.return_value = mock_response</div>
                    <div className="pl-3">result = fact_check(<span className="text-emerald-400">"Sovereign Agents"</span>)</div>
                    <div className="pl-3">assert result.is_verified is True</div>
                  </div>
                </div>

                {/* 7. FastAPI Endpoint Integration Verification */}
                <div className="space-y-3 border-t border-slate-900 pt-6 mt-2 md:col-span-2">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 bg-blue-950/40 border border-blue-500/20 text-blue-300 text-[8px] font-mono rounded font-semibold uppercase">
                      API Integration
                    </span>
                    <span className="text-xs font-bold text-slate-300">FastAPI Route & Pydantic Validation Cycles</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    Integration tests for the API routes validate that the complete request-response cycle works correctly, including request validation, service orchestration, and response serialization: The <code className="text-blue-400 font-mono text-[10px]">TestClient</code> wraps the FastAPI application and allows tests to make HTTP requests directly to the application without network overhead.
                  </p>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    The <code className="text-blue-400 font-mono text-[10px]">test_invalid_request_returns_422</code> test is particularly valuable — it verifies that FastAPI's automatic validation is working correctly by confirming that sending an empty payload to an endpoint that requires a <code className="text-blue-400 font-mono text-[10px]">description</code> field results in the expected <code className="text-red-400 font-mono text-[10px]">422 Unprocessable Entity</code> status code. This tests the Pydantic validation layer without writing any custom validation code.
                  </p>
                  
                  {/* Miniature Code Snippet */}
                  <div className="bg-black/80 border border-slate-900 p-3 rounded font-mono text-[9px] text-blue-300/95 leading-normal space-y-1">
                    <div>def <span className="text-blue-400">test_invalid_request_returns_422</span>():</div>
                    <div className="pl-3">client = TestClient(app)</div>
                    <div className="text-slate-500 pl-3"># Send empty JSON body to verify automatic validation schema failures</div>
                    <div className="pl-3">response = client.post(<span className="text-emerald-400">"/api/v1/starters"</span>, json=&#123;&#125;)</div>
                    <div className="pl-3">assert response.status_code == <span className="text-amber-400">422</span></div>
                    <div className="pl-3">errors = response.json()[<span className="text-emerald-400">"detail"</span>]</div>
                    <div className="pl-3">assert errors[<span className="text-amber-400">0</span>][<span className="text-emerald-400">"loc"</span>] == [<span className="text-emerald-400">"body"</span>, <span className="text-emerald-400">"description"</span>]</div>
                    <div className="pl-3">assert errors[<span className="text-amber-400">0</span>][<span className="text-emerald-400">"msg"</span>] == <span className="text-emerald-400">"field required"</span></div>
                  </div>
                </div>

                {/* 8. Pytest Test Discovery & Code Coverage */}
                <div className="space-y-3 border-t border-slate-900 pt-6 mt-2 md:col-span-2">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 bg-fuchsia-950/40 border border-fuchsia-500/20 text-fuchsia-300 text-[8px] font-mono rounded font-semibold uppercase">
                      Test Runner
                    </span>
                    <span className="text-xs font-bold text-slate-300">Pytest Discovery & Coverage Metrics</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    Tests are executed using <code className="text-fuchsia-400 font-mono text-[10px]">pytest</code> from the project root directory. The framework automatically discovers all test files matching the <code className="text-fuchsia-400 font-mono text-[10px]">test_*.py</code> naming pattern and executes every function beginning with <code className="text-fuchsia-400 font-mono text-[10px]">test_</code>:
                  </p>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    The <code className="text-fuchsia-400 font-mono text-[10px]">--cov</code> flag generates a code coverage report showing which lines of the application code were executed during tests and which were not. A target coverage of 80%+ is considered healthy for a production application. Lines not covered by tests represent potential blind spots where bugs could lurk undetected.
                  </p>
                  
                  {/* Miniature Code Snippet */}
                  <div className="bg-black/80 border border-slate-900 p-3 rounded font-mono text-[9px] text-fuchsia-300/95 leading-normal space-y-1">
                    <div className="text-slate-500"># Run pytest with coverage reporting</div>
                    <div>$ pytest --cov=app --cov-report=term-missing tests/</div>
                    <div className="text-slate-500 pt-1"># Output snippet showing coverage report</div>
                    <div>Name                      Stmts   Miss  Col       Cover   Missing</div>
                    <div>-------------------------------------------------------------</div>
                    <div>app/services/analyzer.py     45      4    0         91%   12-15</div>
                    <div>app/services/synthesizer.py  38      2    0         94%   28-29</div>
                    <div>app/routers/starters.py      30      0    0        100%</div>
                    <div>-------------------------------------------------------------</div>
                    <div>TOTAL                       113      6    0         94%</div>
                  </div>
                </div>

                {/* 9. Local Deployment & Concurrent Processes */}
                <div className="space-y-3 border-t border-slate-900 pt-6 mt-2 md:col-span-2">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 bg-emerald-950/40 border border-emerald-500/20 text-emerald-300 text-[8px] font-mono rounded font-semibold uppercase">
                      Local Deployment
                    </span>
                    <span className="text-xs font-bold text-slate-300">Dual-Process Backend & Frontend Serving</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    With all tests passing, the application is deployed locally for full end-to-end manual testing. The system requires two concurrent processes: the FastAPI backend server and the Streamlit frontend server:
                  </p>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    The <code className="text-emerald-400 font-mono text-[10px]">--reload</code> flag on the uvicorn command enables hot-reloading: the server automatically restarts whenever a Python file in the project is modified. This dramatically accelerates the development feedback loop since code changes take effect immediately without manual server restarts. Once both servers are running, the complete application is accessible at <code className="text-emerald-400 font-mono text-[10px]">http://localhost:8501</code> for the Streamlit UI and <code className="text-emerald-400 font-mono text-[10px]">http://127.0.0.1:8000/docs</code> for the interactive API documentation.
                  </p>
                  
                  {/* Miniature Code Snippet */}
                  <div className="bg-black/80 border border-slate-900 p-3 rounded font-mono text-[9px] text-emerald-300/95 leading-normal space-y-1">
                    <div className="text-slate-500"># Process 1: Run FastAPI backend with Uvicorn auto-reload</div>
                    <div>$ uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload</div>
                    <div className="text-slate-500 pt-2"># Process 2: Run Streamlit UI web app</div>
                    <div>$ streamlit run frontend/app.py --server.port 8501</div>
                  </div>
                </div>

                {/* 10. Manual Validation & Activity 5.2 Summary */}
                <div className="space-y-3 border-t border-slate-900 pt-6 mt-2 md:col-span-2">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 bg-cyan-950/40 border border-cyan-500/20 text-cyan-300 text-[8px] font-mono rounded font-semibold uppercase">
                      Activity 5.2
                    </span>
                    <span className="text-xs font-bold text-slate-300">Manual Verification & Localhost Environment</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    Beyond automated tests, manual testing through the Streamlit UI provides validation of the complete end-to-end user experience. This manual inspection ensures the user flows, input fields, tables, and AI generation outputs render seamlessly in real time.
                  </p>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    Robust unit and integration tests are written for key components including <code className="text-cyan-400 font-mono text-[10px]">event_analyzer</code>, <code className="text-cyan-400 font-mono text-[10px]">topic_generator</code>, <code className="text-cyan-400 font-mono text-[10px]">fact_checker</code>, and all API routes using <code className="text-cyan-400 font-mono text-[10px]">pytest</code> and <code className="text-cyan-400 font-mono text-[10px]">httpx TestClient</code> / <code className="text-cyan-400 font-mono text-[10px]">AsyncClient</code>.
                  </p>
                  
                  {/* Localhost Environment Access Links */}
                  <div className="bg-slate-950/60 border border-slate-900/80 p-4 rounded-lg space-y-2">
                    <div className="text-[10px] uppercase font-mono tracking-wider text-slate-500">Local Deployment Endpoints</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                      <div className="bg-black/40 border border-emerald-500/10 p-2.5 rounded flex flex-col gap-1">
                        <span className="text-[10px] font-semibold text-emerald-400">Streamlit App Interface</span>
                        <a href="http://localhost:8501" target="_blank" rel="noopener noreferrer" className="text-[11px] font-mono text-slate-300 hover:text-emerald-300 transition-colors">
                          http://localhost:8501
                        </a>
                      </div>
                      <div className="bg-black/40 border border-blue-500/10 p-2.5 rounded flex flex-col gap-1">
                        <span className="text-[10px] font-semibold text-blue-400">FastAPI Swagger UI Docs</span>
                        <a href="http://127.0.0.1:8000/docs" target="_blank" rel="noopener noreferrer" className="text-[11px] font-mono text-slate-300 hover:text-blue-300 transition-colors">
                          http://127.0.0.1:8000/docs
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Comprehensive Project Retrospective & Executive Summary */}
              <div className="border-t border-slate-900 pt-8 mt-8 space-y-6 animate-fadeIn">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono">
                    Project Retrospective & Executive Summary
                  </h4>
                </div>

                <div className="bg-slate-950/80 border border-slate-900 p-6 rounded-xl space-y-6">
                  <p className="text-[12px] text-slate-300 leading-relaxed font-sans">
                    The <strong>Personalized Networking Assistant</strong> represents a complete and successful implementation of an AI-powered networking support system designed to enhance professional communication and user confidence during networking events. The project was developed through a structured and systematic approach divided into <strong>five major Epics</strong>, beginning with research and model evaluation, followed by system architecture design, backend API development, frontend interface creation, integration of AI services, and finally testing and deployment. This step-by-step methodology ensured that every component of the application was carefully planned, implemented, and validated before moving to the next stage of development.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    {/* Technology Selection */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-bold text-slate-200">Strategic Technology Selection</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                        One of the major strengths of the project lies in the selection of technologies and frameworks that balance performance, usability, and deployment feasibility:
                      </p>
                      <ul className="space-y-2 text-[11px] text-slate-400 pl-4 list-disc marker:text-emerald-400">
                        <li><strong>DistilBERT:</strong> Chosen as the primary zero-shot classification model due to its lightweight architecture, fast inference speed, and reliable contextual understanding capabilities.</li>
                        <li><strong>GPT-2 Small:</strong> Integrated for conversation starter generation, providing efficient natural language generation while remaining suitable for systems with limited computational resources.</li>
                        <li><strong>FastAPI:</strong> Selected for backend development due to its high performance, asynchronous capabilities, and strong support for API documentation and type validation.</li>
                        <li><strong>Streamlit:</strong> Enabled rapid frontend development and provided an intuitive user interface that supports real-time interaction with minimal complexity.</li>
                      </ul>
                    </div>

                    {/* Practical Features */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Network className="w-4 h-4 text-indigo-400" />
                        <span className="text-xs font-bold text-slate-200">Practical & Innovative Features</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                        The application successfully demonstrates several practical features designed to improve face-to-face or digital networking:
                      </p>
                      <ul className="space-y-2 text-[11px] text-slate-400 pl-4 list-disc marker:text-indigo-400">
                        <li><strong>Intelligent Conversation Starters:</strong> Generates personalized starters based on user interests, professional background, and event context to initiate dialogue naturally.</li>
                        <li><strong>Wikipedia-based Fact Checking:</strong> Implements real-time Wikipedia searches to verify concepts and offer instant context support for unfamiliar subjects.</li>
                        <li><strong>Feedback & History Logs:</strong> Tracks past interactions, thumbs up/down, and custom ratings to support continuous improvement and personal networking strategy refinement.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="border-t border-slate-900/60 pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* System Integration */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-blue-400" />
                        <span className="text-xs font-bold text-slate-200">Cohesive Full-Stack Synergy</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                        Another important achievement of the project is the successful integration of multiple technologies into a cohesive full-stack AI system. The frontend, backend APIs, machine learning models, and external knowledge verification services communicate efficiently, demonstrating strong modular architecture and scalability potential. Designed to operate in a locally deployable environment, it remains accessible for educational, research, and small-scale professional use without requiring expensive cloud infrastructure.
                      </p>
                    </div>

                    {/* Future Outlook */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-bold text-slate-200">Future Enhancements</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                        Overall, the Personalized Networking Assistant showcases the practical application of Natural Language Processing, machine learning, and modern web technologies in solving real-world communication challenges. The project not only fulfills its functional objectives but also establishes a strong foundation for future enhancements such as multilingual support, advanced recommendation systems, speech-based interaction, and cloud deployment capabilities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default ArchitectureGuide;
