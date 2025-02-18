import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../../styles/AdCarousel.css";

// Import images
import ad1 from "../../assets/images/ads/ad1.jpg";
import ad2 from "../../assets/images/ads/ad2.jpg";
import ad3 from "../../assets/images/ads/ad3.jpg";

const adData = [
  {
    type: "image",
    src: ad1,
    alt: "Cleaning Service Ad",
    link: "/service/cleaning",
    text: "Hire the Best Cleaning Services!", // ✅ Add text
  },
  {
    type: "image",
    src: ad2,
    alt: "Plumbing Service Ad",
    link: "/service/plumbing",
    text: "Advertise Your Business with Us!", // ✅ Add text
  },
  {
    type: "image",
    src: ad3,
    alt: "Pet Service Ad",
    link: "/service/pets",
    text: "Take care of your pets", // ✅ Add text
  },
  {
    type: "text",
    content: "💰 Earn extra by becoming a tasker!",
  }
];

function AdCarousel() {
  return (
    <div className="ad-carousel">
      <Carousel
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        interval={4000} // Change slide every 5 sec
      >
        {adData.map((ad, index) => (
          <div key={index} className="ad-slide">
            {ad.type === "image" ? (
              <a href={ad.link} target="_blank" rel="noopener noreferrer" className="ad-image-container">
                <img src={ad.src} alt={ad.alt} className="ad-image" />
                {ad.text && <p className="ad-text">{ad.text}</p>} {/* ✅ Overlay text */}
              </a>
            ) : (
              <p className="ad-text">{ad.content}</p>
            )}
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default AdCarousel;
