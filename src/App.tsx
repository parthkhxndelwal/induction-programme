import { SignedIn, SignedOut } from "@clerk/clerk-react";
// import RoomFinder from './RoomFinder.tsx'


export default function App() {
  return (
    
    <div className="bg-dark">
      <header>
      <SignedOut>
        {/* <RoomFinder></RoomFinder> */}
        <div className="d-flex justify-content-center align-items-center w-100 bg-dark text-light" style={{height:'100vh'}}>
          <h2>Website down for Maintenence. Check back soon!</h2>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="d-flex justify-content-center align-items-center w-100 bg-dark text-light" style={{height:'100vh'}}>
          <h2>Website down for Maintenence. Check back soon!</h2>
        </div>
      </SignedIn>
    </header>
    </div>
  );
}