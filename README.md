# Resume Generator

This project generates resume and CV HTML files from a Handlebars template with separate JSON data.

## Files

- `template.hbs` - Handlebars template for the resume HTML
- `data.json` - All resume data (personal info, jobs, skills, translations, etc.)
- `generate_html.js` - Node.js script to generate a single index.html file from the template
- `generate_pdfs.js` - Original script to generate PDFs from HTML files
- `index.html` - Single HTML file containing all resume/CV variations (English/Russian)

## Structure

### Data Structure (`data.json`)

The JSON file contains:

- `info` - Personal information (name, position)
- `links` - Social and contact links with icons
- `skills` - Primary and secondary skills
- `jobs` - Work experience with projects and achievements in both languages
- `translations` - UI text translations for English and Russian
- `navigation` - Language and type switching configuration
- `seo` - Comprehensive SEO data including meta tags and startup-targeted content

### Template Features

- **SEO-friendly**: All content is present in the DOM but visually hidden for search engines
- **Multi-language**: Supports English and Russian
- **Multi-type**: Supports both Resume and CV formats
- **Responsive**: Works on desktop and mobile
- **Print-friendly**: Optimized for printing

## Usage

### Install Dependencies

```bash
npm install
```

### Generate HTML File

```bash
npm run generate-html
```

This will generate a single `index.html` file that contains all 4 variations:
- Resume in English
- Resume in Russian  
- CV in English
- CV in Russian

The file dynamically shows the appropriate content based on URL parameters:
- `?lang=en` or `?lang=ru` - Language selection
- `?type=resume` or `?type=cv` - Document type selection
- Defaults to English Resume if no parameters provided

### Generate PDFs (Original Functionality)

```bash
npm run generate
```

## Template Logic

The template automatically:

1. **Contains all data** for all 4 variations (resume/CV × English/Russian)
2. **Dynamically shows content** based on URL parameters or document lang attribute
3. **Filters jobs** based on type (resume excludes CV-only jobs)
4. **Selects language** content (achievements, translations)
5. **Generates navigation** links for switching between languages and types
6. **Includes SEO content** that's hidden but present for search engines
7. **Sets up PDF links** based on the current type and language

## Customization

### Adding New Languages

1. Add translations to `data.json` under `translations`
2. Add language to the `navigation.langs` object
3. Update the `generate_html.js` script to include the new language

### Adding New Job Types

1. Add the type to the `navigation.types` object
2. Update the filtering logic in `generate_html.js`
3. Add any type-specific translations

### Modifying Content

Simply edit `data.json` to update:
- Personal information
- Work experience
- Skills
- Links
- Translations

The template will automatically reflect all changes when regenerated.

## SEO Features

The generated HTML includes comprehensive SEO optimization:

### Meta Tags & Structured Data
- **Primary Meta Tags**: Title, description, keywords, author, robots
- **Open Graph Tags**: For social media sharing (Facebook, LinkedIn)
- **Twitter Cards**: Optimized for Twitter sharing
- **Structured Data**: JSON-LD schema.org markup for rich snippets
- **Additional SEO**: Language, revisit-after, distribution, theme-color

### Startup-Targeted SEO Content
- **Value Propositions**: Highlighting startup-relevant experience
- **Impact Metrics**: Quantified achievements (100,000+ users, 40% performance improvement)
- **Startup Skills**: Rapid prototyping, technical leadership, MVP development
- **Industry Experience**: Fintech, healthcare, e-commerce, SaaS, etc.
- **Technology Stack**: Comprehensive list of relevant technologies
- **Keywords**: Optimized for startup founder searches

### Content Strategy
- **Dual Content**: Both traditional resume content and startup-focused content
- **Hidden SEO Content**: All content present in DOM but visually hidden
- **Rich Keywords**: Targeting "startup developer", "frontend engineer startup", etc.
- **Performance Metrics**: Quantified impact for credibility
- **Industry Coverage**: Broad industry experience for versatility

## Browser Compatibility

The generated HTML works in all modern browsers and includes:
- Responsive design
- Print styles
- Accessibility features
- Progressive enhancement 