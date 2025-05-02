import Image from "next/image";
import icon_instagram from "$/img/icons/instagram.png";
import icon_facebook from "$/img/icons/facebook.png";
import icon_linkedin from "$/img/icons/linkedin.png";
import Link from "next/link";

export default function SocialMedias({url}: { url: string }) {
    console.log(url)
    const iconImage = url.includes("facebook") ? icon_facebook : url.includes("instagram") ? icon_instagram : url.includes("linkedin") ? icon_linkedin : null;
    const altIconImage = url.includes("facebook") ? "icon facebook" : url.includes("instagram") ? "icon instagram" : url.includes("linkedin") ? "icon linkedin" : null;

    return (
        <div className={`flex gap-2 items-center item-hidden`}>
            <Link
                href={{pathname: `https://${url}`}}
                target="_blank"
            >
                <Image
                    src={iconImage ?? ''}
                    alt={altIconImage ?? ''}
                    width={36}
                    height={36}
                />
            </Link>
        </div>
    );
}
