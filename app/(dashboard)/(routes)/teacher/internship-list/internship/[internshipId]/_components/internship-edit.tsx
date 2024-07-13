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

interface InternshipFormProps {
    initialData:{
        role: string,
        company: string,
        price:number,
        location:string,
        duration:number,
        lastDate:string,
        link:string
    }
    internshipId:string
};

function InternshipEdit({initialData,internshipId}:InternshipFormProps) {
    const formSchema = z.object({
        role: z.string().default(initialData.role),
        company: z.string().default(initialData.company),
        price: z.coerce.number().default(initialData.price),
        location: z.string().default(initialData.location),
        duration: z.coerce.number().default(initialData.duration),
        lastDate: z.string().default(initialData.lastDate),
        link: z.string().default(initialData.link)
    });

    const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/internship/${internshipId}`, values);
      toast.success("Internship Updated");
      router.refresh();
      router.push('/teacher/internship-list');
    } catch(e) {
      console.log(e);
      toast.error("Something went wrong");
    }
  }
  const onDelete = async() =>{
    try {
      await axios.delete(`/api/internship/${internshipId}`);
  
      toast.success("Internship deleted");
      router.refresh();
      router.push(`/teacher/internship-list`);
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
              <Label htmlFor="role" className="text-base">Role</Label>
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Software Development Intern"
                        defaultValue={initialData?.role}
                        {...field}
                        />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
            </div>
            <div>
              <Label htmlFor="company" className="text-base">Company</Label>
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Micosoft"
                        defaultValue={initialData.company}
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
              <Label htmlFor="duration" className="text-base">Duration</Label>
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="3 months"
                        defaultValue={initialData.duration}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <Label htmlFor="lastDate" className="text-base">LastDate</Label>
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