import type React from "react";
import FollowerLists from "../FollowerLists/FollowerLists";
import { followerData } from "@/data";
import Form from "./Form";
export default function ContactForm() {
    return (
        <div className="grid w-full gap-12 lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-14">
            <div>
                <h2 className="mb-7 text-xl font-semibold tracking-[-0.025em] text-white">Tell me about your project</h2>
                <Form />
            </div>
            <aside>
                <h2 className="mb-7 text-sm font-medium text-light-gray-3">Find me online</h2>
                <FollowerLists followerData={followerData} />
            </aside>
        </div>
    );
}
