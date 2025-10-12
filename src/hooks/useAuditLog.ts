import { supabase } from "@/integrations/supabase/client";

interface AuditLogParams {
  action: string;
  resource_type?: string;
  resource_id?: string;
  metadata?: Record<string, any>;
}

export function useAuditLog() {
  const createAuditLog = async ({
    action,
    resource_type,
    resource_id,
    metadata,
  }: AuditLogParams) => {
    try {
      const { data, error } = await supabase.functions.invoke('create-audit-log', {
        body: {
          action,
          resource_type,
          resource_id,
          metadata,
        },
      });

      if (error) {
        console.error('Error creating audit log:', error);
        return { success: false, error };
      }

      return { success: true, data };
    } catch (error) {
      console.error('Error in createAuditLog:', error);
      return { success: false, error };
    }
  };

  return { createAuditLog };
}
