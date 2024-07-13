import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

function HomePage() {
    return (
        <div className="grid grid-cols-2 py-10 px-20">
            <Image
                src="/hero.jpg"
                alt="Hero"
                width={500}
                height={300}
                className="rounded-tl-3xl rounded-bl-3xl"
            />
            <div className="py-5">
                <h2 className="text-5xl font-semibold pb-6">Streamline Your Learning Experience with Our Advanced Edu Flow.</h2>
                <p className="text-lg pb-4">A Edu Flow is a software application designed to deliver, manage, and track educational content and training programs. Edu Flow platforms provide a structured environment for educators to create and distribute content, for learners to access and engage with educational material, and for administrators to monitor and assess the learning process. They are widely used in various educational settings, including schools, universities, and corporate training programs.</p>
                <Button variant="success" size="lg">
                <Link href="/dashboard">
                    Learn More
                </Link>
                </Button>
            </div>
        </div>
    );
}

export default HomePage;