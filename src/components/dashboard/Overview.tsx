import React from "react";
import { ItemGroup } from "../ui/item";
import OverviewItem from "../Shared/OverviewItem";
import {
  CheckCircle,
  Eye,
  FolderOpen,
  SquareCheckBig,
  UsersRound,
} from "lucide-react";
import { FaGithub } from "react-icons/fa6";

export default function Overview() {
  const overViewData = [
    { name: "Projects", total: 24, icon: FolderOpen },
    { name: "Repositories", total: 18, icon: FaGithub },
    { name: "Tasks", total: 36, icon: CheckCircle },
    { name: "Portfolio Views", total: 1200, icon: Eye },
    { name: "Followers", total: 128, icon: UsersRound },
    { name: "Completed Tasks", total: 120, icon: SquareCheckBig },
  ];
  return (
    <section className={"space-y-4"}>
      <h1 className={"text-xl font-bold"}>Overview</h1>
      <ItemGroup className="grid grid-cols-6">
        {overViewData.map((data, i) => (
          <OverviewItem key={i} data={data} />
        ))}
      </ItemGroup>
    </section>
  );
}
