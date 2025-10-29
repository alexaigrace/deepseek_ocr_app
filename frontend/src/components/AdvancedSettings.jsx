import { motion } from 'framer-motion'
import { Sliders } from 'lucide-react'

export default function AdvancedSettings({ settings, onSettingsChange, includeCaption, onIncludeCaptionChange }) {
  const handleChange = (key, value) => {
    onSettingsChange({
      ...settings,
      [key]: value
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="glass p-6 rounded-2xl space-y-4"
    >
      <div className="flex items-center gap-2">
        <Sliders className="w-5 h-5 text-purple-400" />
        <h3 className="font-semibold text-gray-200">更多设置</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs text-gray-400">基础大小</label>
          <input
            type="number"
            value={settings.base_size}
            onChange={(e) => handleChange('base_size', parseInt(e.target.value))}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs text-gray-400">图像大小</label>
          <input
            type="number"
            value={settings.image_size}
            onChange={(e) => handleChange('image_size', parseInt(e.target.value))}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs text-gray-400">裁剪模式</label>
          <select
            value={settings.crop_mode ? 'true' : 'false'}
            onChange={(e) => handleChange('crop_mode', e.target.value === 'true')}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
          >
            <option value="true">开启</option>
            <option value="false">关闭</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs text-gray-400">测试压缩</label>
          <select
            value={settings.test_compress ? 'true' : 'false'}
            onChange={(e) => handleChange('test_compress', e.target.value === 'true')}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
          >
            <option value="false">关闭</option>
            <option value="true">启用</option>
          </select>
        </div>
      </div>

      <div className="pt-2 border-t border-white/10">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={includeCaption}
            onChange={(e) => onIncludeCaptionChange(e.target.checked)}
            className="accent-purple-500"
          />
          <span className="text-sm text-gray-300">Include image caption</span>
        </label>
      </div>
    </motion.div>
  )
}
