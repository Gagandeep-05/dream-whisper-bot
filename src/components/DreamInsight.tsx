
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MoonStar, Star, BrainCircuit } from 'lucide-react';

interface DreamInsightProps {
  isDarkMode: boolean;
}

const insights = [
  {
    icon: <MoonStar className="h-5 w-5" />,
    title: "Dream Symbolism",
    description: "Decode the mysterious language of your subconscious mind through universal and personal symbols."
  },
  {
    icon: <Star className="h-5 w-5" />,
    title: "Emotional Patterns",
    description: "Uncover recurring emotional themes in your dreams and what they reveal about your waking life."
  },
  {
    icon: <BrainCircuit className="h-5 w-5" />,
    title: "Psychological Insights",
    description: "Gain deeper understanding of your psyche through the lens of various psychological perspectives."
  }
];

const DreamInsight = ({ isDarkMode }: DreamInsightProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 mb-12">
      {insights.map((insight, index) => (
        <Card key={index} className={
          isDarkMode 
            ? "bg-dream-card border-white/10 backdrop-blur-sm" 
            : "bg-dream-light-card border-dream-orange/20 backdrop-blur-sm"
        }>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className={isDarkMode ? "text-dream-purple" : "text-dream-orange"}>
                {insight.icon}
              </div>
              <CardTitle className="text-sm font-medium">{insight.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>{insight.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DreamInsight;
