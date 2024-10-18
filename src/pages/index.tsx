import Pagination from "@/components/Pagination";
import { useRouter } from "next/router";
import { useEffect } from "react";
import data from "@/data/valuable_wallets.json";
import { WalletType } from "@/types/types";
import Link from "next/link";

const ITEMS_PER_PAGE = 5;

export default function Home() {
  const router = useRouter();
  const query = router.query;
  const currentSort: string = query.sort as string;
  const currentPage: number = query.page ? parseInt(query.page as string) : 1;

  const items = data as WalletType[];

  const sortedItems = items.sort((a, b) => {
    if (currentSort) {
      return currentSort === "asc"
        ? a.netProfit - b.netProfit
        : b.netProfit - a.netProfit;
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedItems.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentItems = sortedItems.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="container mx-auto h-screen grid place-content-center">
      <div className="overflow-x-auto shadow-2xl">
        <table className="table">
          <thead>
            <tr>
              <th className="text-lg text-white">
                <Link
                  href={{
                    search: `sort=${currentSort === "asc" ? "desc" : "asc"}`,
                  }}
                >
                  netProfit
                  <i
                    className={`ml-2 bx bx-sort-${
                      currentSort === "asc" ? "a-z" : "z-a"
                    }`}
                  ></i>
                </Link>
              </th>
              <th className="text-lg text-white">walletAddress</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, i) => (
              <tr
                key={i}
                className="cursor-pointer"
                onClick={() => router.push(`/view/${item["walletAddress"]}`)}
              >
                <td>{item["netProfit"]}</td>
                <td>{item["walletAddress"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination all={totalPages} />
    </div>
  );
}
