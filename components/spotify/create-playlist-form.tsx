"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(1, "Name is required").max(25),
  public: z.boolean().default(false),
  collaborative: z.boolean().default(false),
  description: z.string().max(50).optional(),
});

const createPlaylist = async (
  userId: string,
  data: z.infer<typeof formSchema>
) => {
  const response = await fetch("/api/spotify/playlists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      ...data,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create playlist");
  }

  const result = await response.json();
  return result;
};

export const CreatePlaylistForm = ({ userId }: { userId: string }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      public: true,
      collaborative: false,
    },
  });

  const router = useRouter();

  const { mutate, isError } = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) =>
      createPlaylist(userId, values),
    onSuccess: async (data) => {
      router.push(`/mixtapes/${data.id}`);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  if (isError) {
    return <div>something went wrong...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mixtape Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
