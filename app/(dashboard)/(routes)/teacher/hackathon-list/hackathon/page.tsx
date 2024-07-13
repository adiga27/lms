"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  objective: z.string().min(1, {
    message: "Objective is required",
  }),
  organizer: z.string().min(1, {
    message: "Organizer is required",
  }),
  price: z.coerce.number().min(1),
  location: z.string().min(1, {
    message: "Title is required",
  }),
  team: z.coerce.number(),
  lastDate: z.string().min(1),
  startDate: z.string().min(1),
  link: z.string().min(1)
});

const HackathonFormPage = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/hackathon`, values);
      toast.success("Hackathon Added");
      router.refresh();
      router.push('/teacher/hackathon-list');
    } catch(e) {
      console.log(e);
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="mt-6 borde p-8">
      <div className="text-2xl font-medium mb-8">
        Hackathon Form
      </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 grid grid-cols-1  md:grid-cols-3 gap-20"
          >
            <div>
              <Label htmlFor="objective" className="text-base">Objective</Label>
              <FormField
                control={form.control}
                name="objective"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="Safe Data Management Solution For Hospitals"
                        {...field}
                        />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
            </div>
            <div>
              <Label htmlFor="organizer" className="text-base">Organizer</Label>
              <FormField
                control={form.control}
                name="organizer"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="Micosoft"
                        {...field}
                        />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
            </div>
            <div>
              <Label htmlFor="price" className="text-base">Stipend</Label>
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                      type="number"
                        disabled={isSubmitting}
                        placeholder="1,00,000/team"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <Label htmlFor="location" className="text-base">Location</Label>
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="Bengaluru"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <Label htmlFor="team" className="text-base">Team</Label>
              <FormField
                control={form.control}
                name="team"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        disabled={isSubmitting}
                        placeholder="4 people"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <Label htmlFor="lastDate" className="text-base">Last Date to Apply</Label>
              <FormField
                control={form.control}
                name="lastDate"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        type="date"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <Label htmlFor="startDate" className="text-base">Start Date</Label>
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        type="date"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <Label htmlFor="link" className="text-base">Company Link</Label>
              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="www.microsoft.com/hackathon"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center gap-x-2 self-end">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
    </div>
  )
}

export default HackathonFormPage;