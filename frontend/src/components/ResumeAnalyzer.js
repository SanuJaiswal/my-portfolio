import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Upload,
  Sparkles,
  FileText,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Target,
  Lightbulb,
  Wand2,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../hooks/use-toast';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const ScoreRing = ({ score }) => {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color =
    score >= 80 ? '#10b981' : score >= 60 ? '#06b6d4' : score >= 40 ? '#f59e0b' : '#ef4444';

  return (
    <div className="relative w-44 h-44 flex items-center justify-center">
      <svg className="absolute -rotate-90" width="176" height="176">
        <circle cx="88" cy="88" r={radius} stroke="currentColor" strokeWidth="10" fill="none" className="text-slate-200 dark:text-slate-800" />
        <motion.circle
          cx="88"
          cy="88"
          r={radius}
          stroke={color}
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </svg>
      <div className="text-center z-10">
        <motion.div
          className="text-5xl font-bold text-slate-900 dark:text-white"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {score}
        </motion.div>
        <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">Match Score</div>
      </div>
    </div>
  );
};

const ResumeAnalyzer = () => {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const fileInputRef = useRef(null);

  const [jobDescription, setJobDescription] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [inputMode, setInputMode] = useState('file'); // 'file' or 'text'
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      toast({ title: 'Invalid file', description: 'Please upload a PDF file.', variant: 'destructive' });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: 'File too large', description: 'Max 5 MB.', variant: 'destructive' });
      return;
    }
    setResumeFile(file);
  };

  const handleAnalyze = async () => {
    if (jobDescription.trim().length < 30) {
      toast({ title: 'Job description too short', description: 'Please paste at least a few lines.', variant: 'destructive' });
      return;
    }
    if (inputMode === 'file' && !resumeFile) {
      toast({ title: 'Resume required', description: 'Please upload your resume PDF.', variant: 'destructive' });
      return;
    }
    if (inputMode === 'text' && resumeText.trim().length < 50) {
      toast({ title: 'Resume text too short', description: 'Please paste your full resume.', variant: 'destructive' });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('job_description', jobDescription);
      if (inputMode === 'file') {
        formData.append('resume_file', resumeFile);
      } else {
        formData.append('resume_text', resumeText);
      }

      const res = await axios.post(`${API}/resume/analyze`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 60000,
      });
      setResult(res.data);
      setTimeout(() => {
        document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    } catch (err) {
      const msg = err?.response?.data?.detail || 'Something went wrong. Please try again.';
      toast({ title: 'Analysis failed', description: msg, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back to portfolio</span>
          </Link>
          <Button variant="ghost" size="sm" onClick={toggleTheme}>
            {theme === 'light' ? 'Dark' : 'Light'} mode
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="h-3 w-3 mr-1 inline" />
            AI-Powered · GPT-4o
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
            Resume Analyzer
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Upload your resume and paste a job description. Get an instant match score, skill gaps, and AI-rewritten bullet points.
          </p>
        </motion.div>

        {/* Input Form */}
        <motion.div
          className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Resume Input */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold text-slate-900 dark:text-white flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-cyan-500" />
                  Your Resume
                </label>
                <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1 text-xs">
                  <button
                    onClick={() => setInputMode('file')}
                    className={`px-3 py-1 rounded-md font-medium transition ${
                      inputMode === 'file'
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow'
                        : 'text-slate-500'
                    }`}
                  >
                    PDF Upload
                  </button>
                  <button
                    onClick={() => setInputMode('text')}
                    className={`px-3 py-1 rounded-md font-medium transition ${
                      inputMode === 'text'
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow'
                        : 'text-slate-500'
                    }`}
                  >
                    Paste Text
                  </button>
                </div>
              </div>

              {inputMode === 'file' ? (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-64 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl flex flex-col items-center justify-center hover:border-cyan-500 dark:hover:border-cyan-500 hover:bg-cyan-50/30 dark:hover:bg-cyan-900/10 transition group"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {resumeFile ? (
                    <>
                      <CheckCircle2 className="h-10 w-10 text-cyan-500 mb-3" />
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{resumeFile.name}</p>
                      <p className="text-xs text-slate-500 mt-1">{(resumeFile.size / 1024).toFixed(0)} KB · Click to change</p>
                    </>
                  ) : (
                    <>
                      <Upload className="h-10 w-10 text-slate-400 group-hover:text-cyan-500 mb-3 transition" />
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Click to upload PDF</p>
                      <p className="text-xs text-slate-500 mt-1">Max 5 MB</p>
                    </>
                  )}
                </button>
              ) : (
                <Textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste your full resume text here..."
                  className="h-64 resize-none"
                />
              )}
            </div>

            {/* Job Description */}
            <div>
              <label className="text-sm font-semibold text-slate-900 dark:text-white flex items-center mb-3">
                <Target className="h-4 w-4 mr-2 text-cyan-500" />
                Job Description
              </label>
              <Textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the full job description here..."
                className="h-64 resize-none"
              />
            </div>
          </div>

          <Button
            onClick={handleAnalyze}
            disabled={loading}
            size="lg"
            className="w-full mt-6 bg-slate-900 hover:bg-cyan-600 dark:bg-slate-100 dark:hover:bg-cyan-400 dark:text-slate-900 transition"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Analyzing with AI...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 mr-2" />
                Analyze Match
              </>
            )}
          </Button>
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div
              id="result-section"
              className="mt-12 space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Score + Verdict */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 flex flex-col md:flex-row items-center gap-8">
                <ScoreRing score={result.match_score} />
                <div className="flex-1 text-center md:text-left">
                  <p className="text-xs uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold mb-2">
                    AI Verdict
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                    {result.verdict}
                  </h2>
                </div>
              </div>

              {/* Skills Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
                    <CheckCircle2 className="h-5 w-5 mr-2 text-emerald-500" />
                    Matched Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(result.matched_skills || []).map((s, i) => (
                      <Badge key={i} className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
                    <XCircle className="h-5 w-5 mr-2 text-red-500" />
                    Missing Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(result.missing_skills || []).map((s, i) => (
                      <Badge key={i} className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Strengths & Gaps */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-cyan-500" />
                    Your Strengths
                  </h3>
                  <ul className="space-y-3">
                    {(result.strengths || []).map((s, i) => (
                      <li key={i} className="text-sm text-slate-700 dark:text-slate-300 flex items-start">
                        <span className="text-cyan-500 mr-2 mt-0.5">▸</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 text-amber-500" />
                    Gaps to Address
                  </h3>
                  <ul className="space-y-3">
                    {(result.gaps || []).map((s, i) => (
                      <li key={i} className="text-sm text-slate-700 dark:text-slate-300 flex items-start">
                        <span className="text-amber-500 mr-2 mt-0.5">▸</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Suggestions */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-cyan-50 to-slate-50 dark:from-slate-900 dark:to-slate-800 p-6">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-cyan-500" />
                  Actionable Suggestions
                </h3>
                <ul className="space-y-3">
                  {(result.suggestions || []).map((s, i) => (
                    <li key={i} className="text-sm text-slate-700 dark:text-slate-300 flex items-start">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-cyan-500 text-white text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                        {i + 1}
                      </span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Improved Bullets */}
              {result.improved_bullets?.length > 0 && (
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
                    <Wand2 className="h-5 w-5 mr-2 text-cyan-500" />
                    AI-Rewritten Bullets
                  </h3>
                  <div className="space-y-5">
                    {result.improved_bullets.map((b, i) => (
                      <div key={i} className="border-l-4 border-cyan-500 pl-4">
                        <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Original</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 line-through mb-3">{b.original}</p>
                        <p className="text-xs uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-1">Improved</p>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{b.improved}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default ResumeAnalyzer;
