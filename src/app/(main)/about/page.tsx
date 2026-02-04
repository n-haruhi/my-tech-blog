import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* アイコンセクション */}
      <section className="flex flex-col items-center mb-12 text-center">
        <Image
          src="/images/profile/avatar3.jpg"
          alt="pen2"
          width={128}
          height={128}
          className="w-32 h-32 rounded-full object-cover mb-4 border-2 border-neon-cyan"
        />
        <h1 className="text-neon-text text-2xl font-bold">pen2</h1>
        <p className="text-neon-muted text-base">Software Engineer</p>
      </section>

      {/* プロフィールセクション */}
      <section className="bg-neon-card rounded-lg border border-neon-border p-6 mb-8 hover:border-neon-cyan transition-colors duration-300">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-1 h-6 bg-neon-cyan"></div>
          <h2 className="text-neon-text text-xl font-semibold">PROFILE</h2>
        </div>
        <p className="text-neon-muted text-base leading-relaxed">
          2001年2月23日生まれ。<br />
          大学で4年間 心理学を学び、卒業後は児童福祉の現場で勤務する。<br />
          紆余曲折を経て、エンジニアになることを決意。<br />
          某スクールにて短期間でざっくりwebや開発など基本的なことを学び、<br />
          2024年5月～2025年9月までスタートアップ企業でソフトウェアエンジニアとして勤務。<br />
          フロントエンド・バックエンド問わず幅広い技術スタックでの開発を経験。<br />
          現在は次のキャリアステップを模索中。<br />
          <br />
          新しい技術への興味が尽きず、業務外でも書籍・Udemy・YouTubeなどで学習を継続。<br />
          「作ってみたい」を実際に形にすることで、実践的なスキルを磨いている。<br />
        </p>
      </section>

      {/* スキルセクション */}
      <section className="bg-neon-card rounded-lg border border-neon-border p-6 mb-8 hover:border-neon-cyan transition-colors duration-300">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-1 h-6 bg-neon-cyan"></div>
          <h2 className="text-neon-text text-xl font-semibold">SKILLS & TECH STACK</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* フロントエンド */}
          <div>
            <h3 className="text-neon-cyan text-lg font-medium mb-2">Frontend</h3>
            <ul className="list-disc list-inside text-neon-muted space-y-1 text-base ml-4">
              <li>HTML/CSS</li>
              <li>JavaScript/TypeScript</li>
              <li>React</li>
              <li>Vue.js</li>
              <li>Next.js</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>

          {/* バックエンド・言語 */}
          <div>
            <h3 className="text-neon-cyan text-lg font-medium mb-2">Backend & Languages</h3>
            <ul className="list-disc list-inside text-neon-muted space-y-1 text-base ml-4">
              <li>Node.js</li>
              <li>Ruby on Rails</li>
              <li>Laravel</li>
              <li>PHP</li>
              <li>Python</li>
            </ul>
          </div>

          {/* インフラ・DevOps */}
          <div>
            <h3 className="text-neon-cyan text-lg font-medium mb-2">Infrastructure & DevOps</h3>
            <ul className="list-disc list-inside text-neon-muted space-y-1 text-base ml-4">
              <li>AWS</li>
              <li>Vercel</li>
              <li>Terraform</li>
              <li>Firebase</li>
              <li>Docker</li>
              <li>Docker GUI</li>
              <li>Makefile</li>
            </ul>
          </div>

          {/* ツール・その他 */}
          <div>
            <h3 className="text-neon-cyan text-lg font-medium mb-2">Tools & Others</h3>
            <ul className="list-disc list-inside text-neon-muted space-y-1 text-base ml-4">
              <li>Git/GitHub</li>
              <li>WordPress</li>
              <li>Google Cloud Platform</li>
              <li>Playwright</li>
              <li>VNC</li>
              <li>QuickSight</li>
              <li>DBeaver</li>
            </ul>
          </div>
        </div>
      </section>

      {/* このサイトについて */}
      <section className="bg-neon-card rounded-lg border border-neon-border p-6 mb-8 hover:border-neon-cyan transition-colors duration-300">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-1 h-6 bg-neon-cyan"></div>
          <h2 className="text-neon-text text-xl font-semibold">ABOUT THIS SITE</h2>
        </div>
        <p className="text-neon-muted text-base leading-relaxed">
          自身の技術スタックや学習内容をアウトプットする場として本サイトを構築。<br />
          これまでZennやQiitaで発信していた内容も順次移行中。<br />
          技術記事の投稿を通じて、学んだ知識の定着と情報発信を継続している。<br />
        </p>
      </section>

      {/* 連絡先・SNSリンク */}
      <section className="bg-neon-card rounded-lg border border-neon-border p-6 hover:border-neon-cyan transition-colors duration-300">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-1 h-6 bg-neon-cyan"></div>
          <h2 className="text-neon-text text-xl font-semibold">CONTACT & LINKS</h2>
        </div>
        <div className="space-y-2">
          {/* GitHubリンク */}
          <div className="flex items-center text-neon-muted text-base">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <a href="https://github.com/n-haruhi" target="_blank" rel="noopener noreferrer" 
              className="px-2 py-1 bg-neon-border/50 hover:bg-neon-border/20 rounded-full text-sm transition-colors duration-300">
              n-haruhi
            </a>
          </div>

          {/* Blueskyリンク */}
          <div className="flex items-center text-neon-muted text-base">
            <svg 
              className="w-5 h-5 mr-2" 
              fill="currentColor" 
              viewBox="0 -3.268 64 68.414" 
              width="24" 
              height="24"
            >
              <path d="M13.873 3.805C21.21 9.332 29.103 20.537 32 26.55v15.882c0-.338-.13.044-.41.867-1.512 4.456-7.418 21.847-20.923 7.944-7.111-7.32-3.819-14.64 9.125-16.85-7.405 1.264-15.73-.825-18.014-9.015C1.12 23.022 0 8.51 0 6.55 0-3.268 8.579-.182 13.873 3.805zm36.254 0C42.79 9.332 34.897 20.537 32 26.55v15.882c0-.338.13.044.41.867 1.512 4.456 7.418 21.847 20.923 7.944 7.111-7.32 3.819-14.64-9.125-16.85 7.405 1.264 15.73-.825 18.014-9.015C62.88 23.022 64 8.51 64 6.55c0-9.818-8.578-6.732-13.873-2.745z" />
            </svg>
            <a href="https://bsky.app/profile/nhr2.bsky.social" target="_blank" rel="noopener noreferrer" 
              className="px-2 py-1 bg-neon-border/50 hover:bg-neon-border/20 rounded-full text-sm transition-colors duration-300">
              nhr2.bsky.social
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}