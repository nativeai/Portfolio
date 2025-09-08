'use client'

import Bar from "../../components/Bar"
import ResumeCard from "../../components/ResumeCard"
import { languages, tools, containers } from "../../data"
import ReactPlayer from "react-player"

const handleChange = () => {
  console.log("playing")
}

const handleProgress = ({ playedSeconds: secondsPlayed }: { playedSeconds: number }) => {
  if (secondsPlayed > 1) {
    console.log(secondsPlayed)
  }
}

export default function ResumePage() {
  return (
    <div className="flex flex-col flex-grow px-4 py-2 overflow-hidden h-full">
      {/* Resume Card with Navigation */}
      <ResumeCard />
      
      <div className="flex-grow overflow-y-auto scrollbar-hide">
        <div className="text-sm sm:text-base font-medium tracking-wide sm:tracking-wider py-4">
      {/* Experience Sections Container */}
      <div className="space-y-4 sm:space-y-6">
        <details className="cursor-pointer border border-gray-400 rounded-lg hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-200"
        >
          <summary className="font-semibold p-3 sm:p-4 text-lg sm:text-xl md:text-2xl hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-t-lg transition-colors duration-200">Management</summary>
          <div className="px-3 sm:px-4 md:px-6 py-4 sm:py-6 flex flex-col space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-semibold text-blue-600 dark:text-blue-400">Manager, Customer Success</h3> 
              <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                <span className="font-medium">BrainTap, Inc</span> • <span className="italic">2017 – Present</span>
              </div>
              <div className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-gray-700 dark:text-gray-200 space-y-4">
                
                <div className="space-y-3">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-300 uppercase tracking-wide">Strategic Leadership & Operations</h4>
                  <ul className="list-disc list-outside ml-5 space-y-2">
                    <li>Lead Customer Success operations, delivering KPIs and strategic recommendations directly to executive leadership</li>
                    <li>Drive initiatives to improve customer experience, retention, and referrals across all touchpoints</li>
                    <li>Collaborate with leadership to design job descriptions and scale Customer Success function in alignment with company goals</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-300 uppercase tracking-wide">Systems & Infrastructure</h4>
                  <ul className="list-disc list-outside ml-5 space-y-2">
                    <li>Built and optimized customer support infrastructure in <strong>HubSpot</strong>, including pipelines, workflows, chatbots, SLAs, dashboards, knowledge base, and feedback surveys (CSAT, NPS)</li>
                    <li>Administered system access and permissions in <strong>HubSpot, Infusionsoft, Oscommerce, Post Affiliate Pro, Zoom, and Confluence</strong>, ensuring cross-team alignment</li>
                    <li>Developed and enforced SOPs to streamline workflows, reduce resolution times, and enhance service quality across call, email, and chat channels</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-300 uppercase tracking-wide">Team Management & Training</h4>
                  <ul className="list-disc list-outside ml-5 space-y-2">
                    <li>Trained, coached, and upskilled customer success teams, including international call center operations</li>
                    <li>Implemented <strong>HubSpot certifications</strong> and ongoing development programs for team excellence</li>
                    <li>Created training videos and documentation for internal teams and external customers to drive adoption and troubleshooting success</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-300 uppercase tracking-wide">Client Relations & Business Development</h4>
                  <ul className="list-disc list-outside ml-5 space-y-2">
                    <li>Partnered with healthcare professionals and affiliates to deliver onboarding, training, and ROI-driven implementation of BrainTap technologies</li>
                    <li>Managed affiliate program operations, ensuring accurate commissions, campaign execution, and close collaboration with marketing</li>
                    <li>Oversaw customer invoicing, refunds, and payments across <strong>Authorize.net, PayPal, and Stripe</strong>, maintaining accuracy and satisfaction</li>
                  </ul>
                </div>
                
                <div className="mt-5 pt-4 border-t border-gray-300 dark:border-gray-600">
                  <h4 className="text-sm sm:text-base font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-3">Key Achievements</h4>
                  <ul className="list-disc list-outside ml-5 space-y-2">
                    <li>Streamlined workflows and automations, resulting in improved SLA adherence, faster issue resolution, and stronger customer retention</li>
                    <li>Established scalable support systems and feedback loops that elevated customer satisfaction scores and strengthened product improvement cycles</li>
                    <li>Successfully managed global communications and partnerships, ensuring consistent, high-quality service across diverse markets</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </details>

        <details className="cursor-pointer border border-gray-400 rounded-lg hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-200">
          <summary className="font-semibold p-3 sm:p-4 text-lg sm:text-xl md:text-2xl hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-t-lg transition-colors duration-200">
            Personal Projects
          </summary>

          <div className="px-3 sm:px-4 md:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
            <div className="space-y-3">
              <h3 className="text-lg sm:text-xl font-semibold text-blue-600 dark:text-blue-400">Unreal Engine</h3>
              
              <div className="space-y-4">
                <h4 className="text-base sm:text-lg font-medium text-gray-800 dark:text-gray-200">Video Production</h4>
                <div className="relative w-full max-w-2xl mx-auto">
                  <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
                    <ReactPlayer
                      className="react-player"
                      url="https://www.youtube.com/watch?v=uG51UuOWEC4"
                      width="100%"
                      height="100%"
                      onReady={handleChange}
                      controls={true}
                      onProgress={handleProgress}
                    />
                  </div>
                </div>
                <div className="text-sm sm:text-base text-gray-700 dark:text-gray-200 space-y-2">
                  <div className="flex items-start space-x-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Creating 3D landscapes and cinematic productions, setup camera and cinematics using sequencer</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Advanced rendering techniques and post-processing workflows</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </details>

        <details className="cursor-pointer border border-gray-400 rounded-lg hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-200"
        >
          <summary className="font-semibold p-3 sm:p-4 text-lg sm:text-xl md:text-2xl hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-t-lg transition-colors duration-200">Tools & Software</summary>
          <div className="px-3 py-4 sm:px-6 sm:py-6 mx-auto max-w-full space-y-6 sm:space-y-8">
            
            {/* Customer Relationship Management */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-300 dark:border-gray-600 pb-2">
                Customer Relationship Management
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {[
                  { name: "Hubspot, Infusionsoft", level: "85" },
                  { name: "OSCommerce", level: "90" },
                  { name: "Drift Chat", level: "75" }
                ].map((skill, i) => (
                  <div key={i} className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium border bg-green-50/90 dark:bg-green-900/40 text-green-900 dark:text-green-100 border-green-200 dark:border-green-700 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md">
                    <span className="font-semibold">{skill.name}</span>
                    <span className="ml-1.5 sm:ml-2 text-xs opacity-75 font-medium hidden sm:inline">
                      ({parseInt(skill.level) >= 90 ? 'Expert' : 
                        parseInt(skill.level) >= 75 ? 'Advanced' : 
                        parseInt(skill.level) >= 60 ? 'Intermediate' : 'Beginner'})
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Processing & E-commerce */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-300 dark:border-gray-600 pb-2">
                Payment Processing & E-commerce
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {[
                  { name: "Stripe, Paypal, Payment Processors", level: "85" },
                  { name: "Lead Dyno, Post Affiliate Pro", level: "65" },
                  { name: "Google Play, Apple App Store", level: "85" }
                ].map((skill, i) => (
                  <div key={i} className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium border bg-purple-50/90 dark:bg-purple-900/40 text-purple-900 dark:text-purple-100 border-purple-200 dark:border-purple-700 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md">
                    <span className="font-semibold">{skill.name}</span>
                    <span className="ml-1.5 sm:ml-2 text-xs opacity-75 font-medium hidden sm:inline">
                      ({parseInt(skill.level) >= 90 ? 'Expert' : 
                        parseInt(skill.level) >= 75 ? 'Advanced' : 
                        parseInt(skill.level) >= 60 ? 'Intermediate' : 'Beginner'})
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Management & Communication */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-300 dark:border-gray-600 pb-2">
                Project Management & Communication
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {[
                  { name: "Asana, Click Up", level: "80" },
                  { name: "Slack, Microsoft Teams", level: "85" },
                  { name: "Zoom, Talk Desk", level: "80" },
                  { name: "Calendly", level: "85" },
                  { name: "JIRA, Confluence, Bitbucket", level: "55" },
                  { name: "Atlassian Tools", level: "55" }
                ].map((skill, i) => (
                  <div key={i} className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium border bg-blue-50/90 dark:bg-blue-900/40 text-blue-900 dark:text-blue-100 border-blue-200 dark:border-blue-700 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md">
                    <span className="font-semibold">{skill.name}</span>
                    <span className="ml-1.5 sm:ml-2 text-xs opacity-75 font-medium hidden sm:inline">
                      ({parseInt(skill.level) >= 90 ? 'Expert' : 
                        parseInt(skill.level) >= 75 ? 'Advanced' : 
                        parseInt(skill.level) >= 60 ? 'Intermediate' : 'Beginner'})
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Development & Technical Tools */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-300 dark:border-gray-600 pb-2">
                Development & Technical Tools
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {[
                  { name: "Visual Studio Code", level: "60" },
                  { name: "Git, Github, Source Control", level: "60" },
                  { name: "Wordpress", level: "60" },
                  { name: "AWS Management Console", level: "65" }
                ].map((skill, i) => (
                  <div key={i} className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium border bg-orange-50/90 dark:bg-orange-900/40 text-orange-900 dark:text-orange-100 border-orange-200 dark:border-orange-700 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md">
                    <span className="font-semibold">{skill.name}</span>
                    <span className="ml-1.5 sm:ml-2 text-xs opacity-75 font-medium hidden sm:inline">
                      ({parseInt(skill.level) >= 90 ? 'Expert' : 
                        parseInt(skill.level) >= 75 ? 'Advanced' : 
                        parseInt(skill.level) >= 60 ? 'Intermediate' : 'Beginner'})
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Creative & Media Production */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-300 dark:border-gray-600 pb-2">
                Creative & Media Production
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {[
                  { name: "Unreal Engine Animation Pipeline", level: "65" },
                  { name: "Ableton Live 11 Suite", level: "85" },
                  { name: "Google Services, Adobe Services", level: "65" },
                  { name: "Stable Diffusion AI Pipeline", level: "55" }
                ].map((skill, i) => (
                  <div key={i} className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium border bg-indigo-50/90 dark:bg-indigo-900/40 text-indigo-900 dark:text-indigo-100 border-indigo-200 dark:border-indigo-700 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md">
                    <span className="font-semibold">{skill.name}</span>
                    <span className="ml-1.5 sm:ml-2 text-xs opacity-75 font-medium hidden sm:inline">
                      ({parseInt(skill.level) >= 90 ? 'Expert' : 
                        parseInt(skill.level) >= 75 ? 'Advanced' : 
                        parseInt(skill.level) >= 60 ? 'Intermediate' : 'Beginner'})
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Business & Administrative */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-300 dark:border-gray-600 pb-2">
                Business & Administrative
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {[
                  { name: "BrainTap Products", level: "95" },
                  { name: "Tradeshow efficiency", level: "90" },
                  { name: "Microsoft Suite Products", level: "85" },
                  { name: "Gusto, ADP", level: "75" }
                ].map((skill, i) => (
                  <div key={i} className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium border bg-teal-50/90 dark:bg-teal-900/40 text-teal-900 dark:text-teal-100 border-teal-200 dark:border-teal-700 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md">
                    <span className="font-semibold">{skill.name}</span>
                    <span className="ml-1.5 sm:ml-2 text-xs opacity-75 font-medium hidden sm:inline">
                      ({parseInt(skill.level) >= 90 ? 'Expert' : 
                        parseInt(skill.level) >= 75 ? 'Advanced' : 
                        parseInt(skill.level) >= 60 ? 'Intermediate' : 'Beginner'})
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </details>
      </div>
        </div>
        
        {/* Bottom Padding for Mobile Scroll */}
        <div className="h-6 flex-shrink-0"></div>
      </div>
    </div>
  )
}