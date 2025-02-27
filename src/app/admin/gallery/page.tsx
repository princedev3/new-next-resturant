"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateGalleryMutation } from "@/apis/_gallery_index.api";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { gallerySchema } from "@/static/schema";
import GetAdminGallery from "@/components/admin/get-admin-gallery";

const GalleryPage = () => {
  const [createGallery, { isLoading, isSuccess }] = useCreateGalleryMutation();
  const form = useForm<z.infer<typeof gallerySchema>>({
    resolver: zodResolver(gallerySchema),
    defaultValues: {
      name: "",
      image: [],
    },
  });

  async function onSubmit(values: z.infer<typeof gallerySchema>) {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("image", values.image[0]);
    await createGallery(formData);
  }
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    form.setValue("image", Array.from(files));
  };

  useEffect(() => {
    if (isSuccess) {
      form.reset();
    }
  }, [isSuccess]);
  return (
    <div className="p-3 grid gap-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>name</FormLabel>
                <FormControl>
                  <Input placeholder="Hall name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hall Image</FormLabel>
                <FormControl>
                  <Input
                    placeholder="hall image"
                    type="file"
                    onChange={handleImage}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isLoading}
            type="submit"
            className="w-full bg-[#066458] hover:bg-[#066458]"
          >
            {isLoading ? (
              <LoaderCircle className="animate-spin text-center" size={20} />
            ) : (
              "Create gallery"
            )}
          </Button>
        </form>
      </Form>
      <GetAdminGallery />
    </div>
  );
};

export default GalleryPage;
