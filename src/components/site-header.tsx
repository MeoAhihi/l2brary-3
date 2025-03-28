"use client"

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"
import { Fragment } from "react"
export function SiteHeader() {
  const path = usePathname()
  const pathNames = path.split("/").filter((name) => name.length > 0)
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            {pathNames.map((link, index) => {
              const href = `/${pathNames.slice(0, index + 1).join("/")}`;
              const linkName = link.charAt(0).toUpperCase() + link.slice(1);
              const isLast = pathNames.length - 1 === index
              return (
                <Fragment key={index}>
                  <BreadcrumbItem>
                    {isLast
                      ? <BreadcrumbPage>{linkName}</BreadcrumbPage>
                      : <BreadcrumbLink href={href}>
                        {linkName}
                      </BreadcrumbLink>}
                  </BreadcrumbItem>
                </Fragment >
              )
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  )
}
