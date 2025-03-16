import Image from "next/image";
import SecImage from "../public/Cybersecurity.png";
import DottedPath from "../public/dottedPath.png";
import CreativesImage from "../public/Creatives.png";
import DevImage from "../public/Development.png";
import CorpImage from "../public/Corporate.png";

const HowWeWork: React.FC = () => {
    return (
        <>
        <h2 className="text-lime-400 text-5xl text-center font-extrabold mb-8">
          How we Work
        </h2>
      <div className="relative w-full h-auto md:h-[800px] top-20 flex flex-col items-center">
        {/* Dotted Path */}
        <Image
          src={DottedPath}
          alt="Path"
          className="w-full h-auto"
        />
  
        {/* CyberSecurity */}
        <div className="absolute left-[13%] top-[-20%] md:top-[-10%] lg:top-[-10%] flex flex-col items-center text-center space-y-3">
          <Image src={SecImage} alt="CyberSecurity" className="w-16 h-16" />
          <h3 className="text-lime-400 text-xl font-bold tracking-wide">
            &lt; CyberSecurity / &gt;
          </h3>
          <div className="border border-lime-400 text-sm p-4 rounded-lg max-w-[200px] text-white text-center font-semibold">
            Ethical Hacking, Penetration Testing, CTFs
          </div>
        </div>
  
        {/* Development */}
        <div className="absolute right-[15%] top-[15%] md:top-[10%] lg:top-[15%] flex flex-col items-center text-center space-y-3">
          <Image src={DevImage} alt="Development" className="w-16 h-16" />
          <h3 className="text-lime-400 text-xl font-bold tracking-wide">
            &lt; Development / &gt;
          </h3>
          <div className="border border-lime-400 text-sm p-4 rounded-lg max-w-[200px] text-white text-center font-semibold">
            Secure Coding, Red Team Tools, Cyber Apps
          </div>
        </div>
  
        {/* Creatives */}
        <div className="absolute left-[35%] bottom-[-10%] md:bottom-[-5%] lg:bottom-[-10%] flex flex-col items-center text-center space-y-3">
          <Image src={CreativesImage} alt="Creatives" className="w-16 h-16" />
          <h3 className="text-lime-400 text-xl font-bold tracking-wide">
            &lt; Creatives / &gt;
          </h3>
          <div className="border border-lime-400 text-sm p-4 rounded-lg max-w-[200px] text-white text-center">
            UI/UX for Cyber Platforms, Branding, Media
          </div>
        </div>
  
        {/* Corporate */}
        <div className="absolute right-[10%] bottom-[-15%] md:bottom-[-10%] lg:bottom-[-15%] flex flex-col items-center text-center space-y-3">
          <Image src={CorpImage} alt="Corporate" className="w-16 h-16" />
          <h3 className="text-lime-400 text-xl font-bold tracking-wide">
            &lt; Corporate / &gt;
          </h3>
          <div className="border border-lime-400 text-sm p-4 rounded-lg max-w-[200px] text-white text-center">
            Event Management, Industry Collaboration, Leadership
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      </>
    );
  };
  
  export default HowWeWork;