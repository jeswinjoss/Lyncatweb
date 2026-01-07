// Update preview in real-time
function updatePreview() {
    const fullName = document.getElementById('fullName').value || 'Your Name';
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const location = document.getElementById('location').value;
    const summary = document.getElementById('summary').value;
    const skillsText = document.getElementById('skills').value;

    // Update name
    document.getElementById('previewName').textContent = fullName;

    // Update contact info
    const contactParts = [];
    if (email) contactParts.push(email);
    if (phone) contactParts.push(phone);
    if (location) contactParts.push(location);
    
    const contactElement = document.getElementById('previewContact');
    contactElement.textContent = contactParts.join(' • ');

    // Update summary
    const summarySection = document.getElementById('previewSummary');
    const summaryText = document.getElementById('previewSummaryText');
    if (summary) {
        summarySection.style.display = 'block';
        summaryText.textContent = summary;
    } else {
        summarySection.style.display = 'none';
    }

    // Update skills
    const skillsSection = document.getElementById('previewSkills');
    const skillsList = document.getElementById('previewSkillsList');
    
    if (skillsText) {
        skillsSection.style.display = 'block';
        const skills = skillsText.split(',').map(s => s.trim()).filter(Boolean);
        skillsList.innerHTML = skills.map(skill => 
            `<span class="skill-badge">${skill}</span>`
        ).join('');
    } else {
        skillsSection.style.display = 'none';
    }
}

// Auto-update on input
document.addEventListener('DOMContentLoaded', () => {
    const inputs = ['fullName', 'email', 'phone', 'location', 'summary', 'skills'];
    inputs.forEach(id => {
        const element = document.getElementById(id);
        element.addEventListener('input', updatePreview);
    });
});

// Download as PDF (simple version - uses print)
function downloadPDF() {
    const fullName = document.getElementById('fullName').value || 'resume';
    const fileName = fullName.toLowerCase().replace(/\s+/g, '-') + '-resume.pdf';
    
    // Create a printable version
    const preview = document.getElementById('resumePreview').cloneNode(true);
    const printWindow = window.open('', '', 'width=800,height=600');
    
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>${fileName}</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body {
                    font-family: 'DM Sans', Arial, sans-serif;
                    padding: 40px;
                    background: white;
                }
                h1 { font-family: 'Outfit', Arial, sans-serif; font-size: 32px; margin-bottom: 8px; }
                h2 { font-family: 'Outfit', Arial, sans-serif; font-size: 18px; color: #4F46E5; margin: 20px 0 12px; font-weight: 600; }
                .resume-header { border-bottom: 3px solid #4F46E5; padding-bottom: 16px; margin-bottom: 24px; }
                .resume-contact { color: #64748B; font-size: 14px; }
                .resume-section { margin-bottom: 24px; }
                .skills-container { display: flex; flex-wrap: wrap; gap: 8px; }
                .skill-badge {
                    background: #EEF2FF;
                    color: #4F46E5;
                    padding: 6px 12px;
                    border-radius: 6px;
                    font-size: 13px;
                    display: inline-block;
                }
                @media print {
                    body { padding: 20px; }
                }
            </style>
        </head>
        <body>
            ${preview.innerHTML}
        </body>
        </html>
    `);
    
    printWindow.document.close();
    
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 250);
    
    alert('PDF download initiated! Please use your browser\'s print dialog to save as PDF.');
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});