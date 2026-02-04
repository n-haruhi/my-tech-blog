import Image from "next/image"

interface ProfileSidebarProps {
  alignLeft?: boolean
}

export default function ProfileSidebar({ alignLeft = false }: ProfileSidebarProps) {
  return (
    <aside className="w-full">
      <div className="bg-neon-card rounded-lg shadow-lg border border-neon-border p-3 sm:p-4">
        {/* アイコンと名前 */}
        <div className={`flex flex-col ${alignLeft ? 'items-start' : 'items-center'} mb-3 sm:mb-4`}>
          <Image
            src="/images/profile/avatar3.jpg"
            alt="pen2"
            width={64}
            height={64}
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover mb-2 border-2 border-neon-border"
          />
          <div className={alignLeft ? 'text-left' : 'text-center'}>
            <a
              href="/about"
              className="text-neon-text hover:text-neon-cyan font-bold text-base sm:text-lg transition-colors duration-300"
            >
              pen2
            </a>
            <p className="text-xs sm:text-sm text-neon-muted">Software Engineer</p>
          </div>
        </div>

        {/* SNSリンク */}
        <div className={`flex ${alignLeft ? 'justify-start' : 'justify-center'} gap-3 sm:gap-4`}>
          <a
            href="https://github.com/n-haruhi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon-muted hover:text-neon-cyan transition-colors duration-300 p-1"
            aria-label="GitHub"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://x.com/n_haru2"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon-muted hover:text-neon-cyan transition-colors duration-300 p-1"
            aria-label="Twitter/X"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="https://bsky.app/profile/nhr2.bsky.social"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon-muted hover:text-neon-cyan transition-colors duration-300 p-1"
            aria-label="Bluesky"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 -3.268 64 68.414" width="24" height="24">
              <path d="M13.873 3.805C21.21 9.332 29.103 20.537 32 26.55v15.882c0-.338-.13.044-.41.867-1.512 4.456-7.418 21.847-20.923 7.944-7.111-7.32-3.819-14.64 9.125-16.85-7.405 1.264-15.73-.825-18.014-9.015C1.12 23.022 0 8.51 0 6.55 0-3.268 8.579-.182 13.873 3.805zm36.254 0C42.79 9.332 34.897 20.537 32 26.55v15.882c0-.338.13.044.41.867 1.512 4.456 7.418 21.847 20.923 7.944 7.111-7.32 3.819-14.64-9.125-16.85 7.405 1.264 15.73-.825 18.014-9.015C62.88 23.022 64 8.51 64 6.55c0-9.818-8.578-6.732-13.873-2.745z" />
            </svg>
          </a>
        </div>
      </div>
    </aside>
  )
}