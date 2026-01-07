import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Save, Download, ArrowLeft, Plus, Trash2 } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ModernTemplate from "@/components/templates/ModernTemplate";
import ClassicTemplate from "@/components/templates/ClassicTemplate";
import MinimalTemplate from "@/components/templates/MinimalTemplate";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function ResumeEditor({ user, onLogout }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const previewRef = useRef();
  const [loading, setLoading] = useState(false);
  const [resumeData, setResumeData] = useState({
    title: "My Resume",
    template: "modern",
    data: {
      personal_info: {
        full_name: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        website: "",
        summary: ""
      },
      work_experience: [],
      education: [],
      skills: [],
      certifications: []
    }
  });

  useEffect(() => {
    if (id && id !== "new") {
      fetchResume();
    }
  }, [id]);

  const fetchResume = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API}/resumes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResumeData(response.data);
    } catch (error) {
      toast.error("Failed to load resume");
      navigate("/dashboard");
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (id && id !== "new") {
        await axios.put(`${API}/resumes/${id}`, resumeData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("Resume updated successfully!");
      } else {
        const response = await axios.post(`${API}/resumes`, resumeData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("Resume created successfully!");
        navigate(`/resume/${response.data.id}`);
      }
    } catch (error) {
      toast.error("Failed to save resume");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      toast.info("Generating PDF...");
      const element = previewRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false
      });
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });
      
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`${resumeData.title}.pdf`);
      toast.success("Resume downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download resume");
    }
  };

  const addWorkExperience = () => {
    setResumeData({
      ...resumeData,
      data: {
        ...resumeData.data,
        work_experience: [...resumeData.data.work_experience, {
          id: Date.now().toString(),
          company: "",
          position: "",
          location: "",
          start_date: "",
          end_date: "",
          current: false,
          description: ""
        }]
      }
    });
  };

  const removeWorkExperience = (id) => {
    setResumeData({
      ...resumeData,
      data: {
        ...resumeData.data,
        work_experience: resumeData.data.work_experience.filter(exp => exp.id !== id)
      }
    });
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      data: {
        ...resumeData.data,
        education: [...resumeData.data.education, {
          id: Date.now().toString(),
          institution: "",
          degree: "",
          field: "",
          location: "",
          start_date: "",
          end_date: "",
          gpa: ""
        }]
      }
    });
  };

  const removeEducation = (id) => {
    setResumeData({
      ...resumeData,
      data: {
        ...resumeData.data,
        education: resumeData.data.education.filter(edu => edu.id !== id)
      }
    });
  };

  const TemplateComponent = {
    modern: ModernTemplate,
    classic: ClassicTemplate,
    minimal: MinimalTemplate
  }[resumeData.template] || ModernTemplate;

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/dashboard")}
              data-testid="back-to-dashboard-btn"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <FileText className="w-6 h-6 text-indigo-600" />
              <span className="text-xl font-bold" style={{fontFamily: 'Outfit'}}>Lyncat</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              className="btn-primary"
              onClick={handleSave}
              disabled={loading}
              data-testid="save-resume-btn"
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button 
              className="btn-accent"
              onClick={handleDownload}
              data-testid="download-resume-btn"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6" style={{maxHeight: 'calc(100vh - 150px)', overflowY: 'auto'}}>
            <div className="card">
              <h3 className="text-xl font-semibold mb-4" style={{fontFamily: 'Outfit'}}>Resume Settings</h3>
              <div className="space-y-4">
                <div>
                  <Label>Resume Title</Label>
                  <Input
                    value={resumeData.title}
                    onChange={(e) => setResumeData({...resumeData, title: e.target.value})}
                    data-testid="resume-title-input"
                  />
                </div>
                <div>
                  <Label>Template</Label>
                  <Select value={resumeData.template} onValueChange={(value) => setResumeData({...resumeData, template: value})}>
                    <SelectTrigger data-testid="template-select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="modern">Modern</SelectItem>
                      <SelectItem value="classic">Classic</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold mb-4" style={{fontFamily: 'Outfit'}}>Personal Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Full Name</Label>
                    <Input
                      value={resumeData.data.personal_info.full_name}
                      onChange={(e) => setResumeData({...resumeData, data: {...resumeData.data, personal_info: {...resumeData.data.personal_info, full_name: e.target.value}}})}
                      data-testid="full-name-field"
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      value={resumeData.data.personal_info.email}
                      onChange={(e) => setResumeData({...resumeData, data: {...resumeData.data, personal_info: {...resumeData.data.personal_info, email: e.target.value}}})}
                      data-testid="email-field"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Phone</Label>
                    <Input
                      value={resumeData.data.personal_info.phone}
                      onChange={(e) => setResumeData({...resumeData, data: {...resumeData.data, personal_info: {...resumeData.data.personal_info, phone: e.target.value}}})}
                      data-testid="phone-field"
                    />
                  </div>
                  <div>
                    <Label>Location</Label>
                    <Input
                      value={resumeData.data.personal_info.location}
                      onChange={(e) => setResumeData({...resumeData, data: {...resumeData.data, personal_info: {...resumeData.data.personal_info, location: e.target.value}}})}
                      data-testid="location-field"
                    />
                  </div>
                </div>
                <div>
                  <Label>Professional Summary</Label>
                  <Textarea
                    value={resumeData.data.personal_info.summary}
                    onChange={(e) => setResumeData({...resumeData, data: {...resumeData.data, personal_info: {...resumeData.data.personal_info, summary: e.target.value}}})}
                    rows={4}
                    data-testid="summary-field"
                  />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold" style={{fontFamily: 'Outfit'}}>Work Experience</h3>
                <Button onClick={addWorkExperience} variant="outline" size="sm" data-testid="add-work-experience-btn">
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              </div>
              <div className="space-y-6">
                {resumeData.data.work_experience.map((exp, index) => (
                  <div key={exp.id} className="p-4 border border-slate-200 rounded-lg space-y-4">
                    <div className="flex justify-between items-start">
                      <span className="font-medium text-sm text-slate-600">Experience {index + 1}</span>
                      <Button variant="ghost" size="sm" onClick={() => removeWorkExperience(exp.id)} data-testid={`remove-work-${index}`}>
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Company</Label>
                        <Input
                          value={exp.company}
                          onChange={(e) => {
                            const newExp = [...resumeData.data.work_experience];
                            newExp[index].company = e.target.value;
                            setResumeData({...resumeData, data: {...resumeData.data, work_experience: newExp}});
                          }}
                          data-testid={`work-company-${index}`}
                        />
                      </div>
                      <div>
                        <Label>Position</Label>
                        <Input
                          value={exp.position}
                          onChange={(e) => {
                            const newExp = [...resumeData.data.work_experience];
                            newExp[index].position = e.target.value;
                            setResumeData({...resumeData, data: {...resumeData.data, work_experience: newExp}});
                          }}
                          data-testid={`work-position-${index}`}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={exp.description}
                        onChange={(e) => {
                          const newExp = [...resumeData.data.work_experience];
                          newExp[index].description = e.target.value;
                          setResumeData({...resumeData, data: {...resumeData.data, work_experience: newExp}});
                        }}
                        rows={3}
                        data-testid={`work-description-${index}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold" style={{fontFamily: 'Outfit'}}>Education</h3>
                <Button onClick={addEducation} variant="outline" size="sm" data-testid="add-education-btn">
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              </div>
              <div className="space-y-6">
                {resumeData.data.education.map((edu, index) => (
                  <div key={edu.id} className="p-4 border border-slate-200 rounded-lg space-y-4">
                    <div className="flex justify-between items-start">
                      <span className="font-medium text-sm text-slate-600">Education {index + 1}</span>
                      <Button variant="ghost" size="sm" onClick={() => removeEducation(edu.id)} data-testid={`remove-edu-${index}`}>
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Institution</Label>
                        <Input
                          value={edu.institution}
                          onChange={(e) => {
                            const newEdu = [...resumeData.data.education];
                            newEdu[index].institution = e.target.value;
                            setResumeData({...resumeData, data: {...resumeData.data, education: newEdu}});
                          }}
                          data-testid={`edu-institution-${index}`}
                        />
                      </div>
                      <div>
                        <Label>Degree</Label>
                        <Input
                          value={edu.degree}
                          onChange={(e) => {
                            const newEdu = [...resumeData.data.education];
                            newEdu[index].degree = e.target.value;
                            setResumeData({...resumeData, data: {...resumeData.data, education: newEdu}});
                          }}
                          data-testid={`edu-degree-${index}`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold mb-4" style={{fontFamily: 'Outfit'}}>Skills</h3>
              <div>
                <Label>Skills (comma-separated)</Label>
                <Textarea
                  value={Array.isArray(resumeData.data.skills) ? resumeData.data.skills.join(", ") : ""}
                  onChange={(e) => {
                    const skillsText = e.target.value;
                    const skillsArray = skillsText.split(",").map(s => s.trim()).filter(Boolean);
                    setResumeData({...resumeData, data: {...resumeData.data, skills: skillsArray}});
                  }}
                  placeholder="JavaScript, React, Node.js, Python"
                  rows={3}
                  data-testid="skills-field"
                />
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-24" style={{height: 'fit-content'}}>
            <div className="card p-8" style={{backgroundColor: '#fff'}}>
              <h3 className="text-lg font-semibold mb-4" style={{fontFamily: 'Outfit'}}>Preview</h3>
              <div ref={previewRef} style={{backgroundColor: 'white', minHeight: '1000px'}}>
                <TemplateComponent data={resumeData.data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}