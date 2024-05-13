import React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
const pictures = [
  "https://s3.amazonaws.com/thumbnails.venngage.com/template/21a87cb7-ef87-4c03-948a-7a2b977efbbd.png",
];

const Posters = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );
  return (
    <div className="w-full rounded-lg overflow-hidden">
      <Carousel
        className="w-full"
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {pictures.map((item, index) => (
            <CarouselItem key={index}>
              <div className="">
                <Card>
                  <CardContent className="p-0 relative">
                    <img
                      src={item}
                      className="w-full h-[400px] object-cover rounded-lg"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious />
          <CarouselNext /> */}
      </Carousel>
    </div>
  );
};

export default Posters;
