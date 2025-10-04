import { AnimatedTestimonials } from "./ui/AnimatedTestimonials";

export function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote:
        "This amazing website helped me find this dress and was one of the best places to buy and save clothes",
      name: "Kumari Shreya",
      designation: "Fashion Influencer girlilac",
      src: "/testpic1.jpg",
    },
    {
      quote:
        "I was going on a trip and was able to connect to a person who was in my city and buy the dress for this trip.",
      name: "Ankita Kumari",
      designation: "Fashion Diva",
      src: "/Testpic2.jpg",
    },
    {
      quote:
        "I was able to find out why the costlier clothes are worth it but I was able to experience this because I find out this tshirt from the recycled section of this website",
      name: "Purujeet Kumar",
      designation: "Tech Influencer",
      src: "/testpic3.jpg",
    },
    {
      quote:
        "I am constantly looking for the ways to save money but being is not my cup of tea. That is where this website comes in handy and makes my life easier as I can trust this site blindly for comfortable clothes",
      name: "Amitesh Kumar",
      designation: "Fitness Influencer AmiteshSharma18",
      src: "/testpic4.jpg",
    },
    
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}
