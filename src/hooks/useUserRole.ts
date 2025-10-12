import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type UserRole = "admin" | "moderator" | "user";

export function useUserRole() {
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModerator, setIsModerator] = useState(false);

  useEffect(() => {
    async function fetchUserRoles() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setIsLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id);

        if (error) {
          console.error("Error fetching user roles:", error);
          setIsLoading(false);
          return;
        }

        const userRoles = data.map(r => r.role as UserRole);
        setRoles(userRoles);
        setIsAdmin(userRoles.includes("admin"));
        setIsModerator(userRoles.includes("moderator"));
      } catch (error) {
        console.error("Error in fetchUserRoles:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserRoles();
  }, []);

  return { roles, isLoading, isAdmin, isModerator };
}
