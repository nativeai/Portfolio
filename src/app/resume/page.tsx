'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Data ─────────────────────────────────────────────────────────────────────

const managementRoles = [
  {
    title: 'Sr. Operations, RevOps & Hardware Manager',
    company: 'BrainTap, Inc',
    period: 'Oct 2023 – Oct 2025 · Hybrid',
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
    period: 'Mar 2021 – Oct 2023 · 2 yrs 8 mos · Remote',
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
]

const businessGrowthRoles = [
  {
    title: 'Business Growth Specialist',
    company: 'BrainTap, Inc',
    period: 'Feb 2020 – Mar 2021 · 1 yr 2 mos · On-Site',
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
]

const customerSupportRoles = [
  {
    title: 'Customer Support',
    company: 'BrainTap, Inc',
    period: 'Feb 2017 – Mar 2021 · 4 yrs 2 mos · On-Site',
    groups: [
      {
        heading: 'Customer Support Operations',
        items: [
          'Provided comprehensive technical support via phone, email, and live chat for BrainTap\'s meditation and brainwave technology products',
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
    label: 'AI Tools & Technologies',
    items: [
      'Claude Code',
      'OpenAI',
      'Google Labs',
      'ElevenLabs',
      'Sora',
      'Suno',
      'Agentic AI',
      'Generative AI',
      'Conversational AI',
      'Multimodal AI',
      'Voice AI',
    ],
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
    label: 'RevOps & Automation',
    items: ['Revenue Operations', 'Workflow Automation', 'Business Process Automation', 'System Integration', 'KPI Management'],
  },
  {
    label: 'Compliance & Regulatory',
    items: ['CE Certification', 'EU Conformity', 'International Market Compliance', 'Safety Documentation', 'Manufacturer Relations'],
  },
  {
    label: 'Creative & Media',
    items: ['Unreal Engine', 'Ableton Live 11', 'Adobe Suite', 'Google Services', 'Stable Diffusion AI'],
  },
  {
    label: 'Business & Admin',
    items: ['Microsoft Office Suite', 'Gusto', 'ADP', 'Tradeshow Operations'],
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function RoleCard({ role }: { role: typeof managementRoles[0] }) {
  return (
    <div className="border border-primary-600/30 rounded-md p-6 bg-primary-800/40">
      <p className="font-display text-lg font-bold text-white">{role.title}</p>
      <p className="text-primary-300 text-sm mt-0.5">{role.company} · <span className="italic">{role.period}</span></p>

      <div className="mt-5 space-y-5">
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
      </div>

      <div className="mt-6 pt-5 border-t border-primary-600/30">
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
  )
}

function AccordionSection({
  title,
  index,
  children,
}: {
  title: string
  index: number
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="border-l-4 border-gold bg-primary-700/50 backdrop-blur-sm rounded-md shadow-custom-dark overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
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
  return (
    <div className="pt-24 pb-24 px-6 sm:px-12 lg:px-24 xl:px-32 max-w-7xl mx-auto">

      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 flex items-end justify-between flex-wrap gap-4"
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

      {/* Accordion sections */}
      <div className="space-y-4">

        <AccordionSection title="Management" index={0}>
          <div className="space-y-4">
            {managementRoles.map((role) => <RoleCard key={role.title} role={role} />)}
          </div>
        </AccordionSection>

        <AccordionSection title="Business Growth" index={1}>
          <div className="space-y-4">
            {businessGrowthRoles.map((role) => <RoleCard key={role.title} role={role} />)}
          </div>
        </AccordionSection>

        <AccordionSection title="Customer Support" index={2}>
          <div className="space-y-4">
            {customerSupportRoles.map((role) => <RoleCard key={role.title} role={role} />)}
          </div>
        </AccordionSection>

        <AccordionSection title="Personal Projects" index={3}>
          <div>
            <p className="text-gold font-display text-lg font-bold mb-1">Unreal Engine</p>
            <p className="text-primary-300 text-sm mb-4">3D Landscape & Cinematic Production</p>
            <div className="aspect-video rounded-md overflow-hidden mb-4">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/uG51UuOWEC4"
                title="Unreal Engine Production"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <ul className="space-y-1.5">
              {[
                'Create 3D landscapes and cinematic productions — camera setup and cinematics using Sequencer',
                'Advanced rendering techniques and post-processing workflows',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-gold text-xs mt-1 shrink-0">●</span>
                  <span className="text-primary-200 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </AccordionSection>

        <AccordionSection title="Tools & Software" index={4}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {toolCategories.map((cat) => (
              <div
                key={cat.label}
                className="border-l-4 border-gold bg-primary-800/50 rounded-md p-4 flex flex-col gap-3"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-gold">{cat.label}</p>
                <div className="flex flex-wrap gap-1.5">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="bg-primary-700/60 border border-gold/15 text-primary-200 rounded px-2.5 py-1 text-xs leading-snug"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </AccordionSection>

      </div>
    </div>
  )
}
