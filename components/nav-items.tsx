"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const NavItems = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const params = useParams();
  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Dashboard",
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: "Billboards",
      active:
        pathname === `/${params.storeId}/billboards` ||
        pathname === `/${params.storeId}/billboards/new`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
      active: pathname === `/${params.storeId}/settings`,
    },
  ];

  return (
    <div className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map(({ href, label, active }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            active ? "text-black dark:text-white" : "text-muted-foreground",
          )}
        >
          {label}
        </Link>
      ))}
    </div>
  );
};

export default NavItems;
