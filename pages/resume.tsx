import Bar from "../components/Bar";
import { languages, tools, containers } from "../data";
import ReactPlayer from "react-player";


  const handleChange = () => {
    console.log("playing");
  };

  const handleProgress = ({ playedSeconds: secondsPlayed }) => {
    if (secondsPlayed > 1) {
      console.log(secondsPlayed);
    }
  };
const Resume = () => {
  return (
    <div className="text-base font-hpr font-medium tracking-wider">
      <div className="grid">
        <details
          open
          className="cursor-pointer border border-gray-400 rounded-lg hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-200"
        >
          <summary className="font-semibold p-2 text-2xl">Management</summary>
          <div
            className="
              container
              px-4
              py-4
              mx-auto
              flex
              md:items-center
              lg:items-start
              md:flex-row md:flex-nowrap
              "
          >
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
            {/* <div
              className="
                flex-grow flex flex-wrap
                -mb-10
                md:mt-0
                mt-10
                md:text-left
                text-center
                "
            >
              {containers.map((container) => (
                <div className="container mx-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
                    <div className="card m-2 cursor-pointer border border-gray-400 rounded-lg hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-200">
                      <div className="m-3">
                        <h2 className="text-lg mb-2">
                          {container.title}
                          <span className="text-md text-teal-800 font-mono bg-teal-100 inline rounded-full px-2 align-top float-right animate-pulse text-blue">
                            {container.environment}
                          </span>
                        </h2>
                        <p className="font-light font-mono text-md hover:text-blue transition-all duration-200">
                          {container.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div> */}
          </div>
        </details>
        <div>
          {/* <div className="grid md:grid-cols-1">
            <details className="cursor-pointer border border-gray-400 rounded-lg hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-200">
              <summary className="font-semibold p-2 text-2xl">Freelance Work</summary>
              <p className="my-3">
                <br />
                <h2 className="font-semibold p-2">The Poster Children Web</h2>
                <ul className="list-none hover:list-disc">
                  <li>
                    - Created a Wordpress website for The Poster Children - a 2d cartoon universe driven by decentralized blockchain technology (in development). Utilized solidity contract development knowledge for a basic Binance Smart Chain liquidity contract.
                  </li>
                  <li>
                    - Applied knowledge of CSS, HTML, Solidity, and some basic Javascript to get the correct look and feel based on the style guide provided.
                    <br />
                  </li>
                  <li>
                    - Applied practical knowledge on SEO optimizations and project cleanliness, used 3d particle effects for an interactive background, and created graphics (as well as a logo) to match the intended overall style for the project.
                    <br />
                  </li>
                </ul>
                <br />
                <h2 className="font-semibold p-2">
                  Third Eye Equestrian
                </h2>
                <ul className="list-none hover:list-disc">
                  <li>
                    - Created a website using Wordpress and WooCommerce for a horse training business (Service based), this includes a home, about, contact, shop, cart, checkout, and detail pages. Scaffolding the UI with HTML, custom Wordpress widgets, and CSS for a personalized feel according to the style guide provided.
                    <br />
                  </li>
                  <li>
                    - Products are sold via Woocommerce as virtual goods (aka a service) where the buyer can add items to their cart and checkout with a credit card, Apple Pay, Google Pay, or PayPal.
                    <br />
                  </li>
                  <li>
                    - Optimized for SEO performance for google searchibility. This provides a better likelihood of the client getting online exposure and traffic to their website, which in turn, generates more leads and more sales.
                    <br />
                  </li>
                </ul>
                <br/>
                <h2 className="font-semibold p-2">Odd Jobs</h2>
                <ul className="list-none hover:list-disc">
                  <li>
                    - Revitalized Horseplay Ranch's (horseplayranchmn.com) website for better performance, searchability, a more modern UI, and updated business information. 
                    <br />
                  </li>
                  <li>
                    - Deployed a BSC smart contract using Solidity for The Poster Children (theposterchildren.com) using Remix - the popular Ethereum IDE. This smart contract is based off the Open Zepplin contracts to create a liquidity token.
                    <br />
                  </li>
                  <li>
                    - Helped fix multiple issues on a Personal Trainer Wordpress website (no longer the original host (https://www.dabrown.co/elite-ats)) in regards to shopping, cart status, and checkout payment methods.
                    <br />
                  </li>
                </ul>
              </p>
            </details>
          </div> */}
          <div className="grid md:grid-cols-1">
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
                  
                  {/* <li>
                    - Applied skills with HTML, CSS, and Bootstrap to create a
                    friendly and interactive UI
                    <br />
                  </li> */}
                </ul>
                <br />
                {/* <h2 className="font-semibold p-2">
                  Hotel Reservation Database
                </h2> */}
                <ul className="list-none hover:list-disc">
                  {/* <li>
                    - Successfully created a Database in SQL Server Management
                    Studio that appropriately fit the needs of the business
                    request, while allowing queried test data
                    <br />
                  </li>
                  <li>
                    - Used ERD diagram design to plan out what exactly the
                    Database needed to encapsulate, prior to building the
                    database
                    <br />
                  </li>
                  <li>
                    - Compiled the Database into a shareable script that
                    re-created the Database to default values, allowing for
                    multiple instances
                    <br />
                  </li> */}
                </ul>
                <br />
                {/* <h2 className="font-semibold p-2">Car Dealership Web App</h2> */}
                <ul className="list-none hover:list-disc">
                  {/* <li>
                    - Created a Multi-tier solution compiled of a Data layer,
                    Models layer, Testing layer, and UI layer
                    <br />
                  </li>
                  <li>
                    - Strongly secured my web app with Microsoft OWIN security,
                    implementing 3 different roles; an administrator, a
                    contributor, and a visitor
                    <br />
                  </li>
                  <li>
                    - Used CRUD functionality with Entity Framework Database
                    creation
                    <br />
                  </li>
                  <li>
                    - Fully featured Car Dealership that allowed for adding,
                    removing, selling, and tracking cars/ the sales
                    <br />
                  </li>, */}
                </ul>
              </p>
            </details>
          </div>
        </div>
      </div>

      {/*Languages & Tools */}
      <div className="grid gap-9 md:grid-cols-2">
        <div>
          <h5 className="my-3 text-2xl font-bold">Tools & Software</h5>
          <div className="my-2">
            {languages.map((language, i) => (
              <Bar value={language} key={i} />
            ))}
          </div>
        </div>

        <div className="my-10">
          <h5 className="my-3 text-2xl font-bold"></h5>
          <div className="my-2">
            {tools.map((tool, i) => (
              <Bar value={tool} key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
