import { SignUp } from '@clerk/nextjs'

const SignUpPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        fallbackRedirectUrl="/new-user"
        signInFallbackRedirectUrl="/journal"
      />
    </div>
  )
}

export default SignUpPage
