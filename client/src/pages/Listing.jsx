import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
export default function Listing() {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const [listing, setlisting] = useState(null);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setloading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          seterror(true);
          setloading(false);
          return;
        }
        setlisting(data);
        setloading(false);
        seterror(false);
      } catch (error) {
        seterror(true);
        setloading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);
  console.log(loading);
  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something Went Wrong!</p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageURLs.map((url) => (
                <SwiperSlide key={url}>
                    <div className='h-[450px]' style={{background: `url(${url}) center no-repeat`, backgroundSize: 'cover'}}>

                    </div>
                </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </main>
  );
}
