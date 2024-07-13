import Image from "next/image";
import Link from "next/link";

function Logo() {
    return (
        <Link href="/">
            <Image
                height={130}
                width={130}
                alt="logo"
                src='/logo.jpg'
                />
        </Link>
    );
}

export default Logo;