/**
 * Skills 页面 - 展示所有技能
 */

'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Copy, Download, ExternalLink } from 'lucide-react'

// Skill 分类数据
const categories = [
  { id: 'mcp', name: 'MCP Skills', icon: '🔌', count: 19, description: 'Model Context Protocol 集成' },
  { id: 'coding', name: '编程技能', icon: '💻', count: 8, description: '代码生成与实现' },
  { id: 'debugging', name: '调试技能', icon: '🐛', count: 5, description: 'Bug 修复与故障排除' },
  { id: 'devops', name: 'DevOps', icon: '🔧', count: 12, description: '基础设施与部署' },
  { id: 'frontend', name: '前端开发', icon: '🎨', count: 7, description: 'UI/UX 与客户端开发' },
  { id: 'backend', name: '后端开发', icon: '⚙️', count: 13, description: '服务端与 API 开发' },
  { id: 'testing', name: '测试技能', icon: '🧪', count: 5, description: '测试自动化与覆盖' },
  { id: 'data', name: '数据技能', icon: '📊', count: 6, description: '数据库与数据处理' },
  { id: 'security', name: '安全技能', icon: '🔒', count: 4, description: '安全审计与密钥管理' },
  { id: 'workflow', name: '工作流', icon: '🔄', count: 12, description: '多步骤任务自动化' },
  { id: 'tool-use', name: '工具使用', icon: '🛠️', count: 8, description: '工具使用模式与最佳实践' },
  { id: 'ai-ml', name: 'AI/ML', icon: '🧠', count: 4, description: 'AI Agent 设计与 Prompt 工程' },
  { id: 'integration', name: '集成技能', icon: '🌐', count: 6, description: '第三方 API 与服务集成' },
  { id: 'documentation', name: '文档技能', icon: '📝', count: 3, description: '文档生成' },
]

// 示例技能列表
const skills = [
  { id: 'coding', name: 'coding', title: '代码生成', category: 'coding', tags: ['coding', 'generation', 'review'], description: '生成、实现和审查代码' },
  { id: 'coding-bug-fixing', name: 'coding-bug-fixing', title: 'Bug 修复', category: 'debugging', tags: ['debugging', 'bugs', 'fixing'], description: '系统性调试和 Bug 修复' },
  { id: 'mcp-server-development', name: 'mcp-server-development', title: 'MCP 服务器开发', category: 'mcp', tags: ['mcp', 'server', 'protocol'], description: 'MCP 服务器架构、工具、资源' },
  { id: 'frontend-react', name: 'frontend-react', title: 'React 开发', category: 'frontend', tags: ['react', 'frontend', 'ui'], description: 'React 前端开发' },
  { id: 'backend-nodejs', name: 'backend-nodejs', title: 'Node.js 后端', category: 'backend', tags: ['nodejs', 'backend', 'api'], description: 'Node.js 后端开发' },
  { id: 'workflow-feature-implementation', name: 'workflow-feature-implementation', title: '功能实现工作流', category: 'workflow', tags: ['workflow', 'feature', 'implementation'], description: '功能开发工作流' },
]

export default function SkillsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         skill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         skill.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || skill.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleCopy = async (skillId: string) => {
    // 复制技能内容
    setCopiedId(skillId)
    setTimeout(() => setCopiedId(null), 2000)
  }

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
            技能库
          </h1>
          <p className="text-neutral-400 text-lg">
            110+ 标准化技能，即插即用
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
              placeholder="搜索技能..."
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
                ? 'bg-primary-500 text-white'
                : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
            }`}
          >
            全部
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
              <span className="text-xs opacity-60">({cat.count})</span>
            </button>
          ))}
        </motion.div>

        {/* 技能卡片网格 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="group p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-primary-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors">
                    {skill.title}
                  </h3>
                  <p className="text-sm text-neutral-500 font-mono">{skill.name}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCopy(skill.id)}
                    className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
                    title="复制"
                  >
                    {copiedId === skill.id ? (
                      <span className="text-green-400 text-xs">✓</span>
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <a
                    href={`https://github.com/badhope/skill/tree/main/.trae/skills/${skill.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
                    title="查看源文件"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <p className="text-neutral-400 text-sm mb-4">{skill.description}</p>

              <div className="flex flex-wrap gap-2">
                {skill.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs rounded-md bg-neutral-800 text-neutral-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 空状态 */}
        {filteredSkills.length === 0 && (
          <div className="text-center py-16">
            <p className="text-neutral-500">没有找到匹配的技能</p>
          </div>
        )}
      </div>
    </div>
  )
}
