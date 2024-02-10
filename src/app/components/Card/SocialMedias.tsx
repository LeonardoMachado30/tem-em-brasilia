import Image from "next/image";
import icon_instagram from "$/img/icons/instagram.png";
import icon_facebook from "$/img/icons/facebook.png";
import icon_linkedin from "$/img/icons/linkedin.png";
import Link from "next/link";

export default function SocialMedias({ socialData }: { socialData?: [] }) {
  return (
    <div className={`flex gap-2 items-center item-hidden`}>
      {socialData &&
        socialData.map((item: string, index: number) => {
          if (item.includes("facebook")) {
            return (
              <Link
                href={{ pathname: `https://${item}` }}
                key={index}
                target="_blank"
              >
                <Image
                  src={icon_facebook}
                  alt={"icon facebook"}
                  width={36}
                  height={36}
                />
              </Link>
            );
          } else if (item.includes("instagram")) {
            <Link
              href={{ pathname: `https://${item}` }}
              key={index}
              target="_blank"
            >
              <Image
                src={icon_instagram}
                alt={"icon instagram"}
                width={36}
                height={36}
              />
            </Link>;
          } else if (item.includes("linkedin")) {
            <Link
              href={{ pathname: `https://${item}` }}
              key={index}
              target="_blank"
            >
              <Image
                src={icon_linkedin}
                alt={"icon linkedin"}
                width={36}
                height={36}
              />
            </Link>;
          }
        })}
    </div>
  );
}
