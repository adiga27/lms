import { formatPrice } from "@/lib/format";
import { Banknote, Calendar, MapPin, User2 } from "lucide-react";
import Link from "next/link";

type HackathonProps = {
  id:string,
  objective:string,
  organizer:string,
  location:string,
  team:number,
  lastDate:string,
  startDate:string,
  link:string,
  price:number,
}

export const HackathonCard = ({
  id,
  organizer,
  objective,
  location,
  team,
  lastDate,
  startDate,
  link,
  price,
}: HackathonProps) => {
  return (
    <Link href={link} passHref={true}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-4 h-full">
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-lg font-medium group-hover:text-sky-700 transition line-clamp-2">
            {organizer}
          </div>
          <p className="text-sm text-muted-foreground pb-4">
            {objective}
          </p>
          <div className="flex gap-2 flex-col text-slate-600 py-4 border-y-2 border-slate-100 text-sm md:text-sm">
            <p><MapPin className="inline-block h-4 w-4 mr-2 "/>{location}</p>
            <p><Banknote className="inline-block h-4 w-4 mr-2 " />{formatPrice(price)} / month</p>
            <p><User2 className="inline-block h-4 w-4 mr-2 "/>{team} people</p>
          </div>
          <div className="flex flex-col gap-y-2 text-sm pt-3 text-slate-500">
            <p>Last Date to apply: {lastDate.split("-").reverse().join("-")}</p>
            <p>Start Date: {startDate.split("-").reverse().join("-")}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}