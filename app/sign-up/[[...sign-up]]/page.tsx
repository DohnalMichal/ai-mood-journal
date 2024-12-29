import { SignUp } from '@clerk/nextjs'

const SignUpPage = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        fallbackRedirectUrl="/journal"
        signInFallbackRedirectUrl="/journal"
      />
    </div>
  )
}

export default SignUpPage
