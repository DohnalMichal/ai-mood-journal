import { SignUp } from '@clerk/nextjs'

const SignUpPage = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        redirectUrl="/new-user"
        afterSignUpUrl="/new-user"
      />
    </div>
  )
}

export default SignUpPage
