import React from 'react';


function Card() {
  const cardData = [
    {
      img: 'https://miro.medium.com/v2/resize:fit:1100/format:webp/1*CZdTHo5Qe7Y1mYRj-MLgFA.png',
      title: 'EternalBlue',
      description: "EternalBlue- Window's Kryptonite",
      link: "https://htbsrmist.medium.com/eternalblue-windowss-kryptonite-17edb0d47445"
    },
    {
      img: 'https://miro.medium.com/v2/resize:fit:1100/format:webp/1*lJ8VJtMTRtHIUp32iyC09w.png',
      title: 'Nepali Keti',
      description: 'Nepali Kethi- A Goliath Scam',
      link: "https://htbsrmist.medium.com/nepali-keti-a-goliath-scam-569bae77aea8"
    }
   
  ];

  return (
    <div className="flex flex-col">
      <h1 className="m-0 font-bold text-center mb-8 text-5xl text-gray-900">BLOGS</h1>
      <div className="grid grid-cols-1 p-9 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center">
        {cardData.map((data, index) => (
          <div className="backdrop-blur-sm bg-white/30 rounded-lg shadow-md p-4" key={index}>
            <img src={data.img} alt="Card Image" className="w-full h-48 object-cover rounded-t-lg" />
            <div className="p-4">
              <h2 className="text-xl font-bold text-htb-green  mb-2">{data.title}</h2>
              <p className="text-gray-700">{data.description}</p>
            </div>
            <div className="flex justify-end items-center px-4 py-2 backdrop-blur-md bg-white/30">
              <a href= {data.link} className="text-[#119f3b93] underline hover:text-htb-green ">
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;