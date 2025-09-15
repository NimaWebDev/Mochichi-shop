import { NextResponse } from "next/server";
import { supabaseAdmin } from "../lib/supabaseAdmin"; 

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({
      page: 1,
      perPage: 100,
    });

    if (error) throw error;

    return NextResponse.json(data.users);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
