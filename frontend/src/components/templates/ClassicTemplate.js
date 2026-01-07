import React from "react";

export default function ClassicTemplate({ data }) {
  return (
    <div style={{fontFamily: 'DM Sans, sans-serif', padding: '40px', backgroundColor: 'white', color: '#1E293B'}}>
      <div style={{textAlign: 'center', marginBottom: '30px', borderBottom: '2px solid #64748B', paddingBottom: '20px'}}>
        <h1 style={{fontFamily: 'Outfit', fontSize: '32px', fontWeight: '700', marginBottom: '12px', color: '#1E293B'}}>
          {data.personal_info.full_name || "Your Name"}
        </h1>
        <div style={{fontSize: '14px', color: '#64748B'}}>
          {data.personal_info.email && <span>{data.personal_info.email}</span>}
          {data.personal_info.phone && <span> | {data.personal_info.phone}</span>}
          {data.personal_info.location && <span> | {data.personal_info.location}</span>}
        </div>
      </div>

      {data.personal_info.summary && (
        <div style={{marginBottom: '30px'}}>
          <h2 style={{fontFamily: 'Outfit', fontSize: '18px', fontWeight: '600', color: '#1E293B', marginBottom: '12px', textTransform: 'uppercase', borderBottom: '1px solid #CBD5E1', paddingBottom: '6px'}}>Summary</h2>
          <p style={{fontSize: '14px', lineHeight: '1.7', color: '#475569'}}>{data.personal_info.summary}</p>
        </div>
      )}

      {data.work_experience && data.work_experience.length > 0 && (
        <div style={{marginBottom: '30px'}}>
          <h2 style={{fontFamily: 'Outfit', fontSize: '18px', fontWeight: '600', color: '#1E293B', marginBottom: '16px', textTransform: 'uppercase', borderBottom: '1px solid #CBD5E1', paddingBottom: '6px'}}>Experience</h2>
          {data.work_experience.map((exp, index) => (
            <div key={index} style={{marginBottom: '20px'}}>
              <h3 style={{fontSize: '16px', fontWeight: '600', color: '#1E293B', marginBottom: '4px'}}>{exp.position}</h3>
              <div style={{fontSize: '14px', color: '#64748B', marginBottom: '8px', fontStyle: 'italic'}}>
                {exp.company}
                {exp.location && `, ${exp.location}`}
              </div>
              {exp.description && (
                <p style={{fontSize: '14px', lineHeight: '1.7', color: '#475569'}}>{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {data.education && data.education.length > 0 && (
        <div style={{marginBottom: '30px'}}>
          <h2 style={{fontFamily: 'Outfit', fontSize: '18px', fontWeight: '600', color: '#1E293B', marginBottom: '16px', textTransform: 'uppercase', borderBottom: '1px solid #CBD5E1', paddingBottom: '6px'}}>Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} style={{marginBottom: '16px'}}>
              <h3 style={{fontSize: '16px', fontWeight: '600', color: '#1E293B'}}>{edu.degree} {edu.field && `in ${edu.field}`}</h3>
              <div style={{fontSize: '14px', color: '#64748B', fontStyle: 'italic'}}>
                {edu.institution}
                {edu.location && `, ${edu.location}`}
              </div>
            </div>
          ))}
        </div>
      )}

      {data.skills && data.skills.length > 0 && (
        <div>
          <h2 style={{fontFamily: 'Outfit', fontSize: '18px', fontWeight: '600', color: '#1E293B', marginBottom: '12px', textTransform: 'uppercase', borderBottom: '1px solid #CBD5E1', paddingBottom: '6px'}}>Skills</h2>
          <p style={{fontSize: '14px', lineHeight: '1.8', color: '#475569'}}>
            {data.skills.filter(skill => skill && skill.trim()).join(" • ")}
          </p>
        </div>
      )}
    </div>
  );
}