'use client'

import {
  Bell,
  Calendar,
  Mail,
  MessageSquare,
  Search,
  Send,
  Sparkles,
  Webhook,
} from 'lucide-react'
import { Handle, Position } from 'reactflow'

import { cn } from '../lib/utils'
import { memo } from 'react'

// Helper function to get the icon component
function getIconComponent(iconName: string) {
  const icons: Record<string, unknown> = {
    Webhook,
    Calendar,
    Mail,
    Send,
    Bell,
    Search,
    Sparkles,
    MessageSquare,
  }

  return icons[iconName] || Webhook
}

// Define node colors based on type
const nodeColors: Record<string, string> = {
  webhook: 'bg-blue-50 border-blue-200',
  schedule: 'bg-blue-50 border-blue-200',
  email: 'bg-blue-50 border-blue-200',
  'send-email': 'bg-green-50 border-green-200',
  notification: 'bg-green-50 border-green-200',
  search: 'bg-green-50 border-green-200',
  'ai-process': 'bg-green-50 border-green-200',
  message: 'bg-green-50 border-green-200',
}

export const CustomNode = memo(({ data }: { data: unknown }) => {
  const IconComponent = getIconComponent(data.icon)
  const nodeColor =
    nodeColors[data.type] ||
    'bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700'

  return (
    <div className={cn('min-w-[150px] rounded-md border p-3', nodeColor)}>
      <Handle
        type="target"
        position={Position.Top}
        className="!h-3 !w-3 !bg-blue-500"
      />
      <div className="flex items-center gap-2">
        <IconComponent className="h-5 w-5" />
        <div className="text-sm font-medium">{data.label}</div>
      </div>
      {Object.keys(data.config).length > 0 && (
        <div className="mt-2 text-xs text-muted-foreground">
          {Object.entries(data.config).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span>{key}:</span>
              <span className="font-medium">{String(value)}</span>
            </div>
          ))}
        </div>
      )}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-3 !w-3 !bg-green-500"
      />
    </div>
  )
})

CustomNode.displayName = 'CustomNode'
