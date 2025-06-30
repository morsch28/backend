import { Challenge } from "../model/challenge.js";

const challenges = [
  // --- Nutrition: Easy ---
  {
    title: "30-Day Water Challenge",
    description:
      "Drink 8 glasses of water daily for 30 consecutive days to improve hydration and overall health.",
    category: "nutrition",
    duration_days: 30,
    difficulty: "easy",
    benefits: ["Improves hydration", "Boosts overall health"],
  },
  {
    title: "Mindful Eating Week",
    description:
      "Practice eating slowly and mindfully, paying attention to hunger cues and food enjoyment.",
    category: "nutrition",
    duration_days: 7,
    difficulty: "easy",
    benefits: ["Improves digestion", "Encourages healthy eating habits"],
  },

  // --- Nutrition: Medium ---
  {
    title: "Sugar-Free Week",
    description:
      "Eliminate added sugars from your diet for one week to reset your taste buds and reduce cravings.",
    category: "nutrition",
    duration_days: 7,
    difficulty: "medium",
    benefits: ["Resets taste buds", "Reduces sugar cravings"],
  },
  {
    title: "Plant-Based Week",
    description:
      "Eat only plant-based meals for one week to explore new foods and boost your vegetable intake.",
    category: "nutrition",
    duration_days: 7,
    difficulty: "medium",
    benefits: ["Increases vegetable intake", "Explores new foods"],
  },

  // --- Mental Health: Easy ---
  {
    title: "Morning Meditation",
    description:
      "Start each day with 10 minutes of mindful meditation to reduce stress and improve mental clarity.",
    category: "mental",
    duration_days: 21,
    difficulty: "easy",
    benefits: ["Reduces stress", "Improves mental clarity"],
  },
  {
    title: "Gratitude Journal",
    description:
      "Write down three things you're grateful for each day to cultivate a positive mindset.",
    category: "mental",
    duration_days: 30,
    difficulty: "easy",
    benefits: ["Cultivates positivity", "Improves mood"],
  },

  // --- Mental Health: Medium ---
  {
    title: "Digital Detox Evening",
    description:
      "Spend one hour before bed without any digital devices to improve sleep quality.",
    category: "mental",
    duration_days: 14,
    difficulty: "medium",
    benefits: ["Improves sleep quality", "Reduces eye strain"],
  },

  // --- Fitness: Easy ---
  {
    title: "Stretching Routine in the Morning",
    description: "Spend 5 minutes stretching after waking up.",
    category: "fitness",
    duration_days: 14,
    difficulty: "easy",
    benefits: ["Increases flexibility", "Reduces muscle tension"],
  },
  {
    title: "Dance Freely to 3 Songs",
    description: "Put on music and dance freely to 3 songs.",
    category: "fitness",
    duration_days: 7,
    difficulty: "easy",
    benefits: ["Improves mood", "Provides cardio exercise"],
  },

  // --- Fitness: Medium ---
  {
    title: "10,000 Steps Daily",
    description:
      "Walk at least 10,000 steps every day to boost cardiovascular health and energy levels.",
    category: "fitness",
    duration_days: 30,
    difficulty: "medium",
    benefits: ["Boosts cardiovascular health", "Increases energy levels"],
  },
  {
    title: "Push-Up Challenge",
    description:
      "Build upper body strength by doing push-ups daily, starting with your current ability and progressing.",
    category: "fitness",
    duration_days: 30,
    difficulty: "medium",
    benefits: ["Builds upper body strength", "Improves endurance"],
  },
  {
    title: "30-Minute Walk",
    description: "Go for a short walk in your neighborhood.",
    category: "fitness",
    duration_days: 14,
    difficulty: "medium",
    benefits: ["Boosts endurance", "Improves blood circulation"],
  },
  {
    title: "Use Stairs Instead of Elevator",
    description: "Take the stairs every day instead of the elevator.",
    category: "fitness",
    duration_days: 14,
    difficulty: "medium",
    benefits: ["Burns calories", "Improves cardiovascular health"],
  },
  {
    title: "Jump Rope for 1 Minute, 5 Times a Day",
    description: "Jump rope for a minute 5 times a day to raise heart rate.",
    category: "fitness",
    duration_days: 7,
    difficulty: "medium",
    benefits: [
      "Increases energy",
      "Strengthens muscles",
      "Burns calories",
      "Improves cardiovascular health",
    ],
  },

  // --- Fitness: Hard ---
  {
    title: "Couch to 5K",
    description:
      "A progressive running program designed to get you from the couch to running a 5K in 8 weeks.",
    category: "fitness",
    duration_days: 56,
    difficulty: "hard",
    benefits: ["Builds endurance", "Improves running skills"],
  },
  {
    title: "Try a New Sport Activity",
    description: "Try a sport or exercise you haven't done before.",
    category: "fitness",
    duration_days: 7,
    difficulty: "hard",
    benefits: ["Builds new skills", "Increases motivation"],
  },

  // --- Mental Health: Advanced ---
  {
    title: "One Hour in Nature Weekly",
    description:
      "Spend one hour each weekend in nature, such as a park or beach, enjoying the calm surroundings.",
    category: "mental",
    duration_days: 28,
    difficulty: "medium",
    benefits: ["Reduces stress and anxiety", "Improves focus and mood"],
  },
  {
    title: "Digital Detox Day",
    description: "Avoid all electronic devices for one full day.",
    category: "mental",
    duration_days: 7,
    difficulty: "hard",
    benefits: [
      "Reduces eye strain",
      "Improves mental clarity",
      "Encourages real-life connections",
      "Boosts creativity and productivity",
    ],
  },
];

async function initialChallenges() {
  await Challenge.deleteMany();

  challenges.forEach(async (challenge) => {
    await new Challenge(challenge).save();
  });
}
export default initialChallenges;
