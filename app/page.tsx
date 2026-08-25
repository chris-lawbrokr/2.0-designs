import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-1 items-stretch justify-center w-full max-w-[2200px] mx-auto">
      <section className="flex flex-1 items-center justify-center p-4">
        <div className="flex aspect-video w-full max-w-[calc((100vh-3rem-8px)*16/9)] items-center justify-center">
          <Button>Lawbrokr 2.0</Button>
        </div>
      </section>
    </main>
  );
}
