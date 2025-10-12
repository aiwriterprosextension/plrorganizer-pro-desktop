export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          created_at: string | null
          id: string
          ip_address: string | null
          metadata: Json | null
          resource_id: string | null
          resource_type: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          resource_id?: string | null
          resource_type?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          resource_id?: string | null
          resource_type?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      brand_kits: {
        Row: {
          created_at: string
          font_body: string | null
          font_heading: string | null
          id: string
          logo_url: string | null
          name: string
          primary_color: string | null
          secondary_color: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          font_body?: string | null
          font_heading?: string | null
          id?: string
          logo_url?: string | null
          name: string
          primary_color?: string | null
          secondary_color?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          font_body?: string | null
          font_heading?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          primary_color?: string | null
          secondary_color?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      license_keys: {
        Row: {
          created_at: string
          id: string
          key: string
          product: string
          status: string
          transaction_id: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          key: string
          product: string
          status?: string
          transaction_id: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          key?: string
          product?: string
          status?: string
          transaction_id?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      plr_items: {
        Row: {
          access_count: number | null
          attribution_required: boolean | null
          category_id: string | null
          created_at: string
          description: string | null
          duplicate_of: string | null
          estimated_value: number | null
          file_size: number | null
          file_type: string | null
          file_url: string | null
          id: string
          is_duplicate: boolean | null
          is_favorite: boolean | null
          last_accessed_at: string | null
          license_expires_at: string | null
          license_restrictions: string | null
          license_type: string | null
          niche: string | null
          notes: string | null
          purchase_date: string | null
          purchase_price: number | null
          quality_rating: string | null
          scan_confidence: number | null
          search_vector: unknown | null
          seller_name: string | null
          status: string | null
          sub_niche: string | null
          tags: string[] | null
          target_folder: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          access_count?: number | null
          attribution_required?: boolean | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          duplicate_of?: string | null
          estimated_value?: number | null
          file_size?: number | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          is_duplicate?: boolean | null
          is_favorite?: boolean | null
          last_accessed_at?: string | null
          license_expires_at?: string | null
          license_restrictions?: string | null
          license_type?: string | null
          niche?: string | null
          notes?: string | null
          purchase_date?: string | null
          purchase_price?: number | null
          quality_rating?: string | null
          scan_confidence?: number | null
          search_vector?: unknown | null
          seller_name?: string | null
          status?: string | null
          sub_niche?: string | null
          tags?: string[] | null
          target_folder?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          access_count?: number | null
          attribution_required?: boolean | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          duplicate_of?: string | null
          estimated_value?: number | null
          file_size?: number | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          is_duplicate?: boolean | null
          is_favorite?: boolean | null
          last_accessed_at?: string | null
          license_expires_at?: string | null
          license_restrictions?: string | null
          license_type?: string | null
          niche?: string | null
          notes?: string | null
          purchase_date?: string | null
          purchase_price?: number | null
          quality_rating?: string | null
          scan_confidence?: number | null
          search_vector?: unknown | null
          seller_name?: string | null
          status?: string | null
          sub_niche?: string | null
          tags?: string[] | null
          target_folder?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "plr_items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plr_items_duplicate_of_fkey"
            columns: ["duplicate_of"]
            isOneToOne: false
            referencedRelation: "plr_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plr_items_duplicate_of_fkey"
            columns: ["duplicate_of"]
            isOneToOne: false
            referencedRelation: "plr_roi_analytics"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          dashboard_view_mode: string | null
          default_sort_by: string | null
          default_sort_order: string | null
          full_name: string | null
          id: string
          items_per_page: number | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          dashboard_view_mode?: string | null
          default_sort_by?: string | null
          default_sort_order?: string | null
          full_name?: string | null
          id: string
          items_per_page?: number | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          dashboard_view_mode?: string | null
          default_sort_by?: string | null
          default_sort_order?: string | null
          full_name?: string | null
          id?: string
          items_per_page?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      saved_searches: {
        Row: {
          created_at: string | null
          criteria: Json
          id: string
          is_pinned: boolean | null
          name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          criteria: Json
          id?: string
          is_pinned?: boolean | null
          name: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          criteria?: Json
          id?: string
          is_pinned?: boolean | null
          name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      scan_cache: {
        Row: {
          created_at: string | null
          detected_niche: string | null
          file_hash: string
          file_path: string
          file_size: number | null
          id: string
          last_modified: string | null
          license_type: string | null
          metadata: Json | null
          plr_confidence: number | null
          scan_date: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          detected_niche?: string | null
          file_hash: string
          file_path: string
          file_size?: number | null
          id?: string
          last_modified?: string | null
          license_type?: string | null
          metadata?: Json | null
          plr_confidence?: number | null
          scan_date?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          detected_niche?: string | null
          file_hash?: string
          file_path?: string
          file_size?: number | null
          id?: string
          last_modified?: string | null
          license_type?: string | null
          metadata?: Json | null
          plr_confidence?: number | null
          scan_date?: string | null
          user_id?: string
        }
        Relationships: []
      }
      scan_sessions: {
        Row: {
          created_at: string | null
          id: string
          plr_detected: number | null
          scan_date: string | null
          scan_options: Json | null
          status: string | null
          total_files: number | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          plr_detected?: number | null
          scan_date?: string | null
          scan_options?: Json | null
          status?: string | null
          total_files?: number | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          plr_detected?: number | null
          scan_date?: string | null
          scan_options?: Json | null
          status?: string | null
          total_files?: number | null
          user_id?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          cancel_at_period_end: boolean | null
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          id: string
          plan_name: string
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          cancel_at_period_end?: boolean | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_name: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          cancel_at_period_end?: boolean | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_name?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      usage_history: {
        Row: {
          created_at: string | null
          id: string
          notes: string | null
          platform: string
          plr_item_id: string
          published_at: string | null
          published_url: string | null
          revenue_generated: number | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          notes?: string | null
          platform: string
          plr_item_id: string
          published_at?: string | null
          published_url?: string | null
          revenue_generated?: number | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          notes?: string | null
          platform?: string
          plr_item_id?: string
          published_at?: string | null
          published_url?: string | null
          revenue_generated?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "usage_history_plr_item_id_fkey"
            columns: ["plr_item_id"]
            isOneToOne: false
            referencedRelation: "plr_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usage_history_plr_item_id_fkey"
            columns: ["plr_item_id"]
            isOneToOne: false
            referencedRelation: "plr_roi_analytics"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      watch_folders: {
        Row: {
          auto_import: boolean | null
          created_at: string | null
          folder_path: string
          id: string
          last_scan: string | null
          user_id: string
        }
        Insert: {
          auto_import?: boolean | null
          created_at?: string | null
          folder_path: string
          id?: string
          last_scan?: string | null
          user_id: string
        }
        Update: {
          auto_import?: boolean | null
          created_at?: string | null
          folder_path?: string
          id?: string
          last_scan?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      plr_roi_analytics: {
        Row: {
          id: string | null
          niche: string | null
          purchase_price: number | null
          quality_rating: string | null
          roi_multiplier: number | null
          seller_name: string | null
          times_used: number | null
          title: string | null
          total_revenue: number | null
          user_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_user_roles: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"][]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
