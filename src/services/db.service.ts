import { supabase } from "@/config/supabase";

export const DbService = {

  // Fetch all records from a table 
  getAll: async (table: string, options?: { select?: string, order?: { column: string, ascending?: boolean } }) => {
    let query = supabase.from(table).select(options?.select || "*");

    if (options?.order) {
      query = query.order(options.order.column, { ascending: options.order.ascending ?? true });
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  // Fetch a single record by ID
  getById: async (table: string, id: string | number, idColumn = "id", select = "*") => {
    const { data, error } = await supabase
      .from(table)
      .select(select)
      .eq(idColumn, id)
      .single();

    if (error) throw error;
    return data;
  },

  // Insert a new record
  insert: async (table: string, payload: any) => {
    const { data, error } = await supabase
      .from(table)
      .insert(payload)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update an existing record
  update: async (table: string, id: string | number, payload: any, idColumn = "id") => {
    const { data, error } = await supabase
      .from(table)
      .update(payload)
      .eq(idColumn, id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete a record
  delete: async (table: string, id: string | number, idColumn = "id") => {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq(idColumn, id);

    if (error) throw error;
    return true;
  },
};
