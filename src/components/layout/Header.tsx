
import { ShoppingCart, User, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-6">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="px-2 py-4">
                  <MobileNav />
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-pharma-primary">CureConnect</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link to="/medicines" className="text-sm font-medium hover:text-pharma-primary transition-colors">
              Medicines
            </Link>
            <Link to="/upload-prescription" className="text-sm font-medium hover:text-pharma-primary transition-colors">
              Upload Prescription
            </Link>
            <Link to="/symptom-checker" className="text-sm font-medium hover:text-pharma-primary transition-colors">
              Symptom Checker
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-2 -right-2 bg-pharma-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              0
            </span>
          </Link>
          {isLoggedIn ? (
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-transparent">
                    <User className="h-5 w-5" />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-2 p-2">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/profile" className="block p-2 hover:bg-muted rounded-md">
                            Profile
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/orders" className="block p-2 hover:bg-muted rounded-md">
                            Orders
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start hover:bg-muted"
                          onClick={() => setIsLoggedIn(false)}
                        >
                          Logout
                        </Button>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          ) : (
            <Link to="/login">
              <Button className="bg-pharma-primary hover:bg-pharma-primary/90">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

const MobileNav = () => {
  return (
    <div className="flex flex-col gap-4">
      <Link to="/medicines" className="text-sm font-medium p-2 hover:bg-muted rounded-md">
        Medicines
      </Link>
      <Link to="/upload-prescription" className="text-sm font-medium p-2 hover:bg-muted rounded-md">
        Upload Prescription
      </Link>
      <Link to="/symptom-checker" className="text-sm font-medium p-2 hover:bg-muted rounded-md">
        Symptom Checker
      </Link>
    </div>
  );
};

export default Header;
