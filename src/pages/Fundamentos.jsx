import TopicTracker from '../components/topics/TopicTracker';
import { topics } from '../data';

const Fundamentos = () => {
  // Find the Fundamentos topic from topics data
  const fundamentosTopic = topics.find(topic => topic.title === "Fundamentos de Programación") || {
    title: "Fundamentos de Programación",
    description: "Aprende los fundamentos de programación",
    subtopics: [
      {
        id: "intro-programming",
        title: "Introducción a la Programación",
        resources: [
          {
            id: "what-is-programming",
            type: "video",
            title: "¿Qué es programar?",
            url: "#",
            duration: "10:45",
            completed: false
          },
          {
            id: "first-steps",
            type: "article",
            title: "Primeros pasos en programación",
            url: "#",
            estimatedReadTime: 8,
            completed: false
          }
        ]
      }
    ]
  };

  return (
    <TopicTracker 
      topicId="fundamentos" 
      topicData={fundamentosTopic}
    />
  );
};

export default Fundamentos;
  