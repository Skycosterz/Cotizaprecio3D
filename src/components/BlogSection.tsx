import React, { useState } from 'react';
import { Clock, Tag } from 'lucide-react';
import { BLOG_POSTS } from '@/data/materials';

type BlogFilter = 'all' | 'Business' | 'Cosplay' | 'Functional';

const tagColor: Record<string, string> = {
  Business: '#2D9CDB',
  Cosplay: '#F5A623',
  Functional: '#4ADE80',
};

export default function BlogSection() {
  const [filter, setFilter] = useState<BlogFilter>('all');

  const filtered = filter === 'all' ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.tag === filter);

  return (
    <div className="space-y-6">
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2">
        {(['all', 'Business', 'Cosplay', 'Functional'] as BlogFilter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
            style={{
              background: filter === f ? (f === 'all' ? 'rgba(45,156,219,0.2)' : `${tagColor[f]}22`) : 'rgba(255,255,255,0.04)',
              border: `1px solid ${filter === f ? (f === 'all' ? 'rgba(45,156,219,0.4)' : `${tagColor[f]}55`) : 'rgba(255,255,255,0.08)'}`,
              color: filter === f ? (f === 'all' ? '#2D9CDB' : tagColor[f]) : 'rgba(255,255,255,0.5)',
              fontFamily: 'Space Grotesk, sans-serif',
            }}
          >
            {f === 'all' ? 'Todos' : f}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((post) => (
          <div
            key={post.id}
            className="rounded-xl overflow-hidden glass-card-hover transition-all duration-300 cursor-pointer"
            style={{ background: 'rgba(22,26,34,0.85)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            {/* Image */}
            <div className="relative h-44 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(22,26,34,0.95))' }}
              />
              <span
                className="absolute top-3 right-3 px-2 py-0.5 rounded text-xs font-medium"
                style={{
                  background: `${tagColor[post.tag]}22`,
                  border: `1px solid ${tagColor[post.tag]}44`,
                  color: tagColor[post.tag],
                  fontFamily: 'Space Grotesk, sans-serif',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <Tag size={10} className="inline mr-1" />
                {post.tag}
              </span>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3
                className="font-syne font-bold text-white text-sm leading-snug mb-2"
                style={{ lineHeight: '1.4' }}
              >
                {post.title}
              </h3>
              <p className="text-xs leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Space Grotesk, sans-serif' }}>
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'Space Grotesk, sans-serif' }}>
                  <Clock size={11} />
                  {post.readTime} lectura
                </div>
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'Space Grotesk, sans-serif' }}>
                  {post.date}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
