import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { Loader } from "./ui/loader";
import { useToast } from "@/hooks/use-toast";
import { useHistory } from "react-router-dom";
import { api } from "@/lib/axios";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
const Login = () => {
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const history = useHistory();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const { data } = await api.post("/user/login", values);
      localStorage.setItem("user", JSON.stringify(data));
      history.push("/chat");
    } catch (error) {
      setLoading(false);
      toast({
        value: "Something went wrong",
        description: "Please try again later",
      });
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Please login</CardTitle>
        <CardDescription>
          Please login to experience seamless chatting
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="rohit@rohit.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="********" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-[100px]" disabled={loading} type="submit">
              {loading ? <Loader /> : "Login"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
};

export default Login;
