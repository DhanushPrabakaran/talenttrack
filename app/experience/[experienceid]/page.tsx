import { Suspense } from "react";
import BlogSuspense from "@/components/suspense/BlogSuspence";
import ProjectForm from "../_components/update";

export default async function Page({
  params,
}: {
  params: Promise<{ experienceid: string }>;
}) {
  const experienceid = (await params).experienceid;
  return (
    <div>
      <Suspense fallback={<BlogSuspense />}>
        <ProjectForm experienceid={experienceid} />
      </Suspense>
    </div>
  );
}
