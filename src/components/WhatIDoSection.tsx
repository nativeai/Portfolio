'use client'

import { motion } from 'framer-motion'

const cards = [
  {
    title: 'AI Strategy & Implementation',
    problem: 'Your business is surrounded by AI tools but none of them are working together.',
    symptoms: [
      'Workflows that could be automated are still being done manually',
      'No clear strategy for where AI actually creates leverage in your operations',
      'Disconnected tools and platforms that could be integrated but aren\'t',
    ],
    resolution:
      'I build practical AI strategies and implement the automations, integrations, and prompt frameworks that turn AI from a buzzword into a measurable business advantage — from workflow automation and AI-powered tools to full agentic and conversational system builds.',
  },
  {
    title: 'Revenue Operations',
    problem: 'Scaling is breaking your revenue systems.',
    symptoms: [
      'CRM is disorganized with no clear pipeline structure',
      'Sales process is inconsistent across reps and channels',
      'Reporting lacks the clarity needed to forecast accurately',
    ],
    resolution:
      'I design and implement structured RevOps systems that create full pipeline visibility and drive consistent, measurable revenue growth.',
  },
  {
    title: 'Product Operations',
    problem: 'Your product has no clear ownership or delivery structure.',
    symptoms: [
      'Requirements shift with every stakeholder conversation and nothing ships cleanly',
      'Engineering, QA, and design teams lack a central point of coordination',
      'Product direction changes without a framework to evaluate priorities or measure outcomes',
    ],
    resolution:
      'I bring product ownership structure to your team — defining requirements, managing cross-functional delivery, and building the documentation and feedback systems that keep products on track and continuously improving.',
  },
  {
    title: 'Operational Execution',
    problem: 'Operational friction is slowing your team down.',
    symptoms: [
      'Bottlenecks forming across departments with no clear ownership',
      'Lack of documentation and training leads to repeated errors',
      'Internal processes are inefficient and difficult to scale',
    ],
    resolution:
      'I build scalable operational frameworks that improve execution speed, cross-functional clarity, and team accountability.',
  },
  {
    title: 'Customer Experience',
    problem: 'Customer support is inconsistent and reactive.',
    symptoms: [
      'Response times are too long and SLAs are frequently missed',
      'CSAT scores reflect a fragmented or poor support experience',
      'Support workflows are undocumented and difficult to train',
    ],
    resolution:
      'I optimize customer support systems to reduce response times, improve satisfaction scores, and build a scalable support operation.',
  },
  {
    title: 'Logistics & Compliance',
    problem: 'Logistics and compliance are blocking international growth.',
    symptoms: [
      'Vendor relationships are inefficient and poorly managed',
      'Inventory or fulfillment challenges are creating delays',
      'Regulatory complexity — including EU compliance and certifications — is unresolved',
    ],
    resolution:
      'I streamline logistics operations and lead global compliance initiatives to ensure your business can expand with confidence.',
  },
]

const WhatIDoSection = () => {
  return (
    <section
      id="about"
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
        <h2 className="font-display text-3xl font-bold text-white">What I Do</h2>
        <div className="w-12 h-1 bg-gold-accent rounded-full mt-3" />
      </motion.div>

      {/* 3×2 grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="border-l-4 border-gold bg-primary-700/50 backdrop-blur-sm rounded-md p-6 shadow-custom-dark flex flex-col"
          >
            <h3 className="font-display text-xl font-semibold text-white">{card.title}</h3>
            <p className="text-primary-200 text-sm mt-2 italic">{card.problem}</p>

            <ul className="mt-4 space-y-2 flex-1">
              {card.symptoms.map((symptom) => (
                <li key={symptom} className="flex items-start gap-2">
                  <span className="text-gold mr-2 mt-0.5 text-xs leading-5">●</span>
                  <span className="text-primary-200 text-sm">{symptom}</span>
                </li>
              ))}
            </ul>

            <p className="mt-4 text-primary-100 text-sm border-t border-primary-600/40 pt-4">
              {card.resolution}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default WhatIDoSection
