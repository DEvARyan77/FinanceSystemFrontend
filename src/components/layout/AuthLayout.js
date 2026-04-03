import { Link } from 'react-router-dom';

export default function AuthLayout({ 
    visualTitle, 
    visualHighlight, 
    visualDesc, 
    children 
}) {
    return (
        <>
            <style>
                {`
                    @keyframes float { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-15px) rotate(4deg); } }
                    @keyframes float-reverse { 0%, 100% { transform: translateY(0) rotate(12deg); } 50% { transform: translateY(12px) rotate(5deg); } }
                    @keyframes pan-grid { 0% { background-position: 0 0; } 100% { background-position: 24px 24px; } }
                    @keyframes slide-up-fade { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
                    .animate-float { animation: float 7s ease-in-out infinite; }
                    .animate-float-reverse { animation: float-reverse 8s ease-in-out infinite; }
                    .animate-grid { animation: pan-grid 15s linear infinite; }
                    .animate-entrance { animation: slide-up-fade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                `}
            </style>

            <div className="h-screen w-full flex font-sans bg-white text-black selection:bg-[#FFD500] selection:text-black overflow-hidden">
                <div className="hidden lg:flex flex-1 relative bg-[#F4F4F0] items-center justify-center border-r-[4px] border-black overflow-hidden group">
                    <div className="absolute top-20 left-20 w-32 h-32 bg-black border-[4px] border-[#FFD500] rounded-full shadow-[6px_6px_0_0_#FFD500] animate-float transition-all duration-500 group-hover:scale-110"></div>
                    <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#FFD500] border-[4px] border-black shadow-[6px_6px_0_0_#000] animate-float-reverse transition-all duration-500 group-hover:scale-110"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.1] animate-grid" />

                    <div className="relative z-10 w-full max-w-md px-12 text-left animate-entrance">
                        <div className="mb-6 p-1 inline-block bg-white border-[4px] border-black shadow-[6px_6px_0_0_#000] hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#000] transition-all duration-300">
                            <div className="w-12 h-12 bg-[#FFD500] flex items-center justify-center text-black font-black text-2xl"><Link to='/'>F</Link></div>
                        </div>
                        <h1 className="text-5xl font-black mb-4 leading-[0.95] tracking-tighter uppercase">
                            {visualTitle}<br />
                            <span className="bg-black px-3 mt-2 inline-block border-[4px] border-[#FFD500] text-[#FFD500] shadow-[4px_4px_0_0_#000] hover:bg-[#FFD500] hover:text-black transition-colors duration-300">
                                {visualHighlight}
                            </span>
                        </h1>
                        {visualDesc && (
                            <p className="text-lg font-bold border-l-[4px] border-[#FFD500] pl-4 mt-6 max-w-sm text-black border-dashed">
                                {visualDesc}
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex-1 flex items-center justify-center bg-white p-6 relative h-full overflow-y-auto">
                    <div className="w-full max-w-[380px] space-y-6 relative z-10 py-4 animate-entrance" style={{ animationDelay: '0.1s', opacity: 0 }}>
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}