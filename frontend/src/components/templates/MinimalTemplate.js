import React from "react";

export default function MinimalTemplate({ data }) {
  return (
    <div style={{fontFamily: 'DM Sans, sans-serif', padding: '40px', backgroundColor: 'white', color: '#1E293B', maxWidth: '800px'}}>
      <div style={{marginBottom: '40px'}}>
        <h1 style={{fontFamily: 'Outfit', fontSize: '40px', fontWeight: '800', marginBottom: '4px', color: '#1E293B', letterSpacing: '-0.5px'}}>
          {data.personal_info.full_name || "Your Name"}
        </h1>
        <div style={{fontSize: '13px', color: '#64748B', letterSpacing: '0.3px'}}>
          {data.personal_info.email && <span>{data.personal_info.email}</span>}
          {data.personal_info.phone && <span> • {data.personal_info.phone}</span>}
          {data.personal_info.location && <span> • {data.personal_info.location}</span>}
        </div>
      </div>

      {data.personal_info.summary && (
        <div style={{marginBottom: '32px'}}>
          <p style={{fontSize: '14px', lineHeight: '1.8', color: '#475569'}}>{data.personal_info.summary}</p>
        </div>
      )}

      {data.work_experience && data.work_experience.length > 0 && (
        <div style={{marginBottom: '32px'}}>
          <h2 style={{fontFamily: 'Outfit', fontSize: '14px', fontWeight: '700', color: '#1E293B', marginBottom: '16px', letterSpacing: '1px', textTransform: 'uppercase'}}>Experience</h2>
          {data.work_experience.map((exp, index) => (
            <div key={index} style={{marginBottom: '24px', paddingLeft: '16px', borderLeft: '2px solid #E2E8F0'}}>
              <div style={{marginBottom: '4px'}}>
                <span style={{fontSize: '15px', fontWeight: '600', color: '#1E293B'}}>{exp.position}</span>
                <span style={{fontSize: '14px', color: '#64748B', marginLeft: '8px'}}>at {exp.company}</span>
              </div>
              {exp.description && (
                <p style={{fontSize: '14px', lineHeight: '1.7', color: '#475569', marginTop: '8px'}}>{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {data.education && data.education.length > 0 && (
        <div style={{marginBottom: '32px'}}>
          <h2 style={{fontFamily: 'Outfit', fontSize: '14px', fontWeight: '700', color: '#1E293B', marginBottom: '16px', letterSpacing: '1px', textTransform: 'uppercase'}}>Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} style={{marginBottom: '16px', paddingLeft: '16px', borderLeft: '2px solid #E2E8F0'}}>
              <div style={{fontSize: '15px', fontWeight: '600', color: '#1E293B'}}>
                {edu.degree} {edu.field && `in ${edu.field}`}
              </div>
              <div style={{fontSize: '14px', color: '#64748B'}}>{edu.institution}</div>
            </div>
          ))}
        </div>
      )}

      {data.skills && data.skills.length > 0 && (
        <div>
          <h2 style={{fontFamily: 'Outfit', fontSize: '14px', fontWeight: '700', color: '#1E293B', marginBottom: '12px', letterSpacing: '1px', textTransform: 'uppercase'}}>Skills</h2>
          <div style={{paddingLeft: '16px', borderLeft: '2px solid #E2E8F0'}}>
            <p style={{fontSize: '14px', lineHeight: '1.8', color: '#475569'}}>
              {data.skills.join(" • ")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}