import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { validateWebhookSignature } from 'razorpay/dist/utils/razorpay-utils';

import { db } from "@/lib/db";

export async function POST(req: Request) {
  const webhookBody = await req.text();
  const webhookSignature = headers().get("X-Razorpay-Signature") as string;
  const webhookEventId = headers().get("X-Razorpay-Event-Id") as string;
  const webhookJson = JSON.parse(webhookBody);

  try {
    const eventId = await db.razorPayWebhook.findUnique({
      where:{
        webhookEventId: webhookEventId 
      },
      select:{
        webhookEventId:true
      }
    });

    if(eventId?.webhookEventId === webhookEventId){
      return new NextResponse(`Webhook Duplicate Detected`, { status: 400 })
    }

    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET!;
    const validation = validateWebhookSignature(webhookBody, webhookSignature, webhookSecret)

    if (validation) {
      const event:string = webhookJson?.event;
      const paymentId:string = webhookJson?.payload?.payment?.entity?.id;
      const orderId:string = webhookJson?.payload?.payment?.entity?.order_id;
      const userId:string = webhookJson?.payload?.payment?.entity?.notes?.userId;
      const courseId:string = webhookJson?.payload?.payment?.entity?.notes?.courseId;

      if (!event || !paymentId || !orderId) {
        return new NextResponse(`Webhook Error: Missing event, orderId and paymentId`, { status: 400 });
      }

      if (!userId || !courseId) {
        return new NextResponse(`Webhook Error: Missing CourseId and userId`, { status: 400 });
      }

      await db.razorPayWebhook.create({
        data:{
          webhookEventId,
          event,
          paymentId,
          orderId,
          userId
        }
      })

      if(event === "payment.captured"){
        await db.purchase.create({
          data: {
            courseId: courseId,
            userId: userId,
          }
        });
      }
    } else {
      console.error("Validation Error");
      return new NextResponse(`Webhook Error: Validation Error`, { status: 400 })
    }

  } catch (error: any) {
    console.error(`[WEBHOOK_ERROR]:${error}`);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
  }

  return new NextResponse(null, { status: 200 });
}