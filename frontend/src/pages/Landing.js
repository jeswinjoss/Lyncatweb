import React from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Sparkles, Download, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <nav className="fixed top-0 w-full glass-effect z-50 border-b border-slate-200">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileText className="w-8 h-8 text-indigo-600" />
            <span className="text-2xl font-bold" style={{fontFamily: 'Outfit'}}>Lyncat</span>
          </div>
          <div className="flex gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/auth")}
              data-testid="nav-login-btn"
            >
              Login
            </Button>
            <Button 
              className="btn-accent"
              onClick={() => navigate("/auth")}
              data-testid="nav-signup-btn"
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight" style={{fontFamily: 'Outfit'}}>
                Create ATS-Friendly
                <span className="text-indigo-600"> Resumes</span> That Get You Hired
              </h1>
              <p className="text-lg text-slate-600">
                Build professional resumes optimized for Applicant Tracking Systems. Choose from beautiful templates, edit anytime, and download instantly.
              </p>
              <div className="flex gap-4">
                <Button 
                  className="btn-accent text-lg px-8 py-6"
                  onClick={() => navigate("/auth")}
                  data-testid="hero-cta-btn"
                >
                  Start Building Free
                </Button>
                <Button 
                  variant="outline" 
                  className="text-lg px-8 py-6"
                  data-testid="hero-learn-more-btn"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="card p-8 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1635253548172-d82ffe76449d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHw0fHxwcm9mZXNzaW9uYWwlMjByZXN1bWUlMjBqb2IlMjBhcHBsaWNhdGlvbiUyMGRvY3VtZW50fGVufDB8fHx8MTc2Nzc3MDY1M3ww&ixlib=rb-4.1.0&q=85"
                  alt="Professional resume documents"
                  className="rounded-lg w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16" style={{fontFamily: 'Outfit'}}>Why Choose Lyncat?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center space-y-4">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold" style={{fontFamily: 'Outfit'}}>ATS-Optimized</h3>
              <p className="text-slate-600">Templates designed to pass Applicant Tracking Systems with clean, parseable formats.</p>
            </div>
            <div className="card text-center space-y-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                <Zap className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold" style={{fontFamily: 'Outfit'}}>Quick & Easy</h3>
              <p className="text-slate-600">Create professional resumes in minutes. Save, edit, and update anytime you need.</p>
            </div>
            <div className="card text-center space-y-4">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
                <Download className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold" style={{fontFamily: 'Outfit'}}>Instant Download</h3>
              <p className="text-slate-600">Download your resume as PDF instantly. Print-ready and professional quality.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6" style={{fontFamily: 'Outfit'}}>Ready to Land Your Dream Job?</h2>
          <p className="text-lg text-slate-600 mb-8">
            Join thousands of job seekers who have created their perfect resumes with Lyncat.
          </p>
          <Button 
            className="btn-accent text-lg px-8 py-6"
            onClick={() => navigate("/auth")}
            data-testid="footer-cta-btn"
          >
            Get Started Now
          </Button>
        </div>
      </section>

      <footer className="bg-slate-900 text-white py-12 px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FileText className="w-6 h-6" />
            <span className="text-xl font-bold" style={{fontFamily: 'Outfit'}}>Lyncat</span>
          </div>
          <p className="text-slate-400">© 2025 Lyncat. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}