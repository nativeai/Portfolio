import { wallets, supportSites } from "../data";
import QRCode from "react-qr-code";
import Image from "next/image";
import { motion } from 'framer-motion'

const Support = () => {
  return (
    <div className="px-6 py-2">
      <div className="grid gap-9 md:grid-cols-1">
        {supportSites.map((support, i) => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="container
              px-5
              py-24
              ml-auto
              flex
              md:items-center
              lg:items-start
              md:flex-row md:flex-nowrap
              flex-wrap flex-col shadow-lg card cursor-pointer border border-gray-400 rounded-lg hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-200"
          >
            <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left max-w-sm">
              <a href={support.url}>
                <h2 className="my-3 text-2xl font-bold font-hpr">
                  {/* <span className="font-mono bg-teal-100 inline rounded-full px-2 align-top float-right animate-pulse">
                    {support.url}
                  </span> */}
                  {/* {support.url} */}
                </h2>
                <Image
                  src={support.image}
                  alt="avatar"
                  className="mx-auto border rounded-r-lg"
                  layout="fill"
                  quality="100"
                />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
      {/* <div className="grid gap-9 md:grid-cols-1">
        {wallets.map((wallet, i) => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="container
              px-5
              py-24
              ml-auto
              flex
              md:items-center
              lg:items-start
              md:flex-row md:flex-nowrap
              flex-wrap flex-col shadow-lg card cursor-pointer border border-gray-400 rounded-lg hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-200"
          >
            <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left max-w-sm">
              <a href={wallet.url}>
                <h2 className="my-3 text-2xl font-bold font-hpr">
                  <span className="font-mono bg-teal-100 inline rounded-full px-2 align-top float-right animate-pulse">
                    {wallet.symbol}
                  </span>
                  {wallet.network}
                </h2>
                <Image
                  src={wallet.image}
                  alt="avatar"
                  className="mx-auto border rounded-r-lg"
                  height="128px"
                  width="128px"
                  layout="intrinsic"
                  quality="100"
                />
                <h4 className="font-light text-sm font-mono hover:text-blue transition-all duration-200 break-words">
                  Wallet Address: <br />
                  {wallet.address}
                </h4>
              </a>
            </div>
            <div
              className="
                flex-grow flex flex-wrap
                -mb-10
                md:mt-0
                mt-10
                md:text-left
                text-center
                "
            >
              <QRCode className="flex ml-auto" value={wallet.address} />
            </div>
          </motion.div>
        ))}
      </div> */}
    </div>
  );
};

export default Support;
