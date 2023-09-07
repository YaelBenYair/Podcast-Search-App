import * as z from "zod";

const checkPodcastBodySchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  imageUrl: z.string().min(1),
  data: z.string().optional(),
  user: z.string().optional(),
  likes: z.number().optional(),
  episode: z.array(
    z.object({
      name: z.string(),
      audioUrl: z.string(),
    })
  ),
});

export { checkPodcastBodySchema };
