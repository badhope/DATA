/**
 * Prompts 页面 - 展示所有提示词
 */

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Copy, ExternalLink, ChevronRight } from 'lucide-react'

// Prompt 分类
const promptCategories = [
  { id: 'task', name: '任务提示词', icon: '🎯', description: '执行特定任务的提示词' },
  { id: 'workflow', name: '工作流提示词', icon: '🔄', description: '多步骤工作流程' },
  { id: 'output', name: '输出格式', icon: '📤', description: '指定输出格式的提示词' },
  { id: 'meta', name: '元提示词', icon: '🧠', description: '优化提示词本身的提示词' },
  { id: 'everyday', name: '日常工具', icon: '✨', description: '日常使用的工具提示词' },
]

// 示例 Prompts
const prompts = [
  { id: 'coding-basic', title: '基础编程', category: 'task', subcategory: 'coding', description: '生成、实现和审查代码', tags: ['coding', 'generation'] },
  { id: 'debugging', title: '调试助手', category: 'task', subcategory: 'debugging', description: '系统性调试和 Bug 修复', tags: ['debugging', 'bugs'] },
  { id: 'repo-analysis', title: '代码仓库分析', category: 'task', subcategory: 'repo-analysis', description: '分析仓库结构和代码', tags: ['repo', 'analysis'] },
  { id: 'planning', title: '任务规划', category: 'task', subcategory: 'planning', description: '创建执行计划和任务分解', tags: ['planning', 'tasks'] },
  { id: 'research', title: '研究助手', category: 'task', subcategory: 'research', description: '结构化研究和调查', tags: ['research', 'investigation'] },
  { id: 'feature-implementation', title: '功能实现工作流', category: 'workflow', subcategory: 'feature', description: '从需求到实现的完整流程', tags: ['workflow', 'feature'] },
  { id: 'bug-investigation', title: 'Bug 调查工作流', category: 'workflow', subcategory: 'debugging', description: 'Bug 调查和修复流程', tags: ['workflow', 'debugging'] },
  { id: 'email-writer', title: '邮件撰写', category: 'everyday', subcategory: 'email', description: '专业邮件撰写助手', tags: ['email', 'writing'] },
]

export default function PromptsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [expandedPrompt, setExpandedPrompt] = useState<string | null>(null)

  const filteredPrompts = prompts.filter(prompt => {
    const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         prompt.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || prompt.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-neutral-950 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* 页面标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
            提示词库
          </h1>
          <p className="text-neutral-400 text-lg">
            132+ 高质量提示词，覆盖各种场景
          </p>
        </motion.div>

        {/* 搜索栏 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
            <input
              type="text"
              placeholder="搜索提示词..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-primary-500 transition-colors"
            />
          </div>
        </motion.div>

        {/* 分类过滤 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              !selectedCategory
                ? 'bg-accent-500 text-white'
                : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
            }`}
          >
            全部
          </button>
          {promptCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? 'bg-accent-500 text-white'
                  : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Prompts 列表 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          {filteredPrompts.map((prompt, index) => (
            <motion.div
              key={prompt.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * index }}
              className="group"
            >
              <div
                className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-accent-500/50 transition-all duration-300 cursor-pointer"
                onClick={() => setExpandedPrompt(expandedPrompt === prompt.id ? null : prompt.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-accent-400 transition-colors">
                        {prompt.title}
                      </h3>
                      <span className="px-2 py-1 text-xs rounded-md bg-neutral-800 text-neutral-400">
                        {prompt.subcategory}
                      </span>
                    </div>
                    <p className="text-neutral-400 text-sm">{prompt.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        // 复制逻辑
                      }}
                      className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <ChevronRight className={`w-5 h-5 text-neutral-500 transition-transform ${expandedPrompt === prompt.id ? 'rotate-90' : ''}`} />
                  </div>
                </div>

                {/* 展开内容 */}
                {expandedPrompt === prompt.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 pt-4 border-t border-neutral-800"
                  >
                    <div className="flex flex-wrap gap-2 mb-4">
                      {prompt.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded-md bg-accent-500/20 text-accent-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href={`https://github.com/badhope/skill/tree/main/prompts/${prompt.category}/${prompt.subcategory}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-accent-400 hover:text-accent-300 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      查看源文件
                    </a>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 空状态 */}
        {filteredPrompts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-neutral-500">没有找到匹配的提示词</p>
          </div>
        )}
      </div>
    </div>
  )
}
