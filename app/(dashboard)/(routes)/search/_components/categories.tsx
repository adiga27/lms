"use client";

import { Category } from "@prisma/client";
import {
  FcAndroidOs,
  FcAutomotive,
  FcBusiness,
  FcBusinessContact,
  FcCapacitor,
  FcCommandLine,
  FcDataBackup,
  FcDataConfiguration,
  FcDataEncryption,
  FcDataProtection,
  FcDataSheet,
  FcDatabase,
  FcElectricalThreshold,
  FcElectroDevices,
  FcElectronics,
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcNeutralDecision,
  FcNeutralTrading,
  FcOldTimeCamera,
  FcProcess,
  FcSalesPerformance,
  FcSettings,
  FcSportsMode,
  FcTrademark
} from "react-icons/fc";
import { IconType } from "react-icons";

import { CategoryItem } from "./category-item";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  "Electrical and Electronical Engineering": FcCapacitor,
  "Electronics and Communication Engineering": FcElectronics,
  "AIMl Engineering": FcNeutralTrading,
  "Civil Engineering": FcSalesPerformance,
  "Computer Science and Engineering": FcMultipleDevices,
  "Information Science Engineering": FcDataConfiguration,
  "Mechanical Engineering": FcEngineering,
};

export const Categories = ({
  items,
}: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  )
}