
interface DreamInterpretation {
  keywords: string[];
  response: string;
}

export const dreamInterpretations: DreamInterpretation[] = [
  {
    keywords: ['falling', 'fell'],
    response: "Dreams about falling often represent insecurity, anxiety, or feeling that you're losing grip on something important in your life. It may suggest you feel out of control or overwhelmed by circumstances."
  },
  {
    keywords: ['flying', 'flew', 'float'],
    response: "Flying in dreams typically symbolize freedom, breaking free from limitations, or gaining a new perspective on life. It might reflect your desire for liberation from constraints or your ability to rise above challenges."
  },
  {
    keywords: ['teeth', 'tooth', 'losing teeth'],
    response: "Dreams about losing teeth often relate to anxiety about appearance, communication, or power. They may reflect fears about how others perceive you or concerns about losing your ability to communicate effectively."
  },
  {
    keywords: ['chase', 'chased', 'running', 'pursued'],
    response: "Being chased in dreams typically represents avoiding a person or issue. This could symbolize running away from your fears or refusing to acknowledge an uncomfortable situation in your waking life."
  },
  {
    keywords: ['water', 'ocean', 'sea', 'swimming', 'flood'],
    response: "Water in dreams often symbolize your emotional state. Calm water may represent peace of mind, while turbulent water could indicate emotional turmoil. Deep water might suggest exploring your unconscious mind."
  },
  {
    keywords: ['death', 'dying', 'dead'],
    response: "Dreams about death rarely predict actual death. Instead, they typically symbolize the end of something—perhaps a relationship, job, or phase of life—making way for new beginnings and transformation."
  },
  {
    keywords: ['naked', 'nude', 'clothes'],
    response: "Dreams of being naked or inappropriately dressed in public often reflect feelings of vulnerability, exposure, or imposter syndrome. They might indicate anxiety about being 'seen' for who you truly are."
  },
  {
    keywords: ['test', 'exam', 'school', 'studying'],
    response: "Test or exam dreams typically represent self-evaluation or fear of failure. They often appear when you're facing a challenging situation or feeling unprepared for something important in your life."
  },
];

export const getResponseForDream = (dreamDescription: string): string => {
  const dreamLower = dreamDescription.toLowerCase();
  
  const matchingInterpretations = dreamInterpretations.filter(item => 
    item.keywords.some(keyword => dreamLower.includes(keyword))
  );
  
  if (matchingInterpretations.length > 0) {
    const randomIndex = Math.floor(Math.random() * matchingInterpretations.length);
    return matchingInterpretations[randomIndex].response;
  }
  
  return "Your dream appears to be unique. Dreams often reflect our subconscious processing daily experiences and emotions. The symbols in your dream may represent aspects of yourself or situations you're currently navigating. Consider how the emotions in your dream relate to your waking life.";
};
