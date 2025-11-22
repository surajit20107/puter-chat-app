import ChatInterface from "@/components/ChatInterface";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start sm:justify-center p-0 sm:p-6 md:p-24 bg-gray-100">
      <div className="z-10 w-full h-full sm:h-auto">
        <ChatInterface />
      </div>
    </main>
  );
}