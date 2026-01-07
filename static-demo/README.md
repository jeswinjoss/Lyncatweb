# Lyncat - Static Demo Version

This is a simplified static HTML/CSS/JavaScript version of Lyncat for GitHub Pages deployment.

## What's Included

- ✅ Landing page with hero section
- ✅ Features section
- ✅ Live resume builder demo
- ✅ Basic resume preview
- ✅ PDF export (via browser print)
- ❌ No user accounts (no backend required)
- ❌ No database (resumes not saved)
- ❌ No authentication

## Files

```
static-demo/
├── index.html    # Main HTML file
├── style.css     # All styles
├── script.js     # JavaScript functionality
└── README.md     # This file
```

## How to Deploy to GitHub Pages

### Option 1: Direct Upload

1. Go to your GitHub repository
2. Create a new folder or use the root directory
3. Upload these 3 files:
   - `index.html`
   - `style.css`
   - `script.js`
4. Go to Settings → Pages
5. Select the branch and folder
6. Save and wait for deployment

### Option 2: Using Git

```bash
# Navigate to your repo
cd your-repo-name

# Copy the files
cp /app/static-demo/* ./

# Add and commit
git add index.html style.css script.js
git commit -m "Add Lyncat static demo"
git push origin main

# Enable GitHub Pages in Settings → Pages
```

## Limitations of Static Version

This version is a DEMO only:
- ✅ Works without backend/database
- ✅ Fast and easy to deploy
- ❌ Cannot save resumes (no database)
- ❌ No user accounts
- ❌ No edit existing resumes
- ❌ Limited to browser print for PDF

## Full Version

For the complete Lyncat experience with:
- User authentication
- Save multiple resumes
- Edit anytime
- Multiple templates
- Better PDF export
- Cloud storage

Visit: **https://career-booster-29.preview.emergentagent.com**

Or deploy the full version on Emergent platform.

## Customization

### Change Colors

Edit `style.css`:
```css
/* Primary color (Indigo) */
#4F46E5 → Your color

/* Accent color (Orange) */
#F97316 → Your color
```

### Add More Sections

Edit `index.html` to add:
- Work Experience section
- Education section
- Certifications
- More fields

### Improve PDF Export

The current PDF uses browser print. For better quality:
1. Use libraries like `jsPDF` or `html2pdf.js`
2. Or link to the full version for professional PDF export

## License

This is a demo version. Full app available at Emergent.

---

**Note**: This static version is meant for demonstration purposes. For production use with full features, deploy the complete React + FastAPI version on Emergent.