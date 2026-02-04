import Image from 'next/image'
import Link from 'next/link'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="mb-8">
        <h1 className="text-neon-text text-2xl sm:text-3xl font-bold mb-2">Portfolio</h1>
        <p className="text-neon-muted text-sm sm:text-base">制作したプロジェクトの紹介</p>
      </div>

      <div className="space-y-8">
        {projects.map((project) => (
          <div
            key={project.slug}
            className="bg-neon-card rounded-lg shadow-lg border border-neon-border overflow-hidden hover:border-neon-cyan transition-colors duration-300"
          >
            <Link href={`/portfolio/${project.slug}`}>
              <div className="relative w-full aspect-video">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            </Link>
            <div className="p-4 sm:p-6">
              <div className="flex items-start justify-between mb-2">
                <Link href={`/portfolio/${project.slug}`}>
                  <h2 className="text-neon-text text-xl font-semibold hover:text-neon-cyan transition-colors duration-300">
                    {project.title}
                  </h2>
                </Link>
                {project.endDate && (
                  <span className="text-sm text-neon-muted whitespace-nowrap ml-4">
                    {project.startDate} ~ {project.endDate}
                  </span>
                )}
              </div>
              <p className="text-neon-muted text-sm sm:text-base mb-4 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs sm:text-sm bg-neon-blue/20 text-neon-cyan border border-neon-blue/30 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-4 py-2 bg-neon-cyan/20 hover:bg-neon-cyan/30 text-neon-cyan border border-neon-cyan rounded-lg text-sm transition-colors duration-300"
                >
                  見に行く
                  <ChevronRightIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}