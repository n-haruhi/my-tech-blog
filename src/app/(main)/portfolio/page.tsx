import Image from 'next/image'
import Link from 'next/link'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

type Project = {
  slug: string
  title: string
  description: string
  thumbnail: string
  tags: string[]
  demoUrl?: string
  startDate: string
  endDate?: string
}

const projects: Project[] = [
  {
    slug: 'mental-health-tracker',
    title: 'Mental Health Tracker',
    description: '日々の気分やメンタルヘルスを記録・可視化するWebアプリケーション',
    thumbnail: '/images/portfolio/mental-health-tracker-dashboard.png',
    tags: ['Laravel', 'PHP', 'MySQL', 'Tailwind CSS', 'Chart.js'],
    demoUrl: 'https://mental-health-tracker.up.railway.app/',
    startDate: '2025-01',
    endDate: '2025-02'
  }
]

export default function PortfolioPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ページヘッダー */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-1 h-8 bg-neon-cyan"></div>
          <h1 className="text-neon-text text-2xl sm:text-3xl font-bold">Portfolio</h1>
        </div>
        <p className="text-neon-muted text-sm sm:text-base">制作したプロジェクトの紹介</p>
      </div>

      {/* プロジェクト一覧 */}
      <div className="space-y-8">
        {projects.map((project) => (
          <article
            key={project.slug}
            className="group bg-neon-card rounded-lg border border-neon-border overflow-hidden hover:border-neon-cyan transition-all duration-300 hover:shadow-lg hover:shadow-neon-cyan/10"
          >
            {/* サムネイル */}
            <Link href={`/portfolio/${project.slug}`} className="block relative w-full aspect-video overflow-hidden">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </Link>

            {/* コンテンツ */}
            <div className="p-6">
              {/* タイトルと日付 */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <Link href={`/portfolio/${project.slug}`}>
                  <h2 className="text-neon-text text-xl sm:text-2xl font-bold hover:text-neon-cyan transition-colors duration-300">
                    {project.title}
                  </h2>
                </Link>
                {project.endDate && (
                  <span className="text-xs sm:text-sm text-neon-muted whitespace-nowrap px-3 py-1 bg-neon-slate rounded-md">
                    {project.startDate} ~ {project.endDate}
                  </span>
                )}
              </div>

              {/* 説明 */}
              <p className="text-neon-muted text-sm sm:text-base mb-4 leading-relaxed">
                {project.description}
              </p>

              {/* タグ */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs sm:text-sm bg-neon-slate text-neon-text border border-neon-border rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* デモリンク */}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-transparent border border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-slate-900 rounded-md font-medium transition-all duration-300"
                >
                  <span>見に行く</span>
                  <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}