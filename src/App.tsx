import { SignedIn, SignedOut } from "@clerk/clerk-react";
import RoomFinder from './RoomFinder.tsx'


export default function App() {
  return (
    
    <div className="bg-dark">
      <header>
      <SignedOut>
        <RoomFinder></RoomFinder>
      </SignedOut>
      <SignedIn>
        <RoomFinder></RoomFinder>
      </SignedIn>
    </header>
    </div>
  );
}