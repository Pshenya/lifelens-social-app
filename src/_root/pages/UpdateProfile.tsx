import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";

import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";
import { useGetUserById, useUpdateUser } from "@/lib/react-query/queriesAndMutations";
import Loader from "@/components/shared/Loader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ProfileUploader from "@/components/shared/ProfileUploader";
import { Models } from "appwrite";
import { useEffect, useState } from "react";

export const ProfileValidation = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  username: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
  bio: z.string(),
});

const UpdateProfile = () => {
  const { toast } = useToast();
  const { user, setUser } = useUserContext();
  const { data: currentUser } = useGetUserById(user.id || "");


  const form = useForm<z.infer<typeof ProfileValidation>>({
    resolver: zodResolver(ProfileValidation),
    defaultValues: {
      file: [],
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio || "",
    },
  });

  const [isFormChanged, setIsFormChanged] = useState(false);
  const watchedFields = form.watch();

  useEffect(() => {
    setIsFormChanged(
      watchedFields.name !== user.name ||
      watchedFields.username !== user.username ||
      watchedFields.email !== user.email ||
      watchedFields.bio !== user.bio ||
      watchedFields.file.length !== 0
    );
  }, [watchedFields, user]);

  // Queries
  const { mutateAsync: updateUser, isPending: isLoadingUpdate, isSuccess: isUpdated } = useUpdateUser();

  if (!currentUser)
    return (
      <div className="common-container_settings min-h-full">
        <div className="flex flex-col flex-1 items-center gap-10 p-6 pt-[120px]">
          <Loader />
        </div>
      </div>
    );

  // Handler
  const handleUpdate = async (value: z.infer<typeof ProfileValidation>) => {
    const updatedUser = await updateUser({
      userId: currentUser.$id,
      name: value.name,
      bio: value.bio,
      file: value.file,
      imageUrl: currentUser.imageUrl,
      imageId: currentUser.imageId,
    });

    if (!updatedUser) {
      toast({
        title: `Update user failed. Please try again.`,
      });
    }

    setUser({
      ...user,
      name: updatedUser?.name,
      bio: updatedUser?.bio,
      imageUrl: updatedUser?.imageUrl,
    });
  };

  return (
    <div className="common-container_settings">
      <div className="flex flex-col flex-1 items-center gap-8 p-6">
        <div className="flex-start gap-3 justify-start w-full max-w-5xl">
          <h2 className="h3-bold md:h2-bold text-left w-full">Your account</h2>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdate)}
            className="flex flex-col gap-7 w-full mt-4 max-w-5xl">
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem className="flex">
                  <FormControl>
                    <ProfileUploader
                      fieldChange={field.onChange}
                      mediaUrl={currentUser.imageUrl}
                    />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Name</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Username</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="shad-input"
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="shad-input"
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      className="shad-textarea custom-scrollbar"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />

            <div className="flex gap-4 items-center justify-end">
              {isUpdated && (
                <>
                  <img src="/assets/icons/check_success.png" alt="success" className="size-5" />
                  <span className="body-regular text-green-400 -ml-2">Successfully updated</span>
                </>
              )}
              <Button
                type="submit"
                className="shad-button_primary whitespace-nowrap"
                disabled={isLoadingUpdate || !isFormChanged}>
                {isLoadingUpdate && <Loader lottie={false}/>}
                Update
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdateProfile;
