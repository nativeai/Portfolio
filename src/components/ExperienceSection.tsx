'use client'

import { motion } from 'framer-motion'

const paragraphs = [
  "As Director of Operations at BrainTap, Inc., I oversee the company's operational infrastructure across sales & partnerships, customer experience, and logistics. My focus is on building and scaling systems that support a growing commercial footprint while maintaining the discipline required to sustain high-performance teams.",
  "In revenue operations, I have designed and implemented CRM frameworks, pipeline structures, and reporting dashboards that have improved sales consistency and forecasting accuracy. I have also established lead qualification criteria and process standards that reduce variability and strengthen rep-level accountability across the organization.",
  "On the customer experience side, I redesigned support workflows end-to-end — from triage through resolution — reducing SLA response times and improving CSAT scores. I manage an outsourced support team and have built the documentation and training infrastructure that allows the function to scale efficiently without proportional headcount growth.",
  "My operational scope extends to logistics and international compliance, where I manage vendor relationships, oversee fulfillment operations, and have led EU regulatory and certification efforts that positioned the business to expand into new markets with confidence.",
  "On the product side, I serve as Product Owner across multiple product lines — defining product direction, managing requirements, and driving delivery through close collaboration with engineering, QA, and design teams. I build the documentation frameworks and feedback systems that keep products aligned, measurable, and continuously improving.",
]

const keyImpacts = [
  'Designed and deployed RevOps infrastructure that increased pipeline visibility, sales consistency, and forecasting accuracy',
  'Restructured customer support workflows, driving measurable reductions in response times and improvements in customer satisfaction',
  'Built scalable documentation and training systems that enable operational growth without linear cost increases',
  'Led EU compliance and certification initiatives that unlocked international market expansion',
  'Developed cross-functional alignment processes that accelerated execution speed and strengthened organizational accountability',
  'Owned product delivery across multiple product lines — defining requirements, aligning cross-functional teams, and establishing the documentation and feedback infrastructure that kept products on track',
]

const ExperienceSection = () => {
  return (
    <section
      id="work"
      className="relative py-24 px-6 sm:px-12 lg:px-24 xl:px-32 max-w-7xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h2 className="font-display text-3xl font-bold text-white">Experience</h2>
        <div className="w-12 h-1 bg-gold-accent rounded-full mt-3" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto border-l-4 border-gold bg-primary-700/50 backdrop-blur-sm rounded-md p-8 shadow-custom-dark"
      >
        {/* Role header */}
        <h3 className="font-display text-2xl font-bold text-white">Director of Operations</h3>
        <p className="text-primary-300 text-sm mt-1">BrainTap, Inc · Oct 2025 – Present</p>

        {/* Gold divider */}
        <div className="w-full h-px bg-gold/20 mt-6 mb-6" />

        {/* Narrative paragraphs */}
        <div className="space-y-4">
          {paragraphs.map((para, i) => (
            <p key={i} className="text-primary-200 text-base leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        {/* Key Impact */}
        <div className="mt-8">
          <p className="text-gold font-semibold mb-4">Key Impact</p>
          <ul className="space-y-3">
            {keyImpacts.map((impact, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-gold text-xs mt-1.5 shrink-0">●</span>
                <span className="text-primary-200 text-sm leading-relaxed">{impact}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Secondary CTA */}
        <div className="mt-10">
          <a
            href="/resume"
            className="text-gold hover:text-gold-light transition-colors duration-200 text-sm font-medium"
          >
            View Full Resume →
          </a>
        </div>
      </motion.div>
    </section>
  )
}

export default ExperienceSection
