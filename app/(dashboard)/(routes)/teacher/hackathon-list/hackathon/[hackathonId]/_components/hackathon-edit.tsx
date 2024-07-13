"use client"

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
import { Trash2 } from "lucide-react";
import { ConfirmModal } from "@/components/modals/confirm-modal";

interface HackathonFormProps {
    initialData:{
        objective: string,
        organizer: string,
        price:number,
        location:string,
        team:number,
        lastDate:string,
        startDate:string,
        link:string
    }
    hackathonId:string
};

function InternshipEdit({initialData,hackathonId}:HackathonFormProps) {
    const formSchema = z.object({
        objective: z.string().default(initialData.objective),
        organizer: z.string().default(initialData.organizer),
        price: z.coerce.number().default(initialData.price),
        location: z.string().default(initialData.location),
        team: z.coerce.number().default(initialData.team),
        lastDate: z.string().default(initialData.lastDate),
        startDate: z.string().default(initialData.startDate),
        link: z.string().default(initialData.link)
    });

    const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/hackathon/${hackathonId}`, values);
      toast.success("Hackathon Updated");
      router.refresh();
      router.push('/teacher/hackathon-list');
    } catch(e) {
      console.error(e);
      toast.error("Something went wrong");
    }
  }
  const onDelete = async() =>{
    try {
      await axios.delete(`/api/hackathon/${hackathonId}`);
  
      toast.success("Hackathon deleted");
      router.refresh();
      router.push(`/teacher/hackathon-list`);
    } catch(e) {
      console.error(e);
      toast.error("Something went wrong");
    }
  }
    return (
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
                        placeholder="Software Development Intern"
                        defaultValue={initialData?.objective}
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
                        placeholder="Micosoft"
                        defaultValue={initialData.organizer}
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
                        placeholder="10,000/month"
                        defaultValue={initialData.price}
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
                        placeholder="Bengaluru"
                        defaultValue={initialData.location}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <Label htmlFor="team" className="text-base">team</Label>
              <FormField
                control={form.control}
                name="team"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="3 months"
                        defaultValue={initialData.team}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <Label htmlFor="lastDate" className="text-base">Last Date to apply</Label>
              <FormField
                control={form.control}
                name="lastDate"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="date"
                        defaultValue={initialData.lastDate}
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
                        type="date"
                        defaultValue={initialData.startDate}
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
                        defaultValue={initialData.link}
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
                type="submit"
              >
                Save
              </Button>
              <ConfirmModal onConfirm={onDelete}>
                <Button size="default" variant="ghost" >
                    <Trash2 className="h-5 w-5" />
                </Button>
               </ConfirmModal>
            </div>
          </form>
        </Form>
    );
}

export default InternshipEdit;