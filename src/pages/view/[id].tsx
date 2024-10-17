import ComboChart from "@/components/ComboChart";
import Loader from "@/components/Loader";
import { request } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";

export default function Home() {
  const { query } = useRouter();
  const walletId = query.id;
  const { data, error, isLoading } = useQuery({
    queryKey: [`walletDetails`, walletId],
    queryFn: () =>
      walletId ?
      request(
        `https://onchain.dextrading.com/walletsummary/${walletId}`,
        "get"
      ):null,
    retry: 0,
  });
  if (!data) return <Loader isLoading={true} />;
  const buySellData = data?.totalBuySellTimes?.month;
  const profitData = data?.totalProfits?.month;

  const labels = Object.keys(buySellData);
  const barData: number[] = Object.values(profitData);
  const lineData: number[] = Object.values(buySellData);
  return (
    <div className="container mx-auto px-4 h-screen grid place-content-center">
      <Loader isLoading={isLoading} />
      <ComboChart labels={labels} barData={barData} lineData={lineData} />
    </div>
  );
}
