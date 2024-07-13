import { db } from "@/lib/db";
import { razorpay } from "@/lib/razorpay-credentials";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await currentUser();

    if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        isPublished: true,
      }
    });

    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: params.courseId
        }
      }
    });

    if (purchase) {
      return new NextResponse("Already purchased", { status: 400 });
    }

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    const options = {
        amount: (course.price ?? 0) * 100,
        currency: 'INR',
        receipt: "sfsdfsdf",
        payment_capture:1
    }

    const response = await razorpay.orders.create(options)
		console.log(response)
    
    return NextResponse.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
      name: user.firstName+" "+user.lastName,
      email: user.emailAddresses[0].emailAddress,
      mobile:user?.phoneNumbers[0]?.phoneNumber
    });
  } catch (error) {
    console.log("[COURSE_ID_CHECKOUT]", error);
    return new NextResponse("Internal Error", { status: 500 })
  }
}