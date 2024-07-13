import { Banner } from "@/components/banner";
import ExamListCard from "./_components/exam-list-card";

function TestSeriesPage() {
    
    return (
        <div>
            <p className="text-center my-5">
                <Banner
                    label={`Apply the coupon code "appu50" to receive a 50% discount.`}
                    variant={"success"}
                />
            </p>
            <ExamListCard />
        </div>
    );
}

export default TestSeriesPage;