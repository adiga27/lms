import { formatPrice } from "@/lib/format";
import { Banknote, Calendar, MapPin } from "lucide-react";
import Link from "next/link";

type InternshipProps = {
  id:string,
  role:string,
  company:string,
  location:string,
  duration:number,
  lastDate:string,
  link:string,
  price:number,
}

export const InternshipCard = ({
  id,
  role,
  company,
  location,
  duration,
  lastDate,
  link,
  price,
}: InternshipProps) => {
  return (
    <Link href={link} passHref={true}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-4 h-full">
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-lg font-medium group-hover:text-sky-700 transition line-clamp-2">
            {role}
          </div>
          <p className="text-sm text-muted-foreground pb-4">
            {company}
          </p>
          <div className="flex gap-2 flex-col text-slate-600 py-4 border-y-2 border-slate-100 text-sm md:text-sm">
            <p><MapPin className="inline-block h-4 w-4 mr-2 "/>{location}</p>
            <p><Banknote className="inline-block h-4 w-4 mr-2 " />{formatPrice(price)} / month</p>
            <p><Calendar className="inline-block h-4 w-4 mr-2 "/>{duration} months</p>
          </div>
          <div className="flex justify-between items-center text-sm pt-3 text-slate-500">
            <p>Last Date: {lastDate.split("-").reverse().join("-")}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}