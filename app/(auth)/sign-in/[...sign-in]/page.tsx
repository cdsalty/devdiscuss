import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return <SignIn path="/sign-in" />;
}

// const SignIn = () => {
//   return <div>SignIn Page</div>;
// };

// export default SignIn;
