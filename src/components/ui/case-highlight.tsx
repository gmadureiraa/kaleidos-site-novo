"use client";

import { motion } from "framer-motion";
import { Lightbulb, AlertCircle, CheckCircle } from "lucide-react";

interface CaseHighlightProps {
  title: string;
  content: string;
  type?: "info" | "warning" | "success";
}

export function CaseHighlight({ title, content, type = "info" }: CaseHighlightProps) {
  const icons = {
    info: Lightbulb,
    warning: AlertCircle,
    success: CheckCircle
  };

  const colors = {
    info: "from-blue-50 to-blue-100 border-blue-200",
    warning: "from-yellow-50 to-yellow-100 border-yellow-200",
    success: "from-green-50 to-green-100 border-green-200"
  };

  const iconColors = {
    info: "text-blue-600",
    warning: "text-yellow-600",
    success: "text-green-600"
  };

  const Icon = icons[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`bg-gradient-to-r ${colors[type]} border ${colors[type].split(' ')[2]} p-6 rounded-2xl mb-8`}
    >
      <div className="flex items-start gap-4">
        <Icon className={`w-8 h-8 ${iconColors[type]} flex-shrink-0 mt-1`} />
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {title}
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {content}
          </p>
        </div>
      </div>
    </motion.div>
  );
} 