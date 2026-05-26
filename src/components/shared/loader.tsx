interface FutureLoaderProps {
  text?: string;      
  fullScreen?: boolean;
}

export function Loader({ text = "SYSTEM INITIALIZING", fullScreen = true }: FutureLoaderProps) {
  return (
    <div
      className={`
        flex flex-col items-center justify-center select-none z-50 transition-all duration-300
        ${fullScreen 
          ? "fixed inset-0 backdrop-blur-md" 
          : "w-full h-full min-h-[250px] rounded-2xl backdrop-blur-sm border border-white/5"
        }
      `}
    >
      <div className="relative flex items-center justify-center w-28 h-28">
        <div className="absolute inset-0 border-[3px] border-transparent border-t-cyan-500 border-b-indigo-500 rounded-full animate-spin shadow-[0_0_20px_rgba(6,182,212,0.3)] duration-700"></div>
        <div className="absolute inset-3 border-2 border-transparent border-l-emerald-500 border-r-purple-500 rounded-full animate-spin [animation-direction:reverse] opacity-70 duration-1000"></div>
        <div className="absolute inset-6 border border-dashed border-cyan-400/30 rounded-full animate-spin duration-[3000ms]"></div>
        <div className="absolute inset-8 bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-500 rounded-full animate-pulse shadow-[0_0_30px_rgba(99,102,241,0.8)] flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full animate-ping opacity-75"></div>
        </div>
      </div>

      {text && (
        <div className="mt-8 flex flex-col items-center gap-2">
          <span className="text-[11px] md:text-xs font-black tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-emerald-400 animate-pulse uppercase">
            {text}
          </span>
          
          <div className="w-20 h-[2px] bg-white/5 rounded-full overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      )}
    </div>
  );
}