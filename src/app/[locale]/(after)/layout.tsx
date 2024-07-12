import ChatbotMain from '@/components/chatbot/ChatbotMain';
import HeadersNav from '@/components/headers/HeadersNav';
import { SessionContext } from '@/components/shared/SessionContext';
export default function AfterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`min-w-full w-fit  min-h-dvh bg-background-100 pt-32 pb-20 px-14 text-grayscale-900 flex justify-center`}
    >
      <SessionContext>
        <HeadersNav />
        {children}
        <div className="fixed bottom-10 right-16 ">
          <ChatbotMain />
        </div>
      </SessionContext>
    </div>
  );
}