import {
  PencilRuler,
  Building,
  Home,
  Inbox,
  Search,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Route Editor",
    url: "/route-editor",
    icon: PencilRuler,
  },
  {
    title: "Building Editor",
    url: "building-editor",
    icon: Building,
  },
  {
    title: "Settings",
    url: "setting",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar variant="sidebar">
      <SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>IC Maps</SidebarGroupLabel>
          <SidebarGroupContent></SidebarGroupContent>
        </SidebarGroup>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
