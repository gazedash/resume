const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

// Register custom helpers
Handlebars.registerHelper('eq', function(a, b) {
    return a === b;
});

Handlebars.registerHelper('lookup', function(obj, key) {
    return obj[key];
});

// Load data
const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'));

// Load template
let templateSource = fs.readFileSync(path.join(__dirname, 'template.hbs'), 'utf8');
let template = Handlebars.compile(templateSource);

// Generate PDF URLs based on host
function getPdfUrl(type, lang, host) {
    let pdfHost = `https://raw.githubusercontent.com/gazedash/resume/master/`;
    
    if (host.includes('ru.gazedash.com')) {
        pdfHost = `https://ru.gazedash.com/resume/`;
    } else if (host.includes('gazedash.com')) {
        pdfHost = `https://gazedash.com/resume/`;
    }
    
    return pdfHost + `${type}_${lang}.pdf`;
}

// Filter jobs based on type
function filterJobs(jobs, type) {
    if (type === 'resume') {
        return jobs.filter(job => job.type !== 'cv');
    }
    return jobs;
}

// Process jobs to set correct achievements based on language
function processJobsForLanguage(jobs, lang) {
    return jobs.map(job => ({
        ...job,
        projects: job.projects.map(project => ({
            ...project,
            achievements: lang === 'ru' ? project.achievements_ru : project.achievements
        }))
    }));
}

// Process SEO data to replace template variables
function processSeoData(seoData, site) {
    const processedData = JSON.parse(JSON.stringify(seoData));
    if (processedData.meta && processedData.meta.og && processedData.meta.og.url) {
        processedData.meta.og.url = processedData.meta.og.url.replace('{{info.site}}', site);
    }
    return processedData;
}

// Process template data to replace template variables in JavaScript
function processTemplateData(templateData, site, name) {
    const processedData = JSON.parse(JSON.stringify(templateData));
    
    // Replace template variables in the template source
    const templateSource = fs.readFileSync(path.join(__dirname, 'template.hbs'), 'utf8');
    const processedSource = templateSource
        .replace(/\{\{info\.site\}\}/g, site)
        .replace(/\{\{info\.name\}\}/g, name);
    
    return { processedData, processedSource };
}

// Prepare template data with all combinations
const templateData = {
    ...data,
    // Process SEO data to replace template variables
    seo: processSeoData(data.seo, data.info.site),
    // Resume English jobs
    resumeEnJobs: processJobsForLanguage(filterJobs(data.jobs, 'resume'), 'en'),
    // Resume Russian jobs
    resumeRuJobs: processJobsForLanguage(filterJobs(data.jobs, 'resume'), 'ru'),
    // CV English jobs
    cvEnJobs: processJobsForLanguage(filterJobs(data.jobs, 'cv'), 'en'),
    // CV Russian jobs
    cvRuJobs: processJobsForLanguage(filterJobs(data.jobs, 'cv'), 'ru'),
    // All jobs for SEO content
    allJobs: data.jobs,
    // Default values (will be overridden by JavaScript)
    lang: 'en',
    type: 'resume',
    pdfUrl: getPdfUrl('resume', 'en', data.info.site),
    fileTitle: data.translations.resumeInPdf.en,
    workExpTitle: data.translations.workExp.en,
    keySkillsLabel: data.translations.keySkills.en,
    addSkillsLabel: data.translations.addSkills.en,
    linksTitle: data.translations.links.en,
    nextLang: data.navigation.langs.en,
    nextType: data.navigation.types.resume,
    version: `v${Date.now()}`
};

// Process template source to replace template variables
const { processedSource } = processTemplateData(templateData, data.info.site, data.info.name);
templateSource = processedSource;
template = Handlebars.compile(templateSource);

// Generate single HTML file
const html = template(templateData);

// Write to file
const filename = 'index.html';
fs.writeFileSync(path.join(__dirname, filename), html);
console.log(`Generated: ${filename}`);

console.log('HTML generation complete!'); 