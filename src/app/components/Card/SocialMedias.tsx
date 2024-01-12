import Image, { StaticImageData } from "next/image";
import icon_instagram from "$/img/icons/instagram.png";
import icon_facebook from "$/img/icons/facebook.png";
import icon_whatsapp from "$/img/icons/whatsapp.png";

type SocialMediasProps = {
  image: StaticImageData;
  alt: string;
  link: string;
};

export default function SocialMedias({ isShow }: { isShow: boolean }) {
  const className = !isShow && "hidden w-full";
  const imageArr: SocialMediasProps[] = [
    { image: icon_whatsapp, alt: "icon whatsapp", link: "" },
    { image: icon_instagram, alt: "icon instagram", link: "" },
    { image: icon_facebook, alt: "icon facebook", link: "" },
  ];

  return (
    <div className={`flex gap-2  items-center ${className}`}>
      {imageArr.map(({ image, alt }: SocialMediasProps, index) => {
        return (
          <a href="#" key={index}>
            <Image src={image} alt={alt} width={36} height={36} />
          </a>
        );
      })}
    </div>
  );
}
