import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FileText, Plus, LogOut, Edit, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function Dashboard({ user, onLogout }) {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API}/resumes`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResumes(response.data);
    } catch (error) {
      toast.error("Failed to load resumes");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API}/resumes/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResumes(resumes.filter(r => r.id !== deleteId));
      toast.success("Resume deleted successfully");
    } catch (error) {
      toast.error("Failed to delete resume");
    }
    setDeleteId(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileText className="w-8 h-8 text-indigo-600" />
            <span className="text-2xl font-bold" style={{fontFamily: 'Outfit'}}>Lyncat</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-600">Welcome, {user.full_name}</span>
            <Button 
              variant="ghost" 
              onClick={onLogout}
              data-testid="logout-btn"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2" style={{fontFamily: 'Outfit'}}>My Resumes</h1>
            <p className="text-slate-600">Create and manage your professional resumes</p>
          </div>
          <Button 
            className="btn-accent"
            onClick={() => navigate("/resume/new")}
            data-testid="create-resume-btn"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Resume
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-slate-600">Loading resumes...</p>
          </div>
        ) : resumes.length === 0 ? (
          <div className="card text-center py-16" data-testid="empty-state">
            <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2" style={{fontFamily: 'Outfit'}}>No resumes yet</h3>
            <p className="text-slate-600 mb-6">Create your first resume to get started</p>
            <Button 
              className="btn-accent"
              onClick={() => navigate("/resume/new")}
              data-testid="empty-create-btn"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Resume
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <div key={resume.id} className="card group" data-testid={`resume-card-${resume.id}`}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-1" style={{fontFamily: 'Outfit'}}>{resume.title}</h3>
                    <p className="text-sm text-slate-500">Template: {resume.template}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-4">
                  Last updated: {new Date(resume.updated_at).toLocaleDateString()}
                </p>
                <div className="flex gap-2">
                  <Button 
                    className="flex-1 btn-primary"
                    onClick={() => navigate(`/resume/${resume.id}`)}
                    data-testid={`edit-resume-${resume.id}`}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline"
                    className="text-red-600 hover:bg-red-50"
                    onClick={() => setDeleteId(resume.id)}
                    data-testid={`delete-resume-${resume.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your resume.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="cancel-delete-btn">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} data-testid="confirm-delete-btn">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}