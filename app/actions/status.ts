"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { statusSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/svg+xml",
  "image/webp",
  "video/mp4",
  "video/quicktime",
  "video/webm",
]);

const ALLOWED_EXTENSIONS = new Set([
  "gif",
  "jpeg",
  "jpg",
  "mov",
  "mp4",
  "pdf",
  "png",
  "svg",
  "webm",
  "webp",
]);

const MAX_STATUS_FILE_SIZE_BYTES = 50 * 1024 * 1024;

function isAllowedStatusFile(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
  const hasAllowedType = ALLOWED_MIME_TYPES.has(file.type);
  const hasAllowedExtension = ALLOWED_EXTENSIONS.has(extension);
  return hasAllowedType || hasAllowedExtension;
}

export async function uploadStatusAction(formData: FormData) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    throw new Error("Unauthorized: You must be logged in to upload statuses.");
  }

  const file = formData.get("file") as File;
  const expiryDays = parseInt(formData.get("expiry_days") as string);

  // Validate expiry
  const result = statusSchema.safeParse({ expiry_days: expiryDays });
  if (!result.success) {
    throw new Error(result.error.issues[0].message);
  }

  if (!file) {
    throw new Error("No file provided");
  }

  if (!isAllowedStatusFile(file)) {
    throw new Error("Only image, video, or PDF files are allowed.");
  }

  if (file.size > MAX_STATUS_FILE_SIZE_BYTES) {
    throw new Error("File is too large. Maximum allowed size is 50MB.");
  }

  try {
    // 1. Upload to Storage using Admin Client (Bypasses RLS)
    const fileExt = file.name.split(".").pop()?.toLowerCase() ?? "bin";
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error: uploadError } = await supabaseAdmin.storage
      .from("status-images")
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) throw uploadError;

    // 2. Get Public URL
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from("status-images")
      .getPublicUrl(fileName);

    // 3. Insert into Database using Admin Client (Bypasses RLS)
    const { error: dbError } = await supabaseAdmin
      .from("statuses")
      .insert([{ image_url: publicUrl, expiry_days: expiryDays }]);

    if (dbError) {
      // ROLLBACK: If DB fails, delete the file we just uploaded to storage
      await supabaseAdmin.storage.from("status-images").remove([fileName]);
      throw dbError;
    }

    // 4. Refresh the cache
    revalidatePath("/admin/dashboard");
    revalidatePath("/");

    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "An unexpected error occurred";
    console.error("Upload Action Error:", error);
    return { success: false, error: message };
  }
}

export async function deleteStatusAction(id: string) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    throw new Error("Unauthorized");
  }

  try {
    // 1. Get the status to find the file name
    const { data: statusData } = await supabaseAdmin
      .from("statuses")
      .select("image_url")
      .eq("id", id)
      .single();

    if (statusData?.image_url) {
      // 2. Extract fileName from publicUrl
      const urlParts = statusData.image_url.split("/");
      const fileName = (urlParts[urlParts.length - 1] ?? "").split("?")[0];

      // 3. Delete from Database
      const { error: dbError } = await supabaseAdmin
        .from("statuses")
        .delete()
        .eq("id", id);
      
      if (dbError) throw dbError;

      // 4. Delete from Storage
      if (fileName) {
        await supabaseAdmin.storage.from("status-images").remove([fileName]);
      }
    }

    revalidatePath("/admin/dashboard");
    revalidatePath("/");
    
    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Delete failed";
    return { success: false, error: message };
  }
}
