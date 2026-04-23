import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address").optional().or(z.literal("")),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const statusSchema = z.object({
  expiry_days: z.number().min(1, "Must stay for at least 1 day").max(30, "Maximum 30 days"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
