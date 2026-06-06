'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Data ─────────────────────────────────────────────────────────────────────

const timelineRoles = [
  {
    title: 'Sr. Operations, RevOps & Hardware Manager',
    company: 'BrainTap, Inc',
    period: 'Oct 2023 – Oct 2025',
    type: 'Hybrid',
    category: 'Management',
    groups: [
      {
        heading: 'Operations & Project Management',
        items: [
          'Lead cross-functional projects covering hardware, software, and RevOps initiatives',
          'Develop and refine SOPs to improve efficiency across multi-system company operations',
          'Manage KPIs, system reviews, and process improvements to align with executive initiatives',
          'Oversee international operations, project planning, and system maintenance',
        ],
      },
      {
        heading: 'Product & Compliance Management',
        items: [
          'Key Product Owner for BrainTap and NeuralChek products — shaped product direction, managed requirements, and ensured successful delivery through collaboration with engineering, QA, and design teams',
          'Coordinate with manufacturers to secure safety documentation and product certifications',
          'Ensure compliance with CE and European Union conformity requirements',
          'Manage digital strategy, content planning, and audio session deployment',
        ],
      },
      {
        heading: 'RevOps & Systems Administration',
        items: [
          'Administer AWS, Microsoft, Stripe, and Apple Developer platforms',
          'Design and optimize automation workflows to streamline business operations',
          'Create detailed business requirement documents and user story mapping for system improvements',
          'Support cross-platform integrations and digital infrastructure growth',
        ],
      },
      {
        heading: 'Leadership & Collaboration',
        items: [
          'Partner directly with executives and stakeholders to execute business growth strategies',
          'Provide training, support, and implementation guidance across systems and teams',
          'Oversee Customer Success Manager and team, driving customer satisfaction initiatives',
          'Deliver strong communication across technical and non-technical teams',
        ],
      },
    ],
    achievements: [
      'Led product ownership initiatives for BrainTap and NeuralChek, driving enhanced user experience and quality through strategic collaboration with engineering, QA, and design',
      'Spearheaded compliance initiatives to secure international market access, ensuring adherence to CE and EU conformity requirements',
      'Executed Sr. Operations initiatives that optimized cross-functional workflows, improving efficiency across hardware development, software deployment, and RevOps',
    ],
  },
  {
    title: 'Customer Success Manager',
    company: 'BrainTap, Inc',
    period: 'Mar 2021 – Oct 2023',
    type: 'Remote',
    category: 'Management',
    groups: [
      {
        heading: 'Strategic Leadership & Operations',
        items: [
          'Lead Customer Success operations, delivering KPIs and strategic recommendations directly to executive leadership',
          'Drive initiatives to improve customer experience, retention, and referrals across all touchpoints',
          'Collaborate with leadership to design job descriptions and scale the Customer Success function',
        ],
      },
      {
        heading: 'Systems & Infrastructure',
        items: [
          'Built and optimized customer support infrastructure in HubSpot — pipelines, workflows, chatbots, SLAs, dashboards, knowledge base, and feedback surveys (CSAT, NPS)',
          'Administered system access in HubSpot, Infusionsoft, Oscommerce, Post Affiliate Pro, Zoom, and Confluence',
          'Developed and enforced SOPs to streamline workflows, reduce resolution times, and enhance service quality',
        ],
      },
      {
        heading: 'Team Management & Training',
        items: [
          'Trained, coached, and upskilled customer success teams including international call center operations',
          'Implemented HubSpot certifications and ongoing development programs for team excellence',
          'Created training videos and documentation for internal teams and external customers',
        ],
      },
      {
        heading: 'Client Relations & Business Development',
        items: [
          'Partnered with healthcare professionals and affiliates to deliver onboarding, training, and ROI-driven implementation',
          'Managed affiliate program operations — commissions, campaign execution, and marketing collaboration',
          'Oversaw customer invoicing, refunds, and payments across Authorize.net, PayPal, and Stripe',
        ],
      },
    ],
    achievements: [
      'Streamlined workflows and automations, resulting in improved SLA adherence, faster issue resolution, and stronger customer retention',
      'Established scalable support systems and feedback loops that elevated CSAT scores and strengthened product improvement cycles',
      'Successfully managed global communications and partnerships, ensuring consistent, high-quality service across diverse markets',
    ],
  },
  {
    title: 'Business Growth Specialist',
    company: 'BrainTap, Inc',
    period: 'Feb 2020 – Mar 2021',
    type: 'On-Site',
    category: 'Business Growth',
    groups: [
      {
        heading: 'Sales & Revenue Growth',
        items: [
          'Drove new business opportunities through direct sales, partner collaborations, and trade show events',
          'Executed sales strategies that increased visibility and strengthened affiliate-driven revenue',
          'Supported the full sales process — from lead generation and qualification to closing new partnerships',
        ],
      },
      {
        heading: 'Partner & Affiliate Program Development',
        items: [
          'Built and maintained strong relationships with partners and affiliates to expand market reach',
          'Produced training videos and resources to streamline affiliate onboarding and improve adoption',
          'Assisted in program implementation to ensure partners had the tools and knowledge to succeed',
        ],
      },
      {
        heading: 'Trade Show & Event Sales',
        items: [
          'Represented the company at trade shows, driving awareness and capturing new leads',
          'Conducted live product demonstrations and presentations to attract prospects and strengthen relationships',
          'Collaborated with the marketing team to maximize impact through cohesive branding and outreach',
        ],
      },
    ],
    achievements: [
      'Drove new business growth through a multi-channel approach combining direct sales, strategic partnerships, and high-impact trade show presence',
      'Streamlined affiliate onboarding through comprehensive training resources, improving partner adoption and program effectiveness',
      'Enhanced partner integration and success through direct implementation support, ensuring smooth transitions and sustained performance',
    ],
  },
  {
    title: 'Customer Support',
    company: 'BrainTap, Inc',
    period: 'Feb 2017 – Mar 2021',
    type: 'On-Site',
    category: 'Customer Support',
    groups: [
      {
        heading: 'Customer Support Operations',
        items: [
          "Provided comprehensive technical support via phone, email, and live chat for BrainTap's meditation and brainwave technology products",
          'Troubleshot hardware and software issues across iOS, Android, and desktop applications',
          'Maintained detailed customer interaction records in CRM systems, ensuring continuity and quality of service',
        ],
      },
      {
        heading: 'Technical Problem Resolution',
        items: [
          'Diagnosed and resolved complex technical issues with BrainTap headsets, mobile apps, and subscription services',
          'Collaborated with development teams to identify software bugs and provide detailed user feedback for product improvements',
          'Created and maintained troubleshooting guides and FAQ documentation for common customer issues',
        ],
      },
      {
        heading: 'Customer Experience',
        items: [
          'Achieved and maintained high customer satisfaction scores through empathetic communication and efficient problem resolution',
          'Processed returns, exchanges, and warranty claims while ensuring positive customer outcomes',
          'Educated customers on product features and optimal usage to maximise their wellness experience',
        ],
      },
    ],
    achievements: [
      'Consistently exceeded response time and resolution metrics, contributing to improved overall customer satisfaction',
      'Developed expertise in wellness technology products, becoming a trusted resource for both customers and internal teams',
      'Built a strong foundation in customer service best practices that informed later management approaches',
    ],
  },
]

const toolCategories = [
  {
    label: 'AI Tools',
    items: ['Claude Code', 'OpenAI', 'Google Labs', 'ElevenLabs', 'Sora', 'Suno', 'Stable Diffusion AI'],
  },
  {
    label: 'AI Expertise',
    items: ['Agentic AI', 'Generative AI', 'Conversational AI', 'Multimodal AI', 'Voice AI'],
  },
  {
    label: 'CRM & Support Platforms',
    items: ['HubSpot', 'Infusionsoft', 'OSCommerce', 'Drift Chat'],
  },
  {
    label: 'Payment & E-commerce',
    items: ['Stripe', 'PayPal', 'Authorize.net', 'Lead Dyno', 'Post Affiliate Pro', 'Google Play', 'Apple App Store'],
  },
  {
    label: 'Project Management',
    items: ['Asana', 'ClickUp', 'JIRA', 'Confluence', 'Bitbucket', 'Slack', 'Microsoft Teams', 'Zoom', 'Calendly'],
  },
  {
    label: 'Platform Administration',
    items: ['AWS Management Console', 'Microsoft Platform Admin', 'Apple Developer Platform', 'Stripe Administration'],
  },
  {
    label: 'Competencies',
    items: ['Revenue Operations', 'Workflow Automation', 'Business Process Automation', 'System Integration', 'KPI Management', 'Tradeshow Operations'],
  },
  {
    label: 'Certifications & Compliance',
    items: ['CE Certification', 'EU Conformity', 'International Market Compliance', 'Safety Documentation', 'Manufacturer Relations'],
  },
  {
    label: 'Creative & Media',
    items: ['Unreal Engine', 'Ableton Live 11', 'Adobe Suite', 'Google Services'],
  },
  {
    label: 'Business & Admin',
    items: ['Microsoft Office Suite', 'Gusto', 'ADP'],
  },
]

// ─── Timeline entry ────────────────────────────────────────────────────────────

function TimelineEntry({
  role,
  index,
  open,
  onToggle,
  isLast,
}: {
  role: typeof timelineRoles[0]
  index: number
  open: boolean
  onToggle: () => void
  isLast: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-10 sm:pl-14"
    >
      {/* Vertical line */}
      {!isLast && (
        <div className="absolute left-[11px] sm:left-[15px] top-6 bottom-0 w-px bg-gradient-to-b from-gold/60 via-gold/20 to-transparent" />
      )}

      {/* Dot */}
      <div className="absolute left-0 top-1.5 flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8">
        <div className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${open ? 'bg-gold border-gold scale-125' : 'bg-primary-800 border-gold/60'}`} />
      </div>

      {/* Card header — always visible, clickable */}
      <button
        onClick={onToggle}
        className="w-full text-left group mb-1"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-display text-base sm:text-lg font-bold text-white group-hover:text-gold transition-colors duration-200 leading-snug">
              {role.title}
            </p>
            <p className="text-primary-300 text-sm mt-0.5">
              {role.company}
              <span className="text-primary-500 mx-1.5">·</span>
              <span className="italic">{role.period}</span>
              <span className="text-primary-500 mx-1.5">·</span>
              <span className="text-xs uppercase tracking-wide text-primary-400">{role.type}</span>
            </p>
          </div>
          <div className="flex items-center gap-2 mt-1 shrink-0">
            <span className="hidden sm:block text-[10px] uppercase tracking-widest text-gold/60 border border-gold/20 rounded px-2 py-0.5">
              {role.category}
            </span>
            <svg
              className={`w-4 h-4 text-gold/60 transition-transform duration-300 shrink-0 ${open ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </button>

      {/* Expandable detail */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-4 mb-6 border border-primary-600/25 rounded-md p-5 bg-primary-800/35 frosted space-y-5">
              {role.groups.map((group) => (
                <div key={group.heading}>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gold mb-2">{group.heading}</p>
                  <ul className="space-y-1.5">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-gold text-xs mt-1 shrink-0">●</span>
                        <span className="text-primary-200 text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="pt-4 border-t border-primary-600/30">
                <p className="text-xs font-semibold uppercase tracking-widest text-gold mb-3">Key Achievements</p>
                <ul className="space-y-1.5">
                  {role.achievements.map((a) => (
                    <li key={a} className="flex items-start gap-2">
                      <span className="text-gold text-xs mt-1 shrink-0">✦</span>
                      <span className="text-primary-100 text-sm leading-relaxed">{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Filterable tools section ─────────────────────────────────────────────────

function ToolsSection() {
  const [active, setActive] = useState<string>('All')

  const allItems = toolCategories.flatMap((cat) =>
    cat.items.map((item) => ({ item, category: cat.label }))
  )

  const filters = ['All', ...toolCategories.map((c) => c.label)]

  const visible = active === 'All'
    ? allItems
    : allItems.filter((t) => t.category === active)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-gold mb-5">Expertise & Toolset</p>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 ${
              active === f
                ? 'bg-gold text-primary-900 border-gold font-semibold'
                : 'border-primary-600/50 text-primary-300 hover:border-gold/50 hover:text-gold'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Tag cloud */}
      <motion.div layout className="flex flex-wrap gap-2">
        <AnimatePresence mode="popLayout">
          {visible.map(({ item, category }) => (
            <motion.span
              key={`${category}-${item}`}
              layout
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.18 }}
              className="bg-primary-700/60 border border-gold/15 text-primary-200 rounded-full px-3 py-1 text-xs leading-snug hover:border-gold/40 hover:text-white transition-colors duration-150"
            >
              {item}
            </motion.span>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

// ─── Accordion (for non-timeline sections) ────────────────────────────────────

function AccordionSection({
  title,
  index,
  open,
  onToggle,
  children,
}: {
  title: string
  index: number
  open: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="border-l-4 border-gold bg-primary-700/40 frosted rounded-md shadow-custom-dark overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left group"
      >
        <span className="font-display text-xl font-bold text-white group-hover:text-gold transition-colors duration-200">
          {title}
        </span>
        <svg
          className={`w-5 h-5 text-gold transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            <div className="px-6 pb-6 border-t border-primary-600/30 pt-5 space-y-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ResumePage() {
  const [openTimelineIndex, setOpenTimelineIndex] = useState<number | null>(null)
  const toggleTimeline = (i: number) => setOpenTimelineIndex(prev => prev === i ? null : i)

  return (
    <div className="pt-24 pb-24 px-6 sm:px-12 lg:px-24 xl:px-32 max-w-5xl mx-auto">

      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-14 flex items-end justify-between flex-wrap gap-4"
      >
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Resume</h1>
          <div className="w-12 h-1 bg-gold-accent rounded-full mt-3" />
        </div>
        <a
          href="/images/ShandonResume.pdf"
          download
          className="border border-primary-400 text-primary-100 px-5 py-2 rounded-md text-sm hover:border-gold hover:text-gold transition-all duration-200"
        >
          Download PDF
        </a>
      </motion.div>

      {/* Experience heading */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-xs font-semibold uppercase tracking-widest text-gold mb-8"
      >
        Experience
      </motion.p>

      {/* Timeline */}
      <div className="space-y-6 mb-16">
        {timelineRoles.map((role, i) => (
          <TimelineEntry
            key={role.title}
            role={role}
            index={i}
            open={openTimelineIndex === i}
            onToggle={() => toggleTimeline(i)}
            isLast={i === timelineRoles.length - 1}
          />
        ))}
      </div>

      {/* Tools & Software — filterable tag cloud */}
      <ToolsSection />

    </div>
  )
}
