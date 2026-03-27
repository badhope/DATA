'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const splitTitle = new SplitType('.hero-title', { types: 'chars' });
      const splitSubtitle = new SplitType('.hero-subtitle', { types: 'words' });

      gsap.from(splitTitle.chars, {
        opacity: 0,
        y: 50,
        rotateX: -90,
        stagger: 0.05,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.3,
      });

      gsap.from(splitSubtitle.words, {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.8,
      });

      gsap.from('.hero-cta', {
        opacity: 0,
        y: 30,
        scale: 0.9,
        duration: 0.6,
        ease: 'back.out(1.7)',
        delay: 1.2,
      });

      gsap.from('.stat-item', {
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 60,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.to('.stat-number', {
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 80%',
        },
        textContent: () => '132',
        duration: 2,
        ease: 'power1.out',
        snap: { textContent: 1 },
      });

      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 75%',
        },
        opacity: 0,
        y: 80,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.to('.floating', {
        y: -20,
        duration: 2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="relative min-h-screen overflow-hidden">
      <div ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/20 via-transparent to-transparent" />

        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl floating" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl floating" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 text-center">
          <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-primary-400 via-accent-400 to-primary-400 bg-clip-text text-transparent">
            AI Skill Repository
          </h1>

          <p className="hero-subtitle text-xl md:text-2xl text-neutral-300 mb-8 max-w-2xl mx-auto">
            专业的 Prompt 工具箱 | 132+ 高质量提示词 | 27+ 技能定义 | 10+ 工作流
          </p>

          <div className="hero-cta flex gap-4 justify-center flex-wrap">
            <a
              href="/skills"
              className="px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full font-semibold text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all duration-300 hover:scale-105"
            >
              探索技能库
            </a>
            <a
              href="/prompts"
              className="px-8 py-4 border border-neutral-600 rounded-full font-semibold text-neutral-300 hover:bg-neutral-800/50 hover:border-neutral-500 transition-all duration-300"
            >
              浏览提示词
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      <section ref={statsRef} className="relative py-24 px-6 bg-neutral-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '132+', label: 'Prompts', icon: '💬' },
              { number: '27+', label: 'Skills', icon: '🎯' },
              { number: '10+', label: 'Workflows', icon: '🔧' },
              { number: '6', label: 'Core Modules', icon: '⚙️' },
            ].map((stat, index) => (
              <div key={index} className="stat-item text-center p-6 rounded-2xl bg-neutral-800/50 border border-neutral-700/50 hover:border-primary-500/50 transition-colors">
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="stat-number text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-neutral-400 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={featuresRef} className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
            核心能力
          </h2>
          <p className="text-neutral-400 text-center mb-16 max-w-2xl mx-auto">
            涵盖编程、调试、学习、日常生活的全方位AI辅助解决方案
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: '💻 编程能力',
                description: '从需求生成代码、实现功能、代码审查全流程支持',
                tags: ['代码生成', '代码审查', '重构辅助'],
                color: 'from-blue-500/20 to-cyan-500/20',
                borderColor: 'hover:border-blue-500/50',
              },
              {
                title: '🔧 调试能力',
                description: '系统性Bug定位、错误诊断、安全修复方案',
                tags: ['Bug定位', '错误诊断', '修复验证'],
                color: 'from-red-500/20 to-orange-500/20',
                borderColor: 'hover:border-red-500/50',
              },
              {
                title: '📚 学习支持',
                description: '概念解释、代码解读、学习路径规划',
                tags: ['知识解释', '练习题生成', '学习评估'],
                color: 'from-green-500/20 to-emerald-500/20',
                borderColor: 'hover:border-green-500/50',
              },
              {
                title: '✨ 日常工具',
                description: '邮件撰写、清单规划、日程安排',
                tags: ['邮件助手', '清单生成', '计划安排'],
                color: 'from-purple-500/20 to-pink-500/20',
                borderColor: 'hover:border-purple-500/50',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`feature-card group p-8 rounded-3xl bg-gradient-to-br ${feature.color} border border-neutral-700/50 ${feature.borderColor} transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary-500/10`}
              >
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-neutral-400 mb-6">{feature.description}</p>
                <div className="flex flex-wrap gap-2">
                  {feature.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 text-sm rounded-full bg-neutral-800/80 text-neutral-300 border border-neutral-700/50 group-hover:border-primary-500/30 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 px-6 bg-gradient-to-b from-transparent via-primary-900/10 to-transparent">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
              立即开始使用
            </span>
          </h2>
          <p className="text-neutral-400 mb-12 max-w-xl mx-auto">
            访问我们的 GitHub 仓库，获取完整项目代码和详细文档
          </p>
          <a
            href="https://github.com/badhope/skill"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-neutral-900 rounded-full font-semibold hover:bg-neutral-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            GitHub 仓库
          </a>
        </div>
      </section>
    </main>
  );
}
