import { SquarePrompt } from '../components/mood';

export default function Home() {
  return (
    <div className="flex w-full h-screen items-center justify-center bg-background flex-col gap-4">
      <h1 className="text-center font-bold text-4xl">Welcome to my template</h1>
      <SquarePrompt initialAct="neutral" />
    </div>
  );
}
