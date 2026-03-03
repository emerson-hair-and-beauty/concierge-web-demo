import { POROSITY_QUESTIONS } from "@/constants/onboardingData";

/**
 * Calculates the porosity level based on the answers provided.
 *
 * Scoring logic:
 * - Option 1 (Index 0): 0 points
 * - Option 2 (Index 1): 1 point
 * - Option 3 (Index 2): 2 points
 *
 * With 3 questions the maximum score is 6.
 * Thresholds (equal thirds):
 * - Score <= 2: "Low Porosity"
 * - 2 < Score <= 4: "Medium Porosity"
 * - Score > 4: "High Porosity"
 *
 * @param {Object} answers - Key-value map of question keys to selected values
 * @returns {string} - "Low Porosity", "Medium Porosity", or "High Porosity"
 */
export function calculatePorosityLevel(answers) {
  let score = 0;

  if (!answers) return "Unknown";

  POROSITY_QUESTIONS.forEach((q) => {
    const selectedValue = answers[q.key];
    if (selectedValue) {
      const optionIndex = q.options.findIndex(
        (opt) => opt.value === selectedValue
      );
      if (optionIndex !== -1) {
        // Index 0 -> 0 pts
        // Index 1 -> 1 pts
        // Index 2 -> 2 pts
        score += optionIndex;
      }
    }
  });

  if (score <= 2) {
    return "Low Porosity";
  } else if (score <= 4) {
    return "Medium Porosity";
  } else {
    return "High Porosity";
  }
}
