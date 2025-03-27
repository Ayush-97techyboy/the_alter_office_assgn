import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";

export const Login = (): JSX.Element => {
  const { signInWithGoogle, loading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to sign in:', error);
    }
  };

  return (
    <main className="w-full h-screen bg-[#f9f9ff] overflow-hidden">
      <div className="relative w-full h-full">
        <div className="absolute w-full h-full top-0 left-0 bg-[#fff9f9]" />

        {/* Decorative circles */}
        <div className="absolute w-[834px] h-[834px] top-[41px] right-0">
          <div className="relative h-[834px] rounded-[417.18px]">
            <div className="w-[706px] h-[706px] top-[54px] left-[50px] rounded-[352.81px] opacity-50 absolute border-[0.73px] border-solid border-[#7b1984]" />
            <div className="w-[561px] h-[561px] top-[124px] left-[123px] rounded-[280.43px] absolute border-[0.73px] border-solid border-[#7b1984]" />
            <div className="w-[834px] h-[834px] top-0 left-0 rounded-[417.18px] opacity-50 absolute border-[0.73px] border-solid border-[#7b1984]" />
          </div>
        </div>

        {/* Login content */}
        <Card className="absolute w-[366px] h-auto top-[323px] left-[81px] border-none shadow-none bg-transparent">
          <CardContent className="p-0">
            {/* Logo and description */}
            <div className="mb-8">
              <div className="flex items-center mb-2">
                <img
                  className="w-[33px] h-[33px]"
                  alt="TaskBuddy Logo"
                  src="/task.svg"
                />
                <h1 className="ml-[5px] font-['Urbanist',Helvetica] font-bold text-[#7b1984] text-[26.2px] leading-[36.7px]">
                  TaskBuddy
                </h1>
              </div>
              <p className="font-['Urbanist',Helvetica] font-medium text-black text-[11.6px] leading-[16.3px] max-w-[295px]">
                Streamline your workflow and track progress effortlessly with
                our all-in-one task management app.
              </p>
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {/* Google login button */}
            <Button
              variant="default"
              className="w-full h-[60px] bg-[#292929] rounded-[18.91px] hover:bg-[#3a3a3a]"
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              <div className="flex items-center justify-center">
                <div className="w-5 h-[21px] bg-[url(/google.svg)] bg-[100%_100%] mr-2" />
                <span className="font-['Urbanist',Helvetica] font-bold text-white text-[21.8px] leading-[30.6px]">
                  {loading ? 'Signing in...' : 'Continue with Google'}
                </span>
              </div>
            </Button>
          </CardContent>
        </Card>

        {/* App preview image */}
        <img
          className="absolute w-[595px] h-[670px] top-[95px] right-0"
          alt="TaskBuddy App Preview"
          src="/task-list-view-3.png"
        />
      </div>
    </main>
  );
};