import { 
  FileText, Home, MapPin, Umbrella, Truck, Car, HardHat, 
  UtensilsCrossed, Wine, AlertCircle, Users, Wrench, Ship 
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const formItems = [
  { title: "Business Intake", url: "/", icon: Home, required: true },
  { title: "Property/Location", url: "/property", icon: MapPin },
  { title: "GL Form", url: "/gl-form", icon: FileText },
  { title: "Umbrella", url: "/umbrella", icon: Umbrella },
  { title: "Drivers", url: "/drivers", icon: Truck },
  { title: "Auto", url: "/auto", icon: Car },
  { title: "Contractors", url: "/contractors", icon: HardHat },
  { title: "Restaurant", url: "/restaurant", icon: UtensilsCrossed },
  { title: "Liquor Liability", url: "/liquor-liability", icon: Wine },
  { title: "Errors & Omissions", url: "/errors-omissions", icon: AlertCircle },
  { title: "Directors & Officers", url: "/directors-officers", icon: Users },
  { title: "Garage & Dealers", url: "/garage-dealers", icon: Wrench },
  { title: "Inland Marine", url: "/inland-marine", icon: Ship },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar className="border-r border-border/50 backdrop-blur-sm bg-card/95">
      <SidebarContent>
        <div className="p-6 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-accent flex items-center justify-center">
              <FileText className="h-5 w-5 text-accent-foreground" />
            </div>
            {open && (
              <div>
                <h2 className="font-bold text-lg text-foreground">Joyce Forms</h2>
                <p className="text-xs text-muted-foreground">Insurance Applications</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">
            Form Types
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {formItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent/10 transition-all duration-200 rounded-lg mx-2"
                      activeClassName="bg-accent/15 text-accent font-semibold shadow-sm"
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {open && (
                        <span className="flex-1">
                          {item.title}
                          {item.required && (
                            <span className="text-destructive ml-1">*</span>
                          )}
                        </span>
                      )}
                    </NavLink>
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
