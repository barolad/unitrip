import { z } from 'zod';

export const OrganizerSchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
  title: z.string(),
  description: z.string(),
  createdAt: z.date(),
  editedAt: z.date()
});
