import { chatState } from "@/context/ChatProvider";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { LogOutIcon } from "lucide-react";
import { api } from "@/lib/axios";

//TODO: Add picture
const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
});

const ProfileEdit = () => {
  const { user } = chatState();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  function handleLogout() {
    localStorage.setItem("user", "{}");
    delete api.defaults.headers.common["Authorization"];
    window.location.reload();
  }
  return (
    <div className="mt-4 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="rohit@rohit.com"
                    {...field}
                    type="email"
                  />
                </FormControl>
                <FormDescription>
                  This is your email as well as username.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Save Changes</Button>
        </form>
      </Form>
      <div className="buttons flex fixed bottom-5 right-0 gap-20 p-2 transition-all">
        <Button variant={"outline"} className="mr-10" onClick={handleLogout}>
          Logout &nbsp;
          <LogOutIcon />
        </Button>
        <Button variant={"destructive"}>Delete Account</Button>
      </div>
    </div>
  );
};

export default ProfileEdit;
