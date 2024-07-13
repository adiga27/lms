"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { useRouter } from "next/navigation";

interface CourseEnrollButtonProps {
  price: number;
  userId:string;
  courseId: string;
}

function loadScript(src:string){
  return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

export const CourseEnrollButton = ({
  price,
  courseId,
  userId
}: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onClick = async () => {
    try {
      setIsLoading(true);

      const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

      if (!res) {
        toast.error('Razorpay SDK failed to load. Are you online?');
      }

      const {data} = await axios.post(`/api/courses/${courseId}/checkout`);
      
      if(!data || !data.id){
        return toast.error("Something went Wrong");
      }
      const options = {
        "key": `${process.env.NEXT_PUBLIC_RAZORPAY_TEST_KEY_ID}`, 
        "amount": `${data.amount}`,
        "currency": `${data.currency}`,
        "name": "LMS", 
        "description": "Test Transaction",
        "image": "http://localhost:3000/logo.svg",
        "order_id": `${data.id}`, 
        "handler": function (response: any){
          toast.success("Payment Sucessfull");
          router.refresh();
        },
        "prefill": { 
          "name": `${data.name}`, 
          "email": `${data.email}`, 
          "contact": `${data.mobile}`  
        },
        "notes":{
          "userId":`${userId}`,
          "courseId":`${courseId}`
        }
      }
      const rzp1 = new (window as any).Razorpay(options);
      rzp1.open();
      rzp1.on('payment.failed', function (response:any){
        toast.error("Payment Failed");
      });
    } catch(e) {
      console.error(e);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      size="sm"
      className="w-full md:w-auto"
    >
      Enroll for {formatPrice(price)}
    </Button>
  )
}