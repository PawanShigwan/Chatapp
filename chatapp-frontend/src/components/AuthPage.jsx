import { SignIn, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import Chatpage from "./Chatpage";
import JoinCreateChat from "./JoinCreateChat";

const AuthPage = () => {
  return (
    <>
      <SignedOut>
        <SignIn routing="path" path="/" />
      </SignedOut>

      <SignedIn>
        <JoinCreateChat />
      </SignedIn>
    </>
  );
};

export default AuthPage;
