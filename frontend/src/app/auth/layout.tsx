export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex justify-center items-center pt-[42px] pb-[50px] min-h-screen bg-gradient-to-b from-[#E8F5E84D] via-white to-[#E8F5E833]">
            <div className="w-full max-w-[400px] px-4">
                {children}
            </div>
        </div>
    );
}