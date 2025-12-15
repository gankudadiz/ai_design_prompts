import { Navbar } from "@/components/layout/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-bg-primary text-text-primary font-mono selection:bg-mint-500/30 selection:text-mint-200">
      <Navbar />
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      
      {/* Terminal Footer */}
      <footer className="border-t border-border-medium bg-bg-secondary py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="text-mint-500 font-bold flex items-center gap-2">
                <span className="text-accent-pink">{`>`}</span>
                Design_Vocab
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
                为开发者打造的可视化设计词典。
                <br />
                Code is Poetry, Interface is Terminal.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-text-primary font-bold border-b border-border-medium pb-2 inline-block">
                ./links
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-text-secondary hover:text-mint-500 flex items-center gap-2 transition-colors">
                    <span className="text-text-muted">$</span> 关于项目
                  </a>
                </li>
                <li>
                  <a href="#" className="text-text-secondary hover:text-mint-500 flex items-center gap-2 transition-colors">
                    <span className="text-text-muted">$</span> 贡献指南
                  </a>
                </li>
                <li>
                  <a href="#" className="text-text-secondary hover:text-mint-500 flex items-center gap-2 transition-colors">
                    <span className="text-text-muted">$</span> 更新日志
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-text-primary font-bold border-b border-border-medium pb-2 inline-block">
                ./status
              </h3>
              <div className="space-y-2 text-sm font-mono text-text-muted">
                <div className="flex justify-between">
                  <span>System:</span>
                  <span className="text-success">Online</span>
                </div>
                <div className="flex justify-between">
                  <span>Version:</span>
                  <span>v1.0.0-beta</span>
                </div>
                <div className="flex justify-between">
                  <span>License:</span>
                  <span>MIT</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border-medium/50 text-center text-xs text-text-muted">
            <p>&copy; {new Date().getFullYear()} Interactive Design Vocabulary. Built with Next.js & Tailwind.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
