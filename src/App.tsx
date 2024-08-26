import { SignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import RoomFinder from './RoomFinder.tsx'


export default function App() {
  return (
    
    <div className="bg-dark">
      <header>
      <SignedOut>
        <div className="d-flex align-items-center justify-content-center" style={{height:'100vh'}}>
          <SignIn></SignIn>
        </div>
      </SignedOut>
      <SignedIn>
        <RoomFinder></RoomFinder>
      </SignedIn>
    </header>
    </div>
  );
}