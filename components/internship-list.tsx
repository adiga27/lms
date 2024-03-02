import { Internship } from "@prisma/client";

import { InternshipCard } from "./internship-card";

interface InternshipListProps {
  items: Internship[];
}

export const InternshipList = ({
  items
}: InternshipListProps) => {
  return (
    <>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <InternshipCard
            key={item.id}
            id={item.id}
            role={item.role}
            company={item.company}
            price={item.price!}
            location={item.location}
            duration={item.duration}
            lastDate={item.lastDate}
            link={item.link}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No Intership found
        </div>
      )}
    </>
  )
}