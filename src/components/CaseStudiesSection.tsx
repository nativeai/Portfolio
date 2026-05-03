'use client'

import { motion } from 'framer-motion'

const caseStudies = [
  {
    number: '01',
    title: 'RevOps System Overhaul',
    problem:
      'The absence of a structured CRM and pipeline framework created inconsistent sales performance, poor visibility into deal flow, and an inability to forecast revenue with any reliability.',
    action:
      'Implemented a structured CRM framework, defined clear pipeline stages, established lead qualification criteria, and built reporting dashboards to surface performance data in real time.',
    results: [
      'Improved full-funnel pipeline visibility for leadership and sales teams',
      'Increased consistency across the sales process, reducing dependency on individual rep behavior',
      'Enabled accurate revenue forecasting for the first time',
    ],
  },
  {
    number: '02',
    title: 'Customer Support Optimization',
    problem:
      'Elevated response times and an inconsistent support experience were reducing customer satisfaction, increasing churn risk, and creating operational debt across the team.',
    action:
      'Redesigned core support workflows from triage through resolution, reduced SLA targets, and implemented a documentation and training system to ensure consistency at scale.',
    results: [
      'Materially reduced first-response and resolution times',
      'Improved CSAT scores across inbound support channels',
      'Created a scalable support operation capable of handling growth without proportional headcount increases',
    ],
  },
  {
    number: '03',
    title: 'Operational Process Buildout',
    problem:
      'Disorganized internal processes and a lack of cross-functional alignment were slowing execution, creating confusion over ownership, and limiting the team\'s ability to operate at scale.',
    action:
      'Built structured documentation systems, redesigned core workflows, and established cross-functional alignment processes that created clarity around roles, responsibilities, and handoffs.',
    results: [
      'Increased organizational efficiency across multiple departments',
      'Reduced internal friction and eliminated redundant or unclear processes',
      'Improved team execution speed and accountability',
    ],
  },
]

const CaseStudiesSection = () => {
  return (
    <section
      id="case-studies"
      className="relative py-24 px-6 sm:px-12 lg:px-24 xl:px-32 max-w-7xl mx-auto"
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h2 className="font-display text-3xl font-bold text-white">Case Studies</h2>
        <div className="w-12 h-1 bg-gold-accent rounded-full mt-3" />
      </motion.div>

      {/* Cards */}
      <div className="max-w-4xl mx-auto space-y-8">
        {caseStudies.map((study, index) => (
          <motion.div
            key={study.number}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: index * 0.1 }}
            className="bg-primary-700/40 rounded-md p-8 shadow-custom-dark border border-primary-600/30"
          >
            {/* Number + title */}
            <div className="mb-6">
              <span className="text-gold font-mono text-sm">{study.number}</span>
              <h3 className="font-display text-2xl font-bold text-white mt-1">{study.title}</h3>
            </div>

            {/* PAR columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Problem */}
              <div>
                <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-2">Problem</p>
                <p className="text-primary-200 text-sm leading-relaxed">{study.problem}</p>
              </div>

              {/* Action */}
              <div>
                <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-2">Action</p>
                <p className="text-primary-200 text-sm leading-relaxed">{study.action}</p>
              </div>

              {/* Results */}
              <div>
                <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-2">Results</p>
                <ol className="space-y-2">
                  {study.results.map((result, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-gold font-mono text-xs mt-0.5 shrink-0">{i + 1}.</span>
                      <span className="text-primary-100 text-sm leading-relaxed">{result}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default CaseStudiesSection
