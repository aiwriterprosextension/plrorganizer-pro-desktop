import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.webp";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Settings, Shield, User } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { useUserRole } from "@/hooks/useUserRole";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Header() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const { isAdmin } = useUserRole();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="PLR Organizer Pro - Intelligent PLR Content Management" className="h-10" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Dashboard</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/dashboard"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">PLR Library</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              View and manage your PLR content
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/dashboard/license-tracker"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">License Tracker</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Track licenses and restrictions
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/dashboard/analytics"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">ROI Analytics</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              View revenue and ROI metrics
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/features/smart-organization"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Smart Organization</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              AI-powered content categorization
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/features/content-enhancement"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Content Enhancement</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Edit and optimize your PLR content
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/features/license-tracking"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">License Tracking</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Manage usage rights and licenses
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/features/batch-processing"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Batch Processing</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Automate multiple file operations
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/tools/content-spinner"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Content Spinner</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              AI-powered content rewriting
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/tools/seo-analyzer"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">SEO Analyzer</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Optimize content for search
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/tools/brand-kit"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Brand Kit</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Apply consistent branding
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/tools/batch-editor"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Batch Editor</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Bulk text operations
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li className="md:col-span-2">
                        <NavigationMenuLink asChild>
                          <Link
                            to="/tools"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">View All Tools</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              See the complete tool suite
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/resources/guides"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Guides</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Step-by-step tutorials
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/resources/templates"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Templates</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Ready-to-use templates
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/resources/faq"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">FAQ</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Common questions answered
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/resources/support"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Support</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Get help & contact us
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/blog"
                      className={`text-sm font-medium transition-colors hover:text-primary ${
                        isActive("/blog") ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      Blog
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link
              to="/pricing"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/pricing") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Pricing
            </Link>
          </div>

          <div className="hidden md:flex gap-4 items-center">
            {session ? (
              <>
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="outline" size="sm">
                      <Shield className="h-4 w-4 mr-2" />
                      Admin
                    </Button>
                  </Link>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Avatar>
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="cursor-pointer">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings" className="cursor-pointer">
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Link to="/auth">
                  <Button>Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <div className="pt-2 pb-2">
                  <p className="text-sm font-semibold text-muted-foreground mb-2">Dashboard</p>
                  <div className="flex flex-col gap-2 ml-4">
                    <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-base">
                      PLR Library
                    </Link>
                    <Link to="/dashboard/license-tracker" onClick={() => setIsOpen(false)} className="text-base">
                      License Tracker
                    </Link>
                    <Link to="/dashboard/analytics" onClick={() => setIsOpen(false)} className="text-base">
                      ROI Analytics
                    </Link>
                  </div>
                </div>
                <Link to="/features/smart-organization" onClick={() => setIsOpen(false)} className="text-lg font-medium">
                  Smart Organization
                </Link>
                <Link to="/features/content-enhancement" onClick={() => setIsOpen(false)} className="text-lg font-medium">
                  Content Enhancement
                </Link>
                <Link to="/features/license-tracking" onClick={() => setIsOpen(false)} className="text-lg font-medium">
                  License Tracking
                </Link>
                <Link to="/features/batch-processing" onClick={() => setIsOpen(false)} className="text-lg font-medium">
                  Batch Processing
                </Link>
                <div className="pt-4 pb-2">
                  <p className="text-sm font-semibold text-muted-foreground mb-2">Tools</p>
                  <div className="flex flex-col gap-2 ml-4">
                    <Link to="/tools/content-spinner" onClick={() => setIsOpen(false)} className="text-base">
                      Content Spinner
                    </Link>
                    <Link to="/tools/seo-analyzer" onClick={() => setIsOpen(false)} className="text-base">
                      SEO Analyzer
                    </Link>
                    <Link to="/tools/brand-kit" onClick={() => setIsOpen(false)} className="text-base">
                      Brand Kit
                    </Link>
                    <Link to="/tools/batch-editor" onClick={() => setIsOpen(false)} className="text-base">
                      Batch Editor
                    </Link>
                    <Link to="/tools" onClick={() => setIsOpen(false)} className="text-base font-medium">
                      View All Tools
                    </Link>
                  </div>
                </div>
                <div className="pt-2 pb-2">
                  <p className="text-sm font-semibold text-muted-foreground mb-2">Resources</p>
                  <div className="flex flex-col gap-2 ml-4">
                    <Link to="/resources/guides" onClick={() => setIsOpen(false)} className="text-base">
                      Guides
                    </Link>
                    <Link to="/resources/templates" onClick={() => setIsOpen(false)} className="text-base">
                      Templates
                    </Link>
                    <Link to="/resources/faq" onClick={() => setIsOpen(false)} className="text-base">
                      FAQ
                    </Link>
                    <Link to="/resources/support" onClick={() => setIsOpen(false)} className="text-base">
                      Support
                    </Link>
                  </div>
                </div>
                <Link to="/blog" onClick={() => setIsOpen(false)} className="text-lg font-medium">
                  Blog
                </Link>
                <Link to="/pricing" onClick={() => setIsOpen(false)} className="text-lg font-medium">
                  Pricing
                </Link>
                <div className="flex flex-col gap-2 mt-4">
                  <Link to="/auth" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">Sign In</Button>
                  </Link>
                  <Link to="/auth" onClick={() => setIsOpen(false)}>
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
