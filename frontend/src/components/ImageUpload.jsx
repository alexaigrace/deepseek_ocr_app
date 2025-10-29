import { useCallback } from 'react'
import { motion } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { Upload, Image as ImageIcon, X } from 'lucide-react'

export default function ImageUpload({ onImageSelect, preview }) {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.[0]) {
      onImageSelect(acceptedFiles[0])
    }
  }, [onImageSelect])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.bmp']
    },
    multiple: false
  })

  return (
    <div className="glass p-6 rounded-2xl space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-200">上传图片</h3>
        <ImageIcon className="w-5 h-5 text-purple-400" />
      </div>

      {!preview ? (
        <motion.div
          {...getRootProps()}
          className={`
            relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer
            transition-all duration-300
            ${isDragActive 
              ? 'border-purple-500 bg-purple-500/10' 
              : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
            }
          `}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <input {...getInputProps()} />
          
          <div className="space-y-4">
            <motion.div
              animate={{ 
                y: isDragActive ? -10 : 0,
                scale: isDragActive ? 1.1 : 1 
              }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl blur-xl opacity-50" />
                <div className="relative bg-gradient-to-br from-purple-600 to-cyan-500 p-4 rounded-2xl">
                  <Upload className="w-8 h-8" />
                </div>
              </div>
            </motion.div>
            
            <div>
              <p className="text-lg font-medium text-gray-200">
                {isDragActive ? '把图片拖放进去吧 🔥' : '拖放图片'}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                或者 点此添加本地图片 • PNG, JPG, WEBP 不超过 10MB 大小
              </p>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative group rounded-2xl overflow-hidden"
        >
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full rounded-2xl border border-white/10"
          />
          <div className="absolute top-3 right-3 flex gap-2">
            <motion.button
              onClick={(e) => {
                e.stopPropagation()
                onImageSelect(null)
              }}
              className="bg-red-500/90 backdrop-blur-sm px-3 py-2 rounded-full opacity-100 hover:bg-red-600 transition-colors flex items-center gap-2 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="删除图片"
            >
              <X className="w-4 h-4" />
              <span className="text-sm font-medium">删除</span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
