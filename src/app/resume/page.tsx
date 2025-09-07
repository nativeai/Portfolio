'use client'

import Bar from "../../components/Bar"
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
    <div className="text-base font-medium tracking-wider">
      {/* Experience Sections Container */}
      <div className="space-y-4">
        <details
          open
          className="cursor-pointer border border-gray-400 rounded-lg hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-200"
        >
          <summary className="font-semibold p-2 text-2xl">Management</summary>
          <div className="container px-4 py-4 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap">
            <div className="">
              <span className="text-xl text-blue">Manager, Customer Success</span> 
              <br />BrainTap, Inc <span/> 2017-Current
              <p className="mt-2 text-md">
                Responsibilities included, but not limited to:
                <br />
                - Generated, assessed, and delivered Key Performance Indicators (KPIs) for Customer Success directly to our Chief Operating Officer (COO). Compiled and presented comprehensive solutions aimed at company initiatives, and product recommendations. Working with department managers, ensuring alignment. Formulated goals and established timelines for various tasks and projects for the customer success team. 
                <br />
                - Managed admin access, user permissions, invites in Hubspot, Infusionsoft, Oscommerce, Post Affiliate Pro, Zoom, and Confluence. As a key admin  in our systems, I provided many of our teams with appropriate access based on their roles and responsibilites.
                <br />
                - Implemented customer success feedback surveys, utilizing the valuable feedback obtained for analytics purposes to enhance our customer experience, improve our services, and refine our products. These surveys include metrics such as CSAT (Customer Satisfaction), NPS (Net Promoter Score), and general feedback.
                <br />
                - Setup and maintained Hubspot support inbox pipeline, workflow automations, Chatbot workflow, email templates/snippets, Customer Knowledge Base Articles, user feedback surveys, SLAs, and team dashboard activity metrics.
                <br />
                - Optimized existing SOPs and created new SOPs for the support team with heavy emphasis on team workflows and customer success. Improving outcomes with faster resolution times and better experience. Resulting in customer retention, referrals, and higher feedback.
                <br />
                - Followed company culture and enforced policies, listened to employee complaints and feedback, resolved concerns and any immediate issues directly with upper management, HR, and the appropriate parties. 
                <br />
                - Collaborated closely with healthcare professionals to provide training for our affiliate program, address implementation details, ensure client success, and offer protocol recommendations utilizing BrainTap technologies. Engaged in discussions regarding return on investment (ROI), workflow optimization, and sharing best practices.
                <br />
                - International communications occur regularly and skillfully among numerous businesses, healthcare professionals, customers, and colleagues located across various countries and states, with a focus on effectiveness and efficiency. 
                <br />
                - Responsible for processing customer refund requests and payments, as well as sending invoices to customers through our payment merchant systems such as Authorize.net, Paypal, and Stripe.
                <br />
                - In my role, I set up phone call queues, monitored support calls, handled escalated calls, managed and reported call metrics, established call hours, and implemented automated messaging systems. 
                <br />
                - Oversaw Post Affiliate Pro and managed affiliate applications. Collaborated closely with the marketing team to set up and execute promotional campaigns, aligning with our sales initiatives. I made certain that our affiliate partners received accurate commissions and promptly updated any necessary changes.
                <br />
                - Recorded a series of training videos to provide guidance on our services, systems, and troubleshooting procedures for both our customers and employees. These videos were created through a combination of video recordings and live in-person sessions.
                <br />
                - Collaborated with the Leadership team to develop comprehensive job descriptions for the positions of Customer Success Associate and Manager, Customer Success. In doing so, I made certain to accurately capture our company's mission, goals, requirements, and expectations for these roles.
                <br />
                - Managed and directly collaborated with GDC Services, a call center business based in Serbia, Europe. I remotely oversaw and managed their call, email, and chat support operations. I maintained regular communication with their team leads, focused on enhancing customer support, and optimizing first call resolutions.
                <br />
                - Utilized Hubspot to administer admin access, set user team permissions, and oversee the support team to ensure SLA adherence. Additionally, I developed an inbox support pipeline and implemented automations to streamline processes. I established support queue workflows and created standard operating procedures (SOPs) and email templates for the team. Furthermore, I designed a chatbot workflow to enhance customer support on our website.
                <br />
                - Efficiently utilized forms to facilitate internal requests from various teams, effectively managing and completing tasks. I also established automations to streamline the task management process.
                <br />
                - Conducted regular team trainings and facilitated mock trials to enhance team performance, improve customer experience, and foster the professional development of each employee. To ensure expertise in Hubspot, I implemented a mandatory requirement for Hubspot certifications, both for existing team members and new hires.
                <br />
                - Setup and created efficient workflow automations for support tickets, chats and email. Optimizing customer experiences, supported SLAs and increasing customer retention and satisfaction
              </p>
            </div>
          </div>
        </details>

        <details className="cursor-pointer border border-gray-400 rounded-lg hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-200">
          <summary className="font-semibold p-2 text-2xl">
            Personal Projects
          </summary>

          <p className="font-semibold">Unreal Engine</p>
          <p className="my-3">
            <br />
            <h2 className="font-semibold p-2">Video Production</h2>
            <div className="player-wrapper">
              <ReactPlayer
                className="react-player"
                url="https://www.youtube.com/watch?v=uG51UuOWEC4"
                width="480px"
                height="270px"
                onReady={handleChange}
                controls={true}
                onProgress={handleProgress}
              />
            </div>
            <ul className="list-none hover:list-disc">
              <li>
                - Creating 3-d landscapes and cinematic productions, setup camera and cinematics using sequencer
                - rendering 
              </li>
            </ul>
            <br />
          </p>
        </details>

        <details
          open
          className="cursor-pointer border border-gray-400 rounded-lg hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-200"
        >
          <summary className="font-semibold p-2 text-xl sm:text-2xl">Tools & Software</summary>
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
  )
}