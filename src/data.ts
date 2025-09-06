import { RiAddCircleFill, RiComputerLine, RiContactsBookUploadLine, RiInformationLine, RiLeafFill, RiSecurePaymentLine, RiTrafficLightFill } from "react-icons/ri";
import { FaAffiliatetheme, FaAtlassian, FaCameraRetro, FaFileAudio, FaGamepad, FaServer, FaVideo } from "react-icons/fa";
import { AiFillControl, AiOutlineAntDesign, AiOutlineApi, AiOutlineDisconnect, AiOutlineLink, AiOutlineRightCircle } from "react-icons/ai";
import { MdDeveloperMode } from "react-icons/md";
import { IProject, Service, Skill, Snippet, Container, CryptoWallet, SideBarIcon, SupportMe } from "./types";
import { BsCameraVideo, BsCircleFill, BsFillCameraVideoFill } from "react-icons/bs";
import { SiGithub, SiHtml5 } from "react-icons/si";
import { GiBowArrow, GiCircle, GiSatelliteCommunication, GiSawedOffShotgun, GiTreeGrowth, GiVideoCamera } from "react-icons/gi";

export const repositories: string[] = [
  'https://github.com/spectrexyz/use-nft'
]
export const supportSites: SupportMe[] = [
  {
    title: 'Buy me a coffee',
    url: 'https://www.buymeacoffee.com/shandon',
    image: '/images/bmac.png',
  }
]
export const wallets: CryptoWallet[] = [
  
  {
    network:'Cardano',
    symbol: 'ADA',
    address: '',
    url: '',
    image: '/images/cardano.png',
  }
]
export const services: Service[] = [
  
  {
    Icon: RiSecurePaymentLine,
    title: "Payment Processors",
    about:
      "Experienced in managing refunds, invoice payments, payment disputes, payment plans, subscriptions, coupons and trials. Reporting,Data Entry, Customer account management, payment details, secured payment transaction practices",
      url: '/images/PaymentProcessorslogo.jpg',
    tags: ['Stripe', 'PayPal', 'Authorize.net']
  },
  {
    Icon: AiOutlineAntDesign,
    title: "Chatbot Workflows",
    about:
      "Experience in leading to map, document, test and implement chatbot workflows, replies, reports, feedback surveys and automations in systems including, Hubspot, and Drift Chat.",
      url: '/images/Chatbotlogo.jpg',
    tags: ['Hubspot', 'DriftChat', 'Facebook Business']
  },
  {
    Icon: FaAffiliatetheme,
    title: "Affiliate Programs",
    about:
      "Managing affiliate applications, setup promotional campaigns working directly with the Leadership, marketing and sales team following company initiatives. Ensuring correct commissions for our affiliate partners, updating any commission adjustments, referrals, leads, sales or refunds. Experience in LeadDyno managing affiliate accounts",
    url: '/images/Affiliateprogramlogo.png',
    tags: ['Post Affiliate Pro', 'LeadDyno']
  },
  {
    Icon: GiSatelliteCommunication,
    title: "Communication Software",
    about: "Experienced in ClickUp and Asana for reporting, management task form submissions, tasks and due date Calendar, Task assignment automations. Utilized slack for day-to-day team member communication, company notifications/updates/announcements,voice and video calls, utilized slack plugins, and automations. ",
    url: '/images/Communicationsoftware.jpg',
    tags: ['Slack','ClickUp', 'Asana', 'Microsoft Teams', 'Zoom']
  },
  {
    Icon: MdDeveloperMode,
    title: "Visual Studio Code",
    about:
      "Novice experience in Next.js, React and beginning to learn Python (anaconda,LaTeX). Utilizing Jupyter Interactive Window ",
      url: '/images/vscode.png',
    tags: ['vscode-pdf', 'Next js', 'Auth', 'Python']
  },
  {
    Icon: RiComputerLine,
    title: "Hubspot",
    about:
      "Setup and maintained Hubspot support inbox pipeline, workflow automations, Chatbot workflow, email templates/snippets, Customer Knowledge Base Articles, user feedback surveys, SLAs, and team dashboard activity metrics", 
      url: '/images/Hubspot.png',
    tags: ['Hubspot Reporting Certification','Service Hub Software Certification', 'Feedback Surveys', 'Chat workflows', 'Inbox Pipeline', 'Admin']
  },
  {
    Icon: FaAtlassian,
    title: "Atlassian Tools",
    about: "Utilized and Setup Service Desk systems for BrainTap, created knowledge base articles through confluence.",
    url: '/images/atlassian.jpg',
    tags: ['Confluence', 'JIRA','ServiceDesk', 'Bitbucket']
  },
  {
    Icon: FaCameraRetro,
    title: "Adobe Creative Cloud Products",
    about:
      "I have experience with Photoshop, After Effects, and Character Animator",
      url: '/images/adobe.jpg',
    tags: ['Xd', 'Ps', 'Ai', 'Ch', 'Ae', 'SVG Export']
  },
  {
    Icon: FaFileAudio,
    title: "Audio Production",
    about:
      "Albeton Live 11 is my current DAW of choice for all stages of music production from staging, instrumentation, mixing, and mastering audio. I have experience with EDM, Rap, Acoustic, and Trap",
      url: '/images/ableton-live-11.jpg',
    tags: ['ALS 10', 'ALS 11', 'Logix Pro X', 'DAWs', 'Meta Sounds UE5']
  },
  {
    Icon: GiVideoCamera,
    title: "UE4/UE5 Animation Pipeline ",
    about:
      "Utilizing and learning best practices for UE5 animation pipeline, cinematics, Metahuman, scene creation, production,Livelink, Rokoko and Niagra components ",
      url: '/images/UELogo.png',
    tags: ['UE4', 'UE5', 'C++', 'Blueprints', 'Animation Pipeline','Cinematic Renders','Metahuman','Rokoko']
  },
];

export const barIcons: SideBarIcon[] =[
  {
    Icon: RiComputerLine,
    title: 'Asana',
    url: 'https://academy.asana.com/',
    style: {
      color: '#f44336'
    }
  },
  {
    Icon: FaCameraRetro,
    title: 'Adobe',
    url: 'https://helpx.adobe.com/support.html',
    style: {
      color: 'crimson'
    }
  },
  {
    Icon: RiSecurePaymentLine,
    title: 'Stripe',
    url: 'https://stripe.com/docs',
    style: {
      color: '#9b7fe3'
    }
  },
  {
    Icon: RiSecurePaymentLine,
    title: 'PayPal',
    url: 'https://developer.paypal.com/docs/online/',
    style: {
      color: 'light blue'
    }
  },
  {
    Icon: SiGithub,
    title: 'GitHub',
    url: 'https://github.com/nativeai',
    style: {
      color: 'black'
    }
  },
  {
    Icon: GiSatelliteCommunication,
    title: 'Slack',
    url: 'https://slack.com/resources',
    style: {
      color: 'black'
    }
  },
  {
    Icon: BsFillCameraVideoFill,
    title: 'Zoom',
    url: 'https://zoom.us/',
    style: {
      color: 'blue'
    }
  },
  {
    Icon: RiComputerLine,
    title: 'Hubspot',
    url: 'https://help.hubspot.com/?_ga=2.23678194.978470726.1592315215-1192486389.1556035228&hubs_content=www.hubspot.com/&hubs_content-cta=Customer%20Support',
    style: {
      color: 'orange'
    }
  },
  {
    Icon: SiHtml5,
    title: 'HTML',
    url: 'https://www.w3docs.com/learn-html/html5-introduction.html',
    style: {
      color: '#ef4b00'
    }
  },
  {
    Icon: FaCameraRetro,
    title: 'Creative Cloud',
    url: 'https://www.adobe.io/creative-cloud-libraries/docs/',
    style: {
      color: '#d18a3a'
    }
  },
  {
    Icon: FaAtlassian,
    title: 'Atlassian Tools',
    url: 'https://www.atlassian.com/',
    style: {
      color: '#29ABE2'
    }
  },
  {
    Icon: FaGamepad,
    title: 'Unreal Engine',
    url: 'https://docs.unrealengine.com/4.27/en-US/',
    style: {
      color: 'gray'
    }
  },
  {
    Icon: GiCircle,
    title: 'Rokoko',
    url: 'https://www.rokoko.com/',
    style: {
      color: 'gray'
    }
  },
  {
    Icon: FaServer,
    title: 'AWS',
    url: 'https://aws.amazon.com/',
    style: {
      color: 'gold'
    }
  }
]
export const containers: Container[] = [
  {
    title: 'BrainTap',
    environment: '2017-Current',
    description: ``,
  }
]

export const snippets: Snippet[] = [
  {
    language: 'react',
    environment: 'React, Next.js, & Tailwind Card',
    description: 'A React, Next.js, & Tailwind card component used in this project.',
    snippet: `
    import { FunctionComponent } from "react";
import { Service } from "../types";
// import { motion } from 'framer-motion'

const ServiceCard: FunctionComponent<{ service: Service }> = ({
  service: { Icon, title, about, url, tags },
}) => {
  //XSS attack :( on our portfolio btw, as an alternate use npm i dom purify
  function createMarkup() {
    return {
      __html: about,
    };
  }

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg card cursor-pointer border border-gray-400 rounded-lg hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-200 m-auto">
      <img src={url} alt="avatar" className="w-full" />
      <details className="cursor-pointer border border-gray-400 rounded-lg hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-200">
        <summary className="font-bold text-xl mb-2">{title}</summary>
        <div className="px-6 py-4">
          <p
            className="dark:text-blue text-base"
            dangerouslySetInnerHTML={createMarkup()}
          />
        </div>
        <div className="px-6 pt-4 pb-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:bg-gray-200 mr-2 mb-2"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex justify-center mx-auto">
          <Icon className="px-2 py-1 my-3 w-24 h-24 text-blue" />
        </div>
      </details>
    </div>
  );
};

export default ServiceCard;
`
  },
  {
    language: 'c#',
    environment: 'C# API Entity Controller',
    description: 'Basic CRUD entity controller - coould make it take a generic type and cast to the specific table, but this would operate as a db table api.',
    snippet: `
    [ApiController]
    [Route("[controller]")]
    public class EntityController : ControllerBase
    {
        private readonly DbContext _dbContext;
        public EntityController(DbContext dbContext)
        {
            _dbContext = dbContext;
        }
    
        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var entitys = await _dbContext.Entity.ToListAsync();
            return Ok(entitys);
        }
    
        [HttpGet]
        [Route("get-entity-by-id")]
        public async Task<IActionResult> GetEntityByIdAsync(int id)
        {
            var entity = await _dbContext.Entity.FindAsync(id);
            return Ok(entity);
        }
    
        [HttpPost]
        public async Task<IActionResult> PostAsync(Entity entity)
        {
            _dbContext.Entity.Add(entity);
            await _dbContext.SaveChangesAsync();
            return Created($"/get-entity-by-id?id={entity.Id}", entity);
        }
    
        [HttpPut]
        public async Task<IActionResult> PutAsync(Entity entityToUpdate)
        {
            _dbContext.Entity.Update(entityToUpdate);
            await _dbContext.SaveChangesAsync();
            return NoContent();
        }
    
        [Route("{id}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var entityToDelete = await _dbContext.Entity.FindAsync(id);
            if (entityToDelete == null)
            {
                return NotFound();
            }
            _dbContext.Entity.Remove(entityToDelete);
            await _dbContext.SaveChangesAsync();
            return NoContent();
        }
    }`
  },
  {
    language: 'javascript',
    environment: 'Visual Studio Code',
    description: 'Boolean Number Comparison.',
    snippet: `1 == true;
    1 == Number(true);
    1 == 1; // -> true
    // but…
    1.1 == true;
    1.1 == Number(true);
    1.1 == 1; // -> false`
  },
]


export const languages: Skill[] = [
  
  {
    Icon: BsCircleFill,
    name: "AWS Management Console",
    level: "65",
  },
  {
    Icon: BsCircleFill,
    name: "Hubspot, Infusionsoft",
    level: "85",
  },
  {
    Icon: BsCircleFill,
    name: "Asana, Click Up",
    level: "80",
  },
  {
    Icon: BsCircleFill,
    name: "Stripe, Paypal, Payment Processors",
    level: "85",
  },
  {
    Icon: BsCircleFill,
    name: "Visual Studio Code",
    level: "60",
  },
  {
    Icon: BsCircleFill,
    name: "Wordpress",
    level: "60",
  },
  {
    Icon: BsCircleFill,
    name: "Git, Github, Source Control",
    level: "60",
  },
  {
    Icon: BsCircleFill,
    name: "Gusto, ADP",
    level: "75",
  },
  {
    Icon: BsCircleFill,
    name: "Zoom, Talk Desk",
    level: "80",
  },
  {
    Icon: BsCircleFill,
    name: "OSCommerce",
    level: "90",
  },
  {
    Icon: BsCircleFill,
    name: "Microsoft Suite Products",
    level: "85",
  },
  {
    Icon: BsCircleFill,
    name: "Drift Chat",
    level: "75",
  },
  {
    Icon: BsCircleFill,
    name: "Atlassian Tools",
    level: "55",
  },
];

export const tools: Skill[] = [
  {
    Icon: BsCircleFill,
    name: "JIRA, Confluence, Bitbucket",
    level: "55",
  },
  {
    Icon: BsCircleFill,
    name: "Slack, Microsoft Teams",
    level: "85",
  },
  {
    Icon: BsCircleFill,
    name: "BrainTap Products",
    level: "95",
  },
  {
    Icon: BsCircleFill,
    name: "Google Services, Adobe Services",
    level: "65",
  },
  {
    Icon: BsCircleFill,
    name: "Calendly",
    level: "85",
  },
  {
    Icon: BsCircleFill,
    name: "Lead Dyno, Post Affiliate Pro",
    level: "65",
  },
  {
    Icon: BsCircleFill,
    name: "Tradeshow efficiency",
    level: "90",
  },
  {
    Icon: BsCircleFill,
    name: "Google Play, Apple App Store",
    level: "85",
  },
  {
    Icon: BsCircleFill,
    name: "Stable Diffusion AI Pipeline",
    level: "55",
  },
  {
    Icon: BsCircleFill,
    name: "Unreal Engine Animation Pipeline",
    level: "65",
  },
  {
    Icon: BsCircleFill,
    name: "Ableton Live 11 Suite ",
    level: "85",
  },
];

export const projects: IProject[] = [
 
 
 
  {
    name: "The Poster Children",
    image_path: "/images/tpc-main.png",
    deployed_url: "http://www.theposterchildren.com/",
    github_url: "https://www.linkedin.com/in/shandonhicks/",
    category: ["wordpress"],
    description:
      "A website that encapsulates a big idea that's being worked on for an automated online blockchain experience.",
    key_techs: ["Wordpress"],
  },


   {
    name: "Unreal Engine 4/5",
    image_path: "/images/UELogo.png",
    deployed_url: "!#",
    github_url: "!#",
    category: ["ue5"],
    description:
      'Video production, Mocap animations, Rendering',
    key_techs: [
      "UE5",
      "UE4",
      "Blueprints",
    ],
  },
  {
    name: "Rokoko",
    image_path: "/images/RokokoLogo.png",
    deployed_url: "!#",
    github_url: "!#",
    category: ["Rokoko"],
    description:
      'Mocap animations, Exporting/Importing FBX files, Character Rigging',
    key_techs: [
      "Rokoko",
    ],
  },
  {
    name: "Ableton Live",
    image_path: "/images/Abletonlogo.png",
    deployed_url: "!#",
    github_url: "!#",
    category: ["Ableton"],
    description:
      'Music composition, MIDI components, voice and instrument recording, mix & mastering',
    key_techs: [
      "Ableton",
    ],
  },
  
];
