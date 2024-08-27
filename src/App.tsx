import { SignedIn, SignedOut } from "@clerk/clerk-react";
// import RoomFinder from './RoomFinder.tsx'
import CourseRoomFinder from "./CourseWiseRoom.tsx";

export default function App() {
  return (
    
    <div className="bg-dark">
      <header>
      <SignedOut>
        {/* <RoomFinder></RoomFinder> */}
        <CourseRoomFinder/>
      </SignedOut>
      <SignedIn>
        {/* <RoomFinder></RoomFinder> */}
        <CourseRoomFinder/>
      </SignedIn>
    </header>
    </div>
  );
}