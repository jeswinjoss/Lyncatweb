import React from "react";

export default function ModernTemplate({ data }) {
  return (
    <div style={{fontFamily: 'DM Sans, sans-serif', padding: '40px', backgroundColor: 'white', color: '#1E293B'}}>
      <div style={{borderBottom: '3px solid #4F46E5', paddingBottom: '20px', marginBottom: '30px'}}>
        <h1 style={{fontFamily: 'Outfit', fontSize: '36px', fontWeight: '800', marginBottom: '8px', color: '#1E293B'}}>
          {data.personal_info.full_name || "Your Name"}
        </h1>
        <div style={{display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '14px', color: '#64748B'}}>
          {data.personal_info.email && <span>{data.personal_info.email}</span>}
          {data.personal_info.phone && <span>• {data.personal_info.phone}</span>}
          {data.personal_info.location && <span>• {data.personal_info.location}</span>}
        </div>
      </div>

      {data.personal_info.summary && (
        <div style={{marginBottom: '30px'}}>
          <h2 style={{fontFamily: 'Outfit', fontSize: '20px', fontWeight: '600', color: '#4F46E5', marginBottom: '12px'}}>PROFESSIONAL SUMMARY</h2>
          <p style={{fontSize: '14px', lineHeight: '1.6', color: '#475569'}}>{data.personal_info.summary}</p>
        </div>
      )}

      {data.work_experience && data.work_experience.length > 0 && (
        <div style={{marginBottom: '30px'}}>
          <h2 style={{fontFamily: 'Outfit', fontSize: '20px', fontWeight: '600', color: '#4F46E5', marginBottom: '16px'}}>WORK EXPERIENCE</h2>
          {data.work_experience.map((exp, index) => (
            <div key={index} style={{marginBottom: '20px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '6px'}}>
                <h3 style={{fontSize: '16px', fontWeight: '600', color: '#1E293B'}}>{exp.position}</h3>
              </div>
              <div style={{fontSize: '14px', color: '#64748B', marginBottom: '8px'}}>
                <strong>{exp.company}</strong>
                {exp.location && ` • ${exp.location}`}
              </div>
              {exp.description && (
                <p style={{fontSize: '14px', lineHeight: '1.6', color: '#475569'}}>{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {data.education && data.education.length > 0 && (
        <div style={{marginBottom: '30px'}}>
          <h2 style={{fontFamily: 'Outfit', fontSize: '20px', fontWeight: '600', color: '#4F46E5', marginBottom: '16px'}}>EDUCATION</h2>
          {data.education.map((edu, index) => (
            <div key={index} style={{marginBottom: '16px'}}>
              <h3 style={{fontSize: '16px', fontWeight: '600', color: '#1E293B'}}>{edu.degree} {edu.field && `in ${edu.field}`}</h3>
              <div style={{fontSize: '14px', color: '#64748B'}}>
                {edu.institution}
                {edu.location && ` • ${edu.location}`}
              </div>
            </div>
          ))}
        </div>
      )}

      {data.skills && data.skills.length > 0 && (
        <div>
          <h2 style={{fontFamily: 'Outfit', fontSize: '20px', fontWeight: '600', color: '#4F46E5', marginBottom: '12px'}}>SKILLS</h2>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
            {data.skills.filter(skill => skill && skill.trim()).map((skill, index) => (
              <span key={index} style={{backgroundColor: '#EEF2FF', color: '#4F46E5', padding: '6px 12px', borderRadius: '6px', fontSize: '13px'}}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}