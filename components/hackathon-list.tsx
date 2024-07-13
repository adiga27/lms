import { Hackathon } from "@prisma/client";
import { HackathonCard } from "./hackathon-card";

interface HackathonListProps {
  items: Hackathon[];
}

export const HackathonList = ({
  items
}: HackathonListProps) => {
  return (
    <>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <HackathonCard
            key={item.id}
            id={item.id}
            organizer={item.organizer}
            objective={item.objective}
            price={item.price!}
            location={item.location}
            team={item.team}
            lastDate={item.lastDate}
            startDate={item.startDate}
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