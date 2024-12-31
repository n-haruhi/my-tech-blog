export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">About Me</h1>

      {/* プロフィールセクション */}
      <section className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-[#000000] text-2xl font-semibold mb-4">プロフィール</h2>
        <p className="text-gray-600 mb-4">
          2001年2月23日生まれ。<br />
          大学で4年間 心理学を学び、卒業後は児童福祉の現場で勤務する。<br />
          紆余曲折を経て、エンジニアになることを決意。<br />
          某スクールにて短期間でざっくりwebや開発など基本的なことを学び、<br />
          2024年5月にスタートアップの企業に入社。<br />
          現在ソフトウェアエンジニアとして勤務している。<br />
          <br />
          仕事終わりでも休日でも、Udemyや書籍を読み漁り、<br />
          つくってみたい、試してみたいの調査や開発で時間を溶かしてしまう日々を送っている。<br />
        </p>
      </section>

      {/* スキルセクション */}
      <section className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-[#000000] text-2xl font-semibold mb-4">スキル・技術スタック</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* フロントエンド */}
          <div>
            <h3 className="text-gray-600 text-lg font-medium mb-2">フロントエンド</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>HTML/CSS</li>
              <li>JavaScript/TypeScript</li>
              <li>React</li>
              <li>Vue.js</li>
              <li>Next.js</li>
            </ul>
          </div>

          {/* バックエンド */}
          <div>
            <h3 className="text-gray-600 text-lg font-medium mb-2">バックエンド</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Node.js</li>
              <li>Ruby on Rails</li>
              <li>PHP</li>
              <li>Python</li>
            </ul>
          </div>

          {/* データベース・インフラ */}
          <div>
            <h3 className="text-gray-600 text-lg font-medium mb-2">データベース・インフラ</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>AWS</li>
              <li>Terraform</li>
              <li>Firebase</li>
              <li>DBeaver</li>
            </ul>
          </div>

          {/* 開発ツール・その他 */}
          <div>
            <h3 className="text-gray-600 text-lg font-medium mb-2">開発ツール・その他</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Git/GitHub</li>
              <li>Google Cloud Platform</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 連絡先・SNSリンク */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-[#000000] text-2xl font-semibold mb-4">Contact & Links</h2>
        <div className="space-y-2">
          {/* GitHubリンク */}
          <a 
            href="https://github.com/n-haruhi" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-gray-600 hover:text-blue-600"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>
          {/* X/旧Twitterリンク */}
          <a 
            href="https://x.com/myusername" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-gray-600 hover:text-blue-600"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          {/* Blueskyリンク */}
          <a 
            href="https://bsky.app/profile/myusername.bsky.social" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-gray-600 hover:text-blue-600"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              {/* <path d=""/> */}
            </svg>
            Bluesky
          </a>
        </div>
      </section>
    </div>
  )
}