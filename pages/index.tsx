import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from "next";
import ServiceCard from "../components/ServiceCard";
import { services } from "../data";
import { motion } from 'framer-motion'

const About: NextPage = () => {
  
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1 }}
     className="flex flex-col flex-grow px-6 pt-1 ">
      {/* <h4 className="my-3 text-base font-hpr font-medium text-2xl">
        As a full stack developer with over 5 years of experience under my belt primarily in 
        environments like Visual Studio using C# .NET, SSMS for SQL and Database management, 
        Azure for Cloud Service architecture, and Visual Studio Code using front end frameworks like
         Angular, React, and Next.js to build
        Web2.0 and Web3.0 app interfaces. I also enjoy building projects
        in my freetime using moddable and modular software like UE4 C++ for game development 
        and Ableton Live for music production.
      </h4> */}
      <div
        className="flex-grow p-4 mt-5 dark:bg-dark-100 "
        style={{ marginLeft: "-1.5rem", marginRight: "-1.5rem" }}
      >
        {/* <h4 className="my-3 text-xl foPpackant-semibold tracking-wide">
          What I bring to the table:
        </h4> */}

        <div className="grid gap-2 my-2 md:grid-cols-2">
          {/* children's initial and animate property should be same as the parent during a stagger effect  */}
          {services.map((service) => (

            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
              className="col-span-2 p-2 rounded-lg md:col-span-1 "
              key={service.title}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

//!called every time  the page refreshed
// export const getServerSideProps: GetServerSideProps = async (
//    context: GetServerSidePropsContext
// ) => {
//    const res = await fetch('http://localhost:3000/api/services')
//    const data = await res.json()
//    console.log(data)
//    return { props: { services: data.services } }
// }

//!called only during the build of the project
//? make sure the server(localhost:3000)[this will receive the request during build] is running on a terminal during the build
//? also need to change the localhost during the deployment | see the todo
// https://aude53.medium.com/set-environment-variables-with-next-js-and-vercel-e544c0460a48

// export const getStaticProps: GetStaticProps = async (
//    context: GetStaticPropsContext
// ) => {
//    // console.log(context);

//    const res = await fetch('http://localhost:3000/api/services')
//    const { services } = await res.json()
//    console.log({ services })
//    return { props: { services: services } }
// }

export default About;
